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

var EmojiStore = function (_ReduceStore) {
  (0, _inherits3.default)(EmojiStore, _ReduceStore);

  function EmojiStore() {
    (0, _classCallCheck3.default)(this, EmojiStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  EmojiStore.prototype.getInitialState = function getInitialState() {
    return {
      isOpen: true,
      stickers: []
    };
  };

  EmojiStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.EMOJI_SHOW:
        return (0, _extends3.default)({}, state, {
          isOpen: true
        });
      case _ActorAppConstants.ActionTypes.EMOJI_CLOSE:
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

  return EmojiStore;
}(_utils.ReduceStore); /*
                        * Copyright (C) 2015 Actor LLC. <https://actor.im>
                        */

exports.default = new EmojiStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=EmojiStore.js.map