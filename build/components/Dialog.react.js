'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _MessagesSection = require('./dialog/MessagesSection.react');

var _MessagesSection2 = _interopRequireDefault(_MessagesSection);

var _DialogFooter = require('./dialog/DialogFooter.react');

var _DialogFooter2 = _interopRequireDefault(_DialogFooter);

var _Toolbar = require('./Toolbar.react');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Activity = require('./Activity.react');

var _Activity2 = _interopRequireDefault(_Activity);

var _Call = require('./Call.react');

var _Call2 = _interopRequireDefault(_Call);

var _LoggerSection = require('./dev/LoggerSection.react');

var _LoggerSection2 = _interopRequireDefault(_LoggerSection);

var _ConnectionState = require('./common/ConnectionState.react');

var _ConnectionState2 = _interopRequireDefault(_ConnectionState);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var DialogSection = function (_Component) {
  (0, _inherits3.default)(DialogSection, _Component);

  function DialogSection() {
    (0, _classCallCheck3.default)(this, DialogSection);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  DialogSection.getStores = function getStores() {
    return [_ActivityStore2.default, _DialogStore2.default];
  };

  DialogSection.calculateState = function calculateState() {
    return {
      peer: _DialogStore2.default.getCurrentPeer(),
      isMember: _DialogStore2.default.isMember(),
      isActivityOpen: _ActivityStore2.default.isOpen()
    };
  };

  DialogSection.prototype.getComponents = function getComponents() {
    var _context$delegate$com = this.context.delegate.components;
    var dialog = _context$delegate$com.dialog;
    var logger = _context$delegate$com.logger;

    var LoggerSection = logger || _LoggerSection2.default;
    if (dialog && !(0, _lodash.isFunction)(dialog)) {
      var activity = dialog.activity || [_Activity2.default, _Call2.default, LoggerSection];

      return {
        ToolbarSection: dialog.toolbar || _Toolbar2.default,
        MessagesSection: (0, _lodash.isFunction)(dialog.messages) ? dialog.messages : _MessagesSection2.default,
        activity: (0, _lodash.map)(activity, function (Activity, index) {
          return _react2.default.createElement(Activity, { key: index });
        })
      };
    }

    return {
      ToolbarSection: _Toolbar2.default,
      MessagesSection: _MessagesSection2.default,
      activity: [_react2.default.createElement(_Activity2.default, { key: 1 }), _react2.default.createElement(_Call2.default, { key: 2 }), _react2.default.createElement(LoggerSection, { key: 3 })]
    };
  };

  DialogSection.prototype.render = function render() {
    var _state = this.state;
    var peer = _state.peer;
    var isMember = _state.isMember;
    var messages = _state.messages;
    var overlay = _state.overlay;
    var messagesCount = _state.messagesCount;

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
          _react2.default.createElement(MessagesSection, { peer: peer, isMember: isMember }),
          _react2.default.createElement(_DialogFooter2.default, { isMember: isMember })
        ),
        activity
      )
    );
  };

  return DialogSection;
}(_react.Component);

DialogSection.contextTypes = {
  delegate: _react.PropTypes.object
};
exports.default = _utils.Container.create(DialogSection);
//# sourceMappingURL=Dialog.react.js.map