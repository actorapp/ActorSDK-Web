'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _MessageActionCreators = require('./MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _TypingActionCreators = require('./TypingActionCreators');

var _TypingActionCreators2 = _interopRequireDefault(_TypingActionCreators);

var _DialogInfoActionCreators = require('./DialogInfoActionCreators');

var _DialogInfoActionCreators2 = _interopRequireDefault(_DialogInfoActionCreators);

var _OnlineActionCreators = require('./OnlineActionCreators');

var _OnlineActionCreators2 = _interopRequireDefault(_OnlineActionCreators);

var _GroupProfileActionCreators = require('./GroupProfileActionCreators');

var _GroupProfileActionCreators2 = _interopRequireDefault(_GroupProfileActionCreators);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messagesBinding = null; /*
                             * Copyright (C) 2015 Actor LLC. <https://actor.im>
                             */

var DialogActionCreators = {
  setDialogs: function setDialogs(dialogs) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DIALOGS_CHANGED, { dialogs: dialogs });
  },
  selectDialogPeer: function selectDialogPeer(peer) {
    var currentPeer = _DialogStore2.default.getCurrentPeer();

    // Unbind from previous peer
    if (currentPeer !== null) {
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.UNBIND_DIALOG_PEER);

      this.onConversationClosed(currentPeer);
      messagesBinding && messagesBinding.unbind();
      _ActorClient2.default.unbindTyping(currentPeer, _TypingActionCreators2.default.setTyping);

      switch (currentPeer.type) {
        case _ActorAppConstants.PeerTypes.USER:
          _ActorClient2.default.unbindUser(currentPeer.id, _DialogInfoActionCreators2.default.setDialogInfo);
          _ActorClient2.default.unbindUserOnline(currentPeer.id, _OnlineActionCreators2.default.setUserOnline);
          break;
        case _ActorAppConstants.PeerTypes.GROUP:
          _ActorClient2.default.unbindGroup(currentPeer.id, _DialogInfoActionCreators2.default.setDialogInfo);
          _ActorClient2.default.unbindGroupOnline(currentPeer.id, _OnlineActionCreators2.default.setGroupOnline);
          break;
        default:
      }
    }

    if (peer !== null) {
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.BIND_DIALOG_PEER, { peer: peer });

      this.onConversationOpen(peer);
      messagesBinding = _ActorClient2.default.bindMessages(peer, _MessageActionCreators2.default.setMessages);
      _ActorClient2.default.bindTyping(peer, _TypingActionCreators2.default.setTyping);
      switch (peer.type) {
        case _ActorAppConstants.PeerTypes.USER:
          _ActorClient2.default.bindUser(peer.id, _DialogInfoActionCreators2.default.setDialogInfo);
          _ActorClient2.default.bindUserOnline(peer.id, _OnlineActionCreators2.default.setUserOnline);
          break;
        case _ActorAppConstants.PeerTypes.GROUP:
          _ActorClient2.default.bindGroup(peer.id, _DialogInfoActionCreators2.default.setDialogInfo);
          _ActorClient2.default.bindGroupOnline(peer.id, _OnlineActionCreators2.default.setGroupOnline);
          _GroupProfileActionCreators2.default.getIntegrationToken(peer.id);
          break;
        default:
      }
    }
  },
  selectDialogPeerUser: function selectDialogPeerUser(uid) {
    if (uid === _ActorClient2.default.getUid()) {
      console.warn('You can\'t chat with yourself');
    } else {
      _history2.default.push('/im/' + _PeerUtils2.default.peerToString(_ActorClient2.default.getUserPeer(uid)));
    }
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
};

exports.default = DialogActionCreators;
//# sourceMappingURL=DialogActionCreators.js.map