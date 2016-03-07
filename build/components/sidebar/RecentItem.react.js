'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _confirm = require('../../utils/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _reactRouter = require('react-router');

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _DropdownActionCreators = require('../../actions/DropdownActionCreators');

var _DropdownActionCreators2 = _interopRequireDefault(_DropdownActionCreators);

var _UserStore = require('../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _ArchiveStore = require('../../stores/ArchiveStore');

var _ArchiveStore2 = _interopRequireDefault(_ArchiveStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Stateful = require('../common/Stateful');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RecentItem = function (_Component) {
  _inherits(RecentItem, _Component);

  function RecentItem() {
    var _temp, _this, _ret;

    _classCallCheck(this, RecentItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onContextMenu = function (event) {
      event.preventDefault();
      var peer = _this.props.dialog.peer.peer;

      var contextPos = {
        x: event.pageX || event.clientX,
        y: event.pageY || event.clientY
      };
      _DropdownActionCreators2.default.openRecentContextMenu(contextPos, peer);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  RecentItem.getStores = function getStores() {
    return [_ArchiveStore2.default];
  };

  RecentItem.calculateState = function calculateState(prevState, nextProps) {
    return {
      archiveChatState: _ArchiveStore2.default.getArchiveChatState(nextProps.dialog.peer.peer.id)
    };
  };

  RecentItem.prototype.render = function render() {
    var _props = this.props;
    var dialog = _props.dialog;
    var type = _props.type;
    var archiveChatState = this.state.archiveChatState;

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
        _react2.default.createElement(
          _Stateful2.default.Root,
          { currentState: archiveChatState },
          _react2.default.createElement(
            _Stateful2.default.Processing,
            null,
            _react2.default.createElement(
              'div',
              { className: 'archive archive--in-progress' },
              _react2.default.createElement(
                'i',
                { className: 'icon material-icons spin' },
                'autorenew'
              )
            )
          ),
          _react2.default.createElement(
            _Stateful2.default.Success,
            null,
            _react2.default.createElement(
              'div',
              { className: 'archive archive--in-progress' },
              _react2.default.createElement(
                'i',
                { className: 'icon material-icons' },
                'check'
              )
            )
          ),
          _react2.default.createElement(
            _Stateful2.default.Failure,
            null,
            _react2.default.createElement(
              'div',
              { className: 'archive archive--failure' },
              _react2.default.createElement(
                'i',
                { className: 'icon material-icons' },
                'warning'
              )
            )
          )
        )
      )
    );
  };

  return RecentItem;
}(_react.Component);

RecentItem.propTypes = {
  dialog: _react.PropTypes.object.isRequired,
  type: _react.PropTypes.string
};
RecentItem.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(RecentItem, { pure: false, withProps: true });
//# sourceMappingURL=RecentItem.react.js.map