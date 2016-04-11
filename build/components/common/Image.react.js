'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _convertImage = require('../../utils/convertImage');

var _convertImage2 = _interopRequireDefault(_convertImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

var Image = function (_Component) {
  (0, _inherits3.default)(Image, _Component);

  function Image(props) {
    (0, _classCallCheck3.default)(this, Image);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

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

    return _react2.default.createElement('img', (0, _extends3.default)({}, this.props, { src: src }));
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