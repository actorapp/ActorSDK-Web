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

var _info = null;

var DialogInfoStore = function (_Store) {
  (0, _inherits3.default)(DialogInfoStore, _Store);

  function DialogInfoStore() {
    (0, _classCallCheck3.default)(this, DialogInfoStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.apply(this, arguments));
  }

  DialogInfoStore.prototype.getInfo = function getInfo() {
    return _info;
  };

  DialogInfoStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER:
        if (action.peer.type === _ActorAppConstants.PeerTypes.GROUP) {
          _info = _ActorClient2.default.getGroup(action.peer.id);
        } else if (action.peer.type === _ActorAppConstants.PeerTypes.USER) {
          _info = _ActorClient2.default.getUser(action.peer.id);
        }
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.DIALOG_INFO_CHANGED:
        _info = action.info;
        this.__emitChange();
        break;
      default:
    }
  };

  return DialogInfoStore;
}(_utils.Store);

exports.default = new DialogInfoStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DialogInfoStore.js.map