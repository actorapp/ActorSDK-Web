'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _lodash = require('lodash');

var _EmojiUtils = require('../utils/EmojiUtils');

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _CallActionCreators = require('../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _ActivityActionCreators = require('../actions/ActivityActionCreators');

var _ActivityActionCreators2 = _interopRequireDefault(_ActivityActionCreators);

var _FavoriteActionCreators = require('../actions/FavoriteActionCreators');

var _FavoriteActionCreators2 = _interopRequireDefault(_FavoriteActionCreators);

var _SearchMessagesActionCreators = require('../actions/SearchMessagesActionCreators');

var _SearchMessagesActionCreators2 = _interopRequireDefault(_SearchMessagesActionCreators);

var _SearchMessagesStore = require('../stores/SearchMessagesStore');

var _SearchMessagesStore2 = _interopRequireDefault(_SearchMessagesStore);

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

var _AvatarItem = require('./common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _ToggleFavorite = require('./common/ToggleFavorite.react');

var _ToggleFavorite2 = _interopRequireDefault(_ToggleFavorite);

var _SearchInput = require('./search/SearchInput.react');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ToolbarSection = function (_Component) {
  _inherits(ToolbarSection, _Component);

  ToolbarSection.getStores = function getStores() {
    return [_DialogInfoStore2.default, _ActivityStore2.default, _OnlineStore2.default, _DialogStore2.default, _CallStore2.default, _SearchMessagesStore2.default];
  };

  ToolbarSection.calculateState = function calculateState() {
    var thisPeer = _DialogStore2.default.getCurrentPeer();
    return {
      thisPeer: thisPeer,
      dialogInfo: _DialogInfoStore2.default.getState(),
      isActivityOpen: _ActivityStore2.default.isOpen(),
      message: _OnlineStore2.default.getMessage(),
      isFavorite: _DialogStore2.default.isFavorite(thisPeer.id),
      search: _SearchMessagesStore2.default.getState(),
      call: ToolbarSection.calculateCallState(thisPeer)
    };
  };

  ToolbarSection.calculateCallState = function calculateCallState(thisPeer) {
    var call = _CallStore2.default.getState();
    if (!call.isOpen || !_PeerUtils2.default.equals(thisPeer, call.peer)) {
      return {
        isCalling: false
      };
    }

    return {
      isCalling: true,
      time: call.time,
      state: call.state,
      isFloating: call.isFloating
    };
  };

  function ToolbarSection(props, context) {
    _classCallCheck(this, ToolbarSection);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.onFavoriteToggle = function () {
      var _this$state = _this.state;
      var thisPeer = _this$state.thisPeer;
      var isFavorite = _this$state.isFavorite;

      if (isFavorite) {
        _FavoriteActionCreators2.default.unfavoriteChat(thisPeer);
      } else {
        _FavoriteActionCreators2.default.favoriteChat(thisPeer);
      }
    };

    _this.onClick = function () {
      if (!_this.state.isActivityOpen) {
        _ActivityActionCreators2.default.show();
      } else {
        _ActivityActionCreators2.default.hide();
      }
    };

    _this.handleInCallClick = function () {
      return _CallActionCreators2.default.toggleFloating();
    };

    _this.onSearch = (0, _lodash.debounce)(_this.onSearch.bind(_this), 300);
    _this.onSearchChange = _this.onSearchChange.bind(_this);
    _this.onSearchToggleOpen = _this.onSearchToggleOpen.bind(_this);
    _this.onSearchToggleFocus = _this.onSearchToggleFocus.bind(_this);
    return _this;
  }

  ToolbarSection.prototype.onSearch = function onSearch(query) {
    _SearchMessagesActionCreators2.default.findAllText(query);
  };

  ToolbarSection.prototype.onSearchChange = function onSearchChange(query) {
    _SearchMessagesActionCreators2.default.setQuery(query);
    this.onSearch(query);
  };

  ToolbarSection.prototype.onSearchToggleOpen = function onSearchToggleOpen(isOpen) {
    _SearchMessagesActionCreators2.default.toggleOpen(isOpen);
  };

  ToolbarSection.prototype.onSearchToggleFocus = function onSearchToggleFocus(isEnabled) {
    _SearchMessagesActionCreators2.default.toggleFocus(isEnabled);
  };

  ToolbarSection.prototype.getMessage = function getMessage() {
    var _state = this.state;
    var call = _state.call;
    var message = _state.message;

    if (call.isCalling) {
      return _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.state.' + call.state, values: { time: call.time } });
    }

    return message;
  };

  ToolbarSection.prototype.renderSearch = function renderSearch() {
    if (!this.context.delegate.features.search) {
      return;
    }

    var _state$search = this.state.search;
    var query = _state$search.query;
    var isOpen = _state$search.isOpen;
    var isFocused = _state$search.isFocused;

    return _react2.default.createElement(_SearchInput2.default, {
      className: 'toolbar__controls__search pull-left',
      value: query,
      isOpen: isOpen,
      isFocused: isFocused,
      onChange: this.onSearchChange,
      onToggleOpen: this.onSearchToggleOpen,
      onToggleFocus: this.onSearchToggleFocus
    });
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
        _rcTooltip2.default,
        {
          placement: 'left',
          mouseEnterDelay: 0.15, mouseLeaveDelay: 0,
          overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.toolbar.info' })
        },
        _react2.default.createElement(
          'button',
          { className: activityButtonClassName, onClick: this.handleInCallClick },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'info'
          )
        )
      );
    }

    return _react2.default.createElement(
      _rcTooltip2.default,
      {
        placement: 'left',
        mouseEnterDelay: 0.15, mouseLeaveDelay: 0,
        overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.toolbar.info' })
      },
      _react2.default.createElement(
        'button',
        { className: activityButtonClassName, onClick: this.onClick },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'info'
        )
      )
    );
  };

  ToolbarSection.prototype.render = function render() {
    var _state3 = this.state;
    var dialogInfo = _state3.dialogInfo;
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
            _rcTooltip2.default,
            {
              placement: 'bottom',
              mouseEnterDelay: 0.15, mouseLeaveDelay: 0,
              overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.toolbar.favorite' })
            },
            _react2.default.createElement(
              'span',
              { className: favoriteClassName },
              _react2.default.createElement(_ToggleFavorite2.default, { value: isFavorite, onToggle: this.onFavoriteToggle })
            )
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
        this.renderSearch(),
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
  delegate: _react.PropTypes.object.isRequired
};
exports.default = _utils.Container.create(ToolbarSection, { pure: false });
//# sourceMappingURL=Toolbar.react.js.map