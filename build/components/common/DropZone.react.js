'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _lodash = require('lodash');

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

var targetCollection = [];

var DropZone = (function (_Component) {
  _inherits(DropZone, _Component);

  function DropZone(props) {
    _classCallCheck(this, DropZone);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DropZone).call(this, props));

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

  _createClass(DropZone, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('dragenter', this.onWindowDragEnter, false);
      window.removeEventListener('dragover', this.onWindowDragOver, false);
      window.removeEventListener('dragleave', this.onWindowDragLeave, false);
      window.removeEventListener('drop', this.onWindowDragLeave, false);
    }
  }, {
    key: 'render',
    value: function render() {
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
    }
  }]);

  return DropZone;
})(_react.Component);

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