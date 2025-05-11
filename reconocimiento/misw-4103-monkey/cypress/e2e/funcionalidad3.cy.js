import {
    login,
    setupErrorListeners,
    initializeMonkey,
    createEvents,
    runMonkey
  } from '../utils/monkey';

  const testConfiguration = {
    seed: 0xf1ae533a,
    delay: Cypress.env('delay'),
    email: Cypress.env('email'),
    password: Cypress.env('password'),
    actions: {
      click: 10,
      scroll: 10,
      keypress: 100,
      viewport: 5,
      navigation: 2,

      smartClick: 70,
      smartCleanup: 0,
      smartInput: 5,
    },
  }
  
  describe('Posts management', () => {
    const config = {
      ...testConfiguration,
      allowedPaths: ['#/posts', '#/editor/post'],
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
  
      cy.visit('/posts');
      cy.wait(config.delay);
    });
  
    after(() => {
      cy.addActionContext("videos/funcionalidad3.cy.js.mp4");
    });
  
    it('Monkey testing on Posts section', () => {
      runMonkey({
        actions: { ...config.actions },
        events,
        randInt,
        delay: config.delay,
        page: "/posts",
        allowedPaths: config.allowedPaths,
        state,
      });
    });
  });
  