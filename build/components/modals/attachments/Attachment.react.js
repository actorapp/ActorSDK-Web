'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _humanFileSize = require('../../../utils/humanFileSize');

var _humanFileSize2 = _interopRequireDefault(_humanFileSize);

var _AttachmentsActionCreators = require('../../../actions/AttachmentsActionCreators');

var _AttachmentsActionCreators2 = _interopRequireDefault(_AttachmentsActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Attachment = function (_Component) {
  _inherits(Attachment, _Component);

  function Attachment(props) {
    _classCallCheck(this, Attachment);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleChangeSendAsPicture = _this.handleChangeSendAsPicture.bind(_this);
    return _this;
  }

  Attachment.prototype.handleChangeSendAsPicture = function handleChangeSendAsPicture() {
    var sendAsPicture = this.props.attachment.sendAsPicture;

    _AttachmentsActionCreators2.default.changeAttachment(!sendAsPicture);
  };

  Attachment.prototype.renderPreview = function renderPreview() {
    var attachment = this.props.attachment;

    if (!attachment.isImage) return null;

    return _react2.default.createElement(
      'div',
      { className: 'wrapper' },
      _react2.default.createElement('img', { src: window.URL.createObjectURL(attachment.file) })
    );
  };

  Attachment.prototype.renderName = function renderName() {
    var attachment = this.props.attachment;


    return _react2.default.createElement(
      'div',
      { className: 'attachment__meta attachment__meta--name' },
      _react2.default.createElement(
        'div',
        { className: 'attachment__meta__title' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.attachments.name' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'attachment__meta__content' },
        attachment.file.name
      )
    );
  };

  Attachment.prototype.renderType = function renderType() {
    var attachment = this.props.attachment;


    return _react2.default.createElement(
      'div',
      { className: 'attachment__meta attachment__meta--type' },
      _react2.default.createElement(
        'div',
        { className: 'attachment__meta__title' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.attachments.type' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'attachment__meta__content' },
        attachment.file.type
      )
    );
  };

  Attachment.prototype.renderSize = function renderSize() {
    var attachment = this.props.attachment;


    return _react2.default.createElement(
      'div',
      { className: 'attachment__meta attachment__meta--size' },
      _react2.default.createElement(
        'div',
        { className: 'attachment__meta__title' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.attachments.size' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'attachment__meta__content' },
        (0, _humanFileSize2.default)(attachment.file.size, true)
      )
    );
  };

  Attachment.prototype.renderOptions = function renderOptions() {
    var attachment = this.props.attachment;

    if (!attachment.isImage) return null;

    return _react2.default.createElement(
      'div',
      { className: 'attachment__extra' },
      _react2.default.createElement(
        'div',
        { className: 'attachment__extra__title' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.attachments.extra' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'attachment__extra__switcher' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'sendAsPicture', className: 'switch-label' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.attachments.sendAsPicture' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'switch pull-right' },
          _react2.default.createElement('input', {
            checked: attachment.sendAsPicture,
            id: 'sendAsPicture',
            onChange: this.handleChangeSendAsPicture,
            type: 'checkbox' }),
          _react2.default.createElement('label', { htmlFor: 'sendAsPicture' })
        )
      )
    );
  };

  Attachment.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'attachment row' },
      _react2.default.createElement(
        'div',
        { className: 'attachment__preview col-xs-5' },
        this.renderPreview()
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-xs-7', style: { paddingLeft: 16 } },
        this.renderName(),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs' },
            this.renderType()
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs' },
            this.renderSize()
          )
        ),
        this.renderOptions()
      )
    );
  };

  return Attachment;
}(_react.Component);

Attachment.propTypes = {
  attachment: _react.PropTypes.object.isRequired
};
exports.default = Attachment;
//# sourceMappingURL=Attachment.react.js.map