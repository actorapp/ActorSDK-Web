'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _ContactActionCreators = require('./ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('./DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  open: function open() {
    var SharedActor = _SharedContainer2.default.get();
    var phone = SharedActor.helpPhone ? SharedActor.helpPhone : _ActorAppConstants.helpPhone;

    var handleFind = function handleFind(users) {
      if (users.length > 0) {
        var user = users[0].id;
        var uid = user;
        var userPeer = _ActorClient2.default.getUserPeer(uid);

        if (user.isContact) {
          _DialogActionCreators2.default.selectDialogPeer(userPeer);
        } else {
          _ContactActionCreators2.default.addContact(uid);
          _DialogActionCreators2.default.selectDialogPeer(userPeer);
        }
      } else {
        console.warn('Support user not found.');
      }
    };

    _ActorClient2.default.findUsers(phone).then(handleFind, handleFind).catch(function (error) {
      throw new Error(error);
    });
  }
}; /*
    * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=HelpActionCreators.js.map