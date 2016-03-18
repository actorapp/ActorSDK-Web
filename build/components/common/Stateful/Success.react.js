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

var Success = function (_Component) {
  (0, _inherits3.default)(Success, _Component);

  function Success(props) {
    (0, _classCallCheck3.default)(this, Success);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
  }

  Success.prototype.render = function render() {
    return this.props.children;
  };

  return Success;
}(_react.Component); /*
                      * Copyright (C) 2015 Actor LLC. <https://actor.im>
                      */

Success.propTypes = {
  children: _react.PropTypes.node
};
exports.default = Success;
//# sourceMappingURL=Success.react.js.map