'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _simpleScrollbar = require('simple-scrollbar');

var _simpleScrollbar2 = _interopRequireDefault(_simpleScrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Scrollbar = (function (_Component) {
  _inherits(Scrollbar, _Component);

  function Scrollbar(props) {
    _classCallCheck(this, Scrollbar);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

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
      { className: wrapperClassName, ref: 'scroll', onScroll: this.handleScroll, style: _extends({}, style) },
      children
    );
  };

  return Scrollbar;
})(_react.Component);

Scrollbar.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.array]),
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,

  onScroll: _react.PropTypes.func
};
exports.default = Scrollbar;
//# sourceMappingURL=Scrollbar.react.js.map