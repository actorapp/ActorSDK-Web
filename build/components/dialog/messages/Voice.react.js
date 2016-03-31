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

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = [];

/**
 * Class that represents a component for display voice message content
 */
/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Voice = function (_Component) {
  (0, _inherits3.default)(Voice, _Component);

  function Voice(props) {
    (0, _classCallCheck3.default)(this, Voice);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.humanTime = function (millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = (millis % 60000 / 1000).toFixed(0);

      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };

    _this.handleTimeUpdate = function () {
      _this.setState({
        currentTime: _this.audio.currentTime,
        duration: _this.audio.duration
      });
    };

    _this.handlePlayClick = function () {
      _this.audio.play();
      _this.setState({ isPlaying: true });
    };

    _this.handlePauseClick = function () {
      _this.audio.pause();
      _this.handlePlayEnding();
    };

    _this.handlePlayEnding = function () {
      _this.setState({ isPlaying: false });
    };

    _this.handleRewind = function (event) {
      var rewindRect = (0, _reactDom.findDOMNode)(_this.refs.rewind).getBoundingClientRect();
      var rewindPosition = (event.clientX - rewindRect.left) / rewindRect.width;

      _this.audio.currentTime = _this.audio.duration * rewindPosition;
    };

    _this.handleLoading = function () {
      return _this.setCached();
    };

    _this.state = {
      isLoaded: _this.isCached(),
      isPlaying: false,
      currentTime: 0,
      duration: props.content.duration / 1000
    };
    return _this;
  }

  Voice.prototype.componentDidMount = function componentDidMount() {
    var content = this.props.content;


    if (content.fileUrl) {
      this.createAudioElement(content.fileUrl);
    }
  };

  Voice.prototype.componentDidUpdate = function componentDidUpdate() {
    var content = this.props.content;


    if (content.fileUrl && !this.isCached()) {
      this.createAudioElement(content.fileUrl);
    }
  };

  Voice.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.audio) {
      this.audio.removeEventListener('loadeddata', this.handleLoading);
      this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
      this.audio.removeEventListener('ended', this.handlePlayEnding);
      this.audio.removeEventListener('canplaythrough', this.handleLoading);
    }
  };

  Voice.prototype.createAudioElement = function createAudioElement(fileUrl) {
    this.audio = new Audio(fileUrl);
    this.audio.volume = 1;
    this.audio.addEventListener('loadeddata', this.handleLoading);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('ended', this.handlePlayEnding);
    this.audio.addEventListener('canplaythrough', this.handleLoading);
    this.setCached();
  };

  Voice.prototype.isCached = function isCached() {
    var content = this.props.content;

    return cache[content.fileUrl] === true;
  };

  Voice.prototype.setCached = function setCached() {
    var content = this.props.content;

    cache[content.fileUrl] = true;
    this.setState({ isLoaded: cache[content.fileUrl] });
  };

  Voice.prototype.render = function render() {
    var className = this.props.className;
    var _state = this.state;
    var isPlaying = _state.isPlaying;
    var currentTime = _state.currentTime;
    var duration = _state.duration;
    var isLoaded = _state.isLoaded;

    var voiceClassName = (0, _classnames2.default)(className, 'row');

    var current = this.humanTime(currentTime * 1000);
    var total = this.humanTime(duration * 1000);
    var progress = currentTime / duration * 100;

    return _react2.default.createElement(
      'div',
      { className: voiceClassName },
      _react2.default.createElement(
        'div',
        { className: 'voice row' },
        _react2.default.createElement(
          'div',
          { className: 'voice__controls' },
          !isLoaded ? _react2.default.createElement(
            'i',
            { className: 'material-icons', style: { opacity: 0.3 } },
            'play_circle_filled'
          ) : isPlaying ? _react2.default.createElement(
            'i',
            { className: 'material-icons', onClick: this.handlePauseClick },
            'pause_circle_filled'
          ) : _react2.default.createElement(
            'i',
            { className: 'material-icons', onClick: this.handlePlayClick },
            'play_circle_filled'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'voice__body col-xs' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs text-left' },
              _react2.default.createElement(
                'time',
                { className: 'voice__time voice__time--current' },
                current
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-xs text-right' },
              _react2.default.createElement(
                'time',
                { className: 'voice__time voice__time--total' },
                total
              )
            )
          ),
          isLoaded ? _react2.default.createElement(
            'div',
            { className: 'voice__rewind', onClick: this.handleRewind, ref: 'rewind' },
            _react2.default.createElement('div', { className: 'played', style: { width: progress + '%' } })
          ) : _react2.default.createElement('div', { className: 'voice__rewind voice__rewind--loading' })
        )
      ),
      _react2.default.createElement('div', { className: 'col-xs' })
    );
  };

  return Voice;
}(_react.Component);

Voice.propTypes = {
  content: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string
};
exports.default = Voice;
//# sourceMappingURL=Voice.react.js.map