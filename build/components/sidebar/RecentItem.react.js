'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _DropdownActionCreators = require('../../actions/DropdownActionCreators');

var _DropdownActionCreators2 = _interopRequireDefault(_DropdownActionCreators);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Stateful = require('../common/Stateful.react');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RecentItem = function (_Component) {
  _inherits(RecentItem, _Component);

  function RecentItem(props) {
    _classCallCheck(this, RecentItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleOpenContextMenu = _this.handleOpenContextMenu.bind(_this);
    return _this;
  }

  RecentItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.dialog !== this.props.dialog || nextProps.isActive !== this.props.isActive || nextProps.archiveState !== this.props.archiveState;
  };

  RecentItem.prototype.handleOpenContextMenu = function handleOpenContextMenu(event) {
    event.preventDefault();
    var peer = this.props.dialog.peer.peer;

    var contextPos = {
      x: event.pageX || event.clientX,
      y: event.pageY || event.clientY
    };
    _DropdownActionCreators2.default.openRecentContextMenu(contextPos, peer);
  };

  RecentItem.prototype.handleClick = function handleClick() {
    var dialog = this.props.dialog;

    _history2.default.push('/im/' + dialog.peer.peer.key);
  };

  RecentItem.prototype.renderCounter = function renderCounter() {
    var dialog = this.props.dialog;

    if (dialog.counter === 0) {
      return null;
    }

    return _react2.default.createElement(
      'span',
      { className: 'recent__item__counter' },
      dialog.counter
    );
  };

  RecentItem.prototype.renderArchiveState = function renderArchiveState() {
    var archiveState = this.props.archiveState;

    if (archiveState === _ActorAppConstants.AsyncActionStates.PENDING) {
      return null;
    }

    return _react2.default.createElement(_Stateful2.default, {
      currentState: archiveState,
      processing: _react2.default.createElement(
        'div',
        { className: 'archive archive--in-progress' },
        _react2.default.createElement(
          'i',
          { className: 'icon material-icons spin' },
          'autorenew'
        )
      ),
      success: _react2.default.createElement(
        'div',
        { className: 'archive archive--in-progress' },
        _react2.default.createElement(
          'i',
          { className: 'icon material-icons' },
          'check'
        )
      ),
      failure: _react2.default.createElement(
        'div',
        { className: 'archive archive--failure' },
        _react2.default.createElement(
          'i',
          { className: 'icon material-icons' },
          'warning'
        )
      )
    });
  };

  RecentItem.prototype.render = function render() {
    var _props = this.props;
    var dialog = _props.dialog;
    var isActive = _props.isActive;

    var title = (0, _EmojiUtils.escapeWithEmoji)(dialog.peer.title);

    var recentItemClassName = (0, _classnames2.default)('recent__item', {
      'recent__item--active': isActive,
      'recent__item--unread': dialog.counter !== 0
    });

    return _react2.default.createElement(
      'div',
      { onContextMenu: this.handleOpenContextMenu, onClick: this.handleClick, className: recentItemClassName },
      _react2.default.createElement(
        'div',
        { className: 'recent__item__avatar' },
        _react2.default.createElement(_AvatarItem2.default, {
          size: 'tiny',
          image: dialog.peer.avatar,
          placeholder: dialog.peer.placeholder,
          title: dialog.peer.title
        })
      ),
      _react2.default.createElement('div', { className: 'recent__item__title col-xs', dangerouslySetInnerHTML: { __html: title } }),
      this.renderCounter(),
      this.renderArchiveState()
    );
  };

  return RecentItem;
}(_react.Component);

RecentItem.propTypes = {
  isActive: _react.PropTypes.bool.isRequired,
  dialog: _react.PropTypes.object.isRequired,
  archiveState: _react.PropTypes.number.isRequired
};
RecentItem.defaultProps = {
  isActive: false,
  archiveState: _ActorAppConstants.AsyncActionStates.PENDING
};
exports.default = RecentItem;
//# sourceMappingURL=RecentItem.react.js.map