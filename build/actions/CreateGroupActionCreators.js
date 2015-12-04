'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _DialogActionCreators = require('./DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var CreateGroupActionCreators = {
  open: function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_OPEN);
  },
  close: function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_CLOSE);
  },
  setGroupName: function setGroupName(name) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_CREATE_SET_NAME, { name: name });
  },

  //setGroupAvatar(avatar) {
  //  dispatch(ActionTypes.GROUP_CREATE_SET_AVATAR, { avatar });
  //},

  setSelectedUserIds: function setSelectedUserIds(selectedUserIds) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_CREATE_SET_MEMBERS, { selectedUserIds: selectedUserIds });
  },
  createGroup: function createGroup(title, avatar, memberIds) {
    var createGroup = function createGroup() {
      return (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.createGroup(title, avatar, memberIds), {
        request: _ActorAppConstants.ActionTypes.GROUP_CREATE,
        success: _ActorAppConstants.ActionTypes.GROUP_CREATE_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.GROUP_CREATE_ERROR
      }, { title: title, avatar: avatar, memberIds: memberIds });
    };

    var openCreatedGroup = function openCreatedGroup(peer) {
      return _DialogActionCreators2.default.selectDialogPeer(peer);
    };

    createGroup().then(openCreatedGroup).then(this.close);
  }
};

exports.default = CreateGroupActionCreators;
//# sourceMappingURL=CreateGroupActionCreators.js.map