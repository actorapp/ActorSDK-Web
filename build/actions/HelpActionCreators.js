'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ContactActionCreators = require('./ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('./DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  open: function open() {
    _ActorClient2.default.findUsers(_ActorAppConstants.Support.phone).then(function (users) {
      if (users.length > 0) {
        var user = users[0];
        var uid = user.id;
        var userPeer = _ActorClient2.default.getUserPeer(uid);

        if (user.isContact) {
          _DialogActionCreators2.default.selectDialogPeer(userPeer);
        } else {
          _ContactActionCreators2.default.addContact(uid);
          _DialogActionCreators2.default.selectDialogPeer(userPeer);
        }
      }
    }).catch(function (error) {
      throw new Error(error);
    });
  }
};
//# sourceMappingURL=HelpActionCreators.js.map