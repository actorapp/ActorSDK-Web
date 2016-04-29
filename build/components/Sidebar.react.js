'use strict';

exports.__esModule = true;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SidebarSection = function (_Component) {
  _inherits(SidebarSection, _Component);

  function SidebarSection() {
    _classCallCheck(this, SidebarSection);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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
}(_react.Component);

SidebarSection.contextTypes = {
  delegate: _react.PropTypes.object
};
exports.default = _utils.Container.create(SidebarSection, { pure: false });
//# sourceMappingURL=Sidebar.react.js.map