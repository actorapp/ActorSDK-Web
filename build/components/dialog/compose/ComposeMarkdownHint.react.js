'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ComposeMarkdownHint = function (_Component) {
  _inherits(ComposeMarkdownHint, _Component);

  function ComposeMarkdownHint() {
    _classCallCheck(this, ComposeMarkdownHint);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ComposeMarkdownHint.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.isActive !== this.props.isActive;
  };

  ComposeMarkdownHint.prototype.render = function render() {
    var intl = this.context.intl;

    var className = (0, _classnames2.default)('compose__markdown-hint', {
      'compose__markdown-hint--active': this.props.isActive
    });

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'b',
        null,
        '*',
        intl.messages['compose.markdown.bold'],
        '*'
      ),
      '  ',
      _react2.default.createElement(
        'i',
        null,
        '_',
        intl.messages['compose.markdown.italic'],
        '_'
      ),
      '  ',
      _react2.default.createElement(
        'code',
        null,
        '```',
        intl.messages['compose.markdown.preformatted'],
        '```'
      )
    );
  };

  return ComposeMarkdownHint;
}(_react.Component);

ComposeMarkdownHint.contextTypes = {
  intl: _react.PropTypes.object.isRequired
};
ComposeMarkdownHint.propTypes = {
  isActive: _react.PropTypes.bool.isRequired
};
exports.default = ComposeMarkdownHint;
//# sourceMappingURL=ComposeMarkdownHint.react.js.map