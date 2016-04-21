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

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _GroupUtils = require('../../utils/GroupUtils');

var _InviteUserActions = require('../../actions/InviteUserActions');

var _InviteUserActions2 = _interopRequireDefault(_InviteUserActions);

var _InviteUserByLinkActions = require('../../actions/InviteUserByLinkActions');

var _InviteUserByLinkActions2 = _interopRequireDefault(_InviteUserByLinkActions);

var _ContactsStore = require('../../stores/ContactsStore');

var _ContactsStore2 = _interopRequireDefault(_ContactsStore);

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
    return [_InviteUserStore2.default, _ContactsStore2.default];
  };

  InviteUser.calculateState = function calculateState() {
    var contacts = _ContactsStore2.default.getState();

    var _InviteUserStore$getS = _InviteUserStore2.default.getState();

    var isOpen = _InviteUserStore$getS.isOpen;
    var group = _InviteUserStore$getS.group;
    var users = _InviteUserStore$getS.users;
    var query = _InviteUserStore$getS.query;


    return {
      contacts: contacts,
      isOpen: isOpen,
      group: group,
      users: users,
      query: query
    };
  };

  function InviteUser(props, context) {
    _classCallCheck(this, InviteUser);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.onClose = _this.onClose.bind(_this);
    _this.onSearchChange = _this.onSearchChange.bind(_this);
    _this.onContactSelect = _this.onContactSelect.bind(_this);
    _this.onInviteUrlByClick = _this.onInviteUrlByClick.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  }

  InviteUser.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextState.isOpen && !this.state.isOpen) {
      document.addEventListener('keydown', this.onKeyDown, false);
    } else if (!nextState.isOpen && this.state.isOpen) {
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  };

  InviteUser.prototype.onClose = function onClose() {
    _InviteUserActions2.default.hide();
  };

  InviteUser.prototype.onSearchChange = function onSearchChange(event) {
    _InviteUserActions2.default.setQuery(event.target.value);
  };

  InviteUser.prototype.onContactSelect = function onContactSelect(uid) {
    _InviteUserActions2.default.inviteUser(this.state.group.id, uid);
  };

  InviteUser.prototype.onInviteUrlByClick = function onInviteUrlByClick() {
    var group = this.state.group;


    _InviteUserByLinkActions2.default.show(group);
    _InviteUserActions2.default.hide();
  };

  InviteUser.prototype.onKeyDown = function onKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      event.preventDefault();
      this.onClose();
    }
  };

  InviteUser.prototype.getContacts = function getContacts() {
    var _state = this.state;
    var contacts = _state.contacts;
    var query = _state.query;


    if (!query) {
      return contacts;
    }

    return contacts.filter(function (contact) {
      var score = _fuzzaldrin2.default.score(contact.name, query);
      return score > 0;
    });
  };

  InviteUser.prototype.renderContacts = function renderContacts() {
    var _this2 = this;

    var intl = this.context.intl;
    var _state2 = this.state;
    var group = _state2.group;
    var users = _state2.users;

    var contacts = this.getContacts();

    if (!contacts.length) {
      return _react2.default.createElement(
        'li',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        intl.messages['inviteModalNotFound']
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

  InviteUser.prototype.render = function render() {
    var _state3 = this.state;
    var isOpen = _state3.isOpen;
    var search = _state3.search;
    var intl = this.context.intl;


    if (!isOpen) {
      return null;
    }

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

    return _react2.default.createElement(
      _reactModal2.default,
      { className: 'modal-new modal-new--invite contacts',
        closeTimeoutMS: 150,
        isOpen: isOpen,
        style: modalStyle },
      _react2.default.createElement(
        'header',
        { className: 'modal-new__header' },
        _react2.default.createElement(
          'a',
          { className: 'modal-new__header__icon material-icons' },
          'person_add'
        ),
        _react2.default.createElement(
          'h3',
          { className: 'modal-new__header__title' },
          intl.messages['inviteModalTitle']
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
        _react2.default.createElement(
          'div',
          { className: 'modal-new__search' },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'search'
          ),
          _react2.default.createElement('input', { className: 'input input--search',
            onChange: this.onSearchChange,
            placeholder: intl.messages['inviteModalSearch'],
            type: 'search',
            value: search })
        ),
        _react2.default.createElement(
          'a',
          { className: 'link link--blue', onClick: this.onInviteUrlByClick },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'link'
          ),
          intl.messages['inviteByLink']
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'contacts__body' },
        _react2.default.createElement(
          'ul',
          { className: 'contacts__list' },
          this.renderContacts()
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
//# sourceMappingURL=InviteUser.react.js.map