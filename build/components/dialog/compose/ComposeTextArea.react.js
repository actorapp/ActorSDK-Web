'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Inputs = require('../../../utils/Inputs');

var _Inputs2 = _interopRequireDefault(_Inputs);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ComposeTextArea = function (_Component) {
  _inherits(ComposeTextArea, _Component);

  function ComposeTextArea(props) {
    _classCallCheck(this, ComposeTextArea);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onWindowFocus = _this.onWindowFocus.bind(_this);
    _this.onDocumentKeyDown = _this.onDocumentKeyDown.bind(_this);

    _this.blur = _this.blur.bind(_this);
    _this.focus = _this.focus.bind(_this);
    _this.autoFocus = _this.autoFocus.bind(_this);
    return _this;
  }

  ComposeTextArea.prototype.componentDidMount = function componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }

    window.addEventListener('focus', this.onWindowFocus);
    document.addEventListener('keydown', this.onDocumentKeyDown, false);
  };

  ComposeTextArea.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value || nextProps.autoFocus !== this.props.autoFocus || nextProps.sendEnabled !== this.props.sendEnabled || nextProps.sendByEnter !== this.props.sendByEnter;
  };

  ComposeTextArea.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('focus', this.onWindowFocus);
    document.removeEventListener('keydown', this.onDocumentKeyDown, false);
  };

  ComposeTextArea.prototype.onWindowFocus = function onWindowFocus() {
    this.autoFocus();
  };

  ComposeTextArea.prototype.onDocumentKeyDown = function onDocumentKeyDown(event) {
    if (event.target === this.refs.area) {
      // event will be handled by onKeyDown
      return;
    }

    if (!event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey) {
      this.autoFocus();
      this.onKeyDown(event);
    }
  };

  ComposeTextArea.prototype.onChange = function onChange(event) {
    this.props.onTyping(event.target.value, this.getCaretPosition());
  };

  ComposeTextArea.prototype.onKeyDown = function onKeyDown(event) {
    if (this.props.sendEnabled && this.isSendEvent(event)) {
      event.preventDefault();
      this.props.onSubmit();
    } else if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  ComposeTextArea.prototype.isSendEvent = function isSendEvent(event) {
    if (event.keyCode !== _ActorAppConstants.KeyCodes.ENTER) {
      return false;
    }

    return this.props.sendByEnter ? !event.shiftKey : event.metaKey;
  };

  ComposeTextArea.prototype.getCaretPosition = function getCaretPosition() {
    var _Inputs$getInputSelec = _Inputs2.default.getInputSelection(this.refs.area);

    var start = _Inputs$getInputSelec.start;

    return start;
  };

  ComposeTextArea.prototype.render = function render() {
    var value = this.props.value;


    return _react2.default.createElement('textarea', {
      ref: 'area',
      className: 'compose__message',
      value: value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onPaste: this.props.onPaste
    });
  };

  ComposeTextArea.prototype.focus = function focus() {
    var area = this.refs.area;

    if (area !== document.activeElement) {
      area.focus();
      if (area.createTextRange) {
        var range = area.createTextRange();
        range.move('character', area.value.length);
        range.select();
      } else if (area.selectionStart) {
        area.setSelectionRange(area.value.length, area.value.length);
      }
    }
  };

  ComposeTextArea.prototype.autoFocus = function autoFocus() {
    if (this.props.autoFocus) {
      this.focus();
    }
  };

  ComposeTextArea.prototype.blur = function blur() {
    this.refs.area.blur();
  };

  return ComposeTextArea;
}(_react.Component);

ComposeTextArea.propTypes = {
  value: _react.PropTypes.string.isRequired,
  autoFocus: _react.PropTypes.bool.isRequired,
  sendByEnter: _react.PropTypes.bool.isRequired,
  sendEnabled: _react.PropTypes.bool.isRequired,
  onSubmit: _react.PropTypes.func.isRequired,
  onTyping: _react.PropTypes.func.isRequired,
  onPaste: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func
};
ComposeTextArea.defaultProps = {
  sendEnabled: true
};
exports.default = ComposeTextArea;
//# sourceMappingURL=ComposeTextArea.react.js.map