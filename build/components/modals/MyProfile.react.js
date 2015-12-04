'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _MyProfileActionCreators = require('../../actions/MyProfileActionCreators');

var _MyProfileActionCreators2 = _interopRequireDefault(_MyProfileActionCreators);

var _CropAvatarActionCreators = require('../../actions/CropAvatarActionCreators');

var _CropAvatarActionCreators2 = _interopRequireDefault(_CropAvatarActionCreators);

var _MyProfileStore = require('../../stores/MyProfileStore');

var _MyProfileStore2 = _interopRequireDefault(_MyProfileStore);

var _CropAvatarStore = require('../../stores/CropAvatarStore');

var _CropAvatarStore2 = _interopRequireDefault(_CropAvatarStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _CropAvatar = require('./CropAvatar.react');

var _CropAvatar2 = _interopRequireDefault(_CropAvatar);

var _materialUi = require('material-ui');

var _ActorTheme = require('../../constants/ActorTheme');

var _ActorTheme2 = _interopRequireDefault(_ActorTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ThemeManager = new _materialUi.Styles.ThemeManager();

var MyProfile = (function (_Component) {
  _inherits(MyProfile, _Component);

  function MyProfile(props) {
    _classCallCheck(this, MyProfile);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyProfile).call(this, props));

    _this.setListeners = function () {
      return document.addEventListener('keydown', _this.onKeyDown, false);
    };

    _this.removeListeners = function () {
      return document.removeEventListener('keydown', _this.onKeyDown, false);
    };

    _this.onClose = function () {
      return _MyProfileActionCreators2.default.hide();
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.onClose();
      }
    };

    _this.onNameChange = function (event) {
      return _this.setState({ name: event.target.value });
    };

    _this.onNicknameChange = function (event) {
      return _this.setState({ nick: event.target.value });
    };

    _this.onAboutChange = function (event) {
      return _this.setState({ about: event.target.value });
    };

    _this.onSave = function () {
      var _this$state = _this.state;
      var nick = _this$state.nick;
      var name = _this$state.name;
      var about = _this$state.about;

      _MyProfileActionCreators2.default.saveName(name);
      _MyProfileActionCreators2.default.saveNickname(nick);
      _MyProfileActionCreators2.default.editMyAbout(about);
      _this.onClose();
    };

    _this.onProfilePictureInputChange = function () {
      var imageInput = _react2.default.findDOMNode(_this.refs.imageInput);
      var imageForm = _react2.default.findDOMNode(_this.refs.imageForm);
      var file = imageInput.files[0];

      var reader = new FileReader();
      reader.onload = function (event) {
        _CropAvatarActionCreators2.default.show(event.target.result);
        imageForm.reset();
      };
      reader.readAsDataURL(file);
    };

    _this.onChangeAvatarClick = function () {
      var imageInput = _react2.default.findDOMNode(_this.refs.imageInput);
      imageInput.click();
    };

    _this.onProfilePictureRemove = function () {
      return _MyProfileActionCreators2.default.removeMyAvatar();
    };

    _this.changeMyAvatar = function (croppedImage) {
      return _MyProfileActionCreators2.default.changeMyAvatar(croppedImage);
    };

    return _this;
  }

  _createClass(MyProfile, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      ThemeManager.setTheme(_ActorTheme2.default);
      ThemeManager.setComponentThemes({
        textField: {
          textColor: 'rgba(0,0,0,.87)',
          focusColor: '#68a3e7',
          backgroundColor: 'transparent',
          borderColor: '#68a3e7',
          disabledTextColor: 'rgba(0,0,0,.4)'
        }
      });
      this.setListeners();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextState.isOpen) {
        if (nextState.isCropModalOpen) {
          this.removeListeners();
        } else {
          this.setListeners();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isOpen = _state.isOpen;
      var isCropModalOpen = _state.isCropModalOpen;
      var profile = _state.profile;
      var nick = _state.nick;
      var name = _state.name;
      var about = _state.about;

      var cropAvatar = isCropModalOpen ? _react2.default.createElement(_CropAvatar2.default, { onCropFinish: this.changeMyAvatar }) : null;

      if (profile !== null && isOpen) {
        return _react2.default.createElement(
          _reactModal2.default,
          { className: 'modal-new modal-new--profile',
            closeTimeoutMS: 150,
            isOpen: isOpen,
            style: { width: 440 } },
          _react2.default.createElement(
            'header',
            { className: 'modal-new__header' },
            _react2.default.createElement(
              'a',
              { className: 'modal-new__header__icon material-icons' },
              'person'
            ),
            _react2.default.createElement(
              'h3',
              { className: 'modal-new__header__title' },
              this.getIntlMessage('modal.profile.title')
            ),
            _react2.default.createElement(
              'div',
              { className: 'pull-right' },
              _react2.default.createElement(
                'button',
                { className: 'button button--lightblue', onClick: this.onSave },
                this.getIntlMessage('button.done')
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-new__body row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs' },
              _react2.default.createElement(
                'div',
                { className: 'name' },
                _react2.default.createElement(_materialUi.TextField, { className: 'login__form__input',
                  floatingLabelText: this.getIntlMessage('modal.profile.name'),
                  fullWidth: true,
                  onChange: this.onNameChange,
                  type: 'text',
                  value: name })
              ),
              _react2.default.createElement(
                'div',
                { className: 'nick' },
                _react2.default.createElement(_materialUi.TextField, { className: 'login__form__input',
                  floatingLabelText: this.getIntlMessage('modal.profile.nick'),
                  fullWidth: true,
                  onChange: this.onNicknameChange,
                  type: 'text',
                  value: nick })
              ),
              profile.phones[0] ? _react2.default.createElement(
                'div',
                { className: 'phone' },
                _react2.default.createElement(_materialUi.TextField, { className: 'login__form__input',
                  disabled: true,
                  floatingLabelText: this.getIntlMessage('modal.profile.phone'),
                  fullWidth: true,
                  type: 'tel',
                  value: (profile.phones[0] || {}).number })
              ) : null,
              profile.emails[0] ? _react2.default.createElement(
                'div',
                { className: 'phone' },
                _react2.default.createElement(_materialUi.TextField, { className: 'login__form__input',
                  disabled: true,
                  floatingLabelText: this.getIntlMessage('modal.profile.email'),
                  fullWidth: true,
                  type: 'email',
                  value: (profile.emails[0] || {}).email })
              ) : null,
              _react2.default.createElement(
                'div',
                { className: 'about' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'about' },
                  this.getIntlMessage('modal.profile.about')
                ),
                _react2.default.createElement('textarea', { className: 'textarea',
                  id: 'about',
                  onChange: this.onAboutChange,
                  value: about })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'profile-picture text-center' },
              _react2.default.createElement(
                'div',
                { className: 'profile-picture__changer' },
                _react2.default.createElement(_AvatarItem2.default, { image: profile.bigAvatar,
                  placeholder: profile.placeholder,
                  size: 'big',
                  title: profile.name }),
                _react2.default.createElement(
                  'a',
                  { onClick: this.onChangeAvatarClick },
                  _react2.default.createElement(
                    'span',
                    null,
                    this.getIntlMessage('modal.profile.avatarChange')
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'profile-picture__controls' },
                _react2.default.createElement(
                  'a',
                  { onClick: this.onProfilePictureRemove },
                  this.getIntlMessage('modal.profile.avatarRemove')
                )
              ),
              _react2.default.createElement(
                'form',
                { className: 'hide', ref: 'imageForm' },
                _react2.default.createElement('input', { onChange: this.onProfilePictureInputChange, ref: 'imageInput', type: 'file' })
              )
            )
          ),
          cropAvatar
        );
      } else {
        return null;
      }
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        profile: _MyProfileStore2.default.getProfile(),
        name: _MyProfileStore2.default.getName(),
        nick: _MyProfileStore2.default.getNick(),
        about: _MyProfileStore2.default.getAbout(),
        isOpen: _MyProfileStore2.default.isModalOpen(),
        isCropModalOpen: _CropAvatarStore2.default.isOpen()
      };
    }
  }]);

  return MyProfile;
})(_react.Component);

MyProfile.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object
};

MyProfile.getStores = function () {
  return [_MyProfileStore2.default, _CropAvatarStore2.default];
};

_reactMixin2.default.onClass(MyProfile, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(MyProfile, { pure: false });
//# sourceMappingURL=MyProfile.react.js.map