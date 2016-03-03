"use strict";

exports.__esModule = true;
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