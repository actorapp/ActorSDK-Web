'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _MessageUtils = require('../utils/MessageUtils');

var _UserStore = require('./UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MESSAGE_COUNT_STEP = 20;

var getMessageId = function getMessageId(message) {
  return message ? message.rid : null;
};

var MessageStore = function (_ReduceStore) {
  _inherits(MessageStore, _ReduceStore);

  function MessageStore() {
    _classCallCheck(this, MessageStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  MessageStore.prototype.getInitialState = function getInitialState() {
    return {
      messages: [],
      overlay: [],
      isLoaded: false,
      receiveDate: 0,
      readDate: 0,
      count: 0,
      firstMessageId: null,
      lastMessageId: null,
      firstUnreadId: null,
      changeReason: _ActorAppConstants.MessageChangeReason.UNKNOWN,
      selected: new _immutable2.default.Set()
    };
  };

  MessageStore.prototype.isAllRendered = function isAllRendered() {
    var _getState = this.getState();

    var messages = _getState.messages;
    var count = _getState.count;

    return messages.length === count;
  };

  MessageStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.BIND_DIALOG_PEER:
        return this.getInitialState();

      case _ActorAppConstants.ActionTypes.MESSAGES_CHANGED:
        var firstMessageId = getMessageId(action.messages[0]);
        var lastMessageId = getMessageId(action.messages[action.messages.length - 1]);

        var nextState = _extends({}, state, {
          firstMessageId: firstMessageId,
          lastMessageId: lastMessageId,
          messages: action.messages,
          overlay: action.overlay,
          receiveDate: action.receiveDate,
          readDate: action.readDate,
          isLoaded: action.isLoaded
        });

        if (firstMessageId !== state.firstMessageId) {
          nextState.count = Math.min(action.messages.length, state.count + MESSAGE_COUNT_STEP);
          nextState.changeReason = _ActorAppConstants.MessageChangeReason.UNSHIFT;
        } else if (lastMessageId !== state.lastMessageId) {
          // TODO: possible incorrect
          var lengthDiff = action.messages.length - state.messages.length;

          nextState.count = Math.min(action.messages.length, state.count + lengthDiff);
          nextState.changeReason = _ActorAppConstants.MessageChangeReason.PUSH;
        } else {
          nextState.count = Math.min(action.messages.length, state.count);
          nextState.changeReason = _ActorAppConstants.MessageChangeReason.UPDATE;
        }

        var firstUnreadIndex = (0, _MessageUtils.getFirstUnreadMessageIndex)(action.messages, action.readByMeDate, _UserStore2.default.getMyId());
        if (firstUnreadIndex === -1) {
          nextState.firstUnreadId = null;
        } else {
          nextState.firstUnreadId = action.messages[firstUnreadIndex].rid;
          if (firstUnreadIndex > nextState.count) {
            nextState.count = firstUnreadIndex;
          }
        }

        return nextState;

      case _ActorAppConstants.ActionTypes.MESSAGES_LOAD_MORE:
        return _extends({}, state, {
          count: Math.min(state.messages.length, state.count + MESSAGE_COUNT_STEP),
          changeReason: _ActorAppConstants.MessageChangeReason.UNSHIFT
        });

      case _ActorAppConstants.ActionTypes.MESSAGES_TOGGLE_SELECTED:
        return _extends({}, state, {
          selected: state.selected.has(action.id) ? state.selected.remove(action.id) : state.selected.add(action.id)
        });

      default:
        return state;
    }
  };

  return MessageStore;
}(_utils.ReduceStore);

exports.default = new MessageStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=MessageStore.js.map