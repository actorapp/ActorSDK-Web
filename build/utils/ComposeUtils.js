'use strict';

exports.__esModule = true;
exports.parseBotCommand = parseBotCommand;
exports.parseMentionQuery = parseMentionQuery;
/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

function parseBotCommand(text) {
  var matches = /^\/(.)?(?: (.+))?/.exec(text);
  if (!matches) {
    return null;
  }

  return {
    name: matches[1],
    args: matches[2]
  };
}

function _parseMentionQuery(runText, query, position) {
  if (runText.length === 0) {
    return null;
  } else {
    var lastChar = runText.charAt(runText.length - 1);
    if (lastChar === '@') {
      var charBeforeAt = runText.charAt(runText.length - 2);
      if (charBeforeAt.trim() === '') {
        var text = query || '';
        var atStart = text.length + 1 === position;

        return {
          text: text,
          atStart: atStart
        };
      } else {
        return null;
      }
    } else if (lastChar.trim() === '') {
      return null;
    } else {
      return _parseMentionQuery(runText.substring(0, runText.length - 1), lastChar + (query || ''), position);
    }
  }
}

function parseMentionQuery(text, position) {
  return _parseMentionQuery(text.substring(0, position), null, position);
}
//# sourceMappingURL=ComposeUtils.js.map