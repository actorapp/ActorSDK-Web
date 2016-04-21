'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _EmojiUtils = require('../../../utils/EmojiUtils');

var _PeerUtils = require('../../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _DialogActionCreators = require('../../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _ActivityActionCreators = require('../../../actions/ActivityActionCreators');

var _ActivityActionCreators2 = _interopRequireDefault(_ActivityActionCreators);

var _DropdownActionCreators = require('../../../actions/DropdownActionCreators');

var _DropdownActionCreators2 = _interopRequireDefault(_DropdownActionCreators);

var _DropdownStore = require('../../../stores/DropdownStore');

var _DropdownStore2 = _interopRequireDefault(_DropdownStore);

var _SvgIcon = require('../../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _State = require('./State.react');

var _State2 = _interopRequireDefault(_State);

var _Reactions = require('./Reactions.react');

var _Reactions2 = _interopRequireDefault(_Reactions);

var _Service = require('./Service.react');

var _Service2 = _interopRequireDefault(_Service);

var _Text = require('./Text.react');

var _Text2 = _interopRequireDefault(_Text);

var _PhotoReact = require('./Photo.react.js');

var _PhotoReact2 = _interopRequireDefault(_PhotoReact);

var _Document = require('./Document.react');

var _Document2 = _interopRequireDefault(_Document);

var _Voice = require('./Voice.react');

var _Voice2 = _interopRequireDefault(_Voice);

var _Contact = require('./Contact.react');

var _Contact2 = _interopRequireDefault(_Contact);

var _LocationReact = require('./Location.react.js');

var _LocationReact2 = _interopRequireDefault(_LocationReact);

var _ModernReact = require('./Modern.react.js');

var _ModernReact2 = _interopRequireDefault(_ModernReact);

var _StickerReact = require('./Sticker.react.js');

var _StickerReact2 = _interopRequireDefault(_StickerReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// Default message content components


var MessageItem = function (_Component) {
  _inherits(MessageItem, _Component);

  function MessageItem() {
    var _temp, _this, _ret;

    _classCallCheck(this, MessageItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClick = function () {
      var _this$props = _this.props;
      var message = _this$props.message;
      var peer = _this$props.peer;


      if (_PeerUtils2.default.equals(peer, message.sender.peer)) {
        _ActivityActionCreators2.default.show();
      } else {
        _DialogActionCreators2.default.selectDialogPeerUser(message.sender.peer.id);
      }
    }, _this.showActions = function (event) {
      var message = _this.props.message;

      _DropdownActionCreators2.default.openMessageActions(event.target.getBoundingClientRect(), message);
    }, _this.toggleMessageSelection = function () {
      var _this$props2 = _this.props;
      var message = _this$props2.message;
      var onSelect = _this$props2.onSelect;

      onSelect && onSelect(message.rid);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MessageItem.getStores = function getStores() {
    return [_DropdownStore2.default];
  };

  MessageItem.calculateState = function calculateState(prevState, props) {
    return {
      isHighlighted: props && props.message ? _DropdownStore2.default.isMessageDropdownOpen(props.message.rid) : false
    };
  };

  MessageItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.message !== nextProps.message || this.props.isShort !== nextProps.isShort;
  };

  MessageItem.prototype.render = function render() {
    var _props = this.props;
    var peer = _props.peer;
    var message = _props.message;
    var state = _props.state;
    var isShort = _props.isShort;
    var isSelected = _props.isSelected;
    var isHighlighted = this.state.isHighlighted;
    var _context = this.context;
    var delegate = _context.delegate;
    var isExperimental = _context.isExperimental;


    var Service = void 0,
        Text = void 0,
        Modern = void 0,
        Photo = void 0,
        Document = void 0,
        Voice = void 0,
        Contact = void 0,
        Location = void 0,
        Sticker = void 0;
    if (delegate.components.dialog && delegate.components.dialog.messages && !(0, _lodash.isFunction)(delegate.components.dialog.messages.message)) {
      Service = delegate.components.dialog.messages.service || _Service2.default;
      Text = delegate.components.dialog.messages.text || _Text2.default;
      Modern = delegate.components.dialog.messages.modern || _ModernReact2.default;
      Photo = delegate.components.dialog.messages.photo || _PhotoReact2.default;
      Document = delegate.components.dialog.messages.document || _Document2.default;
      Voice = delegate.components.dialog.messages.voice || _Voice2.default;
      Contact = delegate.components.dialog.messages.contact || _Contact2.default;
      Location = delegate.components.dialog.messages.location || _LocationReact2.default;
      Sticker = delegate.components.dialog.messages.sticker || _StickerReact2.default;
    } else {
      Service = _Service2.default;
      Text = _Text2.default;
      Modern = _ModernReact2.default;
      Photo = _PhotoReact2.default;
      Document = _Document2.default;
      Voice = _Voice2.default;
      Contact = _Contact2.default;
      Location = _LocationReact2.default;
      Sticker = _StickerReact2.default;
    }

    var header = null,
        messageContent = null,
        leftBlock = null;

    var messageSender = (0, _EmojiUtils.escapeWithEmoji)(message.sender.title);

    var messageClassName = (0, _classnames2.default)('message', {
      'message--same-sender': isShort,
      'message--active': isHighlighted,
      'message--selected': isSelected
    });
    var messageActionsMenuClassName = (0, _classnames2.default)('message__actions__menu', {
      'message__actions__menu--opened': isHighlighted
    });

    if (isShort) {
      leftBlock = _react2.default.createElement(
        'div',
        { className: 'message__info text-right' },
        _react2.default.createElement(
          'time',
          { className: 'message__timestamp' },
          message.date
        ),
        _react2.default.createElement(_State2.default, { state: state })
      );
    } else {
      leftBlock = _react2.default.createElement(
        'div',
        { className: 'message__info message__info--avatar' },
        _react2.default.createElement(
          'a',
          { onClick: this.onClick },
          _react2.default.createElement(_AvatarItem2.default, { image: message.sender.avatar,
            placeholder: message.sender.placeholder,
            title: message.sender.title })
        )
      );
      header = _react2.default.createElement(
        'header',
        { className: 'message__header' },
        _react2.default.createElement(
          'h3',
          { className: 'message__sender' },
          _react2.default.createElement(
            'a',
            { onClick: this.onClick },
            message.sender.title ? _react2.default.createElement('span', { className: 'message__sender__name', dangerouslySetInnerHTML: { __html: messageSender } }) : null,
            message.sender.userName ? _react2.default.createElement(
              'span',
              { className: 'message__sender__nick' },
              '@',
              message.sender.userName
            ) : null
          )
        ),
        _react2.default.createElement(
          'time',
          { className: 'message__timestamp' },
          message.date
        ),
        _react2.default.createElement(_State2.default, { state: state })
      );
    }

    switch (message.content.content) {
      case _ActorAppConstants.MessageContentTypes.SERVICE:
        messageContent = _react2.default.createElement(Service, _extends({}, message.content, { className: 'message__content message__content--service' }));
        break;
      case _ActorAppConstants.MessageContentTypes.TEXT:
        messageContent = _react2.default.createElement(Text, _extends({}, message.content, { className: 'message__content message__content--text' }));
        break;
      case _ActorAppConstants.MessageContentTypes.PHOTO:
        messageContent = _react2.default.createElement(Photo, { content: message.content, className: 'message__content message__content--photo',
          loadedClassName: 'message__content--photo--loaded' });
        break;
      case _ActorAppConstants.MessageContentTypes.DOCUMENT:
        messageContent = _react2.default.createElement(Document, { content: message.content, className: 'message__content message__content--document' });
        break;
      case _ActorAppConstants.MessageContentTypes.VOICE:
        messageContent = _react2.default.createElement(Voice, { content: message.content, className: 'message__content message__content--voice' });
        break;
      case _ActorAppConstants.MessageContentTypes.CONTACT:
        messageContent = _react2.default.createElement(Contact, _extends({}, message.content, { className: 'message__content message__content--contact' }));
        break;
      case _ActorAppConstants.MessageContentTypes.LOCATION:
        messageContent = _react2.default.createElement(Location, { content: message.content, className: 'message__content message__content--location' });
        break;
      case _ActorAppConstants.MessageContentTypes.TEXT_MODERN:
        messageContent = _react2.default.createElement(Modern, _extends({}, message.content, { className: 'message__content message__content--modern' }));
        break;
      case _ActorAppConstants.MessageContentTypes.STICKER:
        messageContent = _react2.default.createElement(Sticker, _extends({}, message.content, { className: 'message__content message__content--sticker' }));
        break;
      default:
    }

    return _react2.default.createElement(
      'div',
      { className: messageClassName },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        leftBlock,
        _react2.default.createElement(
          'div',
          { className: 'message__body col-xs' },
          header,
          messageContent
        ),
        _react2.default.createElement(
          'div',
          { className: 'message__actions' },
          _react2.default.createElement(_Reactions2.default, { peer: peer, message: message }),
          _react2.default.createElement(
            'div',
            { className: messageActionsMenuClassName, onClick: this.showActions },
            _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--dropdown', glyph: 'cog' })
          ),
          isExperimental ? _react2.default.createElement(
            'div',
            { className: 'message__actions__selector', onClick: this.toggleMessageSelection },
            _react2.default.createElement('i', { className: 'icon material-icons icon-check' })
          ) : null
        )
      )
    );
  };

  return MessageItem;
}(_react.Component);

MessageItem.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  message: _react.PropTypes.object.isRequired,
  state: _react.PropTypes.string.isRequired,
  isShort: _react.PropTypes.bool.isRequired,
  isSelected: _react.PropTypes.bool,
  onSelect: _react.PropTypes.func
};
MessageItem.contextTypes = {
  delegate: _react.PropTypes.object,
  isExperimental: _react.PropTypes.bool
};
exports.default = _utils.Container.create(MessageItem, { withProps: true });
//# sourceMappingURL=MessageItem.react.js.map