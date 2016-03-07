'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _MessageActionCreators = require('./MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _AttachmentStore = require('../stores/AttachmentStore');

var _AttachmentStore2 = _interopRequireDefault(_AttachmentStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  show: function show(attachments) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_SHOW, { attachments: attachments });
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  selectAttachment: function selectAttachment(index) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_SELECT, { index: index });
  },
  changeAttachment: function changeAttachment(sendAsPicture) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_CHANGE, { sendAsPicture: sendAsPicture });
  },
  deleteAttachment: function deleteAttachment() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_DELETE);
  },
  sendAttachment: function sendAttachment() {
    var currentPeer = _DialogStore2.default.getCurrentPeer();
    var attachment = _AttachmentStore2.default.getAttachment();

    if (attachment.isImage && attachment.sendAsPicture) {
      _MessageActionCreators2.default.sendPhotoMessage(currentPeer, attachment.file);
    } else {
      _MessageActionCreators2.default.sendFileMessage(currentPeer, attachment.file);
    }

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_SEND);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },


  sendAll: function sendAll(attachments) {
    var currentPeer = _DialogStore2.default.getCurrentPeer();

    (0, _lodash.forEach)(attachments, function (attachment) {
      if (attachment.isImage && attachment.sendAsPicture) {
        _MessageActionCreators2.default.sendPhotoMessage(currentPeer, attachment.file);
      } else {
        _MessageActionCreators2.default.sendFileMessage(currentPeer, attachment.file);
      }
    });

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_SEND_ALL, { attachments: attachments });
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=AttachmentsActionCreators.js.map