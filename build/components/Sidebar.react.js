'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _HeaderSection = require('./sidebar/HeaderSection.react');

var _HeaderSection2 = _interopRequireDefault(_HeaderSection);

var _Recent = require('./sidebar/Recent.react');

var _Recent2 = _interopRequireDefault(_Recent);

var _QuickSearchButton = require('./sidebar/QuickSearchButton.react');

var _QuickSearchButton2 = _interopRequireDefault(_QuickSearchButton);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _ArchiveStore = require('../stores/ArchiveStore');

var _ArchiveStore2 = _interopRequireDefault(_ArchiveStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidebarSection = function (_Component) {
  (0, _inherits3.default)(SidebarSection, _Component);

  function SidebarSection() {
    (0, _classCallCheck3.default)(this, SidebarSection);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  SidebarSection.getStores = function getStores() {
    return [_DialogStore2.default, _ArchiveStore2.default];
  };

  SidebarSection.calculateState = function calculateState() {
    return {
      currentPeer: _DialogStore2.default.getCurrentPeer(),
      dialogs: _DialogStore2.default.getDialogs(),
      archive: _ArchiveStore2.default.getArchiveChatState()
    };
  };

  SidebarSection.prototype.render = function render() {
    var delegate = this.context.delegate;
    var _state = this.state;
    var currentPeer = _state.currentPeer;
    var dialogs = _state.dialogs;
    var archive = _state.archive;


    var HeaderSection = void 0,
        Recent = void 0,
        FooterSection = void 0;
    if (delegate.components.sidebar !== null && typeof delegate.components.sidebar !== 'function') {
      HeaderSection = delegate.components.sidebar.header || _HeaderSection2.default;
      Recent = delegate.components.sidebar.recent || _Recent2.default;
      FooterSection = delegate.components.sidebar.footer || _QuickSearchButton2.default;
    } else {
      HeaderSection = _HeaderSection2.default;
      Recent = _Recent2.default;
      FooterSection = _QuickSearchButton2.default;
    }

    return _react2.default.createElement(
      'aside',
      { className: 'sidebar' },
      _react2.default.createElement(HeaderSection, null),
      _react2.default.createElement(Recent, { currentPeer: currentPeer, dialogs: dialogs, archive: archive }),
      _react2.default.createElement(FooterSection, null)
    );
  };

  return SidebarSection;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

SidebarSection.contextTypes = {
  delegate: _react.PropTypes.object
};
exports.default = _utils.Container.create(SidebarSection);
//# sourceMappingURL=Sidebar.react.js.map