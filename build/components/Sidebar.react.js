'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _DelegateContainer = require('../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

var _Recent = require('./sidebar/Recent.react');

var _Recent2 = _interopRequireDefault(_Recent);

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

var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  Sidebar.getStores = function getStores() {
    return [_DialogStore2.default, _ArchiveStore2.default];
  };

  Sidebar.calculateState = function calculateState() {
    return {
      currentPeer: _DialogStore2.default.getCurrentPeer(),
      dialogs: _DialogStore2.default.getDialogs(),
      archive: _ArchiveStore2.default.getArchiveChatState()
    };
  };

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.components = _this.getComponents();
    return _this;
  }

  Sidebar.prototype.getComponents = function getComponents() {
    var _DelegateContainer$ge = _DelegateContainer2.default.get();

    var components = _DelegateContainer$ge.components;

    var sidebar = components.sidebar;

    if (sidebar) {
      return {
        Recent: (0, _lodash.isFunction)(sidebar.recent) ? sidebar.recent : _Recent2.default
      };
    }

    return {
      Recent: _Recent2.default
    };
  };

  Sidebar.prototype.render = function render() {
    var _state = this.state;
    var currentPeer = _state.currentPeer;
    var dialogs = _state.dialogs;
    var archive = _state.archive;
    var Recent = this.components.Recent;


    return _react2.default.createElement(
      'aside',
      { className: 'sidebar' },
      _react2.default.createElement(Recent, {
        currentPeer: currentPeer,
        dialogs: dialogs,
        archive: archive
      })
    );
  };

  return Sidebar;
}(_react.Component);

exports.default = _utils.Container.create(Sidebar, { pure: false });
//# sourceMappingURL=Sidebar.react.js.map