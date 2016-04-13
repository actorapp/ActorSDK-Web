'use strict';

exports.__esModule = true;
exports.getMessageState = getMessageState;

var _ActorAppConstants = require('../constants/ActorAppConstants');

function getMessageState(message, uid, receiveDate, readDate) {
  if (message.sender.peer.id !== uid) {
    return _ActorAppConstants.MessageStates.UNKNOWN;
  }

  if (message.isOut && message.state === _ActorAppConstants.MessageStates.SENT) {
    if (message.sortDate <= readDate) {
      return _ActorAppConstants.MessageStates.READ;
    }

    if (message.sortDate <= receiveDate) {
      return _ActorAppConstants.MessageStates.RECEIVED;
    }
  }

  return message.state;
}
//# sourceMappingURL=MessageUtils.js.map