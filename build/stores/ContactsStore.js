'use strict';

exports.__esModule = true;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var PeopleStore = function (_ReduceStore) {
  (0, _inherits3.default)(PeopleStore, _ReduceStore);

  function PeopleStore() {
    (0, _classCallCheck3.default)(this, PeopleStore);
    return (0, _possibleConstructorReturn3.default)(this, _ReduceStore.apply(this, arguments));
  }

  PeopleStore.prototype.getInitialState = function getInitialState() {
    return [];
  };

  PeopleStore.prototype.reduce = function reduce(state, action) {
    if (action.type === _ActorAppConstants.ActionTypes.CONTACT_LIST_CHANGED) {
      var _ret = function () {
        var uid = _ActorClient2.default.getUid();
        return {
          v: action.contacts.filter(function (contact) {
            return contact.uid !== uid;
          })
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    }

    return state;
  };

  return PeopleStore;
}(_utils.ReduceStore);

exports.default = new PeopleStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=ContactsStore.js.map