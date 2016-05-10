'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactIntl = require('react-intl');

var _utils = require('flux/utils');

var _InviteUserByLinkActions = require('../../actions/InviteUserByLinkActions');

var _InviteUserByLinkActions2 = _interopRequireDefault(_InviteUserByLinkActions);

var _InviteUserStore = require('../../stores/InviteUserStore');

var _InviteUserStore2 = _interopRequireDefault(_InviteUserStore);

var _SvgIcon = require('../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var InviteByLink = function (_Component) {
  _inherits(InviteByLink, _Component);

  InviteByLink.getStores = function getStores() {
    return [_InviteUserStore2.default];
  };

  InviteByLink.calculateState = function calculateState() {
    return {
      group: _InviteUserStore2.default.getGroup(),
      inviteUrl: _InviteUserStore2.default.getInviteUrl()
    };
  };

  function InviteByLink(props) {
    _classCallCheck(this, InviteByLink);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleInviteLinkSelect = _this.handleInviteLinkSelect.bind(_this);
    _this.handleBackClick = _this.handleBackClick.bind(_this);
    return _this;
  }

  InviteByLink.prototype.handleClose = function handleClose() {
    _InviteUserByLinkActions2.default.hide();
  };

  InviteByLink.prototype.handleInviteLinkSelect = function handleInviteLinkSelect(event) {
    event.target.select();
  };

  InviteByLink.prototype.handleBackClick = function handleBackClick() {
    this.handleClose();
  };

  InviteByLink.prototype.renderControls = function renderControls() {
    {/* TODO : Implement token copy and revoke functional */}
    return _react2.default.createElement(
      'footer',
      { className: 'modal__footer' },
      _react2.default.createElement(
        'button',
        { className: 'button button--rised pull-left hide' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'invite.byLink.revoke' })
      ),
      _react2.default.createElement(
        'button',
        { className: 'button button--rised pull-right hide' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'invite.byLink.copy' })
      )
    );
  };

  InviteByLink.prototype.render = function render() {
    var _state = this.state;
    var group = _state.group;
    var inviteUrl = _state.inviteUrl;


    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay',
        className: 'modal',
        onRequestClose: this.handleClose,
        isOpen: true },
      _react2.default.createElement(
        'div',
        { className: 'invite-by-link' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(_SvgIcon2.default, {
              className: 'modal__header__icon icon icon--blue',
              glyph: 'back',
              onClick: this.handleBackClick }),
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'invite.byLink.title', tagName: 'h1' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__body' },
            _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'invite.byLink.description', values: { groupName: group.name } }),
            _react2.default.createElement('textarea', {
              className: 'textarea',
              onClick: this.handleInviteLinkSelect,
              readOnly: true,
              row: '3',
              value: inviteUrl })
          )
        )
      )
    );
  };

  return InviteByLink;
}(_react.Component);

exports.default = _utils.Container.create(InviteByLink);
//# sourceMappingURL=InviteByLink.react.js.map