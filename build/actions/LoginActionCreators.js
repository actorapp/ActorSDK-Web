'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _DelegateContainer = require('../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

var _LocationContainer = require('../utils/LocationContainer');

var _LocationContainer2 = _interopRequireDefault(_LocationContainer);

var _ActionCreators2 = require('./ActionCreators');

var _ActionCreators3 = _interopRequireDefault(_ActionCreators2);

var _JoinGroupActions = require('./JoinGroupActions');

var _JoinGroupActions2 = _interopRequireDefault(_JoinGroupActions);

var _ProfileActionCreators = require('./ProfileActionCreators');

var _ProfileActionCreators2 = _interopRequireDefault(_ProfileActionCreators);

var _DialogActionCreators = require('./DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _ContactActionCreators = require('./ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _QuickSearchActionCreators = require('./QuickSearchActionCreators');

var _QuickSearchActionCreators2 = _interopRequireDefault(_QuickSearchActionCreators);

var _FaviconActionCreators = require('./FaviconActionCreators');

var _FaviconActionCreators2 = _interopRequireDefault(_FaviconActionCreators);

var _EventBusActionCreators = require('./EventBusActionCreators');

var _EventBusActionCreators2 = _interopRequireDefault(_EventBusActionCreators);

var _StickersActionCreators = require('./StickersActionCreators');

var _StickersActionCreators2 = _interopRequireDefault(_StickersActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LoginActionCreators = function (_ActionCreators) {
  _inherits(LoginActionCreators, _ActionCreators);

  function LoginActionCreators() {
    _classCallCheck(this, LoginActionCreators);

    return _possibleConstructorReturn(this, _ActionCreators.apply(this, arguments));
  }

  LoginActionCreators.prototype.start = function start() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_START);
  };

  LoginActionCreators.prototype.changeLogin = function changeLogin(login) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_CHANGE_LOGIN, { login: login });
  };

  LoginActionCreators.prototype.changeCode = function changeCode(code) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_CHANGE_CODE, { code: code });
  };

  LoginActionCreators.prototype.changeName = function changeName(name) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_CHANGE_NAME, { name: name });
  };

  LoginActionCreators.prototype.startSignup = function startSignup() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_SIGNUP_START);
  };

  LoginActionCreators.prototype.restartAuth = function restartAuth() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_RESTART);
  };

  LoginActionCreators.prototype.requestCode = function requestCode(phone) {
    var promise = void 0;
    if (/@/.test(phone)) {
      promise = _ActorClient2.default.requestCodeEmail(phone);
    } else {
      promise = _ActorClient2.default.requestSms(phone);
    }

    (0, _ActorAppDispatcher.dispatchAsync)(promise, {
      request: _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST,
      success: _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_FAILURE
    }, { phone: phone });
  };

  LoginActionCreators.prototype.requestSms = function requestSms(phone) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.requestSms(phone), {
      request: _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST,
      success: _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_FAILURE
    }, { phone: phone });
  };

  LoginActionCreators.prototype.sendCode = function sendCode(code) {
    var _this2 = this;

    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.sendCode(code), {
      request: _ActorAppConstants.ActionTypes.AUTH_CODE_SEND,
      success: _ActorAppConstants.ActionTypes.AUTH_CODE_SEND_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.AUTH_CODE_SEND_FAILURE
    }, {
      code: code
    }).then(function (state) {
      switch (state) {
        case 'signup':
          _this2.startSignup();
          break;
        case 'logged_in':
          _this2.setLoggedIn({ redirect: true });
          break;
        default:
          console.error('Unsupported state', state);
      }
    });
  };

  LoginActionCreators.prototype.sendSignup = function sendSignup(name) {
    var _this3 = this;

    var signUpPromise = function signUpPromise() {
      return (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.signUp(name), {
        request: _ActorAppConstants.ActionTypes.AUTH_SIGNUP,
        success: _ActorAppConstants.ActionTypes.AUTH_SIGNUP_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.AUTH_SIGNUP_FAILURE
      }, { name: name });
    };

    var setLoggedIn = function setLoggedIn() {
      return _this3.setLoggedIn({ redirect: true });
    };

    signUpPromise().then(setLoggedIn);
  };

  LoginActionCreators.prototype.setLoggedIn = function setLoggedIn() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var delegate = _DelegateContainer2.default.get();

    if (delegate.actions.setLoggedIn) {
      return delegate.actions.setLoggedIn(opts);
    }

    if (opts.redirect) {
      var location = _LocationContainer2.default.get();
      var nextPathname = location.state ? location.state.nextPathname : '/';

      _history2.default.replace(nextPathname);
    }

    this.setBindings('main', [_ActorClient2.default.bindUser(_ActorClient2.default.getUid(), _ProfileActionCreators2.default.setProfile), _ActorClient2.default.bindGroupDialogs(_DialogActionCreators2.default.setDialogs), _ActorClient2.default.bindContacts(_ContactActionCreators2.default.setContacts), _ActorClient2.default.bindSearch(_QuickSearchActionCreators2.default.setQuickSearchList), _ActorClient2.default.bindTempGlobalCounter(_FaviconActionCreators2.default.setFavicon), _ActorClient2.default.bindEventBus(_EventBusActionCreators2.default.broadcastEvent), _ActorClient2.default.bindStickers(_StickersActionCreators2.default.setStickers)]);

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_IN);

    _JoinGroupActions2.default.joinAfterLogin();
  };

  LoginActionCreators.prototype.setLoggedOut = function setLoggedOut() {
    var delegate = _DelegateContainer2.default.get();

    if (delegate.actions.setLoggedOut) {
      return delegate.actions.setLoggedOut();
    }

    this.removeBindings('main');

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_OUT);
  };

  return LoginActionCreators;
}(_ActionCreators3.default);

exports.default = new LoginActionCreators();
//# sourceMappingURL=LoginActionCreators.js.map