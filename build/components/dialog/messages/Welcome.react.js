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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Welcome = function (_Component) {
  (0, _inherits3.default)(Welcome, _Component);

  function Welcome(props, context) {
    (0, _classCallCheck3.default)(this, Welcome);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));

    _this.onInviteClick = _this.onInviteClick.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  Welcome.prototype.onInviteClick = function onInviteClick() {
    var peer = this.props.peer;

    var group = _GroupStore2.default.getGroup(peer.id);
    _InviteUserActions2.default.show(group);
  };

  Welcome.prototype.renderUserText = function renderUserText(id) {
    var user = _UserStore2.default.getUser(id);
    return _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'message.welcome.private', values: { name: user.name } });
  };

  Welcome.prototype.renderGroupText = function renderGroupText(id) {
    var intl = this.context.intl;

    var group = _GroupStore2.default.getGroup(id);
    var myID = _UserStore2.default.getMyId();
    var admin = _UserStore2.default.getUser(group.adminId);
    var creator = group.adminId === myID ? intl.messages['message.welcome.group.you'] : admin.name;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'message.welcome.group.main', values: { name: group.name, creator: creator } }),
      _react2.default.createElement(
        'p',
        { key: 2 },
        intl.messages['message.welcome.group.actions.start'],
        _react2.default.createElement(
          'a',
          { onClick: this.onInviteClick },
          intl.messages['message.welcome.group.actions.invite']
        ),
        intl.messages['message.welcome.group.actions.end']
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
      { className: 'message message--welcome row' },
      _react2.default.createElement(
        'div',
        { className: 'message__info' },
        _react2.default.createElement(
          'div',
          { className: 'welcome-avatar' },
          _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--gray', glyph: 'star' })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'message__body col-xs' },
        this.renderText()
      )
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