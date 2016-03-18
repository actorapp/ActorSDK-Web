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

var NotificationsStore = function (_Store) {
  (0, _inherits3.default)(NotificationsStore, _Store);

  function NotificationsStore() {
    (0, _classCallCheck3.default)(this, NotificationsStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.apply(this, arguments));
  }

  NotificationsStore.prototype.isNotificationsEnabled = function isNotificationsEnabled(peer) {
    return _ActorClient2.default.isNotificationsEnabled(peer);
  };

  NotificationsStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.NOTIFICATION_CHANGE:
        this.__emitChange();
        break;
      default:
    }
  };

  return NotificationsStore;
}(_utils.Store);

exports.default = new NotificationsStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=NotificationsStore.js.map