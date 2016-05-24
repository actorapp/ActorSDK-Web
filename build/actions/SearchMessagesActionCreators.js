'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _SearchMessagesStore = require('../stores/SearchMessagesStore');

var _SearchMessagesStore2 = _interopRequireDefault(_SearchMessagesStore);

var _ComposeActionCreators = require('./ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                           */

var SearchMessagesActionCreators = function () {
  function SearchMessagesActionCreators() {
    _classCallCheck(this, SearchMessagesActionCreators);

    this.findText = (0, _lodash.debounce)(this.findText.bind(this), 100, { maxWait: 300 });
  }

  SearchMessagesActionCreators.prototype.open = function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_MESSAGES_SHOW);
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  };

  SearchMessagesActionCreators.prototype.close = function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_MESSAGES_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  };

  SearchMessagesActionCreators.prototype.setQuery = function setQuery(query) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_MESSAGES_SET_QUERY, { query: query });
    this.findText();
  };

  SearchMessagesActionCreators.prototype.findText = function findText() {
    var _SearchMessagesStore$ = _SearchMessagesStore2.default.getState();

    var query = _SearchMessagesStore$.query;

    if (!query) {
      return;
    }

    var peer = _DialogStore2.default.getCurrentPeer();
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findAllText(peer, query), {
      request: _ActorAppConstants.ActionTypes.SEARCH_TEXT,
      success: _ActorAppConstants.ActionTypes.SEARCH_TEXT_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.SEARCH_TEXT_ERROR
    }, { peer: peer, query: query });
  };

  return SearchMessagesActionCreators;
}();

exports.default = new SearchMessagesActionCreators();
//# sourceMappingURL=SearchMessagesActionCreators.js.map