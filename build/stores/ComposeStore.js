'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _DraftStore = require('./DraftStore');

var _DraftStore2 = _interopRequireDefault(_DraftStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */

var text = '';
var mentions = null;
var _isAutoFocusEnabled = true;

var ComposeStore = function (_Store) {
  (0, _inherits3.default)(ComposeStore, _Store);

  function ComposeStore(dispatcher) {
    (0, _classCallCheck3.default)(this, ComposeStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));

    _this.onTyping = function (action) {
      text = action.text;
      var query = getQuery(text, action.caretPosition);

      if (action.peer.type === _ActorAppConstants.PeerTypes.GROUP && query !== null) {
        mentions = _ActorClient2.default.findMentions(action.peer.id, query.text);
      } else {
        mentions = null;
      }

      _this.__emitChange();
    };

    _this.onMentionInsert = function (action) {
      var query = getQuery(action.text, action.caretPosition);
      var mentionEnding = query.atStart ? ': ' : ' ';

      text = action.text.substring(0, action.caretPosition - query.text.length - 1) + action.mention.mentionText + mentionEnding + action.text.substring(action.caretPosition, action.text.length);

      mentions = null;

      _this.__emitChange();
    };

    _this.onMentionClose = function () {
      mentions = null;
      _this.__emitChange();
    };

    _this.onComposeClean = function () {
      text = '';
      mentions = null;
      _this.__emitChange();
    };

    _this.onDraftLoad = function () {
      text = _DraftStore2.default.getDraft();
      _this.__emitChange();
    };

    _this.onEmojiInsert = function (action) {
      var emojiText = action.emoji + ' ';

      text = action.text.substring(0, action.caretPosition) + emojiText + action.text.substring(action.caretPosition, action.text.length);

      _this.__emitChange();
    };

    _this.onComposePaste = function (newText) {
      text = newText;
      _this.__emitChange();
    };

    return _this;
  }

  ComposeStore.prototype.getMentions = function getMentions() {
    return mentions;
  };

  ComposeStore.prototype.getText = function getText() {
    return text;
  };

  ComposeStore.prototype.isAutoFocusEnabled = function isAutoFocusEnabled() {
    return _isAutoFocusEnabled;
  };

  ComposeStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.COMPOSE_TYPING:
        this.onTyping(action);
        break;
      case _ActorAppConstants.ActionTypes.COMPOSE_MENTION_INSERT:
        this.onMentionInsert(action);
        break;
      case _ActorAppConstants.ActionTypes.COMPOSE_MENTION_CLOSE:
        this.onMentionClose();
        break;
      case _ActorAppConstants.ActionTypes.COMPOSE_CLEAN:
        this.onComposeClean();
        break;
      case _ActorAppConstants.ActionTypes.DRAFT_LOAD:
        this.onDraftLoad();
        break;
      case _ActorAppConstants.ActionTypes.EMOJI_INSERT:
        this.onEmojiInsert(action);
        break;
      case _ActorAppConstants.ActionTypes.COMPOSE_PASTE:
        this.onComposePaste(action.text);
        break;

      case _ActorAppConstants.ActionTypes.COMPOSE_TOGGLE_AUTO_FOCUS:
        _isAutoFocusEnabled = action.isEnable;
        this.__emitChange();
        break;

      default:
    }
  };

  return ComposeStore;
}(_utils.Store);

exports.default = new ComposeStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=ComposeStore.js.map