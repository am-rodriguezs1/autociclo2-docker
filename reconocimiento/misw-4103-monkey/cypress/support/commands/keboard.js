import { faker } from "@faker-js/faker";

const enterKey = (win) => {
  if (win.document.activeElement) {
    cy.wrap(win.document.activeElement).type("{enter}", { force: true });
  } else {
    cy.get("body").type("{enter}", { force: true });
  }
};

const tabKey = (win) => {
  if (win.document.activeElement) {
    cy.wrap(win.document.activeElement).tab().focus();
  } else {
    cy.get("body").tab().focus();
  }
};

const typeKey = (win, randomFn) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const input = chars.charAt(randomFn(0, chars.length - 1));
  if (win.document.activeElement) {
    cy.wrap(win.document.activeElement).type(input, { force: true });
  } else {
    cy.get("body").type(input, { force: true });
  }
  return input;
};

const typeSpecialKey = (win, randomFn) => {
  const specialKeys = [
    "{{}",
    "{backspace}",
    "{del}",
    "{downarrow}",
    "{end}",
    "{esc}",
    "{home}",
    "{leftarrow}",
    "{pagedown}",
    "{pageup}",
    "{rightarrow}",
    "{selectall}",
    "{uparrow}",
  ];
  const spkIndex = randomFn(0, specialKeys.length - 1);

  const modifiers = ["{alt}", "{ctrl}", "{meta}", "{shift}", ""];
  const modIndex = randomFn(0, modifiers.length - 1);

  let input = modifiers[modIndex] + specialKeys[spkIndex];
  if (win.document.activeElement) {
    cy.wrap(win.document.activeElement).type(input, { force: true });
  } else {
    cy.get("body").type(input, { force: true });
  }
  return input;
};

Cypress.Commands.add(
  "rKeypress",
  { prevSubject: true },
  (win, randomFn, callback) => {
    const actions = [
      () => enterKey(win),
      () => tabKey(win),
      () => typeKey(win, randomFn),
      () => typeSpecialKey(win, randomFn),
    ];
    const names = ["enter", "tab", "type", "special key"];
    const index = randomFn(0, actions.length - 1);
    const input = actions[index]();
    callback({
      title: "Keypress",
      value: {
        type: names[index],
        input,
      },
    });
  }
);

Cypress.Commands.add("rInput", (randomFn, callback) => {
  const actionBytype = {
    email: faker.internet.email,
    date: faker.date.anytime,
    tel: faker.phone.number,
    url: faker.internet.url,
    number: faker.number.int,
    text: faker.lorem.sentence,
    password: faker.internet.password,
  };
  const names = Object.keys(actionBytype);
  cy.document().then((doc) => {
    const $candidates = doc.body.querySelectorAll('input');
    if ($candidates.length === 0) {
      cy.log("No input fields found on the page.");
      return;
    }
    const $visibleCandidates = Array.from($candidates).filter(candidate => !Cypress.dom.isHidden(candidate));
    if ($visibleCandidates.length > 0) {
      const index = randomFn(0, $visibleCandidates.length - 1);
      const $element = $visibleCandidates[index];
      const $wrapped = Cypress.$($element);
      const elementType = $element.getAttribute("type");
      let input = 'N/A';

      if (actionBytype[elementType]) {
        input = actionBytype[elementType]()
        cy.wrap($wrapped)
        .should("be.visible")
        .focus()
        .clear({ force: true })
        .type(input.toString(), { force: true })
      }

      callback({
        title: "Input",
        value: {
          type: names[index],
          input,
        },
      });
    }
  });
});
