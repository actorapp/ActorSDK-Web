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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MessageActions = require('./dropdown/MessageActions.react');

var _MessageActions2 = _interopRequireDefault(_MessageActions);

var _RecentContextMenu = require('./dropdown/RecentContextMenu.react');

var _RecentContextMenu2 = _interopRequireDefault(_RecentContextMenu);

var _DropdownStore = require('../../stores/DropdownStore');

var _DropdownStore2 = _interopRequireDefault(_DropdownStore);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuOverlay = function (_Component) {
  (0, _inherits3.default)(MenuOverlay, _Component);

  MenuOverlay.getStores = function getStores() {
    return [_DropdownStore2.default, _DialogStore2.default];
  };

  MenuOverlay.calculateState = function calculateState() {
    var message = _DropdownStore2.default.getMessage();

    return {
      isMessageDropdownOpen: _DropdownStore2.default.isMessageDropdownOpen(message.rid),
      isRecentContextOpen: _DropdownStore2.default.isRecentContextOpen(),
      targetRect: _DropdownStore2.default.getTargetRect(),
      contextPos: _DropdownStore2.default.getContextPos(),
      contextPeer: _DropdownStore2.default.getPeer(),
      message: message
    };
  };

  function MenuOverlay(props) {
    (0, _classCallCheck3.default)(this, MenuOverlay);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
  }

  MenuOverlay.prototype.render = function render() {
    var _state = this.state;
    var isMessageDropdownOpen = _state.isMessageDropdownOpen;
    var isRecentContextOpen = _state.isRecentContextOpen;
    var message = _state.message;
    var targetRect = _state.targetRect;
    var contextPeer = _state.contextPeer;
    var contextPos = _state.contextPos;

    var currentPeer = _DialogStore2.default.getCurrentPeer();

    var menuOverlayClassName = (0, _classnames2.default)('menu-overlay', {
      'menu-overlay--opened': isMessageDropdownOpen || isRecentContextOpen
    });

    return _react2.default.createElement(
      'div',
      { className: menuOverlayClassName },
      isMessageDropdownOpen ? _react2.default.createElement(_MessageActions2.default, { message: message,
        targetRect: targetRect,
        peer: currentPeer,
        hideOnScroll: true }) : null,
      isRecentContextOpen ? _react2.default.createElement(_RecentContextMenu2.default, { peer: contextPeer,
        contextPos: contextPos,
        hideOnScroll: true }) : null
    );
  };

  return MenuOverlay;
}(_react.Component); /*
                      * Copyright (C) 2015 Actor LLC. <https://actor.im>
                      */

exports.default = _utils.Container.create(MenuOverlay, { pure: false });
//# sourceMappingURL=MenuOverlay.react.js.map