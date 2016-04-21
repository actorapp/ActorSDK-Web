'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActivityActionCreators = require('./ActivityActionCreators');

var _ActivityActionCreators2 = _interopRequireDefault(_ActivityActionCreators);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _SearchMessagesStore = require('../stores/SearchMessagesStore');

var _SearchMessagesStore2 = _interopRequireDefault(_SearchMessagesStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                           */

var SearchMessagesActionCreators = function () {
  function SearchMessagesActionCreators() {
    _classCallCheck(this, SearchMessagesActionCreators);

    this.isActivityOpenBeforeSearch = false;
  }

  SearchMessagesActionCreators.prototype.toggleOpen = function toggleOpen(isOpen) {
    if (isOpen) {
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_SHOW);
      // TODO: move this to store
      this.isActivityOpenBeforeSearch = _ActivityStore2.default.isOpen();
      if (this.isActivityOpenBeforeSearch) {
        _ActivityActionCreators2.default.hide();
      }
    } else {
      (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_HIDE);
      if (this.isActivityOpenBeforeSearch) {
        _ActivityActionCreators2.default.show();
      }
    }
  };

  SearchMessagesActionCreators.prototype.toggleFocus = function toggleFocus(isEnable) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_TOGGLE_FOCUS, { isEnable: isEnable });
  };

  SearchMessagesActionCreators.prototype.toggleExpand = function toggleExpand() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_TOGGLE_EXPAND);
  };

  SearchMessagesActionCreators.prototype.setQuery = function setQuery(query) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_TEXT, { query: query });
  };

  SearchMessagesActionCreators.prototype.findAllText = function findAllText(query) {
    if (!query) {
      return;
    }

    var isSearchOpen = _SearchMessagesStore2.default.isOpen();
    var peer = _DialogStore2.default.getCurrentPeer();

    if (!isSearchOpen) {
      this.toggleOpen(true);
    }

    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findAllText(peer, query), {
      request: _ActorAppConstants.ActionTypes.SEARCH_TEXT,
      success: _ActorAppConstants.ActionTypes.SEARCH_TEXT_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.SEARCH_TEXT_ERROR
    }, { peer: peer, query: query });
  };

  SearchMessagesActionCreators.prototype.findAllDocs = function findAllDocs() {
    var peer = _DialogStore2.default.getCurrentPeer();
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findAllDocs(peer), {
      request: _ActorAppConstants.ActionTypes.SEARCH_DOCS,
      success: _ActorAppConstants.ActionTypes.SEARCH_DOCS_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.SEARCH_DOCS_ERROR
    }, { peer: peer });
  };

  SearchMessagesActionCreators.prototype.findAllLinks = function findAllLinks() {
    var peer = _DialogStore2.default.getCurrentPeer();
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findAllLinks(peer), {
      request: _ActorAppConstants.ActionTypes.SEARCH_LINKS,
      success: _ActorAppConstants.ActionTypes.SEARCH_LINKS_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.SEARCH_LINKS_ERROR
    }, { peer: peer });
  };

  SearchMessagesActionCreators.prototype.findAllPhotos = function findAllPhotos() {
    var peer = _DialogStore2.default.getCurrentPeer();
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findAllPhotos(peer), {
      request: _ActorAppConstants.ActionTypes.SEARCH_PHOTO,
      success: _ActorAppConstants.ActionTypes.SEARCH_PHOTO_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.SEARCH_PHOTO_ERROR
    }, { peer: peer });
  };

  return SearchMessagesActionCreators;
}();

exports.default = new SearchMessagesActionCreators();
//# sourceMappingURL=SearchMessagesActionCreators.js.map