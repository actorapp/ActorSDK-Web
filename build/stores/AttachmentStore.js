'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var _isOpen = false,
    _attachments = [],
    _selectedIndex = 0;

var SEND_AS_PICTURE = true;

var blobToFile = function blobToFile(blob, fileName) {
  blob.lastModifiedDate = blob.lastModifiedDate ? blob.lastModifiedDate : new Date();
  blob.name = fileName ? fileName : blob.lastModifiedDate + '.' + blob.type.split('/')[1];
  return blob;
};

var AttachmentStore = function (_Store) {
  (0, _inherits3.default)(AttachmentStore, _Store);

  function AttachmentStore(dispatcher) {
    (0, _classCallCheck3.default)(this, AttachmentStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  AttachmentStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  AttachmentStore.prototype.getAllAttachments = function getAllAttachments() {
    return _attachments;
  };

  AttachmentStore.prototype.getAttachment = function getAttachment() {
    var index = arguments.length <= 0 || arguments[0] === undefined ? _selectedIndex : arguments[0];

    return _attachments[index];
  };

  AttachmentStore.prototype.getSelectedIndex = function getSelectedIndex() {
    return _selectedIndex;
  };

  AttachmentStore.prototype.deleteAttachment = function deleteAttachment() {
    var index = arguments.length <= 0 || arguments[0] === undefined ? _selectedIndex : arguments[0];

    _attachments.splice(index, 1);

    if (_attachments.length === 0) {
      this.resetStore();
    }

    _selectedIndex = 0; // TODO: select relevant index
  };

  AttachmentStore.prototype.resetStore = function resetStore() {
    _isOpen = false;
    _attachments = [];
    _selectedIndex = 0;
  };

  AttachmentStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_SHOW:
        _isOpen = true;
        _attachments = (0, _lodash.map)(action.attachments, function (file) {
          if (file instanceof File == false) {
            file = blobToFile(file);
          }

          var isImage = file.type.includes('image') && file.type !== 'image/gif';
          return {
            isImage: isImage,
            sendAsPicture: SEND_AS_PICTURE,
            file: file
          };
        });
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_HIDE:
        this.resetStore();
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.ATTACHMENT_SELECT:
        _selectedIndex = action.index;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.ATTACHMENT_CHANGE:
        _attachments[_selectedIndex].sendAsPicture = action.sendAsPicture;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.ATTACHMENT_DELETE:
      case _ActorAppConstants.ActionTypes.ATTACHMENT_SEND:
        this.deleteAttachment();
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.ATTACHMENT_SEND_ALL:
        this.resetStore();
        this.__emitChange();
        break;
      default:
    }
  };

  return AttachmentStore;
}(_utils.Store);

exports.default = new AttachmentStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=AttachmentStore.js.map