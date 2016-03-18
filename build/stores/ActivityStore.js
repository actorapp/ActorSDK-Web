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

var _isOpen = false; /*
                      * Copyright (C) 2015 Actor LLC. <https://actor.im>
                      */

var ActivityStore = function (_Store) {
  (0, _inherits3.default)(ActivityStore, _Store);

  function ActivityStore(dispatcher) {
    (0, _classCallCheck3.default)(this, ActivityStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  ActivityStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  ActivityStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.CALL_MODAL_OPEN:
      case _ActorAppConstants.ActionTypes.ACTIVITY_HIDE:
        _isOpen = false;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.ACTIVITY_SHOW:
        _isOpen = true;
        this.__emitChange();
        break;
      default:
    }
  };

  return ActivityStore;
}(_utils.Store);

exports.default = new ActivityStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=ActivityStore.js.map