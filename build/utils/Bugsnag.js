'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initBugsnag = initBugsnag;

var _bugsnagJs = require('bugsnag-js');

var _bugsnagJs2 = _interopRequireDefault(_bugsnagJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initBugsnag(apikey) {
  _bugsnagJs2.default.apiKey = apikey;
  _bugsnagJs2.default.releaseStage = process.env.NODE_ENV;
} /*
   * Copyright (C) 2015 Actor LLC. <https://actor.im>
   */

exports.default = _bugsnagJs2.default;