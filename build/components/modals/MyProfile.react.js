'use strict';

exports.__esModule = true;

var _Profile = require('./Profile.react');

Object.keys(_Profile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Profile[key];
    }
  });
});
/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

console.warn('MyProfile component is deprecated and will be remove in near future. Use Profile instead this.');
//# sourceMappingURL=MyProfile.react.js.map