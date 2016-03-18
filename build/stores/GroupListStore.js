'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isOpen = false,
    _list = [],
    _results = [];

/**
 * Class representing a store for searchable group list.
 */
/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var GroupStore = function (_Store) {
  (0, _inherits3.default)(GroupStore, _Store);

  function GroupStore(dispatcher) {
    (0, _classCallCheck3.default)(this, GroupStore);
    return (0, _possibleConstructorReturn3.default)(this, _Store.call(this, dispatcher));
  }

  /**
   * @returns {boolean}
   */


  GroupStore.prototype.isOpen = function isOpen() {
    return _isOpen;
  };

  /**
   * @returns {Array}
   */


  GroupStore.prototype.getList = function getList() {
    return _list;
  };

  /**
   * @returns {Array}
   */


  GroupStore.prototype.getResults = function getResults() {
    return _results;
  };

  GroupStore.prototype.handleSearchQuery = function handleSearchQuery(query) {
    var results = [];

    if (query === '') {
      results = _list;
    } else {
      (0, _lodash.forEach)(_list, function (result) {
        var title = result.peerInfo.title.toLowerCase();
        if (title.includes(query.toLowerCase())) {
          results.push(result);
        }
      });
    }

    _results = results;
  };

  GroupStore.prototype.__onDispatch = function __onDispatch(action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.GROUP_LIST_SHOW:
        _isOpen = true;
        this.handleSearchQuery('');
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.GROUP_LIST_HIDE:
        _isOpen = false;
        _results = [];
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_SUCCESS:
        _list = action.response;
        this.handleSearchQuery('');
        this.__emitChange();
        break;
      case _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_ERROR:
        console.error(action.error);
        this.__emitChange();
        break;

      case _ActorAppConstants.ActionTypes.GROUP_LIST_SEARCH:
        this.handleSearchQuery(action.query);
        this.__emitChange();
        break;

      default:
    }
  };

  return GroupStore;
}(_utils.Store);

exports.default = new GroupStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=GroupListStore.js.map