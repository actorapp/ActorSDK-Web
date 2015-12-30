'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _MessageActionCreators = require('../../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _VisibilityStore = require('../../stores/VisibilityStore');

var _VisibilityStore2 = _interopRequireDefault(_VisibilityStore);

var _GroupStore = require('../../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _MessageStore = require('../../stores/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _MessageItem = require('./messages/MessageItem.react');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

var _Welcome = require('./messages/Welcome.react');

var _Welcome2 = _interopRequireDefault(_Welcome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _delayed = [];

var flushDelayed = function flushDelayed() {
  (0, _lodash.forEach)(_delayed, function (p) {
    return _MessageActionCreators2.default.setMessageShown(p.peer, p.message);
  });
  _delayed = [];
};

var flushDelayedDebounced = (0, _lodash.debounce)(flushDelayed, 30, { maxWait: 100 });

var MessagesSection = (function (_Component) {
  _inherits(MessagesSection, _Component);

  function MessagesSection(props) {
    _classCallCheck(this, MessagesSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MessagesSection).call(this, props));

    _this.getMessagesListItem = function (message, index) {
      var selectedMessages = _this.state.selectedMessages;
      var overlay = _this.props.overlay;

      var dateDivider = overlay[index] && overlay[index].dateDivider ? _react2.default.createElement(
        'li',
        { className: 'date-divider' },
        overlay[index].dateDivider
      ) : null;

      var isShortMessage = overlay[index] && overlay[index].useShort ? overlay[index].useShort : false;

      var isSelected = selectedMessages.has(message.rid);

      var messageItem = _react2.default.createElement(_MessageItem2.default, { key: message.sortKey,
        message: message,
        isShortMessage: isShortMessage,
        onSelect: _this.handleMessageSelect,
        isSelected: isSelected,
        onVisibilityChange: _this.onMessageVisibilityChange,
        peer: _this.props.peer });

      return [dateDivider, messageItem];
    };

    _this.onAppVisibilityChange = function () {
      if (_VisibilityStore2.default.isAppVisible()) {
        flushDelayed();
      }
    };

    _this.onMessagesChange = function () {
      return _this.setState({ selectedMessages: _MessageStore2.default.getSelected() });
    };

    _this.handleMessageSelect = function (rid) {
      var selectedMessages = _this.state.selectedMessages;

      if (selectedMessages.has(rid)) {
        _MessageActionCreators2.default.setSelected(selectedMessages.remove(rid));
      } else {
        _MessageActionCreators2.default.setSelected(selectedMessages.add(rid));
      }
    };

    _this.onMessageVisibilityChange = function (message, isVisible) {
      var peer = _this.props.peer;

      if (isVisible) {
        _delayed.push({ peer: peer, message: message });
        if (_VisibilityStore2.default.isAppVisible()) {
          flushDelayedDebounced();
        }
      }
    };

    _this.handleScroll = function () {
      var onScroll = _this.props.onScroll;

      onScroll && onScroll();
    };

    _this.state = {
      selectedMessages: _MessageStore2.default.getSelected()
    };

    _VisibilityStore2.default.addListener(_this.onAppVisibilityChange);
    _MessageStore2.default.addListener(_this.onMessagesChange);
    return _this;
  }

  _createClass(MessagesSection, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var messages = _props.messages;
      var peer = _props.peer;

      var messagesList = (0, _lodash.map)(messages, this.getMessagesListItem);
      var isMember = _DialogStore2.default.isMember();

      var messagesLoading = _react2.default.createElement(
        'li',
        { className: 'message message--loading' },
        _react2.default.createElement(
          'div',
          { className: 'message__body col-xs text-center' },
          'Loading messages from history'
        )
      );

      return _react2.default.createElement(
        'ul',
        { className: 'messages__list', onScroll: this.handleScroll },
        isMember && messagesList.length < 30 ? _react2.default.createElement(_Welcome2.default, { peer: peer }) : null,
        messagesList.length >= 30 ? messagesLoading : null,
        messagesList
      );
    }
  }]);

  return MessagesSection;
})(_react.Component);

MessagesSection.propTypes = {
  messages: _react.PropTypes.array.isRequired,
  overlay: _react.PropTypes.array.isRequired,
  peer: _react.PropTypes.object.isRequired,
  onScroll: _react.PropTypes.func.isRequired
};
exports.default = MessagesSection;
//# sourceMappingURL=MessagesSection.react.js.map