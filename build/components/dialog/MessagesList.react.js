'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Loading = require('./messages/Loading.react');

var _Loading2 = _interopRequireDefault(_Loading);

var _Welcome = require('./messages/Welcome.react');

var _Welcome2 = _interopRequireDefault(_Welcome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MessagesList = function (_Component) {
  _inherits(MessagesList, _Component);

  function MessagesList() {
    _classCallCheck(this, MessagesList);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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
    var _this2 = this;

    var _props3 = this.props;
    var messages = _props3.messages;
    var selectedMessages = _props3.selectedMessages;
    var peer = _props3.peer;
    var overlay = _props3.overlay;
    var components = _props3.components;
    var MessageItem = this.props.components.MessageItem;


    var result = [];
    (0, _lodash.forEach)(messages, function (message, index) {
      var overlayItem = overlay[index];
      if (overlayItem && overlayItem.dateDivider) {
        result.push(_react2.default.createElement(
          'li',
          { className: 'date-divider', key: 'o' + index },
          overlayItem.dateDivider
        ));
      }

      result.push(_react2.default.createElement(MessageItem, {
        key: message.sortKey,
        message: message,
        isShort: overlayItem.useShort,
        isSelected: selectedMessages.has(message.rid),
        onSelect: _this2.props.onSelect,
        onVisibilityChange: _this2.props.onVisibilityChange,
        peer: peer
      }));
    });

    return result;
  };

  MessagesList.prototype.render = function render() {
    return _react2.default.createElement(
      'ul',
      { className: 'messages__list' },
      this.renderWelcome(),
      this.renderLoading(),
      this.renderMessages()
    );
  };

  return MessagesList;
}(_react.Component);

MessagesList.propTypes = {
  messages: _react.PropTypes.array.isRequired,
  selectedMessages: _react.PropTypes.object.isRequired,
  peer: _react.PropTypes.object.isRequired,
  overlay: _react.PropTypes.array.isRequired,
  isMember: _react.PropTypes.bool.isRequired,
  isAllMessagesLoaded: _react.PropTypes.bool.isRequired,
  components: _react.PropTypes.shape({
    MessageItem: _react.PropTypes.func.isRequired
  }).isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  onVisibilityChange: _react.PropTypes.func.isRequired
};
exports.default = MessagesList;
//# sourceMappingURL=MessagesList.react.js.map