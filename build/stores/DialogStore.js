'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogStore = function (_Store) {
  (0, _inherits3.default)(DialogStore, _Store);

  function DialogStore(dispatcher) {
    (0, _classCallCheck3.default)(this, DialogStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));

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
}(_utils.Store); /*
                  * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                  */

exports.default = new DialogStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DialogStore.js.map