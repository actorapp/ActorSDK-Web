'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

    _this.dragging = false;
    _this.state = {
      isActive: false,
      isHovered: false
    };

    _this.onWindowDragEnter = _this.onWindowDragEnter.bind(_this);
    _this.onWindowDragOver = _this.onWindowDragOver.bind(_this);
    _this.onWindowDragLeave = _this.onWindowDragLeave.bind(_this);

    _this.onDrop = _this.onDrop.bind(_this);
    _this.onDragEnter = _this.onDragEnter.bind(_this);
    _this.onDragLeave = _this.onDragLeave.bind(_this);
    return _this;
  }

  DropZone.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('dragenter', this.onWindowDragEnter, false);
    window.addEventListener('dragover', this.onWindowDragOver, false);
    window.addEventListener('dragleave', this.onWindowDragLeave, false);
  };

  DropZone.prototype.componentWillUnmount = function componentWillUnmount() {
    window.addEventListener('dragenter', this.onWindowDragEnter, false);
    window.addEventListener('dragover', this.onWindowDragOver, false);
    window.addEventListener('dragleave', this.onWindowDragLeave, false);
  };

  DropZone.prototype.onWindowDragEnter = function onWindowDragEnter() {
    this.dragging = true;
    if (this.state.isActive) {
      return;
    }

    this.setState({ isActive: true });
  };

  DropZone.prototype.onWindowDragOver = function onWindowDragOver() {
    this.dragging = true;
  };

  DropZone.prototype.onWindowDragLeave = function onWindowDragLeave() {
    var _this2 = this;

    this.dragging = false;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      if (!_this2.dragging) {
        _this2.setState({ isActive: false });
      }
    }, 300);
  };

  DropZone.prototype.onDrop = function onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    this.onDragLeave();
    this.props.onDropComplete(event.dataTransfer.files);
  };

  DropZone.prototype.onDragOver = function onDragOver(event) {
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

    event.preventDefault();
    event.stopPropagation();
  };

  DropZone.prototype.onDragEnter = function onDragEnter() {
    this.setState({ isHovered: true });
  };

  DropZone.prototype.onDragLeave = function onDragLeave() {
    this.setState({ isHovered: false });
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