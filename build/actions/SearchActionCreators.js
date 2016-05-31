'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _SearchUtils = require('../utils/SearchUtils');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _QuickSearchStore = require('../stores/QuickSearchStore');

var _QuickSearchStore2 = _interopRequireDefault(_QuickSearchStore);

var _ComposeActionCreators = require('./ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _SearchMessagesActionCreators = require('./SearchMessagesActionCreators');

var _SearchMessagesActionCreators2 = _interopRequireDefault(_SearchMessagesActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchActionCreators = function () {
  function SearchActionCreators() {
    _classCallCheck(this, SearchActionCreators);
  }

  SearchActionCreators.prototype.focus = function focus() {
    _ComposeActionCreators2.default.toggleAutoFocus(false);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_FOCUS);
  };

  SearchActionCreators.prototype.blur = function blur() {
    _ComposeActionCreators2.default.toggleAutoFocus(true);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_BLUR);
  };

  SearchActionCreators.prototype.clear = function clear() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_CLEAR);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  };

  SearchActionCreators.prototype.goToMessagesSearch = function goToMessagesSearch(query) {
    _SearchMessagesActionCreators2.default.open();
    _SearchMessagesActionCreators2.default.setQuery(query);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_CLEAR);
  };

  SearchActionCreators.prototype.goToContact = function goToContact(contact) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_CLEAR);
    _history2.default.push('/im/' + contact.peerInfo.peer.key);
  };

  SearchActionCreators.prototype.handleSearch = function handleSearch(query) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_SET_QUERY, { query: query });
    this.updateResults(query);
  };

  SearchActionCreators.prototype.updateResults = function updateResults(query) {
    var elements = _QuickSearchStore2.default.getState();
    var results = (0, _SearchUtils.search)(query, elements, function (element) {
      return [element.peerInfo.title, element.peerInfo.userName];
    });

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.SEARCH_SET_RESULTS, { results: results });
  };

  return SearchActionCreators;
}();

exports.default = new SearchActionCreators();
//# sourceMappingURL=SearchActionCreators.js.map