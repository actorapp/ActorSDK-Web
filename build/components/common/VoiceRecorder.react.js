'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _opusRecorder = require('opus-recorder');

var _opusRecorder2 = _interopRequireDefault(_opusRecorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isRecordingSupported = _opusRecorder2.default.isRecordingSupported() ? true : false;
console.debug('isRecordingSupported', isRecordingSupported);

var VoiceRecorder = (function (_Component) {
  _inherits(VoiceRecorder, _Component);

  function VoiceRecorder(props) {
    _classCallCheck(this, VoiceRecorder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VoiceRecorder).call(this, props));

    _this.handleStartRecord = function () {
      _this.recorder.initStream();
    };

    _this.handleStopRecord = function () {
      _this.recorder.stop();
      _this.setState({ isRecording: false });
    };

    _this.handleSendRecord = function (event) {
      var onFinish = _this.props.onFinish;
      var duration = _this.state.duration;

      onFinish && onFinish(duration * 1000, event.detail); //Duration must be in ms
    };

    _this.handleStreamReady = function () {
      _this.recorder.start();
      _this.setState({ isRecording: true });
    };

    _this.handleChangeDuration = function (event) {
      return _this.setState({ duration: event.detail.toFixed(2) });
    };

    _this.state = {
      isRecording: false
    };

    if (isRecordingSupported) {
      _this.recorder = new _opusRecorder2.default();
      _this.recorder.addEventListener('duration', _this.handleChangeDuration);
      _this.recorder.addEventListener('streamReady', _this.handleStreamReady);
      _this.recorder.addEventListener('dataAvailable', _this.handleSendRecord);
    }
    return _this;
  }

  _createClass(VoiceRecorder, [{
    key: 'render',
    value: function render() {
      if (isRecordingSupported) {
        var _state = this.state;
        var isRecording = _state.isRecording;
        var duration = _state.duration;

        var voiceRecorderClassName = (0, _classnames2.default)('voice-recorder', {
          'voice-recorder--recording': isRecording
        });

        return _react2.default.createElement(
          'div',
          { className: voiceRecorderClassName },
          _react2.default.createElement(
            'i',
            { className: 'material-icons icon',
              onMouseDown: this.handleStartRecord,
              onMouseUp: this.handleStopRecord },
            'mic'
          ),
          _react2.default.createElement(
            'div',
            { className: 'duration' },
            _react2.default.createElement(
              'div',
              { className: 'fill row middle-xs center-xs' },
              'Voice message duration:  ',
              duration
            )
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return VoiceRecorder;
})(_react.Component);

VoiceRecorder.propTypes = {
  onFinish: _react.PropTypes.func.isRequired
};
exports.default = VoiceRecorder;
//# sourceMappingURL=VoiceRecorder.react.js.map