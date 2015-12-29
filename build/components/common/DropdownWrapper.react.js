'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MessageActions = require('./dropdown/MessageActions.react');

var _MessageActions2 = _interopRequireDefault(_MessageActions);

var _DropdownStore = require('../../stores/DropdownStore');

var _DropdownStore2 = _interopRequireDefault(_DropdownStore);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DropdownWrapper = (function (_Component) {
  _inherits(DropdownWrapper, _Component);

  _createClass(DropdownWrapper, null, [{
    key: 'calculateState',
    value: function calculateState() {
      var message = _DropdownStore2.default.getMessage();

      return {
        isOpen: _DropdownStore2.default.isOpen(message.rid),
        peer: _DialogStore2.default.getCurrentPeer(),
        targetRect: _DropdownStore2.default.getTargetRect(),
        message: message
      };
    }
  }]);

  function DropdownWrapper(props) {
    _classCallCheck(this, DropdownWrapper);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownWrapper).call(this, props));
  }

  _createClass(DropdownWrapper, [{
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isOpen = _state.isOpen;
      var message = _state.message;
      var targetRect = _state.targetRect;
      var peer = _state.peer;

      var dropdownWrapperClassName = (0, _classnames2.default)('dropdown-wrapper', {
        'dropdown-wrapper--opened': isOpen
      });

      return _react2.default.createElement(
        'div',
        { className: dropdownWrapperClassName },
        isOpen ? _react2.default.createElement(_MessageActions2.default, { message: message,
          targetRect: targetRect,
          peer: peer,
          hideOnScroll: true }) : null
      );
    }
  }]);

  return DropdownWrapper;
})(_react.Component);

DropdownWrapper.getStores = function () {
  return [_DropdownStore2.default, _DialogStore2.default];
};

exports.default = _utils.Container.create(DropdownWrapper, { pure: false });
//# sourceMappingURL=DropdownWrapper.react.js.map