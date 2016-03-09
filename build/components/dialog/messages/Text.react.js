'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

var _ActorClient = require('../../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function processText(text) {
  var processedText = text;
  processedText = _ActorClient2.default.renderMarkdown(processedText);
  processedText = (0, _EmojiUtils.processEmojiText)(processedText);

  return processedText;
}

var Text = function (_Component) {
  _inherits(Text, _Component);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Text.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    requestAnimationFrame(function () {
      var node = (0, _reactDom.findDOMNode)(_this2);
      var codeBlocks = node.getElementsByTagName('pre');
      for (var i = 0; i < codeBlocks.length; i++) {
        var codeBlock = codeBlocks[i];
        _highlight2.default.highlightBlock(codeBlock.firstChild);
      }
    });
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