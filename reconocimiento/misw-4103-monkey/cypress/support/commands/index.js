import addContext from 'mochawesome/addContext';

Cypress.Commands.add('addActionContext', (details) => {
  cy.once('test:after:run', (test) => addContext({ test }, details));
});

Cypress.Commands.add(
  "updateViewport",
  { prevSubject: Window },
  (win, state) => {
    state.viewport = {
      w: Cypress.config("viewportWidth"),
      h: Cypress.config("viewportHeight"),
      maxX:
        Math.max(
          win.document.body.scrollWidth,
          win.document.body.offsetWidth,
          win.document.documentElement.clientWidth,
          win.document.documentElement.scrollWidth,
          win.document.documentElement.offsetWidth
        ),
      maxY:
        Math.max(
          win.document.body.scrollHeight,
          win.document.body.offsetHeight,
          win.document.documentElement.clientHeight,
          win.document.documentElement.scrollHeight,
          win.document.documentElement.offsetHeight
        ),
    };
  }
);
