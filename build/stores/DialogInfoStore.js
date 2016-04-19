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

var DialogInfoStore = function (_ReduceStore) {
  (0, _inherits3.default)(DialogInfoStore, _ReduceStore);

  function DialogInfoStore() {
    (0, _classCallCheck3.default)(this, DialogInfoStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  DialogInfoStore.prototype.getInitialState = function getInitialState() {
    return null;
  };

  DialogInfoStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER:
        if (action.peer.type === _ActorAppConstants.PeerTypes.GROUP) {
          return _ActorClient2.default.getGroup(action.peer.id);
        }

        return _ActorClient2.default.getUser(action.peer.id);

      case _ActorAppConstants.ActionTypes.DIALOG_INFO_CHANGED:
        return action.info;

      default:
        return state;
    }
  };

  return DialogInfoStore;
}(_utils.ReduceStore);

exports.default = new DialogInfoStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DialogInfoStore.js.map