'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

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

var raf = window.requestAnimationFrame;

var Scroller = function (_Component) {
  _inherits(Scroller, _Component);

  function Scroller(props) {
    _classCallCheck(this, Scroller);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      top: 0,
      height: 0,
      draging: false
    };

    _this.onScroll = _this.onScroll.bind(_this);
    _this.onResize = _this.onResize.bind(_this);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onReference = _this.onReference.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  Scroller.prototype.componentDidMount = function componentDidMount() {
    this.updateState(true, this.props.onUpdate);
    window.addEventListener('resize', this.onResize, false);
  };

  Scroller.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  };

  Scroller.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.shouldUpdate) {
      this.updateState(true, this.props.onUpdate);
    }
  };

  Scroller.prototype.onReference = function onReference(node) {
    this.container = node;
  };

  Scroller.prototype.onScroll = function onScroll() {
    this.updateState(false, this.props.onScroll);
  };

  Scroller.prototype.onResize = function onResize() {
    this.updateState(false, this.props.onResize);
  };

  Scroller.prototype.onMouseDown = function onMouseDown(event) {
    this.setState({ dragging: true });
    this.lastPageY = event.pageY;

    document.onselectstart = function () {
      return false;
    };
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    return false;
  };

  Scroller.prototype.onMouseMove = function onMouseMove(event) {
    var _this2 = this;

    var delta = event.pageY - this.lastPageY;
    this.lastPageY = event.pageY;

    raf(function () {
      return _this2.container.scrollTop += delta / _this2.scrollRatio;
    });
  };

  Scroller.prototype.onMouseUp = function onMouseUp() {
    this.setState({ dragging: false });

    document.onselectstart = undefined;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
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

  Scroller.prototype.getThumbStyle = function getThumbStyle() {
    var _getDimensions = this.getDimensions();

    var scrollTop = _getDimensions.scrollTop;
    var scrollHeight = _getDimensions.scrollHeight;
    var offsetHeight = _getDimensions.offsetHeight;


    if (scrollHeight === 0 || scrollHeight <= offsetHeight) {
      return { top: 0, height: 0 };
    }

    var height = offsetHeight / scrollHeight * offsetHeight;
    var offsetAvailable = scrollHeight - offsetHeight;
    var offsetPercent = offsetAvailable === 0 ? 0 : scrollTop / offsetAvailable;
    var offset = (offsetHeight - height) * offsetPercent;

    return {
      top: offset,
      height: height
    };
  };

  Scroller.prototype.render = function render() {
    var _state = this.state;
    var top = _state.top;
    var height = _state.height;
    var dragging = _state.dragging;


    var className = (0, _classnames2.default)('scroller__container', this.props.className);
    var scrollbarClassName = (0, _classnames2.default)('scroller__scrollbar', {
      'scroller__scrollbar--active': dragging
    });

    return _react2.default.createElement(
      'div',
      { className: 'scroller__wrapper' },
      _react2.default.createElement(
        'div',
        { className: className, ref: this.onReference, onScroll: this.onScroll },
        this.props.children
      ),
      _react2.default.createElement(
        'div',
        { className: scrollbarClassName },
        _react2.default.createElement('div', {
          className: 'scroller__thumb',
          style: { top: top, height: height },
          onMouseDown: this.onMouseDown
        })
      )
    );
  };

  Scroller.prototype.updateState = function updateState(shouldUpdate, callback) {
    var _this3 = this;

    this.shouldUpdate = shouldUpdate;

    raf(function () {
      var _container = _this3.container;
      var scrollHeight = _container.scrollHeight;
      var clientHeight = _container.clientHeight;

      _this3.scrollRatio = clientHeight / scrollHeight;

      _this3.setState(_this3.getThumbStyle(), callback);
    });
  };

  Scroller.prototype.scrollTo = function scrollTo(offset) {
    this.container.scrollTop = offset;
  };

  Scroller.prototype.scrollToBottom = function scrollToBottom() {
    this.scrollTo(this.container.scrollHeight);
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