'use strict';

exports.__esModule = true;

var _ProfileStore = require('./ProfileStore');

Object.keys(_ProfileStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ProfileStore[key];
    }
  });
});
/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

console.warn('MyProfileStore is deprecated and will be remove in near future. Use ProfileStore instead this.');
//# sourceMappingURL=MyProfileStore.js.map