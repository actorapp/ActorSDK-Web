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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isOpen = false; /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

var _isOutgoing = false;
var _isMuted = false;
var _isFloating = false;
var _id = void 0,
    _members = void 0,
    _peer = void 0,
    _state = void 0;

var CallStore = function (_Store) {
  (0, _inherits3.default)(CallStore, _Store);

  function CallStore(dispatcher) {
    (0, _classCallCheck3.default)(this, CallStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  CallStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  CallStore.prototype.isOutgoing = function isOutgoing() {
    return _isOutgoing;
  };

  CallStore.prototype.isMuted = function isMuted() {
    return _isMuted;
  };

  CallStore.prototype.isFloating = function isFloating() {
    return _isFloating;
  };

  CallStore.prototype.getId = function getId() {
    return _id;
  };

  CallStore.prototype.getMembers = function getMembers() {
    return _members;
  };

  CallStore.prototype.getPeer = function getPeer() {
    return _peer;
  };

  CallStore.prototype.getState = function getState() {
    return _state;
  };

  CallStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.CALL_MODAL_OPEN:
        _isOpen = true;
        _id = action.id;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CALL_MODAL_HIDE:
        _isOpen = false;
        _isFloating = false;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CALL_CHANGED:
        var _action$call = action.call;
        var members = _action$call.members;
        var peer = _action$call.peer;
        var state = _action$call.state;
        var isOutgoing = _action$call.isOutgoing;
        var isMuted = _action$call.isMuted;

        _isOutgoing = isOutgoing;
        _members = members;
        _peer = peer;
        _state = state;
        // _isMuted = isMuted;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CALL_MUTE_TOGGLE:
        _isMuted = !_isMuted;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CALL_FLOAT_TOGGLE:
        _isFloating = !_isFloating;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CALL:
        // console.debug('ActionTypes.CALL', action);
        break;
      default:
    }
  };

  return CallStore;
}(_utils.Store);

exports.default = new CallStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=CallStore.js.map