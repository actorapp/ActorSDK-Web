'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _ActionCreators2 = require('./ActionCreators');

var _ActionCreators3 = _interopRequireDefault(_ActionCreators2);

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

var _DraftActionCreators = require('./DraftActionCreators');

var _DraftActionCreators2 = _interopRequireDefault(_DraftActionCreators);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _MessageStore = require('../stores/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var DialogActionCreators = function (_ActionCreators) {
  (0, _inherits3.default)(DialogActionCreators, _ActionCreators);

  function DialogActionCreators() {
    (0, _classCallCheck3.default)(this, DialogActionCreators);
    return (0, _possibleConstructorReturn3.default)(this, _ActionCreators.apply(this, arguments));
  }

  DialogActionCreators.prototype.setDialogs = function setDialogs(dialogs) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DIALOGS_CHANGED, { dialogs: dialogs });
  };

  DialogActionCreators.prototype.selectDialogPeerUser = function selectDialogPeerUser(uid) {
    if (uid === _ActorClient2.default.getUid()) {
      console.warn('You can\'t chat with yourself');
    } else {
      _history2.default.push('/im/' + _PeerUtils2.default.peerToString(_ActorClient2.default.getUserPeer(uid)));
    }
  };

  DialogActionCreators.prototype.selectDialogPeer = function selectDialogPeer(peer) {
    var currentPeer = _DialogStore2.default.getCurrentPeer();

    if (currentPeer) {
      _DraftActionCreators2.default.saveDraft(currentPeer);
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.UNBIND_DIALOG_PEER, { peer: currentPeer });
      _ActorClient2.default.onConversationClosed(currentPeer);

      this.removeBindings('peer');
    }

    if (!peer) {
      return;
    }

    _DraftActionCreators2.default.loadDraft(peer);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.BIND_DIALOG_PEER, { peer: peer });
    _ActorClient2.default.onConversationOpen(peer);

    var bindings = [_ActorClient2.default.bindMessages(peer, _MessageActionCreators2.default.setMessages), _ActorClient2.default.bindTyping(peer, _TypingActionCreators2.default.setTyping)];

    switch (peer.type) {
      case _ActorAppConstants.PeerTypes.USER:
        bindings.push(_ActorClient2.default.bindUser(peer.id, _DialogInfoActionCreators2.default.setDialogInfo), _ActorClient2.default.bindUserOnline(peer.id, _OnlineActionCreators2.default.setUserOnline));
        break;
      case _ActorAppConstants.PeerTypes.GROUP:
        bindings.push(_ActorClient2.default.bindGroup(peer.id, _DialogInfoActionCreators2.default.setDialogInfo), _ActorClient2.default.bindGroupOnline(peer.id, _OnlineActionCreators2.default.setGroupOnline));
        _GroupProfileActionCreators2.default.getIntegrationToken(peer.id);
        break;
    }

    this.setBindings('peer', bindings);
  };

  DialogActionCreators.prototype.onDialogsEnd = function onDialogsEnd() {
    _ActorClient2.default.onDialogsEnd();
  };

  DialogActionCreators.prototype.onChatEnd = function onChatEnd(peer) {
    _ActorClient2.default.onChatEnd(peer);
  };

  DialogActionCreators.prototype.leaveGroup = function leaveGroup(gid) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.leaveGroup(gid), {
      request: _ActorAppConstants.ActionTypes.GROUP_LEAVE,
      success: _ActorAppConstants.ActionTypes.GROUP_LEAVE_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.GROUP_LEAVE_ERROR
    }, { gid: gid });
  };

  DialogActionCreators.prototype.deleteChat = function deleteChat(peer) {
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
  };

  DialogActionCreators.prototype.clearChat = function clearChat(peer) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.clearChat(peer), {
      request: _ActorAppConstants.ActionTypes.GROUP_CLEAR,
      success: _ActorAppConstants.ActionTypes.GROUP_CLEAR_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.GROUP_CLEAR_ERROR
    }, { peer: peer });
  };

  DialogActionCreators.prototype.hideChat = function hideChat(peer) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.hideChat(peer), {
      request: _ActorAppConstants.ActionTypes.GROUP_HIDE,
      success: _ActorAppConstants.ActionTypes.GROUP_HIDE_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.GROUP_HIDE_ERROR
    }, { peer: peer });
  };

  DialogActionCreators.prototype.loadMoreMessages = function loadMoreMessages(peer) {
    if (_MessageStore2.default.isAllRendered()) {
      this.onChatEnd(peer);
    } else {
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGES_LOAD_MORE);
    }
  };

  return DialogActionCreators;
}(_ActionCreators3.default);

exports.default = new DialogActionCreators();
//# sourceMappingURL=DialogActionCreators.js.map