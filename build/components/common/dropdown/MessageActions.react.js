'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EventListener = require('fbjs/lib/EventListener');

var _EventListener2 = _interopRequireDefault(_EventListener);

var _reactDom = require('react-dom');

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _isInside = require('../../../utils/isInside');

var _isInside2 = _interopRequireDefault(_isInside);

var _MessageUtils = require('../../../utils/MessageUtils');

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

var MessageActions = function (_Component) {
  (0, _inherits3.default)(MessageActions, _Component);

  function MessageActions(props) {
    (0, _classCallCheck3.default)(this, MessageActions);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

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
      return _DropdownActionCreators2.default.hideMessageDropdown();
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

      _ComposeActionCreators2.default.pasteText((0, _MessageUtils.quoteMessage)(message.content.text) + '\n');
      _this.handleDropdownClose();
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  MessageActions.prototype.componentDidMount = function componentDidMount() {
    this.listeners = [_EventListener2.default.listen(document, 'click', this.handleDocumentClick), _EventListener2.default.listen(document, 'scroll', this.handleDropdownClose)];
  };

  MessageActions.prototype.componentWillUnmount = function componentWillUnmount() {
    this.listeners.forEach(function (listener) {
      listener.remove();
    });

    this.listeners = null;
  };

  MessageActions.prototype.render = function render() {
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
  };

  return MessageActions;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

MessageActions.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  message: _react.PropTypes.object.isRequired,
  targetRect: _react.PropTypes.object.isRequired
};
MessageActions.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = MessageActions;
//# sourceMappingURL=MessageActions.react.js.map