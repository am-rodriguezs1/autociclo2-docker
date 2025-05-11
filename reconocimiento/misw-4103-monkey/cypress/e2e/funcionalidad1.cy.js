import {
  initializeMonkey,
  setupErrorListeners,
  createEvents,
  runMonkey,
  login,
} from '../utils/monkey';

const testRoutes = [
  { path: "/settings/portal/edit", requiresLogin: true },
];

describe("Monkey Testing - Funcionalidad1", () => {
  const seed = Cypress.env("seed");
  const delay = Cypress.env("delay");
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const actions = Cypress.env("actions");

  const { state, randInt } = initializeMonkey({ seed });
  const events = createEvents(randInt, state);

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

      if (route.requiresLogin) {
        login({ email, password, delay });
      }

      cy.visit(route.path);
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
    cy.addActionContext("videos/funcionalidad1.cy.js.mp4");
  });
});
