'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _AddContactActionCreators = require('../../actions/AddContactActionCreators');

var _AddContactActionCreators2 = _interopRequireDefault(_AddContactActionCreators);

var _AddContactStore = require('../../stores/AddContactStore');

var _AddContactStore2 = _interopRequireDefault(_AddContactStore);

var _TextField = require('../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

var _ContactItem = require('./add-contact/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AddContact = (function (_Component) {
  _inherits(AddContact, _Component);

  function AddContact(props) {
    _classCallCheck(this, AddContact);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddContact).call(this, props));

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

  _createClass(AddContact, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.query.focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var isOpen = _state.isOpen;
      var isSearching = _state.isSearching;
      var query = _state.query;
      var results = _state.results;

      var isQueryEmpty = !query || query.length === '';

      var resultContacts = (0, _lodash.map)(results, function (result, index) {
        return _react2.default.createElement(_ContactItem2.default, _extends({ key: index }, result, { onSelect: _this2.handleSelect }));
      });

      if (resultContacts.length === 0 && !isQueryEmpty) {
        resultContacts.push(_react2.default.createElement(
          'li',
          { className: 'add-contact__results__item add-contact__results__item--not-found' },
          this.getIntlMessage('modal.addContact.notFound')
        ));
      }

      return _react2.default.createElement(
        _reactModal2.default,
        { className: 'modal-new modal-new--add-contact add-contact',
          closeTimeoutMS: 150,
          isOpen: isOpen,
          style: { width: 360 } },
        _react2.default.createElement(
          'header',
          { className: 'modal-new__header' },
          _react2.default.createElement(
            'h3',
            { className: 'modal-new__header__title' },
            this.getIntlMessage('modal.addContact.title')
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
            floatingLabel: this.getIntlMessage('modal.addContact.query'),
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
              this.getIntlMessage('modal.addContact.empty')
            ) : isSearching ? _react2.default.createElement(
              'li',
              { className: 'add-contact__results__item add-contact__results__item--searching' },
              _react2.default.createElement(_reactIntl.FormattedMessage, { message: this.getIntlMessage('modal.addContact.searching'), query: query })
            ) : resultContacts
          )
        )
      );
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        isOpen: _AddContactStore2.default.isOpen(),
        results: _AddContactStore2.default.getResults(),
        isSearching: _AddContactStore2.default.isSearching()
      };
    }
  }]);

  return AddContact;
})(_react.Component);

AddContact.getStores = function () {
  return [_AddContactStore2.default];
};

_reactMixin2.default.onClass(AddContact, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(AddContact);
//# sourceMappingURL=AddContact.react.js.map