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

var _VisibilityStore = require('../../stores/VisibilityStore');

var _VisibilityStore2 = _interopRequireDefault(_VisibilityStore);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _MessageStore = require('../../stores/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _MessageItem = require('./messages/MessageItem.react');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

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

  function MessagesSection() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MessagesSection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onMessageSelect = function (rid) {
      var selectedMessages = _this.state.selectedMessages;

      if (selectedMessages.has(rid)) {
        _MessageActionCreators2.default.setSelected(selectedMessages.remove(rid));
      } else {
        _MessageActionCreators2.default.setSelected(selectedMessages.add(rid));
      }
    }, _this.onMessageVisibilityChange = function (message, isVisible) {
      var peer = _this.props.peer;


      if (isVisible) {
        _delayed.push({ peer: peer, message: message });
        if (_VisibilityStore2.default.isAppVisible()) {
          flushDelayedDebounced();
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  MessagesSection.getStores = function getStores() {
    return [_MessageStore2.default, _VisibilityStore2.default];
  };

  MessagesSection.calculateState = function calculateState() {
    return {
      selectedMessages: _MessageStore2.default.getSelected(),
      isAllMessagesLoaded: _MessageStore2.default.isLoaded(),
      isAppVisible: _VisibilityStore2.default.isAppVisible()
    };
  };

  MessagesSection.prototype.componentDidUpdate = function componentDidUpdate() {
    var isAppVisible = this.state.isAppVisible;

    if (isAppVisible) {
      flushDelayed();
    }
  };

  MessagesSection.prototype.getComponents = function getComponents() {
    var _context$delegate$com = this.context.delegate.components;
    var dialog = _context$delegate$com.dialog;
    var messages = _context$delegate$com.messages;

    if (dialog && dialog.messages && (0, _lodash.isFunction)(dialog.messages.message)) {
      return {
        MessageItem: dialog.messages.message
      };
    }

    return {
      MessageItem: _MessageItem2.default
    };
  };

  MessagesSection.prototype.render = function render() {
    var _props = this.props;
    var peer = _props.peer;
    var overlay = _props.overlay;
    var messages = _props.messages;
    var count = _props.count;
    var isMember = _props.isMember;
    var _state = this.state;
    var selectedMessages = _state.selectedMessages;
    var isAllMessagesLoaded = _state.isAllMessagesLoaded;


    var components = this.getComponents();

    return _react2.default.createElement(_MessagesList2.default, {
      peer: peer,
      overlay: overlay,
      messages: messages,
      count: count,
      selectedMessages: selectedMessages,
      isMember: isMember,
      isAllMessagesLoaded: isAllMessagesLoaded,
      components: components,
      onSelect: this.onMessageSelect,
      onVisibilityChange: this.onMessageVisibilityChange,
      onLoadMore: this.props.onLoadMore
    });
  };

  return MessagesSection;
}(_react.Component);

MessagesSection.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  messages: _react.PropTypes.array.isRequired,
  overlay: _react.PropTypes.array.isRequired,
  count: _react.PropTypes.number.isRequired,
  isMember: _react.PropTypes.bool.isRequired,
  onLoadMore: _react.PropTypes.func.isRequired
};
MessagesSection.contextTypes = {
  delegate: _react.PropTypes.object
};
exports.default = _utils.Container.create(MessagesSection, { pure: false, withProps: true });
//# sourceMappingURL=MessagesSection.react.js.map