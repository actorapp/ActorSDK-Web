'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ComposeActionCreators = require('./ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageArtActionCreators = function () {
  function MessageArtActionCreators() {
    (0, _classCallCheck3.default)(this, MessageArtActionCreators);
  }

  MessageArtActionCreators.prototype.open = function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_ART_SHOW);
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  };

  MessageArtActionCreators.prototype.close = function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_ART_CLOSE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  };

  return MessageArtActionCreators;
}(); /*
      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
      */

exports.default = new MessageArtActionCreators();
//# sourceMappingURL=MessageArtActionCreators.js.map