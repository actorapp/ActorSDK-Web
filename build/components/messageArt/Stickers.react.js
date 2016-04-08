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

var _Sticker = require('./Sticker.react');

var _Sticker2 = _interopRequireDefault(_Sticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

var Stickers = function (_Component) {
  (0, _inherits3.default)(Stickers, _Component);

  function Stickers() {
    (0, _classCallCheck3.default)(this, Stickers);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Stickers.prototype.renderStickers = function renderStickers() {
    var _props = this.props;
    var stickers = _props.stickers;
    var onStickerSelect = _props.onStickerSelect;

    if (stickers.length === 0) return null;

    return stickers.map(function (sticker, index) {
      return _react2.default.createElement(_Sticker2.default, {
        sticker: sticker,
        onClick: onStickerSelect,
        key: index
      });
    });
  };

  Stickers.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'stickers' },
      this.renderStickers()
    );
  };

  return Stickers;
}(_react.Component);

Stickers.propTypes = {
  stickers: _react.PropTypes.array.isRequired,
  onStickerSelect: _react.PropTypes.func.isRequired
};
exports.default = Stickers;
//# sourceMappingURL=Stickers.react.js.map