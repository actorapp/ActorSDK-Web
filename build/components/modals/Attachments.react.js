'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactDom = require('react-dom');

var _reactIntl = require('react-intl');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _AttachmentsActionCreators = require('../../actions/AttachmentsActionCreators');

var _AttachmentsActionCreators2 = _interopRequireDefault(_AttachmentsActionCreators);

var _AttachmentsStore = require('../../stores/AttachmentsStore');

var _AttachmentsStore2 = _interopRequireDefault(_AttachmentsStore);

var _Attachment = require('./attachments/Attachment.react');

var _Attachment2 = _interopRequireDefault(_Attachment);

var _Pagination = require('./attachments/Pagination.react');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Attachments = function (_Component) {
  _inherits(Attachments, _Component);

  Attachments.getStores = function getStores() {
    return [_AttachmentsStore2.default];
  };

  Attachments.calculateState = function calculateState() {
    return {
      attachments: _AttachmentsStore2.default.getAllAttachments(),
      selectedIndex: _AttachmentsStore2.default.getSelectedIndex()
    };
  };

  function Attachments(props) {
    _classCallCheck(this, Attachments);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.handleSend = _this.handleSend.bind(_this);
    _this.handleSendAll = _this.handleSendAll.bind(_this);
    return _this;
  }

  Attachments.prototype.componentWillMount = function componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  Attachments.prototype.componentDidMount = function componentDidMount() {
    (0, _reactDom.findDOMNode)(this.refs.send).focus();
  };

  Attachments.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  Attachments.prototype.handleClose = function handleClose() {
    _AttachmentsActionCreators2.default.hide();
  };

  Attachments.prototype.handleKeyDown = function handleKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.ENTER) {
      event.preventDefault();
      if (event.shiftKey) {
        this.handleSendAll();
      } else {
        this.handleSend();
      }
    }
  };

  Attachments.prototype.handleSelect = function handleSelect(index) {
    _AttachmentsActionCreators2.default.selectAttachment(index);
  };

  Attachments.prototype.handleCancel = function handleCancel() {
    _AttachmentsActionCreators2.default.deleteAttachment();
  };

  Attachments.prototype.handleSend = function handleSend() {
    _AttachmentsActionCreators2.default.sendAttachment();
  };

  Attachments.prototype.handleSendAll = function handleSendAll() {
    _AttachmentsActionCreators2.default.sendAll(this.state.attachments);
  };

  Attachments.prototype.renderHeaderButton = function renderHeaderButton() {
    var attachments = this.state.attachments;

    if (attachments.length <= 1) return null;

    return _react2.default.createElement(
      'button',
      { className: 'button button--lightblue', onClick: this.handleSendAll },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.sendAll' })
    );
  };

  Attachments.prototype.renderAttachment = function renderAttachment() {
    var _state = this.state;
    var attachments = _state.attachments;
    var selectedIndex = _state.selectedIndex;

    if (attachments.length === 0) return null;

    return _react2.default.createElement(_Attachment2.default, { attachment: attachments[selectedIndex] });
  };

  Attachments.prototype.renderPagination = function renderPagination() {
    var _state2 = this.state;
    var attachments = _state2.attachments;
    var selectedIndex = _state2.selectedIndex;

    if (attachments.length <= 1) return null;

    return _react2.default.createElement(
      'div',
      { className: 'col-xs' },
      _react2.default.createElement(_Pagination2.default, {
        current: selectedIndex,
        total: attachments.length - 1,
        onChange: this.handleSelect
      })
    );
  };

  Attachments.prototype.renderControls = function renderControls() {
    return _react2.default.createElement(
      'div',
      { className: 'col-xs text-right' },
      _react2.default.createElement(
        'button',
        { className: 'button', onClick: this.handleCancel },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.cancel' })
      ),
      _react2.default.createElement(
        'button',
        { className: 'button button--rised', ref: 'send', onClick: this.handleSend },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.send' })
      )
    );
  };

  Attachments.prototype.render = function render() {
    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay',
        className: 'modal',
        onRequestClose: this.handleClose,
        isOpen: true },
      _react2.default.createElement(
        'div',
        { className: 'attachments' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.attachments.title', tagName: 'h1' }),
            this.renderHeaderButton()
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__body' },
            this.renderAttachment()
          ),
          _react2.default.createElement(
            'footer',
            { className: 'modal__footer row' },
            this.renderPagination(),
            this.renderControls()
          )
        )
      )
    );
  };

  return Attachments;
}(_react.Component);

exports.default = _utils.Container.create(Attachments);
//# sourceMappingURL=Attachments.react.js.map