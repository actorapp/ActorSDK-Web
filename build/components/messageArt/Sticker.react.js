'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Image = require('../common/Image.react');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Sticker = function (_Component) {
  _inherits(Sticker, _Component);

  function Sticker(props) {
    _classCallCheck(this, Sticker);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

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
      _react2.default.createElement(_Image2.default, { src: url })
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