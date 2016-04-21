'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var DROPDOWN_ITEM_HEIGHT = 38;
var scrollIndex = 0;

var MentionDropdown = function (_Component) {
  (0, _inherits3.default)(MentionDropdown, _Component);

  function MentionDropdown(props) {
    (0, _classCallCheck3.default)(this, MentionDropdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var mentions = props.mentions;


    _this.state = {
      isOpen: mentions && mentions.length > 0,
      selectedIndex: 0
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  MentionDropdown.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cleanListeners();
  };

  MentionDropdown.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextState.isOpen && !this.state.isOpen) {
      this.setListeners();
    } else if (!nextState.isOpen && this.state.isOpen) {
      this.cleanListeners();
    }
  };

  MentionDropdown.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var mentions = props.mentions;

    this.setState({
      isOpen: mentions && mentions.length > 0,
      selectedIndex: 0
    });
  };

  MentionDropdown.prototype.setListeners = function setListeners() {
    this.cleanListeners();
    this.listeners = [_EventListener2.default.listen(document, 'keydown', this.onKeyDown), _EventListener2.default.listen(document, 'click', this.closeMentions)];
  };

  MentionDropdown.prototype.cleanListeners = function cleanListeners() {
    if (this.listeners) {
      this.listeners.forEach(function (listener) {
        listener.remove();
      });

      this.listeners = null;
    }
  };

  MentionDropdown.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var className = _props.className;
    var mentions = _props.mentions;
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

exports.default = MentionDropdown;
//# sourceMappingURL=MentionDropdown.react.js.map