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

/**
 * Class that represents a component for display service message content
 * @param {String} text Service message text
 * @param {String} className Component class name
 */
var Service = function (_Component) {
  _inherits(Service, _Component);

  function Service(props) {
    _classCallCheck(this, Service);

    return _possibleConstructorReturn(this, _Component.call(this, props));
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
}(_react.Component);

Service.propTypes = {
  text: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string
};
exports.default = Service;
//# sourceMappingURL=Service.react.js.map