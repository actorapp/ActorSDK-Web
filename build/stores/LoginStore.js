'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _l18n = require('../l18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var step = _ActorAppConstants.AuthSteps.LOGIN_WAIT,
    errors = {
  login: null,
  code: null,
  signup: null
},
    login = '',
    code = '',
    name = '',
    isCodeRequested = false,
    isCodeSended = false,
    isSignupStarted = false,
    myUid = null; /*
                   * Copyright (C) 2015 Actor LLC. <https://actor.im>
                   */

var LoginStore = function (_Store) {
  (0, _inherits3.default)(LoginStore, _Store);

  function LoginStore(dispatcher) {
    (0, _classCallCheck3.default)(this, LoginStore);


    // TODO: do not use intlData here. save error codes and send them to ui.

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));

    _this.getStep = function () {
      return step;
    };

    _this.getErrors = function () {
      return errors;
    };

    _this.getLogin = function () {
      return login;
    };

    _this.getCode = function () {
      return code;
    };

    _this.getName = function () {
      return name;
    };

    _this.isCodeRequested = function () {
      return isCodeRequested;
    };

    _this.isCodeSended = function () {
      return isCodeSended;
    };

    _this.isSignupStarted = function () {
      return isSignupStarted;
    };

    _this.getMyId = function () {
      return myUid;
    };

    _this.isLoggedIn = function () {
      return _ActorClient2.default.isLoggedIn();
    };

    _this.resetStore = function () {
      step = _ActorAppConstants.AuthSteps.LOGIN_WAIT;
      errors = {
        login: null,
        code: null,
        signup: null
      };
      login = code = name = '';
      isCodeRequested = isCodeSended = isSignupStarted = false;
      myUid = null;
    };

    _this.intl = (0, _l18n.getIntlData)();
    return _this;
  }

  LoginStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {

      case _ActorAppConstants.ActionTypes.AUTH_CHANGE_LOGIN:
        login = action.login;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.AUTH_CHANGE_CODE:
        code = action.code;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.AUTH_CHANGE_NAME:
        name = action.name;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST:
        isCodeRequested = true;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_SUCCESS:
        step = _ActorAppConstants.AuthSteps.CODE_WAIT;
        errors.login = null;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_FAILURE:
        switch (action.error) {
          case 'PHONE_NUMBER_INVALID':
            errors.login = this.intl.messages['login.errors.numberInvalid'];
            break;
          case 'CODE_WAIT':
            errors.login = this.intl.messages['login.errors.codeWait'];
            break;
          default:
            errors.login = action.error;
        }
        isCodeRequested = false;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.AUTH_CODE_SEND:
        isCodeSended = true;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.AUTH_CODE_SEND_SUCCESS:
        errors.code = null;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.AUTH_CODE_SEND_FAILURE:
        switch (action.error) {
          case 'PHONE_CODE_INVALID':
          case 'EMAIL_CODE_INVALID':
            errors.code = this.intl.messages['login.errors.codeInvalid'];
            break;
          case 'PHONE_CODE_EXPIRED':
            errors.code = this.intl.messages['login.errors.codeExpired'];
            break;
          default:
            errors.code = action.error;
        }
        isCodeSended = false;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.AUTH_SIGNUP_START:
        step = _ActorAppConstants.AuthSteps.NAME_WAIT;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.AUTH_SIGNUP:
        isSignupStarted = true;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.AUTH_SIGNUP_SUCCESS:
        errors.signup = null;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.AUTH_SIGNUP_FAILURE:
        switch (action.error) {
          case 'NAME_INVALID':
            errors.signup = this.intl.messages['login.errors.nameInvalid'];
            break;
          default:
            errors.signup = action.error;
        }
        isSignupStarted = false;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.AUTH_RESTART:
        this.resetStore();
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_IN:
        myUid = _ActorClient2.default.getUid();
        var user = _ActorClient2.default.getUser(myUid);
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_OUT:
        localStorage.clear();
        location.reload();
        break;
      default:
    }
  };

  return LoginStore;
}(_utils.Store);

exports.default = new LoginStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=LoginStore.js.map