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

var _MessageUtils = require('../../utils/MessageUtils');

var _MessagesScroller = require('./MessagesScroller.react');

var _MessagesScroller2 = _interopRequireDefault(_MessagesScroller);

var _MessageItem = require('./messages/MessageItem.react');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

var _Welcome = require('./messages/Welcome.react');

var _Welcome2 = _interopRequireDefault(_Welcome);

var _Loading = require('./messages/Loading.react');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var MessagesList = function (_Component) {
  (0, _inherits3.default)(MessagesList, _Component);

  function MessagesList(props, context) {
    (0, _classCallCheck3.default)(this, MessagesList);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));

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

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  MessagesList.prototype.renderHeader = function renderHeader() {
    var _props = this.props;
    var peer = _props.peer;
    var isMember = _props.isMember;
    var messages = _props.messages;
    var isLoaded = _props.isLoaded;
    var Welcome = this.components.Welcome;


    if (!isMember) {
      return null;
    }

    if (!isLoaded && messages.length >= 30) {
      return _react2.default.createElement(_Loading2.default, { key: 'header' });
    }

    return _react2.default.createElement(Welcome, { peer: peer, key: 'header' });
  };

  MessagesList.prototype.renderMessages = function renderMessages() {
    var _props2 = this.props;
    var uid = _props2.uid;
    var peer = _props2.peer;
    var messages = _props2.messages;
    var overlay = _props2.overlay;
    var count = _props2.count;
    var selected = _props2.selected;
    var receiveDate = _props2.receiveDate;
    var readDate = _props2.readDate;
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

  MessagesList.prototype.render = function render() {
    var _props3 = this.props;
    var peer = _props3.peer;
    var onLoadMore = _props3.onLoadMore;


    return _react2.default.createElement(
      _MessagesScroller2.default,
      { className: 'chat__messages', peer: peer, onLoadMore: onLoadMore },
      this.renderHeader(),
      this.renderMessages()
    );
  };

  return MessagesList;
}(_react.Component);

MessagesList.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
MessagesList.propTypes = {
  uid: _react.PropTypes.number.isRequired,
  peer: _react.PropTypes.object.isRequired,
  messages: _react.PropTypes.array.isRequired,
  overlay: _react.PropTypes.array.isRequired,
  count: _react.PropTypes.number.isRequired,
  selected: _react.PropTypes.object.isRequired,
  isMember: _react.PropTypes.bool.isRequired,
  isLoaded: _react.PropTypes.bool.isRequired,
  receiveDate: _react.PropTypes.number.isRequired,
  readDate: _react.PropTypes.number.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  onLoadMore: _react.PropTypes.func.isRequired
};
exports.default = MessagesList;
//# sourceMappingURL=MessagesList.react.js.map