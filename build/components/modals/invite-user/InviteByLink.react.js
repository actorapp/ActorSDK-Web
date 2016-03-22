'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactIntl = require('react-intl');

var _EmojiUtils = require('../../../utils/EmojiUtils');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _SvgIcon = require('../../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _InviteUserByLinkActions = require('../../../actions/InviteUserByLinkActions');

var _InviteUserByLinkActions2 = _interopRequireDefault(_InviteUserByLinkActions);

var _InviteUserActions = require('../../../actions/InviteUserActions');

var _InviteUserActions2 = _interopRequireDefault(_InviteUserActions);

var _InviteUserStore = require('../../../stores/InviteUserStore');

var _InviteUserStore2 = _interopRequireDefault(_InviteUserStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

; /*
   * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
   */

var getStateFromStores = function getStateFromStores() {
  return {
    isOpen: _InviteUserStore2.default.isInviteWithLinkModalOpen(),
    group: _InviteUserStore2.default.getGroup(),
    inviteUrl: _InviteUserStore2.default.getInviteUrl()
  };
};

var InviteByLink = function (_Component) {
  (0, _inherits3.default)(InviteByLink, _Component);

  function InviteByLink(props) {
    (0, _classCallCheck3.default)(this, InviteByLink);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onChange = function () {
      return _this.setState(getStateFromStores());
    };

    _this.onClose = function () {
      return _InviteUserByLinkActions2.default.hide();
    };

    _this.onInviteLinkClick = function (event) {
      return event.target.select();
    };

    _this.onBackClick = function () {
      var group = _this.state.group;


      _this.onClose();
      _InviteUserActions2.default.show(group);
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.onClose();
      }
    };

    _this.state = getStateFromStores();

    _InviteUserStore2.default.addChangeListener(_this.onChange);
    return _this;
  }

  InviteByLink.prototype.componentWillUnmount = function componentWillUnmount() {
    _InviteUserStore2.default.removeChangeListener(this.onChange);
  };

  InviteByLink.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextState.isOpen && !this.state.isOpen) {
      document.addEventListener('keydown', this.onKeyDown, false);
    } else if (this.state.isOpen && !nextState.isOpen) {
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  };

  InviteByLink.prototype.render = function render() {
    var _state = this.state;
    var group = _state.group;
    var inviteUrl = _state.inviteUrl;
    var isOpen = _state.isOpen;
    var intl = this.context.intl;


    var groupName = group !== null ? _react2.default.createElement('b', { dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(group.name) } }) : null;

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
        width: 440
      }
    };

    if (isOpen) {
      return _react2.default.createElement(
        _reactModal2.default,
        { className: 'modal-new modal-new--invite-by-link',
          closeTimeoutMS: 150,
          isOpen: isOpen,
          style: modalStyle },
        _react2.default.createElement(
          'header',
          { className: 'modal-new__header' },
          _react2.default.createElement(_SvgIcon2.default, {
            className: 'modal-new__header__icon icon icon--blue',
            glyph: 'back',
            onClick: this.onBackClick
          }),
          _react2.default.createElement(
            'h3',
            { className: 'modal-new__header__title' },
            intl.messages['inviteByLinkModalTitle']
          ),
          _react2.default.createElement(
            'div',
            { className: 'pull-right' },
            _react2.default.createElement(
              'button',
              { className: 'button button--lightblue', onClick: this.onClose },
              intl.messages['button.done']
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-new__body' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'inviteByLinkModalDescription', values: { groupName: groupName } }),
          _react2.default.createElement('textarea', { className: 'textarea', onClick: this.onInviteLinkClick, readOnly: true, row: '3', value: inviteUrl })
        ),
        _react2.default.createElement(
          'footer',
          { className: 'modal-new__footer' },
          _react2.default.createElement(
            'button',
            { className: 'button button--rised pull-left hide' },
            intl.messages['inviteByLinkModalRevokeButton']
          ),
          _react2.default.createElement(
            'button',
            { className: 'button button--rised pull-right hide' },
            intl.messages['inviteByLinkModalCopyButton']
          )
        )
      );
    } else {
      return null;
    }
  };

  return InviteByLink;
}(_react.Component);

InviteByLink.contextTypes = {
  intl: _react.PropTypes.object
};


_reactMixin2.default.onClass(InviteByLink, _reactAddonsPureRenderMixin2.default);

exports.default = InviteByLink;
//# sourceMappingURL=InviteByLink.react.js.map