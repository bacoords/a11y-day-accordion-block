/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./src/accordion-block/view.js ***!
  \*************************************/
const accordionContainers = document.querySelectorAll('.wp-block-a11y-day-accordion-block');
accordionContainers.forEach(accordionContainer => {
  const accordions = accordionContainer.querySelectorAll(':scope > .wp-block-a11y-day-accordion-inner-block');
  // Add event listeners to all accordions and toggle them on click
  accordions.forEach(accordion => {
    const {
      accordionHeader,
      accordionContent
    } = accordionParts(accordion);
    accordionHeader.addEventListener('click', () => toggleAccordionItem(accordionHeader, accordionContent, accordion, accordions));
  });
});

/**
 * Toggle the accordion item
 * @param {HTMLElement} accordionHeader the button that controls the accordion
 * @param {HTMLElement} panel the panel that is controlled by the accordion
 * @param {HTMLElement} accordion the accordion item
 * @param {NodeList} accordions all the accordions in the accordion block
 */
function toggleAccordionItem(accordionHeader, panel, accordion, accordions) {
  isAccordionOpen = accordionHeader.getAttribute('aria-expanded') === 'true';
  if (!isAccordionOpen) {
    // Hide every panel but the one we want to show
    accordions.forEach(accordion => {
      const {
        accordionHeader,
        accordionContent
      } = accordionParts(accordion);
      if (accordionContent !== panel) {
        toggleIsSelected(accordion, 'remove');
        accordionHeader.setAttribute('aria-expanded', 'false');
      }
    });
  }
  toggleIsSelected(accordion, 'toggle');
  accordionHeader.setAttribute('aria-expanded', !isAccordionOpen);
}

/**
 * Get the header and content elements of an accordion item
 * @param {HTMLElement} accordion An accordion item
 * @returns an object containing the accordion header and content element
 */
function accordionParts(accordion) {
  const accordionHeader = accordion.firstChild.firstChild;
  const controlsId = accordionHeader.getAttribute('aria-controls');
  const accordionContent = document.getElementById(controlsId);
  return {
    accordionHeader,
    accordionContent
  };
}

/**
 * Add or remove the is-selected class from an Element
 * @param {HTMLELEMENT} element the element to add or remove the class from
 * @param {string} type accepts "toggle" or "remove"
 */
function toggleIsSelected(element, type) {
  if ('toggle' === type) {
    element.classList.toggle('is-selected');
  } else {
    element.classList.remove('is-selected');
  }
}
/******/ })()
;
//# sourceMappingURL=view.js.map