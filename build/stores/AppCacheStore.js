'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CHANGE_EVENT = 'change';

var _isModalOpen = false;

var AppCacheStore = (function (_EventEmitter) {
  _inherits(AppCacheStore, _EventEmitter);

  function AppCacheStore() {
    _classCallCheck(this, AppCacheStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppCacheStore).apply(this, arguments));
  }

  _createClass(AppCacheStore, [{
    key: 'isModalOpen',
    value: function isModalOpen() {
      return _isModalOpen;
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      this.emit(CHANGE_EVENT);
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }]);

  return AppCacheStore;
})(_events.EventEmitter);

var AppCacheStoreInstance = new AppCacheStore();

AppCacheStoreInstance.dispatchToken = _ActorAppDispatcher2.default.register(function (action) {
  switch (action.type) {
    case _ActorAppConstants.ActionTypes.APP_UPDATE_MODAL_SHOW:
      _isModalOpen = true;
      AppCacheStoreInstance.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.APP_UPDATE_MODAL_HIDE:
      _isModalOpen = false;
      AppCacheStoreInstance.emitChange();
      break;
    default:
      return;
  }
});

exports.default = AppCacheStoreInstance;