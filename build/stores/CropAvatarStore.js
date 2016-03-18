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

var _isOpen = false,
    _pictureSource = null; /*
                            * Copyright (C) 2015 Actor LLC. <https://actor.im>
                            */

var CropAvatarStore = function (_Store) {
  (0, _inherits3.default)(CropAvatarStore, _Store);

  function CropAvatarStore(Dispatcher) {
    (0, _classCallCheck3.default)(this, CropAvatarStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, Dispatcher));
  }

  CropAvatarStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  CropAvatarStore.prototype.getPictureSource = function getPictureSource() {
    return _pictureSource;
  };

  CropAvatarStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.CROP_AVATAR_MODAL_SHOW:
        _isOpen = true;
        _pictureSource = action.source;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CROP_AVATAR_MODAL_HIDE:
        _isOpen = false;
        _pictureSource = null;
        this.__emitChange();
        break;
      default:
    }
  };

  return CropAvatarStore;
}(_utils.Store);

exports.default = new CropAvatarStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=CropAvatarStore.js.map