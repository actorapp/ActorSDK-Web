'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function getPeer(peer) {
  if (peer.type === _ActorAppConstants.PeerTypes.GROUP) {
    return _ActorClient2.default.getGroup(peer.id);
  }

  return _ActorClient2.default.getUser(peer.id);
}

var DialogInfoStore = function (_ReduceStore) {
  _inherits(DialogInfoStore, _ReduceStore);

  function DialogInfoStore() {
    _classCallCheck(this, DialogInfoStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  DialogInfoStore.prototype.getInitialState = function getInitialState() {
    // Temporary workaround while isStarted isn't correct
    this.__isStarted = false;
    return null;
  };

  DialogInfoStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER:
        var info = getPeer(action.peer);

        return _extends({}, info, {
          isStarted: this.__isStarted
        });

      case _ActorAppConstants.ActionTypes.DIALOG_INFO_CHANGED:
        return _extends({}, action.info, {
          isStarted: this.__isStarted
        });

      case _ActorAppConstants.ActionTypes.MESSAGES_CHANGED:
        this.__isStarted = action.messages && action.messages.length > 0;
        if (state) {
          return _extends({}, state, {
            isStarted: this.__isStarted
          });
        }

        return state;

      default:
        return state;
    }
  };

  return DialogInfoStore;
}(_utils.ReduceStore);

exports.default = new DialogInfoStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DialogInfoStore.js.map