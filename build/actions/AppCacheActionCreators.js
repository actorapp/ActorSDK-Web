'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

exports.default = {
  openModal: function openModal() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_UPDATE_MODAL_SHOW);
  },
  closeModal: function closeModal() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_UPDATE_MODAL_HIDE);
  },
  confirmUpdate: function confirmUpdate() {
    window.location.reload();
  }
};
//# sourceMappingURL=AppCacheActionCreators.js.map