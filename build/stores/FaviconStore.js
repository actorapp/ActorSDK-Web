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

var FaviconPath = {
  DEFAULT: 'assets/images/favicon.png',
  NOTIFICATION: 'assets/images/favicon_notification.png'
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */

var _iconPath = FaviconPath.DEFAULT;

var FaviconStore = function (_Store) {
  (0, _inherits3.default)(FaviconStore, _Store);

  function FaviconStore(dispatcher) {
    (0, _classCallCheck3.default)(this, FaviconStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  FaviconStore.prototype.getFaviconPath = function getFaviconPath() {
    return _iconPath;
  };

  FaviconStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.FAVICON_SET:
        if (action.counter === 0) {
          _iconPath = FaviconPath.DEFAULT;
        } else {
          _iconPath = FaviconPath.NOTIFICATION;
        }
        this.__emitChange();
        break;
      default:
    }
  };

  return FaviconStore;
}(_utils.Store);

exports.default = new FaviconStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=FaviconStore.js.map