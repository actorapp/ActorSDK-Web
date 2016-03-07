'use strict';

exports.__esModule = true;

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _isOpen = false,
    _title = '',
    _about = '',
    _group = {};

var EditGroupStore = function (_Store) {
  _inherits(EditGroupStore, _Store);

  function EditGroupStore(Dispatcher) {
    _classCallCheck(this, EditGroupStore);

    return _possibleConstructorReturn(this, _Store.call(this, Dispatcher));
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