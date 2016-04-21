'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _reactIntl = require('react-intl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _CreateGroupActionCreators = require('../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _GroupListActionCreators = require('../../actions/GroupListActionCreators');

var _GroupListActionCreators2 = _interopRequireDefault(_GroupListActionCreators);

var _AddContactActionCreators = require('../../actions/AddContactActionCreators');

var _AddContactActionCreators2 = _interopRequireDefault(_AddContactActionCreators);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _Scrollbar = require('../common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _RecentItem = require('./RecentItem.react');

var _RecentItem2 = _interopRequireDefault(_RecentItem);

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

    _this.handleCreateGroup = function () {
      return _CreateGroupActionCreators2.default.open();
    };

    _this.handleCreatePrivate = function () {
      return _AddContactActionCreators2.default.open();
    };

    _this.handleGroupListClick = function () {
      return _GroupListActionCreators2.default.open();
    };

    _this.handlePrivateListClick = function () {
      return _ContactActionCreators2.default.open();
    };

    _this.handleRecentScroll = function () {
      return _this.checkInvisibleCounters();
    };

    _this.checkInvisibleCounters = function () {
      var unreadNodes = document.getElementsByClassName('sidebar__list__item--unread');
      var scrollNode = (0, _reactDom.findDOMNode)(_this.refs.container);
      var scrollNodeRect = scrollNode.getBoundingClientRect();

      var haveUnreadAbove = false,
          haveUnreadBelow = false,
          lastUnreadBelow = null,
          firstUnreadAbove = null;

      (0, _lodash.forEach)(unreadNodes, function (node) {
        var rect = node.getBoundingClientRect();
        if (scrollNodeRect.top + scrollNodeRect.height < rect.top) {
          haveUnreadBelow = true;
          lastUnreadBelow = node;
        }
        if (scrollNodeRect.top > rect.top + rect.height) {
          haveUnreadAbove = true;
          if (!firstUnreadAbove) {
            firstUnreadAbove = node;
          }
        }
      });

      _this.setState({ haveUnreadAbove: haveUnreadAbove, haveUnreadBelow: haveUnreadBelow, firstUnreadAbove: firstUnreadAbove, lastUnreadBelow: lastUnreadBelow });
    };

    _this.scrollToFirstHiddenAbove = function () {
      var firstUnreadAbove = _this.state.firstUnreadAbove;

      var rect = firstUnreadAbove.getBoundingClientRect();
      var scrollNode = (0, _reactDom.findDOMNode)(_this.refs.container).getElementsByClassName('ss-scrollarea')[0];
      var scrollNodeRect = scrollNode.getBoundingClientRect();

      _this.refs.container.scrollTo(scrollNode.scrollTop + rect.top - scrollNodeRect.top);
    };

    _this.scrollToLastHiddenBelow = function () {
      var lastUnreadBelow = _this.state.lastUnreadBelow;

      var rect = lastUnreadBelow.getBoundingClientRect();
      var scrollNode = (0, _reactDom.findDOMNode)(_this.refs.container).getElementsByClassName('ss-scrollarea')[0];
      var scrollNodeRect = scrollNode.getBoundingClientRect();

      _this.refs.container.scrollTo(scrollNode.scrollTop + rect.top - (scrollNodeRect.top + scrollNodeRect.height - rect.height));
    };

    _this.checkInvisibleCounters = (0, _lodash.debounce)(_this.checkInvisibleCounters, 50, {
      maxWait: 150,
      leading: true
    });

    _this.state = {
      haveUnreadAbove: false,
      haveUnreadBelow: false,
      lastUnreadBelow: null,
      firstUnreadAbove: null
    };
    return _this;
  }

  Recent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.dialogs !== this.props.dialogs) {
      this.checkInvisibleCounters();
    }
  };

  Recent.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var dialogs = _props.dialogs;
    var archive = _props.archive;
    var currentPeer = _props.currentPeer;
    var _state = this.state;
    var haveUnreadAbove = _state.haveUnreadAbove;
    var haveUnreadBelow = _state.haveUnreadBelow;
    var intl = this.context.intl;


    var recentGroups = (0, _lodash.map)(dialogs, function (dialogGroup, index) {
      var isEmpty = dialogGroup.shorts.length === 0;
      var groupTitle = void 0;

      switch (dialogGroup.key) {
        case 'groups':
          groupTitle = _react2.default.createElement(
            'li',
            { className: 'sidebar__list__title' },
            _react2.default.createElement(
              _rcTooltip2.default,
              {
                placement: 'right',
                mouseEnterDelay: 0.15, mouseLeaveDelay: 0,
                overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.recent.groupList' })
              },
              _react2.default.createElement(
                'a',
                { onClick: _this2.handleGroupListClick },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'sidebar.recents.' + dialogGroup.key })
              )
            ),
            _react2.default.createElement(
              _rcTooltip2.default,
              {
                placement: 'top',
                mouseEnterDelay: 0.15, mouseLeaveDelay: 0,
                overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.recent.createGroup' })
              },
              _react2.default.createElement(
                'i',
                { className: 'material-icons sidebar__list__title__icon pull-right',
                  onClick: _this2.handleCreateGroup },
                'add_circle_outline'
              )
            )
          );
          break;
        case 'privates':
          groupTitle = _react2.default.createElement(
            'li',
            { className: 'sidebar__list__title' },
            _react2.default.createElement(
              _rcTooltip2.default,
              {
                placement: 'right',
                mouseEnterDelay: 0.15, mouseLeaveDelay: 0,
                overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.recent.privateList' })
              },
              _react2.default.createElement(
                'a',
                { onClick: _this2.handlePrivateListClick },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'sidebar.recents.' + dialogGroup.key })
              )
            ),
            _react2.default.createElement(
              _rcTooltip2.default,
              {
                placement: 'top',
                mouseEnterDelay: 0.15, mouseLeaveDelay: 0,
                overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.recent.addContact' })
              },
              _react2.default.createElement(
                'i',
                { className: 'material-icons sidebar__list__title__icon pull-right',
                  onClick: _this2.handleCreatePrivate },
                'add_circle_outline'
              )
            )
          );
          break;
        default:
          groupTitle = _react2.default.createElement(
            'li',
            { className: 'sidebar__list__title' },
            intl.messages['sidebar.recents.' + dialogGroup.key]
          );
      }

      var groupList = (0, _lodash.map)(dialogGroup.shorts, function (dialog) {
        var peer = dialog.peer.peer;
        var peerKey = _PeerUtils2.default.peerToString(peer);

        return _react2.default.createElement(_RecentItem2.default, {
          dialog: dialog,
          archiveState: archive[peerKey],
          isActive: _PeerUtils2.default.equals(peer, currentPeer),
          key: peerKey
        });
      });

      var groupClassname = (0, _classnames2.default)('sidebar__list sidebar__list--' + dialogGroup.key, {
        'sidebar__list--empty': isEmpty
      });

      var getEmptyMessage = function getEmptyMessage() {
        switch (dialogGroup.key) {
          case 'groups':
            return _react2.default.createElement(
              'li',
              { className: 'sidebar__list__item sidebar__list__item--empty' },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'sidebar.group.empty' }),
              _react2.default.createElement('div', { className: 'stem' })
            );
          case 'privates':
            return _react2.default.createElement(
              'li',
              { className: 'sidebar__list__item sidebar__list__item--empty' },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'sidebar.private.empty' }),
              _react2.default.createElement(
                'button',
                { className: 'button button--outline button--wide hide' },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.invite' })
              )
            );
          default:
            return null;
        }
      };

      return _react2.default.createElement(
        'ul',
        { className: groupClassname, key: index },
        groupTitle,
        isEmpty ? getEmptyMessage() : groupList
      );
    });

    return _react2.default.createElement(
      'section',
      { className: 'sidebar__recent' },
      haveUnreadAbove ? _react2.default.createElement(
        'div',
        { className: 'sidebar__recent__unread sidebar__recent__unread--above', onClick: this.scrollToFirstHiddenAbove },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'keyboard_arrow_up'
        )
      ) : null,
      _react2.default.createElement(
        _Scrollbar2.default,
        { ref: 'container', onScroll: this.handleRecentScroll },
        _react2.default.createElement(
          'div',
          null,
          recentGroups,
          _react2.default.createElement(
            'footer',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/im/archive', className: 'button button--rised button--wide' },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.archive' })
            )
          )
        )
      ),
      haveUnreadBelow ? _react2.default.createElement(
        'div',
        { className: 'sidebar__recent__unread sidebar__recent__unread--below', onClick: this.scrollToLastHiddenBelow },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'keyboard_arrow_down'
        )
      ) : null
    );
  };

  return Recent;
}(_react.Component);

Recent.contextTypes = {
  intl: _react.PropTypes.object
};
Recent.propTypes = {
  currentPeer: _react.PropTypes.object,
  dialogs: _react.PropTypes.array.isRequired,
  archive: _react.PropTypes.object.isRequired
};
exports.default = Recent;
//# sourceMappingURL=Recent.react.js.map