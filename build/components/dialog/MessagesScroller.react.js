'use strict';

exports.__esModule = true;

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * On which scrollTop value start loading older messages
 */
/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var MAX_LOAD_HEIGHT = 100;

var MessagesScroller = function (_Component) {
  (0, _inherits3.default)(MessagesScroller, _Component);

  function MessagesScroller(props) {
    (0, _classCallCheck3.default)(this, MessagesScroller);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onRef = _this.onRef.bind(_this);
    _this.onScroll = _this.onScroll.bind(_this);
    return _this;
  }

  MessagesScroller.prototype.componentDidMount = function componentDidMount() {
    this.scrollToBottom();
  };

  MessagesScroller.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    var isSamePeer = _PeerUtils2.default.equals(nextProps.peer, this.props.peer);
    if (isSamePeer) {
      var _node = this.node;
      var scrollTop = _node.scrollTop;
      var offsetHeight = _node.offsetHeight;
      var scrollHeight = _node.scrollHeight;

      this._scrollTop = scrollTop;
      this._scrollHeight = scrollHeight;
      this._shouldScrollBottom = scrollTop + offsetHeight === scrollHeight;
    } else {
      this._shouldScrollBottom = true;
    }
  };

  MessagesScroller.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var scrollHeight = this.node.scrollHeight;
    // check if container become bigger

    if (scrollHeight > this._scrollHeight) {
      requestAnimationFrame(function () {
        _this2.node.scrollTop = _this2._scrollTop + (scrollHeight - _this2._scrollHeight);
      });
      return;
    }

    var scrollTop = this.node.scrollTop;
    // check if scroll on top on container

    if (scrollTop === 0) {
      (0, _setImmediate3.default)(function () {
        _this2.props.onLoadMore();
      });
      return;
    }

    if (this._shouldScrollBottom) {
      this.scrollToBottom();
    }
  };

  MessagesScroller.prototype.scrollToBottom = function scrollToBottom() {
    this.node.scrollTop = this.node.scrollHeight;
  };

  MessagesScroller.prototype.onRef = function onRef(node) {
    this.node = node;
  };

  MessagesScroller.prototype.onScroll = function onScroll() {
    var scrollTop = this.node.scrollTop;

    if (scrollTop <= MAX_LOAD_HEIGHT) {
      this.props.onLoadMore();
    }
  };

  MessagesScroller.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: this.props.className, onScroll: this.onScroll, ref: this.onRef },
      this.props.children
    );
  };

  return MessagesScroller;
}(_react.Component);

MessagesScroller.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string,
  children: _react.PropTypes.node.isRequired,
  onLoadMore: _react.PropTypes.func.isRequired
};
exports.default = MessagesScroller;
//# sourceMappingURL=MessagesScroller.react.js.map