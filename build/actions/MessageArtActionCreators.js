'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ComposeActionCreators = require('./ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                           */

var MessageArtActionCreators = function () {
  function MessageArtActionCreators() {
    _classCallCheck(this, MessageArtActionCreators);
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
}();

exports.default = new MessageArtActionCreators();
//# sourceMappingURL=MessageArtActionCreators.js.map