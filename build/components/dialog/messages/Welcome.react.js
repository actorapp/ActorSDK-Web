'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _InviteUserActions = require('../../../actions/InviteUserActions');

var _InviteUserActions2 = _interopRequireDefault(_InviteUserActions);

var _UserStore = require('../../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _GroupStore = require('../../../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Welcome = (function (_Component) {
  _inherits(Welcome, _Component);

  function Welcome(props) {
    _classCallCheck(this, Welcome);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Welcome).call(this, props));
  }

  _createClass(Welcome, [{
    key: 'render',
    value: function render() {
      var peer = this.props.peer;

      var welcomeText = undefined;
      switch (peer.type) {
        case _ActorAppConstants.PeerTypes.USER:
          var user = _UserStore2.default.getUser(peer.id);
          welcomeText = _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { message: this.getIntlMessage('message.welcome.private'), name: user.name });
          break;
        case _ActorAppConstants.PeerTypes.GROUP:
          var group = _GroupStore2.default.getGroup(peer.id);
          var myID = _UserStore2.default.getMyId();
          var admin = _UserStore2.default.getUser(group.adminId);
          var creator = group.adminId === myID ? this.getIntlMessage('message.welcome.group.you') : admin.name;
          welcomeText = [_react2.default.createElement(_reactIntl.FormattedHTMLMessage, { message: this.getIntlMessage('message.welcome.group.main'),
            name: group.name,
            creator: creator }), _react2.default.createElement(
            'p',
            null,
            this.getIntlMessage('message.welcome.group.actions.start'),
            _react2.default.createElement(
              'a',
              { onClick: function onClick() {
                  return _InviteUserActions2.default.show(group);
                } },
              this.getIntlMessage('message.welcome.group.actions.invite')
            ),
            this.getIntlMessage('message.welcome.group.actions.end')
          )];
          break;
      }

      return _react2.default.createElement(
        'li',
        { className: 'message message--welcome row' },
        _react2.default.createElement(
          'div',
          { className: 'message__info' },
          _react2.default.createElement(
            'div',
            { className: 'welcome-avatar' },
            _react2.default.createElement('svg', { className: 'icon icon--gray',
              dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#star"/>' } })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'message__body col-xs' },
          welcomeText
        )
      );
    }
  }]);

  return Welcome;
})(_react.Component);

Welcome.propTypes = {
  peer: _react.PropTypes.object.isRequired
};

_reactMixin2.default.onClass(Welcome, _reactIntl.IntlMixin);

exports.default = Welcome;
//# sourceMappingURL=Welcome.react.js.map