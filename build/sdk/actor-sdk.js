'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

require('setimmediate');

var _polyfills = require('../utils/polyfills');

var _polyfills2 = _interopRequireDefault(_polyfills);

var _actorJs = require('actor-js');

var _actorJs2 = _interopRequireDefault(_actorJs);

var _DelegateContainer = require('../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _actorSdkDelegate = require('./actor-sdk-delegate');

var _actorSdkDelegate2 = _interopRequireDefault(_actorSdkDelegate);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _pace = require('pace');

var _pace2 = _interopRequireDefault(_pace);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _reactIntl = require('react-intl');

var _crosstab = require('crosstab');

var _crosstab2 = _interopRequireDefault(_crosstab);

var _ImageUtils = require('../utils/ImageUtils');

var _LoginActionCreators = require('../actions/LoginActionCreators');

var _LoginActionCreators2 = _interopRequireDefault(_LoginActionCreators);

var _LoginStore = require('../stores/LoginStore');

var _LoginStore2 = _interopRequireDefault(_LoginStore);

var _App = require('../components/App.react');

var _App2 = _interopRequireDefault(_App);

var _Main = require('../components/Main.react');

var _Main2 = _interopRequireDefault(_Main);

var _Login = require('../components/Login.react');

var _Login2 = _interopRequireDefault(_Login);

var _Deactivated = require('../components/Deactivated.react');

var _Deactivated2 = _interopRequireDefault(_Deactivated);

var _Join = require('../components/Join.react');

var _Join2 = _interopRequireDefault(_Join);

var _Install = require('../components/Install.react');

var _Install2 = _interopRequireDefault(_Install);

var _Archive = require('../components/Archive.react');

var _Archive2 = _interopRequireDefault(_Archive);

var _Dialog = require('../components/Dialog.react');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Empty = require('../components/Empty.react');

var _Empty2 = _interopRequireDefault(_Empty);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _l18n = require('../l18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                           */

var ACTOR_INIT_EVENT = 'INIT';

// Init app loading progressbar
_pace2.default.start({
  ajax: false,
  restartOnRequestAfter: false,
  restartOnPushState: false
});

// Init lightbox
_ImageUtils.lightbox.load({
  animation: false,
  controlClose: '<i class="material-icons">close</i>'
});

window.isJsAppLoaded = false;
window.jsAppLoaded = function () {
  return window.isJsAppLoaded = true;
};

/**
 * Class represents ActorSKD itself
 *
 * @param {object} options - Object contains custom components, actions and localisation strings.
 */

var ActorSDK = function () {
  function ActorSDK() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ActorSDK);

    this._starter = function () {
      if (_crosstab2.default.supported) {
        _crosstab2.default.on(ACTOR_INIT_EVENT, function (msg) {
          if (msg.origin !== _crosstab2.default.id && window.location.hash !== '#/deactivated') {
            _history2.default.push('deactivated');
          }
        });
      }

      var appRootElemet = document.getElementById(_this.rootElement);

      if (window.location.hash !== '#/deactivated') {
        if (_crosstab2.default.supported) _crosstab2.default.broadcast(ACTOR_INIT_EVENT, {});
        window.messenger = _actorJs2.default.create({ endpoints: _this.endpoints });
      }

      var Login = typeof _this.delegate.components.login == 'function' ? _this.delegate.components.login : _Login2.default;
      var Deactivated = typeof _this.delegate.components.deactivated == 'function' ? _this.delegate.components.deactivated : _Deactivated2.default;
      var Install = typeof _this.delegate.components.install == 'function' ? _this.delegate.components.install : _Install2.default;
      var Archive = typeof _this.delegate.components.archive == 'function' ? _this.delegate.components.archive : _Archive2.default;
      var Join = typeof _this.delegate.components.join == 'function' ? _this.delegate.components.join : _Join2.default;
      var Empty = typeof _this.delegate.components.empty == 'function' ? _this.delegate.components.empty : _Empty2.default;
      var Dialog = typeof _this.delegate.components.dialog == 'function' ? _this.delegate.components.dialog : _Dialog2.default;
      var intlData = (0, _l18n.getIntlData)(_this.forceLocale);

      var requireAuth = function requireAuth(nextState, replaceState) {
        if (!_LoginStore2.default.isLoggedIn()) {
          replaceState({
            pathname: '/auth',
            state: { nextPathname: nextState.location.pathname }
          });
        }
      };

      function checkPeer(nextState, replaceState) {
        var peer = _PeerUtils2.default.stringToPeer(nextState.params.id);
        if (!_PeerUtils2.default.hasPeer(peer)) {
          console.error('Invalig peer', nextState);
          replaceState('/im');
        }
      }

      /**
       * Method for pulling props to router components
       *
       * @param RoutedComponent component for extending
       * @param props props to extend
       * @returns {object} extended component
       */
      var createElement = function createElement(Component, props) {
        return _react2.default.createElement(Component, _extends({}, props, { delegate: _this.delegate, isExperimental: _this.isExperimental }));
      };

      var root = _react2.default.createElement(
        _reactIntl.IntlProvider,
        intlData,
        _react2.default.createElement(
          _reactRouter.Router,
          { history: _history2.default, createElement: createElement },
          _react2.default.createElement(
            _reactRouter.Route,
            { path: '/', component: _App2.default },
            _react2.default.createElement(_reactRouter.Route, { path: 'auth', component: Login }),
            _react2.default.createElement(_reactRouter.Route, { path: 'deactivated', component: Deactivated }),
            _react2.default.createElement(_reactRouter.Route, { path: 'install', component: Install }),
            _react2.default.createElement(_reactRouter.Route, { path: 'join/:token', component: Join, onEnter: requireAuth }),
            _react2.default.createElement(
              _reactRouter.Route,
              { path: 'im', component: _Main2.default, onEnter: requireAuth },
              _react2.default.createElement(_reactRouter.Route, { path: 'archive', component: Archive }),
              _react2.default.createElement(_reactRouter.Route, { path: ':id', component: Dialog, onEnter: checkPeer }),
              _react2.default.createElement(_reactRouter.IndexRoute, { component: Empty })
            ),
            _react2.default.createElement(_reactRouter.IndexRedirect, { to: 'im' })
          )
        )
      );

      (0, _reactDom.render)(root, appRootElemet);

      // initial setup fot react modal
      _reactModal2.default.setAppElement(appRootElemet);

      if (window.location.hash !== '#/deactivated') {
        if (_LoginStore2.default.isLoggedIn()) _LoginActionCreators2.default.setLoggedIn({ redirect: false });
      }
    };

    this.endpoints = options.endpoints && options.endpoints.length > 0 ? options.endpoints : _ActorAppConstants.endpoints;
    this.isExperimental = options.isExperimental ? options.isExperimental : false;
    this.forceLocale = options.forceLocale ? options.forceLocale : null;
    this.rootElement = options.rootElement ? options.rootElement : _ActorAppConstants.rootElement;
    this.homePage = options.homePage ? options.homePage : _ActorAppConstants.homePage;
    this.twitter = options.twitter ? options.twitter : _ActorAppConstants.twitter;
    this.helpPhone = options.helpPhone ? options.helpPhone : _ActorAppConstants.helpPhone;
    this.appName = options.appName ? options.appName : _ActorAppConstants.appName;
    this.delegate = options.delegate ? options.delegate : new _actorSdkDelegate2.default();

    _DelegateContainer2.default.set(this.delegate);

    if (this.delegate.l18n) (0, _l18n.extendL18n)();

    _SharedContainer2.default.set(this);
  }

  /**
   * Start application
   */

  ActorSDK.prototype.startApp = function startApp() {
    var _this2 = this;

    var start = function start() {
      if (window.isJsAppLoaded) {
        _this2._starter();
      } else {
        window.jsAppLoaded = _this2._starter;
      }
    };

    (0, _polyfills2.default)(start);
  };

  return ActorSDK;
}();

exports.default = ActorSDK;
//# sourceMappingURL=actor-sdk.js.map