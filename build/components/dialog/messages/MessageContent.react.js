'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

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


var MessageContent = function (_Component) {
  _inherits(MessageContent, _Component);

  function MessageContent(props, context) {
    _classCallCheck(this, MessageContent);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    var dialog = context.delegate.components.dialog;

    if (dialog && dialog.messages) {
      _this.components = {
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
      _this.components = {
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
    return _this;
  }

  MessageContent.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.content !== nextProps.content;
  };

  MessageContent.prototype.render = function render() {
    var content = this.props.content;
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


    switch (content.content) {
      case _ActorAppConstants.MessageContentTypes.SERVICE:
        return _react2.default.createElement(Service, _extends({}, content, {
          className: 'message__content message__content--service'
        }));
      case _ActorAppConstants.MessageContentTypes.TEXT:
        return _react2.default.createElement(Text, _extends({}, content, {
          className: 'message__content message__content--text'
        }));
      case _ActorAppConstants.MessageContentTypes.PHOTO:
        return _react2.default.createElement(Photo, _extends({}, content, {
          className: 'message__content message__content--photo',
          loadedClassName: 'message__content--photo--loaded'
        }));
      case _ActorAppConstants.MessageContentTypes.DOCUMENT:
        return _react2.default.createElement(Document, _extends({}, content, {
          className: 'message__content message__content--document'
        }));
      case _ActorAppConstants.MessageContentTypes.VOICE:
        return _react2.default.createElement(Voice, _extends({}, content, {
          className: 'message__content message__content--voice'
        }));
      case _ActorAppConstants.MessageContentTypes.CONTACT:
        return _react2.default.createElement(Contact, _extends({}, content, {
          className: 'message__content message__content--contact'
        }));
      case _ActorAppConstants.MessageContentTypes.LOCATION:
        return _react2.default.createElement(Location, _extends({}, content, {
          className: 'message__content message__content--location'
        }));
      case _ActorAppConstants.MessageContentTypes.TEXT_MODERN:
        return _react2.default.createElement(Modern, _extends({}, content, {
          className: 'message__content message__content--modern'
        }));
      case _ActorAppConstants.MessageContentTypes.STICKER:
        return _react2.default.createElement(Sticker, _extends({}, content, {
          className: 'message__content message__content--sticker'
        }));
      default:
        return null;
    }
  };

  return MessageContent;
}(_react.Component);

MessageContent.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
MessageContent.propTypes = {
  content: _react.PropTypes.object.isRequired
};
exports.default = MessageContent;
//# sourceMappingURL=MessageContent.react.js.map