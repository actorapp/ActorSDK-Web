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

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _EditGroupStore = require('../stores/EditGroupStore');

var _EditGroupStore2 = _interopRequireDefault(_EditGroupStore);

var _ActionCreators2 = require('./ActionCreators');

var _ActionCreators3 = _interopRequireDefault(_ActionCreators2);

var _ComposeActionCreators = require('./ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var EditGroupActionCreators = function (_ActionCreators) {
  (0, _inherits3.default)(EditGroupActionCreators, _ActionCreators);

  function EditGroupActionCreators() {
    (0, _classCallCheck3.default)(this, EditGroupActionCreators);
    return (0, _possibleConstructorReturn3.default)(this, _ActionCreators.apply(this, arguments));
  }

  EditGroupActionCreators.prototype.show = function show(gid) {
    this.setBindings('group', [_ActorClient2.default.bindGroup(gid, this.onCurrentGroupChange)]);

    var group = _ActorClient2.default.getGroup(gid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_SHOW, { group: group });

    _ComposeActionCreators2.default.toggleAutoFocus(false);
  };

  EditGroupActionCreators.prototype.hide = function hide() {
    this.removeBindings('group');

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_HIDE);

    _ComposeActionCreators2.default.toggleAutoFocus(true);
  };

  EditGroupActionCreators.prototype.onCurrentGroupChange = function onCurrentGroupChange(group) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_INFO_CHANGED, { group: group });
  };

  EditGroupActionCreators.prototype.editGroupTitle = function editGroupTitle(gid, title) {
    if (title !== _EditGroupStore2.default.getTitle()) {
      (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.editGroupTitle(gid, title), {
        request: _ActorAppConstants.ActionTypes.GROUP_EDIT_TITLE,
        success: _ActorAppConstants.ActionTypes.GROUP_EDIT_TITLE_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.GROUP_EDIT_TITLE_ERROR
      }, { gid: gid, title: title });
    }
  };

  EditGroupActionCreators.prototype.changeGroupAvatar = function changeGroupAvatar(gid, avatar) {
    _ActorClient2.default.changeGroupAvatar(gid, avatar);
  };

  EditGroupActionCreators.prototype.editGroupAbout = function editGroupAbout(gid, about) {
    about = about === '' ? null : about;
    if (about !== _EditGroupStore2.default.getAbout()) {
      (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.editGroupAbout(gid, about), {
        request: _ActorAppConstants.ActionTypes.GROUP_EDIT_ABOUT,
        success: _ActorAppConstants.ActionTypes.GROUP_EDIT_ABOUT_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.GROUP_EDIT_ABOUT_ERROR
      }, { gid: gid, about: about });
    }
  };

  EditGroupActionCreators.prototype.removeGroupAvatar = function removeGroupAvatar(gid) {
    _ActorClient2.default.removeGroupAvatar(gid);
  };

  return EditGroupActionCreators;
}(_ActionCreators3.default);

exports.default = new EditGroupActionCreators();
//# sourceMappingURL=EditGroupActionCreators.js.map