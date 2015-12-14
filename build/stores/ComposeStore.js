'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _DraftStore = require('./DraftStore');

var _DraftStore2 = _interopRequireDefault(_DraftStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CHANGE_EVENT = 'change';

var getQuery = function getQuery(text, position) {
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
};

var text = '';
var mentions = null;

var ComposeStore = (function (_EventEmitter) {
  _inherits(ComposeStore, _EventEmitter);

  function ComposeStore() {
    _classCallCheck(this, ComposeStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ComposeStore).apply(this, arguments));
  }

  _createClass(ComposeStore, [{
    key: 'getMentions',
    value: function getMentions() {
      return mentions;
    }
  }, {
    key: 'getText',
    value: function getText() {
      return text;
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      this.emit(CHANGE_EVENT);
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }]);

  return ComposeStore;
})(_events.EventEmitter);

var ComposeStoreInstance = new ComposeStore();

var onTyping = function onTyping(action) {
  text = action.text;
  var query = getQuery(text, action.caretPosition);

  if (action.peer.type === _ActorAppConstants.PeerTypes.GROUP && query !== null) {
    mentions = _ActorClient2.default.findMentions(action.peer.id, query.text);
  } else {
    mentions = null;
  }

  ComposeStoreInstance.emitChange();
};

var onMentionInsert = function onMentionInsert(action) {
  var query = getQuery(action.text, action.caretPosition);
  var mentionEnding = query.atStart ? ': ' : ' ';

  text = action.text.substring(0, action.caretPosition - query.text.length - 1) + action.mention.mentionText + mentionEnding + action.text.substring(action.caretPosition, action.text.length);

  mentions = null;

  ComposeStoreInstance.emitChange();
};

var onMentionClose = function onMentionClose() {
  mentions = null;
  ComposeStoreInstance.emitChange();
};

var onComposeClean = function onComposeClean() {
  text = '';
  mentions = null;
  ComposeStoreInstance.emitChange();
};

var onSelectDialogPeer = function onSelectDialogPeer() {
  (0, _ActorAppDispatcher.waitFor)([_DraftStore2.default.dispatchToken]);
  text = _DraftStore2.default.getDraft();
  ComposeStoreInstance.emitChange();
};

var onEmojiInsert = function onEmojiInsert(action) {
  var emojiText = action.emoji + ' ';

  text = action.text.substring(0, action.caretPosition) + emojiText + action.text.substring(action.caretPosition, action.text.length);

  ComposeStoreInstance.emitChange();
};

ComposeStoreInstance.dispatchToken = (0, _ActorAppDispatcher.register)(function (action) {
  switch (action.type) {
    case _ActorAppConstants.ActionTypes.COMPOSE_TYPING:
      onTyping(action);
      break;
    case _ActorAppConstants.ActionTypes.COMPOSE_MENTION_INSERT:
      onMentionInsert(action);
      break;
    case _ActorAppConstants.ActionTypes.COMPOSE_MENTION_CLOSE:
      onMentionClose();
      break;
    case _ActorAppConstants.ActionTypes.COMPOSE_CLEAN:
      onComposeClean();
      break;
    case _ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER:
      onSelectDialogPeer();
      break;
    case _ActorAppConstants.ActionTypes.EMOJI_INSERT:
      onEmojiInsert(action);
      break;
    default:
  }
});

exports.default = ComposeStoreInstance;
//# sourceMappingURL=ComposeStore.js.map