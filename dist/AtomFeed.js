System.register(['AbstractFeed.js', 'contentExtractor.js'], function (_export) {
  'use strict';

  var AbstractFeed, contentExtractor, AtomFeed;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_AbstractFeedJs) {
      AbstractFeed = _AbstractFeedJs['default'];
    }, function (_contentExtractorJs) {
      contentExtractor = _contentExtractorJs['default'];
    }],
    execute: function () {
      AtomFeed = (function (_AbstractFeed) {
        _inherits(AtomFeed, _AbstractFeed);

        function AtomFeed(feed) {
          _classCallCheck(this, AtomFeed);

          _get(Object.getPrototypeOf(AtomFeed.prototype), 'constructor', this).call(this, feed);
          this.source = feed.feed;
        }

        _createClass(AtomFeed, [{
          key: 'getEntries',
          value: function getEntries() {
            var _this = this;

            var result = undefined;

            result = [];

            this.source.entry.forEach(function (entry) {
              result.push({
                abstract: contentExtractor(entry.summary),
                dateTime: new Date(contentExtractor(entry.updated)),
                feedTitle: _this.getTitle(),
                link: contentExtractor(entry.link),
                title: contentExtractor(entry.title)
              });
            });

            return result;
          }
        }, {
          key: 'getTitle',
          value: function getTitle() {
            return contentExtractor(this.source.title);
          }
        }]);

        return AtomFeed;
      })(AbstractFeed);

      _export('default', AtomFeed);
    }
  };
});
//# sourceMappingURL=AtomFeed.js.map
