'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ArchiveStore = (function (_Store) {
  _inherits(ArchiveStore, _Store);

  function ArchiveStore(dispatcher) {
    _classCallCheck(this, ArchiveStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArchiveStore).call(this, dispatcher));

    _this.isLoading = true;
    _this.dialogs = [];
    _this.archiveChatState = [];
    _this._isAllLoaded = false;
    _this._isInitialLoadingComplete = false;
    return _this;
  }

  _createClass(ArchiveStore, [{
    key: 'isArchiveLoading',
    value: function isArchiveLoading() {
      return this.isLoading;
    }
  }, {
    key: 'isAllLoaded',
    value: function isAllLoaded() {
      return this._isAllLoaded;
    }
  }, {
    key: 'isInitialLoadingComplete',
    value: function isInitialLoadingComplete() {
      return this._isInitialLoadingComplete;
    }
  }, {
    key: 'getDialogs',
    value: function getDialogs() {
      return this.dialogs;
    }
  }, {
    key: 'getArchiveChatState',
    value: function getArchiveChatState(id) {
      return this.archiveChatState[id] || _ActorAppConstants.AsyncActionStates.PENDING;
    }
  }, {
    key: 'resetArchiveChatState',
    value: function resetArchiveChatState(id) {
      delete this.archiveChatState[id];
    }
  }, {
    key: '__onDispatch',
    value: function __onDispatch(action) {
      switch (action.type) {
        case _ActorAppConstants.ActionTypes.ARCHIVE_ADD:
          this.archiveChatState[action.peer.id] = _ActorAppConstants.AsyncActionStates.PROCESSING;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.ARCHIVE_ADD_SUCCESS:
          this.resetArchiveChatState(action.peer.id);
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.ARCHIVE_ADD_ERROR:
          this.archiveChatState[action.peer.id] = _ActorAppConstants.AsyncActionStates.FAILURE;
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
    }
  }]);

  return ArchiveStore;
})(_utils.Store);

exports.default = new ArchiveStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=ArchiveStore.js.map