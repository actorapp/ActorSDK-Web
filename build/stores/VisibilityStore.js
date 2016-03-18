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

var isVisible = false; /*
                        * Copyright (C) 2015 Actor LLC. <https://actor.im>
                        */

var VisibilityStore = function (_Store) {
  (0, _inherits3.default)(VisibilityStore, _Store);

  function VisibilityStore(Dispatcher) {
    (0, _classCallCheck3.default)(this, VisibilityStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, Dispatcher));
  }

  VisibilityStore.prototype.isAppVisible = function isAppVisible() {
    return isVisible;
  };

  VisibilityStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.APP_VISIBLE:
        isVisible = true;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.APP_HIDDEN:
        isVisible = false;
        this.__emitChange();
        break;
      default:
    }
  };

  return VisibilityStore;
}(_utils.Store);

exports.default = new VisibilityStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=VisibilityStore.js.map