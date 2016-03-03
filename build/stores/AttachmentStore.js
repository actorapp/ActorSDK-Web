'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

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

var _isOpen = false,
    _attachments = [],
    _selectedIndex = 0;

var SEND_AS_PICTURE = true;

var blobToFile = function blobToFile(blob, fileName) {
  blob.lastModifiedDate = blob.lastModifiedDate ? blob.lastModifiedDate : new Date();
  blob.name = fileName ? fileName : blob.lastModifiedDate + '.' + blob.type.split('/')[1];
  return blob;
};

var AttachmentStore = (function (_Store) {
  _inherits(AttachmentStore, _Store);

  function AttachmentStore(dispatcher) {
    _classCallCheck(this, AttachmentStore);

    return _possibleConstructorReturn(this, _Store.call(this, dispatcher));
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
})(_utils.Store);

exports.default = new AttachmentStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=AttachmentStore.js.map