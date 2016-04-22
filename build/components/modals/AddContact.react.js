'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _AddContactActionCreators = require('../../actions/AddContactActionCreators');

var _AddContactActionCreators2 = _interopRequireDefault(_AddContactActionCreators);

var _AddContactStore = require('../../stores/AddContactStore');

var _AddContactStore2 = _interopRequireDefault(_AddContactStore);

var _TextField = require('../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

var _ContactItem = require('./addContact/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AddContact = function (_Component) {
  _inherits(AddContact, _Component);

  AddContact.getStores = function getStores() {
    return [_AddContactStore2.default];
  };

  AddContact.calculateState = function calculateState() {
    return {
      results: _AddContactStore2.default.getResults(),
      isSearching: _AddContactStore2.default.isSearching()
    };
  };

  function AddContact(props, context) {
    _classCallCheck(this, AddContact);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleQueryChange = _this.handleQueryChange.bind(_this);
    _this.findUsers = (0, _lodash.debounce)(_this.findUsers, 300, { trailing: true });
    _this.addContact = _this.addContact.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  AddContact.prototype.componentWillMount = function componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  AddContact.prototype.componentDidMount = function componentDidMount() {
    this.refs.query.focus();
  };

  AddContact.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  AddContact.prototype.handleClose = function handleClose() {
    _AddContactActionCreators2.default.close();
  };

  AddContact.prototype.handleQueryChange = function handleQueryChange(event) {
    var query = event.target.value;
    this.setState({ query: query });
    this.findUsers(query);
  };

  AddContact.prototype.findUsers = function findUsers(query) {
    _AddContactActionCreators2.default.findUsers(query);
  };

  AddContact.prototype.addContact = function addContact() {
    _AddContactActionCreators2.default.findUsers(this.state.query);
  };

  AddContact.prototype.handleKeyDown = function handleKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.ENTER) {
      event.preventDefault();
      this.addContact();
    }
  };

  AddContact.prototype.handleSelect = function handleSelect(uid, isContact) {
    _AddContactActionCreators2.default.addToContacts(uid, isContact);
    this.handleClose();
  };

  AddContact.prototype.renderUserSearchInput = function renderUserSearchInput() {
    var query = this.state.query;

    return _react2.default.createElement(_TextField2.default, {
      className: 'input__material--wide',
      floatingLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.addContact.query' }),
      onChange: this.handleQueryChange,
      ref: 'query',
      value: query });
  };

  AddContact.prototype.renderUserSearchResults = function renderUserSearchResults() {
    var _this2 = this;

    var _state = this.state;
    var query = _state.query;
    var results = _state.results;


    if (!query || query.length === '') {
      return _react2.default.createElement(
        'li',
        { className: 'add-contact__results__item add-contact__results__item--searching' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.addContact.empty' })
      );
    }

    // Disabled becouse searching is very fast and this message is blinking
    // if (isSearching) {
    //   return (
    //     <li className="add-contact__results__item add-contact__results__item--searching">
    //       <FormattedMessage id="modal.addContact.searching" values={{query}}/>
    //     </li>
    //   );
    // }

    if (results.length === 0) {
      return _react2.default.createElement(
        'li',
        { className: 'add-contact__results__item add-contact__results__item--not-found' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.addContact.notFound' })
      );
    }

    return results.map(function (result, index) {
      return _react2.default.createElement(_ContactItem2.default, _extends({ key: index }, result, { onSelect: _this2.handleSelect }));
    });
  };

  AddContact.prototype.render = function render() {
    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay',
        className: 'modal',
        onRequestClose: this.handleClose,
        isOpen: true },
      _react2.default.createElement(
        'div',
        { className: 'add-contact' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.addContact.title', tagName: 'h1' }),
            _react2.default.createElement(
              'a',
              { className: 'modal__header__close material-icons',
                onClick: this.handleClose },
              'clear'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__body' },
            this.renderUserSearchInput()
          ),
          _react2.default.createElement(
            'footer',
            { className: 'modal__footer' },
            _react2.default.createElement(
              'ul',
              { className: 'add-contact__results' },
              this.renderUserSearchResults()
            )
          )
        )
      )
    );
  };

  return AddContact;
}(_react.Component);

AddContact.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(AddContact);
//# sourceMappingURL=AddContact.react.js.map