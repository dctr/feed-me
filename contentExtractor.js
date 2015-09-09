System.register([], function (_export) {
  'use strict';

  return {
    setters: [],
    execute: function () {
      _export('default', function (element) {
        if (!element) {
          return '';
        }
        return element.content || element.href || element;
      });
    }
  };
});
//# sourceMappingURL=contentExtractor.js.map
