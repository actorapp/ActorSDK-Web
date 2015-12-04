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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Install = (function (_Component) {
  _inherits(Install, _Component);

  function Install(props) {
    _classCallCheck(this, Install);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Install).call(this, props));
  }

  _createClass(Install, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "section",
        { className: "mobile-placeholder col-xs row center-xs middle-xs" },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("img", { alt: "Actor messenger",
            className: "logo",
            src: "assets/images/logo.png",
            srcSet: "assets/images/logo@2x.png 2x" }),
          _react2.default.createElement(
            "h1",
            null,
            "Web version of ",
            _react2.default.createElement(
              "b",
              null,
              "Actor"
            ),
            " works only on desktop browsers at this time"
          ),
          _react2.default.createElement(
            "h3",
            null,
            "Please install our apps for using ",
            _react2.default.createElement(
              "b",
              null,
              "Actor"
            ),
            " on your phone."
          ),
          _react2.default.createElement(
            "p",
            null,
            _react2.default.createElement(
              "a",
              { href: "//actor.im/ios" },
              "iPhone"
            ),
            " | ",
            _react2.default.createElement(
              "a",
              { href: "//actor.im/android" },
              "Android"
            )
          )
        )
      );
    }
  }]);

  return Install;
})(_react.Component);

exports.default = Install;
//# sourceMappingURL=Install.react.js.map