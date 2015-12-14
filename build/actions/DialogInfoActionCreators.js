'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var DialogInfoActionCreators = {
  setDialogInfo: function setDialogInfo(info) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DIALOG_INFO_CHANGED, { info: info });
  }
};

exports.default = DialogInfoActionCreators;
//# sourceMappingURL=DialogInfoActionCreators.js.map