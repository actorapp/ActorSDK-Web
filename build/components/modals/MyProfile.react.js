'use strict';

exports.__esModule = true;

var _MyProfile = require('./MyProfile.react');

Object.keys(_MyProfile).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MyProfile[key];
    }
  });
});
/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

console.warn('MyProfile component is deprecated and will be remove in near future. Use Profile instead this.');
//# sourceMappingURL=MyProfile.react.js.map