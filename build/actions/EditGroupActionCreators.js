'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _EditGroupStore = require('../stores/EditGroupStore');

var _EditGroupStore2 = _interopRequireDefault(_EditGroupStore);

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  show: function show(gid) {
    var group = _ActorClient2.default.getGroup(gid);
    _ActorClient2.default.bindGroup(gid, this.onCurrentGroupChange);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_SHOW, { group: group });
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  hide: function hide() {
    var group = _EditGroupStore2.default.getGroup();
    _ActorClient2.default.unbindGroup(group.id, this.onCurrentGroupChange);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  onCurrentGroupChange: function onCurrentGroupChange(group) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_INFO_CHANGED, { group: group });
  },
  editGroupTitle: function editGroupTitle(gid, title) {
    if (title !== _EditGroupStore2.default.getTitle()) {
      (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.editGroupTitle(gid, title), {
        request: _ActorAppConstants.ActionTypes.GROUP_EDIT_TITLE,
        success: _ActorAppConstants.ActionTypes.GROUP_EDIT_TITLE_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.GROUP_EDIT_TITLE_ERROR
      }, { gid: gid, title: title });
    }
  },
  changeGroupAvatar: function changeGroupAvatar(gid, avatar) {
    _ActorClient2.default.changeGroupAvatar(gid, avatar);
  },
  editGroupAbout: function editGroupAbout(gid, about) {
    about = about === '' ? null : about;
    if (about !== _EditGroupStore2.default.getAbout()) {
      (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.editGroupAbout(gid, about), {
        request: _ActorAppConstants.ActionTypes.GROUP_EDIT_ABOUT,
        success: _ActorAppConstants.ActionTypes.GROUP_EDIT_ABOUT_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.GROUP_EDIT_ABOUT_ERROR
      }, { gid: gid, about: about });
    }
  },
  removeGroupAvatar: function removeGroupAvatar(gid) {
    _ActorClient2.default.removeGroupAvatar(gid);
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=EditGroupActionCreators.js.map