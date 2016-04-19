'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockedUsersStore = function (_ReduceStore) {
  (0, _inherits3.default)(BlockedUsersStore, _ReduceStore);

  function BlockedUsersStore() {
    (0, _classCallCheck3.default)(this, BlockedUsersStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  BlockedUsersStore.prototype.getInitialState = function getInitialState() {
    return {
      isOpen: false,
      users: [],
      query: null
    };
  };

  BlockedUsersStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.BLOCKED_USERS_OPEN:
        return (0, _extends3.default)({}, state, {
          isOpen: true
        });

      case _ActorAppConstants.ActionTypes.BLOCKED_USERS_HIDE:
        return this.getInitialState();

      case _ActorAppConstants.ActionTypes.BLOCKED_USERS_SET:
        return (0, _extends3.default)({}, state, {
          users: action.users
        });

      case _ActorAppConstants.ActionTypes.BLOCKED_USERS_SET_QUERY:
        return (0, _extends3.default)({}, state, {
          query: action.query
        });

      default:
        return state;
    }
  };

  return BlockedUsersStore;
}(_utils.ReduceStore); /*
                        * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                        */

exports.default = new BlockedUsersStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=BlockedUsersStore.js.map