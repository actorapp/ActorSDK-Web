"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Checkbox.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { className: "checkbox" },
      _react2.default.createElement("input", {
        type: "checkbox",
        id: this.props.id,
        name: this.props.name,
        checked: this.props.value,
        onChange: this.props.onChange
      }),
      _react2.default.createElement(
        "label",
        { htmlFor: this.props.id },
        this.props.label
      )
    );
  };

  return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
  id: _react.PropTypes.string.isRequired,
  name: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.bool.isRequired,
  label: _react.PropTypes.node.isRequired,
  onChange: _react.PropTypes.func.isRequired
};
exports.default = Checkbox;
//# sourceMappingURL=Checkbox.react.js.map