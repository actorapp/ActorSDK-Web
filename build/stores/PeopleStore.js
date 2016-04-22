'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PeopleStore = function (_ReduceStore) {
  _inherits(PeopleStore, _ReduceStore);

  function PeopleStore() {
    _classCallCheck(this, PeopleStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
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

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    return state;
  };

  return PeopleStore;
}(_utils.ReduceStore);

exports.default = new PeopleStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=PeopleStore.js.map