'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                              * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                              */

var OnlineActionCreators = {
  setUserOnline: function setUserOnline(_ref) {
    var args = _objectWithoutProperties(_ref, []);

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.USER_ONLINE_CHANGE, _extends({}, args));
  },
  setGroupOnline: function setGroupOnline(_ref2) {
    var args = _objectWithoutProperties(_ref2, []);

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_ONLINE_CHANGE, _extends({}, args));
  }
};

exports.default = OnlineActionCreators;
//# sourceMappingURL=OnlineActionCreators.js.map