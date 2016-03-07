'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _ImageUtils = require('../../utils/ImageUtils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _CropAvatarActionCreators = require('../../actions/CropAvatarActionCreators');

var _CropAvatarActionCreators2 = _interopRequireDefault(_CropAvatarActionCreators);

var _CropAvatarStore = require('../../stores/CropAvatarStore');

var _CropAvatarStore2 = _interopRequireDefault(_CropAvatarStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var minCropSize = 100;

var CropAvatarModal = function (_Component) {
  _inherits(CropAvatarModal, _Component);

  function CropAvatarModal(props) {
    _classCallCheck(this, CropAvatarModal);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onClose = function () {
      return _CropAvatarActionCreators2.default.hide();
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.onClose();
      }
    };

    _this.onStartMoving = function (event) {
      var cropPosition = _this.state.cropPosition;


      event.preventDefault();

      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var wrapperRect = wrapper.getBoundingClientRect();

      var dragOffset = {
        x: event.pageX - wrapperRect.left - cropPosition.x,
        y: event.pageY - wrapperRect.top - cropPosition.y
      };
      _this.setState({ dragOffset: dragOffset });

      wrapper.addEventListener('mousemove', _this.onMoving);
      wrapper.addEventListener('touchmove', _this.onMoving);
    };

    _this.onMoving = function (event) {
      var _this$state = _this.state;
      var dragOffset = _this$state.dragOffset;
      var cropSize = _this$state.cropSize;

      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var wrapperRect = wrapper.getBoundingClientRect();

      var cropPosition = {
        x: event.pageX - wrapperRect.left - dragOffset.x,
        y: event.pageY - wrapperRect.top - dragOffset.y
      };

      if (cropPosition.x < 0) {
        cropPosition.x = 0;
      } else if (cropPosition.x > wrapperRect.width - cropSize) {
        cropPosition.x = wrapperRect.width - cropSize;
      }

      if (cropPosition.y < 0) {
        cropPosition.y = 0;
      } else if (cropPosition.y > wrapperRect.height - cropSize) {
        cropPosition.y = wrapperRect.height - cropSize;
      }

      _this.setState({ cropPosition: cropPosition });
    };

    _this.onStartResizeTop = function (event) {
      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var resizeLastCoord = event.pageY;
      event.preventDefault();
      _this.setState({ resizeLastCoord: resizeLastCoord });
      wrapper.addEventListener('mousemove', _this.onResizeTop);
      wrapper.addEventListener('touchmove', _this.onResizeTop);
    };

    _this.onStartResizeRight = function (event) {
      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var resizeLastCoord = event.pageX;
      event.preventDefault();
      _this.setState({ resizeLastCoord: resizeLastCoord });
      wrapper.addEventListener('mousemove', _this.onResizeRight);
      wrapper.addEventListener('touchmove', _this.onResizeRight);
    };

    _this.onStartResizeBottom = function (event) {
      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var resizeLastCoord = event.pageY;
      event.preventDefault();
      _this.setState({ resizeLastCoord: resizeLastCoord });
      wrapper.addEventListener('mousemove', _this.onResizeBottom);
      wrapper.addEventListener('touchmove', _this.onResizeBottom);
    };

    _this.onStartResizeLeft = function (event) {
      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var resizeLastCoord = event.pageX;
      event.preventDefault();
      _this.setState({ resizeLastCoord: resizeLastCoord });
      wrapper.addEventListener('mousemove', _this.onResizeLeft);
      wrapper.addEventListener('touchmove', _this.onResizeLeft);
    };

    _this.onResizeTop = function (event) {
      return _this.onCropResize(event, 'TOP');
    };

    _this.onResizeRight = function (event) {
      return _this.onCropResize(event, 'RIGHT');
    };

    _this.onResizeBottom = function (event) {
      return _this.onCropResize(event, 'BOTTOM');
    };

    _this.onResizeLeft = function (event) {
      return _this.onCropResize(event, 'LEFT');
    };

    _this.onCropResize = function (event, direction) {
      var _this$state2 = _this.state;
      var cropPosition = _this$state2.cropPosition;
      var resizeLastCoord = _this$state2.resizeLastCoord;
      var cropSize = _this$state2.cropSize;
      var scaledWidth = _this$state2.scaledWidth;
      var scaledHeight = _this$state2.scaledHeight;

      var axisCoord = direction === 'RIGHT' || direction === 'LEFT' ? event.pageX : event.pageY;
      var resizeValue = resizeLastCoord - axisCoord;

      var resizeCropPosition = void 0,
          resizedCropSize = void 0;
      switch (direction) {
        case 'TOP':
          resizedCropSize = cropSize + resizeValue;
          resizeCropPosition = {
            x: cropPosition.x - resizeValue / 2,
            y: cropPosition.y - resizeValue
          };
          break;
        case 'RIGHT':
          resizedCropSize = cropSize - resizeValue;
          resizeCropPosition = {
            x: cropPosition.x,
            y: cropPosition.y + resizeValue / 2
          };
          break;
        case 'BOTTOM':
          resizedCropSize = cropSize - resizeValue;
          resizeCropPosition = {
            x: cropPosition.x + resizeValue / 2,
            y: cropPosition.y
          };
          break;
        case 'LEFT':
          resizedCropSize = cropSize + resizeValue;
          resizeCropPosition = {
            x: cropPosition.x - resizeValue,
            y: cropPosition.y - resizeValue / 2
          };
          break;
        default:
      }

      if (resizedCropSize < minCropSize || resizedCropSize > scaledWidth || resizedCropSize > scaledHeight) {
        resizedCropSize = cropSize;
        resizeCropPosition = cropPosition;
      }

      _this.setState({ resizeLastCoord: axisCoord });
      _this.updateCropSize(resizedCropSize, resizeCropPosition);
    };

    _this.removeListeners = function () {
      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);

      wrapper.removeEventListener('mousemove', _this.onMoving);
      wrapper.removeEventListener('touchmove', _this.onMoving);
      wrapper.removeEventListener('mousemove', _this.onResizeTop);
      wrapper.removeEventListener('touchmove', _this.onResizeTop);
      wrapper.removeEventListener('mousemove', _this.onResizeRight);
      wrapper.removeEventListener('touchmove', _this.onResizeRight);
      wrapper.removeEventListener('mousemove', _this.onResizeBottom);
      wrapper.removeEventListener('touchmove', _this.onResizeBottom);
      wrapper.removeEventListener('mousemove', _this.onResizeLeft);
      wrapper.removeEventListener('touchmove', _this.onResizeLeft);
    };

    _this.updateCropSize = function (cropSize, cropPosition) {
      return _this.setState({ cropSize: cropSize, cropPosition: cropPosition });
    };

    _this.onCrop = function () {
      var _this$state3 = _this.state;
      var cropPosition = _this$state3.cropPosition;
      var cropSize = _this$state3.cropSize;
      var scaleRatio = _this$state3.scaleRatio;
      var onCropFinish = _this.props.onCropFinish;

      var cropImage = (0, _reactDom.findDOMNode)(_this.refs.cropImage);
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      canvas.width = canvas.height = cropSize;

      context.drawImage(cropImage, cropPosition.x / scaleRatio, cropPosition.y / scaleRatio, cropSize / scaleRatio, cropSize / scaleRatio, 0, 0, cropSize, cropSize);

      var croppedImage = (0, _ImageUtils.dataURItoBlob)(canvas.toDataURL());

      onCropFinish(croppedImage);
      _this.onClose();
    };

    _this.storeScaledSizes = function (event) {
      var cropSize = _this.state.cropSize;

      var originalImage = (0, _reactDom.findDOMNode)(_this.refs.originalImage);
      var scaledWidth = originalImage.width;
      var scaledHeight = originalImage.height;
      var naturalWidth = originalImage.naturalWidth;
      var naturalHeight = originalImage.naturalHeight;
      var scaleRatio = scaledWidth / naturalWidth;
      var cropPosition = {
        x: (naturalWidth / 2 - cropSize / 2) * scaleRatio,
        y: (naturalHeight / 2 - cropSize / 2) * scaleRatio
      };

      _this.setState({ cropPosition: cropPosition, scaledWidth: scaledWidth, scaledHeight: scaledHeight, naturalWidth: naturalWidth, naturalHeight: naturalHeight, scaleRatio: scaleRatio });
    };

    return _this;
  }

  CropAvatarModal.calculateState = function calculateState() {
    return {
      isOpen: _CropAvatarStore2.default.isOpen(),
      pictureSource: _CropAvatarStore2.default.getPictureSource(),
      cropPosition: {
        x: 0,
        y: 0
      },
      cropSize: 200,
      scaledWidth: 0,
      scaledHeight: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      maxImageHeight: document.body.clientHeight * .9 - 64 // 64 is modal header height.
    };
  };

  CropAvatarModal.prototype.componentDidMount = function componentDidMount() {
    var originalImage = (0, _reactDom.findDOMNode)(this.refs.originalImage);
    document.addEventListener('keydown', this.onKeyDown, false);
    window.addEventListener('resize', this.storeScaledSizes, false);
    originalImage.addEventListener('load', this.storeScaledSizes, false);
  };

  CropAvatarModal.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
    window.removeEventListener('resize', this.storeScaledSizes, false);
  };

  CropAvatarModal.prototype.render = function render() {
    var _state = this.state;
    var isOpen = _state.isOpen;
    var pictureSource = _state.pictureSource;
    var cropPosition = _state.cropPosition;
    var cropSize = _state.cropSize;
    var scaledWidth = _state.scaledWidth;
    var scaledHeight = _state.scaledHeight;
    var maxImageHeight = _state.maxImageHeight;
    var intl = this.context.intl;

    var modalStyle = {
      content: {
        position: null,
        top: null,
        left: null,
        right: null,
        bottom: null,
        border: null,
        background: null,
        overflow: null,
        outline: null,
        padding: null,
        borderRadius: null
      }
    };

    if (isOpen) {
      return _react2.default.createElement(
        _reactModal2.default,
        { className: 'modal-new modal-new--profile-picture',
          closeTimeoutMS: 150,
          isOpen: isOpen,
          style: modalStyle },
        _react2.default.createElement(
          'div',
          { className: 'modal-new__header' },
          _react2.default.createElement(
            'i',
            { className: 'modal-new__header__icon material-icons' },
            'crop'
          ),
          _react2.default.createElement(
            'h3',
            { className: 'modal-new__header__title' },
            intl.messages['modal.crop.title']
          ),
          _react2.default.createElement(
            'div',
            { className: 'pull-right' },
            _react2.default.createElement(
              'button',
              { className: 'button button--lightblue', onClick: this.onCrop },
              intl.messages['button.done']
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-new__body' },
          _react2.default.createElement(
            'div',
            { className: 'crop-wrapper',
              ref: 'wrapper',
              onTouchEnd: this.removeListeners,
              onMouseUp: this.removeListeners },
            _react2.default.createElement(
              'div',
              { className: 'crop-wrapper__scale',
                style: { width: cropSize, height: cropSize, left: cropPosition.x, top: cropPosition.y } },
              _react2.default.createElement('div', { className: 'crop-wrapper__scale__handler crop-wrapper__scale__handler--top',
                onMouseDown: this.onStartResizeTop,
                onTouchStart: this.onStartResizeTop }),
              _react2.default.createElement('div', { className: 'crop-wrapper__scale__handler crop-wrapper__scale__handler--right',
                onMouseDown: this.onStartResizeRight,
                onTouchStart: this.onStartResizeRight }),
              _react2.default.createElement('div', { className: 'crop-wrapper__scale__handler crop-wrapper__scale__handler--bottom',
                onMouseDown: this.onStartResizeBottom,
                onTouchStart: this.onStartResizeBottom }),
              _react2.default.createElement('div', { className: 'crop-wrapper__scale__handler crop-wrapper__scale__handler--left',
                onMouseDown: this.onStartResizeLeft,
                onTouchStart: this.onStartResizeLeft })
            ),
            _react2.default.createElement(
              'div',
              { className: 'crop-wrapper__overlay',
                onMouseDown: this.onStartMoving,
                onTouchStart: this.onStartMoving,
                style: { width: cropSize, height: cropSize, left: cropPosition.x, top: cropPosition.y } },
              _react2.default.createElement('img', { className: 'crop-wrapper__image-crop',
                draggable: 'false',
                ref: 'cropImage',
                src: pictureSource,
                style: { left: -cropPosition.x, top: -cropPosition.y, width: scaledWidth, height: scaledHeight } })
            ),
            _react2.default.createElement('img', { className: 'crop-wrapper__image-original',
              draggable: 'false',
              ref: 'originalImage',
              src: pictureSource,
              style: { maxHeight: maxImageHeight } })
          )
        )
      );
    } else {
      return null;
    }
  };

  return CropAvatarModal;
}(_react.Component);

CropAvatarModal.propTypes = {
  onCropFinish: _react.PropTypes.func.isRequired
};

CropAvatarModal.getStores = function () {
  return [_CropAvatarStore2.default];
};

CropAvatarModal.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(CropAvatarModal);
//# sourceMappingURL=CropAvatar.react.js.map