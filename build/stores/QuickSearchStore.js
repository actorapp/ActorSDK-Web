'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

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
    _list = [],
    _results = [];

var QuickSearchStore = function (_Store) {
  _inherits(QuickSearchStore, _Store);

  function QuickSearchStore(dispatcher) {
    _classCallCheck(this, QuickSearchStore);

    return _possibleConstructorReturn(this, _Store.call(this, dispatcher));
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