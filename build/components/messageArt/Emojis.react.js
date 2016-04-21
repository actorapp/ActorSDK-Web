'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _reactScroll = require('react-scroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var emojiTabs = [];
var emojis = [];

var Emojis = function (_Component) {
  _inherits(Emojis, _Component);

  function Emojis(props) {
    _classCallCheck(this, Emojis);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.changeDropdownTitle = function (title) {
      return _this.setState({ dropdownTitle: title });
    };

    _this.handleEmojiTabMouseEnter = function (event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.click();
    };

    _this.state = {
      dropdownTitle: ''
    };

    var emojiCategories = (0, _EmojiUtils.getEmojiCategories)();

    emojiCategories.forEach(function (category, index) {
      var currentCategoryEmojis = [];

      _EmojiUtils.emoji.change_replace_mode('css');
      var categoryIcon = _EmojiUtils.emoji.replace_colons(category.icon);

      emojiTabs.push(_react2.default.createElement(
        _reactScroll.Link,
        {
          to: category.title,
          spy: true,
          offset: 30,
          duration: 300,
          key: index,
          onSetActive: function onSetActive() {
            return _this.changeDropdownTitle(category.title);
          },
          onMouseEnter: _this.handleEmojiTabMouseEnter,
          containerId: 'emojiContainer',
          className: 'emojis__header__tabs__tab',
          activeClass: 'emojis__header__tabs__tab--active'
        },
        _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: categoryIcon } })
      ));

      category.data.forEach(function (emojiChar, index) {
        _EmojiUtils.emoji.change_replace_mode('css');
        var convertedChar = _EmojiUtils.emoji.replace_unified(emojiChar);
        _EmojiUtils.emoji.colons_mode = true;
        var emojiColon = _EmojiUtils.emoji.replace_unified(emojiChar);
        _EmojiUtils.emoji.colons_mode = false;

        currentCategoryEmojis.push(_react2.default.createElement('a', { onClick: function onClick() {
            return props.onSelect(emojiColon);
          }, key: index, dangerouslySetInnerHTML: { __html: convertedChar } }));
      });

      emojis.push(_react2.default.createElement(
        _reactScroll.Element,
        { name: category.title, key: index },
        _react2.default.createElement(
          'p',
          null,
          category.title
        ),
        currentCategoryEmojis
      ));
    });

    return _this;
  }

  Emojis.prototype.render = function render() {
    var dropdownTitle = this.state.dropdownTitle;


    return _react2.default.createElement(
      'div',
      { className: 'emojis' },
      _react2.default.createElement(
        'header',
        { className: 'emojis__header' },
        _react2.default.createElement(
          'p',
          { className: 'emojis__header__title' },
          dropdownTitle || 'Emoji'
        ),
        _react2.default.createElement(
          'div',
          { className: 'emojis__header__tabs pull-right' },
          emojiTabs
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'emojis__body', id: 'emojiContainer' },
        emojis
      )
    );
  };

  return Emojis;
}(_react.Component);

Emojis.propTypes = {
  onSelect: _react.PropTypes.func.isRequired
};
exports.default = Emojis;
//# sourceMappingURL=Emojis.react.js.map