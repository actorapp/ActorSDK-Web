'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CropActionCreators = require('../../../actions/CropActionCreators');

var _CropActionCreators2 = _interopRequireDefault(_CropActionCreators);

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PictureChanger = function (_Component) {
  _inherits(PictureChanger, _Component);

  function PictureChanger(props) {
    _classCallCheck(this, PictureChanger);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleChangeAvatarClick = _this.handleChangeAvatarClick.bind(_this);
    _this.handlePictureInputChange = _this.handlePictureInputChange.bind(_this);
    return _this;
  }

  PictureChanger.prototype.handleChangeAvatarClick = function handleChangeAvatarClick(event) {
    var imageInput = (0, _reactDom.findDOMNode)(this.refs.imageInput);
    imageInput.click(event);
  };

  PictureChanger.prototype.handlePictureInputChange = function handlePictureInputChange() {
    var _props = this.props;
    var fromModal = _props.fromModal;
    var onChange = _props.onChange;

    var reader = new FileReader();
    var imageForm = (0, _reactDom.findDOMNode)(this.refs.imageForm);
    var file = (0, _reactDom.findDOMNode)(this.refs.imageInput).files[0];

    reader.onload = function (event) {
      _CropActionCreators2.default.show(event.target.result, fromModal, onChange);
      imageForm.reset();
    };
    reader.readAsDataURL(file);
  };

  PictureChanger.prototype.renderPictureChanger = function renderPictureChanger() {
    var _props2 = this.props;
    var bigAvatar = _props2.bigAvatar;
    var placeholder = _props2.placeholder;
    var name = _props2.name;
    var small = _props2.small;


    return _react2.default.createElement(
      'div',
      { className: 'picture-changer__changer' },
      _react2.default.createElement(_AvatarItem2.default, {
        image: bigAvatar,
        placeholder: placeholder,
        size: small ? 'big' : 'huge',
        title: name }),
      _react2.default.createElement(
        'a',
        { onClick: this.handleChangeAvatarClick },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.profile.avatarChange' })
      )
    );
  };

  PictureChanger.prototype.renderPictureRemover = function renderPictureRemover() {
    var bigAvatar = this.props.bigAvatar;

    if (!bigAvatar) return null;

    return _react2.default.createElement(
      'div',
      { className: 'picture-changer__controls' },
      _react2.default.createElement(
        'a',
        { onClick: this.props.onRemove },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.profile.avatarRemove' })
      )
    );
  };

  PictureChanger.prototype.render = function render() {
    var pictureChangerClassName = (0, _classnames2.default)('picture-changer', {
      'picture-changer--small': this.props.small
    });

    return _react2.default.createElement(
      'div',
      { className: pictureChangerClassName },
      this.renderPictureChanger(),
      this.renderPictureRemover(),
      _react2.default.createElement(
        'form',
        { className: 'hide', ref: 'imageForm' },
        _react2.default.createElement('input', { onChange: this.handlePictureInputChange, ref: 'imageInput', type: 'file' })
      )
    );
  };

  return PictureChanger;
}(_react.Component);

PictureChanger.propTypes = {
  bigAvatar: _react.PropTypes.string,
  placeholder: _react.PropTypes.string.isRequired,
  name: _react.PropTypes.string.isRequired,

  small: _react.PropTypes.bool,

  fromModal: _react.PropTypes.oneOf([_ActorAppConstants.ModalTypes.PROFILE, _ActorAppConstants.ModalTypes.CREATE_GROUP, _ActorAppConstants.ModalTypes.EDIT_GROUP]).isRequired,

  onRemove: _react.PropTypes.func.isRequired,
  onChange: _react.PropTypes.func.isRequired
};
exports.default = PictureChanger;
//# sourceMappingURL=PictureChanger.react.js.map