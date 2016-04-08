'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _Inputs = require('../../utils/Inputs');

var _Inputs2 = _interopRequireDefault(_Inputs);

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

var _AttachmentStore = require('../../stores/AttachmentStore');

var _AttachmentStore2 = _interopRequireDefault(_AttachmentStore);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _MessageArtStore = require('../../stores/MessageArtStore');

var _MessageArtStore2 = _interopRequireDefault(_MessageArtStore);

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

var _SendAttachment = require('../modals/SendAttachment');

var _SendAttachment2 = _interopRequireDefault(_SendAttachment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComposeSection = function (_Component) {
  (0, _inherits3.default)(ComposeSection, _Component);

  ComposeSection.getStores = function getStores() {
    return [_DialogStore2.default, _GroupStore2.default, _PreferencesStore2.default, _AttachmentStore2.default, _ComposeStore2.default, _MessageArtStore2.default];
  };

  ComposeSection.calculateState = function calculateState(prevState) {
    return {
      peer: _DialogStore2.default.getCurrentPeer(),
      text: _ComposeStore2.default.getText(),
      profile: _ActorClient2.default.getUser(_ActorClient2.default.getUid()),
      sendByEnter: _PreferencesStore2.default.isSendByEnterEnabled(),
      mentions: _ComposeStore2.default.getMentions(),
      isSendAttachmentOpen: _AttachmentStore2.default.isOpen(),
      isMarkdownHintShow: prevState ? prevState.isMarkdownHintShow || false : false,
      isAutoFocusEnabled: _ComposeStore2.default.isAutoFocusEnabled(),
      isMessageArtOpen: _MessageArtStore2.default.getState().isOpen,
      stickers: _MessageArtStore2.default.getState().stickers
    };
  };

  function ComposeSection(props) {
    (0, _classCallCheck3.default)(this, ComposeSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.handleKeyDown = function (event) {
      var isAutoFocusEnabled = _this.state.isAutoFocusEnabled;

      if (isAutoFocusEnabled) {
        if (!event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey) {
          _this.setFocus();
        }
      }
    };

    _this.onMessageChange = function (event) {
      var text = event.target.value;
      var peer = _this.state.peer;


      if (text.length >= 3) {
        _this.setState({ isMarkdownHintShow: true });
      } else {
        _this.setState({ isMarkdownHintShow: false });
      }

      _ComposeActionCreators2.default.onTyping(peer, text, _this.getCaretPosition());
    };

    _this.onKeyDown = function (event) {
      var _this$state = _this.state;
      var mentions = _this$state.mentions;
      var sendByEnter = _this$state.sendByEnter;


      var send = function send() {
        event.preventDefault();
        _this.sendTextMessage();
        _this.setState({ isMarkdownHintShow: false });
      };

      if (mentions === null) {
        if (sendByEnter === true) {
          if (event.keyCode === _ActorAppConstants.KeyCodes.ENTER && !event.shiftKey) {
            send();
          }
        } else {
          if (event.keyCode === _ActorAppConstants.KeyCodes.ENTER && event.metaKey) {
            send();
          }
        }
      }
    };

    _this.sendTextMessage = function () {
      var _this$state2 = _this.state;
      var peer = _this$state2.peer;
      var text = _this$state2.text;


      if (text.trim().length !== 0) {
        _MessageActionCreators2.default.sendTextMessage(peer, text);
      }
      _ComposeActionCreators2.default.cleanText();
    };

    _this.resetAttachmentForm = function () {
      var form = (0, _reactDom.findDOMNode)(_this.refs.attachmentForm);
      form.reset();
    };

    _this.onPaste = function (event) {
      var preventDefault = false;
      var attachments = [];

      (0, _lodash.forEach)(event.clipboardData.items, function (item) {
        if (item.type.indexOf('image') !== -1) {
          preventDefault = true;
          attachments.push(item.getAsFile());
        }
      }, _this);

      if (attachments.length > 0) {
        _AttachmentsActionCreators2.default.show(attachments);
      }

      if (preventDefault) {
        event.preventDefault();
      }
    };

    _this.onMentionSelect = function (mention) {
      var _this$state3 = _this.state;
      var peer = _this$state3.peer;
      var text = _this$state3.text;


      _ComposeActionCreators2.default.insertMention(peer, text, _this.getCaretPosition(), mention);
      _this.setFocus();
    };

    _this.onMentionClose = function () {
      _ComposeActionCreators2.default.closeMention();
    };

    _this.getCaretPosition = function () {
      var composeArea = (0, _reactDom.findDOMNode)(_this.refs.area);
      var selection = _Inputs2.default.getInputSelection(composeArea);
      return selection.start;
    };

    _this.handleEmojiSelect = function (emoji) {
      _EmojiActionCreators2.default.insertEmoji(_this.state.text, _this.getCaretPosition(), emoji);
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

    _this.setBlur = function () {
      (0, _reactDom.findDOMNode)(_this.refs.area).blur();
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

    _this.setListeners();
    return _this;
  }

  ComposeSection.prototype.componentWillUnmount = function componentWillUnmount() {
    this.setBlur();
    this.clearListeners();
  };

  ComposeSection.prototype.componentDidMount = function componentDidMount() {
    this.setFocus();
  };

  ComposeSection.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var isAutoFocusEnabled = this.state.isAutoFocusEnabled;


    if (isAutoFocusEnabled) {
      if (prevState.isAutoFocusEnabled !== true) {
        this.setListeners();
      }
      this.setFocus();
    } else {
      if (prevState.isAutoFocusEnabled !== false) {
        this.clearListeners();
      }
    }
  };

  ComposeSection.prototype.setListeners = function setListeners() {
    window.addEventListener('focus', this.setFocus);
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  ComposeSection.prototype.clearListeners = function clearListeners() {
    window.removeEventListener('focus', this.setFocus);
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  ComposeSection.prototype.render = function render() {
    var _state = this.state;
    var text = _state.text;
    var profile = _state.profile;
    var mentions = _state.mentions;
    var stickers = _state.stickers;
    var isMarkdownHintShow = _state.isMarkdownHintShow;
    var isSendAttachmentOpen = _state.isSendAttachmentOpen;
    var isMessageArtOpen = _state.isMessageArtOpen;
    var intl = this.context.intl;

    var markdownHintClassName = (0, _classnames2.default)('compose__markdown-hint', {
      'compose__markdown-hint--active': isMarkdownHintShow
    });

    return _react2.default.createElement(
      'section',
      { className: 'compose' },
      _react2.default.createElement(_MentionDropdown2.default, {
        mentions: mentions,
        onSelect: this.onMentionSelect,
        onClose: this.onMentionClose
      }),
      _react2.default.createElement(_MessageArt2.default, {
        onSelect: this.handleEmojiSelect,
        onStickerSelect: this.handleStickerSelect,
        isActive: isMessageArtOpen,
        stickers: stickers
      }),
      _react2.default.createElement(_VoiceRecorder2.default, { onFinish: this.sendVoiceRecord }),
      _react2.default.createElement(
        'div',
        { className: markdownHintClassName },
        _react2.default.createElement(
          'b',
          null,
          '*',
          intl.messages['compose.markdown.bold'],
          '*'
        ),
        '  ',
        _react2.default.createElement(
          'i',
          null,
          '_',
          intl.messages['compose.markdown.italic'],
          '_'
        ),
        '  ',
        _react2.default.createElement(
          'code',
          null,
          '```',
          intl.messages['compose.markdown.preformatted'],
          '```'
        )
      ),
      _react2.default.createElement(_AvatarItem2.default, { className: 'my-avatar',
        image: profile.avatar,
        placeholder: profile.placeholder,
        title: profile.name }),
      _react2.default.createElement('textarea', { className: 'compose__message',
        onChange: this.onMessageChange,
        onKeyDown: this.onKeyDown,
        onPaste: this.onPaste,
        value: text,
        ref: 'area' }),
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
      ),
      isSendAttachmentOpen ? _react2.default.createElement(_SendAttachment2.default, null) : null
    );
  };

  return ComposeSection;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

ComposeSection.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(ComposeSection, { pure: false });
//# sourceMappingURL=ComposeSection.react.js.map