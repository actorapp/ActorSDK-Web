'use strict';

exports.__esModule = true;
exports.getMessageState = getMessageState;
exports.prepareTextMessage = prepareTextMessage;
exports.quoteMessage = quoteMessage;
exports.isLastMessageMine = isLastMessageMine;
exports.getFirstUnreadMessageIndex = getFirstUnreadMessageIndex;
exports.findLastEditableMessage = findLastEditableMessage;

var _EmojiUtils = require('./EmojiUtils');

var _ActorAppConstants = require('../constants/ActorAppConstants');

function isMessageSender(message, uid) {
  return uid === message.sender.peer.id;
}

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

function prepareTextMessage(text) {
  _EmojiUtils.emoji.change_replace_mode('unified');
  return _EmojiUtils.emoji.replace_colons(text);
}

function quoteMessage(text) {
  return text.trim().split('\n').map(function (line) {
    return '> ' + line;
  }).join('\n');
}

function isLastMessageMine(uid, _ref) {
  var messages = _ref.messages;

  var lastMessage = messages[messages.length - 1];
  return lastMessage && isMessageSender(lastMessage, uid);
}

function getFirstUnreadMessageIndex(messages, readDate, uid) {
  if (readDate === 0 || !messages.length) {
    return -1;
  }

  var index = -1;
  for (var i = messages.length - 1; i >= 0; i--) {
    var message = messages[i];
    if (message.sortDate <= readDate || isMessageSender(message, uid)) {
      return index;
    }

    index = i;
  }

  // maybe unreachable
  return index;
}

var MAX_EDIT_TIME = 5 * 60;
function findLastEditableMessage(messages, uid) {
  var now = Date.now() / 1000;
  var minDate = now - MAX_EDIT_TIME;

  console.debug('Check editable message', { minDate: minDate });
  for (var i = messages.length - 1; i >= 0; i--) {
    var message = messages[i];
    if (message.sortDate < minDate) {
      console.debug('Message not editable due sortDate', { message: message });
      return null;
    }

    if (isMessageSender(message, uid)) {
      if (message.content.content === 'text') {
        console.debug('Found editable message', { message: message });
        return message;
      }

      console.debug('Last my message is not text', { message: message });

      return null;
    }
  }

  return null;
}
//# sourceMappingURL=MessageUtils.js.map