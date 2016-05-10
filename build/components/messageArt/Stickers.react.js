'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Sticker = require('./Sticker.react');

var _Sticker2 = _interopRequireDefault(_Sticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Stickers = function (_Component) {
  _inherits(Stickers, _Component);

  function Stickers() {
    _classCallCheck(this, Stickers);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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