'use strict';

exports.__esModule = true;

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

var DialogInfoStore = function (_ReduceStore) {
  _inherits(DialogInfoStore, _ReduceStore);

  function DialogInfoStore() {
    _classCallCheck(this, DialogInfoStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
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