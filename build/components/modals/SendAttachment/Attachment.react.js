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

var _humanFileSize = require('../../../utils/humanFileSize');

var _humanFileSize2 = _interopRequireDefault(_humanFileSize);

var _AttachmentsActionCreators = require('../../../actions/AttachmentsActionCreators');

var _AttachmentsActionCreators2 = _interopRequireDefault(_AttachmentsActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attachment = function (_Component) {
  (0, _inherits3.default)(Attachment, _Component);

  function Attachment(props) {
    (0, _classCallCheck3.default)(this, Attachment);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.changeAttachment = function () {
      var sendAsPicture = _this.props.attachment.sendAsPicture;

      _AttachmentsActionCreators2.default.changeAttachment(!sendAsPicture);
    };

    return _this;
  }

  Attachment.prototype.render = function render() {
    var attachment = this.props.attachment;
    var intl = this.context.intl;


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
            intl.messages['modal.attachments.name']
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
                intl.messages['modal.attachments.type']
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
                intl.messages['modal.attachments.size']
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
            intl.messages['modal.attachments.extra']
          ),
          _react2.default.createElement(
            'div',
            { className: 'attachment__extra__switcher' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'sendAsPicture', className: 'switch-label' },
              intl.messages['modal.attachments.sendAsPicture']
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
  };

  return Attachment;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

Attachment.propTypes = {
  attachment: _react.PropTypes.object.isRequired
};
Attachment.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = Attachment;
//# sourceMappingURL=Attachment.react.js.map