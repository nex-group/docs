// Lifecycle Hooks
// -----------------------------------------------------------------------------
// Soft-reset jsdom. This clears the DOM and removes all attribute from the
// root element, however it does not undo changes made to jsdom globals like
// the window or document object. Tests requiring a full jsdom reset should be
// stored in separate files, as this is the only way (?) to do a complete
// reset of JSDOM with Jest.
beforeEach(async () => {
  const rootElm = document.documentElement;

  // Remove elements (faster the setting innerHTML)
  while (rootElm.firstChild) {
    rootElm.removeChild(rootElm.firstChild);
  }

  // Remove docsify side-effects
  [
    '__current_docsify_compiler__',
    '_paq',
    '$docsify',
    'Docsify',
    'DocsifyCompiler',
    'ga',
    'gaData',
    'gaGlobal',
    'gaplugins',
    'gitter',
    'google_tag_data',
    'marked',
    'Prism',
  ].forEach(prop => {
    if (global[prop]) {
      delete global[prop];
    }
  });

  // Remove attributes
  [...rootElm.attributes].forEach(attr => rootElm.removeAttribute(attr.name));

  // Restore base elements
  rootElm.innerHTML = '<html><head></head><body></body></html>';
});
