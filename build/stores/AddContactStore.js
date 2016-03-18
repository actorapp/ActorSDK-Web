'use strict';

exports.__esModule = true;

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

var _isOpen = false,
    _query = '',
    _isSearching = false,
    _results = []; /*
                    * Copyright (C) 2015 Actor LLC. <https://actor.im>
                    */

var AddContactStore = function (_Store) {
  (0, _inherits3.default)(AddContactStore, _Store);

  function AddContactStore(Dispatcher) {
    (0, _classCallCheck3.default)(this, AddContactStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, Dispatcher));
  }

  AddContactStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  AddContactStore.prototype.isSearching = function isSearching() {
    return _isSearching;
  };

  AddContactStore.prototype.getQuery = function getQuery() {
    return _query;
  };

  AddContactStore.prototype.getResults = function getResults() {
    return _results;
  };

  AddContactStore.prototype.setResults = function setResults(results) {
    _results = results;
  };

  AddContactStore.prototype.resetStore = function resetStore() {
    _isOpen = false;
    _query = '';
    _isSearching = false;
    _results = [];
  };

  AddContactStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.CONTACT_ADD_MODAL_SHOW:
        _isOpen = true;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CONTACT_ADD_MODAL_HIDE:
        this.resetStore();
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.CONTACT_FIND:
        _query = action.query;
        _isSearching = true;
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CONTACT_FIND_SUCCESS:
        _isSearching = false;
        if (action.query === '') {
          this.setResults([]);
        } else {
          this.setResults(action.response);
        }
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CONTACT_FIND_ERROR:
        _isSearching = false;
        this.__emitChange();
        break;
      default:
    }
  };

  return AddContactStore;
}(_utils.Store);

exports.default = new AddContactStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=AddContactStore.js.map