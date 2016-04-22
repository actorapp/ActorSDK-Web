'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _blobToFile = require('../utils/blobToFile');

var _blobToFile2 = _interopRequireDefault(_blobToFile);

var _MessageActionCreators = require('./MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _AttachmentsStore = require('../stores/AttachmentsStore');

var _AttachmentsStore2 = _interopRequireDefault(_AttachmentsStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  show: function show(attachments) {
    var normalizedAttachments = attachments.map(function (file) {
      if (file instanceof File == false) {
        file = (0, _blobToFile2.default)(file);
      }

      return {
        isImage: file.type.includes('image') && file.type !== 'image/gif',
        sendAsPicture: true,
        file: file
      };
    });

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_SHOW, { attachments: normalizedAttachments });
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
    if (_AttachmentsStore2.default.getAllAttachments().length === 0) {
      this.hide();
    }
  },
  sendAttachment: function sendAttachment() {
    var currentPeer = _DialogStore2.default.getCurrentPeer();
    var attachment = _AttachmentsStore2.default.getAttachment();

    if (attachment.isImage && attachment.sendAsPicture) {
      _MessageActionCreators2.default.sendPhotoMessage(currentPeer, attachment.file);
    } else {
      _MessageActionCreators2.default.sendFileMessage(currentPeer, attachment.file);
    }

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_SEND);

    if (_AttachmentsStore2.default.getAllAttachments().length === 0) {
      this.hide();
    }

    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  sendAll: function sendAll(attachments) {
    var currentPeer = _DialogStore2.default.getCurrentPeer();

    attachments.forEach(function (attachment) {
      if (attachment.isImage && attachment.sendAsPicture) {
        _MessageActionCreators2.default.sendPhotoMessage(currentPeer, attachment.file);
      } else {
        _MessageActionCreators2.default.sendFileMessage(currentPeer, attachment.file);
      }
    });

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ATTACHMENT_SEND_ALL, { attachments: attachments });
    this.hide();
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=AttachmentsActionCreators.js.map