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

var LoggerStore = function (_Store) {
  (0, _inherits3.default)(LoggerStore, _Store);

  function LoggerStore(dispatcher) {
    (0, _classCallCheck3.default)(this, LoggerStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));

    _this._logs = [];
    _this._isOpen = false;
    return _this;
  }

  LoggerStore.prototype.isOpen = function isOpen() {
    return this._isOpen;
  };

  LoggerStore.prototype.getLogs = function getLogs() {
    return this._logs;
  };

  LoggerStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.LOGGER_TOGGLE:
        this._isOpen = !this._isOpen;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.LOGGER_APPEND:
        this._logs.push(action.payload);
        this.__emitChange();
        break;
    }
  };

  return LoggerStore;
}(_utils.Store); /*
                  * Copyright (C) 2015 Actor LLC. <https://actor.im>
                  */

exports.default = new LoggerStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=LoggerStore.js.map