'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

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

var _ConnectionState = require('./common/ConnectionState.react');

var _ConnectionState2 = _interopRequireDefault(_ConnectionState);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _MessageStore = require('../stores/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _GroupStore = require('../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _DialogActionCreators = require('../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// On which scrollTop value start loading older messages
var LoadMessagesScrollTop = 100;

var initialRenderMessagesCount = 20;
var renderMessagesStep = 20;

var renderMessagesCount = initialRenderMessagesCount;

var lastPeer = null;
var lastScrolledFromBottom = 0;

var getStateFromStores = function getStateFromStores() {
  var messages = _MessageStore2.default.getAll();
  var messagesToRender = undefined;

  if (messages.length > renderMessagesCount) {
    messagesToRender = messages.slice(messages.length - renderMessagesCount);
  } else {
    messagesToRender = messages;
  }

  return {
    peer: _DialogStore2.default.getSelectedDialogPeer(),
    messages: messages,
    messagesToRender: messagesToRender
  };
};

var DialogSection = (function (_React$Component) {
  _inherits(DialogSection, _React$Component);

  function DialogSection(props) {
    _classCallCheck(this, DialogSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DialogSection).call(this, props));

    _this.fixScrollTimeout = function () {
      setTimeout(_this.fixScroll, 50);
    };

    _this.fixScroll = function () {
      var node = _react2.default.findDOMNode(_this.refs.MessagesSection);
      if (node) {
        node.scrollTop = node.scrollHeight - lastScrolledFromBottom - node.offsetHeight;
      }
    };

    _this.onSelectedDialogChange = function () {
      lastScrolledFromBottom = 0;
      renderMessagesCount = initialRenderMessagesCount;

      if (lastPeer != null) {
        _DialogActionCreators2.default.onConversationClosed(lastPeer);
      }

      lastPeer = _DialogStore2.default.getSelectedDialogPeer();
      _DialogActionCreators2.default.onConversationOpen(lastPeer);
    };

    _this.onMessagesChange = _.debounce(function () {
      _this.setState(getStateFromStores());
    }, 10, { maxWait: 50, leading: true });
    _this.loadMessagesByScroll = _.debounce(function () {
      if (_this.state.peer) {
        var node = _react2.default.findDOMNode(_this.refs.MessagesSection);
        var scrollTop = node.scrollTop;
        lastScrolledFromBottom = node.scrollHeight - scrollTop - node.offsetHeight; // was node.scrollHeight - scrollTop

        if (node.scrollTop < LoadMessagesScrollTop) {
          _DialogActionCreators2.default.onChatEnd(_this.state.peer);

          if (_this.state.messages.length > _this.state.messagesToRender.length) {
            renderMessagesCount += renderMessagesStep;

            if (renderMessagesCount > _this.state.messages.length) {
              renderMessagesCount = _this.state.messages.length;
            }

            _this.setState(getStateFromStores());
          }
        }
      }
    }, 5, { maxWait: 30 });

    _this.state = getStateFromStores();

    _ActivityStore2.default.addChangeListener(_this.fixScrollTimeout.bind(_this));
    _DialogStore2.default.addSelectListener(_this.onSelectedDialogChange);
    _MessageStore2.default.addChangeListener(_this.onMessagesChange);
    return _this;
  }

  _createClass(DialogSection, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ActivityStore2.default.removeChangeListener(this.fixScrollTimeout.bind(this));
      _DialogStore2.default.removeSelectListener(this.onSelectedDialogChange);
      _MessageStore2.default.removeChangeListener(this.onMessagesChange);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var peer = _DialogStore2.default.getSelectedDialogPeer();

      if (peer) {
        _DialogActionCreators2.default.onConversationOpen(peer);
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
      var peer = this.state.peer;

      var mainContent = undefined;

      if (peer) {
        var isMember = true,
            memberArea = undefined;

        if (peer.type === _ActorAppConstants.PeerTypes.GROUP) {
          var group = _GroupStore2.default.getGroup(peer.id);
          isMember = _DialogStore2.default.isGroupMember(group);
        }

        if (isMember) {
          memberArea = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_TypingSection2.default, null),
            _react2.default.createElement(_ComposeSection2.default, { peer: peer })
          );
        } else {
          memberArea = _react2.default.createElement(
            'section',
            { className: 'compose compose--disabled row center-xs middle-xs' },
            _react2.default.createElement(
              'h3',
              null,
              'You are not a member'
            )
          );
        }

        mainContent = _react2.default.createElement(
          'section',
          { className: 'dialog', onScroll: this.loadMessagesByScroll },
          _react2.default.createElement(_ConnectionState2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'messages' },
            _react2.default.createElement(_MessagesSection2.default, { messages: this.state.messagesToRender,
              peer: peer,
              ref: 'MessagesSection' })
          ),
          memberArea
        );
      } else {
        mainContent = _react2.default.createElement(
          'section',
          { className: 'dialog dialog--empty row center-xs middle-xs' },
          _react2.default.createElement(_ConnectionState2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'advice' },
            _react2.default.createElement(
              'div',
              { className: 'actor-logo' },
              _react2.default.createElement('svg', { className: 'icon icon--gray',
                dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#star"/>' } })
            ),
            _react2.default.createElement(
              'h2',
              null,
              'Try to be better than yesterday!'
            )
          )
        );
      }

      return _react2.default.createElement(
        'section',
        { className: 'main' },
        _react2.default.createElement(_ToolbarSection2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'flexrow' },
          mainContent,
          _react2.default.createElement(_ActivitySection2.default, null)
        )
      );
    }
  }]);

  return DialogSection;
})(_react2.default.Component);

exports.default = DialogSection;
//# sourceMappingURL=DialogSection.react.js.map