'use strict';

exports.__esModule = true;

var _events = require('events');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CHANGE_EVENT = 'change';

var _isInviteModalOpen = false,
    _isInviteByLinkModalOpen = false,
    _group = null,
    _inviteUrl = null,
    _inviteUserState = [];

var InviteUserStore = (function (_EventEmitter) {
  _inherits(InviteUserStore, _EventEmitter);

  function InviteUserStore() {
    _classCallCheck(this, InviteUserStore);

    return _possibleConstructorReturn(this, _EventEmitter.apply(this, arguments));
  }

  InviteUserStore.prototype.emitChange = function emitChange() {
    this.emit(CHANGE_EVENT);
  };

  InviteUserStore.prototype.addChangeListener = function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  };

  InviteUserStore.prototype.removeChangeListener = function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  };

  InviteUserStore.prototype.isModalOpen = function isModalOpen() {
    return _isInviteModalOpen;
  };

  InviteUserStore.prototype.isInviteWithLinkModalOpen = function isInviteWithLinkModalOpen() {
    return _isInviteByLinkModalOpen;
  };

  InviteUserStore.prototype.getGroup = function getGroup() {
    return _group;
  };

  InviteUserStore.prototype.getInviteUrl = function getInviteUrl() {
    return _inviteUrl;
  };

  InviteUserStore.prototype.getInviteUserState = function getInviteUserState(uid) {
    return _inviteUserState[uid] || _ActorAppConstants.AsyncActionStates.PENDING;
  };

  InviteUserStore.prototype.resetInviteUserState = function resetInviteUserState(uid) {
    delete _inviteUserState[uid];
  };

  return InviteUserStore;
})(_events.EventEmitter);

var InviteUserStoreInstance = new InviteUserStore();

InviteUserStoreInstance.dispatchToken = (0, _ActorAppDispatcher.register)(function (action) {
  switch (action.type) {
    case _ActorAppConstants.ActionTypes.DIALOG_INFO_CHANGED:
      _group = action.info;
      InviteUserStoreInstance.emitChange();
      break;

    case _ActorAppConstants.ActionTypes.INVITE_USER_MODAL_SHOW:
      _isInviteModalOpen = true;
      _group = action.group;
      InviteUserStoreInstance.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.INVITE_USER_MODAL_HIDE:
      _inviteUserState = [];
      _isInviteModalOpen = false;
      InviteUserStoreInstance.emitChange();
      break;

    case _ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_SHOW:
      _isInviteByLinkModalOpen = true;
      _group = action.group;
      _ActorClient2.default.getInviteUrl(_group.id).then(function (url) {
        _inviteUrl = url;
        InviteUserStoreInstance.emitChange();
      });
      InviteUserStoreInstance.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_HIDE:
      _isInviteByLinkModalOpen = false;
      InviteUserStoreInstance.emitChange();
      break;

    // Invite user
    case _ActorAppConstants.ActionTypes.INVITE_USER:
      _inviteUserState[action.uid] = _ActorAppConstants.AsyncActionStates.PROCESSING;
      InviteUserStoreInstance.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.INVITE_USER_SUCCESS:
      _inviteUserState[action.uid] = _ActorAppConstants.AsyncActionStates.SUCCESS;
      InviteUserStoreInstance.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.INVITE_USER_ERROR:
      _inviteUserState[action.uid] = _ActorAppConstants.AsyncActionStates.FAILURE;
      InviteUserStoreInstance.emitChange();
      break;
  }
});

exports.default = InviteUserStoreInstance;
//# sourceMappingURL=InviteUserStore.js.map