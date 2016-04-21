'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactIntl = require('react-intl');

var _utils = require('flux/utils');

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var InviteByLink = function (_Component) {
  _inherits(InviteByLink, _Component);

  function InviteByLink() {
    var _temp, _this, _ret;

    _classCallCheck(this, InviteByLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClose = function () {
      return _InviteUserByLinkActions2.default.hide();
    }, _this.onInviteLinkClick = function (event) {
      return event.target.select();
    }, _this.onBackClick = function () {
      var group = _this.state.group;


      _this.onClose();
      _InviteUserActions2.default.show(group);
    }, _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.onClose();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  InviteByLink.getStores = function getStores() {
    return [_InviteUserStore2.default];
  };

  InviteByLink.calculateState = function calculateState() {
    return {
      isOpen: _InviteUserStore2.default.isInviteWithLinkModalOpen(),
      group: _InviteUserStore2.default.getGroup(),
      inviteUrl: _InviteUserStore2.default.getInviteUrl()
    };
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
exports.default = _utils.Container.create(InviteByLink);
//# sourceMappingURL=InviteByLink.react.js.map