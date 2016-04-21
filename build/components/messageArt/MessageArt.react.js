'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _MessageArtActionCreators = require('../../actions/MessageArtActionCreators');

var _MessageArtActionCreators2 = _interopRequireDefault(_MessageArtActionCreators);

var _Trigger = require('./Trigger.react');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _Popup = require('./Popup.react');

var _Popup2 = _interopRequireDefault(_Popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MessageArt = function (_Component) {
  _inherits(MessageArt, _Component);

  function MessageArt(props) {
    _classCallCheck(this, MessageArt);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  MessageArt.prototype.onMouseLeave = function onMouseLeave() {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = false;
    }

    this.closeTimeout = setTimeout(this.props.onClose, 300);
  };

  MessageArt.prototype.onMouseEnter = function onMouseEnter() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = false;
    }

    if (!this.props.isActive) {
      this.openTimeout = setTimeout(this.props.onOpen, 60);
    }
  };

  MessageArt.prototype.renderPopup = function renderPopup() {
    var _props = this.props;
    var isActive = _props.isActive;
    var stickers = _props.stickers;
    var onSelect = _props.onSelect;
    var onStickerSelect = _props.onStickerSelect;
    var onClose = _props.onClose;

    if (!isActive) return null;

    return _react2.default.createElement(_Popup2.default, {
      onSelect: onSelect,
      onClose: onClose,
      stickers: stickers,
      onStickerSelect: onStickerSelect,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    });
  };

  MessageArt.prototype.render = function render() {
    var isActive = this.props.isActive;


    return _react2.default.createElement(
      'div',
      { className: 'message-art' },
      _react2.default.createElement(
        _Trigger2.default,
        {
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
          isActive: isActive,
          isDotVisible: true
        },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'insert_emoticon'
        )
      ),
      this.renderPopup()
    );
  };

  return MessageArt;
}(_react.Component);

MessageArt.propTypes = {
  isActive: _react.PropTypes.bool.isRequired,
  stickers: _react.PropTypes.array.isRequired,
  onOpen: _react.PropTypes.func.isRequired,
  onClose: _react.PropTypes.func.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  onStickerSelect: _react.PropTypes.func.isRequired
};
MessageArt.defaultProps = {
  onOpen: _MessageArtActionCreators2.default.open,
  onClose: _MessageArtActionCreators2.default.close
};
exports.default = MessageArt;
//# sourceMappingURL=MessageArt.react.js.map