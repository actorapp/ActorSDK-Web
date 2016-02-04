'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _MessagesSection = require('./dialog/MessagesSection.react');

var _MessagesSection2 = _interopRequireDefault(_MessagesSection);

var _TypingSection = require('./dialog/TypingSection.react');

var _TypingSection2 = _interopRequireDefault(_TypingSection);

var _ComposeSection = require('./dialog/ComposeSection.react');

var _ComposeSection2 = _interopRequireDefault(_ComposeSection);

var _ToolbarSection = require('./ToolbarSection.react');

var _ToolbarSection2 = _interopRequireDefault(_ToolbarSection);

var _ActivitySection = require('./ActivitySection.react');

var _ActivitySection2 = _interopRequireDefault(_ActivitySection);

var _EmptyScreen = require('./common/EmptyScreen.react');

var _EmptyScreen2 = _interopRequireDefault(_EmptyScreen);

var _ConnectionState = require('./common/ConnectionState.react');

var _ConnectionState2 = _interopRequireDefault(_ConnectionState);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _MessageStore = require('../stores/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _DialogActionCreators = require('../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// On which scrollTop value start loading older messages
var loadMessagesScrollTop = 100;
var initialRenderMessagesCount = 20;
var renderMessagesStep = 20;

var renderMessagesCount = initialRenderMessagesCount;
var lastScrolledFromBottom = 0;

var getStateFromStores = function getStateFromStores() {
  var messages = _MessageStore2.default.getAll();
  var overlay = _MessageStore2.default.getOverlay();
  var messagesToRender = messages.length > renderMessagesCount ? messages.slice(messages.length - renderMessagesCount) : messages;
  var overlayToRender = overlay.length > renderMessagesCount ? overlay.slice(overlay.length - renderMessagesCount) : overlay;

  return {
    peer: _DialogStore2.default.getCurrentPeer(),
    messages: messages,
    overlay: overlay,
    messagesToRender: messagesToRender,
    overlayToRender: overlayToRender,
    isMember: _DialogStore2.default.isMember()
  };
};

var DialogSection = (function (_Component) {
  _inherits(DialogSection, _Component);

  function DialogSection(props) {
    _classCallCheck(this, DialogSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DialogSection).call(this, props));

    _this.fixScrollTimeout = function () {
      setTimeout(_this.fixScroll, 50);
    };

    _this.fixScroll = function () {
      var scrollNode = _react2.default.findDOMNode(_this.refs.messagesSection.refs.messagesScroll.refs.scroll);
      var node = scrollNode.getElementsByClassName('ss-content')[0];
      if (node) {
        node.scrollTop = node.scrollHeight - lastScrolledFromBottom - node.offsetHeight;
      }
    };

    _this.onChange = function () {
      lastScrolledFromBottom = 0;
      renderMessagesCount = initialRenderMessagesCount;
      _this.setState(getStateFromStores());
    };

    _this.onMessagesChange = (0, _lodash.debounce)(function () {
      _this.setState(getStateFromStores());
    }, 10, { maxWait: 50, leading: true });
    _this.loadMessagesByScroll = (0, _lodash.debounce)(function () {
      var _this$state = _this.state;
      var peer = _this$state.peer;
      var messages = _this$state.messages;
      var messagesToRender = _this$state.messagesToRender;

      if (peer) {
        var scrollNode = _react2.default.findDOMNode(_this.refs.messagesSection.refs.messagesScroll.refs.scroll);
        var node = scrollNode.getElementsByClassName('ss-content')[0];
        var scrollTop = node.scrollTop;
        lastScrolledFromBottom = node.scrollHeight - scrollTop - node.offsetHeight; // was node.scrollHeight - scrollTop

        if (node.scrollTop < loadMessagesScrollTop) {

          if (messages.length > messagesToRender.length) {
            renderMessagesCount += renderMessagesStep;

            if (renderMessagesCount > messages.length) {
              renderMessagesCount = messages.length;
            }

            _this.setState(getStateFromStores());
          } else {
            _DialogActionCreators2.default.onChatEnd(peer);
          }
        }
      }
    }, 5, { maxWait: 30 });

    _this.state = getStateFromStores();

    _ActivityStore2.default.addListener(_this.fixScrollTimeout);
    _MessageStore2.default.addListener(_this.onMessagesChange);
    _DialogStore2.default.addListener(_this.onChange);
    return _this;
  }

  _createClass(DialogSection, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var peer = this.state.peer;

      if (peer) {
        this.fixScroll();
        this.loadMessagesByScroll();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.fixScroll();
      this.loadMessagesByScroll();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var peer = _state.peer;
      var isMember = _state.isMember;
      var messagesToRender = _state.messagesToRender;
      var overlayToRender = _state.overlayToRender;
      var delegate = this.context.delegate;

      var activity = [],
          ToolbarSection = undefined,
          TypingSection = undefined,
          ComposeSection = undefined,
          MessagesSection = undefined,
          EmptyScreen = undefined;

      if (delegate.components.dialog !== null && typeof delegate.components.dialog !== 'function') {
        ToolbarSection = delegate.components.dialog.toolbar || _ToolbarSection2.default;
        MessagesSection = typeof delegate.components.dialog.messages == 'function' ? delegate.components.dialog.messages : _MessagesSection2.default;
        TypingSection = delegate.components.dialog.typing || _TypingSection2.default;
        ComposeSection = delegate.components.dialog.compose || _ComposeSection2.default;
        EmptyScreen = delegate.components.dialog.empty || _EmptyScreen2.default;

        if (delegate.components.dialog.activity) {
          (0, _lodash.forEach)(delegate.components.dialog.activity, function (Activity) {
            return activity.push(_react2.default.createElement(Activity, null));
          });
        } else {
          activity.push(_react2.default.createElement(_ActivitySection2.default, null));
        }
      } else {
        ToolbarSection = _ToolbarSection2.default;
        MessagesSection = _MessagesSection2.default;
        TypingSection = _TypingSection2.default;
        ComposeSection = _ComposeSection2.default;
        EmptyScreen = _EmptyScreen2.default;
        activity.push(_react2.default.createElement(_ActivitySection2.default, null));
      }

      var mainScreen = peer ? _react2.default.createElement(
        'section',
        { className: 'dialog' },
        _react2.default.createElement(_ConnectionState2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'messages' },
          _react2.default.createElement(MessagesSection, { messages: messagesToRender,
            overlay: overlayToRender,
            peer: peer,
            ref: 'messagesSection',
            onScroll: this.loadMessagesByScroll })
        ),
        isMember ? _react2.default.createElement(
          'footer',
          { className: 'dialog__footer' },
          _react2.default.createElement(TypingSection, null),
          _react2.default.createElement(ComposeSection, null)
        ) : _react2.default.createElement(
          'footer',
          { className: 'dialog__footer dialog__footer--disabled row center-xs middle-xs ' },
          _react2.default.createElement(
            'h3',
            null,
            'You are not a member'
          )
        )
      ) : null;

      return _react2.default.createElement(
        'section',
        { className: 'main' },
        peer ? _react2.default.createElement(ToolbarSection, null) : null,
        _react2.default.createElement(
          'div',
          { className: 'flexrow' },
          peer ? [mainScreen, activity] : _react2.default.createElement(EmptyScreen, null)
        )
      );
    }
  }]);

  return DialogSection;
})(_react.Component);

DialogSection.contextTypes = {
  delegate: _react.PropTypes.object
};
exports.default = DialogSection;
//# sourceMappingURL=DialogSection.react.js.map