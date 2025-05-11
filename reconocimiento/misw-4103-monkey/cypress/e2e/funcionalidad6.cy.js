import {
    login,
    setupErrorListeners,
    initializeMonkey,
    createEvents,
    runMonkey
  } from '../utils/monkey';

  const testConfiguration = {
    seed: 0xf1ae533b,
    delay: Cypress.env('delay'),
    email: Cypress.env('email'),
    password: Cypress.env('password'),
    actions: {
      click: 50,
      scroll: 10,
      keypress: 3,
      viewport: 5,
      navigation: 2,

      smartClick: 90,
      smartCleanup: 0,
      smartInput: 5,
    },
  }
  
  describe('Members management', () => {
    const config = {
      ...testConfiguration,
      allowedPaths: ['#/members'],
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
  
      cy.visit('/members');
      cy.wait(config.delay);
    });
  
    after(() => {
      cy.addActionContext("videos/funcionalidad6.cy.js.mp4");
    });
  
    it('Monkey testing on Members section', () => {
      runMonkey({
        actions: { ...config.actions },
        events,
        randInt,
        delay: config.delay,
        page: "/members",
        allowedPaths: config.allowedPaths,
        state,
      });
    });
  });
  