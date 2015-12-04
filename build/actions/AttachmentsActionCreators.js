'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _MessageActionCreators = require('./MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _AttachmentStore = require('../stores/AttachmentStore');

var _AttachmentStore2 = _interopRequireDefault(_AttachmentStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  show: function show(attachments) {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_SHOW, { attachments: attachments });
  },
  hide: function hide() {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_HIDE);
  },

  selectAttachment: function selectAttachment(index) {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_SELECT, { index: index });
  },
  changeAttachment: function changeAttachment(sendAsPicture) {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_CHANGE, { sendAsPicture: sendAsPicture });
  },
  deleteAttachment: function deleteAttachment() {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_DELETE);
  },

  sendAttachment: function sendAttachment() {
    var currentPeer = _DialogStore2.default.getSelectedDialogPeer();
    var attachment = _AttachmentStore2.default.getAttachment();

    if (attachment.isImage && attachment.sendAsPicture) {
      _MessageActionCreators2.default.sendPhotoMessage(currentPeer, attachment.file);
    } else {
      _MessageActionCreators2.default.sendFileMessage(currentPeer, attachment.file);
    }

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_SEND);
  },

  sendAll: function sendAll(attachments) {
    var currentPeer = _DialogStore2.default.getSelectedDialogPeer();

    (0, _lodash.forEach)(attachments, function (attachment) {
      if (attachment.isImage && attachment.sendAsPicture) {
        _MessageActionCreators2.default.sendPhotoMessage(currentPeer, attachment.file);
      } else {
        _MessageActionCreators2.default.sendFileMessage(currentPeer, attachment.file);
      }
    });
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_SEND_ALL, { attachments: attachments });
  }
};
//# sourceMappingURL=AttachmentsActionCreators.js.map