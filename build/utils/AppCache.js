'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _AppCacheActionCreators = require('../actions/AppCacheActionCreators');

var _AppCacheActionCreators2 = _interopRequireDefault(_AppCacheActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import AppCacheStore from 'stores/AppCacheStore';

var AppCache = (function () {
  function AppCache() {
    var _this = this;

    _classCallCheck(this, AppCache);

    window.addEventListener('load', function () {

      window.applicationCache.addEventListener('updateready', _this.onUpdateReady);

      // Check applications cache for update every 10 mins.
      setInterval(function () {
        window.applicationCache.update();
      }, 600000);
    }, false);
  }

  _createClass(AppCache, [{
    key: 'onUpdateReady',
    value: function onUpdateReady() {

      window.applicationCache.swapCache();

      _AppCacheActionCreators2.default.openModal();
    }
  }]);

  return AppCache;
})();

var AppCacheInstance = new AppCache();

exports.default = AppCacheInstance;
//# sourceMappingURL=AppCache.js.map