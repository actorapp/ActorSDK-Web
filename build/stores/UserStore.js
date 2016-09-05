'use strict';

exports.__esModule = true;

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserStore = {
  /**
   * Get user information
   *
   * @param uid {number} User id
   * @returns {object} User information
   */
  getUser: function getUser(uid) {
    return _ActorClient2.default.getUser(uid);
  },


  /**
   * Get current user id
   *
   * @returns {number} User id
   */
  getMyId: function getMyId() {
    return _ActorClient2.default.getUid();
  },


  /**
   * Returns true if user is in contact
   *
   * @param uid {number} User id
   * @returns {boolean}
   */
  isContact: function isContact(uid) {
    return this.getUser(uid).isContact;
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */

exports.default = UserStore;
//# sourceMappingURL=UserStore.js.map