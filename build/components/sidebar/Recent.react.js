'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _GroupListActionCreators = require('../../actions/GroupListActionCreators');

var _GroupListActionCreators2 = _interopRequireDefault(_GroupListActionCreators);

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _CreateGroupActionCreators = require('../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _AddContactActionCreators = require('../../actions/AddContactActionCreators');

var _AddContactActionCreators2 = _interopRequireDefault(_AddContactActionCreators);

var _CustomScroller = require('../common/CustomScroller.react');

var _CustomScroller2 = _interopRequireDefault(_CustomScroller);

var _RecentGroup = require('./RecentGroup.react');

var _RecentGroup2 = _interopRequireDefault(_RecentGroup);

var _SidebarLink = require('./SidebarLink.react');

var _SidebarLink2 = _interopRequireDefault(_SidebarLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Recent = function (_Component) {
  _inherits(Recent, _Component);

  function Recent(props) {
    _classCallCheck(this, Recent);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      haveUnreadAbove: false,
      haveUnreadBelow: false,
      lastUnreadBelow: null,
      firstUnreadAbove: null
    };

    _this.checkInvisibleCounters = (0, _lodash.throttle)(_this.checkInvisibleCounters.bind(_this), 300);
    _this.scrollToFirstHiddenAbove = _this.scrollToFirstHiddenAbove.bind(_this);
    _this.scrollToLastHiddenBelow = _this.scrollToLastHiddenBelow.bind(_this);
    _this.handleGroupListTitleClick = _this.handleGroupListTitleClick.bind(_this);
    _this.handlePrivateListTitleClick = _this.handlePrivateListTitleClick.bind(_this);
    return _this;
  }

  Recent.prototype.handleGroupListTitleClick = function handleGroupListTitleClick() {
    _GroupListActionCreators2.default.open();
  };

  Recent.prototype.handlePrivateListTitleClick = function handlePrivateListTitleClick() {
    _ContactActionCreators2.default.open();
  };

  Recent.prototype.handleAddContact = function handleAddContact() {
    _AddContactActionCreators2.default.open();
  };

  Recent.prototype.handleCreateGroup = function handleCreateGroup() {
    _CreateGroupActionCreators2.default.open();
  };

  Recent.prototype.checkInvisibleCounters = function checkInvisibleCounters() {
    var scroller = this.refs.scroller;

    var recentRect = scroller.getBoundingClientRect();
    // TODO: refactor this
    var unreadNodes = scroller.container.getElementsByClassName('recent__item--unread');

    var haveUnreadAbove = false,
        haveUnreadBelow = false,
        lastUnreadBelow = null,
        firstUnreadAbove = null;

    (0, _lodash.forEach)(unreadNodes, function (node) {
      var rect = node.getBoundingClientRect();
      if (recentRect.top + recentRect.height < rect.top) {
        haveUnreadBelow = true;
        lastUnreadBelow = node;
      }
      if (recentRect.top > rect.top + rect.height) {
        haveUnreadAbove = true;
        if (!firstUnreadAbove) {
          firstUnreadAbove = node;
        }
      }
    });

    this.setState({ haveUnreadAbove: haveUnreadAbove, haveUnreadBelow: haveUnreadBelow, firstUnreadAbove: firstUnreadAbove, lastUnreadBelow: lastUnreadBelow });
  };

  Recent.prototype.scrollToFirstHiddenAbove = function scrollToFirstHiddenAbove() {
    var scroller = this.refs.scroller;
    var firstUnreadAbove = this.state.firstUnreadAbove;

    var rect = firstUnreadAbove.getBoundingClientRect();
    var dimensions = scroller.getDimensions();
    var scrollerRect = scroller.getBoundingClientRect();

    scroller.scrollTo(dimensions.scrollTop + rect.top - scrollerRect.top);
  };

  Recent.prototype.scrollToLastHiddenBelow = function scrollToLastHiddenBelow() {
    var scroller = this.refs.scroller;
    var lastUnreadBelow = this.state.lastUnreadBelow;

    var rect = lastUnreadBelow.getBoundingClientRect();
    var dimensions = scroller.getDimensions();
    var scrollerRect = scroller.getBoundingClientRect();

    scroller.scrollTo(dimensions.scrollTop + rect.top - (scrollerRect.top + scrollerRect.height - rect.height));
  };

  Recent.prototype.getGroupProps = function getGroupProps(group) {
    switch (group.key) {
      case 'groups':
        return {
          onTitleClick: this.handleCreateGroup,
          onPlusClick: this.handleGroupListTitleClick,
          renderEmptyHint: this.renderGroupHint
        };

      case 'privates':
        return {
          onTitleClick: this.handleAddContact,
          onPlusClick: this.handlePrivateListTitleClick,
          renderEmptyHint: this.renderPrivateHint
        };

      default:
        return {};
    }
  };

  Recent.prototype.renderGroupHint = function renderGroupHint() {
    return _react2.default.createElement(
      'div',
      { className: 'recent__group__hint' },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'sidebar.group.empty' }),
      _react2.default.createElement('div', { className: 'stem' })
    );
  };

  Recent.prototype.renderPrivateHint = function renderPrivateHint() {
    return _react2.default.createElement(
      'div',
      { className: 'recent__group__hint' },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'sidebar.private.empty' }),
      _react2.default.createElement(
        'button',
        { className: 'button button--outline button--wide hide' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.invite' })
      )
    );
  };

  Recent.prototype.renderRecentGroups = function renderRecentGroups() {
    var _this2 = this;

    var _props = this.props;
    var currentPeer = _props.currentPeer;
    var archive = _props.archive;

    return this.props.dialogs.map(function (group) {
      return _react2.default.createElement(_RecentGroup2.default, _extends({
        items: group.shorts,
        key: group.key,
        group: group.key,
        currentPeer: currentPeer,
        archive: archive
      }, _this2.getGroupProps(group), {
        onItemUpdate: _this2.checkInvisibleCounters
      }));
    });
  };

  Recent.prototype.renderUnreadAbove = function renderUnreadAbove() {
    if (!this.state.haveUnreadAbove) return null;

    return _react2.default.createElement(
      'div',
      { className: 'recent__unread recent__unread--above', onClick: this.scrollToFirstHiddenAbove },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'keyboard_arrow_up'
      )
    );
  };

  Recent.prototype.renderUnreadBelow = function renderUnreadBelow() {
    if (!this.state.haveUnreadBelow) return null;

    return _react2.default.createElement(
      'div',
      { className: 'recent__unread recent__unread--below', onClick: this.scrollToLastHiddenBelow },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'keyboard_arrow_down'
      )
    );
  };

  Recent.prototype.renderHistoryButton = function renderHistoryButton() {
    // actually this is hack, but it's ok while we haven't real flag
    var isArchiveEmpty = this.props.dialogs.some(function (group) {
      return !group.shorts.length;
    });
    if (isArchiveEmpty) {
      return null;
    }

    return _react2.default.createElement(_SidebarLink2.default, {
      className: 'sidebar__history',
      to: '/im/history',
      title: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'sidebar.recents.history' }),
      glyph: 'history',
      key: 'history'
    });
  };

  Recent.prototype.renderScrollableContent = function renderScrollableContent() {
    return [this.renderRecentGroups(), this.renderHistoryButton()];
  };

  Recent.prototype.render = function render() {
    return _react2.default.createElement(
      'section',
      { className: 'recent' },
      this.renderUnreadAbove(),
      _react2.default.createElement(
        _CustomScroller2.default,
        {
          className: 'recent__container',
          ref: 'scroller',
          onScroll: this.checkInvisibleCounters,
          onResize: this.checkInvisibleCounters
        },
        this.renderScrollableContent()
      ),
      this.renderUnreadBelow()
    );
  };

  return Recent;
}(_react.Component);

Recent.propTypes = {
  currentPeer: _react.PropTypes.object,
  dialogs: _react.PropTypes.array.isRequired,
  archive: _react.PropTypes.object.isRequired
};
exports.default = Recent;
//# sourceMappingURL=Recent.react.js.map