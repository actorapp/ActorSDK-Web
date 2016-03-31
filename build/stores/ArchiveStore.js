'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

var ArchiveStore = function (_Store) {
  (0, _inherits3.default)(ArchiveStore, _Store);

  function ArchiveStore(dispatcher) {
    (0, _classCallCheck3.default)(this, ArchiveStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));

    _this.isLoading = true;
    _this.dialogs = [];
    _this.archiveChatState = {};
    _this._isAllLoaded = false;
    _this._isInitialLoadingComplete = false;
    return _this;
  }

  ArchiveStore.prototype.isArchiveLoading = function isArchiveLoading() {
    return this.isLoading;
  };

  ArchiveStore.prototype.isAllLoaded = function isAllLoaded() {
    return this._isAllLoaded;
  };

  ArchiveStore.prototype.isInitialLoadingComplete = function isInitialLoadingComplete() {
    return this._isInitialLoadingComplete;
  };

  ArchiveStore.prototype.getDialogs = function getDialogs() {
    return this.dialogs;
  };

  ArchiveStore.prototype.getArchiveChatState = function getArchiveChatState() {
    return this.archiveChatState;
  };

  ArchiveStore.prototype.__onDispatch = function __onDispatch(action) {
    var peerKey = action.peer ? _PeerUtils2.default.peerToString(action.peer) : null;
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.ARCHIVE_ADD:
        this.archiveChatState[peerKey] = _ActorAppConstants.AsyncActionStates.PROCESSING;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.ARCHIVE_ADD_SUCCESS:
        delete this.archiveChatState[peerKey];
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.ARCHIVE_ADD_ERROR:
        this.archiveChatState[peerKey] = _ActorAppConstants.AsyncActionStates.FAILURE;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.ARCHIVE_LOAD:
        this.isLoading = true;
        this._isAllLoaded = false;
        this._isInitialLoadingComplete = false;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.ARCHIVE_LOAD_SUCCESS:
        this.isLoading = false;
        this._isInitialLoadingComplete = true;
        this.dialogs = action.response;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.ARCHIVE_LOAD_MORE:
        this.isLoading = true;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.ARCHIVE_LOAD_MORE_SUCCESS:
        this.isLoading = false;
        this._isAllLoaded = action.response.length === 0;
        this.dialogs.push.apply(this.dialogs, action.response);
        this.__emitChange();
        break;

      default:
    }
  };

  return ArchiveStore;
}(_utils.Store);

exports.default = new ArchiveStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=ArchiveStore.js.map