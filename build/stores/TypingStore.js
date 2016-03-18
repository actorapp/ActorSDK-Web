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

var _typing = null;

/**
 * Class representing a store for typing info.
 */
/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var TypingStore = function (_Store) {
  (0, _inherits3.default)(TypingStore, _Store);

  function TypingStore() {
    (0, _classCallCheck3.default)(this, TypingStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.apply(this, arguments));
  }

  /**
   * @returns {String}
   */

  TypingStore.prototype.getTyping = function getTyping() {
    return _typing;
  };

  TypingStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.TYPING_CHANGED:
        _typing = action.typing;
        this.__emitChange();
        break;
      default:
    }
  };

  return TypingStore;
}(_utils.Store);

exports.default = new TypingStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=TypingStore.js.map