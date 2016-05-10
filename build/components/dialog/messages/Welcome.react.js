'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _SvgIcon = require('../../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _InviteUserActions = require('../../../actions/InviteUserActions');

var _InviteUserActions2 = _interopRequireDefault(_InviteUserActions);

var _UserStore = require('../../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _GroupStore = require('../../../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _AvatarItem = require('./../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Welcome = function (_Component) {
  _inherits(Welcome, _Component);

  function Welcome(props, context) {
    _classCallCheck(this, Welcome);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.onInviteClick = _this.onInviteClick.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  Welcome.prototype.onInviteClick = function onInviteClick() {
    var peer = this.props.peer;

    var group = _GroupStore2.default.getGroup(peer.id);
    _InviteUserActions2.default.show(group);
  };

  Welcome.prototype.renderWelcomeAvatar = function renderWelcomeAvatar() {
    return _react2.default.createElement(
      'div',
      { className: 'message__info' },
      _react2.default.createElement(
        'div',
        { className: 'welcome-avatar' },
        _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--gray', glyph: 'star' })
      )
    );
  };

  Welcome.prototype.renderUserText = function renderUserText(id) {
    var user = _UserStore2.default.getUser(id);

    if (user.isBot) {
      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'message__info' },
          _react2.default.createElement(_AvatarItem2.default, {
            image: user.avatar,
            className: 'message__avatar',
            placeholder: user.placeholder,
            size: 'normal',
            title: user.name
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'message__body col-xs' },
          _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'message.welcome.private', values: { name: user.name } }),
          _react2.default.createElement(
            'p',
            { style: { marginTop: 16 } },
            user.about
          )
        )
      );
    }
    return _react2.default.createElement(
      'div',
      { className: 'row' },
      this.renderWelcomeAvatar(),
      _react2.default.createElement(
        'div',
        { className: 'message__body col-xs' },
        _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'message.welcome.private', values: { name: user.name } })
      )
    );
  };

  Welcome.prototype.renderGroupText = function renderGroupText(id) {
    var intl = this.context.intl;

    var group = _GroupStore2.default.getGroup(id);
    var myID = _UserStore2.default.getMyId();
    var admin = _UserStore2.default.getUser(group.adminId);
    var creator = group.adminId === myID ? intl.messages['message.welcome.group.you'] : admin.name;

    return _react2.default.createElement(
      'div',
      { className: 'row' },
      this.renderWelcomeAvatar(),
      _react2.default.createElement(
        'div',
        { className: 'message__body col-xs' },
        _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'message.welcome.group.main', values: { name: group.name, creator: creator } }),
        _react2.default.createElement(
          'p',
          null,
          intl.messages['message.welcome.group.actions.start'],
          _react2.default.createElement(
            'a',
            { onClick: this.onInviteClick },
            intl.messages['message.welcome.group.actions.invite']
          ),
          intl.messages['message.welcome.group.actions.end']
        )
      )
    );
  };

  Welcome.prototype.renderText = function renderText() {
    var peer = this.props.peer;


    switch (peer.type) {
      case _ActorAppConstants.PeerTypes.USER:
        return this.renderUserText(peer.id);
      case _ActorAppConstants.PeerTypes.GROUP:
        return this.renderGroupText(peer.id);
    }
  };

  Welcome.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'message message--welcome' },
      this.renderText()
    );
  };

  return Welcome;
}(_react.Component);

Welcome.propTypes = {
  peer: _react.PropTypes.object.isRequired
};
Welcome.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = Welcome;
//# sourceMappingURL=Welcome.react.js.map