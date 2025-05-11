import {
  initializeMonkey,
  setupErrorListeners,
  createEvents,
  runMonkey,
} from "../utils/monkey"; 

function ensureLoggedIn() {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  cy.get('body').then(($body) => {
    if ($body.find('form.login-form').length > 0 || $body.find('input[name="identification"]').length > 0) {
      cy.log('Deslogueado! Relogueando...');
      cy.visit('/signin');

      cy.get('input[name="identification"]', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type(email);

      cy.get('input[name="password"]')
        .clear()
        .type(password);

      cy.get('button.login').click();
      cy.url().should('not.include', '/signin');
    }
  });
}

const testRoutes = [
  { path: "/settings/design/edit", requiresLogin: true },
];

describe("Monkey Testing - Funcionalidad7", () => {
  const seed = Cypress.env("seed");
  const delay = Cypress.env("delay");
  const actions = Cypress.env("actions");

  const { state, randInt } = initializeMonkey({ seed });

  const baseEvents = createEvents(randInt, state);

  const events = {};
  for (const [name, eventFn] of Object.entries(baseEvents)) {
    events[name] = (cb) => {
      eventFn(cb);        
      ensureLoggedIn();  
    };
  }

  before(() => {
    setupErrorListeners();
  });

  for (const route of testRoutes) {
    it(`should perform monkey testing on ${route.path}`, () => {
      cy.on("uncaught:exception", (err) => {
        if (
          err.message.includes("The play() request was interrupted") ||
          err.message.includes("media was removed from the document")
        ) {
          return false;
        }
      });

      cy.on("window:alert", (value) => {
        cy.addActionContext({ title: "Window alert", value });
      });

      cy.on('fail', (error) => {
        if (error.message.includes('unrecognized expression')) {
          cy.log('Selector inválido, ignorando...');
          return false;
        }
        throw error;
      });

      if (route.requiresLogin) {
        cy.visit("/signin");
        ensureLoggedIn();
      }

      cy.visit(route.path);
      ensureLoggedIn();
      cy.window().updateViewport(state);
      cy.wait(delay);

      cy.addActionContext({
        title: "Start Route",
        value: { route: route.path, seed, delay },
      });

      runMonkey({
        actions: { ...actions },
        events,  
        randInt,
        delay,
        page: route.path,
        allowedPaths: testRoutes.map(r => r.path),
      });
    });
  }

  after(() => {
    cy.addActionContext("videos/funcionalidad7.cy.js.mp4");
  });
});
