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

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownStore = function (_Store) {
  (0, _inherits3.default)(DropdownStore, _Store);

  function DropdownStore(dispatcher) {
    (0, _classCallCheck3.default)(this, DropdownStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));

    _this._isMessageDropdownOpen = false;
    _this._isRecentContextOpen = false;
    _this._targetRect = {};
    _this._contextPos = {};
    _this._message = {};
    _this._peer = {};
    return _this;
  }

  DropdownStore.prototype.isMessageDropdownOpen = function isMessageDropdownOpen(rid) {
    if (rid === this._message.rid) {
      return this._isMessageDropdownOpen;
    } else {
      return false;
    }
  };

  DropdownStore.prototype.isRecentContextOpen = function isRecentContextOpen() {
    return this._isRecentContextOpen;
  };

  DropdownStore.prototype.getMessage = function getMessage() {
    return this._message;
  };

  DropdownStore.prototype.getTargetRect = function getTargetRect() {
    return this._targetRect;
  };

  DropdownStore.prototype.getContextPos = function getContextPos() {
    return this._contextPos;
  };

  DropdownStore.prototype.getPeer = function getPeer() {
    return this._peer;
  };

  DropdownStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.MESSAGE_DROPDOWN_SHOW:
        this._isMessageDropdownOpen = true;
        this._isRecentContextOpen = false;
        this._message = action.message;
        this._targetRect = action.targetRect;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.MESSAGE_DROPDOWN_HIDE:
        this._isMessageDropdownOpen = false;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.RECENT_CONTEXT_MENU_SHOW:
        this._isRecentContextOpen = true;
        this._isMessageDropdownOpen = false;
        this._contextPos = action.contextPos;
        this._peer = action.peer;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.RECENT_CONTEXT_MENU_HIDE:
        this._isRecentContextOpen = false;
        this.__emitChange();
        break;
      default:
    }
  };

  return DropdownStore;
}(_utils.Store); /*
                  * Copyright (C) 2015 Actor LLC. <https://actor.im>
                  */

exports.default = new DropdownStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DropdownStore.js.map