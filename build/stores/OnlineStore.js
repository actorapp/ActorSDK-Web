'use strict';

exports.__esModule = true;

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

var message = '',
    online = 0,
    total = 0,
    _isOnline = false,
    _isNotMember = false;

var OnlineStore = function (_Store) {
  _inherits(OnlineStore, _Store);

  function OnlineStore(dispatcher) {
    _classCallCheck(this, OnlineStore);

    return _possibleConstructorReturn(this, _Store.call(this, dispatcher));
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