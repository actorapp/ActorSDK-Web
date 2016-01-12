'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _Bugsnag = require('../utils/Bugsnag');

var _Bugsnag2 = _interopRequireDefault(_Bugsnag);

var _Mixpanel = require('../utils/Mixpanel');

var _Mixpanel2 = _interopRequireDefault(_Mixpanel);

var _l18n = require('../l18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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
    myUid = null;

var LoginStore = (function (_Store) {
  _inherits(LoginStore, _Store);

  function LoginStore(dispatcher) {
    _classCallCheck(this, LoginStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoginStore).call(this, dispatcher));

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

  _createClass(LoginStore, [{
    key: '__onDispatch',
    value: function __onDispatch(action) {
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
          _Mixpanel2.default.track('Request code');
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_SUCCESS:
          step = _ActorAppConstants.AuthSteps.CODE_WAIT;
          errors.login = null;
          _Mixpanel2.default.track('Request code success');
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.AUTH_CODE_REQUEST_FAILURE:
          switch (action.error) {
            case 'PHONE_NUMBER_INVALID':
              errors.login = this.intl.messages.login.errors.numberInvalid;
              break;
            case 'CODE_WAIT':
              errors.login = this.intl.messages.login.errors.codeWait;
              break;
            default:
              errors.login = action.error;
          }
          isCodeRequested = false;
          _Mixpanel2.default.track('Request code failure', {
            error: action.error
          });
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.AUTH_CODE_SEND:
          isCodeSended = true;
          _Mixpanel2.default.track('Send code');
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.AUTH_CODE_SEND_SUCCESS:
          errors.code = null;
          _Mixpanel2.default.track('Send code success');
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.AUTH_CODE_SEND_FAILURE:
          switch (action.error) {
            case 'PHONE_CODE_INVALID':
            case 'EMAIL_CODE_INVALID':
              errors.code = this.intl.messages.login.errors.codeInvalid;
              break;
            case 'PHONE_CODE_EXPIRED':
              errors.code = this.intl.messages.login.errors.codeExpired;
              break;
            default:
              errors.code = action.error;
          }
          isCodeSended = false;
          _Mixpanel2.default.track('Send code failure', {
            error: action.error
          });
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.AUTH_SIGNUP_START:
          step = _ActorAppConstants.AuthSteps.NAME_WAIT;
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.AUTH_SIGNUP:
          isSignupStarted = true;
          _Mixpanel2.default.track('Sign up');
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.AUTH_SIGNUP_SUCCESS:
          errors.signup = null;
          _Mixpanel2.default.alias(_ActorClient2.default.getUid());
          _Mixpanel2.default.people.set_once({ $created: new Date() });
          _Mixpanel2.default.track('Sign up success');
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.AUTH_SIGNUP_FAILURE:
          switch (action.error) {
            case 'NAME_INVALID':
              errors.signup = this.intl.messages.login.errors.nameInvalid;
              break;
            default:
              errors.signup = action.error;
          }
          isSignupStarted = false;
          _Mixpanel2.default.track('Sign up failure', {
            error: action.error
          });
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.AUTH_RESTART:
          this.resetStore();
          _Mixpanel2.default.track('Restart authorization');
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_IN:
          myUid = _ActorClient2.default.getUid();
          var user = _ActorClient2.default.getUser(myUid);
          _Mixpanel2.default.identify(myUid);
          _Mixpanel2.default.people.set({
            $phone: user.phones.length > 0 ? user.phones[0].phone : null,
            $email: user.emails.length > 0 ? user.emails[0].email : null,
            $name: user.name
          });
          _Mixpanel2.default.track('Sign in');
          _Bugsnag2.default.metaData = {
            account: {
              id: myUid,
              name: user.name,
              email: user.emails.length > 0 ? user.emails[0].email : null
            }
          };
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.AUTH_SET_LOGGED_OUT:
          _Mixpanel2.default.track('Sign out');
          _Mixpanel2.default.cookie.clear();
          localStorage.clear();
          location.reload();
          break;
        default:
      }
    }
  }]);

  return LoginStore;
})(_utils.Store);

exports.default = new LoginStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=LoginStore.js.map