'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var FaviconActionCreators = {
  setFavicon: function setFavicon(counter) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.FAVICON_SET, { counter: counter ? counter.counter : 0 });
  }
};

exports.default = FaviconActionCreators;