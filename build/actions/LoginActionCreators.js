'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _RouterContainer = require('../utils/RouterContainer');

var _RouterContainer2 = _interopRequireDefault(_RouterContainer);

var _DelegateContainer = require('../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
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
        var router = _RouterContainer2.default.get();
        var nextPath = router.getCurrentQuery().nextPath;

        if (nextPath) {
          router.replaceWith(nextPath);
        } else {
          router.replaceWith('/');
        }
      }

      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_IN);
      _ActorClient2.default.bindUser(_ActorClient2.default.getUid(), _MyProfileActionCreators2.default.onProfileChanged);
      _ActorClient2.default.bindDialogs(_DialogActionCreators2.default.setDialogs);
      _ActorClient2.default.bindContacts(_ContactActionCreators2.default.setContacts);
      _ActorClient2.default.bindSearch(_QuickSearchActionCreators2.default.setQuickSearchList);
      _ActorClient2.default.bindTempGlobalCounter(_FaviconActionCreators2.default.setFavicon);
    }
  },
  setLoggedOut: function setLoggedOut() {
    var delegate = _DelegateContainer2.default.get();

    if (delegate.actions.setLoggedOut) {
      delegate.actions.setLoggedOut();
    } else {
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_OUT);
      _ActorClient2.default.unbindUser(_ActorClient2.default.getUid(), _MyProfileActionCreators2.default.onProfileChanged);
      _ActorClient2.default.unbindDialogs(_DialogActionCreators2.default.setDialogs);
      _ActorClient2.default.unbindContacts(_ContactActionCreators2.default.setContacts);
      _ActorClient2.default.unbindSearch(_QuickSearchActionCreators2.default.setQuickSearchList);
      _ActorClient2.default.unbindTempGlobalCounter(_FaviconActionCreators2.default.setFavicon);
    }
  },

  restartAuth: function restartAuth() {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.AUTH_RESTART);
  }
};

exports.default = LoginActionCreators;
//# sourceMappingURL=LoginActionCreators.js.map