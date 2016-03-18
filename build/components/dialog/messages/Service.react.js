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

/**
 * Class that represents a component for display service message content
 * @param {String} text Service message text
 * @param {String} className Component class name
 */

var Service = function (_Component) {
  (0, _inherits3.default)(Service, _Component);

  function Service(props) {
    (0, _classCallCheck3.default)(this, Service);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
  }

  Service.prototype.render = function render() {
    var _props = this.props;
    var text = _props.text;
    var className = _props.className;


    return _react2.default.createElement(
      "div",
      { className: className },
      _react2.default.createElement(
        "div",
        { className: "service" },
        text
      )
    );
  };

  return Service;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

Service.propTypes = {
  text: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string
};
exports.default = Service;
//# sourceMappingURL=Service.react.js.map