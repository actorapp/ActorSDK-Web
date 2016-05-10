'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ModalStore = function (_ReduceStore) {
  _inherits(ModalStore, _ReduceStore);

  function ModalStore() {
    _classCallCheck(this, ModalStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  ModalStore.prototype.getInitialState = function getInitialState() {
    return {
      prevModal: null,
      currentModal: null
    };
  };

  ModalStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.PROFILE_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.PROFILE
        });
      case _ActorAppConstants.ActionTypes.CROP_MODAL_SHOW:
        return _extends({}, state, {
          prevModal: action.prevModal,
          currentModal: _ActorAppConstants.ModalTypes.CROP
        });
      case _ActorAppConstants.ActionTypes.CROP_MODAL_HIDE:
        return _extends({}, state, {
          prevModal: null,
          currentModal: state.prevModal
        });
      case _ActorAppConstants.ActionTypes.GROUP_LIST_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.GROUP_LIST
        });
      case _ActorAppConstants.ActionTypes.CONTACT_LIST_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.PEOPLE_LIST
        });
      case _ActorAppConstants.ActionTypes.CONTACT_ADD_MODAL_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.ADD_CONTACT
        });
      case _ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.CREATE_GROUP
        });
      case _ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.EDIT_GROUP
        });
      case _ActorAppConstants.ActionTypes.PREFERENCES_MODAL_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.PREFERENCES
        });
      case _ActorAppConstants.ActionTypes.QUICK_SEARCH_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.QUICK_SEARCH
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_MODAL_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.INVITE
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_SHOW:
        return _extends({}, state, {
          prevModal: action.prevModal,
          currentModal: _ActorAppConstants.ModalTypes.INVITE_BY_LINK
        });
      case _ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_HIDE:
        return _extends({}, state, {
          prevModal: null,
          currentModal: state.prevModal
        });
      case _ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_SHOW:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.ATTACHMENTS
        });

      case _ActorAppConstants.ActionTypes.BLOCKED_USERS_OPEN:
        return _extends({}, state, {
          currentModal: _ActorAppConstants.ModalTypes.BLOCKED_USERS
        });

      case _ActorAppConstants.ActionTypes.PROFILE_HIDE:
      case _ActorAppConstants.ActionTypes.GROUP_LIST_HIDE:
      case _ActorAppConstants.ActionTypes.CONTACT_LIST_HIDE:
      case _ActorAppConstants.ActionTypes.CONTACT_ADD_MODAL_HIDE:
      case _ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_HIDE:
      case _ActorAppConstants.ActionTypes.GROUP_EDIT_MODAL_HIDE:
      case _ActorAppConstants.ActionTypes.PREFERENCES_MODAL_HIDE:
      case _ActorAppConstants.ActionTypes.QUICK_SEARCH_HIDE:
      case _ActorAppConstants.ActionTypes.INVITE_USER_MODAL_HIDE:
      case _ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_HIDE:
      case _ActorAppConstants.ActionTypes.BLOCKED_USERS_HIDE:
        return this.getInitialState();

      default:
        return state;
    }
  };

  return ModalStore;
}(_utils.ReduceStore);

exports.default = new ModalStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=ModalStore.js.map