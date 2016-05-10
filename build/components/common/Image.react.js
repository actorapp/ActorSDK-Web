'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _convertImage = require('../../utils/convertImage');

var _convertImage2 = _interopRequireDefault(_convertImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Image = function (_Component) {
  _inherits(Image, _Component);

  function Image(props) {
    _classCallCheck(this, Image);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      isLoading: true
    };

    (0, _convertImage2.default)(props.src).then(function (src) {
      _this.setState({
        src: src,
        isLoading: false
      });
    });
    return _this;
  }

  Image.prototype.render = function render() {
    var _state = this.state;
    var isLoading = _state.isLoading;
    var src = _state.src;

    if (isLoading) return null;

    return _react2.default.createElement('img', _extends({}, this.props, { src: src }));
  };

  return Image;
}(_react.Component);

Image.propTypes = {
  src: _react.PropTypes.string.isRequired,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  onLoad: _react.PropTypes.func,
  onError: _react.PropTypes.func,
  onClick: _react.PropTypes.func
};
exports.default = Image;
//# sourceMappingURL=Image.react.js.map