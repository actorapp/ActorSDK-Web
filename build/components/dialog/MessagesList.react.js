'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _Loading = require('./messages/Loading.react');

var _Loading2 = _interopRequireDefault(_Loading);

var _Welcome = require('./messages/Welcome.react');

var _Welcome2 = _interopRequireDefault(_Welcome);

var _MessagesScroller = require('./MessagesScroller.react');

var _MessagesScroller2 = _interopRequireDefault(_MessagesScroller);

var _MessageItem = require('./messages/MessageItem.react');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessagesList = function (_Component) {
  (0, _inherits3.default)(MessagesList, _Component);

  function MessagesList(props, context) {
    (0, _classCallCheck3.default)(this, MessagesList);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));

    var dialog = context.delegate.components.dialog;

    if (dialog && dialog.messages && (0, _lodash.isFunction)(dialog.messages.message)) {
      _this.components = {
        MessageItem: dialog.messages.message
      };
    } else {
      _this.components = {
        MessageItem: _MessageItem2.default
      };
    }

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  MessagesList.prototype.renderHeader = function renderHeader() {
    var _props = this.props;
    var peer = _props.peer;
    var isMember = _props.isMember;
    var messages = _props.messages;
    var isAllMessagesLoaded = _props.isAllMessagesLoaded;


    if (!isMember) {
      return null;
    }

    if (!isAllMessagesLoaded && messages.length >= 30) {
      return _react2.default.createElement(_Loading2.default, { key: 'header' });
    }

    return _react2.default.createElement(_Welcome2.default, { peer: peer, key: 'header' });
  };

  MessagesList.prototype.renderMessages = function renderMessages() {
    var _props2 = this.props;
    var peer = _props2.peer;
    var messages = _props2.messages;
    var overlay = _props2.overlay;
    var count = _props2.count;
    var selectedMessages = _props2.selectedMessages;
    var MessageItem = this.components.MessageItem;


    var result = [];
    for (var index = Math.max(messages.length - count, 0); index < messages.length; index++) {
      var overlayItem = overlay[index];
      if (overlayItem && overlayItem.dateDivider) {
        result.push(_react2.default.createElement(
          'div',
          { className: 'date-divider', key: overlayItem.dateDivider },
          overlayItem.dateDivider
        ));
      }

      var message = messages[index];
      result.push(_react2.default.createElement(MessageItem, {
        key: message.sortKey,
        message: message,
        isShort: overlayItem.useShort,
        isSelected: selectedMessages.has(message.rid),
        onSelect: this.props.onSelect,
        onVisibilityChange: this.props.onVisibilityChange,
        peer: peer
      }));
    }

    return result;
  };

  MessagesList.prototype.render = function render() {
    var _props3 = this.props;
    var peer = _props3.peer;
    var onLoadMore = _props3.onLoadMore;


    return _react2.default.createElement(
      _MessagesScroller2.default,
      { className: 'messages', peer: peer, onLoadMore: onLoadMore },
      _react2.default.createElement(
        'div',
        { className: 'messages__list' },
        this.renderHeader(),
        this.renderMessages()
      )
    );
  };

  return MessagesList;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

MessagesList.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
MessagesList.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  messages: _react.PropTypes.array.isRequired,
  overlay: _react.PropTypes.array.isRequired,
  count: _react.PropTypes.number.isRequired,
  selectedMessages: _react.PropTypes.object.isRequired,
  isMember: _react.PropTypes.bool.isRequired,
  isAllMessagesLoaded: _react.PropTypes.bool.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  onVisibilityChange: _react.PropTypes.func.isRequired,
  onLoadMore: _react.PropTypes.func.isRequired
};
exports.default = MessagesList;
//# sourceMappingURL=MessagesList.react.js.map