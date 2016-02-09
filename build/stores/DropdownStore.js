'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _isOpen = false;
var _message = {};
var _targetRect = {};

var DropdownStore = (function (_Store) {
  _inherits(DropdownStore, _Store);

  function DropdownStore(dispatcher) {
    _classCallCheck(this, DropdownStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownStore).call(this, dispatcher));
  }

  _createClass(DropdownStore, [{
    key: 'isOpen',
    value: function isOpen(rid) {
      if (rid === _message.rid) {
        return _isOpen;
      } else {
        return false;
      }
    }
  }, {
    key: 'getMessage',
    value: function getMessage() {
      return _message;
    }
  }, {
    key: 'getTargetRect',
    value: function getTargetRect() {
      return _targetRect;
    }
  }, {
    key: '__onDispatch',
    value: function __onDispatch(action) {
      switch (action.type) {
        case _ActorAppConstants.ActionTypes.DROPDOWN_SHOW:
          _isOpen = true;
          _message = action.message;
          _targetRect = action.targetRect;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.DROPDOWN_HIDE:
          _isOpen = false;
          this.__emitChange();
          break;
        default:
      }
    }
  }]);

  return DropdownStore;
})(_utils.Store);

exports.default = new DropdownStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DropdownStore.js.map