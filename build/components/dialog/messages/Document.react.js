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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class that represents a component for display document message content
 */
/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Document = function (_Component) {
  (0, _inherits3.default)(Document, _Component);

  function Document() {
    (0, _classCallCheck3.default)(this, Document);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Document.prototype.render = function render() {
    var _props = this.props;
    var content = _props.content;
    var className = _props.className;
    var intl = this.context.intl;


    var documentClassName = (0, _classnames2.default)(className, 'row');

    return _react2.default.createElement(
      'div',
      { className: documentClassName },
      _react2.default.createElement(
        'div',
        { className: 'document row' },
        content.isUploading ? _react2.default.createElement(
          'div',
          { className: 'document__icon' },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'attach_file'
          )
        ) : _react2.default.createElement(
          'a',
          { className: 'document__icon', href: content.fileUrl },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'attach_file'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs' },
          _react2.default.createElement(
            'span',
            { className: 'document__filename' },
            content.fileName
          ),
          _react2.default.createElement(
            'div',
            { className: 'document__meta' },
            _react2.default.createElement(
              'span',
              { className: 'document__meta__size' },
              content.fileSize
            ),
            _react2.default.createElement(
              'span',
              { className: 'document__meta__ext' },
              content.fileExtension
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'document__actions' },
            content.isUploading ? _react2.default.createElement(
              'span',
              null,
              intl.messages['message.uploading']
            ) : _react2.default.createElement(
              'a',
              { href: content.fileUrl },
              intl.messages['message.download']
            )
          )
        )
      ),
      _react2.default.createElement('div', { className: 'col-xs' })
    );
  };

  return Document;
}(_react.Component);

Document.propTypes = {
  content: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string
};
Document.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = Document;
//# sourceMappingURL=Document.react.js.map