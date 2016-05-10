'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CreateGroupStore = function (_ReduceStore) {
  _inherits(CreateGroupStore, _ReduceStore);

  function CreateGroupStore() {
    _classCallCheck(this, CreateGroupStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  CreateGroupStore.prototype.getInitialState = function getInitialState() {
    return {
      step: _ActorAppConstants.CreateGroupSteps.NAME_INPUT,
      name: null,
      selectedUserIds: new _immutable2.default.Set()
    };
  };

  CreateGroupStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.GROUP_CREATE_SET_NAME:
        return _extends({}, state, {
          step: _ActorAppConstants.CreateGroupSteps.CONTACTS_SELECTION,
          name: action.name
        });

      case _ActorAppConstants.ActionTypes.GROUP_CREATE_SET_MEMBERS:
        return _extends({}, state, {
          selectedUserIds: action.selectedUserIds
        });

      case _ActorAppConstants.ActionTypes.GROUP_CREATE:
        return _extends({}, state, {
          step: _ActorAppConstants.CreateGroupSteps.CREATION_STARTED
        });

      // TODO: Show create group error success messages in modal
      case _ActorAppConstants.ActionTypes.GROUP_CREATE_SUCCESS:
        return this.getInitialState();

      case _ActorAppConstants.ActionTypes.GROUP_CREATE_ERROR:
        console.error('Failed to create group', action.error);
        return state;

      case _ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_HIDE:
        return this.getInitialState();

      default:
        return state;
    }
  };

  CreateGroupStore.prototype.getCurrentStep = function getCurrentStep() {
    return this.getState().step;
  };

  CreateGroupStore.prototype.getGroupName = function getGroupName() {
    return this.getState().name;
  };

  CreateGroupStore.prototype.getSelectedUserIds = function getSelectedUserIds() {
    return this.getState().selectedUserIds;
  };

  return CreateGroupStore;
}(_utils.ReduceStore);

exports.default = new CreateGroupStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=CreateGroupStore.js.map