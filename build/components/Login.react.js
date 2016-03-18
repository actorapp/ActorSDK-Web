'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _reactIntl = require('react-intl');

var _LoginActionCreators = require('../actions/LoginActionCreators');

var _LoginActionCreators2 = _interopRequireDefault(_LoginActionCreators);

var _LoginStore = require('../stores/LoginStore');

var _LoginStore2 = _interopRequireDefault(_LoginStore);

var _TextField = require('./common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = function (_Component) {
  (0, _inherits3.default)(Login, _Component);

  function Login(props) {
    (0, _classCallCheck3.default)(this, Login);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onLoginChange = function (event) {
      event.preventDefault();
      _LoginActionCreators2.default.changeLogin(event.target.value);
    };

    _this.onCodeChange = function (event) {
      event.preventDefault();
      _LoginActionCreators2.default.changeCode(event.target.value);
    };

    _this.onNameChange = function (event) {
      event.preventDefault();
      _LoginActionCreators2.default.changeName(event.target.value);
    };

    _this.onRequestCode = function (event) {
      event.preventDefault();
      _LoginActionCreators2.default.requestCode(_this.state.login);
    };

    _this.onSendCode = function (event) {
      event.preventDefault();
      _LoginActionCreators2.default.sendCode(_this.state.code);
    };

    _this.onSignupRequested = function (event) {
      event.preventDefault();
      _LoginActionCreators2.default.sendSignup(_this.state.name);
    };

    _this.handleRestartAuthClick = function (event) {
      event.preventDefault();
      _LoginActionCreators2.default.restartAuth();
    };

    _this.handleFocus = function () {
      var step = _this.state.step;


      switch (step) {
        case _ActorAppConstants.AuthSteps.LOGIN_WAIT:
          _this.refs.login.focus();
          break;
        case _ActorAppConstants.AuthSteps.CODE_WAIT:
          _this.refs.code.focus();
          break;
        case _ActorAppConstants.AuthSteps.NAME_WAIT:
          _this.refs.name.focus();
          break;
        default:
      }
    };

    var SharedActor = _SharedContainer2.default.get();
    _this.appName = SharedActor.appName ? SharedActor.appName : _ActorAppConstants.appName;
    return _this;
  }

  Login.getStores = function getStores() {
    return [_LoginStore2.default];
  };

  Login.calculateState = function calculateState() {
    return {
      login: _LoginStore2.default.getLogin(),
      code: _LoginStore2.default.getCode(),
      name: _LoginStore2.default.getName(),
      step: _LoginStore2.default.getStep(),
      errors: _LoginStore2.default.getErrors(),
      isCodeRequested: _LoginStore2.default.isCodeRequested(),
      isCodeSended: _LoginStore2.default.isCodeSended(),
      isSignupStarted: _LoginStore2.default.isSignupStarted()
    };
  };

  Login.prototype.componentDidMount = function componentDidMount() {
    this.handleFocus();
  };

  Login.prototype.componentDidUpdate = function componentDidUpdate() {
    this.handleFocus();
  };

  // From change handlers


  // Form submit handlers


  Login.prototype.render = function render() {
    var _state = this.state;
    var step = _state.step;
    var errors = _state.errors;
    var login = _state.login;
    var code = _state.code;
    var name = _state.name;
    var isCodeRequested = _state.isCodeRequested;
    var isCodeSended = _state.isCodeSended;
    var isSignupStarted = _state.isSignupStarted;
    var intl = this.context.intl;


    var requestFormClassName = (0, _classnames2.default)('login-new__forms__form', 'login-new__forms__form--request', {
      'login-new__forms__form--active': step === _ActorAppConstants.AuthSteps.LOGIN_WAIT,
      'login-new__forms__form--done': step !== _ActorAppConstants.AuthSteps.LOGIN_WAIT && isCodeRequested
    });
    var checkFormClassName = (0, _classnames2.default)('login-new__forms__form', 'login-new__forms__form--check', {
      'login-new__forms__form--active': step === _ActorAppConstants.AuthSteps.CODE_WAIT && isCodeRequested,
      'login-new__forms__form--done': step !== _ActorAppConstants.AuthSteps.CODE_WAIT && isCodeSended
    });
    var signupFormClassName = (0, _classnames2.default)('login-new__forms__form', 'login-new__forms__form--signup', {
      'login-new__forms__form--active': step === _ActorAppConstants.AuthSteps.NAME_WAIT
    });

    var spinner = _react2.default.createElement(
      'div',
      { className: 'spinner' },
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null)
    );

    return _react2.default.createElement(
      'section',
      { className: 'login-new row center-xs middle-xs' },
      _react2.default.createElement(
        'div',
        { className: 'login-new__welcome col-xs row center-xs middle-xs' },
        _react2.default.createElement('img', { alt: this.appName + ' messenger',
          className: 'logo',
          src: 'assets/images/logo.png',
          srcSet: 'assets/images/logo@2x.png 2x' }),
        _react2.default.createElement(
          'article',
          null,
          _react2.default.createElement(
            'h1',
            { className: 'login-new__heading' },
            _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'login.welcome.header', values: { appName: this.appName } })
          ),
          _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'login.welcome.text', values: { appName: this.appName } })
        ),
        _react2.default.createElement(
          'footer',
          null,
          _react2.default.createElement(
            'div',
            { className: 'pull-left' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.welcome.copyright', values: { appName: this.appName } })
          ),
          _react2.default.createElement(
            'div',
            { className: 'pull-right' },
            _react2.default.createElement(
              'a',
              { href: '//actorapp.ghost.io/desktop-apps' },
              'Desktop'
            ),
            '  •  ',
            _react2.default.createElement(
              'a',
              { href: '//actor.im/ios' },
              'iPhone'
            ),
            '  •  ',
            _react2.default.createElement(
              'a',
              { href: '//actor.im/android' },
              'Android'
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'login-new__forms col-xs-6 col-md-4 row center-xs middle-xs' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            { className: 'login-new__heading' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.signIn' })
          ),
          _react2.default.createElement(
            'form',
            { className: requestFormClassName, onSubmit: this.onRequestCode },
            _react2.default.createElement(
              'a',
              { className: 'wrong', onClick: this.handleRestartAuthClick },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'login.wrong' })
            ),
            _react2.default.createElement(_TextField2.default, { className: 'login-new__forms__form__input input__material--wide',
              disabled: isCodeRequested || step !== _ActorAppConstants.AuthSteps.LOGIN_WAIT,
              errorText: errors.login,
              floatingLabel: intl.messages['login.phone_or_email'],
              onChange: this.onLoginChange,
              ref: 'login',
              value: login }),
            _react2.default.createElement(
              'footer',
              { className: 'text-center' },
              _react2.default.createElement(
                'button',
                { className: 'button button--rised button--wide',
                  type: 'submit',
                  disabled: isCodeRequested },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.requestCode' }),
                isCodeRequested ? spinner : null
              )
            )
          ),
          _react2.default.createElement(
            'form',
            { className: checkFormClassName, onSubmit: this.onSendCode },
            _react2.default.createElement(_TextField2.default, { className: 'login-new__forms__form__input input__material--wide',
              disabled: isCodeSended || step !== _ActorAppConstants.AuthSteps.CODE_WAIT,
              errorText: errors.code,
              floatingLabel: intl.messages['login.authCode'],
              onChange: this.onCodeChange,
              ref: 'code',
              type: 'text',
              value: code }),
            _react2.default.createElement(
              'footer',
              { className: 'text-center' },
              _react2.default.createElement(
                'button',
                { className: 'button button--rised button--wide',
                  type: 'submit',
                  disabled: isCodeSended },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.checkCode' }),
                isCodeSended ? spinner : null
              )
            )
          ),
          _react2.default.createElement(
            'form',
            { className: signupFormClassName, onSubmit: this.onSignupRequested },
            _react2.default.createElement(_TextField2.default, { className: 'login-new__forms__form__input input__material--wide',
              disabled: isSignupStarted || step === _ActorAppConstants.AuthSteps.COMPLETED,
              errorText: errors.signup,
              floatingLabel: intl.messages['login.yourName'],
              onChange: this.onNameChange,
              ref: 'name',
              type: 'text',
              value: name }),
            _react2.default.createElement(
              'footer',
              { className: 'text-center' },
              _react2.default.createElement(
                'button',
                { className: 'button button--rised button--wide',
                  type: 'submit',
                  disabled: isSignupStarted },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.signUp' }),
                isSignupStarted ? spinner : null
              )
            )
          )
        )
      )
    );
  };

  return Login;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

Login.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(Login, { pure: false, withProps: true });
//# sourceMappingURL=Login.react.js.map