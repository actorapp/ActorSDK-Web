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

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _EditGroupStore = require('../../stores/EditGroupStore');

var _EditGroupStore2 = _interopRequireDefault(_EditGroupStore);

var _CropAvatarStore = require('../../stores/CropAvatarStore');

var _CropAvatarStore2 = _interopRequireDefault(_CropAvatarStore);

var _EditGroupActionCreators = require('../../actions/EditGroupActionCreators');

var _EditGroupActionCreators2 = _interopRequireDefault(_EditGroupActionCreators);

var _CropAvatarActionCreators = require('../../actions/CropAvatarActionCreators');

var _CropAvatarActionCreators2 = _interopRequireDefault(_CropAvatarActionCreators);

var _TextField = require('../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _CropAvatar = require('./CropAvatar.react');

var _CropAvatar2 = _interopRequireDefault(_CropAvatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var EditGroup = function (_Component) {
  (0, _inherits3.default)(EditGroup, _Component);

  function EditGroup(props) {
    (0, _classCallCheck3.default)(this, EditGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

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
      var isAdmin = _this$state.isAdmin;

      _EditGroupActionCreators2.default.editGroupTitle(group.id, title);
      if (isAdmin) {
        _EditGroupActionCreators2.default.editGroupAbout(group.id, about);
      }
      _this.onClose();
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

    _this.onChangeAvatarClick = function () {
      var imageInput = (0, _reactDom.findDOMNode)(_this.refs.imageInput);
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

  EditGroup.getStores = function getStores() {
    return [_EditGroupStore2.default, _CropAvatarStore2.default];
  };

  EditGroup.calculateState = function calculateState() {
    return {
      isOpen: _EditGroupStore2.default.isOpen(),
      group: _EditGroupStore2.default.getGroup(),
      isAdmin: _EditGroupStore2.default.isAdmin(),
      title: _EditGroupStore2.default.getTitle(),
      about: _EditGroupStore2.default.getAbout(),
      isCropModalOpen: _CropAvatarStore2.default.isOpen()
    };
  };

  EditGroup.prototype.componentWillUnmount = function componentWillUnmount() {
    this.removeListeners();
  };

  EditGroup.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextState.isOpen) {
      nextState.isCropModalOpen ? this.removeListeners() : this.setListeners();
    } else {
      nextState.isCropModalOpen ? this.setListeners() : this.removeListeners();
    }
  };

  EditGroup.prototype.render = function render() {
    var _state = this.state;
    var isOpen = _state.isOpen;
    var group = _state.group;
    var isCropModalOpen = _state.isCropModalOpen;
    var title = _state.title;
    var about = _state.about;
    var isAdmin = _state.isAdmin;
    var intl = this.context.intl;


    var cropAvatar = isCropModalOpen ? _react2.default.createElement(_CropAvatar2.default, { onCropFinish: this.changeGroupAvatar }) : null;
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

    if (isOpen) {
      return _react2.default.createElement(
        _reactModal2.default,
        { className: 'modal-new modal-new--edit-group',
          closeTimeoutMS: 150,
          isOpen: isOpen,
          style: modalStyle },
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
            intl.messages['modal.group.title']
          ),
          _react2.default.createElement(
            'div',
            { className: 'pull-right' },
            _react2.default.createElement(
              'button',
              { className: 'button button--lightblue', onClick: this.onSave },
              intl.messages['button.done']
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-new__body row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs' },
            _react2.default.createElement(_TextField2.default, { className: 'input__material--wide',
              floatingLabel: intl.messages['modal.group.name'],
              onChange: this.onTitleChange,
              ref: 'name',
              value: title }),
            isAdmin ? _react2.default.createElement(
              'div',
              { className: 'about' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'about' },
                intl.messages['modal.group.about']
              ),
              _react2.default.createElement('textarea', { className: 'textarea', value: about, onChange: this.onAboutChange, id: 'about' })
            ) : null
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
                  intl.messages['modal.group.avatarChange']
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'profile-picture__controls' },
              _react2.default.createElement(
                'a',
                { onClick: this.onProfilePictureRemove },
                intl.messages['modal.group.avatarRemove']
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
  };

  return EditGroup;
}(_react.Component);

EditGroup.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(EditGroup, { pure: false });
//# sourceMappingURL=EditGroup.react.js.map