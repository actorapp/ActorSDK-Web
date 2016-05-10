'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var InviteUserStore = function (_ReduceStore) {
  _inherits(InviteUserStore, _ReduceStore);

  function InviteUserStore() {
    _classCallCheck(this, InviteUserStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  InviteUserStore.prototype.getInitialState = function getInitialState() {
    return {
      query: null,
      group: null,
      inviteUrl: null,
      users: {}
    };
  };

  InviteUserStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.DIALOG_INFO_CHANGED:
        return _extends({}, state, {
          group: action.info
        });

      case _ActorAppConstants.ActionTypes.INVITE_USER_MODAL_SHOW:
        return _extends({}, state, {
          group: action.group
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_MODAL_HIDE:
        return this.getInitialState();

      case _ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_SHOW:
        return _extends({}, state, {
          group: action.group,
          inviteUrl: action.url
        });

      // Invite user
      case _ActorAppConstants.ActionTypes.INVITE_USER:
        state.users[action.uid] = _ActorAppConstants.AsyncActionStates.PROCESSING;
        return _extends({}, state);
      case _ActorAppConstants.ActionTypes.INVITE_USER_SUCCESS:
        state.users[action.uid] = _ActorAppConstants.AsyncActionStates.SUCCESS;
        return _extends({}, state);
      case _ActorAppConstants.ActionTypes.INVITE_USER_ERROR:
        state.users[action.uid] = _ActorAppConstants.AsyncActionStates.FAILURE;
        return _extends({}, state);
      case _ActorAppConstants.ActionTypes.INVITE_USER_RESET:
        delete state.users[action.uid];
        return _extends({}, state);
      default:
        return state;
    }
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
}(_utils.ReduceStore);

exports.default = new InviteUserStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=InviteUserStore.js.map