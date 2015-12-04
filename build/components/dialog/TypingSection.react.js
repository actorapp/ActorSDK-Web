'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _addons = require('react/addons');

var _addons2 = _interopRequireDefault(_addons);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PureRenderMixin = _addons2.default.addons.PureRenderMixin;

var Typing = (function (_Component) {
  _inherits(Typing, _Component);

  function Typing(props) {
    _classCallCheck(this, Typing);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Typing).call(this, props));

    _this.onTypingChange = function () {
      var typing = _DialogStore2.default.getSelectedDialogTyping();
      if (typing === null) {
        _this.setState({ show: false });
      } else {
        _this.setState({ typing: typing, show: true });
      }
    };

    _this.state = {
      typing: null,
      show: false
    };
    return _this;
  }

  _createClass(Typing, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _DialogStore2.default.addTypingListener(this.onTypingChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _DialogStore2.default.removeTypingListener(this.onTypingChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var typing = this.state.typing;
      var show = this.state.show;
      var typingClassName = (0, _classnames2.default)('typing', {
        'typing--hidden': show === false
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

_reactMixin2.default.onClass(Typing, PureRenderMixin);

exports.default = Typing;
//# sourceMappingURL=TypingSection.react.js.map