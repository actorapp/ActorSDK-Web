'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStateFromStores = function getStateFromStores() {
  return {
    isOpen: _InviteUserStore2.default.isModalOpen(),
    contacts: _PeopleStore2.default.getList(),
    group: _InviteUserStore2.default.getGroup()
  };
};

var hasMember = function hasMember(group, userId) {
  return undefined !== (0, _lodash.find)(group.members, function (c) {
    return c.peerInfo.peer.id === userId;
  });
};

var InviteUser = (function (_React$Component) {
  _inherits(InviteUser, _React$Component);

  function InviteUser(props) {
    _classCallCheck(this, InviteUser);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InviteUser).call(this, props));

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

  _createClass(InviteUser, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _InviteUserStore2.default.removeChangeListener(this.onChange);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextState.isOpen && !this.state.isOpen) {
        document.addEventListener('keydown', this.onKeyDown, false);
      } else if (!nextState.isOpen && this.state.isOpen) {
        document.removeEventListener('keydown', this.onKeyDown, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var contacts = _state.contacts;
      var group = _state.group;
      var search = _state.search;
      var isOpen = _state.isOpen;

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
            this.getIntlMessage('inviteModalNotFound')
          ));
        }

        return _react2.default.createElement(
          _reactModal2.default,
          { className: 'modal-new modal-new--invite contacts',
            closeTimeoutMS: 150,
            isOpen: isOpen,
            style: { width: 440 } },
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
              this.getIntlMessage('inviteModalTitle')
            ),
            _react2.default.createElement(
              'div',
              { className: 'pull-right' },
              _react2.default.createElement(
                'button',
                { className: 'button button--lightblue', onClick: this.onClose },
                this.getIntlMessage('button.done')
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
                placeholder: this.getIntlMessage('inviteModalSearch'),
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
              this.getIntlMessage('inviteByLink')
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
    }
  }]);

  return InviteUser;
})(_react2.default.Component);

_reactMixin2.default.onClass(InviteUser, _reactIntl.IntlMixin);

exports.default = InviteUser;
//# sourceMappingURL=InviteUser.react.js.map