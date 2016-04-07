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

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

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
      query: null,
      group: null,
      inviteUrl: null,
      users: {}
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
        return this.getInitialState();
      case _ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_SHOW:
        return (0, _extends3.default)({}, state, {
          isInviteByLinkOpen: true,
          group: action.group,
          inviteUrl: action.url
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_QUERY_CHANGE:
        return (0, _extends3.default)({}, state, {
          query: action.query
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_HIDE:
        return (0, _extends3.default)({}, state, {
          isInviteByLinkOpen: false
        });

      // Invite user
      case _ActorAppConstants.ActionTypes.INVITE_USER:
        state.users[action.uid] = _ActorAppConstants.AsyncActionStates.PROCESSING;
        return (0, _extends3.default)({}, state);
      case _ActorAppConstants.ActionTypes.INVITE_USER_SUCCESS:
        state.users[action.uid] = _ActorAppConstants.AsyncActionStates.SUCCESS;
        return (0, _extends3.default)({}, state);
      case _ActorAppConstants.ActionTypes.INVITE_USER_ERROR:
        state.users[action.uid] = _ActorAppConstants.AsyncActionStates.FAILURE;
        return (0, _extends3.default)({}, state);
      case _ActorAppConstants.ActionTypes.INVITE_USER_RESET:
        delete state.users[action.uid];
        return (0, _extends3.default)({}, state);
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

  InviteUserStore.prototype.getInviteUserState = function getInviteUserState() {
    return this.getState().users;
  };

  return InviteUserStore;
}(_utils.ReduceStore); /*
                        * Copyright (C) 2015 Actor LLC. <https://actor.im>
                        */

exports.default = new InviteUserStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=InviteUserStore.js.map