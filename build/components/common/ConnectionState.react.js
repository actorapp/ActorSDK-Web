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

var _reactIntl = require('react-intl');

var _SharedContainer = require('../../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ConnectionStateStore = require('../../stores/ConnectionStateStore');

var _ConnectionStateStore2 = _interopRequireDefault(_ConnectionStateStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConnectionState = function (_Component) {
  (0, _inherits3.default)(ConnectionState, _Component);

  function ConnectionState(props) {
    (0, _classCallCheck3.default)(this, ConnectionState);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    var SharedActor = _SharedContainer2.default.get();
    _this.appName = SharedActor.appName ? SharedActor.appName : _ActorAppConstants.appName;
    return _this;
  }

  ConnectionState.getStores = function getStores() {
    return [_ConnectionStateStore2.default];
  };

  ConnectionState.calculateState = function calculateState() {
    return {
      connectionState: _ConnectionStateStore2.default.getState()
    };
  };

  ConnectionState.prototype.render = function render() {
    var connectionState = this.state.connectionState;


    var className = (0, _classnames2.default)('connection-state', {
      'connection-state--online': connectionState === _ActorAppConstants.ConnectionStates.ONLINE,
      'connection-state--connection': connectionState === _ActorAppConstants.ConnectionStates.CONNECTING
    });

    return _react2.default.createElement(
      'div',
      { className: className },
      connectionState !== _ActorAppConstants.ConnectionStates.UPDATING ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'connectionState.' + connectionState, values: { appName: this.appName } }) : null
    );
  };

  return ConnectionState;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

exports.default = _utils.Container.create(ConnectionState, { pure: false });
//# sourceMappingURL=ConnectionState.react.js.map