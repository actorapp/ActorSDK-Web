'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _CreateGroupActionCreators = require('../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _GroupListActionCreators = require('../../actions/GroupListActionCreators');

var _GroupListActionCreators2 = _interopRequireDefault(_GroupListActionCreators);

var _AddContactActionCreators = require('../../actions/AddContactActionCreators');

var _AddContactActionCreators2 = _interopRequireDefault(_AddContactActionCreators);

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

var Recent = (function (_Component) {
  _inherits(Recent, _Component);

  function Recent(props) {
    _classCallCheck(this, Recent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Recent).call(this, props));

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

  _createClass(Recent, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
        this.checkInvisibleCounters();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dialogs = this.props.dialogs;
      var _state = this.state;
      var haveUnreadAbove = _state.haveUnreadAbove;
      var haveUnreadBelow = _state.haveUnreadBelow;
      var intl = this.context.intl;

      var recentGroups = (0, _lodash.map)(dialogs, function (dialogGroup, index) {
        var groupTitle = undefined;
        switch (dialogGroup.key) {
          case 'groups':
            groupTitle = _react2.default.createElement(
              'li',
              { className: 'sidebar__list__title' },
              _react2.default.createElement(
                'a',
                { onClick: _this2.handleGroupListClick },
                intl.messages['sidebar.recents.' + dialogGroup.key]
              ),
              _react2.default.createElement(
                'i',
                { className: 'material-icons sidebar__list__title__icon pull-right',
                  onClick: _this2.handleCreateGroup },
                'add_circle_outline'
              )
            );
            break;
          case 'privates':
            groupTitle = _react2.default.createElement(
              'li',
              { className: 'sidebar__list__title' },
              _react2.default.createElement(
                'a',
                { onClick: _this2.handlePrivateListClick },
                intl.messages['sidebar.recents.' + dialogGroup.key]
              ),
              _react2.default.createElement(
                'i',
                { className: 'material-icons sidebar__list__title__icon pull-right',
                  onClick: _this2.handleCreatePrivate },
                'add_circle_outline'
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

        var groupList = (0, _lodash.map)(dialogGroup.shorts, function (dialog, index) {
          return _react2.default.createElement(_RecentItem2.default, { dialog: dialog,
            key: index,
            type: dialogGroup.key });
        });

        return _react2.default.createElement(
          'ul',
          { className: 'sidebar__list sidebar__list--' + dialogGroup.key, key: index },
          groupTitle,
          groupList
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
            recentGroups
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
    }
  }]);

  return Recent;
})(_react.Component);

Recent.contextTypes = {
  intl: _react.PropTypes.object
};
Recent.propTypes = {
  dialogs: _react.PropTypes.array.isRequired
};
exports.default = Recent;
//# sourceMappingURL=Recent.react.js.map