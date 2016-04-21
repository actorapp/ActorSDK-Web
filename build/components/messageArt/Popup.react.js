'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _Emojis = require('./Emojis.react');

var _Emojis2 = _interopRequireDefault(_Emojis);

var _Stickers = require('./Stickers.react');

var _Stickers2 = _interopRequireDefault(_Stickers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Popup = function (_Component) {
  _inherits(Popup, _Component);

  function Popup(props) {
    _classCallCheck(this, Popup);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      currentState: _ActorAppConstants.MessageArtPopupState.EMOJI
    };

    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  Popup.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  Popup.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  Popup.prototype.handleKeyDown = function handleKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      event.preventDefault();
      this.props.onClose();
    }
  };

  Popup.prototype.handleTabClick = function handleTabClick(state) {
    this.setState({ currentState: state });
  };

  Popup.prototype.renderBody = function renderBody() {
    var currentState = this.state.currentState;


    switch (currentState) {
      case _ActorAppConstants.MessageArtPopupState.EMOJI:
        return _react2.default.createElement(_Emojis2.default, { onSelect: this.props.onSelect });
      case _ActorAppConstants.MessageArtPopupState.STICKER:
        return _react2.default.createElement(_Stickers2.default, {
          stickers: this.props.stickers,
          onStickerSelect: this.props.onStickerSelect
        });
      default:
        return null;
    }
  };

  Popup.prototype.renderFooter = function renderFooter() {
    var _this2 = this;

    var currentState = this.state.currentState;


    var emojiTabClassName = (0, _classnames2.default)('tab', {
      'tab--active': currentState === _ActorAppConstants.MessageArtPopupState.EMOJI
    });
    var stickerTabClassName = (0, _classnames2.default)('tab', {
      'tab--active': currentState === _ActorAppConstants.MessageArtPopupState.STICKER
    });

    return _react2.default.createElement(
      'footer',
      { className: 'message-art__popup__footer' },
      _react2.default.createElement(
        'div',
        { className: emojiTabClassName,
          onClick: function onClick() {
            return _this2.handleTabClick(_ActorAppConstants.MessageArtPopupState.EMOJI);
          } },
        'Emojis'
      ),
      _react2.default.createElement(
        'div',
        { className: stickerTabClassName,
          onClick: function onClick() {
            return _this2.handleTabClick(_ActorAppConstants.MessageArtPopupState.STICKER);
          } },
        'Stickers'
      )
    );
  };

  Popup.prototype.render = function render() {
    var _props = this.props;
    var onMouseEnter = _props.onMouseEnter;
    var onMouseLeave = _props.onMouseLeave;


    return _react2.default.createElement(
      'div',
      {
        className: 'message-art__popup',
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      },
      _react2.default.createElement(
        'div',
        { className: 'message-art__popup__body' },
        this.renderBody()
      ),
      this.renderFooter()
    );
  };

  return Popup;
}(_react.Component);

Popup.propTypes = {
  className: _react.PropTypes.string,
  stickers: _react.PropTypes.array.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  onStickerSelect: _react.PropTypes.func.isRequired,
  onClose: _react.PropTypes.func.isRequired,
  onMouseEnter: _react.PropTypes.func.isRequired,
  onMouseLeave: _react.PropTypes.func.isRequired
};
exports.default = Popup;
//# sourceMappingURL=Popup.react.js.map