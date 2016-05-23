'use strict';

exports.__esModule = true;

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

var isRecordingSupported = _opusRecorder2.default.isRecordingSupported();

var VoiceRecorder = function (_Component) {
  _inherits(VoiceRecorder, _Component);

  function VoiceRecorder(props) {
    _classCallCheck(this, VoiceRecorder);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      duration: 0,
      isRecording: false
    };

    _this.onRecordStart = _this.onRecordStart.bind(_this);
    _this.onRecordStop = _this.onRecordStop.bind(_this);
    _this.onStreamReady = _this.onStreamReady.bind(_this);
    _this.onRecordDone = _this.onRecordDone.bind(_this);
    _this.onDurationChange = _this.onDurationChange.bind(_this);
    return _this;
  }

  VoiceRecorder.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextState.isRecording !== this.state.isRecording || nextState.duration !== this.state.duration;
  };

  VoiceRecorder.prototype.componentDidMount = function componentDidMount() {
    if (isRecordingSupported) {
      this.recorder = new _opusRecorder2.default();
      this.recorder.addEventListener('duration', this.onDurationChange);
      this.recorder.addEventListener('streamReady', this.onStreamReady);
      this.recorder.addEventListener('dataAvailable', this.onRecordDone);
    }
  };

  VoiceRecorder.prototype.componentWillUnmount = function componentWillUnmount() {
    this.recorder.removeEventListener('duration', this.onDurationChange);
    this.recorder.removeEventListener('streamReady', this.onStreamReady);
    this.recorder.removeEventListener('dataAvailable', this.onRecordDone);
    this.recorder = null;
  };

  VoiceRecorder.prototype.onRecordStart = function onRecordStart() {
    this.recorder.initStream();
  };

  VoiceRecorder.prototype.onRecordStop = function onRecordStop() {
    this.recorder.stop();
    this.setState({ isRecording: false, duration: 0 });
  };

  VoiceRecorder.prototype.onStreamReady = function onStreamReady() {
    this.recorder.start();
    this.setState({ isRecording: true });
  };

  VoiceRecorder.prototype.onRecordDone = function onRecordDone(event) {
    // duration must be in ms
    var duration = this.state.duration * 1000;
    if (duration >= 100) {
      this.props.onFinish(duration, event.detail);
    }
  };

  VoiceRecorder.prototype.onDurationChange = function onDurationChange(event) {
    var duration = event.detail.toFixed(2);
    this.setState({ duration: duration });
  };

  VoiceRecorder.prototype.renderDuration = function renderDuration() {
    if (!this.state.duration) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      { className: 'voice-recorder__duration' },
      _react2.default.createElement(
        'div',
        { className: 'fill row middle-xs center-xs' },
        'Voice message duration:  ',
        this.state.duration
      )
    );
  };

  VoiceRecorder.prototype.render = function render() {
    if (!isRecordingSupported) {
      return null;
    }

    var className = (0, _classnames2.default)('voice-recorder__icon', {
      'voice-recorder__icon--active': this.state.isRecording
    });

    return _react2.default.createElement(
      'div',
      { className: 'voice-recorder' },
      _react2.default.createElement(
        'span',
        { className: className, onMouseDown: this.onRecordStart, onMouseUp: this.onRecordStop },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'mic'
        )
      ),
      this.renderDuration()
    );
  };

  return VoiceRecorder;
}(_react.Component);

VoiceRecorder.propTypes = {
  onFinish: _react.PropTypes.func.isRequired
};
exports.default = VoiceRecorder;
//# sourceMappingURL=VoiceRecorder.react.js.map