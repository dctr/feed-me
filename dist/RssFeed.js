System.register(['AbstractFeed.js', 'contentExtractor.js'], function (_export) {
  'use strict';

  var AbstractFeed, contentExtractor, RssFeed;

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
      RssFeed = (function (_AbstractFeed) {
        _inherits(RssFeed, _AbstractFeed);

        function RssFeed(feed) {
          var _this = this;

          _classCallCheck(this, RssFeed);

          _get(Object.getPrototypeOf(RssFeed.prototype), 'constructor', this).call(this);

          var source = undefined;

          source = feed.rss.channel;
          this._title = source.title;
          this._entries = [];

          source.item.forEach(function (entry) {
            _this._entries.push({
              abstract: contentExtractor(entry.description),
              dateTime: new Date(contentExtractor(entry.pubDate)),
              feedTitle: _this.title,
              link: contentExtractor(entry.link),
              title: contentExtractor(entry.title)
            });
          });
        }

        _createClass(RssFeed, [{
          key: 'entries',
          get: function get() {
            return this._entries;
          }
        }, {
          key: 'title',
          get: function get() {
            return this._title;
          }
        }]);

        return RssFeed;
      })(AbstractFeed);

      _export('default', RssFeed);
    }
  };
});
//# sourceMappingURL=RssFeed.js.map
