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

var FaviconStore = function (_ReduceStore) {
  _inherits(FaviconStore, _ReduceStore);

  function FaviconStore() {
    _classCallCheck(this, FaviconStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  FaviconStore.prototype.getInitialState = function getInitialState() {
    return 0;
  };

  FaviconStore.prototype.reduce = function reduce(state, action) {
    if (action.type === _ActorAppConstants.ActionTypes.FAVICON_SET) {
      return action.counter;
    }

    return state;
  };

  return FaviconStore;
}(_utils.ReduceStore);

exports.default = new FaviconStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=FaviconStore.js.map