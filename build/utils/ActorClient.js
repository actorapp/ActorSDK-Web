'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {

  // Auth

  requestSms: function requestSms(phone) {
    return new Promise(function (resolve, reject) {
      window.messenger.requestSms(phone, resolve, reject);
    });
  },
  requestCodeEmail: function requestCodeEmail(email) {
    return new Promise(function (resolve, reject) {
      window.messenger.requestCodeEmail(email, resolve, reject);
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
  getUser: function getUser(uid) {
    return window.messenger.getUser(uid);
  },
  getUid: function getUid() {
    return window.messenger.getUid();
  },
  getGroup: function getGroup(gid) {
    return window.messenger.getGroup(gid);
  },
  getInviteUrl: function getInviteUrl(gid) {
    return window.messenger.getInviteLink(gid);
  },
  sendTextMessage: function sendTextMessage(peer, text) {
    window.messenger.sendMessage(peer, text);
  },
  sendFileMessage: function sendFileMessage(peer, file) {
    window.messenger.sendFile(peer, file);
  },
  sendPhotoMessage: function sendPhotoMessage(peer, photo) {
    window.messenger.sendPhoto(peer, photo);
  },
  sendClipboardPhotoMessage: function sendClipboardPhotoMessage(peer, photo) {
    window.messenger.sendClipboardPhoto(peer, photo);
  },
  onMessageShown: function onMessageShown(peer, message) {
    window.messenger.onMessageShown(peer, message);
  },
  onChatEnd: function onChatEnd(peer) {
    window.messenger.onChatEnd(peer);
  },
  onDialogsEnd: function onDialogsEnd() {
    window.messenger.onDialogsEnd();
  },
  onConversationOpen: function onConversationOpen(peer) {
    window.messenger.onConversationOpen(peer);
  },
  onConversationClosed: function onConversationClosed(peer) {
    window.messenger.onConversationClosed(peer);
  },
  onTyping: function onTyping(peer) {
    window.messenger.onTyping(peer);
  },
  onAppHidden: function onAppHidden() {
    window.messenger.onAppHidden();
  },
  onAppVisible: function onAppVisible() {
    window.messenger.onAppVisible();
  },
  editMyName: function editMyName(string) {
    window.messenger.editMyName(string);
  },
  addContact: function addContact(uid) {
    window.messenger.addContact(uid);
  },
  removeContact: function removeContact(uid) {
    window.messenger.removeContact(uid);
  },

  // Groups

  joinGroupViaLink: function joinGroupViaLink(url) {
    return window.messenger.joinGroupViaLink(url);
  },
  leaveGroup: function leaveGroup(gid) {
    return window.messenger.leaveGroup(gid);
  },
  createGroup: function createGroup(title, avatar, userIds) {
    return window.messenger.createGroup(title, avatar, userIds);
  },
  kickMember: function kickMember(gid, uid) {
    return window.messenger.kickMember(gid, uid);
  },
  inviteMember: function inviteMember(gid, uid) {
    return window.messenger.inviteMember(gid, uid);
  },
  getIntegrationToken: function getIntegrationToken(gid) {
    return window.messenger.getIntegrationToken(gid);
  },
  loadDraft: function loadDraft(peer) {
    return window.messenger.loadDraft(peer);
  },
  saveDraft: function saveDraft(peer, draft) {
    if (draft !== null) {
      window.messenger.saveDraft(peer, draft);
    }
  },
  getUserPeer: function getUserPeer(uid) {
    return window.messenger.getUserPeer(uid);
  },
  getGroupPeer: function getGroupPeer(gid) {
    return window.messenger.getGroupPeer(gid);
  },
  hideChat: function hideChat(peer) {
    return window.messenger.hideChat(peer);
  },

  // Mentions

  findMentions: function findMentions(gid) {
    var query = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    return window.messenger.findMentions(gid, query);
  },

  // Nickname

  editMyNick: function editMyNick(string) {
    window.messenger.editMyNick(string);
  },
  deleteChat: function deleteChat(peer) {
    return window.messenger.deleteChat(peer);
  },
  clearChat: function clearChat(peer) {
    return window.messenger.clearChat(peer);
  },
  editMyAbout: function editMyAbout(about) {
    return window.messenger.editMyAbout(about);
  },
  editGroupTitle: function editGroupTitle(gid, title) {
    return window.messenger.editGroupTitle(gid, title);
  },
  editGroupAbout: function editGroupAbout(gid, about) {
    return window.messenger.editGroupAbout(gid, about);
  },
  renderMarkdown: function renderMarkdown(markdownText) {
    return window.messenger.renderMarkdown(markdownText);
  },

  // Settings

  changeNotificationsEnabled: function changeNotificationsEnabled(peer, isEnabled) {
    window.messenger.changeNotificationsEnabled(peer, isEnabled);
  },
  isNotificationsEnabled: function isNotificationsEnabled(peer) {
    return window.messenger.isNotificationsEnabled(peer);
  },
  isSendByEnterEnabled: function isSendByEnterEnabled() {
    return window.messenger.isSendByEnterEnabled();
  },
  changeSendByEnter: function changeSendByEnter(isEnabled) {
    window.messenger.changeSendByEnter(isEnabled);
  },
  isGroupsNotificationsEnabled: function isGroupsNotificationsEnabled() {
    return window.messenger.isGroupsNotificationsEnabled();
  },
  changeGroupNotificationsEnabled: function changeGroupNotificationsEnabled(isEnabled) {
    window.messenger.changeGroupNotificationsEnabled(isEnabled);
  },
  isOnlyMentionNotifications: function isOnlyMentionNotifications() {
    return window.messenger.isOnlyMentionNotifications();
  },
  changeIsOnlyMentionNotifications: function changeIsOnlyMentionNotifications(isEnabled) {
    window.messenger.changeIsOnlyMentionNotifications(isEnabled);
  },
  isSoundEffectsEnabled: function isSoundEffectsEnabled() {
    return window.messenger.isSoundEffectsEnabled();
  },
  changeSoundEffectsEnabled: function changeSoundEffectsEnabled(isEnabled) {
    window.messenger.changeSoundEffectsEnabled(isEnabled);
  },
  isShowNotificationsTextEnabled: function isShowNotificationsTextEnabled() {
    return window.messenger.isShowNotificationsTextEnabled();
  },
  changeIsShowNotificationTextEnabled: function changeIsShowNotificationTextEnabled(isEnabled) {
    window.messenger.changeIsShowNotificationTextEnabled(isEnabled);
  },
  loadSessions: function loadSessions() {
    return window.messenger.loadSessions();
  },
  terminateSession: function terminateSession(id) {
    return window.messenger.terminateSession(id);
  },
  terminateAllSessions: function terminateAllSessions() {
    return window.messenger.terminateAllSessions();
  },
  changeMyAvatar: function changeMyAvatar(avatar) {
    window.messenger.changeMyAvatar(avatar);
  },
  changeGroupAvatar: function changeGroupAvatar(gid, avatar) {
    window.messenger.changeGroupAvatar(gid, avatar);
  },
  removeMyAvatar: function removeMyAvatar() {
    window.messenger.removeMyAvatar();
  },
  removeGroupAvatar: function removeGroupAvatar(gid) {
    window.messenger.removeGroupAvatar(gid);
  },

  // Search

  findGroups: function findGroups(query) {
    return window.messenger.findGroups(query);
  },
  findUsers: function findUsers(phone) {
    return window.messenger.findUsers(phone.toString());
  },

  // Messages

  deleteMessage: function deleteMessage(peer, rid) {
    return window.messenger.deleteMessage(peer, rid);
  },
  addLike: function addLike(peer, rid) {
    return window.messenger.addLike(peer, rid);
  },
  removeLike: function removeLike(peer, rid) {
    return window.messenger.removeLike(peer, rid);
  },

  // Search

  bindSearch: function bindSearch(callback) {
    window.messenger.bindSearch(callback);
  },
  unbindSearch: function unbindSearch(callback) {
    window.messenger.unbindSearch(callback);
  },
  findAllText: function findAllText(peer, query) {
    return window.messenger.findAllText(peer, query);
  },
  findAllDocs: function findAllDocs(peer) {
    return window.messenger.findAllDocs(peer);
  },
  findAllLinks: function findAllLinks(peer) {
    return window.messenger.findAllLinks(peer);
  },
  findAllPhotos: function findAllPhotos(peer) {
    return window.messenger.findAllPhotos(peer);
  },
  handleLinkClick: function handleLinkClick(event) {
    messenger.handleLinkClick(event);
  },
  isElectron: function isElectron() {
    return window.messenger.isElectron();
  },
  favoriteChat: function favoriteChat(peer) {
    return window.messenger.favoriteChat(peer);
  },
  unfavoriteChat: function unfavoriteChat(peer) {
    return window.messenger.unfavoriteChat(peer);
  }
};
//# sourceMappingURL=ActorClient.js.map