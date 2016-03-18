'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _simpleScrollbar = require('simple-scrollbar');

var _simpleScrollbar2 = _interopRequireDefault(_simpleScrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Scrollbar = function (_Component) {
  (0, _inherits3.default)(Scrollbar, _Component);

  function Scrollbar(props) {
    (0, _classCallCheck3.default)(this, Scrollbar);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.handleScroll = function (event) {
      var onScroll = _this.props.onScroll;

      onScroll && onScroll(event);
    };

    _this.scrollTo = function (to) {
      var scrollNode = (0, _reactDom.findDOMNode)(_this.refs.scroll);
      _this.scrollbar.scrollTo(scrollNode, to);
    };

    _this.scrollbar = new _simpleScrollbar2.default();
    return _this;
  }

  Scrollbar.prototype.componentDidMount = function componentDidMount() {
    var scrollNode = (0, _reactDom.findDOMNode)(this.refs.scroll);
    this.scrollbar.initElement(scrollNode);
  };

  Scrollbar.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;
    var style = _props.style;

    var wrapperClassName = (0, _classnames2.default)('scroll-wrapper', className);

    return _react2.default.createElement(
      'div',
      { className: wrapperClassName, ref: 'scroll', onScroll: this.handleScroll, style: (0, _extends3.default)({}, style) },
      children
    );
  };

  return Scrollbar;
}(_react.Component);

Scrollbar.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.array]),
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,

  onScroll: _react.PropTypes.func
};
exports.default = Scrollbar;
//# sourceMappingURL=Scrollbar.react.js.map