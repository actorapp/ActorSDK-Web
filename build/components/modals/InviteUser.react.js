'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _utils = require('flux/utils');

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

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

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var InviteUser = function (_Component) {
  (0, _inherits3.default)(InviteUser, _Component);

  function InviteUser() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, InviteUser);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClose = function () {
      return _InviteUserActions2.default.hide();
    }, _this.onContactSelect = function (uid) {
      return _InviteUserActions2.default.inviteUser(_this.state.group.id, uid);
    }, _this.onSearchChange = function (event) {
      return _this.setState({ search: event.target.value });
    }, _this.onInviteUrlByClick = function () {
      var group = _this.state.group;


      _InviteUserByLinkActions2.default.show(group);
      _InviteUserActions2.default.hide();
    }, _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.onClose();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  InviteUser.getStores = function getStores() {
    return [_InviteUserStore2.default, _PeopleStore2.default];
  };

  InviteUser.calculateState = function calculateState() {
    return {
      isOpen: _InviteUserStore2.default.isModalOpen(),
      contacts: _PeopleStore2.default.getList(),
      group: _InviteUserStore2.default.getGroup(),
      inviteUserState: _InviteUserStore2.default.getInviteUserState()
    };
  };

  InviteUser.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextState.isOpen && !this.state.isOpen) {
      document.addEventListener('keydown', this.onKeyDown, false);
    } else if (!nextState.isOpen && this.state.isOpen) {
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  };

  InviteUser.prototype.getContacts = function getContacts() {
    var _state = this.state;
    var contacts = _state.contacts;
    var search = _state.search;


    return _fuzzaldrin2.default.filter(contacts, search, {
      key: 'name'
    });
  };

  InviteUser.prototype.renderContacts = function renderContacts() {
    var _this2 = this;

    var intl = this.context.intl;
    var _state2 = this.state;
    var group = _state2.group;
    var inviteUserState = _state2.inviteUserState;

    var contacts = this.getContacts();

    if (!contacts.length) {
      return _react2.default.createElement(
        'li',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        intl.messages['inviteModalNotFound']
      );
    }

    return contacts.map(function (contact, i) {
      var controls = void 0,
          contactClassName = void 0;
      if ((0, _GroupUtils.hasMember)(group.id, contact.uid)) {
        controls = _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'check'
        );
        contactClassName = 'contact--disabled';
      } else {
        var currentState = inviteUserState[contact.uid] || _ActorAppConstants.AsyncActionStates.PENDING;
        var onClick = function onClick() {
          console.log('%c Trying to invite "' + contact.name + '"(uid=' + contact.uid + ') to group ' + group.id, 'color: #fd5c52');
          _this2.onContactSelect(contact.uid);
        };
        controls = _react2.default.createElement(_Stateful2.default, {
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
        });
        contactClassName = currentState === _ActorAppConstants.AsyncActionStates.SUCCESS ? 'contact--disabled' : '';
      }

      return _react2.default.createElement(
        _ContactItem2.default,
        (0, _extends3.default)({}, contact, { className: contactClassName, key: i }),
        controls
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
exports.default = _utils.Container.create(InviteUser, { pure: false });
//# sourceMappingURL=InviteUser.react.js.map