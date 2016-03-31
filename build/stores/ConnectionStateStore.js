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

var _state = 'updating'; /*
                          * Copyright (C) 2015 Actor LLC. <https://actor.im>
                          */

var ConnectionStateStore = function (_Store) {
  (0, _inherits3.default)(ConnectionStateStore, _Store);

  function ConnectionStateStore(dispatcher) {
    (0, _classCallCheck3.default)(this, ConnectionStateStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  /**
   * @returns {string} Connection state
   */


  ConnectionStateStore.prototype.getState = function getState() {
    return _state;
  };

  ConnectionStateStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.CONNECTION_STATE_CHANGED:
        _state = action.state;
        this.__emitChange();
        break;
      default:
    }
  };

  return ConnectionStateStore;
}(_utils.Store);

exports.default = new ConnectionStateStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=ConnectionStateStore.js.map