'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _RouterContainer = require('../utils/RouterContainer');

var _RouterContainer2 = _interopRequireDefault(_RouterContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogActionCreators = {
  setDialogs: function setDialogs(dialogs) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DIALOGS_CHANGED, { dialogs: dialogs });
  },
  selectDialogPeer: function selectDialogPeer(peer) {
    _RouterContainer2.default.get().transitionTo('main', { id: _PeerUtils2.default.peerToString(peer) });
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER, { peer: peer });
  },
  selectDialogPeerUser: function selectDialogPeerUser(userId) {
    if (userId === _ActorClient2.default.getUid()) {
      console.warn('You can\'t chat with yourself');
    } else {
      this.selectDialogPeer({
        type: _ActorAppConstants.PeerTypes.USER,
        id: userId
      });
    }
  },
  createSelectedDialogInfoChanged: function createSelectedDialogInfoChanged(info) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SELECTED_DIALOG_INFO_CHANGED, { info: info });
  },
  onConversationOpen: function onConversationOpen(peer) {
    _ActorClient2.default.onConversationOpen(peer);
  },
  onConversationClosed: function onConversationClosed(peer) {
    _ActorClient2.default.onConversationClosed(peer);
  },
  onDialogsEnd: function onDialogsEnd() {
    _ActorClient2.default.onDialogsEnd();
  },
  onChatEnd: function onChatEnd(peer) {
    _ActorClient2.default.onChatEnd(peer);
  },
  leaveGroup: function leaveGroup(gid) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.leaveGroup(gid), {
      request: _ActorAppConstants.ActionTypes.GROUP_LEAVE,
      success: _ActorAppConstants.ActionTypes.GROUP_LEAVE_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.GROUP_LEAVE_ERROR
    }, { gid: gid });
  },
  changeNotificationsEnabled: function changeNotificationsEnabled(peer, isEnabled) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.NOTIFICATION_CHANGE, { peer: peer, isEnabled: isEnabled });
  },
  deleteChat: function deleteChat(peer) {
    var gid = peer.id;
    var leaveGroup = function leaveGroup() {
      return (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.leaveGroup(gid), {
        request: _ActorAppConstants.ActionTypes.GROUP_LEAVE,
        success: _ActorAppConstants.ActionTypes.GROUP_LEAVE_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.GROUP_LEAVE_ERROR
      }, { gid: gid });
    };
    var deleteChat = function deleteChat() {
      return (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.deleteChat(peer), {
        request: _ActorAppConstants.ActionTypes.GROUP_DELETE,
        success: _ActorAppConstants.ActionTypes.GROUP_DELETE_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.GROUP_DELETE_ERROR
      }, { peer: peer });
    };

    switch (peer.type) {
      case _ActorAppConstants.PeerTypes.USER:
        deleteChat();
        break;
      case _ActorAppConstants.PeerTypes.GROUP:
        leaveGroup().then(deleteChat);
        break;
      default:
    }
  },
  clearChat: function clearChat(peer) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.clearChat(peer), {
      request: _ActorAppConstants.ActionTypes.GROUP_CLEAR,
      success: _ActorAppConstants.ActionTypes.GROUP_CLEAR_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.GROUP_CLEAR_ERROR
    }, { peer: peer });
  },
  hideChat: function hideChat(peer) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.hideChat(peer), {
      request: _ActorAppConstants.ActionTypes.GROUP_HIDE,
      success: _ActorAppConstants.ActionTypes.GROUP_HIDE_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.GROUP_HIDE_ERROR
    }, { peer: peer });
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */

exports.default = DialogActionCreators;