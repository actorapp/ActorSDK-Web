'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

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

var _TextField = require('../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var currentName = '',
    currentNick = '',
    currentAbout = '';

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

    _this.handleClose = function () {
      return _MyProfileActionCreators2.default.hide();
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.handleClose();
      }
    };

    _this.handleNameChange = function (event) {
      return _this.setState({ name: event.target.value });
    };

    _this.handleNicknameChange = function (event) {
      return _this.setState({ nick: event.target.value });
    };

    _this.handleAboutChange = function (event) {
      return _this.setState({ about: event.target.value });
    };

    _this.isProfileChanged = function () {
      var _this$state = _this.state;
      var name = _this$state.name;
      var nick = _this$state.nick;
      var about = _this$state.about;

      return name !== currentName || nick !== currentNick || about !== currentAbout;
    };

    _this.handleSave = function () {
      var _this$state2 = _this.state;
      var nick = _this$state2.nick;
      var name = _this$state2.name;
      var about = _this$state2.about;

      if (name !== currentName) _MyProfileActionCreators2.default.saveName(name);
      if (nick !== currentNick) _MyProfileActionCreators2.default.saveNickname(nick);
      if (about !== currentAbout) _MyProfileActionCreators2.default.editMyAbout(about);

      _this.handleClose();
    };

    _this.onProfilePictureInputChange = function () {
      var imageInput = (0, _reactDom.findDOMNode)(_this.refs.imageInput);
      var imageForm = (0, _reactDom.findDOMNode)(_this.refs.imageForm);
      var file = imageInput.files[0];

      var reader = new FileReader();
      reader.onload = function (event) {
        _CropAvatarActionCreators2.default.show(event.target.result);
        imageForm.reset();
      };
      reader.readAsDataURL(file);
    };

    _this.handleChangeAvatarClick = function () {
      var imageInput = (0, _reactDom.findDOMNode)(_this.refs.imageInput);
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _state = this.state;
      var name = _state.name;
      var nick = _state.nick;
      var about = _state.about;

      currentName = name;
      currentNick = nick;
      currentAbout = about;

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
      var _state2 = this.state;
      var isOpen = _state2.isOpen;
      var isCropModalOpen = _state2.isCropModalOpen;
      var profile = _state2.profile;
      var nick = _state2.nick;
      var name = _state2.name;
      var about = _state2.about;
      var intl = this.context.intl;

      var isProfileChanged = this.isProfileChanged();

      var cropAvatar = isCropModalOpen ? _react2.default.createElement(_CropAvatar2.default, { onCropFinish: this.changeMyAvatar }) : null;

      var modalStyle = {
        content: {
          position: null,
          top: null,
          left: null,
          right: null,
          bottom: null,
          border: null,
          background: null,
          overflow: null,
          outline: null,
          padding: null,
          borderRadius: null,
          width: 440
        }
      };

      if (profile !== null && isOpen) {
        return _react2.default.createElement(
          _reactModal2.default,
          { className: 'modal-new modal-new--profile',
            closeTimeoutMS: 150,
            isOpen: isOpen,
            style: modalStyle },
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
              intl.messages['modal.profile.title']
            ),
            _react2.default.createElement(
              'div',
              { className: 'pull-right' },
              isProfileChanged ? _react2.default.createElement(
                'button',
                { className: 'button button--lightblue', onClick: this.handleSave },
                intl.messages['button.save']
              ) : _react2.default.createElement(
                'button',
                { className: 'button', onClick: this.handleClose },
                intl.messages['button.close']
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
                _react2.default.createElement(_TextField2.default, { className: 'input__material--wide',
                  floatingLabel: intl.messages['modal.profile.name'],
                  onChange: this.handleNameChange,
                  type: 'text',
                  value: name })
              ),
              _react2.default.createElement(
                'div',
                { className: 'nick' },
                _react2.default.createElement(_TextField2.default, { className: 'input__material--wide',
                  floatingLabel: intl.messages['modal.profile.nick'],
                  onChange: this.handleNicknameChange,
                  type: 'text',
                  value: nick })
              ),
              profile.phones[0] ? _react2.default.createElement(
                'div',
                { className: 'phone' },
                _react2.default.createElement(_TextField2.default, { className: 'input__material--wide',
                  floatingLabel: intl.messages['modal.profile.phone'],
                  disabled: true,
                  type: 'tel',
                  value: (profile.phones[0] || {}).number })
              ) : null,
              profile.emails[0] ? _react2.default.createElement(
                'div',
                { className: 'phone' },
                _react2.default.createElement(_TextField2.default, { className: 'input__material--wide',
                  floatingLabel: intl.messages['modal.profile.email'],
                  disabled: true,
                  type: 'email',
                  value: (profile.emails[0] || {}).email })
              ) : null,
              _react2.default.createElement(
                'div',
                { className: 'about' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'about' },
                  intl.messages['modal.profile.about']
                ),
                _react2.default.createElement('textarea', { className: 'textarea',
                  id: 'about',
                  onChange: this.handleAboutChange,
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
                  { onClick: this.handleChangeAvatarClick },
                  _react2.default.createElement(
                    'span',
                    null,
                    intl.messages['modal.profile.avatarChange']
                  )
                )
              ),
              profile.bigAvatar ? _react2.default.createElement(
                'div',
                { className: 'profile-picture__controls' },
                _react2.default.createElement(
                  'a',
                  { onClick: this.onProfilePictureRemove },
                  intl.messages['modal.profile.avatarRemove']
                )
              ) : null,
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

MyProfile.getStores = function () {
  return [_MyProfileStore2.default, _CropAvatarStore2.default];
};

MyProfile.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(MyProfile, { pure: false });
//# sourceMappingURL=MyProfile.react.js.map