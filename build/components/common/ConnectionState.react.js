'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ConnectionStateStore = require('../../stores/ConnectionStateStore');

var _ConnectionStateStore2 = _interopRequireDefault(_ConnectionStateStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStateFromStore = function getStateFromStore() {
  return {
    connectionState: _ConnectionStateStore2.default.getState()
  };
};

var ConnectionState = (function (_React$Component) {
  _inherits(ConnectionState, _React$Component);

  function ConnectionState(props) {
    _classCallCheck(this, ConnectionState);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectionState).call(this, props));

    _this.onStateChange = function () {
      _this.setState(getStateFromStore);
    };

    _this.state = getStateFromStore();

    _ConnectionStateStore2.default.addChangeListener(_this.onStateChange);
    return _this;
  }

  _createClass(ConnectionState, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ConnectionStateStore2.default.removeChangeListener(this.onStateChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var connectionState = this.state.connectionState;

      var className = (0, _classnames2.default)('connection-state', {
        'connection-state--online': connectionState === 'online',
        'connection-state--connection': connectionState === 'connecting'
      });

      switch (connectionState) {
        case 'online':
          return _react2.default.createElement(
            'div',
            { className: className },
            'You\'re back online!'
          );
        case 'connecting':
          return _react2.default.createElement(
            'div',
            { className: className },
            'Houston, we have a problem! Connection to Actor server is lost. Trying to reconnect now...'
          );
        default:
          return null;
      }
    }
  }]);

  return ConnectionState;
})(_react2.default.Component);

exports.default = ConnectionState;
//# sourceMappingURL=ConnectionState.react.js.map