'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _l18n = require('../l18n');

var _RouterContainer = require('../utils/RouterContainer');

var _RouterContainer2 = _interopRequireDefault(_RouterContainer);

var _actorSdkDelegate = require('./actor-sdk-delegate');

var _actorSdkDelegate2 = _interopRequireDefault(_actorSdkDelegate);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _pace = require('pace');

var _pace2 = _interopRequireDefault(_pace);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _actorJs = require('actor-js');

var _actorJs2 = _interopRequireDefault(_actorJs);

var _reactIntl = require('react-intl');

var _crosstab = require('crosstab');

var _crosstab2 = _interopRequireDefault(_crosstab);

var _LoginActionCreators = require('../actions/LoginActionCreators');

var _LoginActionCreators2 = _interopRequireDefault(_LoginActionCreators);

var _LoginStore = require('../stores/LoginStore');

var _LoginStore2 = _interopRequireDefault(_LoginStore);

var _DeactivatedReact = require('../components/Deactivated.react.js');

var _DeactivatedReact2 = _interopRequireDefault(_DeactivatedReact);

var _LoginReact = require('../components/Login.react.js');

var _LoginReact2 = _interopRequireDefault(_LoginReact);

var _MainReact = require('../components/Main.react.js');

var _MainReact2 = _interopRequireDefault(_MainReact);

var _JoinGroupReact = require('../components/JoinGroup.react.js');

var _JoinGroupReact2 = _interopRequireDefault(_JoinGroupReact);

var _InstallReact = require('../components/Install.react.js');

var _InstallReact2 = _interopRequireDefault(_InstallReact);

var _Bugsnag = require('../utils/Bugsnag');

var _Mixpanel = require('../utils/Mixpanel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//import AppCache from 'utils/AppCache';

var DefaultRoute = _reactRouter2.default.DefaultRoute;
var Route = _reactRouter2.default.Route;
var RouteHandler = _reactRouter2.default.RouteHandler;

_pace2.default.start({
  ajax: false,
  restartOnRequestAfter: false,
  restartOnPushState: false
});

window.isJsAppLoaded = false;
window.jsAppLoaded = function () {
  window.isJsAppLoaded = true;
};

var App = (function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(RouteHandler, null);
    }
  }]);

  return App;
})(_react.Component);

_reactMixin2.default.onClass(App, _reactIntl.IntlMixin);

var ActorSDK = (function () {
  function ActorSDK(options) {
    _classCallCheck(this, ActorSDK);

    options = options || {};

    this.endpoints = options.endpoints && options.endpoints.length > 0 ? options.endpoints : _ActorAppConstants.endpoints;
    this.delegate = options.delegate ? options.delegate : new _actorSdkDelegate2.default();
    this.bugsnagApiKey = options.bugsnagApiKey ? options.bugsnagApiKey : _ActorAppConstants.bugsnagApiKey;
    this.mixpanelAPIKey = options.mixpanelAPIKey ? options.mixpanelAPIKey : _ActorAppConstants.mixpanelAPIKey;

    (0, _Bugsnag.initBugsnag)(this.bugsnagApiKey);
    (0, _Mixpanel.initMixpanel)(this.mixpanelAPIKey);
  }

  _createClass(ActorSDK, [{
    key: '_starter',
    value: function _starter() {
      var ActorInitEvent = 'concurrentActorInit';

      if (_crosstab2.default.supported) {
        _crosstab2.default.on(ActorInitEvent, function (msg) {
          if (msg.origin !== _crosstab2.default.id && window.location.hash !== '#/deactivated') {
            window.location.assign('#/deactivated');
            window.location.reload();
          }
        });
      }

      var appRootElemet = document.getElementById('actor-web-app');

      if (window.location.hash !== '#/deactivated') {
        if (_crosstab2.default.supported) _crosstab2.default.broadcast(ActorInitEvent, {});

        window.messenger = _actorJs2.default.create(this.endpoints);
      }

      var AuthSection = this.delegate.authSection || _LoginReact2.default;

      var routes = _react2.default.createElement(
        Route,
        { handler: App, name: 'app', path: '/' },
        _react2.default.createElement(Route, { handler: AuthSection, name: 'login', path: '/auth' }),
        _react2.default.createElement(Route, { handler: _MainReact2.default, name: 'main', path: '/im/:id' }),
        _react2.default.createElement(Route, { handler: _JoinGroupReact2.default, name: 'join', path: '/join/:token' }),
        _react2.default.createElement(Route, { handler: _DeactivatedReact2.default, name: 'deactivated', path: '/deactivated' }),
        _react2.default.createElement(Route, { handler: _InstallReact2.default, name: 'install', path: '/install' }),
        _react2.default.createElement(DefaultRoute, { handler: _MainReact2.default })
      );

      var router = _reactRouter2.default.create(routes, _reactRouter2.default.HashLocation);

      _RouterContainer2.default.set(router);

      router.run(function (Root) {
        return _react2.default.render(_react2.default.createElement(Root, _l18n.intlData), appRootElemet);
      });

      if (window.location.hash !== '#/deactivated') {
        if (_LoginStore2.default.isLoggedIn()) {
          _LoginActionCreators2.default.setLoggedIn(router, { redirect: false });
        }
      }
    }
  }, {
    key: 'startApp',
    value: function startApp() {
      if (window.isJsAppLoaded) this._starter();else window.jsAppLoaded = this._starter.bind(this);
    }
  }]);

  return ActorSDK;
})();

exports.default = ActorSDK;