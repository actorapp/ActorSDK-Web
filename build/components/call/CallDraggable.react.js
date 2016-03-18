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

var _reactIntl = require('react-intl');

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _CallBody = require('./CallBody.react');

var _CallBody2 = _interopRequireDefault(_CallBody);

var _CallControls = require('./CallControls.react');

var _CallControls2 = _interopRequireDefault(_CallControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallDraggable = function (_Component) {
  (0, _inherits3.default)(CallDraggable, _Component);

  function CallDraggable() {
    (0, _classCallCheck3.default)(this, CallDraggable);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  CallDraggable.prototype.render = function render() {
    var _props = this.props;
    var peerInfo = _props.peerInfo;
    var callState = _props.callState;


    return _react2.default.createElement(
      _reactDraggable2.default,
      null,
      _react2.default.createElement(
        'section',
        { className: 'call__draggable', style: { position: 'absolute', top: 60, right: 60 } },
        _react2.default.createElement(_CallBody2.default, { peerInfo: peerInfo, callState: callState, small: true }),
        _react2.default.createElement(_CallControls2.default, {
          callState: callState,
          isOutgoing: this.props.isOutgoing,
          isMuted: this.props.isMuted,
          onEnd: this.props.onEnd,
          onAnswer: this.props.onAnswer,
          onMuteToggle: this.props.onMuteToggle,
          onFullscreen: this.props.onFullscreen,
          onUserAdd: this.props.onUserAdd,
          onVideo: this.props.onVideo,
          onClose: this.props.onClose,
          small: true
        })
      )
    );
  };

  return CallDraggable;
}(_react.Component); /*
                     * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                     */

CallDraggable.propTypes = {
  peerInfo: _react2.default.PropTypes.object,
  callState: _react.PropTypes.string.isRequired,
  isOutgoing: _react.PropTypes.bool.isRequired,
  isMuted: _react.PropTypes.bool.isRequired,
  onEnd: _react.PropTypes.func.isRequired,
  onAnswer: _react.PropTypes.func.isRequired,
  onMuteToggle: _react.PropTypes.func.isRequired,
  onFullscreen: _react.PropTypes.func.isRequired,
  onUserAdd: _react.PropTypes.func.isRequired,
  onVideo: _react.PropTypes.func.isRequired,
  onClose: _react.PropTypes.func.isRequired
};
exports.default = CallDraggable;
//# sourceMappingURL=CallDraggable.react.js.map