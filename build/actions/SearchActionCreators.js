'use strict';

exports.__esModule = true;

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _PeerUtils = require('../utils/PeerUtils');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _QuickSearchStore = require('../stores/QuickSearchStore');

var _QuickSearchStore2 = _interopRequireDefault(_QuickSearchStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var match = function match(value, query) {
  return _fuzzaldrin2.default.score(value, query) > 0;
};

var SearchActionCreators = function () {
  function SearchActionCreators() {
    _classCallCheck(this, SearchActionCreators);
  }

  SearchActionCreators.prototype.clearSearch = function clearSearch() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_CLEAR);
  };

  SearchActionCreators.prototype.handleSearch = function handleSearch(query) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_SET_QUERY, { query: query });
    this.updateResults(query);
  };

  SearchActionCreators.prototype.updateResults = function updateResults(query) {
    var elements = _QuickSearchStore2.default.getState();
    var results = { contacts: [], groups: [] };

    elements.filter(function (element) {
      return match(element.peerInfo.title, query) || match(element.peerInfo.userName, query);
    }).forEach(function (element) {
      if ((0, _PeerUtils.isPeerUser)(element.peerInfo.peer)) {
        results.contacts.push(element);
      } else if ((0, _PeerUtils.isPeerGroup)(element.peerInfo.peer)) {
        results.groups.push(element);
      } else {
        console.error('Unexpected quick search element:', element);
      }
    });

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_SET_RESULTS, { results: results });
  };

  return SearchActionCreators;
}();

exports.default = new SearchActionCreators();
//# sourceMappingURL=SearchActionCreators.js.map