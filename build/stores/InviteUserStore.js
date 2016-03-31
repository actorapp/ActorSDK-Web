'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = require('flux/utils');

var _immutable = require('immutable');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InviteUserStore = function (_ReduceStore) {
  (0, _inherits3.default)(InviteUserStore, _ReduceStore);

  function InviteUserStore() {
    (0, _classCallCheck3.default)(this, InviteUserStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  InviteUserStore.prototype.getInitialState = function getInitialState() {
    return {
      isOpen: false,
      isInviteByLinkOpen: false,
      group: null,
      inviteUrl: null,
      users: new _immutable.Map()
    };
  };

  InviteUserStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.DIALOG_INFO_CHANGED:
        return (0, _extends3.default)({}, state, {
          group: action.info
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_MODAL_SHOW:
        return (0, _extends3.default)({}, state, {
          isOpen: true,
          group: action.group
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_MODAL_HIDE:
        return (0, _extends3.default)({}, state, {
          isOpen: false,
          users: state.users.clear()
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_SHOW:
        return (0, _extends3.default)({}, state, {
          isInviteByLinkOpen: true,
          group: action.group,
          inviteUrl: action.url
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_HIDE:
        return (0, _extends3.default)({}, state, {
          isInviteByLinkOpen: false
        });

      // Invite user
      case _ActorAppConstants.ActionTypes.INVITE_USER:
        return (0, _extends3.default)({}, state, {
          users: state.users.set(action.uid, _ActorAppConstants.AsyncActionStates.PROCESSING)
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_SUCCESS:
        return (0, _extends3.default)({}, state, {
          users: state.users.set(action.uid, _ActorAppConstants.AsyncActionStates.SUCCESS)
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_ERROR:
        return (0, _extends3.default)({}, state, {
          users: state.users.set(action.uid, _ActorAppConstants.AsyncActionStates.FAILURE)
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_RESET:
        return (0, _extends3.default)({}, state, {
          users: state.users.delete(action.uid)
        });
      default:
        return state;
    }
  };

  InviteUserStore.prototype.isModalOpen = function isModalOpen() {
    return this.getState().isOpen;
  };

  InviteUserStore.prototype.isInviteWithLinkModalOpen = function isInviteWithLinkModalOpen() {
    return this.getState().isInviteByLinkOpen;
  };

  InviteUserStore.prototype.getGroup = function getGroup() {
    return this.getState().group;
  };

  InviteUserStore.prototype.getInviteUrl = function getInviteUrl() {
    return this.getState().inviteUrl;
  };

  InviteUserStore.prototype.getInviteUserState = function getInviteUserState(uid) {
    var _getState = this.getState();

    var users = _getState.users;

    return users.get(uid) || _ActorAppConstants.AsyncActionStates.PENDING;
  };

  return InviteUserStore;
}(_utils.ReduceStore); /*
                        * Copyright (C) 2015 Actor LLC. <https://actor.im>
                        */

exports.default = new InviteUserStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=InviteUserStore.js.map