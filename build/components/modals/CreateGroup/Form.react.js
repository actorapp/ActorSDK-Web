'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _materialUi = require('material-ui');

var _CreateGroupActionCreators = require('../../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _PeopleStore = require('../../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _CreateGroupStore = require('../../../stores/CreateGroupStore');

var _CreateGroupStore2 = _interopRequireDefault(_CreateGroupStore);

var _ContactItem = require('./ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

var _ActorTheme = require('../../../constants/ActorTheme');

var _ActorTheme2 = _interopRequireDefault(_ActorTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ThemeManager = new _materialUi.Styles.ThemeManager();

var CreateGroupForm = (function (_Component) {
  _inherits(CreateGroupForm, _Component);

  function CreateGroupForm(props) {
    _classCallCheck(this, CreateGroupForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CreateGroupForm).call(this, props));

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

  _createClass(CreateGroupForm, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      ThemeManager.setTheme(_ActorTheme2.default);
      ThemeManager.setComponentThemes({
        textField: {
          textColor: 'rgba(0,0,0,.87)',
          focusColor: '#68a3e7',
          backgroundColor: 'transparent',
          borderColor: '#68a3e7'
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.step === _ActorAppConstants.CreateGroupSteps.NAME_INPUT) {
        setTimeout(function () {
          _this2.refs.groupName.focus();
        }, 10);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state;
      var step = _state.step;
      var name = _state.name;
      var selectedUserIds = _state.selectedUserIds;
      var contacts = _state.contacts;

      var stepForm = undefined;

      switch (step) {
        case _ActorAppConstants.CreateGroupSteps.NAME_INPUT:
          stepForm = _react2.default.createElement(
            'form',
            { className: 'group-name' },
            _react2.default.createElement(
              'div',
              { className: 'modal-new__body' },
              _react2.default.createElement(_materialUi.TextField, { className: 'login__form__input',
                floatingLabelText: this.getIntlMessage('modal.createGroup.groupName'),
                fullWidth: true,
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
                this.getIntlMessage('button.addMembers')
              )
            )
          );
          break;

        case _ActorAppConstants.CreateGroupSteps.CONTACTS_SELECTION:
        case _ActorAppConstants.CreateGroupSteps.CREATION_STARTED:
          var contactList = _lodash2.default.map(contacts, function (contact, i) {
            return _react2.default.createElement(_ContactItem2.default, { contact: contact, key: i, onToggle: _this3.onContactToggle });
          });
          stepForm = _react2.default.createElement(
            'form',
            { className: 'group-members' },
            _react2.default.createElement(
              'div',
              { className: 'count' },
              _react2.default.createElement(_reactIntl.FormattedMessage, { message: this.getIntlMessage('members'), numMembers: selectedUserIds.size })
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
                this.getIntlMessage('button.createGroup')
              ) : _react2.default.createElement(
                'button',
                { className: 'button button--lightblue',
                  onClick: this.handleCreateGroup },
                this.getIntlMessage('button.createGroup')
              )
            )
          );
          break;
        default:
      }

      return stepForm;
    }
  }], [{
    key: 'getStores',
    value: function getStores() {
      return [_CreateGroupStore2.default];
    }
  }, {
    key: 'calculateState',
    value: function calculateState() {
      return {
        step: _CreateGroupStore2.default.getCurrentStep(),
        name: _CreateGroupStore2.default.getGroupName(),
        selectedUserIds: _CreateGroupStore2.default.getSelectedUserIds(),
        contacts: _PeopleStore2.default.getList()
      };
    }
  }]);

  return CreateGroupForm;
})(_react.Component);

CreateGroupForm.childContextTypes = {
  muiTheme: _react.PropTypes.object
};

_reactMixin2.default.onClass(CreateGroupForm, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(CreateGroupForm, { pure: false });
//# sourceMappingURL=Form.react.js.map