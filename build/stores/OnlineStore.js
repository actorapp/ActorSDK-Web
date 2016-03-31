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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message = '',
    online = 0,
    total = 0,
    _isOnline = false,
    _isNotMember = false; /*
                           * Copyright (C) 2015 Actor LLC. <https://actor.im>
                           */

var OnlineStore = function (_Store) {
  (0, _inherits3.default)(OnlineStore, _Store);

  function OnlineStore(dispatcher) {
    (0, _classCallCheck3.default)(this, OnlineStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  OnlineStore.prototype.getMessage = function getMessage() {
    return message;
  };

  OnlineStore.prototype.getTotal = function getTotal() {
    return total;
  };

  OnlineStore.prototype.getOnline = function getOnline() {
    return online;
  };

  OnlineStore.prototype.isOnline = function isOnline() {
    return _isOnline;
  };

  OnlineStore.prototype.isNotMember = function isNotMember() {
    return _isNotMember;
  };

  OnlineStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.GROUP_ONLINE_CHANGE:
        message = action.message;
        online = action.online;
        total = action.total;
        _isNotMember = action.isNotMember;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.USER_ONLINE_CHANGE:
        message = action.message;
        _isOnline = action.isOnline;
        this.__emitChange();
        break;
      default:
    }
  };

  return OnlineStore;
}(_utils.Store);

exports.default = new OnlineStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=OnlineStore.js.map