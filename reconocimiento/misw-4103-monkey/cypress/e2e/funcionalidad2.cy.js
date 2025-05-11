import {
  initializeMonkey,
  setupErrorListeners,
  createEvents,
  runMonkey,
} from "../utils/monkey"; 

describe("Monkey Testing - Funcionalidad2", () => {
  const seed = Cypress.env("seed");
  const delay = Cypress.env("delay");
  const actions = Cypress.env("actions");

  const { state, randInt } = initializeMonkey({ seed });
  const events = createEvents(randInt, state);

  before(() => {
    setupErrorListeners();

    cy.visit(""); 
    cy.window().updateViewport(state);
    cy.wait(delay);

    cy.addActionContext({
      title: "Before All",
      value: {
        viewport: `${state.viewport.w}x${state.viewport.h}`,
        seed,
        delay,
      },
    });
  });

  after(() => {
    cy.addActionContext("videos/funcionalidad2.cy.js.mp4");
  });

  it("should perform random monkey events", () => {
    runMonkey({
      actions: { ...actions }, 
      events,
      randInt,
      delay,
      page: "", 
      allowedPaths: [""], 
    });
  });
});
