'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _AvatarItem = require('./AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DROPDOWN_ITEM_HEIGHT = 38;
var scrollIndex = 0;

var MentionDropdown = (function (_Component) {
  _inherits(MentionDropdown, _Component);

  function MentionDropdown(props) {
    _classCallCheck(this, MentionDropdown);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MentionDropdown).call(this, props));

    _initialiseProps.call(_this);

    var mentions = props.mentions;

    _this.state = {
      isOpen: mentions && mentions.length > 0,
      selectedIndex: 0
    };
    return _this;
  }

  _createClass(MentionDropdown, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cleanListeners();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextState.isOpen && !this.state.isOpen) {
        this.setListeners();
      } else if (!nextState.isOpen && this.state.isOpen) {
        this.cleanListeners();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var mentions = props.mentions;

      this.setState({
        isOpen: mentions && mentions.length > 0,
        selectedIndex: 0
      });
    }
  }, {
    key: 'setListeners',
    value: function setListeners() {
      document.addEventListener('keydown', this.onKeyDown, false);
      document.addEventListener('click', this.closeMentions, false);
    }
  }, {
    key: 'cleanListeners',
    value: function cleanListeners() {
      document.removeEventListener('keydown', this.onKeyDown, false);
      document.removeEventListener('click', this.closeMentions, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var mentions = _props.mentions;
      var _state = this.state;
      var isOpen = _state.isOpen;
      var selectedIndex = _state.selectedIndex;

      var mentionClassName = (0, _classnames2.default)('mention', {
        'mention--opened': isOpen
      }, className);
      var mentionsElements = (0, _lodash.map)(mentions, function (mention, index) {
        var itemClassName = (0, _classnames2.default)('mention__list__item', {
          'mention__list__item--active': selectedIndex === index
        });

        var title = mention.isNick ? [_react2.default.createElement(
          'span',
          { className: 'nickname' },
          mention.mentionText
        ), _react2.default.createElement(
          'span',
          { className: 'name' },
          mention.secondText
        )] : _react2.default.createElement(
          'span',
          { className: 'name' },
          mention.mentionText
        );

        return _react2.default.createElement(
          'li',
          { className: itemClassName,
            key: index,
            onClick: function onClick() {
              return _this2.onSelect(mention);
            },
            onMouseOver: function onMouseOver() {
              return _this2.setState({ selectedIndex: index });
            } },
          _react2.default.createElement(_AvatarItem2.default, { image: mention.peer.avatar,
            placeholder: mention.peer.placeholder,
            size: 'tiny',
            title: mention.peer.title }),
          _react2.default.createElement(
            'div',
            { className: 'title' },
            title
          )
        );
      });

      if (isOpen) {
        return _react2.default.createElement(
          'div',
          { className: mentionClassName },
          _react2.default.createElement(
            'div',
            { className: 'mention__wrapper' },
            _react2.default.createElement(
              'header',
              { className: 'mention__header' },
              _react2.default.createElement(
                'div',
                { className: 'pull-left' },
                _react2.default.createElement(
                  'strong',
                  null,
                  'tab'
                ),
                '  or  ',
                _react2.default.createElement(
                  'strong',
                  null,
                  '↑'
                ),
                _react2.default.createElement(
                  'strong',
                  null,
                  '↓'
                ),
                '  to navigate'
              ),
              _react2.default.createElement(
                'div',
                { className: 'pull-left' },
                _react2.default.createElement(
                  'strong',
                  null,
                  '↵'
                ),
                '  to select'
              ),
              _react2.default.createElement(
                'div',
                { className: 'pull-right' },
                _react2.default.createElement(
                  'strong',
                  null,
                  'esc'
                ),
                '  to close'
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'mention__list', ref: 'mentionList' },
              mentionsElements
            )
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return MentionDropdown;
})(_react.Component);

MentionDropdown.propTypes = {
  mentions: _react.PropTypes.array,
  className: _react.PropTypes.string,
  onSelect: _react.PropTypes.func.isRequired,
  onClose: _react.PropTypes.func
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.closeMentions = function () {
    return _this3.setState({ isOpen: false });
  };

  this.onSelect = function (value) {
    return _this3.props.onSelect(value);
  };

  this.handleScroll = function (top) {
    var menuListNode = (0, _reactDom.findDOMNode)(_this3.refs.mentionList);
    menuListNode.scrollTop = top;
  };

  this.onKeyDown = function (event) {
    var _props2 = _this3.props;
    var mentions = _props2.mentions;
    var onClose = _props2.onClose;
    var selectedIndex = _this3.state.selectedIndex;

    var visibleItems = 6;
    var index = selectedIndex;

    if (index !== null) {
      switch (event.keyCode) {
        case _ActorAppConstants.KeyCodes.ENTER:
          event.stopPropagation();
          event.preventDefault();
          _this3.onSelect(mentions[selectedIndex]);
          break;

        case _ActorAppConstants.KeyCodes.ARROW_UP:
          event.stopPropagation();
          event.preventDefault();

          if (index > 0) {
            index -= 1;
          } else if (index === 0) {
            index = mentions.length - 1;
          }

          if (scrollIndex > index) {
            scrollIndex = index;
          } else if (index === mentions.length - 1) {
            scrollIndex = mentions.length - visibleItems;
          }

          _this3.handleScroll(scrollIndex * DROPDOWN_ITEM_HEIGHT);
          _this3.setState({ selectedIndex: index });
          break;
        case _ActorAppConstants.KeyCodes.ARROW_DOWN:
        case _ActorAppConstants.KeyCodes.TAB:
          event.stopPropagation();
          event.preventDefault();

          if (index < mentions.length - 1) {
            index += 1;
          } else if (index === mentions.length - 1) {
            index = 0;
          }

          if (index + 1 > scrollIndex + visibleItems) {
            scrollIndex = index + 1 - visibleItems;
          } else if (index === 0) {
            scrollIndex = 0;
          }

          _this3.handleScroll(scrollIndex * DROPDOWN_ITEM_HEIGHT);
          _this3.setState({ selectedIndex: index });
          break;
        default:
      }
    }

    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      _this3.closeMentions();
      if (onClose) onClose();
    }
  };
};

_reactMixin2.default.onClass(MentionDropdown, _reactAddonsPureRenderMixin2.default);

exports.default = MentionDropdown;
//# sourceMappingURL=MentionDropdown.react.js.map