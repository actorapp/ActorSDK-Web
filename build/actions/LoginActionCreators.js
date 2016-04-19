'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var _MyProfileActionCreators = require('./MyProfileActionCreators');

var _MyProfileActionCreators2 = _interopRequireDefault(_MyProfileActionCreators);

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

var _BlockedUsersActionCreators = require('./BlockedUsersActionCreators');

var _BlockedUsersActionCreators2 = _interopRequireDefault(_BlockedUsersActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginActionCreators = function (_ActionCreators) {
  (0, _inherits3.default)(LoginActionCreators, _ActionCreators);

  function LoginActionCreators() {
    (0, _classCallCheck3.default)(this, LoginActionCreators);
    return (0, _possibleConstructorReturn3.default)(this, _ActionCreators.apply(this, arguments));
  }

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

    this.setBindings('main', [_ActorClient2.default.bindUser(_ActorClient2.default.getUid(), _MyProfileActionCreators2.default.onProfileChanged), _ActorClient2.default.bindGroupDialogs(_DialogActionCreators2.default.setDialogs), _ActorClient2.default.bindContacts(_ContactActionCreators2.default.setContacts), _ActorClient2.default.bindSearch(_QuickSearchActionCreators2.default.setQuickSearchList), _ActorClient2.default.bindTempGlobalCounter(_FaviconActionCreators2.default.setFavicon), _ActorClient2.default.bindEventBus(_EventBusActionCreators2.default.broadcastEvent), _ActorClient2.default.bindStickers(_StickersActionCreators2.default.setStickers), _ActorClient2.default.bindUserBlocked(_BlockedUsersActionCreators2.default.setUsers)]);

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_IN);
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
}(_ActionCreators3.default); /*
                              * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                              */

exports.default = new LoginActionCreators();
//# sourceMappingURL=LoginActionCreators.js.map