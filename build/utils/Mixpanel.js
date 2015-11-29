'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMixpanel = initMixpanel;

var _mixpanel = require('mixpanel-browser/build/mixpanel.umd');

var _mixpanel2 = _interopRequireDefault(_mixpanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initMixpanel(apiKey) {
  _mixpanel2.default.init(apiKey);
} /*
   * Copyright (C) 2015 Actor LLC. <https://actor.im>
   */

exports.default = _mixpanel2.default;