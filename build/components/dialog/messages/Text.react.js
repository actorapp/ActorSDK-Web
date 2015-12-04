'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _memoizee = require('memoizee');

var _memoizee2 = _interopRequireDefault(_memoizee);

var _ActorClient = require('../../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var processText = function processText(text) {
  var markedText = _ActorClient2.default.renderMarkdown(text);
  var emojifiedText = markedText;

  _EmojiUtils.emoji.include_title = true;
  _EmojiUtils.emoji.include_text = true;
  _EmojiUtils.emoji.change_replace_mode('css');
  emojifiedText = _EmojiUtils.emoji.replace_colons(emojifiedText);
  emojifiedText = _EmojiUtils.emoji.replace_unified(emojifiedText);
  return emojifiedText;
};

var memoizedProcessText = (0, _memoizee2.default)(processText, {
  length: 1000,
  maxAge: 60 * 60 * 1000,
  max: 10000
});

var Text = (function (_Component) {
  _inherits(Text, _Component);

  function Text(props) {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, props));
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var content = _props.content;
      var className = _props.className;

      return _react2.default.createElement('div', { className: className,
        dangerouslySetInnerHTML: { __html: memoizedProcessText(content.text) } });
    }
  }]);

  return Text;
})(_react.Component);

Text.propTypes = {
  content: _react2.default.PropTypes.object.isRequired,
  className: _react2.default.PropTypes.string
};
exports.default = Text;
//# sourceMappingURL=Text.react.js.map