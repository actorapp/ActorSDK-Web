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

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _confirm = require('../../utils/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _KickUserActionCreators = require('../../actions/KickUserActionCreators');

var _KickUserActionCreators2 = _interopRequireDefault(_KickUserActionCreators);

var _KickUserStore = require('../../stores/KickUserStore');

var _KickUserStore2 = _interopRequireDefault(_KickUserStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Stateful = require('../common/Stateful.react');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupMember = function (_Component) {
  (0, _inherits3.default)(GroupMember, _Component);

  function GroupMember(props) {
    (0, _classCallCheck3.default)(this, GroupMember);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onClick = function (id) {
      return _DialogActionCreators2.default.selectDialogPeerUser(id);
    };

    _this.onKick = function (gid, uid) {
      var peerInfo = _this.props.peerInfo;


      (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.kick', values: { name: peerInfo.title } })).then(function () {
        return _KickUserActionCreators2.default.kickMember(gid, uid);
      }, function () {});
    };

    return _this;
  }

  GroupMember.getStores = function getStores() {
    return [_KickUserStore2.default];
  };

  GroupMember.calculateState = function calculateState(prevState, nextProps) {
    return {
      kickUserState: _KickUserStore2.default.getKickUserState(nextProps.peerInfo.peer.id)
    };
  };

  GroupMember.prototype.componentWillUnmount = function componentWillUnmount() {
    var peerInfo = this.props.peerInfo;

    _KickUserStore2.default.resetKickUserState(peerInfo.peer.id);
  };

  GroupMember.prototype.renderControls = function renderControls() {
    var _this2 = this;

    var _props = this.props;
    var peerInfo = _props.peerInfo;
    var canKick = _props.canKick;
    var gid = _props.gid;
    var kickUserState = this.state.kickUserState;

    var myId = _ActorClient2.default.getUid();

    if (!canKick || peerInfo.peer.id === myId) return _react2.default.createElement('div', null);

    return _react2.default.createElement(_Stateful2.default, {
      currentState: kickUserState,
      pending: _react2.default.createElement(
        'a',
        { onClick: function onClick() {
            return _this2.onKick(gid, peerInfo.peer.id);
          } },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'kick' })
      ),
      processing: _react2.default.createElement(
        'i',
        { className: 'material-icons spin' },
        'autorenew'
      ),
      success: _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'check'
      ),
      failure: _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'warning'
      )
    });
  };

  GroupMember.prototype.render = function render() {
    var _this3 = this;

    var peerInfo = this.props.peerInfo;


    return _react2.default.createElement(
      'li',
      { className: 'group_profile__members__list__item' },
      _react2.default.createElement(
        'a',
        { onClick: function onClick() {
            return _this3.onClick(peerInfo.peer.id);
          } },
        _react2.default.createElement(_AvatarItem2.default, { image: peerInfo.avatar,
          placeholder: peerInfo.placeholder,
          title: peerInfo.title })
      ),
      _react2.default.createElement('a', { onClick: function onClick() {
          return _this3.onClick(peerInfo.peer.id);
        },
        dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(peerInfo.title) } }),
      _react2.default.createElement(
        'div',
        { className: 'controls pull-right' },
        this.renderControls()
      )
    );
  };

  return GroupMember;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

GroupMember.propTypes = {
  peerInfo: _react.PropTypes.object.isRequired,
  canKick: _react.PropTypes.bool.isRequired,
  gid: _react.PropTypes.number.isRequired
};
exports.default = _utils.Container.create(GroupMember, { pure: false, withProps: true });
//# sourceMappingURL=GroupMember.react.js.map