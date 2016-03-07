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

var DialogFooter = function (_Component) {
  _inherits(DialogFooter, _Component);

  function DialogFooter() {
    _classCallCheck(this, DialogFooter);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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
}(_react.Component);

DialogFooter.propTypes = {
  isMember: _react.PropTypes.bool.isRequired,
  components: _react.PropTypes.shape({
    TypingSection: _react2.default.PropTypes.func.isRequired,
    ComposeSection: _react2.default.PropTypes.func.isRequired
  }).isRequired
};
exports.default = DialogFooter;
//# sourceMappingURL=DialogFooter.react.js.map