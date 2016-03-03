'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupProfileActionCreators = {
  getIntegrationToken: function getIntegrationToken(gid) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.getIntegrationToken(gid), {
      request: _ActorAppConstants.ActionTypes.GROUP_GET_TOKEN,
      success: _ActorAppConstants.ActionTypes.GROUP_GET_TOKEN_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.GROUP_GET_TOKEN_ERROR
    }, { gid: gid });
  }
};

exports.default = GroupProfileActionCreators;
//# sourceMappingURL=GroupProfileActionCreators.js.map