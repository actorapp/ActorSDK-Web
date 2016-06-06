'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PreferencesStore = require('../../../stores/PreferencesStore');

var _PreferencesStore2 = _interopRequireDefault(_PreferencesStore);

var _ImageUtils = require('../../../utils/ImageUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Animation = function (_Component) {
  _inherits(Animation, _Component);

  function Animation(props) {
    _classCallCheck(this, Animation);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    if (!_PreferencesStore2.default.isAnimationAutoPlayEnabled()) {
      _this.state = {
        playing: false
      };
    }

    _this.onClick = _this.onClick.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    return _this;
  }

  Animation.prototype.componentDidMount = function componentDidMount() {
    (0, _ImageUtils.renderImageToCanvas)(this.props.preview, this.refs.canvas);
    this.updateFrame(this.props);
  };

  Animation.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.updateFrame(nextProps);
  };

  Animation.prototype.updateFrame = function updateFrame(_ref) {
    var fileUrl = _ref.fileUrl;

    if (!fileUrl || !this.state) {
      return;
    }

    (0, _ImageUtils.renderImageToCanvas)(fileUrl, this.refs.canvas).catch(function (e) {
      console.error(e);
    });
  };

  Animation.prototype.onClick = function onClick(event) {
    event.preventDefault();
    _ImageUtils.lightbox.open(this.props.fileUrl, 'message');
  };

  Animation.prototype.onMouseEnter = function onMouseEnter() {
    this.setState({ playing: true });
  };

  Animation.prototype.onMouseLeave = function onMouseLeave() {
    this.setState({ playing: false });
  };

  Animation.prototype.getDimentions = function getDimentions() {
    var _props = this.props;
    var width = _props.w;
    var height = _props.h;

    return (0, _ImageUtils.getDimentions)(width, height);
  };

  Animation.prototype.renderImage = function renderImage(source, width, height, playing) {
    if (!playing) {
      return null;
    }

    return _react2.default.createElement('img', {
      src: source,
      width: width,
      height: height,
      onClick: this.onClick,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    });
  };

  Animation.prototype.renderCanvas = function renderCanvas(width, height, playing) {
    var style = { width: width, height: height };
    if (playing) {
      // Hide using style because DOM node required by renderImageToCanvas
      style.display = 'none';
    }

    return _react2.default.createElement('canvas', {
      ref: 'canvas',
      style: style,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    });
  };

  Animation.prototype.renderState = function renderState(playing) {
    var glyph = playing ? 'play_circle_outline' : 'pause_circle_outline';

    return _react2.default.createElement(
      'i',
      { className: 'material-icons message__animation__state' },
      glyph
    );
  };

  Animation.prototype.render = function render() {
    var _getDimentions2 = this.getDimentions();

    var width = _getDimentions2.width;
    var height = _getDimentions2.height;

    var source = this.props.fileUrl || this.props.preview;

    if (!this.state) {
      return _react2.default.createElement('img', {
        className: 'message__photo',
        src: source,
        width: width,
        height: height,
        onClick: this.onClick
      });
    }

    var playing = this.state.playing;


    return _react2.default.createElement(
      'div',
      { className: 'message__animation', style: { width: width, height: height } },
      this.renderState(playing),
      this.renderImage(source, width, height, playing),
      this.renderCanvas(width, height, playing)
    );
  };

  return Animation;
}(_react.Component);

Animation.propTypes = {
  fileUrl: _react.PropTypes.string,
  w: _react.PropTypes.number.isRequired,
  h: _react.PropTypes.number.isRequired,
  preview: _react.PropTypes.string.isRequired
};
exports.default = Animation;
//# sourceMappingURL=Animation.react.js.map