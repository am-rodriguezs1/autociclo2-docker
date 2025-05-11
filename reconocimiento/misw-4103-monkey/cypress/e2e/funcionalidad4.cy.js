import {
    login,
    setupErrorListeners,
    initializeMonkey,
    createEvents,
    runMonkey
  } from '../utils/monkey';

  const testConfiguration = {
    seed: Cypress.env('seed'),
    delay: Cypress.env('delay'),
    email: Cypress.env('email'),
    password: Cypress.env('password'),
    actions: {
      click: 30,
      scroll: 10,
      keypress: 50,
      viewport: 5,
      navigation: 2,

      smartClick: 40,
      smartCleanup: 2,
      smartInput: 5,
    },
  }
  
  describe('Pages management', () => {
    const config = {
      ...testConfiguration,
      allowedPaths: ['#/pages', '#/editor/page'],
    };
  
    let state, randInt, events;
  
    before(() => {
      setupErrorListeners();
  
      login({
        email: config.email,
        password: config.password,
        startPath: config.startPath,
        delay: config.delay,
      });
  
      const init = initializeMonkey({ seed: config.seed });
      state = init.state;
      randInt = init.randInt;
  
      cy.window().updateViewport(state);
      cy.wait(config.delay);
  
      events = createEvents(randInt, state);
  
      cy.visit('/pages');
      cy.wait(config.delay);
    });
  
    after(() => {
      cy.addActionContext("videos/funcionalidad4.cy.js.mp4");
    });
  
    it('Monkey testing on Pages section', () => {
      runMonkey({
        actions: { ...config.actions },
        events,
        randInt,
        delay: config.delay,
        page: "/pages",
        allowedPaths: config.allowedPaths,
        state,
      });
    });
  });
  