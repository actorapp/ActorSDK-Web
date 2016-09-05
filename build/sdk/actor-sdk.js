'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

require('setimmediate');

require('intl');

var _actorJs = require('actor-js');

var _actorJs2 = _interopRequireDefault(_actorJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _pace = require('pace');

var _pace2 = _interopRequireDefault(_pace);

var _crosstab = require('crosstab');

var _crosstab2 = _interopRequireDefault(_crosstab);

var _assignDeep = require('assign-deep');

var _assignDeep2 = _interopRequireDefault(_assignDeep);

var _DelegateContainer = require('../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _actorSdkDelegate = require('./actor-sdk-delegate');

var _actorSdkDelegate2 = _interopRequireDefault(_actorSdkDelegate);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _RouterHooks = require('../utils/RouterHooks');

var _RouterHooks2 = _interopRequireDefault(_RouterHooks);

var _reactIntl = require('react-intl');

var _ImageUtils = require('../utils/ImageUtils');

var _LoginActionCreators = require('../actions/LoginActionCreators');

var _LoginActionCreators2 = _interopRequireDefault(_LoginActionCreators);

var _defaultLogHandler = require('../utils/defaultLogHandler');

var _defaultLogHandler2 = _interopRequireDefault(_defaultLogHandler);

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
        window.messenger = _actorJs2.default.create({
          endpoints: _this.endpoints,
          logHandler: _this.logHandler
        });
      }

      var intlData = (0, _l18n.getIntlData)(_this.forceLocale);

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
          _this.getRoutes()
        )
      );

      (0, _reactDom.render)(root, appRootElemet);

      // initial setup fot react modal
      _reactModal2.default.setAppElement(appRootElemet);

      if (window.location.hash !== '#/deactivated') {
        if (_LoginStore2.default.isLoggedIn()) _LoginActionCreators2.default.setLoggedIn({ redirect: false });
      }
    };

    (0, _assignDeep2.default)(this, ActorSDK.defaultOptions, options);

    if (!this.delegate) {
      this.delegate = new _actorSdkDelegate2.default();
    }

    _DelegateContainer2.default.set(this.delegate);

    if (this.delegate.l18n) (0, _l18n.extendL18n)();

    _SharedContainer2.default.set(this);
  }

  ActorSDK.prototype.getRoutes = function getRoutes() {
    if (this.routes) {
      return this.routes;
    }

    var Login = typeof this.delegate.components.login == 'function' ? this.delegate.components.login : _Login2.default;
    var Deactivated = typeof this.delegate.components.deactivated == 'function' ? this.delegate.components.deactivated : _Deactivated2.default;
    var Install = typeof this.delegate.components.install == 'function' ? this.delegate.components.install : _Install2.default;
    var Archive = typeof this.delegate.components.archive == 'function' ? this.delegate.components.archive : _Archive2.default; // TODO: Rename this component
    var Join = typeof this.delegate.components.join == 'function' ? this.delegate.components.join : _Join2.default;
    var Empty = typeof this.delegate.components.empty == 'function' ? this.delegate.components.empty : _Empty2.default;
    var Dialog = typeof this.delegate.components.dialog == 'function' ? this.delegate.components.dialog : _Dialog2.default;

    return _react2.default.createElement(
      _reactRouter.Route,
      { path: '/', component: _App2.default },
      _react2.default.createElement(_reactRouter.Route, { path: 'auth', component: Login }),
      _react2.default.createElement(_reactRouter.Route, { path: 'deactivated', component: Deactivated }),
      _react2.default.createElement(_reactRouter.Route, { path: 'install', component: Install }),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'im', component: _Main2.default, onEnter: _RouterHooks2.default.requireAuth },
        _react2.default.createElement(_reactRouter.Route, { path: 'history', component: Archive }),
        _react2.default.createElement(_reactRouter.Route, { path: 'join/:token', component: Join }),
        _react2.default.createElement(_reactRouter.Route, { path: ':id', component: Dialog }),
        _react2.default.createElement(_reactRouter.IndexRoute, { component: Empty })
      ),
      _react2.default.createElement(_reactRouter.Redirect, { from: 'join/:token', to: 'im/join/:token' }),
      _react2.default.createElement(_reactRouter.IndexRedirect, { to: 'im' })
    );
  };

  /**
   * Start application
   */
  ActorSDK.prototype.startApp = function startApp() {
    if (window.isJsAppLoaded) {
      this._starter();
    } else {
      window.jsAppLoaded = this._starter;
    }
  };

  return ActorSDK;
}();

ActorSDK.defaultOptions = {
  endpoints: _ActorAppConstants.endpoints,
  rootElement: _ActorAppConstants.rootElement,
  appName: _ActorAppConstants.appName,
  helpPhone: _ActorAppConstants.helpPhone,
  homePage: null,
  twitter: null,
  facebook: null,
  delegate: null,
  forceLocale: null,
  features: {
    calls: true,
    search: false,
    editing: false
  },
  routes: null,
  isExperimental: false,
  logHandler: _defaultLogHandler2.default
};
exports.default = ActorSDK;
//# sourceMappingURL=actor-sdk.js.map