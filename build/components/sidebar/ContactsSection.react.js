'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _ActorTheme = require('../../constants/ActorTheme');

var _ActorTheme2 = _interopRequireDefault(_ActorTheme);

var _PeopleStore = require('../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _AddContactStore = require('../../stores/AddContactStore');

var _AddContactStore2 = _interopRequireDefault(_AddContactStore);

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _AddContactActionCreators = require('../../actions/AddContactActionCreators');

var _AddContactActionCreators2 = _interopRequireDefault(_AddContactActionCreators);

var _ContactsSectionItem = require('./ContactsSectionItem.react');

var _ContactsSectionItem2 = _interopRequireDefault(_ContactsSectionItem);

var _AddContact = require('../modals/AddContact.react');

var _AddContact2 = _interopRequireDefault(_AddContact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThemeManager = new _materialUi.Styles.ThemeManager();

var getStateFromStores = function getStateFromStores() {
  return {
    isAddContactModalOpen: _AddContactStore2.default.isOpen(),
    contacts: _PeopleStore2.default.getList()
  };
};

var ContactsSection = (function (_Component) {
  _inherits(ContactsSection, _Component);

  _createClass(ContactsSection, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ContactActionCreators2.default.close();
      _PeopleStore2.default.removeChangeListener(this.onChange);
      _AddContactStore2.default.removeChangeListener(this.onChange);
    }
  }]);

  function ContactsSection(props) {
    _classCallCheck(this, ContactsSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactsSection).call(this, props));

    _this.onChange = function () {
      _this.setState(getStateFromStores());
    };

    _this.openAddContactModal = function () {
      _AddContactActionCreators2.default.openModal();
    };

    _this.state = getStateFromStores();

    _ContactActionCreators2.default.open();
    _PeopleStore2.default.addChangeListener(_this.onChange);
    _AddContactStore2.default.addChangeListener(_this.onChange);

    ThemeManager.setTheme(_ActorTheme2.default);
    return _this;
  }

  _createClass(ContactsSection, [{
    key: 'render',
    value: function render() {
      var contacts = this.state.contacts;

      var contactList = _.map(contacts, function (contact, i) {
        return _react2.default.createElement(_ContactsSectionItem2.default, { contact: contact, key: i });
      });

      var addContactModal = undefined;
      if (this.state.isAddContactModalOpen) {
        addContactModal = _react2.default.createElement(_AddContact2.default, null);
      }

      return _react2.default.createElement(
        'section',
        { className: 'sidebar__contacts' },
        _react2.default.createElement(
          'ul',
          { className: 'sidebar__list sidebar__list--contacts' },
          contactList
        ),
        _react2.default.createElement(
          'footer',
          null,
          _react2.default.createElement(_materialUi.RaisedButton, { label: 'Add contact', onClick: this.openAddContactModal, style: { width: '100%' } }),
          addContactModal
        )
      );
    }
  }]);

  return ContactsSection;
})(_react.Component);

ContactsSection.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object
};
exports.default = ContactsSection;
//# sourceMappingURL=ContactsSection.react.js.map