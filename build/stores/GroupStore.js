'use strict';

exports.__esModule = true;

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _integrationToken = null;

var GroupStore = function (_Store) {
  _inherits(GroupStore, _Store);

  function GroupStore(dispatcher) {
    _classCallCheck(this, GroupStore);

    return _possibleConstructorReturn(this, _Store.call(this, dispatcher));
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