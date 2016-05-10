'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

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

var _BlockedUsers = require('./BlockedUsers.react');

var _BlockedUsers2 = _interopRequireDefault(_BlockedUsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ModalsWrapper = function (_Component) {
  _inherits(ModalsWrapper, _Component);

  function ModalsWrapper() {
    _classCallCheck(this, ModalsWrapper);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ModalsWrapper.getStores = function getStores() {
    return [_ModalStore2.default];
  };

  ModalsWrapper.calculateState = function calculateState() {
    return _ModalStore2.default.getState();
  };

  ModalsWrapper.prototype.render = function render() {
    var currentModal = this.state.currentModal;

    if (!currentModal) return null;

    switch (currentModal) {
      case _ActorAppConstants.ModalTypes.PROFILE:
        return _react2.default.createElement(_Profile2.default, null);
      case _ActorAppConstants.ModalTypes.CROP:
        return _react2.default.createElement(_Crop2.default, null);
      case _ActorAppConstants.ModalTypes.GROUP_LIST:
        return _react2.default.createElement(_Groups2.default, null);
      case _ActorAppConstants.ModalTypes.PEOPLE_LIST:
        return _react2.default.createElement(_People2.default, null);
      case _ActorAppConstants.ModalTypes.ADD_CONTACT:
        return _react2.default.createElement(_AddContact2.default, null);
      case _ActorAppConstants.ModalTypes.CREATE_GROUP:
        return _react2.default.createElement(_CreateGroup2.default, null);
      case _ActorAppConstants.ModalTypes.EDIT_GROUP:
        return _react2.default.createElement(_EditGroup2.default, null);
      case _ActorAppConstants.ModalTypes.PREFERENCES:
        return _react2.default.createElement(_Preferences2.default, null);
      case _ActorAppConstants.ModalTypes.INVITE:
        return _react2.default.createElement(_Invite2.default, null);
      case _ActorAppConstants.ModalTypes.INVITE_BY_LINK:
        return _react2.default.createElement(_InviteByLink2.default, null);
      case _ActorAppConstants.ModalTypes.QUICK_SEARCH:
        return _react2.default.createElement(_QuickSearch2.default, null);
      case _ActorAppConstants.ModalTypes.ATTACHMENTS:
        return _react2.default.createElement(_Attachments2.default, null);
      case _ActorAppConstants.ModalTypes.BLOCKED_USERS:
        return _react2.default.createElement(_BlockedUsers2.default, null);

      default:
        console.warn('Unsupported modal type: ' + currentModal);
        return null;
    }
  };

  return ModalsWrapper;
}(_react.Component);

exports.default = _utils.Container.create(ModalsWrapper);
//# sourceMappingURL=ModalsWrapper.react.js.map