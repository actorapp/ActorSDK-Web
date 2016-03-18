'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LocationContainer = require('../utils/LocationContainer');

var _LocationContainer2 = _interopRequireDefault(_LocationContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Root react component
 */
/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  App.prototype.getChildContext = function getChildContext() {
    var _props = this.props;
    var delegate = _props.delegate;
    var isExperimental = _props.isExperimental;

    return {
      delegate: delegate, isExperimental: isExperimental
    };
  };

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

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