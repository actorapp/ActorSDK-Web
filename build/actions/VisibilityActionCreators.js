'use strict';

exports.__esModule = true;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var VisibilityActionCreators = function (_ActionCreators) {
  _inherits(VisibilityActionCreators, _ActionCreators);

  function VisibilityActionCreators() {
    _classCallCheck(this, VisibilityActionCreators);

    return _possibleConstructorReturn(this, _ActionCreators.apply(this, arguments));
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
}(_ActionCreators3.default);

exports.default = new VisibilityActionCreators();
//# sourceMappingURL=VisibilityActionCreators.js.map