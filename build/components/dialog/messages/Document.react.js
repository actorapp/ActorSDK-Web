'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Class that represents a component for display document message content
 */
var Document = function (_Component) {
  _inherits(Document, _Component);

  function Document() {
    _classCallCheck(this, Document);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Document.prototype.renderIcon = function renderIcon() {
    var _props = this.props;
    var fileUrl = _props.fileUrl;
    var isUploading = _props.isUploading;


    if (isUploading) {
      return _react2.default.createElement(
        'div',
        { className: 'document__icon' },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'attach_file'
        )
      );
    } else {
      return _react2.default.createElement(
        'a',
        { className: 'document__icon', href: fileUrl },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'attach_file'
        )
      );
    }
  };

  Document.prototype.renderActions = function renderActions() {
    var _props2 = this.props;
    var fileUrl = _props2.fileUrl;
    var isUploading = _props2.isUploading;


    if (isUploading) {
      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'message.uploading' })
      );
    } else {
      return _react2.default.createElement(
        'a',
        { href: fileUrl },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'message.download' })
      );
    }
  };

  Document.prototype.render = function render() {
    var _props3 = this.props;
    var fileName = _props3.fileName;
    var fileSize = _props3.fileSize;
    var fileExtension = _props3.fileExtension;
    var className = _props3.className;


    var documentClassName = (0, _classnames2.default)(className, 'row');

    return _react2.default.createElement(
      'div',
      { className: documentClassName },
      _react2.default.createElement(
        'div',
        { className: 'document row' },
        this.renderIcon(),
        _react2.default.createElement(
          'div',
          { className: 'col-xs' },
          _react2.default.createElement(
            'span',
            { className: 'document__filename' },
            fileName
          ),
          _react2.default.createElement(
            'div',
            { className: 'document__meta' },
            _react2.default.createElement(
              'span',
              { className: 'document__meta__size' },
              fileSize
            ),
            _react2.default.createElement(
              'span',
              { className: 'document__meta__ext' },
              fileExtension
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'document__actions' },
            this.renderActions()
          )
        )
      ),
      _react2.default.createElement('div', { className: 'col-xs' })
    );
  };

  return Document;
}(_react.Component);

Document.propTypes = {
  fileUrl: _react.PropTypes.string,
  fileName: _react.PropTypes.string.isRequired,
  fileSize: _react.PropTypes.string.isRequired,
  fileExtension: _react.PropTypes.string.isRequired,
  isUploading: _react.PropTypes.bool.isRequired,
  className: _react.PropTypes.string
};
exports.default = Document;
//# sourceMappingURL=Document.react.js.map