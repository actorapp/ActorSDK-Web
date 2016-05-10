'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _EditGroupStore = require('../../stores/EditGroupStore');

var _EditGroupStore2 = _interopRequireDefault(_EditGroupStore);

var _EditGroupActionCreators = require('../../actions/EditGroupActionCreators');

var _EditGroupActionCreators2 = _interopRequireDefault(_EditGroupActionCreators);

var _TextField = require('../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

var _PictureChanger = require('./profile/PictureChanger.react');

var _PictureChanger2 = _interopRequireDefault(_PictureChanger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var EditGroup = function (_Component) {
  _inherits(EditGroup, _Component);

  EditGroup.getStores = function getStores() {
    return [_EditGroupStore2.default];
  };

  EditGroup.calculateState = function calculateState() {
    return {
      group: _EditGroupStore2.default.getGroup(),
      isAdmin: _EditGroupStore2.default.isAdmin(),
      title: _EditGroupStore2.default.getTitle(),
      about: _EditGroupStore2.default.getAbout()
    };
  };

  function EditGroup(props) {
    _classCallCheck(this, EditGroup);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleTitleChange = _this.handleTitleChange.bind(_this);
    _this.handleAboutChange = _this.handleAboutChange.bind(_this);
    _this.handleSave = _this.handleSave.bind(_this);
    _this.handleChangeGroupAvatar = _this.handleChangeGroupAvatar.bind(_this);
    _this.handleRemoveGroupPicture = _this.handleRemoveGroupPicture.bind(_this);
    return _this;
  }

  EditGroup.prototype.handleClose = function handleClose() {
    _EditGroupActionCreators2.default.hide();
  };

  EditGroup.prototype.handleTitleChange = function handleTitleChange(event) {
    this.setState({ title: event.target.value });
  };

  EditGroup.prototype.handleAboutChange = function handleAboutChange(event) {
    this.setState({ about: event.target.value });
  };

  EditGroup.prototype.handleSave = function handleSave() {
    var _state = this.state;
    var group = _state.group;
    var title = _state.title;
    var about = _state.about;
    var isAdmin = _state.isAdmin;

    _EditGroupActionCreators2.default.editGroupTitle(group.id, title);
    if (isAdmin) {
      _EditGroupActionCreators2.default.editGroupAbout(group.id, about);
    }
    this.handleClose();
  };

  EditGroup.prototype.handleChangeGroupAvatar = function handleChangeGroupAvatar(croppedImage) {
    var group = this.state.group;

    _EditGroupActionCreators2.default.changeGroupAvatar(group.id, croppedImage);
  };

  EditGroup.prototype.handleRemoveGroupPicture = function handleRemoveGroupPicture() {
    var group = this.state.group;

    _EditGroupActionCreators2.default.removeGroupAvatar(group.id);
  };

  EditGroup.prototype.renderTitle = function renderTitle() {
    var title = this.state.title;


    return _react2.default.createElement(_TextField2.default, {
      className: 'input__material--wide',
      floatingLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.group.name' }),
      onChange: this.handleTitleChange,
      ref: 'name',
      value: title });
  };

  EditGroup.prototype.renderAbout = function renderAbout() {
    var _state2 = this.state;
    var isAdmin = _state2.isAdmin;
    var about = _state2.about;

    if (!isAdmin) return null;

    return _react2.default.createElement(
      'div',
      { className: 'about' },
      _react2.default.createElement(
        'label',
        { htmlFor: 'about' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.group.about' })
      ),
      _react2.default.createElement('textarea', { className: 'textarea', value: about, onChange: this.handleAboutChange, id: 'about' })
    );
  };

  EditGroup.prototype.render = function render() {
    var group = this.state.group;


    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay',
        className: 'modal',
        onRequestClose: this.handleClose,
        isOpen: true },
      _react2.default.createElement(
        'div',
        { className: 'edit-group' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(
              'i',
              { className: 'modal__header__icon material-icons' },
              'edit'
            ),
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.group.title', tagName: 'h1' }),
            _react2.default.createElement(
              'button',
              { className: 'button button--lightblue', onClick: this.handleSave },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.done' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__body row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs' },
              this.renderTitle(),
              this.renderAbout()
            ),
            _react2.default.createElement(_PictureChanger2.default, _extends({}, group, {
              small: true,
              fromModal: _ActorAppConstants.ModalTypes.EDIT_GROUP,
              onRemove: this.handleRemoveGroupPicture,
              onChange: this.handleChangeGroupAvatar }))
          )
        )
      )
    );
  };

  return EditGroup;
}(_react.Component);

exports.default = _utils.Container.create(EditGroup, { pure: false });
//# sourceMappingURL=EditGroup.react.js.map