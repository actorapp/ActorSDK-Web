'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _reactRouter = require('react-router');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _DropdownActionCreators = require('../../actions/DropdownActionCreators');

var _DropdownActionCreators2 = _interopRequireDefault(_DropdownActionCreators);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Stateful = require('../common/Stateful.react');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecentItem = function (_Component) {
  (0, _inherits3.default)(RecentItem, _Component);

  function RecentItem() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RecentItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onContextMenu = function (event) {
      event.preventDefault();
      var peer = _this.props.dialog.peer.peer;

      var contextPos = {
        x: event.pageX || event.clientX,
        y: event.pageY || event.clientY
      };
      _DropdownActionCreators2.default.openRecentContextMenu(contextPos, peer);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  RecentItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.dialog !== this.props.dialog || nextProps.isActive !== this.props.isActive || nextProps.archiveState !== this.props.archiveState;
  };

  RecentItem.prototype.render = function render() {
    var _props = this.props;
    var dialog = _props.dialog;
    var archiveState = _props.archiveState;

    var toPeer = _PeerUtils2.default.peerToString(dialog.peer.peer);

    var recentClassName = (0, _classnames2.default)('sidebar__list__item', 'row', {
      'sidebar__list__item--unread': dialog.counter > 0
    });

    return _react2.default.createElement(
      'li',
      { onContextMenu: this.onContextMenu },
      _react2.default.createElement(
        _reactRouter.Link,
        { to: '/im/' + toPeer, className: recentClassName, activeClassName: 'sidebar__list__item--active' },
        _react2.default.createElement(_AvatarItem2.default, { image: dialog.peer.avatar,
          placeholder: dialog.peer.placeholder,
          size: 'tiny',
          title: dialog.peer.title }),
        _react2.default.createElement('div', { className: 'title col-xs', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(dialog.peer.title) } }),
        dialog.counter > 0 ? _react2.default.createElement(
          'span',
          { className: 'counter' },
          dialog.counter
        ) : null,
        _react2.default.createElement(_Stateful2.default, {
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
        })
      )
    );
  };

  return RecentItem;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

RecentItem.propTypes = {
  isActive: _react.PropTypes.bool.isRequired,
  dialog: _react.PropTypes.object.isRequired,
  archiveState: _react.PropTypes.number.isRequired
};
RecentItem.defaultProps = {
  archiveState: _ActorAppConstants.AsyncActionStates.PENDING
};
RecentItem.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = RecentItem;
//# sourceMappingURL=RecentItem.react.js.map