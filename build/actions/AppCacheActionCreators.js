'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  openModal: function openModal() {
    _ActorAppDispatcher2.default.dispatch({
      type: _ActorAppConstants.ActionTypes.APP_UPDATE_MODAL_SHOW
    });
  },

  closeModal: function closeModal() {
    _ActorAppDispatcher2.default.dispatch({
      type: _ActorAppConstants.ActionTypes.APP_UPDATE_MODAL_HIDE
    });
  },

  confirmUpdate: function confirmUpdate() {
    window.location.reload();
  }

};
//# sourceMappingURL=AppCacheActionCreators.js.map