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

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TypingStore = require('../../stores/TypingStore');

var _TypingStore2 = _interopRequireDefault(_TypingStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Typing = function (_Component) {
  (0, _inherits3.default)(Typing, _Component);

  Typing.getStores = function getStores() {
    return [_TypingStore2.default];
  };

  Typing.calculateState = function calculateState() {
    var typing = _TypingStore2.default.getTyping();
    return typing === null ? { show: false } : { typing: typing, show: true };
  };

  function Typing(props) {
    (0, _classCallCheck3.default)(this, Typing);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      typing: null
    };
    return _this;
  }

  Typing.prototype.render = function render() {
    var _state = this.state;
    var show = _state.show;
    var typing = _state.typing;


    var typingClassName = (0, _classnames2.default)('typing', {
      'typing--hidden': !show
    });

    return _react2.default.createElement(
      'div',
      { className: typingClassName },
      _react2.default.createElement(
        'div',
        { className: 'typing-indicator' },
        _react2.default.createElement('i', null),
        _react2.default.createElement('i', null),
        _react2.default.createElement('i', null)
      ),
      _react2.default.createElement(
        'span',
        null,
        typing
      )
    );
  };

  return Typing;
}(_react.Component);

exports.default = _utils.Container.create(Typing);
//# sourceMappingURL=TypingSection.react.js.map