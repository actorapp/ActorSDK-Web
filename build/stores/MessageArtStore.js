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

var MessageArtStore = function (_ReduceStore) {
  (0, _inherits3.default)(MessageArtStore, _ReduceStore);

  function MessageArtStore() {
    (0, _classCallCheck3.default)(this, MessageArtStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  MessageArtStore.prototype.getInitialState = function getInitialState() {
    return {
      isOpen: false,
      stickers: []
    };
  };

  MessageArtStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.MESSAGE_ART_SHOW:
        return (0, _extends3.default)({}, state, {
          isOpen: true
        });
      case _ActorAppConstants.ActionTypes.MESSAGE_ART_CLOSE:
        return (0, _extends3.default)({}, state, {
          isOpen: false
        });
      case _ActorAppConstants.ActionTypes.STICKERS_SET:
        return (0, _extends3.default)({}, state, {
          stickers: action.stickers
        });
      default:
        return state;
    }
  };

  return MessageArtStore;
}(_utils.ReduceStore); /*
                        * Copyright (C) 2015 Actor LLC. <https://actor.im>
                        */

exports.default = new MessageArtStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=MessageArtStore.js.map