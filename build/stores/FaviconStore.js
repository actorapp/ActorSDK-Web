'use strict';

exports.__esModule = true;

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FaviconPath = {
  DEFAULT: 'assets/images/favicon.png',
  NOTIFICATION: 'assets/images/favicon_notification.png'
};

var _iconPath = FaviconPath.DEFAULT;

var FaviconStore = (function (_Store) {
  _inherits(FaviconStore, _Store);

  function FaviconStore(dispatcher) {
    _classCallCheck(this, FaviconStore);

    return _possibleConstructorReturn(this, _Store.call(this, dispatcher));
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
})(_utils.Store);

exports.default = new FaviconStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=FaviconStore.js.map