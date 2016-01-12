'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _profile = null,
    _name = null,
    _nick = null,
    _about = null,
    _isModalOpen = false;

var MyProfileStore = (function (_Store) {
  _inherits(MyProfileStore, _Store);

  function MyProfileStore(Dispatcher) {
    _classCallCheck(this, MyProfileStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MyProfileStore).call(this, Dispatcher));
  }

  _createClass(MyProfileStore, [{
    key: 'isModalOpen',
    value: function isModalOpen() {
      return _isModalOpen;
    }
  }, {
    key: 'getName',
    value: function getName() {
      return _name;
    }
  }, {
    key: 'getNick',
    value: function getNick() {
      return _nick;
    }
  }, {
    key: 'getAbout',
    value: function getAbout() {
      return _about;
    }
  }, {
    key: 'getProfile',
    value: function getProfile() {
      return _profile;
    }
  }, {
    key: 'setProfile',
    value: function setProfile(profile) {
      _profile = profile;
      _name = profile.name;
      _nick = profile.nick;
      _about = profile.about;
    }
  }, {
    key: '__onDispatch',
    value: function __onDispatch(action) {
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
    }
  }]);

  return MyProfileStore;
})(_utils.Store);

exports.default = new MyProfileStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=MyProfileStore.js.map