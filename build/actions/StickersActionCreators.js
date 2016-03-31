'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StickersActionCreators = function () {
  function StickersActionCreators() {
    (0, _classCallCheck3.default)(this, StickersActionCreators);
  }

  StickersActionCreators.prototype.setStickers = function setStickers(stickers) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.STICKERS_SET, { stickers: stickers });
  };

  StickersActionCreators.prototype.sendSticker = function sendSticker(peer, sticker) {
    _ActorClient2.default.sendSticker(peer, sticker);
  };

  return StickersActionCreators;
}(); /*
      * Copyright (C) 2015 Actor LLC. <https://actor.im>
      */

exports.default = new StickersActionCreators();
//# sourceMappingURL=StickersActionCreators.js.map