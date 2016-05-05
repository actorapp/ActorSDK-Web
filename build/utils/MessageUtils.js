'use strict';

exports.__esModule = true;
exports.getMessageState = getMessageState;
exports.quoteMessage = quoteMessage;
exports.isLastMessageMine = isLastMessageMine;
exports.getFirstUnreadMessageIndex = getFirstUnreadMessageIndex;

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

function isLastMessageMine(uid, _ref) {
  var messages = _ref.messages;

  var lastMessage = messages[messages.length - 1];
  return lastMessage && uid === lastMessage.sender.peer.id;
}

function getFirstUnreadMessageIndex(messages, readDate, uid) {
  if (readDate === 0 || !messages.length) {
    return -1;
  }

  var index = -1;
  for (var i = messages.length - 1; i--; i >= 0) {
    var message = messages[i];
    if (message.sortDate <= readDate || message.sender.peer.id === uid) {
      return index;
    }

    index = i;
  }

  // maybe unreachable
  return index;
}
//# sourceMappingURL=MessageUtils.js.map