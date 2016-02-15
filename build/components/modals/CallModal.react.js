'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _CallActionCreators = require('../../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _CallStore = require('../../stores/CallStore');

var _CallStore2 = _interopRequireDefault(_CallStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import { FormattedMessage } from 'react-intl';

var CallModal = (function (_Component) {
  _inherits(CallModal, _Component);

  function CallModal(props) {
    _classCallCheck(this, CallModal);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CallModal).call(this, props));

    _this.handleClose = function () {
      return _CallActionCreators2.default.hide();
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.handleClose();
      }
    };

    return _this;
  }

  _createClass(CallModal, [{
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isOpen = _state.isOpen;
      var callType = _state.callType;

      if (isOpen) {
        return _react2.default.createElement(
          _reactModal2.default,
          { className: 'modal-new modal-new--call',
            closeTimeoutMS: 150,
            isOpen: isOpen },
          _react2.default.createElement(
            'div',
            { className: 'modal-new__header' },
            _react2.default.createElement(
              'h3',
              { className: 'modal-new__header__title' },
              callType + ' call'
            )
          ),
          _react2.default.createElement('div', { className: 'modal-new__body' }),
          _react2.default.createElement(
            'div',
            { className: 'modal-new__footer' },
            _react2.default.createElement(
              'button',
              { className: 'button button--rised button--wide' },
              'Answer'
            ),
            _react2.default.createElement(
              'button',
              { className: 'button button--rised button--wide' },
              'Decline'
            )
          )
        );
      } else {
        return null;
      }
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        isOpen: _CallStore2.default.isOpen(),
        callType: _CallStore2.default.getCallType(),
        callMembers: _CallStore2.default.getCallMembers(),
        callPeer: _CallStore2.default.getCallPeer(),
        callState: _CallStore2.default.getCallState()
      };
    }
  }]);

  return CallModal;
})(_react.Component);

CallModal.getStores = function () {
  return [_CallStore2.default];
};

exports.default = _utils.Container.create(CallModal, { pure: false });
//# sourceMappingURL=CallModal.react.js.map