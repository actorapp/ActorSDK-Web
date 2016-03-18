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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KickUserStore = function (_Store) {
  (0, _inherits3.default)(KickUserStore, _Store);

  function KickUserStore(dispatcher) {
    (0, _classCallCheck3.default)(this, KickUserStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));

    _this.kickUserState = [];
    return _this;
  }

  KickUserStore.prototype.getKickUserState = function getKickUserState(uid) {
    return this.kickUserState[uid] || _ActorAppConstants.AsyncActionStates.PENDING;
  };

  KickUserStore.prototype.resetKickUserState = function resetKickUserState(uid) {
    delete this.kickUserState[uid];
  };

  KickUserStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.KICK_USER:
        this.kickUserState[action.uid] = _ActorAppConstants.AsyncActionStates.PROCESSING;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.KICK_USER_SUCCESS:
        this.resetKickUserState(action.uid);
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.KICK_USER_ERROR:
        this.kickUserState[action.uid] = _ActorAppConstants.AsyncActionStates.FAILURE;
        this.__emitChange();
        break;
      default:
    }
  };

  return KickUserStore;
}(_utils.Store); /*
                  * Copyright (C) 2015 Actor LLC. <https://actor.im>
                  */

exports.default = new KickUserStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=KickUserStore.js.map