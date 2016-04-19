'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockedUsersActionCreators = function () {
  function BlockedUsersActionCreators() {
    (0, _classCallCheck3.default)(this, BlockedUsersActionCreators);
  }

  BlockedUsersActionCreators.prototype.open = function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.BLOCKED_USERS_OPEN);
    this.loadUsers();
  };

  BlockedUsersActionCreators.prototype.hide = function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.BLOCKED_USERS_HIDE);
  };

  BlockedUsersActionCreators.prototype.setQuery = function setQuery(query) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.BLOCKED_USERS_SET_QUERY, { query: query });
  };

  BlockedUsersActionCreators.prototype.loadUsers = function loadUsers() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.BLOCKED_USERS_LOAD);
    _ActorClient2.default.loadBlockedUsers().then(function (users) {
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.BLOCKED_USERS_SET, { users: users });
    }).catch(function (error) {
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.BLOCKED_USERS_LOAD_FAILED, { error: error });
    });
  };

  BlockedUsersActionCreators.prototype.blockUser = function blockUser(id) {
    _ActorClient2.default.blockUser(id).then(function () {
      console.debug('users blocked ' + id);
    }).catch(function (e) {
      console.error(e);
    });
  };

  BlockedUsersActionCreators.prototype.unblockUser = function unblockUser(id) {
    var _this = this;

    var reload = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    _ActorClient2.default.unblockUser(id).then(function () {
      if (reload) {
        _this.loadUsers();
      }
    }).catch(function (e) {
      console.error(e);
    });
  };

  return BlockedUsersActionCreators;
}(); /*
      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
      */

exports.default = new BlockedUsersActionCreators();
//# sourceMappingURL=BlockedUsersActionCreators.js.map