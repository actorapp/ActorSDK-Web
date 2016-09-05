'use strict';

exports.__esModule = true;

var _react = require('react');

var _LocationContainer = require('../utils/LocationContainer');

var _LocationContainer2 = _interopRequireDefault(_LocationContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Root react component
 */
var App = function (_Component) {
  _inherits(App, _Component);

  App.prototype.getChildContext = function getChildContext() {
    var _props = this.props;
    var delegate = _props.delegate;
    var isExperimental = _props.isExperimental;

    return {
      delegate: delegate, isExperimental: isExperimental
    };
  };

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _LocationContainer2.default.set(props.location);
    return _this;
  }

  App.prototype.render = function render() {
    return this.props.children;
  };

  return App;
}(_react.Component);

App.propTypes = {
  delegate: _react.PropTypes.object,
  isExperimental: _react.PropTypes.bool,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  location: _react.PropTypes.object
};
App.childContextTypes = {
  delegate: _react.PropTypes.object,
  isExperimental: _react.PropTypes.bool
};
exports.default = App;
//# sourceMappingURL=App.react.js.map