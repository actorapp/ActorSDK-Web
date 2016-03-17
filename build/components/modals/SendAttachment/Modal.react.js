'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactDom = require('react-dom');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _AttachmentsActionCreators = require('../../../actions/AttachmentsActionCreators');

var _AttachmentsActionCreators2 = _interopRequireDefault(_AttachmentsActionCreators);

var _AttachmentStore = require('../../../stores/AttachmentStore');

var _AttachmentStore2 = _interopRequireDefault(_AttachmentStore);

var _Attachment = require('./Attachment.react');

var _Attachment2 = _interopRequireDefault(_Attachment);

var _Pagination = require('./Pagination.react');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SendAttachment = function (_Component) {
  _inherits(SendAttachment, _Component);

  function SendAttachment(props) {
    _classCallCheck(this, SendAttachment);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClose = function () {
      return _AttachmentsActionCreators2.default.hide();
    };

    _this.handleKeyDown = function (event) {
      event.preventDefault();
      switch (event.keyCode) {
        case _ActorAppConstants.KeyCodes.ESC:
          _this.handleClose();
          break;
        case _ActorAppConstants.KeyCodes.ENTER:
          if (event.shiftKey) {
            _this.handleSendAll();
          } else {
            _this.handleSend();
          }
          break;
      }
    };

    _this.handleSelect = function (index) {
      return _AttachmentsActionCreators2.default.selectAttachment(index);
    };

    _this.handleCancel = function () {
      return _AttachmentsActionCreators2.default.deleteAttachment();
    };

    _this.handleSend = function () {
      return _AttachmentsActionCreators2.default.sendAttachment(_AttachmentStore2.default.getAttachment(), _this.state.selectedIndex);
    };

    _this.handleSendAll = function () {
      return _AttachmentsActionCreators2.default.sendAll(_this.state.attachments);
    };

    return _this;
  }

  SendAttachment.getStores = function getStores() {
    return [_AttachmentStore2.default];
  };

  SendAttachment.calculateState = function calculateState() {
    return {
      isOpen: _AttachmentStore2.default.isOpen(),
      attachments: _AttachmentStore2.default.getAllAttachments(),
      selectedIndex: _AttachmentStore2.default.getSelectedIndex()
    };
  };

  SendAttachment.prototype.componentWillMount = function componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  SendAttachment.prototype.componentDidMount = function componentDidMount() {
    (0, _reactDom.findDOMNode)(this.refs.send).focus();
  };

  SendAttachment.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  SendAttachment.prototype.render = function render() {
    var _state = this.state;
    var isOpen = _state.isOpen;
    var attachments = _state.attachments;
    var selectedIndex = _state.selectedIndex;
    var intl = this.context.intl;

    var isSingleFile = attachments.length > 1;
    var modalStyle = {
      content: {
        position: null,
        top: null,
        left: null,
        right: null,
        bottom: null,
        border: null,
        background: null,
        overflow: null,
        outline: null,
        padding: null,
        borderRadius: null,
        width: 700
      }
    };

    return _react2.default.createElement(
      _reactModal2.default,
      { className: 'modal-new modal-new--attachments',
        closeTimeoutMS: 150,
        isOpen: isOpen,
        style: modalStyle },
      _react2.default.createElement(
        'header',
        { className: 'modal-new__header' },
        _react2.default.createElement(
          'h3',
          { className: 'modal-new__header__title' },
          intl.messages['modal.attachments.title']
        ),
        isSingleFile ? _react2.default.createElement(
          'button',
          { className: 'button button--lightblue pull-right',
            onClick: this.handleSendAll },
          intl.messages['button.sendAll']
        ) : null
      ),
      _react2.default.createElement(
        'section',
        { className: 'modal-new__body' },
        _react2.default.createElement(_Attachment2.default, { attachment: attachments[selectedIndex] })
      ),
      _react2.default.createElement(
        'footer',
        { className: 'modal-new__footer row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs' },
          isSingleFile ? _react2.default.createElement(_Pagination2.default, { current: selectedIndex,
            total: attachments.length - 1,
            onChange: this.handleSelect }) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs text-right' },
          _react2.default.createElement(
            'button',
            { className: 'button',
              onClick: this.handleCancel },
            intl.messages['button.cancel']
          ),
          _react2.default.createElement(
            'button',
            { className: 'button button--rised', ref: 'send',
              onClick: this.handleSend },
            intl.messages['button.send']
          )
        )
      )
    );
  };

  return SendAttachment;
}(_react.Component);

SendAttachment.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(SendAttachment, { pure: false });
//# sourceMappingURL=Modal.react.js.map