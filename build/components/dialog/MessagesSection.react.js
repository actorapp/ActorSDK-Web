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

var _utils = require('flux/utils');

var _MessageActionCreators = require('../../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _VisibilityStore = require('../../stores/VisibilityStore');

var _VisibilityStore2 = _interopRequireDefault(_VisibilityStore);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _MessageStore = require('../../stores/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _MessagesList = require('./MessagesList.react');

var _MessagesList2 = _interopRequireDefault(_MessagesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _delayed = []; /*
                    * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                    */

var flushDelayed = function flushDelayed() {
  (0, _lodash.forEach)(_delayed, function (p) {
    return _MessageActionCreators2.default.setMessageShown(p.peer, p.message);
  });
  _delayed = [];
};

var flushDelayedDebounced = (0, _lodash.debounce)(flushDelayed, 30, { maxWait: 100 });

var MessagesSection = function (_Component) {
  (0, _inherits3.default)(MessagesSection, _Component);

  MessagesSection.getStores = function getStores() {
    return [_MessageStore2.default, _VisibilityStore2.default];
  };

  MessagesSection.calculateState = function calculateState() {
    return {
      messages: _MessageStore2.default.getMessages(),
      overlay: _MessageStore2.default.getOverlay(),
      messagesCount: _MessageStore2.default.getRenderMessagesCount(),
      selectedMessages: _MessageStore2.default.getSelected(),
      isAllMessagesLoaded: _MessageStore2.default.isLoaded(),
      isAppVisible: _VisibilityStore2.default.isAppVisible()
    };
  };

  function MessagesSection(props) {
    (0, _classCallCheck3.default)(this, MessagesSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    _this.onLoadMore = _this.onLoadMore.bind(_this);
    _this.onVisibilityChange = _this.onVisibilityChange.bind(_this);
    return _this;
  }

  MessagesSection.prototype.componentDidUpdate = function componentDidUpdate() {
    var isAppVisible = this.state.isAppVisible;

    if (isAppVisible) {
      flushDelayed();
    }
  };

  MessagesSection.prototype.onSelect = function onSelect(rid) {
    var selectedMessages = this.state.selectedMessages;

    if (selectedMessages.has(rid)) {
      _MessageActionCreators2.default.setSelected(selectedMessages.remove(rid));
    } else {
      _MessageActionCreators2.default.setSelected(selectedMessages.add(rid));
    }
  };

  MessagesSection.prototype.onLoadMore = function onLoadMore() {
    var peer = this.props.peer;

    _DialogActionCreators2.default.loadMoreMessages(peer);
  };

  MessagesSection.prototype.onVisibilityChange = function onVisibilityChange(message, isVisible) {
    var peer = this.props.peer;


    if (isVisible) {
      _delayed.push({ peer: peer, message: message });
      if (_VisibilityStore2.default.isAppVisible()) {
        flushDelayedDebounced();
      }
    }
  };

  MessagesSection.prototype.render = function render() {
    var _props = this.props;
    var peer = _props.peer;
    var isMember = _props.isMember;
    var _state = this.state;
    var messages = _state.messages;
    var overlay = _state.overlay;
    var messagesCount = _state.messagesCount;
    var selectedMessages = _state.selectedMessages;
    var isAllMessagesLoaded = _state.isAllMessagesLoaded;


    return _react2.default.createElement(_MessagesList2.default, {
      peer: peer,
      overlay: overlay,
      messages: messages,
      count: messagesCount,
      selectedMessages: selectedMessages,
      isMember: isMember,
      isAllMessagesLoaded: isAllMessagesLoaded,
      onSelect: this.onSelect,
      onLoadMore: this.onLoadMore,
      onVisibilityChange: this.onVisibilityChange
    });
  };

  return MessagesSection;
}(_react.Component);

MessagesSection.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  isMember: _react.PropTypes.bool.isRequired
};
exports.default = _utils.Container.create(MessagesSection, { withProps: true });
//# sourceMappingURL=MessagesSection.react.js.map