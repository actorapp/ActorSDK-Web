'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _DraftStore = require('./DraftStore');

var _DraftStore2 = _interopRequireDefault(_DraftStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function parseCommand(text) {
  var matches = /^\/(.)?(?: (.+))?/.exec(text);
  if (!matches) {
    return null;
  }

  return {
    name: matches[1],
    args: matches[2]
  };
}

function parseMentionQuery(text, position) {
  var run = function run(runText, query) {
    if (runText.length === 0) {
      return null;
    } else {
      var lastChar = runText.charAt(runText.length - 1);
      if (lastChar === '@') {
        var charBeforeAt = runText.charAt(runText.length - 2);
        if (charBeforeAt.trim() === '') {
          var _text = query || '';
          var atStart = _text.length + 1 === position;

          return {
            text: _text,
            atStart: atStart
          };
        } else {
          return null;
        }
      } else if (lastChar.trim() === '') {
        return null;
      } else {
        return run(runText.substring(0, runText.length - 1), lastChar + (query || ''));
      }
    }
  };

  var runText = text.substring(0, position);
  return run(runText, null);
}

var ComposeStore = function (_ReduceStore) {
  _inherits(ComposeStore, _ReduceStore);

  function ComposeStore() {
    _classCallCheck(this, ComposeStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  ComposeStore.prototype.getInitialState = function getInitialState() {
    return {
      text: '',
      mentions: null,
      commands: null,
      autoFocus: true
    };
  };

  ComposeStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.COMPOSE_TYPING:
        var nextState = _extends({}, state, {
          text: action.text,
          commands: null,
          mentions: null
        });

        if (action.peer.type === _ActorAppConstants.PeerTypes.GROUP) {
          var _query = parseMentionQuery(action.text, action.caretPosition);
          if (_query) {
            nextState.mentions = _ActorClient2.default.findMentions(action.peer.id, _query.text);
          }
        } else {
          var command = parseCommand(action.text);
          if (command) {
            nextState.commands = _ActorClient2.default.findBotCommands(action.peer.id, command.name || '');
          }
        }

        return nextState;

      case _ActorAppConstants.ActionTypes.COMPOSE_MENTION_INSERT:
        var query = parseMentionQuery(action.text, action.caretPosition);
        if (!query) {
          console.error('Mention not found', { state: state, action: action });
          return state;
        }

        var mentionEnding = query.atStart ? ': ' : ' ';
        var textBeforeMention = action.text.substring(0, action.caretPosition - query.text.length - 1);
        var textAfterMention = action.text.substring(action.caretPosition, action.text.length);

        return _extends({}, state, {
          text: textBeforeMention + action.mention.mentionText + mentionEnding + textAfterMention,
          mentions: null
        });

      case _ActorAppConstants.ActionTypes.COMPOSE_MENTION_CLOSE:
        return _extends({}, state, {
          mentions: null
        });

      case _ActorAppConstants.ActionTypes.COMPOSE_CLEAN:
        return _extends({}, state, {
          text: '',
          commands: null,
          mentions: null
        });

      case _ActorAppConstants.ActionTypes.DRAFT_LOAD:
        return _extends({}, state, {
          text: _DraftStore2.default.getDraft()
        });

      case _ActorAppConstants.ActionTypes.EMOJI_INSERT:
        var textBeforeEmoji = action.text.substring(0, action.caretPosition);
        var textAfterEmoji = action.text.substring(action.caretPosition, action.text.length);

        return _extends({}, state, {
          text: textBeforeEmoji + action.emoji + ' ' + textAfterEmoji
        });

      case _ActorAppConstants.ActionTypes.COMPOSE_PASTE:
        return _extends({}, state, {
          text: action.text
        });

      case _ActorAppConstants.ActionTypes.COMPOSE_TOGGLE_AUTO_FOCUS:
        return _extends({}, state, {
          autoFocus: action.isEnable
        });

      case _ActorAppConstants.ActionTypes.SEARCH_TOGGLE_FOCUS:
        return _extends({}, state, {
          autoFocus: !action.isEnable
        });

      default:
        return state;
    }
  };

  return ComposeStore;
}(_utils.ReduceStore);

exports.default = new ComposeStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=ComposeStore.js.map