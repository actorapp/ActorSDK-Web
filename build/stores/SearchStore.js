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

var SearchStore = function (_ReduceStore) {
  _inherits(SearchStore, _ReduceStore);

  function SearchStore() {
    _classCallCheck(this, SearchStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  SearchStore.prototype.getInitialState = function getInitialState() {
    return {
      query: '',
      results: {
        contacts: [],
        groups: []
      }
    };
  };

  SearchStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.SEARCH_CLEAR:
        return this.getInitialState();

      case _ActorAppConstants.ActionTypes.SEARCH_SET_QUERY:
        return _extends({}, state, {
          query: action.query
        });

      case _ActorAppConstants.ActionTypes.SEARCH_SET_RESULTS:
        return _extends({}, state, {
          results: action.results
        });

      default:
        return state;
    }
  };

  return SearchStore;
}(_utils.ReduceStore);

exports.default = new SearchStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=SearchStore.js.map