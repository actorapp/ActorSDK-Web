'use strict';

exports.__esModule = true;

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
    _query = '',
    _isSearching = false,
    _results = [];

var AddContactStore = function (_Store) {
  _inherits(AddContactStore, _Store);

  function AddContactStore(Dispatcher) {
    _classCallCheck(this, AddContactStore);

    return _possibleConstructorReturn(this, _Store.call(this, Dispatcher));
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