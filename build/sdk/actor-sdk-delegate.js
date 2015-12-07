"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var ActorSDKDelegate = function ActorSDKDelegate() {
  var components = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var actions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var l18n = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  _classCallCheck(this, ActorSDKDelegate);

  this.components = {
    login: components.login || null,
    recent: components.recent || null,
    toolbar: components.toolbar || null,
    activity: components.activity || null
  };

  this.actions = {
    setLoggedIn: actions.setLoggedIn || null,
    setLoggedOut: actions.setLoggedOut || null
  };

  this.l18n = l18n;
};

exports.default = ActorSDKDelegate;
//# sourceMappingURL=actor-sdk-delegate.js.map