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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var _integrationToken = null;

var GroupStore = function (_Store) {
  (0, _inherits3.default)(GroupStore, _Store);

  function GroupStore(dispatcher) {
    (0, _classCallCheck3.default)(this, GroupStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  /**
   * Get group information
   *
   * @param gid {number} Group id
   * @returns {object} Group information
   */


  GroupStore.prototype.getGroup = function getGroup(gid) {
    return _ActorClient2.default.getGroup(gid);
  };

  /**
   * Get group integration token
   *
   * @returns {string|null}
   */


  GroupStore.prototype.getToken = function getToken() {
    return _integrationToken;
  };

  GroupStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {

      case _ActorAppConstants.ActionTypes.GROUP_GET_TOKEN:
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.GROUP_GET_TOKEN_SUCCESS:
        _integrationToken = action.response;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.GROUP_GET_TOKEN_ERROR:
        _integrationToken = null;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.GROUP_CLEAR:
      case _ActorAppConstants.ActionTypes.GROUP_CLEAR_SUCCESS:
      case _ActorAppConstants.ActionTypes.GROUP_CLEAR_ERROR:

      case _ActorAppConstants.ActionTypes.GROUP_LEAVE:
      case _ActorAppConstants.ActionTypes.GROUP_LEAVE_SUCCESS:
      case _ActorAppConstants.ActionTypes.GROUP_LEAVE_ERROR:

      case _ActorAppConstants.ActionTypes.GROUP_DELETE:
      case _ActorAppConstants.ActionTypes.GROUP_DELETE_SUCCESS:
      case _ActorAppConstants.ActionTypes.GROUP_DELETE_ERROR:
        this.__emitChange();
        break;
    }
  };

  return GroupStore;
}(_utils.Store);

exports.default = new GroupStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=GroupStore.js.map