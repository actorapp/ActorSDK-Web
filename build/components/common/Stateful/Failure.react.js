'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Failure = function (_Component) {
  (0, _inherits3.default)(Failure, _Component);

  function Failure(props) {
    (0, _classCallCheck3.default)(this, Failure);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
  }

  Failure.prototype.render = function render() {
    return this.props.children;
  };

  return Failure;
}(_react.Component); /*
                      * Copyright (C) 2015 Actor LLC. <https://actor.im>
                      */

Failure.propTypes = {
  children: _react.PropTypes.node
};
exports.default = Failure;
//# sourceMappingURL=Failure.react.js.map