'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _DialogStore = require('./DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _ContactStore = require('./ContactStore');

var _ContactStore2 = _interopRequireDefault(_ContactStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _isOpen = false,
    _list = [],
    _results = [];

var QuickSearchStore = (function (_Store) {
  _inherits(QuickSearchStore, _Store);

  function QuickSearchStore(Dispatcher) {
    _classCallCheck(this, QuickSearchStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(QuickSearchStore).call(this, Dispatcher));

    _this.__onDispatch = function (action) {
      switch (action.type) {
        case _ActorAppConstants.ActionTypes.QUICK_SEARCH_SHOW:
          _isOpen = true;
          _this.handleSearchQuery('');
          _this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.QUICK_SEARCH_HIDE:
          _isOpen = false;
          _results = [];
          _this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.QUICK_SEARCH_CHANGED:
          _list = action.list;
          _this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.QUICK_SEARCH:
          _this.handleSearchQuery(action.query);
          break;
      }
    };

    return _this;
  }

  _createClass(QuickSearchStore, [{
    key: 'isOpen',
    value: function isOpen() {
      return _isOpen;
    }
  }, {
    key: 'getResults',
    value: function getResults() {
      return _results;
    }
  }, {
    key: 'handleSearchQuery',
    value: function handleSearchQuery(query) {
      var results = [];

      if (query === '') {
        results = _list;
      } else {
        (0, _lodash.forEach)(_list, function (result) {
          if (result.peerInfo.title.toLowerCase().includes(query.toLowerCase())) {
            results.push(result);
          }
        });
      }

      _results = results;
      this.__emitChange();
    }
  }]);

  return QuickSearchStore;
})(_utils.Store);

exports.default = new QuickSearchStore(_ActorAppDispatcher2.default);