'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var _profile = null,
    _name = null,
    _nick = null,
    _about = null,
    _isModalOpen = false;

var MyProfileStore = function (_Store) {
  (0, _inherits3.default)(MyProfileStore, _Store);

  function MyProfileStore(Dispatcher) {
    (0, _classCallCheck3.default)(this, MyProfileStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, Dispatcher));
  }

  MyProfileStore.prototype.isModalOpen = function isModalOpen() {
    return _isModalOpen;
  };

  MyProfileStore.prototype.getName = function getName() {
    return _name;
  };

  MyProfileStore.prototype.getNick = function getNick() {
    return _nick;
  };

  MyProfileStore.prototype.getAbout = function getAbout() {
    return _about;
  };

  MyProfileStore.prototype.getProfile = function getProfile() {
    return _profile;
  };

  MyProfileStore.prototype.setProfile = function setProfile(profile) {
    _profile = profile;
    _name = profile.name;
    _nick = profile.nick;
    _about = profile.about;
  };

  MyProfileStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.MY_PROFILE_MODAL_SHOW:
        _isModalOpen = true;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.MY_PROFILE_MODAL_HIDE:
        _isModalOpen = false;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.MY_PROFILE_CHANGED:
        this.setProfile(action.profile);
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.MY_PROFILE_SAVE_NAME:
        if (_name !== action.name) {
          _name = action.name;
          _ActorClient2.default.editMyName(_name);
          this.__emitChange();
        }
        break;
      case _ActorAppConstants.ActionTypes.MY_PROFILE_SAVE_NICKNAME:
        if (_nick !== action.nick) {
          _nick = action.nick;
          _ActorClient2.default.editMyNick(_nick);
          this.__emitChange();
        }
        break;
      case _ActorAppConstants.ActionTypes.MY_PROFILE_EDIT_ABOUT_SUCCESS:
        if (_about !== action.about) {
          _about = action.about;
          this.__emitChange();
        }
        break;
      default:
    }
  };

  return MyProfileStore;
}(_utils.Store);

exports.default = new MyProfileStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=MyProfileStore.js.map