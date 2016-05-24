'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _DelegateContainer = require('../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _MessagesSection = require('./dialog/MessagesSection.react');

var _MessagesSection2 = _interopRequireDefault(_MessagesSection);

var _DialogHeader = require('./dialog/DialogHeader.react');

var _DialogHeader2 = _interopRequireDefault(_DialogHeader);

var _DialogFooter = require('./dialog/DialogFooter.react');

var _DialogFooter2 = _interopRequireDefault(_DialogFooter);

var _Activity = require('./Activity.react');

var _Activity2 = _interopRequireDefault(_Activity);

var _Call = require('./Call.react');

var _Call2 = _interopRequireDefault(_Call);

var _DialogSearch = require('./search/DialogSearch.react');

var _DialogSearch2 = _interopRequireDefault(_DialogSearch);

var _SearchResults = require('./search/SearchResults.react');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _UserStore = require('../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _DialogInfoStore = require('../stores/DialogInfoStore');

var _DialogInfoStore2 = _interopRequireDefault(_DialogInfoStore);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _OnlineStore = require('../stores/OnlineStore');

var _OnlineStore2 = _interopRequireDefault(_OnlineStore);

var _CallStore = require('../stores/CallStore');

var _CallStore2 = _interopRequireDefault(_CallStore);

var _SearchMessagesStore = require('../stores/SearchMessagesStore');

var _SearchMessagesStore2 = _interopRequireDefault(_SearchMessagesStore);

var _DialogActionCreators = require('../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _MessageActionCreators = require('../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _BlockedUsersActionCreators = require('../actions/BlockedUsersActionCreators');

var _BlockedUsersActionCreators2 = _interopRequireDefault(_BlockedUsersActionCreators);

var _SearchMessagesActionCreators = require('../actions/SearchMessagesActionCreators');

var _SearchMessagesActionCreators2 = _interopRequireDefault(_SearchMessagesActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  Dialog.getStores = function getStores() {
    return [_ActivityStore2.default, _DialogStore2.default, _DialogInfoStore2.default, _OnlineStore2.default, _CallStore2.default, _SearchMessagesStore2.default];
  };

  Dialog.calculateState = function calculateState() {
    var peer = _DialogStore2.default.getCurrentPeer();
    var dialogInfo = _DialogInfoStore2.default.getState();

    return {
      peer: peer,
      dialogInfo: dialogInfo,
      uid: _UserStore2.default.getMyId(),
      isMember: _DialogStore2.default.isMember(),
      isActivityOpen: _ActivityStore2.default.isOpen(),
      message: _OnlineStore2.default.getMessage(),
      isFavorite: _DialogStore2.default.isFavorite(peer.id),
      call: Dialog.calculateCallState(peer),
      search: _SearchMessagesStore2.default.getState()
    };
  };

  Dialog.calculateCallState = function calculateCallState(peer) {
    var call = _CallStore2.default.getState();

    if (!call.isOpen || !_PeerUtils2.default.equals(peer, call.peer)) {
      return {
        isCalling: false
      };
    }

    return _extends({}, call, {
      isCalling: true
    });
  };

  function Dialog(props, context) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.updatePeer(_this.props.params.id);

    _this.handleStartClick = _this.handleStartClick.bind(_this);
    _this.handleUnblock = _this.handleUnblock.bind(_this);
    _this.handleDialogSearchCancel = _this.handleDialogSearchCancel.bind(_this);
    _this.handleDialogSearchChange = _this.handleDialogSearchChange.bind(_this);

    _this.components = _this.getComponents();
    return _this;
  }

  Dialog.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.updatePeer(nextProps.params.id);
    }
  };

  Dialog.prototype.componentWillUnmount = function componentWillUnmount() {
    _DialogActionCreators2.default.selectDialogPeer(null);
  };

  Dialog.prototype.updatePeer = function updatePeer(id) {
    var peer = _PeerUtils2.default.stringToPeer(id);
    if (_PeerUtils2.default.hasPeer(peer)) {
      _DialogActionCreators2.default.selectDialogPeer(peer);
    } else {
      _history2.default.replace('/im');
    }
  };

  Dialog.prototype.handleStartClick = function handleStartClick() {
    var peer = this.state.peer;

    _MessageActionCreators2.default.sendTextMessage(peer, '/start');
  };

  Dialog.prototype.handleUnblock = function handleUnblock() {
    var dialogInfo = this.state.dialogInfo;

    _BlockedUsersActionCreators2.default.unblockUser(dialogInfo.id);
  };

  Dialog.prototype.handleDialogSearchChange = function handleDialogSearchChange(query) {
    _SearchMessagesActionCreators2.default.setQuery(query);
  };

  Dialog.prototype.handleDialogSearchCancel = function handleDialogSearchCancel() {
    _SearchMessagesActionCreators2.default.close();
  };

  Dialog.prototype.getActivityComponents = function getActivityComponents() {
    var _DelegateContainer$ge = _DelegateContainer2.default.get();

    var features = _DelegateContainer$ge.features;
    var components = _DelegateContainer$ge.components;
    var dialog = components.dialog;


    if (dialog && dialog.activity) {
      return dialog.activity;
    }

    var activity = [_Activity2.default];
    if (features.calls) {
      activity.push(_Call2.default);
    }

    return activity;
  };

  Dialog.prototype.getComponents = function getComponents() {
    var _DelegateContainer$ge2 = _DelegateContainer2.default.get();

    var dialog = _DelegateContainer$ge2.components.dialog;

    var activity = this.getActivityComponents();

    if (dialog && !(0, _lodash.isFunction)(dialog)) {
      return {
        activity: activity,
        DialogHeader: (0, _lodash.isFunction)(dialog.header) ? dialog.header : _DialogHeader2.default,
        MessagesSection: (0, _lodash.isFunction)(dialog.messages) ? dialog.messages : _MessagesSection2.default,
        DialogFooter: (0, _lodash.isFunction)(dialog.footer) ? dialog.footer : _DialogFooter2.default
      };
    }

    return {
      activity: activity,
      DialogHeader: _DialogHeader2.default,
      MessagesSection: _MessagesSection2.default,
      DialogFooter: _DialogFooter2.default
    };
  };

  Dialog.prototype.renderActivities = function renderActivities() {
    var activity = this.components.activity;

    return activity.map(function (Activity, index) {
      return _react2.default.createElement(Activity, { key: index });
    });
  };

  Dialog.prototype.renderDialogSearch = function renderDialogSearch() {
    var search = this.state.search;


    return _react2.default.createElement(_DialogSearch2.default, {
      isOpen: search.isOpen,
      query: search.query,
      onCancel: this.handleDialogSearchCancel,
      onChange: this.handleDialogSearchChange
    });
  };

  Dialog.prototype.renderContent = function renderContent() {
    var _state = this.state;
    var uid = _state.uid;
    var peer = _state.peer;
    var isMember = _state.isMember;
    var dialogInfo = _state.dialogInfo;
    var search = _state.search;
    var _components = this.components;
    var MessagesSection = _components.MessagesSection;
    var DialogFooter = _components.DialogFooter;


    if (search.isOpen) {
      return _react2.default.createElement(_SearchResults2.default, {
        query: search.query,
        results: search.results,
        isSearching: search.isSearching
      });
    }

    return _react2.default.createElement(
      'div',
      { className: 'chat' },
      _react2.default.createElement(MessagesSection, {
        uid: uid,
        peer: peer,
        isMember: isMember
      }),
      _react2.default.createElement(DialogFooter, {
        info: dialogInfo,
        isMember: isMember,
        onUnblock: this.handleUnblock,
        onStart: this.handleStartClick
      })
    );
  };

  Dialog.prototype.render = function render() {
    var _state2 = this.state;
    var peer = _state2.peer;
    var dialogInfo = _state2.dialogInfo;
    var message = _state2.message;
    var isFavorite = _state2.isFavorite;
    var call = _state2.call;
    var isActivityOpen = _state2.isActivityOpen;
    var search = _state2.search;
    var DialogHeader = this.components.DialogHeader;


    if (!peer) {
      return _react2.default.createElement('section', { className: 'main' });
    }

    return _react2.default.createElement(
      'section',
      { className: 'main' },
      _react2.default.createElement(DialogHeader, {
        info: dialogInfo,
        message: message,
        call: call,
        peer: peer,
        isFavorite: isFavorite,
        isDialogSearchOpen: search.isOpen,
        isActivityOpen: isActivityOpen
      }),
      this.renderDialogSearch(),
      _react2.default.createElement(
        'div',
        { className: 'flexrow' },
        _react2.default.createElement(
          'section',
          { className: 'dialog' },
          this.renderContent()
        ),
        this.renderActivities()
      )
    );
  };

  return Dialog;
}(_react.Component);

Dialog.propTypes = {
  params: _react.PropTypes.shape({
    id: _react.PropTypes.string.isRequired
  }).isRequired
};
exports.default = _utils.Container.create(Dialog, { withProps: true });
//# sourceMappingURL=Dialog.react.js.map