'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  show: function show(group) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_SHOW, {
      group: group
    });
  },

  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_HIDE);
  }
};