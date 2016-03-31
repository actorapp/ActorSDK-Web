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

var CallStore = function (_ReduceStore) {
  (0, _inherits3.default)(CallStore, _ReduceStore);

  function CallStore() {
    (0, _classCallCheck3.default)(this, CallStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  CallStore.prototype.getInitialState = function getInitialState() {
    return {
      isOpen: false,
      isFloating: false,
      id: null,
      peer: null,
      state: null,
      members: null,
      isMuted: false,
      isOutgoing: false
    };
  };

  CallStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.CALL_MODAL_OPEN:
        return (0, _extends3.default)({}, state, {
          isOpen: true,
          id: action.id
        });
      case _ActorAppConstants.ActionTypes.CALL_MODAL_HIDE:
        return this.getInitialState();
      case _ActorAppConstants.ActionTypes.CALL_CHANGED:
        return (0, _extends3.default)({}, state, {
          peer: action.call.peer,
          state: action.call.state,
          members: action.call.members,
          // isMuted: action.call.isMuted,
          isOutgoing: action.call.isOutgoing
        });
      case _ActorAppConstants.ActionTypes.CALL_MUTE_TOGGLE:
        return (0, _extends3.default)({}, state, {
          isMuted: !state.isMuted
        });
      case _ActorAppConstants.ActionTypes.CALL_FLOAT_TOGGLE:
        return (0, _extends3.default)({}, state, {
          isFloating: !state.isFloating
        });
      default:
        return state;
    }
  };

  return CallStore;
}(_utils.ReduceStore); /*
                        * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                        */

exports.default = new CallStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=CallStore.js.map