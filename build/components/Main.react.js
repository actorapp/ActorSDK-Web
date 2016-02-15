'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _EmojiUtils = require('../utils/EmojiUtils');

var _DialogActionCreators = require('../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _VisibilityActionCreators = require('../actions/VisibilityActionCreators');

var _VisibilityActionCreators2 = _interopRequireDefault(_VisibilityActionCreators);

var _QuickSearchActionCreators = require('../actions/QuickSearchActionCreators');

var _QuickSearchActionCreators2 = _interopRequireDefault(_QuickSearchActionCreators);

var _UserStore = require('../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _GroupStore = require('../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _Sidebar = require('./Sidebar.react');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Dialog = require('./Dialog.react');

var _Dialog2 = _interopRequireDefault(_Dialog);

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
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

    document.addEventListener('visibilitychange', _this.onVisibilityChange);
    document.addEventListener('keydown', _this.onKeyDown, false);

    // Preload emoji spritesheet
    (0, _EmojiUtils.preloadEmojiSheet)();

    if (!document.hidden) {
      _VisibilityActionCreators2.default.createAppVisible();
    }
    return _this;
  }

  _createClass(Main, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var params = this.props.params;

      var peer = _PeerUtils2.default.stringToPeer(params.id);

      if (peer) {
        // It is needed to prevent failure on opening dialog while library didn't load dialogs (right after auth)
        var peerInfo = undefined;

        if (peer.type == _ActorAppConstants.PeerTypes.GROUP) {
          peerInfo = _GroupStore2.default.getGroup(peer.id);
        } else {
          peerInfo = _UserStore2.default.getUser(peer.id);
        }

        if (peerInfo) {
          _DialogActionCreators2.default.selectDialogPeer(peer);
        } else {
          _history2.default.replace('/');
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var params = nextProps.params;

      if (this.props.params.id !== params.id) {
        var peer = _PeerUtils2.default.stringToPeer(params.id);
        if (peer) {
          _DialogActionCreators2.default.selectDialogPeer(peer);
        } else {
          _history2.default.push('/');
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var delegate = _props.delegate;
      var params = _props.params;

      var peer = _PeerUtils2.default.stringToPeer(params.id);

      var Sidebar = typeof delegate.components.sidebar == 'function' ? delegate.components.sidebar : _Sidebar2.default;
      var Dialog = typeof delegate.components.dialog == 'function' ? delegate.components.dialog : _Dialog2.default;

      return _react2.default.createElement(
        'div',
        { className: 'app' },
        _react2.default.createElement(_Favicon2.default, null),
        _react2.default.createElement(Sidebar, null),
        _react2.default.createElement(Dialog, { peer: peer }),
        _react2.default.createElement(_ModalsWrapper2.default, null),
        _react2.default.createElement(_DropdownWrapper2.default, null),
        _react2.default.createElement(_CallModal2.default, null)
      );
    }
  }]);

  return Main;
})(_react.Component);

Main.propTypes = {
  params: _react.PropTypes.object,
  delegate: _react.PropTypes.object
};
exports.default = Main;
//# sourceMappingURL=Main.react.js.map