'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var _isOpen = false,
    _title = '',
    _about = '',
    _group = {};

var EditGroupStore = function (_Store) {
  (0, _inherits3.default)(EditGroupStore, _Store);

  function EditGroupStore(Dispatcher) {
    (0, _classCallCheck3.default)(this, EditGroupStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, Dispatcher));
  }

  EditGroupStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  EditGroupStore.prototype.getGroup = function getGroup() {
    return _group;
  };

  EditGroupStore.prototype.getAbout = function getAbout() {
    return _about;
  };

  EditGroupStore.prototype.getTitle = function getTitle() {
    return _title;
  };

  EditGroupStore.prototype.isAdmin = function isAdmin() {
    var myID = _ActorClient2.default.getUid();
    return _group.adminId === myID;
  };

  EditGroupStore.prototype.setGroup = function setGroup(group) {
    _group = group;
    _title = _group.name;
    _about = _group.about;
  };

  EditGroupStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_SHOW:
        _isOpen = true;
        this.setGroup(action.group);
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.GROUP_INFO_CHANGED:
        this.setGroup(action.group);
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_HIDE:
        _isOpen = false;
        this.__emitChange();
        break;
    }
  };

  return EditGroupStore;
}(_utils.Store);

exports.default = new EditGroupStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=EditGroupStore.js.map