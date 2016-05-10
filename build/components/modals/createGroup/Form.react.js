'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _CreateGroupActionCreators = require('../../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _PeopleStore = require('../../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _CreateGroupStore = require('../../../stores/CreateGroupStore');

var _CreateGroupStore2 = _interopRequireDefault(_CreateGroupStore);

var _ContactItem = require('../../common/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

var _TextField = require('../../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CreateGroupForm = function (_Component) {
  _inherits(CreateGroupForm, _Component);

  CreateGroupForm.getStores = function getStores() {
    return [_CreateGroupStore2.default, _PeopleStore2.default];
  };

  CreateGroupForm.calculateState = function calculateState() {
    return {
      step: _CreateGroupStore2.default.getCurrentStep(),
      name: _CreateGroupStore2.default.getGroupName(),
      selectedUserIds: _CreateGroupStore2.default.getSelectedUserIds(),
      contacts: _PeopleStore2.default.getState()
    };
  };

  function CreateGroupForm(props, context) {
    _classCallCheck(this, CreateGroupForm);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.onContactToggle = _this.onContactToggle.bind(_this);
    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleNameSubmit = _this.handleNameSubmit.bind(_this);
    _this.handleCreateGroup = _this.handleCreateGroup.bind(_this);
    _this.onSearchChange = _this.onSearchChange.bind(_this);
    return _this;
  }

  CreateGroupForm.prototype.componentDidMount = function componentDidMount() {
    if (this.state.step === _ActorAppConstants.CreateGroupSteps.NAME_INPUT) {
      this.refs.name.focus();
    }
  };

  CreateGroupForm.prototype.getContacts = function getContacts() {
    var _state = this.state;
    var contacts = _state.contacts;
    var search = _state.search;


    return _fuzzaldrin2.default.filter(contacts, search, {
      key: 'name'
    });
  };

  CreateGroupForm.prototype.renderContacts = function renderContacts() {
    var _this2 = this;

    var selectedUserIds = this.state.selectedUserIds;

    var contacts = this.getContacts();

    if (!contacts.length) {
      return _react2.default.createElement(
        'li',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'invite.notFound' })
      );
    }

    return contacts.map(function (contact, i) {
      var isSelected = selectedUserIds.has(contact.uid);
      var icon = isSelected ? 'check_box' : 'check_box_outline_blank';

      return _react2.default.createElement(
        _ContactItem2.default,
        _extends({}, contact, { key: i }),
        _react2.default.createElement(
          'a',
          { className: 'material-icons', onClick: function onClick() {
              return _this2.onContactToggle(contact, !isSelected);
            } },
          icon
        )
      );
    });
  };

  CreateGroupForm.prototype.onContactToggle = function onContactToggle(contact, isSelected) {
    var selectedUserIds = this.state.selectedUserIds;


    if (isSelected) {
      _CreateGroupActionCreators2.default.setSelectedUserIds(selectedUserIds.add(contact.uid));
    } else {
      _CreateGroupActionCreators2.default.setSelectedUserIds(selectedUserIds.remove(contact.uid));
    }
  };

  CreateGroupForm.prototype.handleNameChange = function handleNameChange(event) {
    event.preventDefault();

    this.setState({ name: event.target.value });
  };

  CreateGroupForm.prototype.handleNameSubmit = function handleNameSubmit(event) {
    event.preventDefault();

    var name = this.state.name;

    var trimmedName = name.trim();

    if (trimmedName.length > 0) {
      _CreateGroupActionCreators2.default.setGroupName(trimmedName);
    }
  };

  CreateGroupForm.prototype.handleCreateGroup = function handleCreateGroup(event) {
    event.preventDefault();
    var _state2 = this.state;
    var name = _state2.name;
    var selectedUserIds = _state2.selectedUserIds;


    _CreateGroupActionCreators2.default.createGroup(name, null, selectedUserIds.toJS());
  };

  CreateGroupForm.prototype.onSearchChange = function onSearchChange(event) {
    this.setState({ search: event.target.value });
  };

  CreateGroupForm.prototype.renderGroupNameInput = function renderGroupNameInput() {
    var name = this.state.name;

    return _react2.default.createElement(_TextField2.default, {
      className: 'input__material--wide',
      floatingLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.createGroup.groupName' }),
      ref: 'name',
      onChange: this.handleNameChange,
      value: name });
  };

  CreateGroupForm.prototype.renderAddUsersButton = function renderAddUsersButton() {
    return _react2.default.createElement(
      'button',
      { className: 'button button--lightblue', onClick: this.handleNameSubmit },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.addMembers' })
    );
  };

  CreateGroupForm.prototype.renderUserSearchInput = function renderUserSearchInput() {
    var search = this.state.search;
    var intl = this.context.intl;


    return _react2.default.createElement(
      'div',
      { className: 'small-search' },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'search'
      ),
      _react2.default.createElement('input', {
        className: 'input',
        onChange: this.onSearchChange,
        placeholder: intl.messages['invite.search'],
        type: 'search',
        value: search })
    );
  };

  CreateGroupForm.prototype.renderSelectedUsersCount = function renderSelectedUsersCount() {
    var selectedUserIds = this.state.selectedUserIds;

    return _react2.default.createElement(
      'div',
      { className: 'count' },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'members', values: { numMembers: selectedUserIds.size } })
    );
  };

  CreateGroupForm.prototype.renderCreateGroupButton = function renderCreateGroupButton() {
    var step = this.state.step;


    if (step !== _ActorAppConstants.CreateGroupSteps.CREATION_STARTED) {
      return _react2.default.createElement(
        'button',
        { className: 'button button--lightblue', onClick: this.handleCreateGroup },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.createGroup' })
      );
    }

    return _react2.default.createElement(
      'button',
      { className: 'button button--lightblue', disabled: true },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.createGroup' })
    );
  };

  CreateGroupForm.prototype.render = function render() {
    var step = this.state.step;


    switch (step) {
      case _ActorAppConstants.CreateGroupSteps.NAME_INPUT:
        return _react2.default.createElement(
          'form',
          { className: 'group-name' },
          _react2.default.createElement(
            'div',
            { className: 'modal__body' },
            this.renderGroupNameInput()
          ),
          _react2.default.createElement(
            'footer',
            { className: 'modal__footer text-right' },
            this.renderAddUsersButton()
          )
        );

      case _ActorAppConstants.CreateGroupSteps.CONTACTS_SELECTION:
      case _ActorAppConstants.CreateGroupSteps.CREATION_STARTED:
        return _react2.default.createElement(
          'form',
          { className: 'group-members' },
          _react2.default.createElement(
            'div',
            { className: 'modal__body' },
            this.renderUserSearchInput(),
            _react2.default.createElement(
              'ul',
              { className: 'contacts__list' },
              this.renderContacts()
            )
          ),
          _react2.default.createElement(
            'footer',
            { className: 'modal__footer' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-xs text-left' },
                this.renderSelectedUsersCount()
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-xs text-right' },
                this.renderCreateGroupButton()
              )
            )
          )
        );
      default:
        return null;
    }
  };

  return CreateGroupForm;
}(_react.Component);

CreateGroupForm.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(CreateGroupForm, { pure: false });
//# sourceMappingURL=Form.react.js.map