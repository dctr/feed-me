System.register([], function (_export) {
  'use strict';

  var AbstractFeed;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      AbstractFeed = (function () {
        function AbstractFeed(feed) {
          _classCallCheck(this, AbstractFeed);

          this.feed = feed;
        }

        _createClass(AbstractFeed, [{
          key: 'getEntries',
          value: function getEntries() {
            throw new Error('Pseudo-abstract class, method not implmemented');
          }
        }, {
          key: 'getTitle',
          value: function getTitle() {
            throw new Error('Pseudo-abstract class, method not implmemented');
          }
        }]);

        return AbstractFeed;
      })();

      _export('default', AbstractFeed);
    }
  };
});
//# sourceMappingURL=AbstractFeed.js.map
