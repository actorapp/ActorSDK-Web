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

var AvatarSizes = {
  tiny: 24,
  small: 32,
  normal: 36,
  medium: 44,
  large: 60,
  big: 120,
  huge: 200
};

var AvatarItem = function (_Component) {
  _inherits(AvatarItem, _Component);

  function AvatarItem() {
    _classCallCheck(this, AvatarItem);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  AvatarItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(prevProps) {
    return prevProps.image !== this.props.image || prevProps.placeholder !== this.props.placeholder || prevProps.title !== this.props.title || prevProps.size !== this.props.size || prevProps.className !== this.props.className;
  };

  AvatarItem.prototype.getFirstChar = function getFirstChar() {
    var title = this.props.title;

    var emojiFirstChar = /([\uE000-\uF8FF]|\uD83C|\uD83D)/g;

    if (title.length == 0) {
      return '#';
    }

    return title[0].match(emojiFirstChar) ? '#' : title[0];
  };

  AvatarItem.prototype.render = function render() {
    var _props = this.props;
    var image = _props.image;
    var placeholder = _props.placeholder;
    var title = _props.title;
    var size = _props.size;
    var onClick = _props.onClick;


    if (image) {
      var _className = (0, _classnames2.default)('avatar__image', { 'avatar--clickable': onClick }, this.props.className);

      var imgSize = AvatarSizes[size];

      return _react2.default.createElement('img', {
        className: _className,
        src: image,
        width: imgSize,
        height: imgSize,
        alt: title,
        onClick: onClick
      });
    }

    var className = (0, _classnames2.default)('avatar__placeholder', 'avatar__placeholder--' + size, 'avatar__placeholder--' + placeholder, this.props.className, { 'avatar--clickable': onClick });

    return _react2.default.createElement(
      'div',
      { className: className, onClick: onClick, title: title },
      this.getFirstChar()
    );
  };

  return AvatarItem;
}(_react.Component);

AvatarItem.propTypes = {
  image: _react.PropTypes.string,
  placeholder: _react.PropTypes.string.isRequired,
  title: _react.PropTypes.string.isRequired,
  size: _react.PropTypes.oneOf(Object.keys(AvatarSizes)).isRequired,
  className: _react.PropTypes.string,
  onClick: _react.PropTypes.func
};
AvatarItem.defaultProps = {
  size: 'normal'
};
exports.default = AvatarItem;
//# sourceMappingURL=AvatarItem.react.js.map