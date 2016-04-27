'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _ProfileStore = require('../../stores/ProfileStore');

var _ProfileStore2 = _interopRequireDefault(_ProfileStore);

var _ProfileActionCreators = require('../../actions/ProfileActionCreators');

var _ProfileActionCreators2 = _interopRequireDefault(_ProfileActionCreators);

var _ModalCloseButton = require('./ModalCloseButton.react');

var _ModalCloseButton2 = _interopRequireDefault(_ModalCloseButton);

var _TextField = require('../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

var _PictureChanger = require('./profile/PictureChanger.react');

var _PictureChanger2 = _interopRequireDefault(_PictureChanger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Profile = function (_Component) {
  _inherits(Profile, _Component);

  Profile.getStores = function getStores() {
    return [_ProfileStore2.default];
  };

  Profile.calculateState = function calculateState(prevState) {
    var state = _ProfileStore2.default.getState();
    return {
      profile: state.profile,
      name: prevState ? prevState.name : state.profile.name,
      nick: prevState ? prevState.nick : state.profile.nick,
      about: prevState ? prevState.about : state.profile.about,
      errors: prevState ? prevState.errors : {}
    };
  };

  function Profile(props, context) {
    _classCallCheck(this, Profile);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleSave = _this.handleSave.bind(_this);
    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleNickChange = _this.handleNickChange.bind(_this);
    _this.handleAboutChange = _this.handleAboutChange.bind(_this);
    _this.handleAvatarChange = _this.handleAvatarChange.bind(_this);
    return _this;
  }

  Profile.prototype.handleClose = function handleClose() {
    _ProfileActionCreators2.default.hide();
  };

  Profile.prototype.handleSave = function handleSave() {
    var _state = this.state;
    var nick = _state.nick;
    var name = _state.name;
    var about = _state.about;
    var profile = _state.profile;
    var errors = _state.errors;


    if (!errors.nick) {
      if (name !== profile.name) _ProfileActionCreators2.default.editMyName(name);
      if (nick !== profile.nick) _ProfileActionCreators2.default.editMyNick(nick);
      if (about !== profile.about) _ProfileActionCreators2.default.editMyAbout(about);
      this.handleClose();
    }
  };

  Profile.prototype.handleNameChange = function handleNameChange(event) {
    this.setState({ name: event.target.value });
  };

  Profile.prototype.handleNickChange = function handleNickChange(event) {
    var nick = event.target.value;

    this.setState({
      nick: nick,
      errors: {
        nick: this.validateNick(nick)
      }
    });
  };

  Profile.prototype.validateNick = function validateNick(nick) {
    var intl = this.context.intl;


    if (nick.length < 5 || nick.length > 32) {
      return intl.messages['modal.profile.errors.nick.length'];
    }

    if (!/^[0-9a-zA-Z_]+$/.test(nick)) {
      return intl.messages['modal.profile.errors.nick.chars'];
    }

    return null;
  };

  Profile.prototype.handleAboutChange = function handleAboutChange(event) {
    this.setState({ about: event.target.value });
  };

  Profile.prototype.handleAvatarChange = function handleAvatarChange(croppedImage) {
    _ProfileActionCreators2.default.changeMyAvatar(croppedImage);
  };

  Profile.prototype.handleAvatarRemove = function handleAvatarRemove() {
    _ProfileActionCreators2.default.removeMyAvatar();
  };

  Profile.prototype.renderControls = function renderControls() {
    var errors = this.state.errors;


    return _react2.default.createElement(
      'div',
      { className: 'controls' },
      _react2.default.createElement(
        'button',
        { className: 'button', onClick: this.handleClose },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.cancel' })
      ),
      _react2.default.createElement(
        'button',
        {
          className: 'button button--rised',
          disabled: errors.nick,
          onClick: this.handleSave },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.save' })
      )
    );
  };

  Profile.prototype.renderName = function renderName() {
    var name = this.state.name;


    return _react2.default.createElement(
      'div',
      { className: 'name' },
      _react2.default.createElement(_TextField2.default, {
        className: 'input__material--wide',
        floatingLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.profile.name' }),
        onChange: this.handleNameChange,
        type: 'text',
        value: name })
    );
  };

  Profile.prototype.renderNick = function renderNick() {
    var _state2 = this.state;
    var nick = _state2.nick;
    var errors = _state2.errors;


    return _react2.default.createElement(
      'div',
      { className: 'nick' },
      _react2.default.createElement(_TextField2.default, {
        className: 'input__material--wide',
        floatingLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.profile.nick' }),
        errorText: errors.nick,
        onChange: this.handleNickChange,
        type: 'text',
        value: nick })
    );
  };

  Profile.prototype.renderPhones = function renderPhones() {
    var phones = this.state.profile.phones;

    if (phones.length === 0) return null;

    return phones.map(function (phone, index) {
      return _react2.default.createElement(
        'div',
        { className: 'phone', key: 'p' + index },
        _react2.default.createElement(_TextField2.default, {
          className: 'input__material--wide',
          floatingLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.profile.phone' }),
          disabled: true,
          type: 'tel',
          value: phone.number })
      );
    });
  };

  Profile.prototype.renderEmails = function renderEmails() {
    var emails = this.state.profile.emails;

    if (emails.length === 0) return null;

    return emails.map(function (email, index) {
      return _react2.default.createElement(
        'div',
        { className: 'email', key: 'e' + index },
        _react2.default.createElement(_TextField2.default, {
          className: 'input__material--wide',
          floatingLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.profile.email' }),
          disabled: true,
          type: 'email',
          value: email.email })
      );
    });
  };

  Profile.prototype.renderAbout = function renderAbout() {
    var about = this.state.about;


    return _react2.default.createElement(
      'div',
      { className: 'about' },
      _react2.default.createElement(
        'label',
        { htmlFor: 'about' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.profile.about' })
      ),
      _react2.default.createElement('textarea', {
        className: 'textarea',
        id: 'about',
        onChange: this.handleAboutChange,
        value: about })
    );
  };

  Profile.prototype.render = function render() {
    var profile = this.state.profile;


    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay modal-overlay--white',
        className: 'modal modal--fullscreen',
        onRequestClose: this.handleClose,
        shouldCloseOnOverlayClick: false,
        isOpen: true },
      _react2.default.createElement(_ModalCloseButton2.default, { onClick: this.handleClose }),
      _react2.default.createElement(
        'div',
        { className: 'profile' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.profile.title', tagName: 'h1' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__body row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs' },
              this.renderName(),
              this.renderNick(),
              this.renderPhones(),
              this.renderEmails(),
              this.renderAbout()
            ),
            _react2.default.createElement(_PictureChanger2.default, _extends({}, profile, {
              fromModal: _ActorAppConstants.ModalTypes.PROFILE,
              onRemove: this.handleAvatarRemove,
              onChange: this.handleAvatarChange }))
          ),
          _react2.default.createElement(
            'footer',
            { className: 'modal__footer' },
            this.renderControls()
          )
        )
      )
    );
  };

  return Profile;
}(_react.Component);

Profile.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(Profile);
//# sourceMappingURL=Profile.react.js.map