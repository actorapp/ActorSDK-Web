'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EmojiUtils = require('../utils/EmojiUtils');

var _VisibilityActionCreators = require('../actions/VisibilityActionCreators');

var _VisibilityActionCreators2 = _interopRequireDefault(_VisibilityActionCreators);

var _Sidebar = require('./Sidebar.react');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Favicon = require('./common/Favicon.react');

var _Favicon2 = _interopRequireDefault(_Favicon);

var _ModalsWrapper = require('./modals/ModalsWrapper.react');

var _ModalsWrapper2 = _interopRequireDefault(_ModalsWrapper);

var _MenuOverlay = require('./common/MenuOverlay.react');

var _MenuOverlay2 = _interopRequireDefault(_MenuOverlay);

var _SmallCall = require('./SmallCall.react');

var _SmallCall2 = _interopRequireDefault(_SmallCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Main = function (_Component) {
  _inherits(Main, _Component);

  function Main(props) {
    _classCallCheck(this, Main);

    // Preload emoji spritesheet
    // TODO: Fix! Its not working properly.

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onVisibilityChange = function () {
      if (document.hidden) {
        _VisibilityActionCreators2.default.createAppHidden();
      } else {
        _VisibilityActionCreators2.default.createAppVisible();
      }
    };

    (0, _EmojiUtils.preloadEmojiSheet)();
    return _this;
  }

  Main.prototype.componentDidMount = function componentDidMount() {
    this.onVisibilityChange();
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  };

  Main.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  };

  Main.prototype.renderCall = function renderCall() {
    var delegate = this.context.delegate;

    if (!delegate.features.calls) {
      return null;
    }

    return _react2.default.createElement(_SmallCall2.default, null);
  };

  Main.prototype.render = function render() {
    var delegate = this.context.delegate;


    var Sidebar = typeof delegate.components.sidebar == 'function' ? delegate.components.sidebar : _Sidebar2.default;

    return _react2.default.createElement(
      'div',
      { className: 'app' },
      _react2.default.createElement(_Favicon2.default, null),
      _react2.default.createElement(Sidebar, null),
      this.props.children,
      _react2.default.createElement(_ModalsWrapper2.default, null),
      _react2.default.createElement(_MenuOverlay2.default, null),
      this.renderCall()
    );
  };

  return Main;
}(_react.Component);

Main.propTypes = {
  params: _react.PropTypes.object,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node])
};
Main.contextTypes = {
  delegate: _react.PropTypes.object
};
exports.default = Main;
//# sourceMappingURL=Main.react.js.map