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

var _Photo = require('./Photo.react');

var _Photo2 = _interopRequireDefault(_Photo);

var _Document = require('./Document.react');

var _Document2 = _interopRequireDefault(_Document);

var _Voice = require('./Voice.react');

var _Voice2 = _interopRequireDefault(_Voice);

var _Contact = require('./Contact.react');

var _Contact2 = _interopRequireDefault(_Contact);

var _Location = require('./Location.react');

var _Location2 = _interopRequireDefault(_Location);

var _Modern = require('./Modern.react');

var _Modern2 = _interopRequireDefault(_Modern);

var _Sticker = require('./Sticker.react');

var _Sticker2 = _interopRequireDefault(_Sticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// Default message content components


var MessageItem = function (_Component) {
  _inherits(MessageItem, _Component);

  MessageItem.getStores = function getStores() {
    return [_DropdownStore2.default];
  };

  MessageItem.calculateState = function calculateState(prevState, props) {
    return {
      isHighlighted: props && props.message ? _DropdownStore2.default.isMessageDropdownOpen(props.message.rid) : false
    };
  };

  function MessageItem(props, context) {
    _classCallCheck(this, MessageItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.showActions = function (event) {
      var message = _this.props.message;

      _DropdownActionCreators2.default.openMessageActions(event.target.getBoundingClientRect(), message);
    };

    _this.toggleMessageSelection = function () {
      var _this$props = _this.props;
      var message = _this$props.message;
      var onSelect = _this$props.onSelect;

      onSelect && onSelect(message.rid);
    };

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  MessageItem.prototype.componentWillMount = function componentWillMount() {
    var dialog = this.context.delegate.components.dialog;

    if (dialog && dialog.messages) {
      this.components = {
        Service: (0, _lodash.isFunction)(dialog.messages.service) ? dialog.messages.service : _Service2.default,
        Text: (0, _lodash.isFunction)(dialog.messages.text) ? dialog.messages.text : _Text2.default,
        Modern: (0, _lodash.isFunction)(dialog.messages.modern) ? dialog.messages.modern : _Modern2.default,
        Photo: (0, _lodash.isFunction)(dialog.messages.photo) ? dialog.messages.photo : _Photo2.default,
        Document: (0, _lodash.isFunction)(dialog.messages.document) ? dialog.messages.document : _Document2.default,
        Voice: (0, _lodash.isFunction)(dialog.messages.voice) ? dialog.messages.voice : _Voice2.default,
        Contact: (0, _lodash.isFunction)(dialog.messages.contact) ? dialog.messages.contact : _Contact2.default,
        Location: (0, _lodash.isFunction)(dialog.messages.location) ? dialog.messages.location : _Location2.default,
        Sticker: (0, _lodash.isFunction)(dialog.messages.sticker) ? dialog.messages.sticker : _Sticker2.default
      };
    } else {
      this.components = {
        Service: _Service2.default,
        Text: _Text2.default,
        Modern: _Modern2.default,
        Photo: _Photo2.default,
        Document: _Document2.default,
        Voice: _Voice2.default,
        Contact: _Contact2.default,
        Location: _Location2.default,
        Sticker: _Sticker2.default
      };
    }
  };

  MessageItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.message !== nextProps.message || this.props.isShort !== nextProps.isShort;
  };

  MessageItem.prototype.onClick = function onClick() {
    var _props = this.props;
    var message = _props.message;
    var peer = _props.peer;


    if (_PeerUtils2.default.equals(peer, message.sender.peer)) {
      _ActivityActionCreators2.default.show();
    } else {
      _DialogActionCreators2.default.selectDialogPeerUser(message.sender.peer.id);
    }
  };

  MessageItem.prototype.renderHeader = function renderHeader() {
    var _props2 = this.props;
    var isShort = _props2.isShort;
    var message = _props2.message;
    var state = _props2.state;


    if (isShort) {
      return null;
    }

    var messageSender = (0, _EmojiUtils.escapeWithEmoji)(message.sender.title);

    return _react2.default.createElement(
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
  };

  MessageItem.prototype.renderLeftBlock = function renderLeftBlock() {
    var _props3 = this.props;
    var isShort = _props3.isShort;
    var message = _props3.message;
    var state = _props3.state;


    if (isShort) {
      return _react2.default.createElement(
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
      return _react2.default.createElement(
        'div',
        { className: 'message__info message__info--avatar' },
        _react2.default.createElement(_AvatarItem2.default, {
          className: 'message__avatar',
          image: message.sender.avatar,
          placeholder: message.sender.placeholder,
          title: message.sender.title,
          onClick: this.onClick
        })
      );
    }
  };

  MessageItem.prototype.renderContent = function renderContent() {
    var message = this.props.message;
    var _components = this.components;
    var Service = _components.Service;
    var Text = _components.Text;
    var Photo = _components.Photo;
    var Document = _components.Document;
    var Voice = _components.Voice;
    var Contact = _components.Contact;
    var Location = _components.Location;
    var Modern = _components.Modern;
    var Sticker = _components.Sticker;


    switch (message.content.content) {
      case _ActorAppConstants.MessageContentTypes.SERVICE:
        return _react2.default.createElement(Service, _extends({}, message.content, {
          className: 'message__content message__content--service'
        }));
      case _ActorAppConstants.MessageContentTypes.TEXT:
        return _react2.default.createElement(Text, _extends({}, message.content, {
          className: 'message__content message__content--text'
        }));
      case _ActorAppConstants.MessageContentTypes.PHOTO:
        return _react2.default.createElement(Photo, _extends({}, message.content, {
          className: 'message__content message__content--photo',
          loadedClassName: 'message__content--photo--loaded'
        }));
      case _ActorAppConstants.MessageContentTypes.DOCUMENT:
        return _react2.default.createElement(Document, _extends({}, message.content, {
          className: 'message__content message__content--document'
        }));
      case _ActorAppConstants.MessageContentTypes.VOICE:
        return _react2.default.createElement(Voice, _extends({}, message.content, {
          className: 'message__content message__content--voice'
        }));
      case _ActorAppConstants.MessageContentTypes.CONTACT:
        return _react2.default.createElement(Contact, _extends({}, message.content, {
          className: 'message__content message__content--contact'
        }));
      case _ActorAppConstants.MessageContentTypes.LOCATION:
        return _react2.default.createElement(Location, _extends({}, message.content, {
          className: 'message__content message__content--location'
        }));
      case _ActorAppConstants.MessageContentTypes.TEXT_MODERN:
        return _react2.default.createElement(Modern, _extends({}, message.content, {
          className: 'message__content message__content--modern'
        }));
      case _ActorAppConstants.MessageContentTypes.STICKER:
        return _react2.default.createElement(Sticker, _extends({}, message.content, {
          className: 'message__content message__content--sticker'
        }));
      default:
        return null;
    }
  };

  MessageItem.prototype.renderActions = function renderActions() {
    var _props4 = this.props;
    var peer = _props4.peer;
    var message = _props4.message;
    var isHighlighted = this.state.isHighlighted;
    var isExperimental = this.context.isExperimental;


    var messageActionsMenuClassName = (0, _classnames2.default)('message__actions__menu', {
      'message__actions__menu--opened': isHighlighted
    });

    return _react2.default.createElement(
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
    );
  };

  MessageItem.prototype.render = function render() {
    var _props5 = this.props;
    var isShort = _props5.isShort;
    var isSelected = _props5.isSelected;
    var isHighlighted = this.state.isHighlighted;


    var messageClassName = (0, _classnames2.default)('message', {
      'message--short': isShort,
      'message--active': isHighlighted,
      'message--selected': isSelected
    });

    return _react2.default.createElement(
      'div',
      { className: messageClassName },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        this.renderLeftBlock(),
        _react2.default.createElement(
          'div',
          { className: 'message__body col-xs' },
          this.renderHeader(),
          this.renderContent()
        ),
        this.renderActions()
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