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

var _materialUi = require('material-ui');

var _ActorTheme = require('../../constants/ActorTheme');

var _ActorTheme2 = _interopRequireDefault(_ActorTheme);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _EditGroupStore = require('../../stores/EditGroupStore');

var _EditGroupStore2 = _interopRequireDefault(_EditGroupStore);

var _CropAvatarStore = require('../../stores/CropAvatarStore');

var _CropAvatarStore2 = _interopRequireDefault(_CropAvatarStore);

var _EditGroupActionCreators = require('../../actions/EditGroupActionCreators');

var _EditGroupActionCreators2 = _interopRequireDefault(_EditGroupActionCreators);

var _CropAvatarActionCreators = require('../../actions/CropAvatarActionCreators');

var _CropAvatarActionCreators2 = _interopRequireDefault(_CropAvatarActionCreators);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _CropAvatarReact = require('./CropAvatar.react.js');

var _CropAvatarReact2 = _interopRequireDefault(_CropAvatarReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ThemeManager = new _materialUi.Styles.ThemeManager();

var EditGroup = (function (_Component) {
  _inherits(EditGroup, _Component);

  function EditGroup(props) {
    _classCallCheck(this, EditGroup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EditGroup).call(this, props));

    _this.setListeners = function () {
      return document.addEventListener('keydown', _this.onKeyDown, false);
    };

    _this.removeListeners = function () {
      return document.removeEventListener('keydown', _this.onKeyDown, false);
    };

    _this.onClose = function () {
      return _EditGroupActionCreators2.default.hide();
    };

    _this.onTitleChange = function (event) {
      return _this.setState({ title: event.target.value });
    };

    _this.onAboutChange = function (event) {
      return _this.setState({ about: event.target.value });
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.onClose();
      }
    };

    _this.onSave = function () {
      var _this$state = _this.state;
      var group = _this$state.group;
      var title = _this$state.title;
      var about = _this$state.about;

      _EditGroupActionCreators2.default.editGroupTitle(group.id, title);
      _EditGroupActionCreators2.default.editGroupAbout(group.id, about);
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

    _this.changeGroupAvatar = function (croppedImage) {
      var group = _this.state.group;

      _EditGroupActionCreators2.default.changeGroupAvatar(group.id, croppedImage);
    };

    _this.onProfilePictureRemove = function () {
      var group = _this.state.group;

      _EditGroupActionCreators2.default.removeGroupAvatar(group.id);
    };

    return _this;
  }

  _createClass(EditGroup, [{
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
        nextState.isCropModalOpen ? this.removeListeners() : this.setListeners();
      } else {
        nextState.isCropModalOpen ? this.setListeners() : this.removeListeners();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isOpen = _state.isOpen;
      var group = _state.group;
      var isCropModalOpen = _state.isCropModalOpen;
      var title = _state.title;
      var about = _state.about;

      var cropAvatar = isCropModalOpen ? _react2.default.createElement(_CropAvatarReact2.default, { onCropFinish: this.changeGroupAvatar }) : null;

      if (isOpen) {
        return _react2.default.createElement(
          _reactModal2.default,
          { className: 'modal-new modal-new--edit-group',
            closeTimeoutMS: 150,
            isOpen: isOpen,
            style: { width: 440 } },
          _react2.default.createElement(
            'header',
            { className: 'modal-new__header' },
            _react2.default.createElement(
              'a',
              { className: 'modal-new__header__icon material-icons' },
              'edit'
            ),
            _react2.default.createElement(
              'h3',
              { className: 'modal-new__header__title' },
              this.getIntlMessage('modal.group.title')
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
              _react2.default.createElement(_materialUi.TextField, { className: 'login__form__input',
                floatingLabelText: this.getIntlMessage('modal.group.name'),
                fullWidth: true,
                onChange: this.onTitleChange,
                type: 'text',
                value: title }),
              _react2.default.createElement(
                'div',
                { className: 'about' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'about' },
                  this.getIntlMessage('modal.group.about')
                ),
                _react2.default.createElement('textarea', { className: 'textarea', value: about, onChange: this.onAboutChange, id: 'about' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'profile-picture text-center' },
              _react2.default.createElement(
                'div',
                { className: 'profile-picture__changer' },
                _react2.default.createElement(_AvatarItem2.default, { image: group.bigAvatar,
                  placeholder: group.placeholder,
                  size: 'big',
                  title: group.name }),
                _react2.default.createElement(
                  'a',
                  { onClick: this.onChangeAvatarClick },
                  _react2.default.createElement(
                    'span',
                    null,
                    this.getIntlMessage('modal.group.avatarChange')
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'profile-picture__controls' },
                _react2.default.createElement(
                  'a',
                  { onClick: this.onProfilePictureRemove },
                  this.getIntlMessage('modal.group.avatarRemove')
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
        isOpen: _EditGroupStore2.default.isOpen(),
        group: _EditGroupStore2.default.getGroup(),
        title: _EditGroupStore2.default.getTitle(),
        about: _EditGroupStore2.default.getAbout(),
        isCropModalOpen: _CropAvatarStore2.default.isOpen()
      };
    }
  }]);

  return EditGroup;
})(_react.Component);

EditGroup.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object
};

EditGroup.getStores = function () {
  return [_EditGroupStore2.default, _CropAvatarStore2.default];
};

_reactMixin2.default.onClass(EditGroup, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(EditGroup, { pure: false });
//# sourceMappingURL=EditGroup.react.js.map