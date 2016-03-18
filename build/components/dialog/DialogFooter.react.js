"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogFooter = function (_Component) {
  (0, _inherits3.default)(DialogFooter, _Component);

  function DialogFooter() {
    (0, _classCallCheck3.default)(this, DialogFooter);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  DialogFooter.prototype.render = function render() {
    if (!this.props.isMember) {
      return _react2.default.createElement(
        "footer",
        { className: "dialog__footer dialog__footer--disabled row center-xs middle-xs" },
        _react2.default.createElement(
          "h3",
          null,
          "You are not a member"
        )
      );
    }

    var _props$components = this.props.components;
    var TypingSection = _props$components.TypingSection;
    var ComposeSection = _props$components.ComposeSection;


    return _react2.default.createElement(
      "footer",
      { className: "dialog__footer" },
      _react2.default.createElement(TypingSection, null),
      _react2.default.createElement(ComposeSection, null)
    );
  };

  return DialogFooter;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

DialogFooter.propTypes = {
  isMember: _react.PropTypes.bool.isRequired,
  components: _react.PropTypes.shape({
    TypingSection: _react2.default.PropTypes.func.isRequired,
    ComposeSection: _react2.default.PropTypes.func.isRequired
  }).isRequired
};
exports.default = DialogFooter;
//# sourceMappingURL=DialogFooter.react.js.map