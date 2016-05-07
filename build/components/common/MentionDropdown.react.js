'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EventListener = require('fbjs/lib/EventListener');

var _EventListener2 = _interopRequireDefault(_EventListener);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

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

var MentionDropdown = function (_Component) {
  _inherits(MentionDropdown, _Component);

  function MentionDropdown(props) {
    _classCallCheck(this, MentionDropdown);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.closeMentions = function () {
      return _this.setState({ isOpen: false });
    };

    _this.onSelect = function (value) {
      return _this.props.onSelect(value);
    };

    _this.handleScroll = function (top) {
      var menuListNode = (0, _reactDom.findDOMNode)(_this.refs.mentionList);
      menuListNode.scrollTop = top;
    };

    var mentions = props.mentions;


    _this.state = {
      isOpen: mentions && mentions.length > 0,
      selectedIndex: 0
    };

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onDocumentClick = _this.onDocumentClick.bind(_this);
    _this.onDocumentKeyDown = _this.onDocumentKeyDown.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  MentionDropdown.prototype.componentDidMount = function componentDidMount() {
    this.listeners = [_EventListener2.default.listen(document, 'click', this.onDocumentClick), _EventListener2.default.listen(document, 'keydown', this.onDocumentKeyDown)];
  };

  MentionDropdown.prototype.componentWillUnmount = function componentWillUnmount() {
    this.listeners.forEach(function (listener) {
      return listener.remove();
    });
    this.listeners = null;
  };

  MentionDropdown.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var mentions = props.mentions;

    this.setState({
      isOpen: mentions && mentions.length > 0,
      selectedIndex: 0
    });
  };

  MentionDropdown.prototype.onDocumentClick = function onDocumentClick() {
    if (this.state.isOpen) {
      this.closeMentions();
    }
  };

  MentionDropdown.prototype.onDocumentKeyDown = function onDocumentKeyDown(event) {
    if (this.state.isOpen) {
      this.onKeyDown(event);
    }
  };

  MentionDropdown.prototype.onKeyDown = function onKeyDown(event) {
    var _props = this.props;
    var mentions = _props.mentions;
    var onClose = _props.onClose;
    var selectedIndex = this.state.selectedIndex;

    var visibleItems = 6;
    var index = selectedIndex;

    if (index !== null) {
      switch (event.keyCode) {
        case _ActorAppConstants.KeyCodes.ENTER:
          event.stopPropagation();
          event.preventDefault();
          this.onSelect(mentions[selectedIndex]);
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

          this.handleScroll(scrollIndex * DROPDOWN_ITEM_HEIGHT);
          this.setState({ selectedIndex: index });
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

          this.handleScroll(scrollIndex * DROPDOWN_ITEM_HEIGHT);
          this.setState({ selectedIndex: index });
          break;
        default:
      }
    }

    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      this.closeMentions();
      if (onClose) onClose();
    }
  };

  MentionDropdown.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props;
    var className = _props2.className;
    var mentions = _props2.mentions;
    var _state = this.state;
    var isOpen = _state.isOpen;
    var selectedIndex = _state.selectedIndex;


    if (!isOpen) {
      return _react2.default.createElement('div', { className: 'mention' });
    }

    var mentionsElements = (0, _lodash.map)(mentions, function (mention, index) {
      var itemClassName = (0, _classnames2.default)('mention__list__item', {
        'mention__list__item--active': selectedIndex === index
      });

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
          mention.isNick && _react2.default.createElement(
            'span',
            { className: 'nickname' },
            mention.mentionText
          ),
          _react2.default.createElement(
            'span',
            { className: 'name' },
            mention.mentionText
          )
        )
      );
    });

    var mentionClassName = (0, _classnames2.default)('mention mention--opened', className);

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
  };

  return MentionDropdown;
}(_react.Component);

MentionDropdown.propTypes = {
  mentions: _react.PropTypes.array,
  className: _react.PropTypes.string,
  onSelect: _react.PropTypes.func.isRequired,
  onClose: _react.PropTypes.func
};
exports.default = MentionDropdown;
//# sourceMappingURL=MentionDropdown.react.js.map