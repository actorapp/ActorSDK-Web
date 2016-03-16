'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * On which scrollTop value start loading older messages
 */
var MAX_LOAD_HEIGHT = 100;

var MessagesScroller = function (_Component) {
  _inherits(MessagesScroller, _Component);

  function MessagesScroller(props) {
    _classCallCheck(this, MessagesScroller);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

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

      this._scrollHeight = scrollHeight;
      this._scrollTop = scrollTop;
      this._shouldScrollBottom = scrollTop + offsetHeight === scrollHeight;
    } else {
      this._shouldScrollBottom = true;
    }
  };

  MessagesScroller.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.node.scrollHeight > this._scrollHeight) {
      this.node.scrollTop = this._scrollTop + (this.node.scrollHeight - this._scrollHeight);
    } else if (this._shouldScrollBottom) {
      this.scrollToBottom();
    }
  };

  MessagesScroller.prototype.scrollToBottom = function scrollToBottom() {
    this.node.scrollTop = this.node.scrollHeight;
  };

  MessagesScroller.prototype.onRef = function onRef(node) {
    this.node = node;
  };

  MessagesScroller.prototype.onScroll = function onScroll(_ref) {
    var target = _ref.target;
    var scrollTop = target.scrollTop;
    var offsetHeight = target.offsetHeight;

    if (scrollTop < offsetHeight) {
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