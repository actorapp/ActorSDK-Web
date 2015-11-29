'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _humanFileSize = require('../../../utils/humanFileSize');

var _humanFileSize2 = _interopRequireDefault(_humanFileSize);

var _AttachmentsActionCreators = require('../../../actions/AttachmentsActionCreators');

var _AttachmentsActionCreators2 = _interopRequireDefault(_AttachmentsActionCreators);

var _AttachmentStore = require('../../../stores/AttachmentStore');

var _AttachmentStore2 = _interopRequireDefault(_AttachmentStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Attachment = (function (_Component) {
  _inherits(Attachment, _Component);

  function Attachment(props) {
    _classCallCheck(this, Attachment);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Attachment).call(this, props));

    _this.changeAttachment = function () {
      var sendAsPicture = _this.props.attachment.sendAsPicture;

      _AttachmentsActionCreators2.default.changeAttachment(!sendAsPicture);
    };

    return _this;
  }

  _createClass(Attachment, [{
    key: 'render',
    value: function render() {
      var attachment = this.props.attachment;

      return _react2.default.createElement(
        'div',
        { className: 'attachment row' },
        _react2.default.createElement(
          'div',
          { className: 'attachment__preview col-xs-5' },
          attachment.isImage ? _react2.default.createElement('img', { src: window.URL.createObjectURL(attachment.file) }) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-7', style: { paddingLeft: 16 } },
          _react2.default.createElement(
            'div',
            { className: 'attachment__meta attachment__meta--name' },
            _react2.default.createElement(
              'div',
              { className: 'attachment__meta__title' },
              this.getIntlMessage('modal.attachments.name')
            ),
            _react2.default.createElement(
              'div',
              { className: 'attachment__meta__content' },
              attachment.file.name
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs' },
              _react2.default.createElement(
                'div',
                { className: 'attachment__meta attachment__meta--size' },
                _react2.default.createElement(
                  'div',
                  { className: 'attachment__meta__title' },
                  this.getIntlMessage('modal.attachments.type')
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'attachment__meta__content' },
                  attachment.file.type
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-xs' },
              _react2.default.createElement(
                'div',
                { className: 'attachment__meta attachment__meta--size' },
                _react2.default.createElement(
                  'div',
                  { className: 'attachment__meta__title' },
                  this.getIntlMessage('modal.attachments.size')
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'attachment__meta__content' },
                  (0, _humanFileSize2.default)(attachment.file.size, true)
                )
              )
            )
          ),
          attachment.isImage ? _react2.default.createElement(
            'div',
            { className: 'attachment__extra' },
            _react2.default.createElement(
              'div',
              { className: 'attachment__extra__title' },
              this.getIntlMessage('modal.attachments.extra')
            ),
            _react2.default.createElement(
              'div',
              { className: 'attachment__extra__switcher' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'sendAsPicture', className: 'switch-label' },
                this.getIntlMessage('modal.attachments.sendAsPicture')
              ),
              _react2.default.createElement(
                'div',
                { className: 'switch pull-right' },
                _react2.default.createElement('input', { checked: attachment.sendAsPicture,
                  id: 'sendAsPicture',
                  onChange: this.changeAttachment,
                  type: 'checkbox' }),
                _react2.default.createElement('label', { htmlFor: 'sendAsPicture' })
              )
            )
          ) : null
        )
      );
    }
  }]);

  return Attachment;
})(_react.Component);

Attachment.propTypes = {
  attachment: _react.PropTypes.object.isRequired
};

_reactMixin2.default.onClass(Attachment, _reactIntl.IntlMixin);

exports.default = Attachment;