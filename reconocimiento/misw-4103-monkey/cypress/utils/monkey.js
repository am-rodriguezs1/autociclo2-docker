import { faker } from "@faker-js/faker";

function jsf32(a, b, c, d) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (a - ((b << 27) | (b >>> 5))) | 0;
    a = b ^ ((c << 17) | (c >>> 15));
    b = (c + d) | 0;
    c = (d + t) | 0;
    d = (a + t) | 0;
    return (d >>> 0) / 4294967296;
  };
}

/**
 * Initializes the state and random functions
 */
export function initializeMonkey({ seed }) {
  const state = {
    viewport: {},
    pos: { x: 0, y: 0 },
  };

  const random = jsf32(0xf1ae533d, seed, seed, seed);
  const randInt = (min, max) => Math.round(random() * (max - min)) + min;

  faker.seed(seed);

  return { state, random, randInt };
}

/**
 * Perform login
 */
export function login({ email, password, delay }) {
  cy.visit("/signin");

  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button').contains("Sign in").click();

  cy.wait(delay);
}

/**
 * Prepares Cypress listeners for errors
 */
export function setupErrorListeners() {
  cy.on("uncaught:exception", (value) => {
    cy.addActionContext({ title: "Uncaught exception", value });
  });
  cy.on("window:alert", (value) => {
    cy.addActionContext({ title: "Window alert", value });
  });
  cy.on("fail", (value) => {
    cy.addActionContext({ title: "Fail", value });
    return false;
  });
}

/**
 * Create the event actions available
 */
export function createEvents(randInt, state) {
  return {
    click: (cb) => cy.window().rElement(randInt, state).rClick(randInt, cb),
    scroll: (cb) => cy.rScroll(randInt, state, cb),
    keypress: (cb) => cy.window().rKeypress(randInt, cb),
    viewport: (cb) => cy.rViewport(randInt, cb).updateViewport(state),
    navigation: (cb) => cy.rNavigation(randInt, cb),
    smartClick: (cb) => cy.window().rClickable(randInt).rClick(randInt, cb),
    smartCleanup: (cb) => cy.rCleanup(randInt, cb),
    smartInput: (cb) => cy.rInput(randInt, cb),
  };
}

/**
 * Executes the monkey actions
 */
export function runMonkey({ actions, events, randInt, delay, page, allowedPaths }) {
  let [names, actionsLeft] = Object.entries(actions).reduce(
    (acc, [name, count]) => {
      if (count > 0) return [[...acc[0], name], acc[1] + count];
      return acc;
    },
    [[], 0]
  );

  const availableActions = names.length - 1;

  function executeNextAction() {
    if (actionsLeft <= 0) return;

    cy.then(() => {
      cy.addActionContext({
        title: "Actions left",
        value: names.reduce((acc, name) => {
          acc[name] = actions[name];
          return acc;
        }, {}),
      });

      const index = names[randInt(0, availableActions)];

      if (actions[index] > 0) {
        events[index]((details) => {
          cy.addActionContext(details);
        });

        cy.wait(delay);

        cy.location('hash').then((path) => {
          if (!allowedPaths.some(p => path.includes(p))) {
            cy.visit(page);
            cy.wait(delay);
          }
        });

        actions[index]--;
        actionsLeft--;
      } else {
        delete actions[index];
        names = names.filter((n) => n !== index);
      }
    }).then(() => {
      executeNextAction();
    });
  }

  executeNextAction();
}
