'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _requireAuth = require('../utils/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _RouterContainer = require('../utils/RouterContainer');

var _RouterContainer2 = _interopRequireDefault(_RouterContainer);

var _EmojiUtils = require('../utils/EmojiUtils');

var _DialogActionCreators = require('../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _VisibilityActionCreators = require('../actions/VisibilityActionCreators');

var _VisibilityActionCreators2 = _interopRequireDefault(_VisibilityActionCreators);

var _QuickSearchActionCreators = require('../actions/QuickSearchActionCreators');

var _QuickSearchActionCreators2 = _interopRequireDefault(_QuickSearchActionCreators);

var _SidebarSection = require('./SidebarSection.react');

var _SidebarSection2 = _interopRequireDefault(_SidebarSection);

var _DialogSection = require('./DialogSection.react');

var _DialogSection2 = _interopRequireDefault(_DialogSection);

var _Favicon = require('./common/Favicon.react');

var _Favicon2 = _interopRequireDefault(_Favicon);

var _ModalsWrapper = require('./modals/ModalsWrapper.react');

var _ModalsWrapper2 = _interopRequireDefault(_ModalsWrapper);

var _CallModal = require('./modals/CallModal.react');

var _CallModal2 = _interopRequireDefault(_CallModal);

var _DropdownWrapper = require('./common/DropdownWrapper.react');

var _DropdownWrapper2 = _interopRequireDefault(_DropdownWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Main = (function (_Component) {
  _inherits(Main, _Component);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Main).call(this, props));

    _this.onVisibilityChange = function () {
      if (!document.hidden) {
        _VisibilityActionCreators2.default.createAppVisible();
      } else {
        _VisibilityActionCreators2.default.createAppHidden();
      }
    };

    _this.onKeyDown = function (event) {
      // TODO: Make this hotkey work on windows
      if (event.keyCode === _ActorAppConstants.KeyCodes.K && event.metaKey) {
        event.stopPropagation();
        event.preventDefault();
        _QuickSearchActionCreators2.default.show();
      }
    };

    var params = props.params;

    var peer = _PeerUtils2.default.stringToPeer(params.id);

    document.addEventListener('visibilitychange', _this.onVisibilityChange);
    document.addEventListener('keydown', _this.onKeyDown, false);

    // Preload emoji spritesheet
    (0, _EmojiUtils.preloadEmojiSheet)();

    if (!document.hidden) {
      _VisibilityActionCreators2.default.createAppVisible();
    }

    if (peer) {
      // It is needed to prevent failure on opening dialog while library didn't load dialogs (right after auth)
      var peerInfo = undefined;

      if (peer.type == _ActorAppConstants.PeerTypes.GROUP) {
        peerInfo = _ActorClient2.default.getGroup(peer.id);
      } else {
        peerInfo = _ActorClient2.default.getUser(peer.id);
      }

      if (peerInfo) {
        _DialogActionCreators2.default.selectDialogPeer(peer);
      } else {
        _RouterContainer2.default.get().transitionTo('/');
      }
    }
    return _this;
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      var params = this.props.params;
      var delegate = this.context.delegate;

      var peer = _PeerUtils2.default.stringToPeer(params.id);

      var SidebarSection = typeof delegate.components.sidebar == 'function' ? delegate.components.sidebar : _SidebarSection2.default;
      var DialogSection = typeof delegate.components.dialog == 'function' ? delegate.components.dialog : _DialogSection2.default;

      return _react2.default.createElement(
        'div',
        { className: 'app' },
        _react2.default.createElement(_Favicon2.default, null),
        _react2.default.createElement(SidebarSection, { selectedPeer: peer }),
        _react2.default.createElement(DialogSection, { peer: peer }),
        _react2.default.createElement(_ModalsWrapper2.default, null),
        _react2.default.createElement(_DropdownWrapper2.default, null),
        _react2.default.createElement(_CallModal2.default, null)
      );
    }
  }]);

  return Main;
})(_react.Component);

Main.contextTypes = {
  router: _react.PropTypes.func,
  delegate: _react.PropTypes.object
};
Main.propTypes = {
  params: _react.PropTypes.object
};
exports.default = (0, _requireAuth2.default)(Main);
//# sourceMappingURL=Main.react.js.map