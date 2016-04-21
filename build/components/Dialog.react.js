'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _MessagesSection = require('./dialog/MessagesSection.react');

var _MessagesSection2 = _interopRequireDefault(_MessagesSection);

var _DialogFooter = require('./dialog/DialogFooter.react');

var _DialogFooter2 = _interopRequireDefault(_DialogFooter);

var _Toolbar = require('./Toolbar.react');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Activity = require('./Activity.react');

var _Activity2 = _interopRequireDefault(_Activity);

var _SearchSection = require('./search/SearchSection.react');

var _SearchSection2 = _interopRequireDefault(_SearchSection);

var _Call = require('./Call.react');

var _Call2 = _interopRequireDefault(_Call);

var _ConnectionState = require('./common/ConnectionState.react');

var _ConnectionState2 = _interopRequireDefault(_ConnectionState);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _DialogInfoStore = require('../stores/DialogInfoStore');

var _DialogInfoStore2 = _interopRequireDefault(_DialogInfoStore);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _DialogActionCreators = require('../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _BlockedUsersActionCreators = require('../actions/BlockedUsersActionCreators');

var _BlockedUsersActionCreators2 = _interopRequireDefault(_BlockedUsersActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DialogSection = function (_Component) {
  _inherits(DialogSection, _Component);

  DialogSection.getStores = function getStores() {
    return [_ActivityStore2.default, _DialogStore2.default, _DialogInfoStore2.default];
  };

  DialogSection.calculateState = function calculateState() {
    var peer = _DialogStore2.default.getCurrentPeer();
    var dialogInfo = _DialogInfoStore2.default.getState();

    return {
      peer: peer,
      dialogInfo: dialogInfo,
      isMember: _DialogStore2.default.isMember(),
      isActivityOpen: _ActivityStore2.default.isOpen()
    };
  };

  function DialogSection(props, context) {
    _classCallCheck(this, DialogSection);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.updatePeer(_this.props.params.id);

    _this.onUnblock = _this.onUnblock.bind(_this);
    return _this;
  }

  DialogSection.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.updatePeer(nextProps.params.id);
    }
  };

  DialogSection.prototype.componentWillUnmount = function componentWillUnmount() {
    _DialogActionCreators2.default.selectDialogPeer(null);
  };

  DialogSection.prototype.updatePeer = function updatePeer(id) {
    var peer = _PeerUtils2.default.stringToPeer(id);
    if (_PeerUtils2.default.hasPeer(peer)) {
      _DialogActionCreators2.default.selectDialogPeer(peer);
    } else {
      _history2.default.replace('/im');
    }
  };

  DialogSection.prototype.onUnblock = function onUnblock() {
    var dialogInfo = this.state.dialogInfo;

    _BlockedUsersActionCreators2.default.unblockUser(dialogInfo.id);
  };

  DialogSection.prototype.getActivityComponents = function getActivityComponents() {
    var _context$delegate = this.context.delegate;
    var features = _context$delegate.features;
    var dialog = _context$delegate.components.dialog;

    if (dialog && dialog.activity) {
      return dialog.activity;
    }

    var activity = [_Activity2.default];
    if (features.calls) {
      activity.push(_Call2.default);
    }

    if (features.search) {
      activity.push(_SearchSection2.default);
    }

    return activity;
  };

  DialogSection.prototype.getComponents = function getComponents() {
    var dialog = this.context.delegate.components.dialog;

    var activity = this.getActivityComponents();

    if (dialog && !(0, _lodash.isFunction)(dialog)) {
      return {
        activity: activity,
        ToolbarSection: dialog.toolbar || _Toolbar2.default,
        MessagesSection: (0, _lodash.isFunction)(dialog.messages) ? dialog.messages : _MessagesSection2.default
      };
    }

    return {
      activity: activity,
      ToolbarSection: _Toolbar2.default,
      MessagesSection: _MessagesSection2.default
    };
  };

  DialogSection.prototype.render = function render() {
    var _state = this.state;
    var peer = _state.peer;
    var isMember = _state.isMember;
    var dialogInfo = _state.dialogInfo;

    if (!peer) {
      return _react2.default.createElement('section', { className: 'main' });
    }

    var _getComponents = this.getComponents();

    var ToolbarSection = _getComponents.ToolbarSection;
    var MessagesSection = _getComponents.MessagesSection;
    var activity = _getComponents.activity;


    return _react2.default.createElement(
      'section',
      { className: 'main' },
      _react2.default.createElement(ToolbarSection, null),
      _react2.default.createElement(
        'div',
        { className: 'flexrow' },
        _react2.default.createElement(
          'section',
          { className: 'dialog' },
          _react2.default.createElement(_ConnectionState2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'chat' },
            _react2.default.createElement(MessagesSection, { peer: peer, isMember: isMember }),
            _react2.default.createElement(_DialogFooter2.default, {
              isMember: isMember,
              isBlocked: dialogInfo.isBlocked,
              onUnblock: this.onUnblock
            })
          )
        ),
        activity.map(function (Activity, index) {
          return _react2.default.createElement(Activity, { key: index });
        })
      )
    );
  };

  return DialogSection;
}(_react.Component);

DialogSection.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
DialogSection.propTypes = {
  params: _react.PropTypes.shape({
    id: _react.PropTypes.string.isRequired
  }).isRequired
};
exports.default = _utils.Container.create(DialogSection, { withProps: true });
//# sourceMappingURL=Dialog.react.js.map