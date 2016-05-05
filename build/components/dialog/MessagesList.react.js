'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _MessageUtils = require('../../utils/MessageUtils');

var _Scroller = require('../common/Scroller.react');

var _Scroller2 = _interopRequireDefault(_Scroller);

var _MessageItem = require('./messages/MessageItem.react');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

var _Welcome = require('./messages/Welcome.react');

var _Welcome2 = _interopRequireDefault(_Welcome);

var _Loading = require('./messages/Loading.react');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MessagesList = function (_Component) {
  _inherits(MessagesList, _Component);

  function MessagesList(props, context) {
    _classCallCheck(this, MessagesList);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    var dialog = context.delegate.components.dialog;

    if (dialog && dialog.messages) {
      _this.components = {
        MessageItem: (0, _lodash.isFunction)(dialog.messages.message) ? dialog.messages.message : _MessageItem2.default,
        Welcome: (0, _lodash.isFunction)(dialog.messages.welcome) ? dialog.messages.welcome : _Welcome2.default
      };
    } else {
      _this.components = {
        MessageItem: _MessageItem2.default,
        Welcome: _Welcome2.default
      };
    }

    _this.state = {
      showScrollToBottom: false
    };

    _this.dimensions = null;
    _this.isLoading = false;

    _this.onResize = _this.onResize.bind(_this);
    _this.onScroll = (0, _lodash.throttle)(_this.onScroll.bind(_this), 300);
    _this.handleScrollToBottom = _this.handleScrollToBottom.bind(_this);
    return _this;
  }

  MessagesList.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.peer !== this.props.peer || nextProps.messages !== this.props.messages || nextProps.isMember !== this.props.isMember || nextState.showScrollToBottom !== this.state.showScrollToBottom;
  };

  MessagesList.prototype.componentDidMount = function componentDidMount() {
    this.restoreScroll();
  };

  MessagesList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!_PeerUtils2.default.equals(nextProps.peer, this.props.peer)) {
      console.debug('Peer changed, set dimensions to null');
      this.dimensions = null;
      this.isLoading = false;
    } else {
      console.debug('Update dimensions due messages will rerender');
      this.updateDimensions(this.refs.scroller.getDimensions());
    }
  };

  MessagesList.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevState.showScrollToBottom !== this.state.showScrollToBottom) {
      return;
    }

    var dimensions = this.dimensions;
    var scroller = this.refs.scroller;
    var _props = this.props;
    var uid = _props.uid;
    var messages = _props.messages;


    if (messages.firstUnreadId && messages.firstUnreadId !== prevProps.messages.firstUnreadId) {
      if (this.refs.unread) {
        console.debug('Scroll to unread divider');
        this.refs.scroller.scrollToNode(this.refs.unread);
      } else {
        console.debug('Scroll to unread divider impossible');
      }
    } else if (messages.changeReason === _ActorAppConstants.MessageChangeReason.PUSH) {
      var _isLastMessageMine = (0, _MessageUtils.isLastMessageMine)(uid, messages);
      if (!dimensions || _isLastMessageMine) {
        console.debug('Scroll to bottom due new messages PUSH', { dimensions: dimensions, _isLastMessageMine: _isLastMessageMine });
        this.scrollToBottom();
      }
    } else if (messages.changeReason === _ActorAppConstants.MessageChangeReason.UNSHIFT) {
      this.isLoading = false;
      if (dimensions) {
        var nextDimensions = scroller.getDimensions();
        console.debug('Restore scroll due messages unshift', { dimensions: dimensions, nextDimensions: nextDimensions });
        scroller.scrollTo(nextDimensions.scrollHeight - dimensions.scrollHeight);
      } else {
        console.debug('Scroll to bottom due messages have been UNSHIFT', { dimensions: dimensions });
        this.scrollToBottom();
      }
    } else {
      console.debug('Restore scroll due messages UPDATE');
      this.restoreScroll();
    }
  };

  MessagesList.prototype.onScroll = function onScroll() {
    var dimensions = this.refs.scroller.getDimensions();
    this.updateDimensions(dimensions);
    if (!this.isLoading && dimensions.scrollTop < 100) {
      console.debug('Start loading more messages');
      this.isLoading = true;
      this.props.onLoadMore();
    }

    var showScrollToBottom = dimensions.scrollTop < dimensions.scrollHeight - 2 * dimensions.offsetHeight;

    if (showScrollToBottom !== this.state.showScrollToBottom) {
      this.setState({ showScrollToBottom: showScrollToBottom });
    }
  };

  MessagesList.prototype.onResize = function onResize() {
    var dimensions = this.dimensions;
    var scroller = this.refs.scroller;

    if (dimensions) {
      var ratio = dimensions.scrollTop / dimensions.scrollHeight;
      var nextDimensions = scroller.getDimensions();
      scroller.scrollTo(ratio * nextDimensions.scrollHeight);
      this.dimensions = nextDimensions;
      console.debug('Handle resize: fix scroll', { dimensions: dimensions, ratio: ratio, nextDimensions: nextDimensions });
    } else {
      scroller.scrollToBottom();
      console.debug('Handle resize: scroll to bottom', { dimensions: dimensions });
    }
  };

  MessagesList.prototype.handleScrollToBottom = function handleScrollToBottom() {
    this.refs.scroller.scrollToBottom();
  };

  MessagesList.prototype.renderHeader = function renderHeader() {
    var _props2 = this.props;
    var peer = _props2.peer;
    var isMember = _props2.isMember;
    var messages = _props2.messages;


    if (!isMember) {
      return null;
    }

    if (messages.isLoaded) {
      var Welcome = this.components.Welcome;

      return _react2.default.createElement(Welcome, { peer: peer, key: 'header' });
    }

    if (!messages.messages.length) {
      return null;
    }

    return _react2.default.createElement(_Loading2.default, { key: 'header' });
  };

  MessagesList.prototype.renderMessages = function renderMessages() {
    var _props3 = this.props;
    var uid = _props3.uid;
    var peer = _props3.peer;
    var _props3$messages = _props3.messages;
    var messages = _props3$messages.messages;
    var overlay = _props3$messages.overlay;
    var count = _props3$messages.count;
    var selected = _props3$messages.selected;
    var receiveDate = _props3$messages.receiveDate;
    var readDate = _props3$messages.readDate;
    var firstUnreadId = _props3$messages.firstUnreadId;
    var MessageItem = this.components.MessageItem;


    var result = [];
    for (var index = messages.length - count; index < messages.length; index++) {
      var overlayItem = overlay[index];
      if (overlayItem && overlayItem.dateDivider) {
        result.push(_react2.default.createElement(
          'div',
          { className: 'date-divider', key: overlayItem.dateDivider },
          overlayItem.dateDivider
        ));
      }

      var message = messages[index];
      if (message.rid === firstUnreadId) {
        result.push(_react2.default.createElement(
          'div',
          { className: 'unread-divider', ref: 'unread', key: 'unread' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'message.unread' })
        ));
      }

      result.push(_react2.default.createElement(MessageItem, {
        peer: peer,
        message: message,
        state: (0, _MessageUtils.getMessageState)(message, uid, receiveDate, readDate),
        isShort: overlayItem.useShort,
        isSelected: selected.has(message.rid),
        onSelect: this.props.onSelect,
        key: message.sortKey
      }));
    }

    return result;
  };

  MessagesList.prototype.renderScrollToBottomButton = function renderScrollToBottomButton() {
    var showScrollToBottom = this.state.showScrollToBottom;

    if (!showScrollToBottom) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      { className: 'chat__scroll-to-bottom', onClick: this.handleScrollToBottom },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'keyboard_arrow_down'
      )
    );
  };

  MessagesList.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'chat__container' },
      _react2.default.createElement(
        _Scroller2.default,
        {
          className: 'chat__messages',
          ref: 'scroller',
          onScroll: this.onScroll,
          onResize: this.onResize
        },
        this.renderHeader(),
        this.renderMessages()
      ),
      this.renderScrollToBottomButton()
    );
  };

  MessagesList.prototype.scrollToBottom = function scrollToBottom() {
    this.dimensions = null;
    this.refs.scroller.scrollToBottom();
  };

  MessagesList.prototype.updateDimensions = function updateDimensions(dimensions) {
    if (dimensions.scrollHeight === dimensions.scrollTop + dimensions.offsetHeight) {
      console.debug('Update dimensions: lock scroll to bottom', { dimensions: dimensions });
      this.dimensions = null;
    } else {
      console.debug('Update dimensions: set new dimensions', { dimensions: dimensions });
      this.dimensions = dimensions;
    }
  };

  MessagesList.prototype.restoreScroll = function restoreScroll() {
    var dimensions = this.dimensions;
    var scroller = this.refs.scroller;


    if (dimensions) {
      scroller.scrollTo(dimensions.scrollTop);
    } else {
      scroller.scrollToBottom();
    }
  };

  return MessagesList;
}(_react.Component);

MessagesList.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
MessagesList.propTypes = {
  uid: _react.PropTypes.number.isRequired,
  peer: _react.PropTypes.object.isRequired,
  messages: _react.PropTypes.shape({
    messages: _react.PropTypes.array.isRequired,
    overlay: _react.PropTypes.array.isRequired,
    count: _react.PropTypes.number.isRequired,
    isLoaded: _react.PropTypes.bool.isRequired,
    receiveDate: _react.PropTypes.number.isRequired,
    readDate: _react.PropTypes.number.isRequired,
    firstUnreadId: _react.PropTypes.string,
    selected: _react.PropTypes.object.isRequired,
    changeReason: _react.PropTypes.oneOf([_ActorAppConstants.MessageChangeReason.UNKNOWN, _ActorAppConstants.MessageChangeReason.PUSH, _ActorAppConstants.MessageChangeReason.UNSHIFT, _ActorAppConstants.MessageChangeReason.UPDATE]).isRequired
  }).isRequired,
  isMember: _react.PropTypes.bool.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  onLoadMore: _react.PropTypes.func.isRequired
};
exports.default = MessagesList;
//# sourceMappingURL=MessagesList.react.js.map