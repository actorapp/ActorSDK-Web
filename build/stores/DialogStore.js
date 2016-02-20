'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var _currentPeer = null,
    _lastPeer = null;

var DialogStore = (function (_Store) {
  _inherits(DialogStore, _Store);

  function DialogStore() {
    _classCallCheck(this, DialogStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DialogStore).apply(this, arguments));
  }

  _createClass(DialogStore, [{
    key: 'getCurrentPeer',
    value: function getCurrentPeer() {
      return _currentPeer;
    }
  }, {
    key: 'getLastPeer',
    value: function getLastPeer() {
      return _lastPeer;
    }
  }, {
    key: 'isMember',
    value: function isMember() {
      if (_currentPeer !== null && _currentPeer.type === _ActorAppConstants.PeerTypes.GROUP) {
        var group = _ActorClient2.default.getGroup(_currentPeer.id);
        return group.members.length !== 0;
      } else {
        return true;
      }
    }
  }, {
    key: '__onDispatch',
    value: function __onDispatch(action) {
      switch (action.type) {
        case _ActorAppConstants.ActionTypes.BIND_DIALOG_PEER:
          _lastPeer = _currentPeer;
          _currentPeer = action.peer;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.UNBIND_DIALOG_PEER:
          _lastPeer = _currentPeer;
          _currentPeer = null;
          this.__emitChange();
          break;
        default:
      }
    }
  }]);

  return DialogStore;
})(_utils.Store);

exports.default = new DialogStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DialogStore.js.map