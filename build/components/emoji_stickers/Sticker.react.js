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

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Sticker = function (_Component) {
  (0, _inherits3.default)(Sticker, _Component);

  function Sticker(props) {
    (0, _classCallCheck3.default)(this, Sticker);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  Sticker.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.sticker === this.props.sticker;
  };

  Sticker.prototype.onClick = function onClick() {
    this.props.onClick(this.props.sticker);
  };

  Sticker.prototype.render = function render() {
    var url = this.props.sticker.url;


    return _react2.default.createElement(
      'div',
      { className: 'sticker', onClick: this.onClick },
      _react2.default.createElement('img', { src: url })
    );
  };

  return Sticker;
}(_react.Component);

Sticker.propTypes = {
  sticker: _react.PropTypes.object.isRequired,
  onClick: _react.PropTypes.func.isRequired
};
exports.default = Sticker;
//# sourceMappingURL=Sticker.react.js.map