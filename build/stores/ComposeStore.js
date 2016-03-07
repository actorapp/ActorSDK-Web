'use strict';

exports.__esModule = true;

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
var _isAutoFocusEnabled = true;

var ComposeStore = function (_Store) {
  _inherits(ComposeStore, _Store);

  function ComposeStore(dispatcher) {
    _classCallCheck(this, ComposeStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

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

    _this.onSelectDialogPeer = function () {
      //waitFor([DraftStore.dispatchToken]);
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
      case _ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER:
        this.onSelectDialogPeer();
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