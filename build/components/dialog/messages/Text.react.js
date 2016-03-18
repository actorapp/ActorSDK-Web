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

var _reactDom = require('react-dom');

var _ActorClient = require('../../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import hljs from 'highlight.js';
/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

function processText(text) {
  var processedText = text;
  processedText = _ActorClient2.default.renderMarkdown(processedText);
  processedText = (0, _EmojiUtils.processEmojiText)(processedText);

  return processedText;
}

var Text = function (_Component) {
  (0, _inherits3.default)(Text, _Component);

  function Text() {
    (0, _classCallCheck3.default)(this, Text);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Text.prototype.componentDidMount = function componentDidMount() {
    /*
    requestAnimationFrame(() => {
      const node = findDOMNode(this);
      const codeBlocks = node.getElementsByTagName('pre');
      for (let i = 0; i < codeBlocks.length; i++) {
        const codeBlock = codeBlocks[i];
        hljs.highlightBlock(codeBlock.firstChild);
      }
    });
    */
  };

  Text.prototype.render = function render() {
    var _props = this.props;
    var text = _props.text;
    var className = _props.className;


    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement('div', { className: 'text', dangerouslySetInnerHTML: { __html: processText(text) } })
    );
  };

  return Text;
}(_react.Component);

Text.propTypes = {
  text: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string
};
exports.default = Text;
//# sourceMappingURL=Text.react.js.map