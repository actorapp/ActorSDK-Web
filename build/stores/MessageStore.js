'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var initialRenderMessagesCount = 20;
var renderMessagesStep = 20;

/**
 * Class representing a store for messages.
 */

var MessageStore = function (_Store) {
  (0, _inherits3.default)(MessageStore, _Store);

  function MessageStore(dispatcher) {
    (0, _classCallCheck3.default)(this, MessageStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));

    _this._renderMessagesCount = initialRenderMessagesCount;
    _this._messages = [];
    _this._overlay = [];
    _this._isLoaded = false;
    _this._selectedMessages = new _immutable2.default.Set();
    return _this;
  }

  /**
   * @returns {Array} All messages stored for currently bound conversation
   */


  MessageStore.prototype.getAll = function getAll() {
    return this._messages;
  };

  MessageStore.prototype.getRenderMessagesCount = function getRenderMessagesCount() {
    return this._renderMessagesCount;
  };

  MessageStore.prototype.getMessages = function getMessages() {
    return this._messages;
  };

  /**
   * @returns {Array} Messages overlay
   */


  MessageStore.prototype.getOverlay = function getOverlay() {
    return this._overlay;
  };

  /**
   * @returns {Boolean} is all messages loaded for current conversation
   */


  MessageStore.prototype.isLoaded = function isLoaded() {
    return this._isLoaded;
  };

  MessageStore.prototype.isAllRendered = function isAllRendered() {
    return this._messages.length === this._renderMessagesCount;
  };

  /**
   * @returns {Array} Selected messages
   */


  MessageStore.prototype.getSelected = function getSelected() {
    return this._selectedMessages;
  };

  MessageStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.BIND_DIALOG_PEER:
        this._renderMessagesCount = initialRenderMessagesCount;
        this._messages = [];
        this._overlay = [];
        this._selectedMessages = new _immutable2.default.Set();
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.MESSAGES_CHANGED:
        this._messages = action.messages;
        this._overlay = action.overlay;
        this._renderMessagesCount = Math.min(action.messages.length, this._renderMessagesCount);
        this._isLoaded = action.isLoaded;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.MESSAGES_SET_SELECTED:
        this._selectedMessages = action.selectedMesages;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.MESSAGES_LOAD_MORE:
        this._renderMessagesCount += renderMessagesStep;
        if (this._renderMessagesCount > this._messages.length) {
          this._renderMessagesCount = this._messages.length;
        }
        this.__emitChange();
        break;

      default:
    }
  };

  return MessageStore;
}(_utils.Store);

exports.default = new MessageStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=MessageStore.js.map