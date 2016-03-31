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

var DraftStore = function (_Store) {
  (0, _inherits3.default)(DraftStore, _Store);

  function DraftStore(dispatcher) {
    (0, _classCallCheck3.default)(this, DraftStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));

    _this._draft = null;
    return _this;
  }

  DraftStore.prototype.getDraft = function getDraft() {
    return this._draft;
  };

  DraftStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.DRAFT_LOAD:
        this._draft = action.draft;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.DRAFT_CHANGE:
        this._draft = action.draft;
        this.__emitChange();
        break;

      default:
    }
  };

  return DraftStore;
}(_utils.Store); /*
                  * Copyright (C) 2015 Actor LLC. <https://actor.im>
                  */

exports.default = new DraftStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DraftStore.js.map