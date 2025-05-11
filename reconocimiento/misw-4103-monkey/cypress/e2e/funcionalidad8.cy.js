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
      click: 5,
      scroll: 2,
      keypress: 5,
      viewport: 5,
      navigation: 2,

      smartClick: 20,
      smartCleanup: 2,
      smartInput: 5,
    },
  }
  
  describe('User configuration', () => {
    const config = {
      ...testConfiguration,
      allowedPaths: ['#/settings/staff/admin'],
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
  
      cy.visit('/settings/staff/admin');
      cy.wait(config.delay);
    });
  
    after(() => {
      cy.addActionContext("videos/funcionalidad4.cy.js.mp4");
    });
  
    it('Monkey testing on User Configuration section', () => {
      runMonkey({
        actions: { ...config.actions },
        events,
        randInt,
        delay: config.delay,
        page: "/settings/staff/admin",
        allowedPaths: config.allowedPaths,
        state,
      });
    });
  });
  