'use strict';

exports.__esModule = true;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var CallDraggable = function (_Component) {
  _inherits(CallDraggable, _Component);

  function CallDraggable() {
    _classCallCheck(this, CallDraggable);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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
        { className: 'call__draggable', style: { position: 'absolute', bottom: '100px', right: '100px' } },
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
}(_react.Component);

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