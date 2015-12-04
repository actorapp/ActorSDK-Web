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

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _ContactStore = require('../../stores/ContactStore');

var _ContactStore2 = _interopRequireDefault(_ContactStore);

var _ContactItem = require('./contacts/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStateFromStores = function getStateFromStores() {
  return {
    isOpen: _ContactStore2.default.isContactsOpen(),
    contacts: _ContactStore2.default.getContacts()
  };
};

var ContactsModal = (function (_React$Component) {
  _inherits(ContactsModal, _React$Component);

  function ContactsModal(props) {
    _classCallCheck(this, ContactsModal);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactsModal).call(this, props));

    _this.onChange = function () {
      return _this.setState(getStateFromStores());
    };

    _this.handleClose = function () {
      return _ContactActionCreators2.default.close();
    };

    _this.onContactSelect = function (contact) {
      _DialogActionCreators2.default.selectDialogPeerUser(contact.uid);
      _this.handleClose();
    };

    _this.onSearchChange = function (event) {
      return _this.setState({ search: event.target.value });
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.handleClose();
      }
    };

    _this.state = (0, _lodash.assign)({
      search: ''
    }, getStateFromStores());

    _ContactStore2.default.addChangeListener(_this.onChange);
    document.addEventListener('keydown', _this.handleKeyDown, false);
    return _this;
  }

  _createClass(ContactsModal, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ContactStore2.default.removeChangeListener(this.onChange);
      document.removeEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var contacts = _state.contacts;
      var search = _state.search;
      var isOpen = _state.isOpen;

      var contactList = [];

      if (isOpen) {

        (0, _lodash.forEach)(contacts, function (contact, i) {
          var name = contact.name.toLowerCase();
          if (name.includes(search.toLowerCase())) {
            contactList.push(_react2.default.createElement(_ContactItem2.default, { contact: contact, key: i, onSelect: _this2.onContactSelect }));
          }
        }, this);

        if (contactList.length === 0) {
          contactList.push(_react2.default.createElement(
            'li',
            { className: 'contacts__list__item contacts__list__item--empty text-center' },
            this.getIntlMessage('modal.contacts.notFound')
          ));
        }

        return _react2.default.createElement(
          _reactModal2.default,
          { className: 'modal-new modal-new--contacts contacts',
            closeTimeoutMS: 150,
            isOpen: isOpen,
            style: { width: 340 } },
          _react2.default.createElement(
            'header',
            { className: 'modal-new__header' },
            _react2.default.createElement(
              'a',
              { className: 'modal-new__header__icon material-icons' },
              'person'
            ),
            _react2.default.createElement(
              'h3',
              { className: 'modal-new__header__title' },
              this.getIntlMessage('modal.contacts.title')
            ),
            _react2.default.createElement(
              'div',
              { className: 'pull-right' },
              _react2.default.createElement(
                'button',
                { className: 'button button--lightblue',
                  onClick: this.handleClose },
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
                placeholder: this.getIntlMessage('modal.contacts.search'),
                type: 'search',
                value: search })
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

  return ContactsModal;
})(_react2.default.Component);

_reactMixin2.default.onClass(ContactsModal, _reactIntl.IntlMixin);

exports.default = ContactsModal;
//# sourceMappingURL=Contacts.react.js.map