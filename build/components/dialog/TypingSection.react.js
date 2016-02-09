'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TypingStore = require('../../stores/TypingStore');

var _TypingStore2 = _interopRequireDefault(_TypingStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Typing = (function (_Component) {
  _inherits(Typing, _Component);

  _createClass(Typing, null, [{
    key: 'calculateState',
    value: function calculateState() {
      var typing = _TypingStore2.default.getTyping();
      var newState = typing === null ? { show: false } : { typing: typing, show: true };
      return newState;
    }
  }]);

  function Typing(props) {
    _classCallCheck(this, Typing);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Typing).call(this, props));

    _this.state = {
      typing: null
    };
    return _this;
  }

  _createClass(Typing, [{
    key: 'render',
    value: function render() {
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
    }
  }]);

  return Typing;
})(_react.Component);

Typing.getStores = function () {
  return [_TypingStore2.default];
};

exports.default = _utils.Container.create(Typing);
//# sourceMappingURL=TypingSection.react.js.map