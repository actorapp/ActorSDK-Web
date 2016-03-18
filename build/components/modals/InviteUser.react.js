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

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _InviteUserActions = require('../../actions/InviteUserActions');

var _InviteUserActions2 = _interopRequireDefault(_InviteUserActions);

var _InviteUserByLinkActions = require('../../actions/InviteUserByLinkActions');

var _InviteUserByLinkActions2 = _interopRequireDefault(_InviteUserByLinkActions);

var _PeopleStore = require('../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _InviteUserStore = require('../../stores/InviteUserStore');

var _InviteUserStore2 = _interopRequireDefault(_InviteUserStore);

var _ContactItem = require('./invite-user/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStateFromStores = function getStateFromStores() {
  return {
    isOpen: _InviteUserStore2.default.isModalOpen(),
    contacts: _PeopleStore2.default.getList(),
    group: _InviteUserStore2.default.getGroup()
  };
}; /*
    * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
    */

var hasMember = function hasMember(group, userId) {
  return undefined !== (0, _lodash.find)(group.members, function (c) {
    return c.peerInfo.peer.id === userId;
  });
};

var InviteUser = function (_Component) {
  (0, _inherits3.default)(InviteUser, _Component);

  function InviteUser(props) {
    (0, _classCallCheck3.default)(this, InviteUser);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onChange = function () {
      return _this.setState(getStateFromStores());
    };

    _this.onClose = function () {
      return _InviteUserActions2.default.hide();
    };

    _this.onContactSelect = function (contact) {
      return _InviteUserActions2.default.inviteUser(_this.state.group.id, contact.uid);
    };

    _this.onSearchChange = function (event) {
      return _this.setState({ search: event.target.value });
    };

    _this.onInviteUrlByClick = function () {
      var group = _this.state.group;


      _InviteUserByLinkActions2.default.show(group);
      _InviteUserActions2.default.hide();
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.onClose();
      }
    };

    _this.state = (0, _lodash.assign)({
      search: ''
    }, getStateFromStores());

    _InviteUserStore2.default.addChangeListener(_this.onChange);
    _PeopleStore2.default.addListener(_this.onChange);
    return _this;
  }

  InviteUser.prototype.componentWillUnmount = function componentWillUnmount() {
    _InviteUserStore2.default.removeChangeListener(this.onChange);
  };

  InviteUser.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextState.isOpen && !this.state.isOpen) {
      document.addEventListener('keydown', this.onKeyDown, false);
    } else if (!nextState.isOpen && this.state.isOpen) {
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  };

  InviteUser.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state;
    var contacts = _state.contacts;
    var group = _state.group;
    var search = _state.search;
    var isOpen = _state.isOpen;
    var intl = this.context.intl;


    var contactList = [];

    if (isOpen) {

      (0, _lodash.forEach)(contacts, function (contact, i) {
        var name = contact.name.toLowerCase();
        if (name.includes(search.toLowerCase())) {
          if (!hasMember(group, contact.uid)) {
            contactList.push(_react2.default.createElement(_ContactItem2.default, { contact: contact, key: i, onSelect: _this2.onContactSelect }));
          } else {
            contactList.push(_react2.default.createElement(_ContactItem2.default, { contact: contact, key: i, isMember: true }));
          }
        }
      }, this);

      if (contactList.length === 0) {
        contactList.push(_react2.default.createElement(
          'li',
          { className: 'contacts__list__item contacts__list__item--empty text-center' },
          intl.messages['inviteModalNotFound']
        ));
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
            contactList
          )
        )
      );
    } else {
      return null;
    }
  };

  return InviteUser;
}(_react.Component);

InviteUser.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = InviteUser;
//# sourceMappingURL=InviteUser.react.js.map