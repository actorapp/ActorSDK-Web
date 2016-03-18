'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var targetCollection = []; /*
                            * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                            */

var DropZone = function (_Component) {
  (0, _inherits3.default)(DropZone, _Component);

  function DropZone(props) {
    (0, _classCallCheck3.default)(this, DropZone);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onWindowDragEnter = function (event) {
      var onDragEnterCallback = _this.props.onDragEnterCallback;

      event.preventDefault();

      if (targetCollection.length === 0) {
        _this.setState({ isActive: true });
        onDragEnterCallback && onDragEnterCallback();
      }

      targetCollection = (0, _lodash.union)(targetCollection, [event.target]);
    };

    _this.onWindowDragOver = function (event) {
      return event.preventDefault();
    };

    _this.onWindowDragLeave = function (event) {
      var onDragLeaveCallback = _this.props.onDragLeaveCallback;

      event.preventDefault();

      targetCollection = (0, _lodash.without)(targetCollection, event.target);

      if (targetCollection.length === 0) {
        _this.setState({ isActive: false });
        onDragLeaveCallback && onDragLeaveCallback();
      }
    };

    _this.onDragEnter = function () {
      return _this.setState({ isHovered: true });
    };

    _this.onDragLeave = function () {
      return _this.setState({ isHovered: false });
    };

    _this.onDrop = function (event) {
      var _this$props = _this.props;
      var onDropCallback = _this$props.onDropCallback;
      var onDropComplete = _this$props.onDropComplete;

      _this.onDragLeave();
      _this.onWindowDragLeave(event);
      onDropCallback && onDropCallback();
      onDropComplete(event.dataTransfer.files);
    };

    _this.state = {
      isActive: false,
      isHovered: false
    };

    window.addEventListener('dragenter', _this.onWindowDragEnter, false);
    window.addEventListener('dragover', _this.onWindowDragOver, false);
    window.addEventListener('dragleave', _this.onWindowDragLeave, false);
    window.addEventListener('drop', _this.onWindowDragLeave, false);
    return _this;
  }

  DropZone.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('dragenter', this.onWindowDragEnter, false);
    window.removeEventListener('dragover', this.onWindowDragOver, false);
    window.removeEventListener('dragleave', this.onWindowDragLeave, false);
    window.removeEventListener('drop', this.onWindowDragLeave, false);
  };

  DropZone.prototype.render = function render() {
    var _state = this.state;
    var isActive = _state.isActive;
    var isHovered = _state.isHovered;


    var dropzoneClassName = (0, _classnames2.default)('dropzone', {
      'dropzone--hover': isHovered
    });

    if (isActive) {
      return _react2.default.createElement(
        'div',
        { className: dropzoneClassName,
          onDragEnter: this.onDragEnter,
          onDragLeave: this.onDragLeave,
          onDrop: this.onDrop },
        this.props.children || 'Drop here'
      );
    } else {
      return null;
    }
  };

  return DropZone;
}(_react.Component);

DropZone.propTypes = {
  children: _react.PropTypes.node,

  onDropComplete: _react.PropTypes.func.isRequired,

  // Callbacks
  onDragEnterCallback: _react.PropTypes.func,
  onDragLeaveCallback: _react.PropTypes.func,
  onDropCallback: _react.PropTypes.func
};
exports.default = DropZone;
//# sourceMappingURL=DropZone.react.js.map