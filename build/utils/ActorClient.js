'use strict';

exports.__esModule = true;

var _requestSms$requestCo;

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = (_requestSms$requestCo = {

  // Auth

  requestSms: function requestSms(phone) {
    return new Promise(function (resolve, reject) {
      window.messenger.requestSms(phone.trim(), resolve, reject);
    });
  },
  requestCodeEmail: function requestCodeEmail(email) {
    return new Promise(function (resolve, reject) {
      window.messenger.requestCodeEmail(email.trim(), resolve, reject);
    });
  },
  sendCode: function sendCode(code) {
    return new Promise(function (resolve, reject) {
      window.messenger.sendCode(code, resolve, reject);
    });
  },
  signUp: function signUp(name) {
    return new Promise(function (resolve, reject) {
      window.messenger.signUp(name, resolve, reject);
    });
  },
  isLoggedIn: function isLoggedIn() {
    return window.messenger.isLoggedIn();
  },

  // Bindings

  bindDialogs: function bindDialogs(callback) {
    window.messenger.bindDialogs(callback);
  },
  unbindDialogs: function unbindDialogs(callback) {
    window.messenger.unbindDialogs(callback);
  },
  bindGroupDialogs: function bindGroupDialogs(callback) {
    window.messenger.bindGroupDialogs(callback);
  },
  unbindGroupDialogs: function unbindGroupDialogs(callback) {
    window.messenger.unbindGroupDialogs(callback);
  },
  bindChat: function bindChat(peer, callback) {
    window.messenger.bindChat(peer, callback);
  },
  unbindChat: function unbindChat(peer, callback) {
    window.messenger.unbindChat(peer, callback);
  },
  bindGroup: function bindGroup(gid, callback) {
    window.messenger.bindGroup(gid, callback);
  },
  unbindGroup: function unbindGroup(gid, callback) {
    window.messenger.unbindGroup(gid, callback);
  },
  bindUser: function bindUser(uid, callback) {
    window.messenger.bindUser(uid, callback);
  },
  unbindUser: function unbindUser(uid, callback) {
    window.messenger.unbindUser(uid, callback);
  },
  bindTyping: function bindTyping(peer, callback) {
    window.messenger.bindTyping(peer, callback);
  },
  unbindTyping: function unbindTyping(peer, callback) {
    window.messenger.unbindTyping(peer, callback);
  },
  bindContacts: function bindContacts(peer, callback) {
    window.messenger.bindContacts(peer, callback);
  },
  unbindContacts: function unbindContacts(peer, callback) {
    window.messenger.unbindContacts(peer, callback);
  },
  bindConnectState: function bindConnectState(callback) {
    window.messenger.bindConnectState(callback);
  },
  unbindConnectState: function unbindConnectState(callback) {
    window.messenger.unbindConnectState(callback);
  },
  bindGlobalCounter: function bindGlobalCounter(callback) {
    window.messenger.bindGlobalCounter(callback);
  },
  unbindGlobalCounter: function unbindGlobalCounter(callback) {
    window.messenger.unbindGlobalCounter(callback);
  },
  bindTempGlobalCounter: function bindTempGlobalCounter(callback) {
    window.messenger.bindTempGlobalCounter(callback);
  },
  unbindTempGlobalCounter: function unbindTempGlobalCounter(callback) {
    window.messenger.unbindTempGlobalCounter(callback);
  },
  bindUserOnline: function bindUserOnline(uid, callback) {
    window.messenger.bindUserOnline(uid, callback);
  },
  unbindUserOnline: function unbindUserOnline(uid, callback) {
    window.messenger.unbindUserOnline(uid, callback);
  },
  bindGroupOnline: function bindGroupOnline(gid, callback) {
    window.messenger.bindGroupOnline(gid, callback);
  },
  unbindGroupOnline: function unbindGroupOnline(gid, callback) {
    window.messenger.unbindGroupOnline(gid, callback);
  },
  bindMessages: function bindMessages(peer, callback) {
    return window.messenger.bindMessages(peer, callback);
  },
  bindEventBus: function bindEventBus(callback) {
    window.messenger.bindEventBus(callback);
  },
  unbindEventBus: function unbindEventBus(callback) {
    window.messenger.unbindEventBus(callback);
  },
  bindCall: function bindCall(callId, callback) {
    window.messenger.bindCall(callId, callback);
  },
  unbindCall: function unbindCall(callId, callback) {
    window.messenger.unbindCall(callId, callback);
  },
  makeCall: function makeCall(userId) {
    return window.messenger.doCall(userId);
  },
  makeGroupCall: function makeGroupCall(groupId) {
    return window.messenger.doGroupCall(groupId);
  },
  answerCall: function answerCall(callId) {
    window.messenger.answerCall(callId);
  },
  endCall: function endCall(callId) {
    window.messenger.endCall(callId);
  },
  toggleCallMute: function toggleCallMute(callId) {
    window.messenger.toggleCallMute(callId);
  }
}, _requestSms$requestCo['toggleCallMute'] = function toggleCallMute(id) {
  window.messenger.toggleCallMute(id);
}, _requestSms$requestCo.getUser = function getUser(uid) {
  return window.messenger.getUser(uid);
}, _requestSms$requestCo.getUid = function getUid() {
  return window.messenger.getUid();
}, _requestSms$requestCo.getGroup = function getGroup(gid) {
  return window.messenger.getGroup(gid);
}, _requestSms$requestCo.getInviteUrl = function getInviteUrl(gid) {
  return window.messenger.getInviteLink(gid);
}, _requestSms$requestCo.sendTextMessage = function sendTextMessage(peer, text) {
  window.messenger.sendMessage(peer, text);
}, _requestSms$requestCo.sendFileMessage = function sendFileMessage(peer, file) {
  window.messenger.sendFile(peer, file);
}, _requestSms$requestCo.sendPhotoMessage = function sendPhotoMessage(peer, photo) {
  window.messenger.sendPhoto(peer, photo);
}, _requestSms$requestCo.sendClipboardPhotoMessage = function sendClipboardPhotoMessage(peer, photo) {
  window.messenger.sendClipboardPhoto(peer, photo);
}, _requestSms$requestCo.onMessageShown = function onMessageShown(peer, message) {
  window.messenger.onMessageShown(peer, message);
}, _requestSms$requestCo.onChatEnd = function onChatEnd(peer) {
  window.messenger.onChatEnd(peer);
}, _requestSms$requestCo.onDialogsEnd = function onDialogsEnd() {
  window.messenger.onDialogsEnd();
}, _requestSms$requestCo.onConversationOpen = function onConversationOpen(peer) {
  window.messenger.onConversationOpen(peer);
}, _requestSms$requestCo.onConversationClosed = function onConversationClosed(peer) {
  window.messenger.onConversationClosed(peer);
}, _requestSms$requestCo.onTyping = function onTyping(peer) {
  window.messenger.onTyping(peer);
}, _requestSms$requestCo.onAppHidden = function onAppHidden() {
  window.messenger.onAppHidden();
}, _requestSms$requestCo.onAppVisible = function onAppVisible() {
  window.messenger.onAppVisible();
}, _requestSms$requestCo.editMyName = function editMyName(string) {
  window.messenger.editMyName(string);
}, _requestSms$requestCo.addContact = function addContact(uid) {
  window.messenger.addContact(uid);
}, _requestSms$requestCo.removeContact = function removeContact(uid) {
  window.messenger.removeContact(uid);
}, _requestSms$requestCo.joinGroupViaLink = function joinGroupViaLink(url) {
  return window.messenger.joinGroupViaLink(url);
}, _requestSms$requestCo.leaveGroup = function leaveGroup(gid) {
  return window.messenger.leaveGroup(gid);
}, _requestSms$requestCo.createGroup = function createGroup(title, avatar, userIds) {
  return window.messenger.createGroup(title, avatar, userIds);
}, _requestSms$requestCo.kickMember = function kickMember(gid, uid) {
  return window.messenger.kickMember(gid, uid);
}, _requestSms$requestCo.inviteMember = function inviteMember(gid, uid) {
  return window.messenger.inviteMember(gid, uid);
}, _requestSms$requestCo.getIntegrationToken = function getIntegrationToken(gid) {
  return window.messenger.getIntegrationToken(gid);
}, _requestSms$requestCo.loadDraft = function loadDraft(peer) {
  return window.messenger.loadDraft(peer);
}, _requestSms$requestCo.saveDraft = function saveDraft(peer, draft) {
  if (draft !== null) {
    window.messenger.saveDraft(peer, draft);
  }
}, _requestSms$requestCo.getUserPeer = function getUserPeer(uid) {
  return window.messenger.getUserPeer(uid);
}, _requestSms$requestCo.getGroupPeer = function getGroupPeer(gid) {
  return window.messenger.getGroupPeer(gid);
}, _requestSms$requestCo.hideChat = function hideChat(peer) {
  return window.messenger.hideChat(peer);
}, _requestSms$requestCo.findMentions = function findMentions(gid) {
  var query = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  return window.messenger.findMentions(gid, query);
}, _requestSms$requestCo.editMyNick = function editMyNick(string) {
  window.messenger.editMyNick(string);
}, _requestSms$requestCo.deleteChat = function deleteChat(peer) {
  return window.messenger.deleteChat(peer);
}, _requestSms$requestCo.clearChat = function clearChat(peer) {
  return window.messenger.clearChat(peer);
}, _requestSms$requestCo.editMyAbout = function editMyAbout(about) {
  return window.messenger.editMyAbout(about);
}, _requestSms$requestCo.editGroupTitle = function editGroupTitle(gid, title) {
  return window.messenger.editGroupTitle(gid, title);
}, _requestSms$requestCo.editGroupAbout = function editGroupAbout(gid, about) {
  return window.messenger.editGroupAbout(gid, about);
}, _requestSms$requestCo.renderMarkdown = function renderMarkdown(markdownText) {
  return window.messenger.renderMarkdown(markdownText);
}, _requestSms$requestCo.changeNotificationsEnabled = function changeNotificationsEnabled(peer, isEnabled) {
  window.messenger.changeNotificationsEnabled(peer, isEnabled);
}, _requestSms$requestCo.isNotificationsEnabled = function isNotificationsEnabled(peer) {
  return window.messenger.isNotificationsEnabled(peer);
}, _requestSms$requestCo.isSendByEnterEnabled = function isSendByEnterEnabled() {
  return window.messenger.isSendByEnterEnabled();
}, _requestSms$requestCo.changeSendByEnter = function changeSendByEnter(isEnabled) {
  window.messenger.changeSendByEnter(isEnabled);
}, _requestSms$requestCo.isGroupsNotificationsEnabled = function isGroupsNotificationsEnabled() {
  return window.messenger.isGroupsNotificationsEnabled();
}, _requestSms$requestCo.changeGroupNotificationsEnabled = function changeGroupNotificationsEnabled(isEnabled) {
  window.messenger.changeGroupNotificationsEnabled(isEnabled);
}, _requestSms$requestCo.isOnlyMentionNotifications = function isOnlyMentionNotifications() {
  return window.messenger.isOnlyMentionNotifications();
}, _requestSms$requestCo.changeIsOnlyMentionNotifications = function changeIsOnlyMentionNotifications(isEnabled) {
  window.messenger.changeIsOnlyMentionNotifications(isEnabled);
}, _requestSms$requestCo.isSoundEffectsEnabled = function isSoundEffectsEnabled() {
  return window.messenger.isSoundEffectsEnabled();
}, _requestSms$requestCo.changeSoundEffectsEnabled = function changeSoundEffectsEnabled(isEnabled) {
  window.messenger.changeSoundEffectsEnabled(isEnabled);
}, _requestSms$requestCo.isShowNotificationsTextEnabled = function isShowNotificationsTextEnabled() {
  return window.messenger.isShowNotificationsTextEnabled();
}, _requestSms$requestCo.changeIsShowNotificationTextEnabled = function changeIsShowNotificationTextEnabled(isEnabled) {
  window.messenger.changeIsShowNotificationTextEnabled(isEnabled);
}, _requestSms$requestCo.loadSessions = function loadSessions() {
  return window.messenger.loadSessions();
}, _requestSms$requestCo.terminateSession = function terminateSession(id) {
  return window.messenger.terminateSession(id);
}, _requestSms$requestCo.terminateAllSessions = function terminateAllSessions() {
  return window.messenger.terminateAllSessions();
}, _requestSms$requestCo.changeMyAvatar = function changeMyAvatar(avatar) {
  window.messenger.changeMyAvatar(avatar);
}, _requestSms$requestCo.changeGroupAvatar = function changeGroupAvatar(gid, avatar) {
  window.messenger.changeGroupAvatar(gid, avatar);
}, _requestSms$requestCo.removeMyAvatar = function removeMyAvatar() {
  window.messenger.removeMyAvatar();
}, _requestSms$requestCo.removeGroupAvatar = function removeGroupAvatar(gid) {
  window.messenger.removeGroupAvatar(gid);
}, _requestSms$requestCo.findGroups = function findGroups(query) {
  return window.messenger.findGroups(query);
}, _requestSms$requestCo.findUsers = function findUsers(phone) {
  return window.messenger.findUsers(phone.toString());
}, _requestSms$requestCo.deleteMessage = function deleteMessage(peer, rid) {
  return window.messenger.deleteMessage(peer, rid);
}, _requestSms$requestCo.addLike = function addLike(peer, rid) {
  return window.messenger.addLike(peer, rid);
}, _requestSms$requestCo.removeLike = function removeLike(peer, rid) {
  return window.messenger.removeLike(peer, rid);
}, _requestSms$requestCo.sendVoiceMessage = function sendVoiceMessage(peer, duration, voice) {
  window.messenger.sendVoiceMessage(peer, duration, voice);
}, _requestSms$requestCo.bindSearch = function bindSearch(callback) {
  window.messenger.bindSearch(callback);
}, _requestSms$requestCo.unbindSearch = function unbindSearch(callback) {
  window.messenger.unbindSearch(callback);
}, _requestSms$requestCo.findAllText = function findAllText(peer, query) {
  return window.messenger.findAllText(peer, query);
}, _requestSms$requestCo.findAllDocs = function findAllDocs(peer) {
  return window.messenger.findAllDocs(peer);
}, _requestSms$requestCo.findAllLinks = function findAllLinks(peer) {
  return window.messenger.findAllLinks(peer);
}, _requestSms$requestCo.findAllPhotos = function findAllPhotos(peer) {
  return window.messenger.findAllPhotos(peer);
}, _requestSms$requestCo.handleLinkClick = function handleLinkClick(event) {
  messenger.handleLinkClick(event);
}, _requestSms$requestCo.isElectron = function isElectron() {
  return window.messenger.isElectron();
}, _requestSms$requestCo.favoriteChat = function favoriteChat(peer) {
  return window.messenger.favoriteChat(peer);
}, _requestSms$requestCo.unfavoriteChat = function unfavoriteChat(peer) {
  return window.messenger.unfavoriteChat(peer);
}, _requestSms$requestCo.archiveChat = function archiveChat(peer) {
  return window.messenger.archiveChat(peer);
}, _requestSms$requestCo.loadArchivedDialogs = function loadArchivedDialogs() {
  return window.messenger.loadArchivedDialogs();
}, _requestSms$requestCo.loadMoreArchivedDialogs = function loadMoreArchivedDialogs() {
  return window.messenger.loadMoreArchivedDialogs();
}, _requestSms$requestCo);
//# sourceMappingURL=ActorClient.js.map