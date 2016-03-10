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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var LoginActionCreators = {
  changeLogin: function changeLogin(login) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_CHANGE_LOGIN, { login: login });
  },
  changeCode: function changeCode(code) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_CHANGE_CODE, { code: code });
  },
  changeName: function changeName(name) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_CHANGE_NAME, { name: name });
  },
  requestCode: function requestCode(phone) {
    var isEmail = /@/.test(phone);
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
  },
  requestSms: function requestSms(phone) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.requestSms(phone), {
      request: _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST,
      success: _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_FAILURE
    }, { phone: phone });
  },
  sendCode: function sendCode(code) {
    var _this = this;

    var sendCodePromise = function sendCodePromise() {
      return (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.sendCode(code), {
        request: _ActorAppConstants.ActionTypes.AUTH_CODE_SEND,
        success: _ActorAppConstants.ActionTypes.AUTH_CODE_SEND_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.AUTH_CODE_SEND_FAILURE
      }, { code: code });
    };

    var handleState = function handleState(state) {
      switch (state) {
        case 'signup':
          _this.startSignup();
          break;
        case 'logged_in':
          _this.setLoggedIn({ redirect: true });
          break;
        default:
          console.error('Unsupported state', state);
      }
    };

    sendCodePromise().then(handleState);
  },
  startSignup: function startSignup() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_SIGNUP_START);
  },
  sendSignup: function sendSignup(name) {
    var _this2 = this;

    var signUpPromise = function signUpPromise() {
      return (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.signUp(name), {
        request: _ActorAppConstants.ActionTypes.AUTH_SIGNUP,
        success: _ActorAppConstants.ActionTypes.AUTH_SIGNUP_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.AUTH_SIGNUP_FAILURE
      }, { name: name });
    };

    var setLoggedIn = function setLoggedIn() {
      return _this2.setLoggedIn({ redirect: true });
    };

    signUpPromise().then(setLoggedIn);
  },
  setLoggedIn: function setLoggedIn() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var delegate = _DelegateContainer2.default.get();

    if (delegate.actions.setLoggedIn) {
      delegate.actions.setLoggedIn(opts);
    } else {
      if (opts.redirect) {
        var location = _LocationContainer2.default.get();
        var nextPathname = location.state ? location.state.nextPathname : null;

        if (nextPathname) {
          _history2.default.replace(nextPathname);
        } else {
          _history2.default.replace('/');
        }
      }

      _ActorClient2.default.bindUser(_ActorClient2.default.getUid(), _MyProfileActionCreators2.default.onProfileChanged);
      // ActorClient.bindDialogs(DialogActionCreators.setDialogs);
      _ActorClient2.default.bindGroupDialogs(_DialogActionCreators2.default.setDialogs);
      _ActorClient2.default.bindContacts(_ContactActionCreators2.default.setContacts);
      _ActorClient2.default.bindSearch(_QuickSearchActionCreators2.default.setQuickSearchList);
      _ActorClient2.default.bindTempGlobalCounter(_FaviconActionCreators2.default.setFavicon);
      _ActorClient2.default.bindEventBus(_EventBusActionCreators2.default.broadcastEvent);
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_IN);
    }
  },
  setLoggedOut: function setLoggedOut() {
    var delegate = _DelegateContainer2.default.get();

    if (delegate.actions.setLoggedOut) {
      delegate.actions.setLoggedOut();
    } else {
      _ActorClient2.default.unbindUser(_ActorClient2.default.getUid(), _MyProfileActionCreators2.default.onProfileChanged);
      _ActorClient2.default.unbindDialogs(_DialogActionCreators2.default.setDialogs);
      // ActorClient.unbindContacts(ContactActionCreators.setContacts);
      _ActorClient2.default.unbindGroupDialogs(_DialogActionCreators2.default.setDialogs);
      _ActorClient2.default.unbindSearch(_QuickSearchActionCreators2.default.setQuickSearchList);
      _ActorClient2.default.unbindTempGlobalCounter(_FaviconActionCreators2.default.setFavicon);
      _ActorClient2.default.unbindEventBus(_EventBusActionCreators2.default.broadcastEvent);
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_OUT);
    }
  },
  restartAuth: function restartAuth() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_RESTART);
  }
};

exports.default = LoginActionCreators;
//# sourceMappingURL=LoginActionCreators.js.map