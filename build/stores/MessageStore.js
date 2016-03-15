'use strict';

exports.__esModule = true;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var initialRenderMessagesCount = 20;
var renderMessagesStep = 20;

/**
 * Class representing a store for messages.
 */

var MessageStore = function (_Store) {
  _inherits(MessageStore, _Store);

  function MessageStore(dispatcher) {
    _classCallCheck(this, MessageStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    _this._renderMessagesCount = initialRenderMessagesCount;
    _this._messages = [];
    _this._messagesToRender = [];
    _this._overlay = [];
    _this._overlayToRender = [];
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

  /**
   * @returns {Array} Messages to render
   */


  MessageStore.prototype.getMessagesToRender = function getMessagesToRender() {
    return this._messagesToRender;
  };

  /**
   * @returns {Array} Messages overlay
   */


  MessageStore.prototype.getOverlay = function getOverlay() {
    return this._overlay;
  };

  /**
   * @returns {Array} Messages overlay to render
   */


  MessageStore.prototype.getOverlayToRender = function getOverlayToRender() {
    return this._overlayToRender;
  };

  /**
   * @returns {Boolean} is all messages loaded for current conversation
   */


  MessageStore.prototype.isLoaded = function isLoaded() {
    return this._isLoaded;
  };

  MessageStore.prototype.isAllRendered = function isAllRendered() {
    return this._messages.length === this._messagesToRender.length;
  };

  /**
   * @returns {Array} Selected messages
   */


  MessageStore.prototype.getSelected = function getSelected() {
    return this._selectedMessages;
  };

  MessageStore.prototype.updateMessagesToRender = function updateMessagesToRender() {
    this._messagesToRender = this._messages.length > this._renderMessagesCount ? this._messages.slice(this._messages.length - this._renderMessagesCount) : this._messages;
  };

  MessageStore.prototype.updateOverlayToRender = function updateOverlayToRender() {
    this._overlayToRender = this._overlay.length > this._renderMessagesCount ? this._overlay.slice(this._overlay.length - this._renderMessagesCount) : this._overlay;
  };

  MessageStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.BIND_DIALOG_PEER:
        this._renderMessagesCount = initialRenderMessagesCount;
        this._messages = [];
        this._messagesToRender = [];
        this._overlay = [];
        this._overlayToRender = [];
        this._selectedMessages = new _immutable2.default.Set();
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.MESSAGES_CHANGED:
        this._messages = action.messages;
        this._overlay = action.overlay;
        this._isLoaded = action.isLoaded;
        this.updateMessagesToRender();
        this.updateOverlayToRender();
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
        this.updateMessagesToRender();
        this.updateOverlayToRender();
        this.__emitChange();
        break;

      default:
    }
  };

  return MessageStore;
}(_utils.Store);

exports.default = new MessageStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=MessageStore.js.map