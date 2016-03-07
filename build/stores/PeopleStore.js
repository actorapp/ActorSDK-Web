'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _isOpen = false,
    _list = [],
    _results = [];

/**
 * Class representing a store for searchable people list.
 */

var PeopleStore = function (_Store) {
  _inherits(PeopleStore, _Store);

  function PeopleStore(dispatcher) {
    _classCallCheck(this, PeopleStore);

    return _possibleConstructorReturn(this, _Store.call(this, dispatcher));
  }

  /**
   * @returns {boolean}
   */


  PeopleStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  /**
   * @returns {Array}
   */


  PeopleStore.prototype.getList = function getList() {
    return _list;
  };

  /**
   * @returns {Array}
   */


  PeopleStore.prototype.getResults = function getResults() {
    return _results;
  };

  PeopleStore.prototype.handleSearchQuery = function handleSearchQuery(query) {
    var results = [];

    if (query === '') {
      results = _list;
    } else {
      (0, _lodash.forEach)(_list, function (result) {
        var name = result.name.toLowerCase();
        if (name.includes(query.toLowerCase())) {
          results.push(result);
        }
      });
    }

    _results = results;
  };

  PeopleStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.CONTACT_LIST_SHOW:
        _isOpen = true;
        this.handleSearchQuery('');
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.CONTACT_LIST_HIDE:
        _isOpen = false;
        _results = [];
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.CONTACT_LIST_CHANGED:
        // Remove current user from contacts list
        _list = (0, _lodash.filter)(action.contacts, function (contact) {
          if (contact.uid != _ActorClient2.default.getUid()) {
            return contact;
          }
        });
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.CONTACT_LIST_SEARCH:
        this.handleSearchQuery(action.query);
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.CONTACT_ADD:
      case _ActorAppConstants.ActionTypes.CONTACT_REMOVE:
        this.__emitChange();
        break;
      default:
    }
  };

  return PeopleStore;
}(_utils.Store);

exports.default = new PeopleStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=PeopleStore.js.map