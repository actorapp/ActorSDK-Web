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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _opusRecorder = require('opus-recorder');

var _opusRecorder2 = _interopRequireDefault(_opusRecorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isRecordingSupported = _opusRecorder2.default.isRecordingSupported() ? true : false; /*
                                                                                          * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                          */

console.debug('isRecordingSupported', isRecordingSupported);

var VoiceRecorder = function (_Component) {
  (0, _inherits3.default)(VoiceRecorder, _Component);

  function VoiceRecorder(props) {
    (0, _classCallCheck3.default)(this, VoiceRecorder);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

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

  VoiceRecorder.prototype.render = function render() {
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
  };

  return VoiceRecorder;
}(_react.Component);

VoiceRecorder.propTypes = {
  onFinish: _react.PropTypes.func.isRequired
};
exports.default = VoiceRecorder;
//# sourceMappingURL=VoiceRecorder.react.js.map