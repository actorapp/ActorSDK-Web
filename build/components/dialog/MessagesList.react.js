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

var _Loading = require('./messages/Loading.react');

var _Loading2 = _interopRequireDefault(_Loading);

var _Welcome = require('./messages/Welcome.react');

var _Welcome2 = _interopRequireDefault(_Welcome);

var _MessagesScroller = require('./MessagesScroller.react');

var _MessagesScroller2 = _interopRequireDefault(_MessagesScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessagesList = function (_Component) {
  (0, _inherits3.default)(MessagesList, _Component);

  function MessagesList(props) {
    (0, _classCallCheck3.default)(this, MessagesList);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  MessagesList.prototype.renderWelcome = function renderWelcome() {
    var _props = this.props;
    var peer = _props.peer;
    var isMember = _props.isMember;
    var isAllMessagesLoaded = _props.isAllMessagesLoaded;


    if (isMember && isAllMessagesLoaded) {
      return _react2.default.createElement(_Welcome2.default, { peer: peer });
    }

    return null;
  };

  MessagesList.prototype.renderLoading = function renderLoading() {
    var _props2 = this.props;
    var isAllMessagesLoaded = _props2.isAllMessagesLoaded;
    var messages = _props2.messages;


    if (!isAllMessagesLoaded && messages.length >= 30) {
      return _react2.default.createElement(_Loading2.default, null);
    }

    return null;
  };

  MessagesList.prototype.renderMessages = function renderMessages() {
    var _props3 = this.props;
    var peer = _props3.peer;
    var messages = _props3.messages;
    var overlay = _props3.overlay;
    var count = _props3.count;
    var selectedMessages = _props3.selectedMessages;
    var components = _props3.components;
    var MessageItem = this.props.components.MessageItem;


    var result = [];
    for (var index = messages.length - count; index < messages.length; index++) {
      var overlayItem = overlay[index];
      if (overlayItem && overlayItem.dateDivider) {
        result.push(_react2.default.createElement(
          'div',
          { className: 'date-divider', key: 'o' + index },
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
    var _props4 = this.props;
    var peer = _props4.peer;
    var onLoadMore = _props4.onLoadMore;


    return _react2.default.createElement(
      _MessagesScroller2.default,
      { className: 'messages', peer: peer, onLoadMore: onLoadMore },
      _react2.default.createElement(
        'div',
        { className: 'messages__list' },
        this.renderWelcome(),
        this.renderLoading(),
        this.renderMessages()
      )
    );
  };

  return MessagesList;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

MessagesList.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  messages: _react.PropTypes.array.isRequired,
  overlay: _react.PropTypes.array.isRequired,
  count: _react.PropTypes.number.isRequired,
  selectedMessages: _react.PropTypes.object.isRequired,
  isMember: _react.PropTypes.bool.isRequired,
  isAllMessagesLoaded: _react.PropTypes.bool.isRequired,
  components: _react.PropTypes.shape({
    MessageItem: _react.PropTypes.func.isRequired
  }).isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  onVisibilityChange: _react.PropTypes.func.isRequired,
  onLoadMore: _react.PropTypes.func.isRequired
};
exports.default = MessagesList;
//# sourceMappingURL=MessagesList.react.js.map