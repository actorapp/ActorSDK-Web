'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

var Trigger = function (_Component) {
  (0, _inherits3.default)(Trigger, _Component);

  function Trigger() {
    (0, _classCallCheck3.default)(this, Trigger);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Trigger.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var isActive = _props.isActive;
    var isDotVisible = _props.isDotVisible;
    var props = (0, _objectWithoutProperties3.default)(_props, ['className', 'children', 'isActive', 'isDotVisible']);


    var triggerClassName = (0, _classnames2.default)('message-art__trigger', className, {
      'message-art__trigger--active': isActive,
      'message-art__trigger--with-dot': isDotVisible
    });

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, props, { className: triggerClassName }),
      children
    );
  };

  return Trigger;
}(_react.Component);

Trigger.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  isActive: _react.PropTypes.bool.isRequired,
  isDotVisible: _react.PropTypes.bool.isRequired
};
exports.default = Trigger;
//# sourceMappingURL=Trigger.react.js.map