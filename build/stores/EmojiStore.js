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

var _isOpen = false;

var EmojiStore = function (_Store) {
  _inherits(EmojiStore, _Store);

  function EmojiStore(dispatcher) {
    _classCallCheck(this, EmojiStore);

    return _possibleConstructorReturn(this, _Store.call(this, dispatcher));
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