'use strict';

exports.__esModule = true;
exports.getMessageState = getMessageState;
exports.quoteMessage = quoteMessage;

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

function quoteMessage(text) {
  return text.trim().split('\n').map(function (line) {
    return '> ' + line;
  }).join('\n');
}
//# sourceMappingURL=MessageUtils.js.map