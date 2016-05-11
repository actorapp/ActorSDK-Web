'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _DelegateContainer = require('../../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

var _ModalStore = require('../../stores/ModalStore');

var _ModalStore2 = _interopRequireDefault(_ModalStore);

var _Profile = require('./Profile.react');

var _Profile2 = _interopRequireDefault(_Profile);

var _Crop = require('./Crop.react');

var _Crop2 = _interopRequireDefault(_Crop);

var _Groups = require('./Groups.react');

var _Groups2 = _interopRequireDefault(_Groups);

var _People = require('./People.react');

var _People2 = _interopRequireDefault(_People);

var _AddContact = require('./AddContact.react');

var _AddContact2 = _interopRequireDefault(_AddContact);

var _CreateGroup = require('./CreateGroup.react');

var _CreateGroup2 = _interopRequireDefault(_CreateGroup);

var _EditGroup = require('./EditGroup.react');

var _EditGroup2 = _interopRequireDefault(_EditGroup);

var _Preferences = require('./Preferences.react');

var _Preferences2 = _interopRequireDefault(_Preferences);

var _Invite = require('./Invite.react');

var _Invite2 = _interopRequireDefault(_Invite);

var _InviteByLink = require('./InviteByLink.react');

var _InviteByLink2 = _interopRequireDefault(_InviteByLink);

var _QuickSearch = require('./QuickSearch.react');

var _QuickSearch2 = _interopRequireDefault(_QuickSearch);

var _Attachments = require('./Attachments.react');

var _Attachments2 = _interopRequireDefault(_Attachments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ModalsWrapper = function (_Component) {
  _inherits(ModalsWrapper, _Component);

  ModalsWrapper.getStores = function getStores() {
    return [_ModalStore2.default];
  };

  ModalsWrapper.calculateState = function calculateState() {
    return _ModalStore2.default.getState();
  };

  function ModalsWrapper(props) {
    _classCallCheck(this, ModalsWrapper);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.components = _this.getComponents();
    return _this;
  }

  ModalsWrapper.prototype.getComponents = function getComponents() {
    var _DelegateContainer$ge = _DelegateContainer2.default.get();

    var components = _DelegateContainer$ge.components;

    var modals = components.modals;

    if (modals) {
      return {
        Profile: (0, _lodash.isFunction)(modals.profile) ? modals.profile : _Profile2.default,
        Crop: (0, _lodash.isFunction)(modals.crop) ? modals.crop : _Crop2.default,
        Groups: (0, _lodash.isFunction)(modals.groups) ? modals.groups : _Groups2.default,
        People: (0, _lodash.isFunction)(modals.people) ? modals.people : _People2.default,
        AddContact: (0, _lodash.isFunction)(modals.addContact) ? modals.addContact : _AddContact2.default,
        CreateGroup: (0, _lodash.isFunction)(modals.createGroup) ? modals.createGroup : _CreateGroup2.default,
        EditGroup: (0, _lodash.isFunction)(modals.editGroup) ? modals.editGroup : _EditGroup2.default,
        Preferences: (0, _lodash.isFunction)(modals.preferences) ? modals.preferences : _Preferences2.default,
        Invite: (0, _lodash.isFunction)(modals.invite) ? modals.invite : _Invite2.default,
        InviteByLink: (0, _lodash.isFunction)(modals.inviteByLink) ? modals.inviteByLink : _InviteByLink2.default,
        QuickSearch: (0, _lodash.isFunction)(modals.quickSearch) ? modals.quickSearch : _QuickSearch2.default,
        Attachments: (0, _lodash.isFunction)(modals.attachments) ? modals.attachments : _Attachments2.default
      };
    }

    return {
      Profile: _Profile2.default,
      Crop: _Crop2.default,
      Groups: _Groups2.default,
      People: _People2.default,
      AddContact: _AddContact2.default,
      CreateGroup: _CreateGroup2.default,
      EditGroup: _EditGroup2.default,
      Preferences: _Preferences2.default,
      Invite: _Invite2.default,
      InviteByLink: _InviteByLink2.default,
      QuickSearch: _QuickSearch2.default,
      Attachments: _Attachments2.default
    };
  };

  ModalsWrapper.prototype.render = function render() {
    var currentModal = this.state.currentModal;

    if (!currentModal) return null;

    var _components = this.components;
    var Profile = _components.Profile;
    var Crop = _components.Crop;
    var Groups = _components.Groups;
    var People = _components.People;
    var AddContact = _components.AddContact;
    var CreateGroup = _components.CreateGroup;
    var EditGroup = _components.EditGroup;
    var Preferences = _components.Preferences;
    var Invite = _components.Invite;
    var InviteByLink = _components.InviteByLink;
    var QuickSearch = _components.QuickSearch;
    var Attachments = _components.Attachments;


    switch (currentModal) {
      case _ActorAppConstants.ModalTypes.PROFILE:
        return _react2.default.createElement(Profile, null);
      case _ActorAppConstants.ModalTypes.CROP:
        return _react2.default.createElement(Crop, null);
      case _ActorAppConstants.ModalTypes.GROUP_LIST:
        return _react2.default.createElement(Groups, null);
      case _ActorAppConstants.ModalTypes.PEOPLE_LIST:
        return _react2.default.createElement(People, null);
      case _ActorAppConstants.ModalTypes.ADD_CONTACT:
        return _react2.default.createElement(AddContact, null);
      case _ActorAppConstants.ModalTypes.CREATE_GROUP:
        return _react2.default.createElement(CreateGroup, null);
      case _ActorAppConstants.ModalTypes.EDIT_GROUP:
        return _react2.default.createElement(EditGroup, null);
      case _ActorAppConstants.ModalTypes.PREFERENCES:
        return _react2.default.createElement(Preferences, null);
      case _ActorAppConstants.ModalTypes.INVITE:
        return _react2.default.createElement(Invite, null);
      case _ActorAppConstants.ModalTypes.INVITE_BY_LINK:
        return _react2.default.createElement(InviteByLink, null);
      case _ActorAppConstants.ModalTypes.QUICK_SEARCH:
        return _react2.default.createElement(QuickSearch, null);
      case _ActorAppConstants.ModalTypes.ATTACHMENTS:
        return _react2.default.createElement(Attachments, null);

      default:
        console.warn('Unsupported modal type: ' + currentModal);
        return null;
    }
  };

  return ModalsWrapper;
}(_react.Component);

exports.default = _utils.Container.create(ModalsWrapper);
//# sourceMappingURL=ModalsWrapper.react.js.map