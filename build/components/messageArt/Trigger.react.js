'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Trigger = function (_Component) {
  _inherits(Trigger, _Component);

  function Trigger() {
    _classCallCheck(this, Trigger);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Trigger.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var isActive = _props.isActive;
    var isDotVisible = _props.isDotVisible;

    var props = _objectWithoutProperties(_props, ['className', 'children', 'isActive', 'isDotVisible']);

    var triggerClassName = (0, _classnames2.default)('message-art__trigger', className, {
      'message-art__trigger--active': isActive,
      'message-art__trigger--with-dot': isDotVisible
    });

    return _react2.default.createElement(
      'div',
      _extends({}, props, { className: triggerClassName }),
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