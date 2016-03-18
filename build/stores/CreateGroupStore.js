'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _modalOpen = false,
    _currentStep = _ActorAppConstants.CreateGroupSteps.NAME_INPUT,
    _groupName = '',
    _selectedUserIds = new _immutable2.default.Set(); /*
                                                       * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                       */

var CreateGroupStore = function (_Store) {
  (0, _inherits3.default)(CreateGroupStore, _Store);

  function CreateGroupStore(dispatcher) {
    (0, _classCallCheck3.default)(this, CreateGroupStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  CreateGroupStore.prototype.isModalOpen = function isModalOpen() {
    return _modalOpen;
  };

  CreateGroupStore.prototype.getCurrentStep = function getCurrentStep() {
    return _currentStep;
  };

  CreateGroupStore.prototype.getGroupName = function getGroupName() {
    return _groupName;
  };

  CreateGroupStore.prototype.getSelectedUserIds = function getSelectedUserIds() {
    return _selectedUserIds;
  };

  CreateGroupStore.prototype.resetStore = function resetStore() {
    _modalOpen = false;
    _currentStep = _ActorAppConstants.CreateGroupSteps.NAME_INPUT;
    _groupName = '';
    _selectedUserIds = new _immutable2.default.Set();
  };

  CreateGroupStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {

      case _ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_OPEN:
        _modalOpen = true;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_CLOSE:
        this.resetStore();
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.GROUP_CREATE_SET_NAME:
        _currentStep = _ActorAppConstants.CreateGroupSteps.CONTACTS_SELECTION;
        _groupName = action.name;
        this.__emitChange();
        break;

      //case ActionTypes.GROUP_CREATE_SET_AVATAR:
      //  _avatar = action.avatar;
      //  this.__emitChange();
      //  break;

      case _ActorAppConstants.ActionTypes.GROUP_CREATE_SET_MEMBERS:
        _selectedUserIds = action.selectedUserIds;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.GROUP_CREATE:
        _currentStep = _ActorAppConstants.CreateGroupSteps.CREATION_STARTED;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.GROUP_CREATE_SUCCESS:
        this.resetStore();
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.GROUP_CREATE_ERROR:
        console.error('Failed to create group', action.error);
        this.__emitChange();
        break;
    }
  };

  return CreateGroupStore;
}(_utils.Store);

exports.default = new CreateGroupStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=CreateGroupStore.js.map