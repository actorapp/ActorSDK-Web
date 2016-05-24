'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('flux/utils');

var _immutable = require('immutable');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DialogSearchStore = function (_ReduceStore) {
  _inherits(DialogSearchStore, _ReduceStore);

  function DialogSearchStore() {
    _classCallCheck(this, DialogSearchStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  DialogSearchStore.prototype.getInitialState = function getInitialState() {
    return {
      isOpen: false,
      query: '',
      filter: new _immutable.Map({
        text: true,
        docs: true,
        links: true,
        photos: true
      }),
      result: new _immutable.Map({
        text: [],
        docs: [],
        links: [],
        photos: []
      }),
      status: new _immutable.Map({
        text: _ActorAppConstants.AsyncActionStates.SUCCESS,
        docs: _ActorAppConstants.AsyncActionStates.SUCCESS,
        links: _ActorAppConstants.AsyncActionStates.SUCCESS,
        photos: _ActorAppConstants.AsyncActionStates.SUCCESS
      })
    };
  };

  DialogSearchStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.DIALOG_SEARCH_SHOW:
        return _extends({}, state, {
          isOpen: true
        });

      case _ActorAppConstants.ActionTypes.BIND_DIALOG_PEER:
      case _ActorAppConstants.ActionTypes.DIALOG_SEARCH_HIDE:
        return this.getInitialState();

      case _ActorAppConstants.ActionTypes.DIALOG_SEARCH_CHANGE_QUERY:
        return _extends({}, state, {
          query: action.query
        });

      case _ActorAppConstants.ActionTypes.DIALOG_SEARCH_TEXT_SUCCESS:
        return _extends({}, state, {
          result: state.result.set('text', action.response),
          status: state.result.set('text', _ActorAppConstants.AsyncActionStates.SUCCESS)
        });

      case _ActorAppConstants.ActionTypes.DIALOG_SEARCH_DOCS_SUCCESS:
        return _extends({}, state, {
          result: state.result.set('docs', action.response)
        });

      case _ActorAppConstants.ActionTypes.DIALOG_SEARCH_LINKS_SUCCESS:
        return _extends({}, state, {
          result: state.result.set('links', action.response)
        });

      case _ActorAppConstants.ActionTypes.DIALOG_SEARCH_PHOTO_SUCCESS:
        return _extends({}, state, {
          result: state.result.set('photos', action.response)
        });

      default:
        return state;
    }
  };

  return DialogSearchStore;
}(_utils.ReduceStore);

exports.default = new DialogSearchStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=DialogSearchStore.js.map