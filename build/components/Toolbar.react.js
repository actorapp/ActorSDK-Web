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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

var _EmojiUtils = require('../utils/EmojiUtils');

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _ActivityActionCreators = require('../actions/ActivityActionCreators');

var _ActivityActionCreators2 = _interopRequireDefault(_ActivityActionCreators);

var _FavoriteActionCreators = require('../actions/FavoriteActionCreators');

var _FavoriteActionCreators2 = _interopRequireDefault(_FavoriteActionCreators);

var _CallActionCreators = require('../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _AvatarItem = require('./common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _ToggleFavorite = require('./common/ToggleFavorite.react');

var _ToggleFavorite2 = _interopRequireDefault(_ToggleFavorite);

var _DialogInfoStore = require('../stores/DialogInfoStore');

var _DialogInfoStore2 = _interopRequireDefault(_DialogInfoStore);

var _OnlineStore = require('../stores/OnlineStore');

var _OnlineStore2 = _interopRequireDefault(_OnlineStore);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _CallStore = require('../stores/CallStore');

var _CallStore2 = _interopRequireDefault(_CallStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var ToolbarSection = function (_Component) {
  (0, _inherits3.default)(ToolbarSection, _Component);

  function ToolbarSection() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ToolbarSection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onFavoriteToggle = function () {
      var _this$state = _this.state;
      var thisPeer = _this$state.thisPeer;
      var isFavorite = _this$state.isFavorite;

      if (isFavorite) {
        _FavoriteActionCreators2.default.unfavoriteChat(thisPeer);
      } else {
        _FavoriteActionCreators2.default.favoriteChat(thisPeer);
      }
    }, _this.onClick = function () {
      if (!_this.state.isActivityOpen) {
        _ActivityActionCreators2.default.show();
      } else {
        _ActivityActionCreators2.default.hide();
      }
    }, _this.handleInCallClick = function () {
      return _CallActionCreators2.default.toggleFloating();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  ToolbarSection.getStores = function getStores() {
    return [_DialogInfoStore2.default, _ActivityStore2.default, _OnlineStore2.default, _DialogStore2.default, _CallStore2.default];
  };

  ToolbarSection.calculateState = function calculateState() {
    var thisPeer = _DialogStore2.default.getCurrentPeer();
    return {
      thisPeer: thisPeer,
      dialogInfo: _DialogInfoStore2.default.getInfo(),
      isActivityOpen: _ActivityStore2.default.isOpen(),
      message: _OnlineStore2.default.getMessage(),
      isFavorite: _DialogStore2.default.isFavorite(thisPeer.id),
      call: ToolbarSection.calculateCallState(thisPeer)
    };
  };

  ToolbarSection.calculateCallState = function calculateCallState(thisPeer) {
    var isCalling = _CallStore2.default.isOpen();
    if (!isCalling) {
      return { isCalling: isCalling };
    }

    var callPeer = _CallStore2.default.getPeer();
    var isSamePeer = _PeerUtils2.default.equals(thisPeer, callPeer);
    if (!isSamePeer) {
      return { isCalling: false };
    }

    return {
      isCalling: isCalling,
      state: _CallStore2.default.getState(),
      isFloating: _CallStore2.default.isFloating(),
      time: '00:00'
    };
  };

  ToolbarSection.prototype.getMessage = function getMessage() {
    var _state = this.state;
    var call = _state.call;
    var message = _state.message;

    if (call.isCalling) {
      return _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'toolbar.callState.' + call.state, values: { time: call.time } });
    }

    return message;
  };

  ToolbarSection.prototype.renderInfoButton = function renderInfoButton() {
    var _state2 = this.state;
    var call = _state2.call;
    var isActivityOpen = _state2.isActivityOpen;


    var activityButtonClassName = (0, _classnames2.default)('button button--icon', {
      'active': isActivityOpen || call.isCalling && !call.isFloating
    });

    if (call.isCalling) {
      return _react2.default.createElement(
        'button',
        { className: activityButtonClassName, onClick: this.handleInCallClick },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'info'
        )
      );
    }

    return _react2.default.createElement(
      'button',
      { className: activityButtonClassName, onClick: this.onClick },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'info'
      )
    );
  };

  ToolbarSection.prototype.render = function render() {
    var _state3 = this.state;
    var dialogInfo = _state3.dialogInfo;
    var isActivityOpen = _state3.isActivityOpen;
    var isFavorite = _state3.isFavorite;
    var call = _state3.call;


    if (!dialogInfo) {
      return _react2.default.createElement('header', { className: 'toolbar' });
    }

    var message = this.getMessage();

    var headerClassName = (0, _classnames2.default)('toolbar row', {
      toolbar__calling: call.isCalling
    });

    var favoriteClassName = (0, _classnames2.default)('toolbar__peer__favorite', {
      'toolbar__peer__favorite--active': isFavorite
    });

    return _react2.default.createElement(
      'header',
      { className: headerClassName },
      _react2.default.createElement(_AvatarItem2.default, { image: dialogInfo.avatar,
        placeholder: dialogInfo.placeholder,
        size: 'medium',
        title: dialogInfo.name }),
      _react2.default.createElement(
        'div',
        { className: 'toolbar__peer col-xs' },
        _react2.default.createElement(
          'header',
          null,
          _react2.default.createElement('span', { className: 'toolbar__peer__title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(dialogInfo.name) } }),
          _react2.default.createElement(
            'span',
            { className: favoriteClassName },
            _react2.default.createElement(_ToggleFavorite2.default, { value: isFavorite, onToggle: this.onFavoriteToggle })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'toolbar__peer__message' },
          message
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'toolbar__controls' },
        _react2.default.createElement(
          'div',
          { className: 'toolbar__controls__buttons pull-right' },
          this.renderInfoButton()
        )
      )
    );
  };

  return ToolbarSection;
}(_react.Component);

ToolbarSection.contextTypes = {
  isExperimental: _react.PropTypes.bool
};
exports.default = _utils.Container.create(ToolbarSection, { pure: false });
//# sourceMappingURL=Toolbar.react.js.map