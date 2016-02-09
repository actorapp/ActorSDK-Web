'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _confirm = require('../../utils/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _KickUserActionCreators = require('../../actions/KickUserActionCreators');

var _KickUserActionCreators2 = _interopRequireDefault(_KickUserActionCreators);

var _KickUserStore = require('../../stores/KickUserStore');

var _KickUserStore2 = _interopRequireDefault(_KickUserStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Stateful = require('../common/Stateful');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStateFromStore = function getStateFromStore(uid) {
  var kickUserState = _KickUserStore2.default.getKickUserState(uid);

  return {
    kickUserState: kickUserState
  };
};

var GroupMember = (function (_React$Component) {
  _inherits(GroupMember, _React$Component);

  function GroupMember(props) {
    _classCallCheck(this, GroupMember);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupMember).call(this, props));

    _this.onChange = function () {
      var peerInfo = _this.props.peerInfo;

      _this.setState(getStateFromStore(peerInfo.peer.id));
    };

    _this.onClick = function (id) {
      return _DialogActionCreators2.default.selectDialogPeerUser(id);
    };

    _this.onKick = function (gid, uid) {
      var peerInfo = _this.props.peerInfo;

      var confirmText = _react2.default.createElement(_reactIntl.FormattedMessage, { message: _this.getIntlMessage('modal.confirm.kick'),
        name: peerInfo.title });

      (0, _confirm2.default)(confirmText, {
        abortLabel: _this.getIntlMessage('button.cancel'),
        confirmLabel: _this.getIntlMessage('button.ok')
      }).then(function () {
        _KickUserStore2.default.addChangeListener(_this.onChange);
        _KickUserActionCreators2.default.kickMember(gid, uid);
      }, function () {});
    };

    _this.state = getStateFromStore(props.peerInfo.peer.id);
    return _this;
  }

  _createClass(GroupMember, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var peerInfo = this.props.peerInfo;

      _KickUserStore2.default.resetKickUserState(peerInfo.peer.id);
      _KickUserStore2.default.removeChangeListener(this.onChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var peerInfo = _props.peerInfo;
      var canKick = _props.canKick;
      var gid = _props.gid;
      var kickUserState = this.state.kickUserState;

      var myId = _ActorClient2.default.getUid();

      var controls = undefined;
      if (canKick && peerInfo.peer.id !== myId) {
        controls = _react2.default.createElement(
          'div',
          { className: 'controls pull-right' },
          _react2.default.createElement(
            _Stateful2.default.Root,
            { currentState: kickUserState },
            _react2.default.createElement(
              _Stateful2.default.Pending,
              null,
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return _this2.onKick(gid, peerInfo.peer.id);
                  } },
                this.getIntlMessage('kick')
              )
            ),
            _react2.default.createElement(
              _Stateful2.default.Processing,
              null,
              _react2.default.createElement(
                'i',
                { className: 'material-icons spin' },
                'autorenew'
              )
            ),
            _react2.default.createElement(
              _Stateful2.default.Success,
              null,
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'check'
              )
            ),
            _react2.default.createElement(
              _Stateful2.default.Failure,
              null,
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'warning'
              )
            )
          )
        );
      } else {
        controls = null;
      }

      return _react2.default.createElement(
        'li',
        { className: 'group_profile__members__list__item' },
        _react2.default.createElement(
          'a',
          { onClick: function onClick() {
              return _this2.onClick(peerInfo.peer.id);
            } },
          _react2.default.createElement(_AvatarItem2.default, { image: peerInfo.avatar,
            placeholder: peerInfo.placeholder,
            title: peerInfo.title })
        ),
        _react2.default.createElement('a', { onClick: function onClick() {
            return _this2.onClick(peerInfo.peer.id);
          },
          dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(peerInfo.title) } }),
        controls
      );
    }
  }]);

  return GroupMember;
})(_react2.default.Component);

GroupMember.propTypes = {
  peerInfo: _react2.default.PropTypes.object.isRequired,
  canKick: _react2.default.PropTypes.bool.isRequired,
  gid: _react2.default.PropTypes.number.isRequired
};

_reactMixin2.default.onClass(GroupMember, _reactIntl.IntlMixin);

exports.default = GroupMember;
//# sourceMappingURL=GroupMember.react.js.map