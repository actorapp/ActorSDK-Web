'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _isInside = require('../../../utils/isInside');

var _isInside2 = _interopRequireDefault(_isInside);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _MessageActionCreators = require('../../../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _ComposeActionCreators = require('../../../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _DropdownActionCreators = require('../../../actions/DropdownActionCreators');

var _DropdownActionCreators2 = _interopRequireDefault(_DropdownActionCreators);

var _UserStore = require('../../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MessageActions = (function (_Component) {
  _inherits(MessageActions, _Component);

  function MessageActions(props) {
    _classCallCheck(this, MessageActions);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MessageActions).call(this, props));

    _this.handleDocumentClick = function (event) {
      var dropdown = (0, _reactDom.findDOMNode)(_this.refs.dropdown);
      var dropdownRect = dropdown.getBoundingClientRect();
      var coords = {
        x: event.pageX || event.clientX,
        y: event.pageY || event.clientY
      };

      if (!(0, _isInside2.default)(coords, dropdownRect)) {
        event.preventDefault();
        _this.handleDropdownClose();
      }
    };

    _this.handleDropdownClose = function () {
      return _DropdownActionCreators2.default.hide();
    };

    _this.handleDelete = function () {
      var _this$props = _this.props;
      var peer = _this$props.peer;
      var message = _this$props.message;

      _MessageActionCreators2.default.deleteMessage(peer, message.rid);
      _this.handleDropdownClose();
    };

    _this.handleReply = function () {
      var message = _this.props.message;

      var info = _UserStore2.default.getUser(message.sender.peer.id);
      var replyText = info.nick ? '@' + info.nick + ': ' : info.name + ': ';
      _ComposeActionCreators2.default.pasteText(replyText);
      _this.handleDropdownClose();
    };

    _this.handleQuote = function () {
      var message = _this.props.message;

      _ComposeActionCreators2.default.pasteText('> ' + message.content.text + ' \n');
      _this.handleDropdownClose();
    };

    document.addEventListener('click', _this.handleDocumentClick, true);

    if (props.hideOnScroll) {
      document.addEventListener('scroll', _this.handleDropdownClose, true);
    }
    return _this;
  }

  _createClass(MessageActions, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var hideOnScroll = this.props.hideOnScroll;

      document.removeEventListener('click', this.handleDocumentClick, true);

      if (hideOnScroll) {
        document.removeEventListener('scroll', this.handleDropdownClose, true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var message = _props.message;
      var targetRect = _props.targetRect;
      var intl = this.context.intl;

      var isThisMyMessage = _UserStore2.default.getMyId() === message.sender.peer.id;

      var dropdownStyles = {
        top: targetRect.top,
        left: targetRect.left
      };

      var dropdownMenuStyles = {
        minWidth: 120,
        right: 2,
        top: -4
      };

      return _react2.default.createElement(
        'div',
        { className: 'dropdown dropdown--opened dropdown--small', style: dropdownStyles },
        _react2.default.createElement(
          'ul',
          { className: 'dropdown__menu dropdown__menu--right', ref: 'dropdown', style: dropdownMenuStyles },
          _react2.default.createElement(
            'li',
            { className: 'dropdown__menu__item hide' },
            _react2.default.createElement(
              'i',
              { className: 'icon material-icons' },
              'star_rate'
            ),
            ' ',
            intl.messages['message.pin']
          ),
          !isThisMyMessage ? _react2.default.createElement(
            'li',
            { className: 'dropdown__menu__item', onClick: this.handleReply },
            _react2.default.createElement(
              'i',
              { className: 'icon material-icons' },
              'reply'
            ),
            ' ',
            intl.messages['message.reply']
          ) : null,
          message.content.content === _ActorAppConstants.MessageContentTypes.TEXT ? _react2.default.createElement(
            'li',
            { className: 'dropdown__menu__item', onClick: this.handleQuote },
            _react2.default.createElement(
              'i',
              { className: 'icon material-icons' },
              'format_quote'
            ),
            ' ',
            intl.messages['message.quote']
          ) : null,
          _react2.default.createElement(
            'li',
            { className: 'dropdown__menu__item hide' },
            _react2.default.createElement(
              'i',
              { className: 'icon material-icons' },
              'forward'
            ),
            ' ',
            intl.messages['message.forward']
          ),
          _react2.default.createElement(
            'li',
            { className: 'dropdown__menu__item', onClick: this.handleDelete },
            _react2.default.createElement(
              'i',
              { className: 'icon material-icons' },
              'delete'
            ),
            ' ',
            intl.messages['message.delete']
          )
        )
      );
    }
  }]);

  return MessageActions;
})(_react.Component);

MessageActions.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  message: _react.PropTypes.object.isRequired,
  targetRect: _react.PropTypes.object.isRequired,
  hideOnScroll: _react.PropTypes.bool.isRequired
};
MessageActions.contextTypes = {
  intl: _react.PropTypes.object
};

_reactMixin2.default.onClass(MessageActions, _reactAddonsPureRenderMixin2.default);

exports.default = MessageActions;
//# sourceMappingURL=MessageActions.react.js.map