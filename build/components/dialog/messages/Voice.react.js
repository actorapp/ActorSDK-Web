'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var cache = [];

/**
 * Class that represents a component for display voice message content
 */

var Voice = (function (_Component) {
  _inherits(Voice, _Component);

  function Voice(props) {
    _classCallCheck(this, Voice);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Voice).call(this, props));

    _this.humanTime = function (millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = (millis % 60000 / 1000).toFixed(0);

      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };

    _this.handleTimeUpdate = function (event) {
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
      var rewindRect = _react2.default.findDOMNode(_this.refs.rewind).getBoundingClientRect();
      var rewindPosition = (event.clientX - rewindRect.left) / rewindRect.width;

      _this.audio.currentTime = _this.audio.duration * rewindPosition;
    };

    _this.handleLoading = function () {
      return _this.setCached();
    };

    var content = props.content;

    if (content.fileUrl) {
      _this.createAudioElement(content.fileUrl);
    }

    _this.state = {
      isLoaded: _this.isCached(),
      isPlaying: false,
      currentTime: 0,
      duration: props.content.duration / 1000
    };
    return _this;
  }

  _createClass(Voice, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var content = this.props.content;

      if (content.fileUrl && !this.isCached()) {
        this.createAudioElement(content.fileUrl);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.audio) {
        this.audio.removeEventListener('loadeddata', this.handleLoading);
        this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
        this.audio.removeEventListener('ended', this.handlePlayEnding);
        this.audio.removeEventListener('canplaythrough', this.handleLoading);
      }
    }
  }, {
    key: 'createAudioElement',
    value: function createAudioElement(fileUrl) {
      this.audio = new Audio(fileUrl);
      this.audio.volume = 1;
      this.audio.addEventListener('loadeddata', this.handleLoading);
      this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
      this.audio.addEventListener('ended', this.handlePlayEnding);
      this.audio.addEventListener('canplaythrough', this.handleLoading);
      this.setCached();
    }
  }, {
    key: 'isCached',
    value: function isCached() {
      var content = this.props.content;

      return cache[content.fileUrl] === true;
    }
  }, {
    key: 'setCached',
    value: function setCached() {
      var content = this.props.content;

      cache[content.fileUrl] = true;
      this.setState({ isLoaded: cache[content.fileUrl] });
    }
  }, {
    key: 'render',
    value: function render() {
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
    }
  }]);

  return Voice;
})(_react.Component);

Voice.propTypes = {
  content: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string
};

_reactMixin2.default.onClass(Voice, _reactIntl.IntlMixin);

exports.default = Voice;
//# sourceMappingURL=Voice.react.js.map