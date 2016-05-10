'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var EditGroupStore = function (_ReduceStore) {
  _inherits(EditGroupStore, _ReduceStore);

  function EditGroupStore() {
    _classCallCheck(this, EditGroupStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  EditGroupStore.prototype.getInitialState = function getInitialState() {
    return {
      group: null
    };
  };

  EditGroupStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_SHOW:
      case _ActorAppConstants.ActionTypes.GROUP_INFO_CHANGED:
        return _extends({}, state, {
          group: action.group
        });

      case _ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_HIDE:
        return this.getInitialState();

      default:
        return state;
    }
  };

  EditGroupStore.prototype.getGroup = function getGroup() {
    return this.getState().group;
  };

  EditGroupStore.prototype.getAbout = function getAbout() {
    return this.getState().group.about;
  };

  EditGroupStore.prototype.getTitle = function getTitle() {
    return this.getState().group.name;
  };

  EditGroupStore.prototype.isAdmin = function isAdmin() {
    var myID = _ActorClient2.default.getUid();
    return this.getState().group.adminId === myID;
  };

  return EditGroupStore;
}(_utils.ReduceStore);

exports.default = new EditGroupStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=EditGroupStore.js.map