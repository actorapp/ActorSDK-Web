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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToggleFavorite = function (_Component) {
  (0, _inherits3.default)(ToggleFavorite, _Component);

  function ToggleFavorite() {
    (0, _classCallCheck3.default)(this, ToggleFavorite);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  ToggleFavorite.prototype.render = function render() {
    var glyph = this.props.value ? 'star' : 'star_border';

    return _react2.default.createElement(
      'i',
      { className: 'material-icons', onClick: this.props.onToggle },
      glyph
    );
  };

  return ToggleFavorite;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

ToggleFavorite.propTypes = {
  value: _react.PropTypes.bool.isRequired,
  onToggle: _react.PropTypes.func.isRequired
};
exports.default = ToggleFavorite;
//# sourceMappingURL=ToggleFavorite.react.js.map