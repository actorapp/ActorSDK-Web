'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var AddContactStore = (function (_Store) {
  _inherits(AddContactStore, _Store);

  function AddContactStore(Dispatcher) {
    _classCallCheck(this, AddContactStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AddContactStore).call(this, Dispatcher));
  }

  _createClass(AddContactStore, [{
    key: 'isOpen',
    value: function isOpen() {
      return _isOpen;
    }
  }, {
    key: 'isSearching',
    value: function isSearching() {
      return _isSearching;
    }
  }, {
    key: 'getQuery',
    value: function getQuery() {
      return _query;
    }
  }, {
    key: 'getResults',
    value: function getResults() {
      return _results;
    }
  }, {
    key: 'setResults',
    value: function setResults(results) {
      _results = results;
    }
  }, {
    key: 'resetStore',
    value: function resetStore() {
      _isOpen = false;
      _query = '';
      _isSearching = false;
      _results = [];
    }
  }, {
    key: '__onDispatch',
    value: function __onDispatch(action) {
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
    }
  }]);

  return AddContactStore;
})(_utils.Store);

exports.default = new AddContactStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=AddContactStore.js.map