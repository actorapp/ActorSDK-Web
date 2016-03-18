'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var AvatarItem = function (_Component) {
  (0, _inherits3.default)(AvatarItem, _Component);

  function AvatarItem(props) {
    (0, _classCallCheck3.default)(this, AvatarItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.handleClick = function (event) {
      var onClick = _this.props.onClick;

      onClick && onClick(event);
    };

    return _this;
  }

  AvatarItem.prototype.render = function render() {
    var _props = this.props;
    var title = _props.title;
    var className = _props.className;
    var image = _props.image;
    var size = _props.size;
    var placeholder = _props.placeholder;


    var placeholderClassName = (0, _classnames2.default)('avatar__placeholder', 'avatar__placeholder--' + placeholder);
    var avatarClassName = (0, _classnames2.default)('avatar', {
      'avatar--tiny': size === 'tiny',
      'avatar--small': size === 'small',
      'avatar--medium': size === 'medium',
      'avatar--large': size === 'large',
      'avatar--big': size === 'big',
      'avatar--huge': size === 'huge',
      'avatar--without-shadow': !image
    }, className);

    var avatar = image ? _react2.default.createElement('img', { alt: title, className: 'avatar__image', src: image }) : null;

    var emojiFirstChar = /([\uE000-\uF8FF]|\uD83C|\uD83D)/g;

    var placeholderChar = void 0;
    if (title.length == 0) {
      placeholderChar = '#';
    } else {
      placeholderChar = title[0].match(emojiFirstChar) ? '#' : title[0];
    }

    return _react2.default.createElement(
      'div',
      { className: avatarClassName, onClick: this.handleClick },
      avatar,
      _react2.default.createElement(
        'span',
        { className: placeholderClassName },
        placeholderChar
      )
    );
  };

  return AvatarItem;
}(_react.Component);

AvatarItem.propTypes = {
  className: _react.PropTypes.string,
  image: _react.PropTypes.string,
  placeholder: _react.PropTypes.string.isRequired,
  size: _react.PropTypes.string,
  title: _react.PropTypes.string.isRequired,

  onClick: _react.PropTypes.func
};
exports.default = AvatarItem;
//# sourceMappingURL=AvatarItem.react.js.map