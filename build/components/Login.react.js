'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _materialUi = require('material-ui');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _LoginActionCreators = require('../actions/LoginActionCreators');

var _LoginActionCreators2 = _interopRequireDefault(_LoginActionCreators);

var _LoginStore = require('../stores/LoginStore');

var _LoginStore2 = _interopRequireDefault(_LoginStore);

var _ActorTheme = require('../constants/ActorTheme');

var _ActorTheme2 = _interopRequireDefault(_ActorTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ThemeManager = new _materialUi.Styles.ThemeManager();

var Login = (function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, props));

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
      _LoginActionCreators2.default.requestSms(_this.state.login);
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

    return _this;
  }

  _createClass(Login, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var query = this.props.query;

      ThemeManager.setTheme(_ActorTheme2.default);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleFocus();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.handleFocus();
    }

    // From change handlers

    // Form submit handlers

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var step = _state.step;
      var errors = _state.errors;
      var login = _state.login;
      var code = _state.code;
      var name = _state.name;
      var isCodeRequested = _state.isCodeRequested;
      var isCodeSended = _state.isCodeSended;
      var isSignupStarted = _state.isSignupStarted;

      var requestFormClassName = (0, _classnames2.default)('login__form', 'login__form--request', {
        'login__form--active': step === _ActorAppConstants.AuthSteps.LOGIN_WAIT,
        'login__form--done': step !== _ActorAppConstants.AuthSteps.LOGIN_WAIT && isCodeRequested
      });
      var checkFormClassName = (0, _classnames2.default)('login__form', 'login__form--check', {
        'login__form--active': step === _ActorAppConstants.AuthSteps.CODE_WAIT && isCodeRequested,
        'login__form--done': step !== _ActorAppConstants.AuthSteps.CODE_WAIT && isCodeSended
      });
      var signupFormClassName = (0, _classnames2.default)('login__form', 'login__form--signup', {
        'login__form--active': step === _ActorAppConstants.AuthSteps.NAME_WAIT
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
          _react2.default.createElement('img', { alt: 'Actor messenger',
            className: 'logo',
            src: 'assets/images/logo.png',
            srcSet: 'assets/images/logo@2x.png 2x' }),
          _react2.default.createElement(
            'article',
            null,
            _react2.default.createElement(
              'h1',
              { className: 'login-new__heading' },
              'Welcome to ',
              _react2.default.createElement(
                'strong',
                null,
                'Actor'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              'Actor Messenger brings all your business network connections into one place, makes it easily accessible wherever you go.'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Our aim is to make your work easier, reduce your email amount, make the business world closer by reducing time to find right contacts.'
            )
          ),
          _react2.default.createElement(
            'footer',
            null,
            _react2.default.createElement(
              'div',
              { className: 'pull-left' },
              'Actor Messenger © 2015'
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
          { className: 'login-new__form col-xs-6 col-md-4 row center-xs middle-xs' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h1',
              { className: 'login-new__heading' },
              this.getIntlMessage('login.signIn')
            ),
            _react2.default.createElement(
              'form',
              { className: requestFormClassName, onSubmit: this.onRequestCode },
              _react2.default.createElement(
                'a',
                { className: 'wrong', onClick: this.handleRestartAuthClick },
                this.getIntlMessage('login.wrong')
              ),
              _react2.default.createElement(_materialUi.TextField, { className: 'login__form__input',
                disabled: isCodeRequested || step !== _ActorAppConstants.AuthSteps.LOGIN_WAIT,
                errorText: errors.login,
                floatingLabelText: this.getIntlMessage('login.phone'),
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
                  this.getIntlMessage('button.requestCode'),
                  isCodeRequested ? spinner : null
                )
              )
            ),
            _react2.default.createElement(
              'form',
              { className: checkFormClassName, onSubmit: this.onSendCode },
              _react2.default.createElement(_materialUi.TextField, { className: 'login__form__input',
                disabled: isCodeSended || step !== _ActorAppConstants.AuthSteps.CODE_WAIT,
                errorText: errors.code,
                floatingLabelText: this.getIntlMessage('login.authCode'),
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
                  this.getIntlMessage('button.checkCode'),
                  isCodeSended ? spinner : null
                )
              )
            ),
            _react2.default.createElement(
              'form',
              { className: signupFormClassName, onSubmit: this.onSignupRequested },
              _react2.default.createElement(_materialUi.TextField, { className: 'login__form__input',
                disabled: isSignupStarted || step === _ActorAppConstants.AuthSteps.COMPLETED,
                errorText: errors.signup,
                floatingLabelText: this.getIntlMessage('login.yourName'),
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
                  this.getIntlMessage('button.signUp'),
                  isSignupStarted ? spinner : null
                )
              )
            ),
            _react2.default.createElement(
              'a',
              { href: 'https://corp.actor.im' },
              'Enterprise user?'
            )
          )
        )
      );
    }
  }], [{
    key: 'getStores',
    value: function getStores() {
      return [_LoginStore2.default];
    }
  }, {
    key: 'calculateState',
    value: function calculateState() {
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
    }
  }]);

  return Login;
})(_react.Component);

Login.contextTypes = {
  router: _react.PropTypes.func
};
Login.propTypes = {
  query: _react.PropTypes.object
};
Login.childContextTypes = {
  muiTheme: _react.PropTypes.object
};

_reactMixin2.default.onClass(Login, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(Login, { pure: false });