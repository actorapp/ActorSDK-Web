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

var Loading = function (_Component) {
  (0, _inherits3.default)(Loading, _Component);

  function Loading() {
    (0, _classCallCheck3.default)(this, Loading);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Loading.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

  Loading.prototype.render = function render() {
    var intl = this.context.intl;


    return _react2.default.createElement(
      "div",
      { className: "message message--loading" },
      _react2.default.createElement(
        "div",
        { className: "message__body col-xs text-center" },
        intl.messages['message.loading']
      )
    );
  };

  return Loading;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

Loading.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = Loading;
//# sourceMappingURL=Loading.react.js.map