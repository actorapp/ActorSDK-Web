'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var SearchMessagesStore = function (_ReduceStore) {
  _inherits(SearchMessagesStore, _ReduceStore);

  function SearchMessagesStore() {
    _classCallCheck(this, SearchMessagesStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
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
        return _extends({}, state, {
          isOpen: true,
          isExpanded: false
        });
      case _ActorAppConstants.ActionTypes.SEARCH_HIDE:
        return this.getInitialState();
      case _ActorAppConstants.ActionTypes.SEARCH_TOGGLE_FOCUS:
        return _extends({}, state, {
          isFocused: action.isEnable
        });
      case _ActorAppConstants.ActionTypes.SEARCH_TOGGLE_EXPAND:
        return _extends({}, state, {
          isExpanded: !state.isExpanded
        });
      case _ActorAppConstants.ActionTypes.SEARCH_TEXT:
        return _extends({}, state, {
          query: action.query,
          isSearching: true
        });
      case _ActorAppConstants.ActionTypes.SEARCH_TEXT_SUCCESS:
        return _extends({}, state, {
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
}(_utils.ReduceStore);

exports.default = new SearchMessagesStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=SearchMessagesStore.js.map