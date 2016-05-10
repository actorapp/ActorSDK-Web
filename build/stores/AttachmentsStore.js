'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AttachmentsStore = function (_ReduceStore) {
  _inherits(AttachmentsStore, _ReduceStore);

  function AttachmentsStore() {
    _classCallCheck(this, AttachmentsStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  AttachmentsStore.prototype.getInitialState = function getInitialState() {
    return {
      attachments: new _immutable2.default.List(),
      selectedIndex: 0
    };
  };

  AttachmentsStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_SHOW:
        return _extends({}, state, {
          attachments: new _immutable2.default.List(action.attachments)
        });
      case _ActorAppConstants.ActionTypes.ATTACHMENT_MODAL_HIDE:
        return this.getInitialState();

      case _ActorAppConstants.ActionTypes.ATTACHMENT_SELECT:
        return _extends({}, state, {
          selectedIndex: action.index
        });

      case _ActorAppConstants.ActionTypes.ATTACHMENT_CHANGE:
        var changedAttachment = state.attachments.get(state.selectedIndex);

        return _extends({}, state, {
          attachments: state.attachments.set(state.selectedIndex, _extends({}, changedAttachment, { sendAsPicture: action.sendAsPicture }))
        });

      case _ActorAppConstants.ActionTypes.ATTACHMENT_DELETE:
      case _ActorAppConstants.ActionTypes.ATTACHMENT_SEND:
        return {
          attachments: state.attachments.delete(state.selectedIndex),
          selectedIndex: 0
        };
      case _ActorAppConstants.ActionTypes.ATTACHMENT_SEND_ALL:
        return this.getInitialState();

      default:
        return state;
    }
  };

  AttachmentsStore.prototype.getAllAttachments = function getAllAttachments() {
    return this.getState().attachments.toArray();
  };

  AttachmentsStore.prototype.getAttachment = function getAttachment() {
    var index = arguments.length <= 0 || arguments[0] === undefined ? this.getSelectedIndex() : arguments[0];

    return this.getState().attachments.get(index);
  };

  AttachmentsStore.prototype.getSelectedIndex = function getSelectedIndex() {
    return this.getState().selectedIndex;
  };

  return AttachmentsStore;
}(_utils.ReduceStore);

exports.default = new AttachmentsStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=AttachmentsStore.js.map