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
  show: function show(source) {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CROP_AVATAR_MODAL_SHOW, { source: source });
  },
  hide: function hide() {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CROP_AVATAR_MODAL_HIDE);
  }
};