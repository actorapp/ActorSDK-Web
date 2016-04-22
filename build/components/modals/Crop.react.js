'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _ImageUtils = require('../../utils/ImageUtils');

var _reactIntl = require('react-intl');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _CropActionCreators = require('../../actions/CropActionCreators');

var _CropActionCreators2 = _interopRequireDefault(_CropActionCreators);

var _CropAvatarStore = require('../../stores/CropAvatarStore');

var _CropAvatarStore2 = _interopRequireDefault(_CropAvatarStore);

var _ModalCloseButton = require('./ModalCloseButton.react');

var _ModalCloseButton2 = _interopRequireDefault(_ModalCloseButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MIN_CROP_SIZE = 100;

var CropAvatarModal = function (_Component) {
  _inherits(CropAvatarModal, _Component);

  function CropAvatarModal() {
    var _temp, _this, _ret;

    _classCallCheck(this, CropAvatarModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleClose = function () {
      return _CropActionCreators2.default.hide();
    }, _this.onStartMoving = function (event) {
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
    }, _this.onMoving = function (event) {
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
    }, _this.onStartResizeTop = function (event) {
      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var resizeLastCoord = event.pageY;
      event.preventDefault();
      _this.setState({ resizeLastCoord: resizeLastCoord });
      wrapper.addEventListener('mousemove', _this.onResizeTop);
      wrapper.addEventListener('touchmove', _this.onResizeTop);
    }, _this.onStartResizeRight = function (event) {
      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var resizeLastCoord = event.pageX;
      event.preventDefault();
      _this.setState({ resizeLastCoord: resizeLastCoord });
      wrapper.addEventListener('mousemove', _this.onResizeRight);
      wrapper.addEventListener('touchmove', _this.onResizeRight);
    }, _this.onStartResizeBottom = function (event) {
      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var resizeLastCoord = event.pageY;
      event.preventDefault();
      _this.setState({ resizeLastCoord: resizeLastCoord });
      wrapper.addEventListener('mousemove', _this.onResizeBottom);
      wrapper.addEventListener('touchmove', _this.onResizeBottom);
    }, _this.onStartResizeLeft = function (event) {
      var wrapper = (0, _reactDom.findDOMNode)(_this.refs.wrapper);
      var resizeLastCoord = event.pageX;
      event.preventDefault();
      _this.setState({ resizeLastCoord: resizeLastCoord });
      wrapper.addEventListener('mousemove', _this.onResizeLeft);
      wrapper.addEventListener('touchmove', _this.onResizeLeft);
    }, _this.onResizeTop = function (event) {
      return _this.onCropResize(event, 'TOP');
    }, _this.onResizeRight = function (event) {
      return _this.onCropResize(event, 'RIGHT');
    }, _this.onResizeBottom = function (event) {
      return _this.onCropResize(event, 'BOTTOM');
    }, _this.onResizeLeft = function (event) {
      return _this.onCropResize(event, 'LEFT');
    }, _this.onCropResize = function (event, direction) {
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

      if (resizedCropSize < MIN_CROP_SIZE || resizedCropSize > scaledWidth || resizedCropSize > scaledHeight) {
        resizedCropSize = cropSize;
        resizeCropPosition = cropPosition;
      }

      _this.setState({ resizeLastCoord: axisCoord });
      _this.updateCropSize(resizedCropSize, resizeCropPosition);
    }, _this.removeListeners = function () {
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
    }, _this.updateCropSize = function (cropSize, cropPosition) {
      return _this.setState({ cropSize: cropSize, cropPosition: cropPosition });
    }, _this.onCrop = function () {
      var _this$state3 = _this.state;
      var cropPosition = _this$state3.cropPosition;
      var cropSize = _this$state3.cropSize;
      var scaleRatio = _this$state3.scaleRatio;
      var callback = _this$state3.callback;

      var cropImage = (0, _reactDom.findDOMNode)(_this.refs.cropImage);
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      canvas.width = canvas.height = cropSize;

      context.drawImage(cropImage, cropPosition.x / scaleRatio, cropPosition.y / scaleRatio, cropSize / scaleRatio, cropSize / scaleRatio, 0, 0, cropSize, cropSize);

      var croppedImage = (0, _ImageUtils.dataURItoBlob)(canvas.toDataURL());

      callback && callback(croppedImage);
      _this.handleClose();
    }, _this.storeScaledSizes = function () {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CropAvatarModal.getStores = function getStores() {
    return [_CropAvatarStore2.default];
  };

  CropAvatarModal.calculateState = function calculateState() {
    return {
      pictureSource: _CropAvatarStore2.default.getState().source,
      callback: _CropAvatarStore2.default.getState().callback,
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
    window.addEventListener('resize', this.storeScaledSizes, false);
    originalImage.addEventListener('load', this.storeScaledSizes, false);
  };

  CropAvatarModal.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.storeScaledSizes, false);
  };

  CropAvatarModal.prototype.renderControls = function renderControls() {
    return _react2.default.createElement(
      'div',
      { className: 'controls' },
      _react2.default.createElement(
        'button',
        { className: 'button', onClick: this.handleClose },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.cancel' })
      ),
      _react2.default.createElement(
        'button',
        { className: 'button button--rised', onClick: this.onCrop },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.done' })
      )
    );
  };

  CropAvatarModal.prototype.render = function render() {
    var _state = this.state;
    var pictureSource = _state.pictureSource;
    var cropPosition = _state.cropPosition;
    var cropSize = _state.cropSize;
    var scaledWidth = _state.scaledWidth;
    var scaledHeight = _state.scaledHeight;
    var maxImageHeight = _state.maxImageHeight;


    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay modal-overlay--white',
        className: 'modal modal--fullscreen',
        onRequestClose: this.handleClose,
        shouldCloseOnOverlayClick: false,
        isOpen: true },
      _react2.default.createElement(_ModalCloseButton2.default, { onClick: this.handleClose }),
      _react2.default.createElement(
        'div',
        { className: 'crop' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.crop.title', tagName: 'h1' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__body' },
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
              _react2.default.createElement('img', {
                className: 'crop-wrapper__image-original',
                draggable: 'false',
                ref: 'originalImage',
                src: pictureSource,
                style: { maxHeight: maxImageHeight } })
            )
          ),
          _react2.default.createElement(
            'footer',
            { className: 'modal__footer' },
            this.renderControls()
          )
        )
      )
    );
  };

  return CropAvatarModal;
}(_react.Component);

exports.default = _utils.Container.create(CropAvatarModal);
//# sourceMappingURL=Crop.react.js.map