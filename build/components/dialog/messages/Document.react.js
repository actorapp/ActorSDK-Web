'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Class that represents a component for display document message content
 */

var Document = (function (_Component) {
  _inherits(Document, _Component);

  function Document(props) {
    _classCallCheck(this, Document);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Document).call(this, props));
  }

  _createClass(Document, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var content = _props.content;
      var className = _props.className;

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
                this.getIntlMessage('message.uploading')
              ) : _react2.default.createElement(
                'a',
                { href: content.fileUrl },
                this.getIntlMessage('message.download')
              )
            )
          )
        ),
        _react2.default.createElement('div', { className: 'col-xs' })
      );
    }
  }]);

  return Document;
})(_react.Component);

Document.propTypes = {
  content: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string
};

_reactMixin2.default.onClass(Document, _reactIntl.IntlMixin);

exports.default = Document;
//# sourceMappingURL=Document.react.js.map