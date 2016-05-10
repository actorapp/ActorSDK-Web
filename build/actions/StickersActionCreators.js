'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                           */

var StickersActionCreators = function () {
  function StickersActionCreators() {
    _classCallCheck(this, StickersActionCreators);
  }

  StickersActionCreators.prototype.setStickers = function setStickers(stickers) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.STICKERS_SET, { stickers: stickers });
  };

  StickersActionCreators.prototype.sendSticker = function sendSticker(peer, sticker) {
    _ActorClient2.default.sendSticker(peer, sticker);
  };

  return StickersActionCreators;
}();

exports.default = new StickersActionCreators();
//# sourceMappingURL=StickersActionCreators.js.map