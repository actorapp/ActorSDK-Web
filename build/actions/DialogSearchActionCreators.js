'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ComposeActionCreators = require('./ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                           */


var DialogSearchActionCreators = function () {
  function DialogSearchActionCreators() {
    _classCallCheck(this, DialogSearchActionCreators);

    this.findAllText = (0, _lodash.debounce)(this.findAllText, 300, { trailing: true });
    this.findAllDocs = (0, _lodash.debounce)(this.findAllDocs, 300, { trailing: true });
    this.findAllLinks = (0, _lodash.debounce)(this.findAllLinks, 300, { trailing: true });
    this.findAllPhotos = (0, _lodash.debounce)(this.findAllPhotos, 300, { trailing: true });
  }

  DialogSearchActionCreators.prototype.open = function open() {
    var query = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DIALOG_SEARCH_SHOW);
    _ComposeActionCreators2.default.toggleAutoFocus(false);

    this.changeSearchQuery(query);
  };

  DialogSearchActionCreators.prototype.close = function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DIALOG_SEARCH_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  };

  DialogSearchActionCreators.prototype.changeSearchQuery = function changeSearchQuery(query) {
    var filter = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DIALOG_SEARCH_CHANGE_QUERY, { query: query });

    if (filter.text) this.findAllText(query);
    if (filter.docs) this.findAllDocs();
    if (filter.links) this.findAllLinks();
    if (filter.photos) this.findAllPhotos();
  };

  DialogSearchActionCreators.prototype.findAllText = function findAllText(query) {
    var peer = _DialogStore2.default.getCurrentPeer();
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findAllText(peer, query), {
      request: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_TEXT,
      success: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_TEXT_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_TEXT_ERROR
    }, { peer: peer, query: query });
  };

  DialogSearchActionCreators.prototype.findAllDocs = function findAllDocs() {
    var peer = _DialogStore2.default.getCurrentPeer();
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findAllDocs(peer), {
      request: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_DOCS,
      success: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_DOCS_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_DOCS_ERROR
    }, { peer: peer });
  };

  DialogSearchActionCreators.prototype.findAllLinks = function findAllLinks() {
    var peer = _DialogStore2.default.getCurrentPeer();
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findAllLinks(peer), {
      request: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_LINKS,
      success: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_LINKS_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_LINKS_ERROR
    }, { peer: peer });
  };

  DialogSearchActionCreators.prototype.findAllPhotos = function findAllPhotos() {
    var peer = _DialogStore2.default.getCurrentPeer();
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findAllPhotos(peer), {
      request: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_PHOTO,
      success: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_PHOTO_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.DIALOG_SEARCH_PHOTO_ERROR
    }, { peer: peer });
  };

  return DialogSearchActionCreators;
}();

exports.default = new DialogSearchActionCreators();
//# sourceMappingURL=DialogSearchActionCreators.js.map