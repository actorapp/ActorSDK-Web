'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _utils = require('flux/utils');

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

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _MentionDropdown = require('../common/MentionDropdown.react');

var _MentionDropdown2 = _interopRequireDefault(_MentionDropdown);

var _EmojiDropdown = require('../common/EmojiDropdown.react');

var _EmojiDropdown2 = _interopRequireDefault(_EmojiDropdown);

var _VoiceRecorder = require('../common/VoiceRecorder.react');

var _VoiceRecorder2 = _interopRequireDefault(_VoiceRecorder);

var _DropZone = require('../common/DropZone.react');

var _DropZone2 = _interopRequireDefault(_DropZone);

var _SendAttachment = require('../modals/SendAttachment');

var _SendAttachment2 = _interopRequireDefault(_SendAttachment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ComposeSection = (function (_Component) {
  _inherits(ComposeSection, _Component);

  _createClass(ComposeSection, null, [{
    key: 'calculateState',
    value: function calculateState(prevState) {
      return {
        peer: _DialogStore2.default.getCurrentPeer(),
        text: _ComposeStore2.default.getText(),
        profile: _ActorClient2.default.getUser(_ActorClient2.default.getUid()),
        sendByEnter: _PreferencesStore2.default.isSendByEnterEnabled(),
        mentions: _ComposeStore2.default.getMentions(),
        isSendAttachmentOpen: _AttachmentStore2.default.isOpen(),
        isMarkdownHintShow: prevState ? prevState.isMarkdownHintShow || false : false,
        isFocusDisabled: _ComposeStore2.default.isFocusDisabled()
      };
    }
  }]);

  function ComposeSection(props) {
    _classCallCheck(this, ComposeSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ComposeSection).call(this, props));

    _this.handleKeyDown = function (event) {
      if (!event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey) {
        _this.setFocus();
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
      var form = _react2.default.findDOMNode(_this.refs.attachmentForm);
      form.reset();
    };

    _this.onPaste = function (event) {
      var preventDefault = false;

      (0, _lodash.forEach)(event.clipboardData.items, function (item) {
        if (item.type.indexOf('image') !== -1) {
          preventDefault = true;
          console.debug(item.getAsFile());
          _MessageActionCreators2.default.sendClipboardPhotoMessage(_this.state.peer, item.getAsFile());
        }
      }, _this);

      if (preventDefault) {
        event.preventDefault();
      }
    };

    _this.onMentionSelect = function (mention) {
      var _this$state3 = _this.state;
      var peer = _this$state3.peer;
      var text = _this$state3.text;

      _ComposeActionCreators2.default.insertMention(peer, text, _this.getCaretPosition(), mention);
      _react2.default.findDOMNode(_this.refs.area).focus();
    };

    _this.onMentionClose = function () {
      _ComposeActionCreators2.default.closeMention();
    };

    _this.getCaretPosition = function () {
      var composeArea = _react2.default.findDOMNode(_this.refs.area);
      var selection = _Inputs2.default.getInputSelection(composeArea);
      return selection.start;
    };

    _this.handleEmojiSelect = function (emoji) {
      _EmojiActionCreators2.default.insertEmoji(_this.state.text, _this.getCaretPosition(), emoji);
      _react2.default.findDOMNode(_this.refs.area).focus();
    };

    _this.setFocus = function () {
      var isFocusDisabled = _this.state.isFocusDisabled;

      if (!isFocusDisabled) {
        _react2.default.findDOMNode(_this.refs.area).focus();
      }
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
      var attachmentInputNode = _react2.default.findDOMNode(_this.refs.attachment);
      attachmentInputNode.setAttribute('multiple', true);
      attachmentInputNode.click();
    };

    _this.handleComposeAttachmentChange = function () {
      var attachmentInputNode = _react2.default.findDOMNode(_this.refs.attachment);
      var attachments = [];

      (0, _lodash.forEach)(attachmentInputNode.files, function (file) {
        return attachments.push(file);
      });

      _AttachmentsActionCreators2.default.show(attachments);
      _this.resetAttachmentForm();
    };

    _this.sendVoiceRecord = function (record) {
      console.debug('sendVoiceRecord: ', record);
    };

    window.addEventListener('focus', _this.setFocus);
    document.addEventListener('keydown', _this.handleKeyDown, false);
    return _this;
  }

  _createClass(ComposeSection, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('focus', this.setFocus);
      document.removeEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setFocus();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setFocus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var text = _state.text;
      var profile = _state.profile;
      var mentions = _state.mentions;
      var isMarkdownHintShow = _state.isMarkdownHintShow;
      var isSendAttachmentOpen = _state.isSendAttachmentOpen;
      var isExperimental = this.context.isExperimental;

      var markdownHintClassName = (0, _classnames2.default)('compose__markdown-hint', {
        'compose__markdown-hint--active': isMarkdownHintShow
      });

      return _react2.default.createElement(
        'section',
        { className: 'compose' },
        _react2.default.createElement(_MentionDropdown2.default, { mentions: mentions,
          onSelect: this.onMentionSelect,
          onClose: this.onMentionClose }),
        _react2.default.createElement(_EmojiDropdown2.default, { onSelect: this.handleEmojiSelect }),
        isExperimental ? _react2.default.createElement(_VoiceRecorder2.default, { onFinish: this.sendVoiceRecord }) : null,
        _react2.default.createElement(
          'div',
          { className: markdownHintClassName },
          _react2.default.createElement(
            'b',
            null,
            '*',
            this.getIntlMessage('compose.markdown.bold'),
            '*'
          ),
          '  ',
          _react2.default.createElement(
            'i',
            null,
            '_',
            this.getIntlMessage('compose.markdown.italic'),
            '_'
          ),
          '  ',
          _react2.default.createElement(
            'code',
            null,
            '```',
            this.getIntlMessage('compose.markdown.preformatted'),
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
          this.getIntlMessage('compose.dropzone')
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
            this.getIntlMessage('compose.attach')
          ),
          _react2.default.createElement('span', { className: 'col-xs' }),
          _react2.default.createElement(
            'button',
            { className: 'button button--lightblue', onClick: this.sendTextMessage },
            this.getIntlMessage('compose.send')
          )
        ),
        _react2.default.createElement(
          'form',
          { className: 'compose__hidden', ref: 'attachmentForm' },
          _react2.default.createElement('input', { ref: 'attachment', onChange: this.handleComposeAttachmentChange, type: 'file' })
        ),
        isSendAttachmentOpen ? _react2.default.createElement(_SendAttachment2.default, null) : null
      );
    }
  }]);

  return ComposeSection;
})(_react.Component);

ComposeSection.getStores = function () {
  return [_DialogStore2.default, _GroupStore2.default, _PreferencesStore2.default, _AttachmentStore2.default, _ComposeStore2.default];
};

ComposeSection.contextTypes = {
  isExperimental: _react.PropTypes.bool
};

_reactMixin2.default.onClass(ComposeSection, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(ComposeSection);
//# sourceMappingURL=ComposeSection.react.js.map