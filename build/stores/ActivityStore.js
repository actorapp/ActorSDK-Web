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

var ActivityStore = function (_ReduceStore) {
  (0, _inherits3.default)(ActivityStore, _ReduceStore);

  function ActivityStore() {
    (0, _classCallCheck3.default)(this, ActivityStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  ActivityStore.prototype.getInitialState = function getInitialState() {
    return {
      isOpen: false
    };
  };

  ActivityStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.CALL_MODAL_OPEN:
      case _ActorAppConstants.ActionTypes.ACTIVITY_HIDE:
        return this.getInitialState();
      case _ActorAppConstants.ActionTypes.ACTIVITY_SHOW:
        return {
          isOpen: true
        };
      default:
        return state;
    }
  };

  ActivityStore.prototype.isOpen = function isOpen() {
    return this.getState().isOpen;
  };

  return ActivityStore;
}(_utils.ReduceStore); /*
                        * Copyright (C) 2015 Actor LLC. <https://actor.im>
                        */

exports.default = new ActivityStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=ActivityStore.js.map