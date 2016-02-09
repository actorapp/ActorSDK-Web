'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _EmojiUtils = require('../../utils/EmojiUtils');

var _isInside = require('../../utils/isInside');

var _isInside2 = _interopRequireDefault(_isInside);

var _EmojiActionCreators = require('../../actions/EmojiActionCreators');

var _EmojiActionCreators2 = _interopRequireDefault(_EmojiActionCreators);

var _EmojiStore = require('../../stores/EmojiStore');

var _EmojiStore2 = _interopRequireDefault(_EmojiStore);

var _reactScroll = require('react-scroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var emojiTabs = [];
var emojis = [];
var closeTimer = undefined;
var CLOSE_TIMEOUT = 550;

var EmojiDropdown = (function (_Component) {
  _inherits(EmojiDropdown, _Component);

  _createClass(EmojiDropdown, null, [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        isOpen: _EmojiStore2.default.isOpen()
      };
    }
  }]);

  function EmojiDropdown(props) {
    _classCallCheck(this, EmojiDropdown);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EmojiDropdown).call(this, props));

    _this.onKeyDown = function () {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.handleClose();
      }
    };

    _this.handleClose = function () {
      return _EmojiActionCreators2.default.close();
    };

    _this.onSelect = function (emoji) {
      return _this.props.onSelect(emoji);
    };

    _this.onDocumentClick = function (event) {
      event.stopPropagation();
      event.preventDefault();
      if (!event.target.className.includes('emoji-dropdown__header__tabs__tab')) {
        var emojiDropdown = _react2.default.findDOMNode(_this.refs.emojiDropdown);
        var emojiRect = emojiDropdown.getBoundingClientRect();
        var coords = {
          x: event.pageX || event.clientX,
          y: event.pageY || event.clientY
        };

        if (!(0, _isInside2.default)(coords, emojiRect)) {
          _this.handleClose();
        }
      }
    };

    _this.changeDropdownTitle = function (title) {
      return _this.setState({ dropdownTitle: title });
    };

    _this.handleEmojiTabMouseEnter = function (event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.click();
    };

    _this.handleEmojiOpenerMouseEnter = function () {
      _this.handleEmojiMouseEnter();
      localStorage.setItem('isEmojiOpenedBefore', true);
      _EmojiActionCreators2.default.open();
    };

    _this.handleEmojiMouseLeave = function () {
      closeTimer = setTimeout(_this.handleClose, CLOSE_TIMEOUT);
    };

    _this.handleEmojiMouseEnter = function () {
      clearTimeout(closeTimer);
    };

    var emojiCategories = (0, _EmojiUtils.getEmojiCategories)();

    (0, _lodash.forEach)(emojiCategories, function (category, index) {
      var currentCategoryEmojis = [];

      _EmojiUtils.emoji.change_replace_mode('css');
      var categoryIcon = _EmojiUtils.emoji.replace_colons(category.icon);

      emojiTabs.push(_react2.default.createElement(
        _reactScroll.Link,
        { to: category.title,
          spy: true,
          offset: 30,
          duration: 300,
          key: index,
          onSetActive: function onSetActive() {
            return _this.changeDropdownTitle(category.title);
          },
          containerId: 'emojiContainer',
          onMouseEnter: _this.handleEmojiTabMouseEnter,
          className: 'emoji-dropdown__header__tabs__tab',
          activeClass: 'emoji-dropdown__header__tabs__tab--active' },
        _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: categoryIcon } })
      ));

      (0, _lodash.forEach)(category.data, function (emojiChar, index) {
        _EmojiUtils.emoji.change_replace_mode('css');
        var convertedChar = _EmojiUtils.emoji.replace_unified(emojiChar);
        _EmojiUtils.emoji.colons_mode = true;
        var emojiColon = _EmojiUtils.emoji.replace_unified(emojiChar);
        _EmojiUtils.emoji.colons_mode = false;

        currentCategoryEmojis.push(_react2.default.createElement('a', { onClick: function onClick() {
            return _this.onSelect(emojiColon);
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

  _createClass(EmojiDropdown, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var isOpen = nextState.isOpen;

      var emojiDropdown = _react2.default.findDOMNode(this.refs.emojiDropdown);

      if (isOpen) {
        emojiDropdown.addEventListener('mouseenter', this.handleEmojiMouseEnter, false);
        emojiDropdown.addEventListener('mouseleave', this.handleEmojiMouseLeave, false);
        document.addEventListener('click', this.onDocumentClick, false);
        document.addEventListener('keydown', this.onKeyDown, false);
      } else {
        emojiDropdown.removeEventListener('mouseenter', this.handleEmojiMouseEnter, false);
        emojiDropdown.removeEventListener('mouseleave', this.handleEmojiMouseLeave, false);
        document.removeEventListener('click', this.onDocumentClick, false);
        document.removeEventListener('keydown', this.onKeyDown, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isOpen = _state.isOpen;
      var dropdownTitle = _state.dropdownTitle;

      var isEmojiOpenedBefore = localStorage.getItem('isEmojiOpenedBefore') === 'true' || false;

      var emojiDropdownClassName = (0, _classnames2.default)('emoji-dropdown', {
        'emoji-dropdown--opened': isOpen
      });
      var emojiOpenerClassName = (0, _classnames2.default)('emoji-opener material-icons', {
        'emoji-opener--active': isOpen,
        'emoji-opener--with-dot': !isEmojiOpenedBefore
      });

      return _react2.default.createElement(
        'div',
        { className: emojiDropdownClassName },
        _react2.default.createElement(
          'i',
          { className: emojiOpenerClassName,
            onMouseEnter: this.handleEmojiOpenerMouseEnter,
            onMouseLeave: this.handleEmojiMouseLeave },
          'insert_emoticon'
        ),
        _react2.default.createElement(
          'div',
          { className: 'emoji-dropdown__wrapper', ref: 'emojiDropdown' },
          _react2.default.createElement(
            'header',
            { className: 'emoji-dropdown__header' },
            _react2.default.createElement(
              'p',
              { className: 'emoji-dropdown__header__title' },
              dropdownTitle || 'Emoji'
            ),
            _react2.default.createElement(
              'div',
              { className: 'emoji-dropdown__header__tabs pull-right' },
              emojiTabs
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'emoji-dropdown__body', id: 'emojiContainer' },
            emojis
          )
        )
      );
    }
  }]);

  return EmojiDropdown;
})(_react.Component);

EmojiDropdown.propTypes = {
  onSelect: _react.PropTypes.func.isRequired
};

EmojiDropdown.getStores = function () {
  return [_EmojiStore2.default];
};

exports.default = _utils.Container.create(EmojiDropdown, { pure: false, withProps: true });
//# sourceMappingURL=EmojiDropdown.react.js.map