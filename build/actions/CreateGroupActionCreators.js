'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var CreateGroupActionCreators = {
  open: function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_SHOW);
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  close: function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  setGroupName: function setGroupName(name) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_CREATE_SET_NAME, { name: name });
  },
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
      return _history2.default.push('/im/' + _PeerUtils2.default.peerToString(peer));
    };

    createGroup().then(openCreatedGroup).then(this.close);
  }
};

exports.default = CreateGroupActionCreators;
//# sourceMappingURL=CreateGroupActionCreators.js.map