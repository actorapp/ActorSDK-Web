'use strict';

exports.__esModule = true;

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _DialogActionCreators = require('./DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

exports.default = {
  handleFind: function handleFind(users) {
    if (users.lenght === 0) {
      throw new Error('Support user not found');
    }

    var helpUser = users[0];
    var uid = helpUser.id;

    if (!helpUser.isContact) {
      _ActorClient2.default.addContact(uid);
    }

    return uid;
  },
  open: function open() {
    var SharedActor = _SharedContainer2.default.get();
    var phone = SharedActor.helpPhone ? SharedActor.helpPhone : _ActorAppConstants.helpPhone;

    _ActorClient2.default.findUsers(phone).then(this.handleFind).then(_DialogActionCreators2.default.selectDialogPeerUser).catch(function (error) {
      throw new Error(error);
    });
  }
};
//# sourceMappingURL=HelpActionCreators.js.map