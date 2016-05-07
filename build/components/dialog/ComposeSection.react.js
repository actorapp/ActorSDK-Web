'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _MessageActionCreators = require('../../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _ComposeActionCreators = require('../../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _AttachmentsActionCreators = require('../../actions/AttachmentsActionCreators');

var _AttachmentsActionCreators2 = _interopRequireDefault(_AttachmentsActionCreators);

var _EmojiActionCreators = require('../../actions/EmojiActionCreators');

var _EmojiActionCreators2 = _interopRequireDefault(_EmojiActionCreators);

var _StickersActionCreators = require('../../actions/StickersActionCreators');

var _StickersActionCreators2 = _interopRequireDefault(_StickersActionCreators);

var _GroupStore = require('../../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _PreferencesStore = require('../../stores/PreferencesStore');

var _PreferencesStore2 = _interopRequireDefault(_PreferencesStore);

var _ComposeStore = require('../../stores/ComposeStore');

var _ComposeStore2 = _interopRequireDefault(_ComposeStore);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _MessageArtStore = require('../../stores/MessageArtStore');

var _MessageArtStore2 = _interopRequireDefault(_MessageArtStore);

var _ComposeTextArea = require('./compose/ComposeTextArea.react');

var _ComposeTextArea2 = _interopRequireDefault(_ComposeTextArea);

var _ComposeMarkdownHint = require('./compose/ComposeMarkdownHint.react');

var _ComposeMarkdownHint2 = _interopRequireDefault(_ComposeMarkdownHint);

var _BotCommandsHint = require('./compose/BotCommandsHint.react');

var _BotCommandsHint2 = _interopRequireDefault(_BotCommandsHint);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _MentionDropdown = require('../common/MentionDropdown.react');

var _MentionDropdown2 = _interopRequireDefault(_MentionDropdown);

var _MessageArt = require('../messageArt/MessageArt.react');

var _MessageArt2 = _interopRequireDefault(_MessageArt);

var _VoiceRecorder = require('../common/VoiceRecorder.react');

var _VoiceRecorder2 = _interopRequireDefault(_VoiceRecorder);

var _DropZone = require('../common/DropZone.react');

var _DropZone2 = _interopRequireDefault(_DropZone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ComposeSection = function (_Component) {
  _inherits(ComposeSection, _Component);

  ComposeSection.getStores = function getStores() {
    return [_DialogStore2.default, _GroupStore2.default, _PreferencesStore2.default, _ComposeStore2.default, _MessageArtStore2.default];
  };

  ComposeSection.calculateState = function calculateState() {
    return {
      peer: _DialogStore2.default.getCurrentPeer(),
      compose: _ComposeStore2.default.getState(),
      profile: _ActorClient2.default.getUser(_ActorClient2.default.getUid()),
      sendByEnter: _PreferencesStore2.default.isSendByEnterEnabled(),
      isMessageArtOpen: _MessageArtStore2.default.getState().isOpen,
      stickers: _MessageArtStore2.default.getState().stickers
    };
  };

  function ComposeSection(props) {
    _classCallCheck(this, ComposeSection);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.resetAttachmentForm = function () {
      var form = (0, _reactDom.findDOMNode)(_this.refs.attachmentForm);
      form.reset();
    };

    _this.onMentionSelect = function (mention) {
      var _this$state = _this.state;
      var peer = _this$state.peer;
      var text = _this$state.compose.text;


      _ComposeActionCreators2.default.insertMention(peer, text, _this.getCaretPosition(), mention);
      _this.setFocus();
    };

    _this.onMentionClose = function () {
      _ComposeActionCreators2.default.closeMention();
    };

    _this.handleEmojiSelect = function (emoji) {
      var text = _this.state.compose.text;

      _EmojiActionCreators2.default.insertEmoji(text, _this.getCaretPosition(), emoji);
      _this.setFocus();
    };

    _this.handleStickerSelect = function (sticker) {
      var peer = _this.state.peer;

      _StickersActionCreators2.default.sendSticker(peer, sticker);
      _this.setFocus();
    };

    _this.setFocus = function () {
      (0, _reactDom.findDOMNode)(_this.refs.area).focus();
    };

    _this.handleDrop = function (files) {
      var attachments = [];

      (0, _lodash.forEach)(files, function (file) {
        return attachments.push(file);
      });

      if (attachments.length > 0) {
        _AttachmentsActionCreators2.default.show(attachments);
      }
    };

    _this.handleAttachmentClick = function () {
      var attachmentInputNode = (0, _reactDom.findDOMNode)(_this.refs.attachment);
      attachmentInputNode.setAttribute('multiple', true);
      attachmentInputNode.click();
    };

    _this.handleComposeAttachmentChange = function () {
      var attachmentInputNode = (0, _reactDom.findDOMNode)(_this.refs.attachment);
      var attachments = [];

      (0, _lodash.forEach)(attachmentInputNode.files, function (file) {
        return attachments.push(file);
      });

      _AttachmentsActionCreators2.default.show(attachments);
      _this.resetAttachmentForm();
    };

    _this.sendVoiceRecord = function (duration, record) {
      var peer = _this.state.peer;

      _MessageActionCreators2.default.sendVoiceMessage(peer, duration, record);
    };

    _this.onTyping = _this.onTyping.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onPaste = _this.onPaste.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onCommandSelect = _this.onCommandSelect.bind(_this);
    _this.onCommandClose = _this.onCommandClose.bind(_this);
    return _this;
  }

  ComposeSection.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevState.peer !== this.state.peer) {
      if (this.refs.area) {
        this.refs.area.autoFocus();
      }
    }
  };

  ComposeSection.prototype.onTyping = function onTyping(text, caretPosition) {
    _ComposeActionCreators2.default.onTyping(this.state.peer, text, caretPosition);
  };

  ComposeSection.prototype.onSubmit = function onSubmit() {
    var _state = this.state;
    var peer = _state.peer;
    var text = _state.compose.text;


    if (text.trim().length) {
      _MessageActionCreators2.default.sendTextMessage(peer, text);
    }

    _ComposeActionCreators2.default.cleanText();
  };

  ComposeSection.prototype.onPaste = function onPaste(event) {
    var attachments = Array.from(event.clipboardData.items).filter(function (item) {
      return item.type.indexOf('image') !== -1;
    }).map(function (item) {
      return item.getAsFile();
    });

    if (attachments.length) {
      event.preventDefault();
      _AttachmentsActionCreators2.default.show(attachments);
    }
  };

  ComposeSection.prototype.onKeyDown = function onKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.ARROW_UP && !event.target.value) {
      _MessageActionCreators2.default.editLastMessage();
    }
  };

  // TODO: move this to textarea component


  // TODO: move this to textarea component


  ComposeSection.prototype.onCommandSelect = function onCommandSelect(command) {
    var peer = this.state.peer;

    _MessageActionCreators2.default.sendTextMessage(peer, '/' + command);
    _ComposeActionCreators2.default.cleanText();
  };

  ComposeSection.prototype.onCommandClose = function onCommandClose() {
    _ComposeActionCreators2.default.cleanText();
  };

  // TODO: remove this method

  ComposeSection.prototype.getCaretPosition = function getCaretPosition() {
    if (this.refs.area) {
      return this.refs.area.getCaretPosition();
    }

    return 0;
  };

  ComposeSection.prototype.renderCommands = function renderCommands() {
    var compose = this.state.compose;

    if (!compose.commands) {
      return null;
    }

    return _react2.default.createElement(_BotCommandsHint2.default, {
      commands: compose.commands,
      onSelect: this.onCommandSelect,
      onClose: this.onCommandClose
    });
  };

  ComposeSection.prototype.renderMentions = function renderMentions() {
    var compose = this.state.compose;

    if (!compose.mentions) {
      return null;
    }

    return _react2.default.createElement(_MentionDropdown2.default, {
      mentions: compose.mentions,
      onSelect: this.onMentionSelect,
      onClose: this.onMentionClose
    });
  };

  ComposeSection.prototype.render = function render() {
    var _state2 = this.state;
    var compose = _state2.compose;
    var profile = _state2.profile;
    var stickers = _state2.stickers;
    var isMessageArtOpen = _state2.isMessageArtOpen;
    var sendByEnter = _state2.sendByEnter;
    var intl = this.context.intl;


    return _react2.default.createElement(
      'section',
      { className: 'compose' },
      this.renderMentions(),
      this.renderCommands(),
      _react2.default.createElement(_MessageArt2.default, {
        onSelect: this.handleEmojiSelect,
        onStickerSelect: this.handleStickerSelect,
        isActive: isMessageArtOpen,
        stickers: stickers
      }),
      _react2.default.createElement(_VoiceRecorder2.default, { onFinish: this.sendVoiceRecord }),
      _react2.default.createElement(_AvatarItem2.default, {
        className: 'my-avatar',
        image: profile.avatar,
        placeholder: profile.placeholder,
        title: profile.name
      }),
      _react2.default.createElement(_ComposeMarkdownHint2.default, { isActive: compose.text.length >= 3 }),
      _react2.default.createElement(_ComposeTextArea2.default, {
        ref: 'area',
        value: compose.text,
        autoFocus: compose.autoFocus,
        sendByEnter: sendByEnter,
        sendEnabled: !compose.mentions && !compose.commands,
        onTyping: this.onTyping,
        onSubmit: this.onSubmit,
        onPaste: this.onPaste,
        onKeyDown: this.onKeyDown
      }),
      _react2.default.createElement(
        _DropZone2.default,
        { onDropComplete: this.handleDrop },
        intl.messages['compose.dropzone']
      ),
      _react2.default.createElement(
        'footer',
        { className: 'compose__footer row' },
        _react2.default.createElement(
          'button',
          { className: 'button attachment', onClick: this.handleAttachmentClick },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'attachment'
          ),
          ' ',
          intl.messages['compose.attach']
        ),
        _react2.default.createElement('span', { className: 'col-xs' }),
        _react2.default.createElement(
          'button',
          { className: 'button button--lightblue', onClick: this.sendTextMessage },
          intl.messages['compose.send']
        )
      ),
      _react2.default.createElement(
        'form',
        { className: 'compose__hidden', ref: 'attachmentForm' },
        _react2.default.createElement('input', { ref: 'attachment', onChange: this.handleComposeAttachmentChange, type: 'file' })
      )
    );
  };

  return ComposeSection;
}(_react.Component);

ComposeSection.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(ComposeSection, { pure: false });
//# sourceMappingURL=ComposeSection.react.js.map