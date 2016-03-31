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

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _AddContactActionCreators = require('../../actions/AddContactActionCreators');

var _AddContactActionCreators2 = _interopRequireDefault(_AddContactActionCreators);

var _AddContactStore = require('../../stores/AddContactStore');

var _AddContactStore2 = _interopRequireDefault(_AddContactStore);

var _TextField = require('../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

var _ContactItem = require('./AddContact/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddContact = function (_Component) {
  (0, _inherits3.default)(AddContact, _Component);

  function AddContact(props) {
    (0, _classCallCheck3.default)(this, AddContact);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.handleClose = function () {
      return _AddContactActionCreators2.default.close();
    };

    _this.handleQueryChange = function (event) {
      var query = event.target.value;
      _this.setState({ query: query });
      _this.findUsers(query);
    };

    _this.findUsers = (0, _lodash.debounce)(function (query) {
      _AddContactActionCreators2.default.findUsers(query);
    }, 300, { trailing: true });

    _this.addContact = function () {
      return _AddContactActionCreators2.default.findUsers(_this.state.query);
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.handleClose();
      } else if (event.keyCode === _ActorAppConstants.KeyCodes.ENTER) {
        event.preventDefault();
        _this.addContact();
      }
    };

    _this.handleSelect = function (uid, isContact) {
      _AddContactActionCreators2.default.addToContacts(uid, isContact);
      _this.handleClose();
    };

    return _this;
  }

  AddContact.getStores = function getStores() {
    return [_AddContactStore2.default];
  };

  AddContact.calculateState = function calculateState() {
    return {
      isOpen: _AddContactStore2.default.isOpen(),
      results: _AddContactStore2.default.getResults(),
      isSearching: _AddContactStore2.default.isSearching()
    };
  };

  AddContact.prototype.componentWillMount = function componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  AddContact.prototype.componentDidMount = function componentDidMount() {
    this.refs.query.focus();
  };

  AddContact.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  AddContact.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state;
    var isOpen = _state.isOpen;
    var query = _state.query;
    var results = _state.results;
    var intl = this.context.intl;

    var isQueryEmpty = !query || query.length === '';

    var resultContacts = (0, _lodash.map)(results, function (result, index) {
      return _react2.default.createElement(_ContactItem2.default, (0, _extends3.default)({ key: index }, result, { onSelect: _this2.handleSelect }));
    });

    if (resultContacts.length === 0 && !isQueryEmpty) {
      resultContacts.push(_react2.default.createElement(
        'li',
        { className: 'add-contact__results__item add-contact__results__item--not-found', key: 'not-found' },
        intl.messages['modal.addContact.notFound']
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
        width: 360
      }
    };

    return _react2.default.createElement(
      _reactModal2.default,
      { className: 'modal-new modal-new--add-contact add-contact',
        closeTimeoutMS: 150,
        isOpen: isOpen,
        style: modalStyle },
      _react2.default.createElement(
        'header',
        { className: 'modal-new__header' },
        _react2.default.createElement(
          'h3',
          { className: 'modal-new__header__title' },
          intl.messages['modal.addContact.title']
        ),
        _react2.default.createElement(
          'a',
          { className: 'modal-new__header__close modal-new__header__icon material-icons pull-right',
            onClick: this.handleClose },
          'clear'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'modal-new__body' },
        _react2.default.createElement(_TextField2.default, { className: 'input__material--wide',
          floatingLabel: intl.messages['modal.addContact.query'],
          onChange: this.handleQueryChange,
          ref: 'query',
          value: query })
      ),
      _react2.default.createElement(
        'footer',
        { className: 'modal-new__footer' },
        _react2.default.createElement(
          'ul',
          { className: 'add-contact__results' },
          isQueryEmpty ? _react2.default.createElement(
            'li',
            { className: 'add-contact__results__item add-contact__results__item--searching' },
            intl.messages['modal.addContact.empty']
          ) : resultContacts

          // Search is too fast for showing searching status.
          //: isSearching
          //  ? <li className="add-contact__results__item add-contact__results__item--searching">
          //      <FormattedMessage id="modal.addContact.searching" values={{query}}/>
          //    </li>
          //  : resultContacts

        )
      )
    );
  };

  return AddContact;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

AddContact.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(AddContact);
//# sourceMappingURL=AddContact.react.js.map