"use strict";

exports.__esModule = true;
/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var _delegate = null;

exports.default = {
  set: function set(delegate) {
    return _delegate = delegate;
  },
  get: function get() {
    return _delegate;
  }
};
//# sourceMappingURL=DelegateContainer.js.map