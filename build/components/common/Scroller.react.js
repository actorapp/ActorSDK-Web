'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Scroller = function (_Component) {
  _inherits(Scroller, _Component);

  function Scroller(props) {
    _classCallCheck(this, Scroller);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onResize = _this.onResize.bind(_this);
    _this.onReference = _this.onReference.bind(_this);
    return _this;
  }

  Scroller.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  };

  Scroller.prototype.componentDidMount = function componentDidMount() {
    this.props.onUpdate();
    window.addEventListener('resize', this.onResize, false);
  };

  Scroller.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  };

  Scroller.prototype.componentDidUpdate = function componentDidUpdate() {
    this.props.onUpdate();
  };

  Scroller.prototype.onResize = function onResize() {
    this.props.onResize();
  };

  Scroller.prototype.onReference = function onReference(node) {
    this.container = node;
  };

  Scroller.prototype.getDimensions = function getDimensions() {
    return {
      scrollTop: this.container.scrollTop,
      scrollHeight: this.container.scrollHeight,
      offsetHeight: this.container.offsetHeight
    };
  };

  Scroller.prototype.getBoundingClientRect = function getBoundingClientRect() {
    return this.container.getBoundingClientRect();
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
    this.container.scrollTop = this.container.scrollHeight;
  };

  Scroller.prototype.scrollToNode = function scrollToNode(node) {
    this.scrollTo(Math.min(node.offsetTop, this.container.scrollHeight));
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
  onScroll: _noop2.default,
  onResize: _noop2.default
};
exports.default = Scroller;
//# sourceMappingURL=Scroller.react.js.map