'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _ComposeTextArea = require('../compose/ComposeTextArea.react');

var _ComposeTextArea2 = _interopRequireDefault(_ComposeTextArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MessageEdit = function (_Component) {
  _inherits(MessageEdit, _Component);

  function MessageEdit(props) {
    _classCallCheck(this, MessageEdit);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      text: props.message.content.text
    };

    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onTyping = _this.onTyping.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  // TODO: pass real props


  MessageEdit.prototype.componentDidMount = function componentDidMount() {
    console.debug('REPORT ABOUT MOUNT!');
  };

  MessageEdit.prototype.onSubmit = function onSubmit() {
    this.props.onSubmit(this.props.message, this.state.text);
  };

  MessageEdit.prototype.onTyping = function onTyping(text) {
    this.setState({ text: text });
  };

  MessageEdit.prototype.onKeyDown = function onKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      event.preventDefault();
      this.onSubmit();
    }
  };

  MessageEdit.prototype.render = function render() {
    return _react2.default.createElement(_ComposeTextArea2.default, {
      autoFocus: true,
      value: this.state.text,
      sendByEnter: this.props.sendByEnter,
      onSubmit: this.onSubmit,
      onTyping: this.onTyping,
      onKeyDown: this.onKeyDown
    });
  };

  return MessageEdit;
}(_react.Component);

MessageEdit.propTypes = {
  message: _react.PropTypes.object.isRequired,
  sendByEnter: _react.PropTypes.bool.isRequired,
  onSubmit: _react.PropTypes.func.isRequired
};
MessageEdit.defaultProps = {
  sendByEnter: true
};
exports.default = MessageEdit;
//# sourceMappingURL=MessageEdit.react.js.map