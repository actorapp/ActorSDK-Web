'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserStore = {
  getUser: function getUser(uid) {
    return _ActorClient2.default.getUser(uid);
  },
  getMyId: function getMyId() {
    return _ActorClient2.default.getUid();
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */

exports.default = UserStore;
//# sourceMappingURL=UserStore.js.map