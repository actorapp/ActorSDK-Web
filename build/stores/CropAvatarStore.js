'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    _pictureSource = null;

var CropAvatarStore = (function (_Store) {
  _inherits(CropAvatarStore, _Store);

  function CropAvatarStore(Dispatcher) {
    _classCallCheck(this, CropAvatarStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CropAvatarStore).call(this, Dispatcher));

    _this.__onDispatch = function (action) {
      switch (action.type) {
        case _ActorAppConstants.ActionTypes.CROP_AVATAR_MODAL_SHOW:
          _isOpen = true;
          _pictureSource = action.source;
          _this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.CROP_AVATAR_MODAL_HIDE:
          _isOpen = false;
          _pictureSource = null;
          _this.__emitChange();
          break;
        default:
        // no op
      }
    };

    return _this;
  }

  _createClass(CropAvatarStore, [{
    key: 'isOpen',
    value: function isOpen() {
      return _isOpen;
    }
  }, {
    key: 'getPictureSource',
    value: function getPictureSource() {
      return _pictureSource;
    }
  }]);

  return CropAvatarStore;
})(_utils.Store);

exports.default = new CropAvatarStore(_ActorAppDispatcher2.default);