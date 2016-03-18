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

var Processing = function (_Component) {
  (0, _inherits3.default)(Processing, _Component);

  function Processing(props) {
    (0, _classCallCheck3.default)(this, Processing);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
  }

  Processing.prototype.render = function render() {
    return this.props.children;
  };

  return Processing;
}(_react.Component); /*
                      * Copyright (C) 2015 Actor LLC. <https://actor.im>
                      */

Processing.propTypes = {
  children: _react.PropTypes.node
};
exports.default = Processing;
//# sourceMappingURL=Processing.react.js.map