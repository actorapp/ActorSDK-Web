'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EventListener = require('fbjs/lib/EventListener');

var _EventListener2 = _interopRequireDefault(_EventListener);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DropZone = function (_Component) {
  _inherits(DropZone, _Component);

  function DropZone(props) {
    _classCallCheck(this, DropZone);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.windowDragging = false;
    _this.zoneDragging = false;

    _this.state = {
      isActive: false,
      isHovered: false
    };

    _this.onWindowDrop = _this.onWindowDrop.bind(_this);
    _this.onWindowDragEnter = _this.onWindowDragEnter.bind(_this);
    _this.onWindowDragOver = _this.onWindowDragOver.bind(_this);
    _this.onWindowDragLeave = _this.onWindowDragLeave.bind(_this);

    _this.onDrop = _this.onDrop.bind(_this);
    _this.onDragEnter = _this.onDragEnter.bind(_this);
    _this.onDragOver = _this.onDragOver.bind(_this);
    _this.onDragLeave = _this.onDragLeave.bind(_this);
    return _this;
  }

  DropZone.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextState.isActive !== this.state.isActive || nextState.isHovered !== this.state.isHovered;
  };

  DropZone.prototype.componentDidMount = function componentDidMount() {
    this.listeners = [_EventListener2.default.listen(window, 'drop', this.onWindowDrop), _EventListener2.default.listen(window, 'dragenter', this.onWindowDragEnter), _EventListener2.default.listen(window, 'dragover', this.onWindowDragOver), _EventListener2.default.listen(window, 'dragleave', this.onWindowDragLeave)];
  };

  DropZone.prototype.componentWillUnmount = function componentWillUnmount() {
    this.listeners.forEach(function (listener) {
      listener.remove();
    });

    this.listeners = null;
  };

  DropZone.prototype.onWindowDrop = function onWindowDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({ isActive: false, isHovered: false });
  };

  DropZone.prototype.onWindowDragEnter = function onWindowDragEnter() {
    this.windowDragging = true;
    clearTimeout(this.windowTimeout);

    if (this.state.isActive) {
      return;
    }

    this.setState({ isActive: true });
  };

  DropZone.prototype.onWindowDragOver = function onWindowDragOver(event) {
    event.preventDefault();
    event.stopPropagation();

    this.windowDragging = true;
    clearTimeout(this.windowTimeout);
  };

  DropZone.prototype.onWindowDragLeave = function onWindowDragLeave() {
    var _this2 = this;

    this.windowDragging = false;
    clearTimeout(this.windowTimeout);

    this.windowTimeout = setTimeout(function () {
      if (!_this2.windowDragging) {
        _this2.setState({ isActive: false });
      }
    }, 60);
  };

  DropZone.prototype.onDrop = function onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    this.onDragLeave();
    this.onWindowDragLeave();
    this.props.onDropComplete(event.dataTransfer.files);
  };

  DropZone.prototype.onDragEnter = function onDragEnter() {
    this.zoneDragging = true;
    this.windowDragging = true;
    clearTimeout(this.zoneTimeout);
    clearTimeout(this.windowTimeout);

    if (this.state.isHovered) {
      return;
    }

    this.setState({ isHovered: true });
  };

  DropZone.prototype.onDragOver = function onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();

    this.zoneDragging = true;
    this.windowDragging = true;
    clearTimeout(this.zoneTimeout);
    clearTimeout(this.windowTimeout);

    // Makes it possible to drag files from chrome's download bar
    // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
    try {
      var effect = event.dataTransfer.effectAllowed;
      if (effect === 'move' || effect === 'linkMove') {
        event.dataTransfer.dropEffect = 'move';
      } else {
        event.dataTransfer.dropEffect = 'copy';
      }
    } catch (e) {
      // do nothing
    }
  };

  DropZone.prototype.onDragLeave = function onDragLeave() {
    var _this3 = this;

    this.zoneDragging = false;
    clearTimeout(this.zoneTimeout);

    this.zoneTimeout = setTimeout(function () {
      if (!_this3.zoneDragging) {
        _this3.setState({ isHovered: false });
      }
    }, 60);
  };

  DropZone.prototype.render = function render() {
    var _state = this.state;
    var isActive = _state.isActive;
    var isHovered = _state.isHovered;


    if (!isActive) {
      return null;
    }

    var className = (0, _classnames2.default)('dropzone', {
      'dropzone--hover': isHovered
    });

    return _react2.default.createElement(
      'div',
      {
        className: className,
        onDrop: this.onDrop,
        onDragOver: this.onDragOver,
        onDragEnter: this.onDragEnter,
        onDragLeave: this.onDragLeave
      },
      this.props.children
    );
  };

  return DropZone;
}(_react.Component);

DropZone.propTypes = {
  children: _react.PropTypes.node.isRequired,
  onDropComplete: _react.PropTypes.func.isRequired
};
exports.default = DropZone;
//# sourceMappingURL=DropZone.react.js.map