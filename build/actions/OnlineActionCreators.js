'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var OnlineActionCreators = {
  setUserOnline: function setUserOnline(_ref) {
    var args = (0, _objectWithoutProperties3.default)(_ref, []);

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.USER_ONLINE_CHANGE, (0, _extends3.default)({}, args));
  },
  setGroupOnline: function setGroupOnline(_ref2) {
    var args = (0, _objectWithoutProperties3.default)(_ref2, []);

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_ONLINE_CHANGE, (0, _extends3.default)({}, args));
  }
};

exports.default = OnlineActionCreators;
//# sourceMappingURL=OnlineActionCreators.js.map