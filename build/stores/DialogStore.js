'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DialogStore = function (_Store) {
  _inherits(DialogStore, _Store);

  function DialogStore(dispatcher) {
    _classCallCheck(this, DialogStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    _this.dialogs = [];
    _this.currentPeer = null;
    _this.lastPeer = null;
    return _this;
  }

  DialogStore.prototype.getDialogs = function getDialogs() {
    return this.dialogs;
  };

  DialogStore.prototype.getCurrentPeer = function getCurrentPeer() {
    return this.currentPeer;
  };

  DialogStore.prototype.getLastPeer = function getLastPeer() {
    return this.lastPeer;
  };

  DialogStore.prototype.isMember = function isMember() {
    if (this.currentPeer !== null && this.currentPeer.type === _ActorAppConstants.PeerTypes.GROUP) {
      var group = _ActorClient2.default.getGroup(this.currentPeer.id);
      return group && group.members.length !== 0;
    }

    return true;
  };

  DialogStore.prototype.isFavorite = function isFavorite(id) {
    var favoriteDialogs = (0, _lodash.find)(this.dialogs, { key: 'favourites' });
    if (!favoriteDialogs) return false;

    return (0, _lodash.some)(favoriteDialogs.shorts, function (dialog) {
      return dialog.peer.peer.id === id;
    });
  };

  DialogStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.DIALOGS_CHANGED:
        this.dialogs = action.dialogs;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.BIND_DIALOG_PEER:
        this.currentPeer = action.peer;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.UNBIND_DIALOG_PEER:
        this.lastPeer = action.peer;
        this.currentPeer = null;
        this.__emitChange();
        break;
      default:
    }
  };

  return DialogStore;
}(_utils.Store);

exports.default = new DialogStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DialogStore.js.map