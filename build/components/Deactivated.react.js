"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Deactivated = (function (_Component) {
  _inherits(Deactivated, _Component);

  function Deactivated(props) {
    _classCallCheck(this, Deactivated);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Deactivated).call(this, props));
  }

  _createClass(Deactivated, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "deactivated row center-xs middle-xs" },
        _react2.default.createElement(
          "div",
          { className: "deactivated__window" },
          _react2.default.createElement(
            "h2",
            null,
            "Tab deactivated"
          ),
          _react2.default.createElement(
            "p",
            null,
            "Oops, you have opened another tab with Actor, so we had to deactivate this one to prevent some dangerous things happening."
          )
        )
      );
    }
  }]);

  return Deactivated;
})(_react.Component);

exports.default = Deactivated;
//# sourceMappingURL=Deactivated.react.js.map