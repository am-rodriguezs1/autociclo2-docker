/**
 * Generates a unique CSS selector path for a given DOM element.
 *
 * @param {Element} element - The DOM element for which to generate the CSS selector path.
 * @returns {string|undefined} The unique CSS selector path for the element
 *
 * @example
 * const element = document.querySelector('.my-class');
 * const selectorPath = cssSelectorPath(element);
 * console.log(selectorPath); // e.g., "div#parent > span.my-class:nth-of-type(2)"
 **/
const cssSelectorPath = (element) => {
  if (!element) return;

  const getSelector = (el) => {
    if (el.id) return `#${el.id}`;
    // else if (el.className)
    //   return `${el.tagName.toLowerCase()}.${el.className
    //     .split(/\s+/)
    //     .join(".")}`;
    return el.tagName.toLowerCase();
  };

  let [curr, selector, path] = [element, "", []];
  while (curr) {
    selector = getSelector(curr);
    if (selector.includes("#")) {
      path.unshift(selector);
      break;
    }

    // Check if the selector is unique
    const siblings = Array.from(curr.parentNode?.children || []);
    const sameTagSiblings = siblings.filter((s) => s.tagName === curr.tagName);

    if (sameTagSiblings.length > 1) {
      selector += `:nth-of-type(${sameTagSiblings.indexOf(curr) + 1})`;
    }

    path.unshift(selector);
    curr = curr.parentElement;
  }
  return path.join(" > ");
};

/**
 * Custom Cypress command to generate a random position within the viewport.
 * @param {function} getRandomInt function that generates a random integer
 * @returns {Cypress.Chainable<{x: number, y: number}>} A wrapped object with (x,y) coordinates.
 *
 * @example
 * cy.randomPosition(min, max).then(({ x, y }) => cy.log(`Random position: (${x}, ${y})`));
 */
Cypress.Commands.add(
  "rElement",
  { prevSubject: Window },
  (win, randomFn, state) => {
    state.pos.x = randomFn(0, state.viewport.w);
    state.pos.y = randomFn(0, state.viewport.h);
    const element = win.document.elementFromPoint(state.pos.x, state.pos.y);
    let target = cssSelectorPath(element);
    const candidate = target
      ? cy.get(target).then(($candidates) => {
          return $candidates
            .filter((_i, candidate) => !Cypress.dom.isHidden(candidate))
            .first();
        })
      : undefined;

    return cy.wrap({
      element: candidate,
      pos: state.pos,
      type: "Random Position",
    });
  }
);

Cypress.Commands.add("rClickable", { prevSubject: Window }, (win, randomFn) => {
  const tags = ["a", "button", "input", "select", "textarea"];
  const target = tags[randomFn(0, tags.length - 1)];
  const type = `Clickable ${target} Element`;

  if (!Cypress.$(target).length) return cy.wrap({ element: null, type });

  const element = cy.get(target).then(($candidates) => {
    const $visibleCandidates = $candidates.filter((_i, $c) => {
      const isHidden = Cypress.dom.isHidden($c);
      const display = win.getComputedStyle($c).display;
      return !isHidden && display !== "none";
    });

    const candidate = $visibleCandidates.length
      ? $visibleCandidates[randomFn(0, $visibleCandidates.length - 1)]
      : undefined;

    return candidate;
  });

  return cy.wrap({ element, type });
});

/**
 * Custom Cypress command to perform a random click action on an element.
 * @param {function} randomFn function that generates a random integer
 * @returns {Cypress.Chainable} A wrapped element.
 *
 * @example
 * cy.get("selector").randomClick(randomInt);
 */
Cypress.Commands.add(
  "rClick",
  { prevSubject: true },
  (subject, randomFn, callback) => {
    const element = subject?.element;
    const pos = subject?.pos;
    const type = subject?.type;
    const isElement = !!element;

    const wrapAndAct = (el, action, waitBefore = false) => {
      el.then(($el) => {
        if ($el.length > 0) {
          const tag = $el[0].tagName.toLowerCase();
          const href = $el[0].getAttribute('href');
    
          if (href && (href.startsWith('http') || href.startsWith('mailto:'))) {
            cy.log(`Skipping click on external link: ${href}`);
            return;
          }
    
          if (tag === 'select' && ['click', 'dblclick', 'rightclick'].includes(action)) {
            cy.log(`Skipping ${action} on <select> element`);
            return;
          }
    
          const wrapped = cy.wrap($el[0]);
          if (waitBefore) {
            wrapped.wait(200)[action]({ force: true });
          } else {
            wrapped[action]({ force: true });
          }
        } else {
          cy.log(`No se encontraron elementos para el ${action}.`);
        }
      });
    };    
    

    const wrapAndTrigger = (el, eventName) => {
      el.then(($el) => {
        if ($el.length > 0) {
          cy.wrap($el[0]).trigger(eventName, { force: true });
        } else {
          cy.log(`No se encontraron elementos para el ${eventName}.`);
        }
      });
    };

    const actions = isElement
      ? [
          () => wrapAndAct(element, "click"),
          () => wrapAndAct(element, "dblclick", true),
          () => wrapAndAct(element, "rightclick"),
          () => wrapAndTrigger(element, "mouseover"),
        ]
      : [
          () => cy.get("body").click(pos.x, pos.y, { force: true }),
          () => cy.get("body").dblclick(pos.x, pos.y, { force: true }),
          () => cy.get("body").rightclick(pos.x, pos.y, { force: true }),
          () => cy.get("body").trigger("mouseover", pos.x, pos.y, { force: true }),
        ];

    const names = ["single click", "double click", "right click", "hover"];
    const index = randomFn(0, actions.length - 1);

    const isExecutable = isElement || !!pos;
    if (isExecutable) actions[index]();

    callback({
      title: "Click",
      value: {
        type,
        subtype: isExecutable ? names[index] : "not executable",
        ...(pos && { position: `(${pos.x}, ${pos.y})` }),
      },
    });
  }
);

const scrollDown = (randomFn, state) => {
  const maxScrollableY = Math.min(state.viewport.maxY, state.viewport.h);
  state.pos.y = randomFn(state.pos.y, maxScrollableY);
  cy.log("scroll down");
};

const scrollRight = (randomFn, state) => {
  const maxScrollableX = Math.min(state.viewport.maxX, state.viewport.w);
  state.pos.x = randomFn(state.pos.x, maxScrollableX);
  cy.log("scroll right");
};

const scrollUp = (randomFn, state) => {
  state.pos.y = randomFn(0, state.pos.y);
  cy.log("scroll up");
};

const scrollLeft = (randomFn, state) => {
  state.pos.x = randomFn(0, state.pos.x);
  cy.log("scroll left");
};

Cypress.Commands.add("rScroll", (randomFn, state, callback) => {
  const actions = [scrollDown, scrollRight, scrollUp, scrollLeft];
  const names = ["scroll down", "scroll right", "scroll up", "scroll left"];
  const previousPosition = `(${state.pos.x}, ${state.pos.y})`;

  const index = randomFn(0, actions.length - 1);
  actions[index](randomFn, state);
  cy.scrollTo(state.pos.x, state.pos.y, {
    duration: 500,
    ensureScrollable: false,
  });

  callback({
    title: "Scroll",
    value: {
      type: names[index],
      previousPosition,
      newPosition: `(${state.pos.x}, ${state.pos.y})`,
    },
  });
});
