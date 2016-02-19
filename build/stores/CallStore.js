'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _isOpen = false;
var _isOutgoing = false;
var _id = undefined,
    _members = undefined,
    _peer = undefined,
    _state = undefined;

var CallStore = (function (_Store) {
  _inherits(CallStore, _Store);

  function CallStore(dispatcher) {
    _classCallCheck(this, CallStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CallStore).call(this, dispatcher));
  }

  _createClass(CallStore, [{
    key: 'isOpen',
    value: function isOpen() {
      return _isOpen;
    }
  }, {
    key: 'isOutgoing',
    value: function isOutgoing() {
      return _isOutgoing;
    }
  }, {
    key: 'getId',
    value: function getId() {
      return _id;
    }
  }, {
    key: 'getMembers',
    value: function getMembers() {
      return _members;
    }
  }, {
    key: 'getPeer',
    value: function getPeer() {
      return _peer;
    }
  }, {
    key: 'getState',
    value: function getState() {
      return _state;
    }
  }, {
    key: '__onDispatch',
    value: function __onDispatch(action) {
      switch (action.type) {
        case _ActorAppConstants.ActionTypes.CALL_MODAL_OPEN:
          _isOpen = true;
          _id = action.id;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.CALL_MODAL_HIDE:
          _isOpen = false;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.CALL_CHANGED:
          var _action$call = action.call;
          var members = _action$call.members;
          var peer = _action$call.peer;
          var state = _action$call.state;
          var isOutgoing = _action$call.isOutgoing;

          _isOutgoing = isOutgoing;
          _members = members;
          _peer = peer;
          _state = state;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.CALL:
          // console.debug('ActionTypes.CALL', action);
          break;
        default:
      }
    }
  }]);

  return CallStore;
})(_utils.Store);

exports.default = new CallStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=CallStore.js.map