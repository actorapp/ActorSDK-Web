'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

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

var Contacts = (function (_Component) {
  _inherits(Contacts, _Component);

  function Contacts(props) {
    _classCallCheck(this, Contacts);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Contacts).call(this, props));

    _this.handleChange = function () {
      return _this.setState(getStateFromStores());
    };

    _this.handleClose = function () {
      return _ContactActionCreators2.default.close();
    };

    _this.handleSearchChange = function (event) {
      return _this.setState({ search: event.target.value });
    };

    _this.handleContactSelect = function (contact) {
      _DialogActionCreators2.default.selectDialogPeerUser(contact.uid);
      _this.handleClose();
    };

    _this.state = (0, _lodash.assign)({
      search: ''
    }, getStateFromStores());
    return _this;
  }

  _createClass(Contacts, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _ContactStore2.default.addChangeListener(this.handleChange);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _react2.default.findDOMNode(this.refs.search).focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ContactStore2.default.removeChangeListener(this.handleChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var contacts = _state.contacts;
      var search = _state.search;

      var contactList = [];

      (0, _lodash.forEach)(contacts, function (contact, i) {
        var name = contact.name.toLowerCase();
        if (name.includes(search.toLowerCase())) {
          contactList.push(_react2.default.createElement(_ContactItem2.default, { contact: contact, key: i, onSelect: _this2.handleContactSelect }));
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
        'div',
        { className: 'newmodal newmodal__contacts' },
        _react2.default.createElement(
          'header',
          { className: 'newmodal__header' },
          _react2.default.createElement(
            'h2',
            null,
            this.getIntlMessage('modal.contacts.title')
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'newmodal__search' },
          _react2.default.createElement('input', { className: 'newmodal__search__input',
            onChange: this.handleSearchChange,
            placeholder: this.getIntlMessage('modal.contacts.search'),
            type: 'search',
            ref: 'search',
            value: search })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'newmodal__result contacts__list' },
          contactList
        )
      );
    }
  }]);

  return Contacts;
})(_react.Component);

_reactMixin2.default.onClass(Contacts, _reactIntl.IntlMixin);

exports.default = Contacts;