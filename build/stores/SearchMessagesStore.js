'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchMessagesStore = function (_ReduceStore) {
  (0, _inherits3.default)(SearchMessagesStore, _ReduceStore);

  function SearchMessagesStore() {
    (0, _classCallCheck3.default)(this, SearchMessagesStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  SearchMessagesStore.prototype.getInitialState = function getInitialState() {
    return {
      isOpen: false,
      isFocused: false,
      isExpanded: false,
      isSearching: false,
      query: '',
      results: []
    };
  };

  SearchMessagesStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.SEARCH_SHOW:
        return (0, _extends3.default)({}, state, {
          isOpen: true,
          isExpanded: false
        });
      case _ActorAppConstants.ActionTypes.SEARCH_HIDE:
        return this.getInitialState();
      case _ActorAppConstants.ActionTypes.SEARCH_TOGGLE_FOCUS:
        return (0, _extends3.default)({}, state, {
          isFocused: action.isEnable
        });
      case _ActorAppConstants.ActionTypes.SEARCH_TOGGLE_EXPAND:
        return (0, _extends3.default)({}, state, {
          isExpanded: !state.isExpanded
        });
      case _ActorAppConstants.ActionTypes.SEARCH_TEXT:
        return (0, _extends3.default)({}, state, {
          query: action.query,
          isSearching: true
        });
      case _ActorAppConstants.ActionTypes.SEARCH_TEXT_SUCCESS:
        return (0, _extends3.default)({}, state, {
          results: action.query ? action.response : [],
          isSearching: false
        });
      case _ActorAppConstants.ActionTypes.SEARCH_TEXT_ERROR:
        console.log(action);
        return state;
      default:
        return state;
    }
  };

  SearchMessagesStore.prototype.isOpen = function isOpen() {
    return this.getState().isOpen;
  };

  SearchMessagesStore.prototype.isSearching = function isSearching() {
    return this.getState().isSearching;
  };

  SearchMessagesStore.prototype.isExpanded = function isExpanded() {
    return this.getState().isExpanded;
  };

  SearchMessagesStore.prototype.getQuery = function getQuery() {
    return this.getState().query;
  };

  SearchMessagesStore.prototype.getAllResults = function getAllResults() {
    return this.getState().results;
  };

  return SearchMessagesStore;
}(_utils.ReduceStore); /*
                        * Copyright (C) 2015 Actor LLC. <https://actor.im>
                        */

exports.default = new SearchMessagesStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=SearchMessagesStore.js.map