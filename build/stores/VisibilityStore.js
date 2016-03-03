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

var isVisible = false;

var VisibilityStore = (function (_Store) {
  _inherits(VisibilityStore, _Store);

  function VisibilityStore(Dispatcher) {
    _classCallCheck(this, VisibilityStore);

    return _possibleConstructorReturn(this, _Store.call(this, Dispatcher));
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
})(_utils.Store);

exports.default = new VisibilityStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=VisibilityStore.js.map