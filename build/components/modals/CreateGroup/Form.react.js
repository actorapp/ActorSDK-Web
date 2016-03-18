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

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _CreateGroupActionCreators = require('../../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _PeopleStore = require('../../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _CreateGroupStore = require('../../../stores/CreateGroupStore');

var _CreateGroupStore2 = _interopRequireDefault(_CreateGroupStore);

var _ContactItem = require('./ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

var _TextField = require('../../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var CreateGroupForm = function (_Component) {
  (0, _inherits3.default)(CreateGroupForm, _Component);

  function CreateGroupForm(props) {
    (0, _classCallCheck3.default)(this, CreateGroupForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onContactToggle = function (contact, isSelected) {
      var selectedUserIds = _this.state.selectedUserIds;


      if (isSelected) {
        _CreateGroupActionCreators2.default.setSelectedUserIds(selectedUserIds.add(contact.uid));
      } else {
        _CreateGroupActionCreators2.default.setSelectedUserIds(selectedUserIds.remove(contact.uid));
      }
    };

    _this.handleNameChange = function (event) {
      event.preventDefault();

      _this.setState({ name: event.target.value });
    };

    _this.handleNameSubmit = function (event) {
      event.preventDefault();

      var name = _this.state.name;

      var trimmedName = name.trim();

      if (trimmedName.length > 0) {
        _CreateGroupActionCreators2.default.setGroupName(trimmedName);
      }
    };

    _this.handleCreateGroup = function (event) {
      var _this$state = _this.state;
      var name = _this$state.name;
      var selectedUserIds = _this$state.selectedUserIds;


      event.preventDefault();
      _CreateGroupActionCreators2.default.createGroup(name, null, selectedUserIds.toJS());
    };

    return _this;
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

  CreateGroupForm.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state;
    var step = _state.step;
    var name = _state.name;
    var selectedUserIds = _state.selectedUserIds;
    var contacts = _state.contacts;
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
        var contactList = (0, _lodash.map)(contacts, function (contact, i) {
          return _react2.default.createElement(_ContactItem2.default, { contact: contact, key: i, onToggle: _this2.onContactToggle });
        });
        stepForm = _react2.default.createElement(
          'form',
          { className: 'group-members' },
          _react2.default.createElement(
            'div',
            { className: 'count' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'members', values: { numMembers: selectedUserIds.size } })
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-new__body' },
            _react2.default.createElement(
              'ul',
              { className: 'contacts__list' },
              contactList
            )
          ),
          _react2.default.createElement(
            'footer',
            { className: 'modal-new__footer text-right' },
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
        );
        break;
      default:
    }

    return stepForm;
  };

  return CreateGroupForm;
}(_react.Component);

CreateGroupForm.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(CreateGroupForm, { pure: false });
//# sourceMappingURL=Form.react.js.map