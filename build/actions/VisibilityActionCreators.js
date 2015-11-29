'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createAppVisible: function createAppVisible() {
    _ActorClient2.default.onAppVisible();
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_VISIBLE);
  },

  createAppHidden: function createAppHidden() {
    _ActorClient2.default.onAppHidden();
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_HIDDEN);
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */