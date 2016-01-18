'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _EmojiUtils = require('../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AvatarItem = (function (_React$Component) {
  _inherits(AvatarItem, _React$Component);

  function AvatarItem(props) {
    _classCallCheck(this, AvatarItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AvatarItem).call(this, props));

    _this.handleClick = function (event) {
      var onClick = _this.props.onClick;

      onClick && onClick(event);
    };

    return _this;
  }

  _createClass(AvatarItem, [{
    key: 'render',
    value: function render() {
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
        'avatar--huge': size === 'huge'
      }, className);

      var avatar = image ? _react2.default.createElement('img', { alt: title, className: 'avatar__image', src: image }) : null;

      var emojiFirstChar = /([\uE000-\uF8FF]|\uD83C|\uD83D)/g;

      var placeholderChar = undefined;
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
    }
  }]);

  return AvatarItem;
})(_react2.default.Component);

AvatarItem.propTypes = {
  className: _react2.default.PropTypes.string,
  image: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string.isRequired,
  size: _react2.default.PropTypes.string,
  title: _react2.default.PropTypes.string.isRequired,

  onClick: _react2.default.PropTypes.func
};
exports.default = AvatarItem;
//# sourceMappingURL=AvatarItem.react.js.map