'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var _FavoriteActionCreators = require('../../actions/FavoriteActionCreators');

var _FavoriteActionCreators2 = _interopRequireDefault(_FavoriteActionCreators);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _UserStore = require('../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RecentItem = (function (_Component) {
  _inherits(RecentItem, _Component);

  function RecentItem(props) {
    _classCallCheck(this, RecentItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecentItem).call(this, props));

    _this.onClick = function () {
      return _DialogActionCreators2.default.selectDialogPeer(_this.props.dialog.peer.peer);
    };

    _this.handleHideChat = function (event) {
      event.stopPropagation();
      event.preventDefault();
      var dialog = _this.props.dialog;
      var intl = _this.context.intl;

      if (_UserStore2.default.isContact(dialog.peer.peer.id)) {
        _DialogActionCreators2.default.hideChat(dialog.peer.peer);
      } else {
        (0, _confirm2.default)(intl.messages['modal.confirm.nonContactHide.title'], {
          description: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.nonContactHide.body',
            values: { name: dialog.peer.title } }),
          abortLabel: intl.messages['button.cancel'],
          confirmLabel: intl.messages['button.ok']
        }).then(function () {
          return _DialogActionCreators2.default.hideChat(dialog.peer.peer);
        }, function () {});
      }
    };

    _this.handleFavorite = function (event) {
      event.preventDefault();
      event.stopPropagation();
      _FavoriteActionCreators2.default.favoriteChat(_this.props.dialog.peer.peer);
    };

    _this.handleUnfavorite = function (event) {
      event.preventDefault();
      event.stopPropagation();
      _FavoriteActionCreators2.default.unfavoriteChat(_this.props.dialog.peer.peer);
    };

    return _this;
  }

  _createClass(RecentItem, [{
    key: 'render',
    value: function render() {
      var dialog = this.props.dialog;

      var toPeer = _PeerUtils2.default.peerToString(dialog.peer.peer);

      var recentClassName = (0, _classnames2.default)('sidebar__list__item', 'row', {
        'sidebar__list__item--unread': dialog.counter > 0
      });

      return _react2.default.createElement(
        'li',
        null,
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
          ) : null
        )
      );
    }
  }]);

  return RecentItem;
})(_react.Component);

RecentItem.propTypes = {
  dialog: _react.PropTypes.object.isRequired,
  type: _react.PropTypes.string
};
RecentItem.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = RecentItem;
//# sourceMappingURL=RecentItem.react.js.map