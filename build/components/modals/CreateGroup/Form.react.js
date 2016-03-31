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

var CreateGroupForm = function (_Component) {
  (0, _inherits3.default)(CreateGroupForm, _Component);

  function CreateGroupForm() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CreateGroupForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onContactToggle = function (contact, isSelected) {
      var selectedUserIds = _this.state.selectedUserIds;


      if (isSelected) {
        _CreateGroupActionCreators2.default.setSelectedUserIds(selectedUserIds.add(contact.uid));
      } else {
        _CreateGroupActionCreators2.default.setSelectedUserIds(selectedUserIds.remove(contact.uid));
      }
    }, _this.handleNameChange = function (event) {
      event.preventDefault();

      _this.setState({ name: event.target.value });
    }, _this.handleNameSubmit = function (event) {
      event.preventDefault();

      var name = _this.state.name;

      var trimmedName = name.trim();

      if (trimmedName.length > 0) {
        _CreateGroupActionCreators2.default.setGroupName(trimmedName);
      }
    }, _this.handleCreateGroup = function (event) {
      var _this$state = _this.state;
      var name = _this$state.name;
      var selectedUserIds = _this$state.selectedUserIds;


      event.preventDefault();
      _CreateGroupActionCreators2.default.createGroup(name, null, selectedUserIds.toJS());
    }, _this.onSearchChange = function (e) {
      _this.setState({ search: e.target.value });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  CreateGroupForm.getStores = function getStores() {
    return [_PeopleStore2.default, _CreateGroupStore2.default];
  };

  CreateGroupForm.calculateState = function calculateState() {
    return {
      step: _CreateGroupStore2.default.getCurrentStep(),
      name: _CreateGroupStore2.default.getGroupName(),
      selectedUserIds: _CreateGroupStore2.default.getSelectedUserIds(),
      contacts: _PeopleStore2.default.getList()
    };
  };

  CreateGroupForm.prototype.componentDidMount = function componentDidMount() {
    if (this.state.step === _ActorAppConstants.CreateGroupSteps.NAME_INPUT) {
      this.refs.groupName.focus();
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

    var intl = this.context.intl;
    var selectedUserIds = this.state.selectedUserIds;

    var contacts = this.getContacts();

    if (!contacts.length) {
      return _react2.default.createElement(
        'li',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        intl.messages['inviteModalNotFound']
      );
    }

    return contacts.map(function (contact, i) {
      var isSelected = selectedUserIds.has(contact.uid);
      var icon = isSelected ? 'check_box' : 'check_box_outline_blank';

      return _react2.default.createElement(
        _ContactItem2.default,
        (0, _extends3.default)({}, contact, { key: i }),
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

  CreateGroupForm.prototype.render = function render() {
    var _state2 = this.state;
    var step = _state2.step;
    var name = _state2.name;
    var selectedUserIds = _state2.selectedUserIds;
    var search = _state2.search;
    var intl = this.context.intl;

    var stepForm = void 0;

    switch (step) {
      case _ActorAppConstants.CreateGroupSteps.NAME_INPUT:
        stepForm = _react2.default.createElement(
          'form',
          { className: 'group-name' },
          _react2.default.createElement(
            'div',
            { className: 'modal-new__body' },
            _react2.default.createElement(_TextField2.default, { className: 'input__material--wide',
              floatingLabel: intl.messages['modal.createGroup.groupName'],
              ref: 'groupName',
              onChange: this.handleNameChange,
              value: name })
          ),
          _react2.default.createElement(
            'footer',
            { className: 'modal-new__footer text-right' },
            _react2.default.createElement(
              'button',
              { className: 'button button--lightblue',
                onClick: this.handleNameSubmit },
              intl.messages['button.addMembers']
            )
          )
        );
        break;

      case _ActorAppConstants.CreateGroupSteps.CONTACTS_SELECTION:
      case _ActorAppConstants.CreateGroupSteps.CREATION_STARTED:
        stepForm = _react2.default.createElement(
          'form',
          { className: 'group-members' },
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
              'ul',
              { className: 'contacts__list' },
              this.renderContacts()
            )
          ),
          _react2.default.createElement(
            'footer',
            { className: 'modal-new__footer ' },
            _react2.default.createElement(
              'span',
              { className: 'pull-left' },
              step === _ActorAppConstants.CreateGroupSteps.CONTACTS_SELECTION || step === _ActorAppConstants.CreateGroupSteps.CREATION_STARTED ? _react2.default.createElement(
                'div',
                { className: 'count' },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'members', values: { numMembers: selectedUserIds.size } })
              ) : null
            ),
            _react2.default.createElement(
              'span',
              { className: 'text-right' },
              step === _ActorAppConstants.CreateGroupSteps.CREATION_STARTED ? _react2.default.createElement(
                'button',
                { className: 'button button--lightblue',
                  disabled: true },
                intl.messages['button.createGroup']
              ) : _react2.default.createElement(
                'button',
                { className: 'button button--lightblue',
                  onClick: this.handleCreateGroup },
                intl.messages['button.createGroup']
              )
            )
          )
        );
        break;
      default:
    }

    return stepForm;
  };

  return CreateGroupForm;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

CreateGroupForm.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(CreateGroupForm, { pure: false });
//# sourceMappingURL=Form.react.js.map