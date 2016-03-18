'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var _isOpen = false,
    _list = [],
    _results = [];

var QuickSearchStore = function (_Store) {
  (0, _inherits3.default)(QuickSearchStore, _Store);

  function QuickSearchStore(dispatcher) {
    (0, _classCallCheck3.default)(this, QuickSearchStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  QuickSearchStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  QuickSearchStore.prototype.getResults = function getResults() {
    return _results;
  };

  QuickSearchStore.prototype.handleSearchQuery = function handleSearchQuery(query) {
    var results = [];

    if (query === '') {
      results = _list;
    } else {
      (0, _lodash.forEach)(_list, function (result) {
        if (result.peerInfo.title.toLowerCase().includes(query.toLowerCase())) {
          results.push(result);
        }
      });
    }

    _results = results;
    this.__emitChange();
  };

  QuickSearchStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.QUICK_SEARCH_SHOW:
        _isOpen = true;
        this.handleSearchQuery('');
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.QUICK_SEARCH_HIDE:
        _isOpen = false;
        _results = [];
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.QUICK_SEARCH_CHANGED:
        _list = action.list;
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.QUICK_SEARCH:
        this.handleSearchQuery(action.query);
        break;
    }
  };

  return QuickSearchStore;
}(_utils.Store);

exports.default = new QuickSearchStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=QuickSearchStore.js.map