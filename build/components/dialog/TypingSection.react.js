'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _TypingStore = require('../../stores/TypingStore');

var _TypingStore2 = _interopRequireDefault(_TypingStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Typing = function (_Component) {
  _inherits(Typing, _Component);

  function Typing() {
    _classCallCheck(this, Typing);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Typing.getStores = function getStores() {
    return [_TypingStore2.default];
  };

  Typing.calculateState = function calculateState() {
    return _TypingStore2.default.getState();
  };

  Typing.prototype.render = function render() {
    var typing = this.state.typing;


    if (!typing) {
      return _react2.default.createElement('div', { className: 'typing' });
    }

    return _react2.default.createElement(
      'div',
      { className: 'typing' },
      _react2.default.createElement(
        'div',
        { className: 'typing__indicator' },
        _react2.default.createElement('i', null),
        _react2.default.createElement('i', null),
        _react2.default.createElement('i', null)
      ),
      _react2.default.createElement(
        'span',
        { className: 'typing__text' },
        typing
      )
    );
  };

  return Typing;
}(_react.Component);

exports.default = _utils.Container.create(Typing);
//# sourceMappingURL=TypingSection.react.js.map