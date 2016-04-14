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

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Scroller = function (_Component) {
  (0, _inherits3.default)(Scroller, _Component);

  function Scroller(props) {
    (0, _classCallCheck3.default)(this, Scroller);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onReference = _this.onReference.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  Scroller.prototype.componentDidMount = function componentDidMount() {
    this.props.onUpdate();
    window.addEventListener('resize', this.props.onResize, false);
  };

  Scroller.prototype.componentDidUpdate = function componentDidUpdate() {
    this.props.onUpdate();
  };

  Scroller.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.props.onResize, false);
  };

  Scroller.prototype.onReference = function onReference(node) {
    this.container = node;
  };

  Scroller.prototype.render = function render() {
    var className = (0, _classnames2.default)('scroller__container', this.props.className);

    return _react2.default.createElement(
      'div',
      { className: 'scroller__wrapper' },
      _react2.default.createElement(
        'div',
        { className: className, ref: this.onReference, onScroll: this.props.onScroll },
        this.props.children
      )
    );
  };

  Scroller.prototype.scrollTo = function scrollTo(offset) {
    this.container.scrollTop = offset;
  };

  Scroller.prototype.scrollToBottom = function scrollToBottom() {
    this.scrollTo(this.container.scrollHeight);
  };

  Scroller.prototype.getDimensions = function getDimensions() {
    return {
      scrollTop: this.container.scrollTop,
      scrollHeight: this.container.scrollHeight,
      offsetHeight: this.container.offsetHeight
    };
  };

  return Scroller;
}(_react.Component);

Scroller.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  onScroll: _react.PropTypes.func.isRequired,
  onResize: _react.PropTypes.func.isRequired
};
Scroller.defaultProps = {
  onUpdate: _noop2.default,
  onScroll: _noop2.default
};
exports.default = Scroller;
//# sourceMappingURL=Scroller.react.js.map