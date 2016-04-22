'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

exports.default = {
  show: function show() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.PROFILE_SHOW);
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.PROFILE_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  setProfile: function setProfile(profile) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.PROFILE_CHANGED, { profile: profile });
  },
  editMyName: function editMyName(name) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.editMyName(name), {
      request: _ActorAppConstants.ActionTypes.PROFILE_EDIT_NAME,
      success: _ActorAppConstants.ActionTypes.PROFILE_EDIT_NAME_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.PROFILE_EDIT_NAME_ERROR
    }, { name: name });
  },
  editMyNick: function editMyNick(nick) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.editMyNick(nick), {
      request: _ActorAppConstants.ActionTypes.PROFILE_EDIT_NICK,
      success: _ActorAppConstants.ActionTypes.PROFILE_EDIT_NICK_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.PROFILE_EDIT_NICK_ERROR
    }, { nick: nick });
  },
  editMyAbout: function editMyAbout(about) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.editMyAbout(about), {
      request: _ActorAppConstants.ActionTypes.PROFILE_EDIT_ABOUT,
      success: _ActorAppConstants.ActionTypes.PROFILE_EDIT_ABOUT_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.PROFILE_EDIT_ABOUT_ERROR
    }, { about: about });
  },
  changeMyAvatar: function changeMyAvatar(newAvatar) {
    _ActorClient2.default.changeMyAvatar(newAvatar);
  },
  removeMyAvatar: function removeMyAvatar() {
    _ActorClient2.default.removeMyAvatar();
  }
};
//# sourceMappingURL=ProfileActionCreators.js.map