'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActionCreators2 = require('./ActionCreators');

var _ActionCreators3 = _interopRequireDefault(_ActionCreators2);

var _ConnectionStateActionCreators = require('../actions/ConnectionStateActionCreators');

var _ConnectionStateActionCreators2 = _interopRequireDefault(_ConnectionStateActionCreators);

var _DraftActionCreators = require('../actions/DraftActionCreators');

var _DraftActionCreators2 = _interopRequireDefault(_DraftActionCreators);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VisibilityActionCreators = function (_ActionCreators) {
  (0, _inherits3.default)(VisibilityActionCreators, _ActionCreators);

  function VisibilityActionCreators() {
    (0, _classCallCheck3.default)(this, VisibilityActionCreators);
    return (0, _possibleConstructorReturn3.default)(this, _ActionCreators.apply(this, arguments));
  }

  VisibilityActionCreators.prototype.createAppVisible = function createAppVisible() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_VISIBLE);
    _ActorClient2.default.onAppVisible();
    this.setBindings('connect', [_ActorClient2.default.bindConnectState(_ConnectionStateActionCreators2.default.setState)]);
  };

  VisibilityActionCreators.prototype.createAppHidden = function createAppHidden() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_HIDDEN);

    var currentPeer = _DialogStore2.default.getCurrentPeer();
    _DraftActionCreators2.default.saveDraft(currentPeer);

    _ActorClient2.default.onAppHidden();
    this.removeBindings('connect');
  };

  return VisibilityActionCreators;
}(_ActionCreators3.default); /*
                              * Copyright (C) 2015 Actor LLC. <https://actor.im>
                              */

exports.default = new VisibilityActionCreators();
//# sourceMappingURL=VisibilityActionCreators.js.map