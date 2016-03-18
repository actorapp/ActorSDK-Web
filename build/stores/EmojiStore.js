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

var EmojiStore = function (_Store) {
  (0, _inherits3.default)(EmojiStore, _Store);

  function EmojiStore(dispatcher) {
    (0, _classCallCheck3.default)(this, EmojiStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  EmojiStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  EmojiStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.EMOJI_SHOW:
        _isOpen = true;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.EMOJI_CLOSE:
        _isOpen = false;
        this.__emitChange();
        break;
      default:
    }
  };

  return EmojiStore;
}(_utils.Store);

exports.default = new EmojiStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=EmojiStore.js.map