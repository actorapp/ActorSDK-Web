'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _utils = require('flux/utils');

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _GroupUtils = require('../../utils/GroupUtils');

var _InviteUserActions = require('../../actions/InviteUserActions');

var _InviteUserActions2 = _interopRequireDefault(_InviteUserActions);

var _InviteUserByLinkActions = require('../../actions/InviteUserByLinkActions');

var _InviteUserByLinkActions2 = _interopRequireDefault(_InviteUserByLinkActions);

var _PeopleStore = require('../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _InviteUserStore = require('../../stores/InviteUserStore');

var _InviteUserStore2 = _interopRequireDefault(_InviteUserStore);

var _ContactItem = require('../common/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

var _Stateful = require('../common/Stateful.react');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var InviteUser = function (_Component) {
  _inherits(InviteUser, _Component);

  InviteUser.getStores = function getStores() {
    return [_InviteUserStore2.default, _PeopleStore2.default];
  };

  InviteUser.calculateState = function calculateState() {
    return {
      contacts: _PeopleStore2.default.getState(),
      group: _InviteUserStore2.default.getState().group,
      users: _InviteUserStore2.default.getState().users
    };
  };

  function InviteUser(props, context) {
    _classCallCheck(this, InviteUser);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.handleClose = _this.handleClose.bind(_this);
    _this.onSearchChange = _this.onSearchChange.bind(_this);
    _this.onContactSelect = _this.onContactSelect.bind(_this);
    _this.onInviteUrlByClick = _this.onInviteUrlByClick.bind(_this);
    return _this;
  }

  InviteUser.prototype.handleClose = function handleClose() {
    _InviteUserActions2.default.hide();
  };

  InviteUser.prototype.onContactSelect = function onContactSelect(uid) {
    _InviteUserActions2.default.inviteUser(this.state.group.id, uid);
  };

  InviteUser.prototype.onInviteUrlByClick = function onInviteUrlByClick() {
    var group = this.state.group;


    _InviteUserByLinkActions2.default.show(group, _ActorAppConstants.ModalTypes.INVITE);
  };

  InviteUser.prototype.onSearchChange = function onSearchChange(event) {
    this.setState({ search: event.target.value });
  };

  InviteUser.prototype.getContacts = function getContacts() {
    var _state = this.state;
    var contacts = _state.contacts;
    var search = _state.search;

    if (!search) return contacts;

    return contacts.filter(function (contact) {
      return _fuzzaldrin2.default.score(contact.name, search) > 0;
    });
  };

  InviteUser.prototype.renderContacts = function renderContacts() {
    var _this2 = this;

    var _state2 = this.state;
    var group = _state2.group;
    var users = _state2.users;

    var contacts = this.getContacts();

    if (!contacts.length) {
      return _react2.default.createElement(
        'li',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'invite.notFound' })
      );
    }

    return contacts.map(function (contact) {

      var isMember = (0, _GroupUtils.hasMember)(group.id, contact.uid);
      var currentState = isMember ? _ActorAppConstants.AsyncActionStates.SUCCESS : users[contact.uid] || _ActorAppConstants.AsyncActionStates.PENDING;

      var onClick = function onClick() {
        console.log('%c Trying to invite "' + contact.name + '"(uid=' + contact.uid + ') to group ' + group.id, 'color: #fd5c52');
        _this2.onContactSelect(contact.uid);
      };

      var contactClassName = (0, _classnames2.default)({
        'contact--disabled': currentState === _ActorAppConstants.AsyncActionStates.SUCCESS
      });

      return _react2.default.createElement(
        _ContactItem2.default,
        _extends({}, contact, { className: contactClassName, key: contact.uid }),
        _react2.default.createElement(_Stateful2.default, {
          currentState: currentState,
          pending: _react2.default.createElement(
            'a',
            { className: 'material-icons', onClick: onClick },
            'person_add'
          ),
          processing: _react2.default.createElement(
            'i',
            { className: 'material-icons spin' },
            'autorenew'
          ),
          success: _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'check'
          ),
          failure: _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'warning'
          )
        })
      );
    });
  };

  InviteUser.prototype.renderSearch = function renderSearch() {
    var search = this.state.search;
    var intl = this.context.intl;


    return _react2.default.createElement(
      'div',
      { className: 'small-search' },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'search'
      ),
      _react2.default.createElement('input', { className: 'input',
        onChange: this.onSearchChange,
        ref: 'search',
        placeholder: intl.messages['invite.search'],
        type: 'search',
        value: search })
    );
  };

  InviteUser.prototype.inviteByLinkButton = function inviteByLinkButton() {
    return _react2.default.createElement(
      'a',
      { className: 'link link--blue', onClick: this.onInviteUrlByClick },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'link'
      ),
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'invite.inviteByLink' })
    );
  };

  InviteUser.prototype.render = function render() {
    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay',
        className: 'modal',
        onRequestClose: this.handleClose,
        isOpen: true },
      _react2.default.createElement(
        'div',
        { className: 'invite' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(
              'i',
              { className: 'modal__header__icon material-icons' },
              'person_add'
            ),
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'invite.title', tagName: 'h1' }),
            _react2.default.createElement(
              'button',
              { className: 'button button--lightblue', onClick: this.handleClose },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.done' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__body' },
            this.renderSearch(),
            this.inviteByLinkButton(),
            _react2.default.createElement(
              'ul',
              { className: 'contacts__list' },
              this.renderContacts()
            )
          )
        )
      )
    );
  };

  return InviteUser;
}(_react.Component);

InviteUser.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(InviteUser);
//# sourceMappingURL=Invite.react.js.map