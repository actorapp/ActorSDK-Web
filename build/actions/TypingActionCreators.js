'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var DraftActionCreators = {
  setTyping: function setTyping(typing) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.TYPING_CHANGED, { typing: typing.typing });
  }
};

exports.default = DraftActionCreators;
//# sourceMappingURL=TypingActionCreators.js.map