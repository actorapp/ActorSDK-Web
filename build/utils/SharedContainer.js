"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var _sharedActor = null;

exports.default = {
  set: function set(shared) {
    return _sharedActor = shared;
  },
  get: function get() {
    return _sharedActor;
  }
};
//# sourceMappingURL=SharedContainer.js.map