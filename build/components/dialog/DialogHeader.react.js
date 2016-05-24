'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _CallActionCreators = require('../../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _ActivityActionCreators = require('../../actions/ActivityActionCreators');

var _ActivityActionCreators2 = _interopRequireDefault(_ActivityActionCreators);

var _FavoriteActionCreators = require('../../actions/FavoriteActionCreators');

var _FavoriteActionCreators2 = _interopRequireDefault(_FavoriteActionCreators);

var _SearchMessagesActionCreators = require('../../actions/SearchMessagesActionCreators');

var _SearchMessagesActionCreators2 = _interopRequireDefault(_SearchMessagesActionCreators);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _ToggleFavorite = require('../common/ToggleFavorite.react');

var _ToggleFavorite2 = _interopRequireDefault(_ToggleFavorite);

var _MoreDropdown = require('./header/MoreDropdown.react');

var _MoreDropdown2 = _interopRequireDefault(_MoreDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DialogHeader = function (_Component) {
  _inherits(DialogHeader, _Component);

  function DialogHeader(props, context) {
    _classCallCheck(this, DialogHeader);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.state = {
      isMoreDropdownOpen: false
    };

    _this.onFavoriteToggle = _this.onFavoriteToggle.bind(_this);
    _this.handleInfoButtonClick = _this.handleInfoButtonClick.bind(_this);
    _this.handleMakeCallButtonClick = _this.handleMakeCallButtonClick.bind(_this);
    _this.handleEndCallButtonClick = _this.handleEndCallButtonClick.bind(_this);
    _this.handleSearchButtonClick = _this.handleSearchButtonClick.bind(_this);
    _this.toggelMoreDropdownOpen = _this.toggelMoreDropdownOpen.bind(_this);
    return _this;
  }

  DialogHeader.prototype.onFavoriteToggle = function onFavoriteToggle() {
    var _props = this.props;
    var peer = _props.peer;
    var isFavorite = _props.isFavorite;


    if (isFavorite) {
      _FavoriteActionCreators2.default.unfavoriteChat(peer);
    } else {
      _FavoriteActionCreators2.default.favoriteChat(peer);
    }
  };

  DialogHeader.prototype.handleInfoButtonClick = function handleInfoButtonClick() {
    var _props2 = this.props;
    var call = _props2.call;
    var isActivityOpen = _props2.isActivityOpen;

    if (call.isCalling) {
      _CallActionCreators2.default.toggleFloating();
    } else if (isActivityOpen) {
      _ActivityActionCreators2.default.hide();
    } else {
      _ActivityActionCreators2.default.show();
    }
  };

  DialogHeader.prototype.handleMakeCallButtonClick = function handleMakeCallButtonClick() {
    var peer = this.props.peer;

    _CallActionCreators2.default.makePeerCall(peer);
  };

  DialogHeader.prototype.handleEndCallButtonClick = function handleEndCallButtonClick() {
    var call = this.props.call;

    _CallActionCreators2.default.endCall(call.id);
  };

  DialogHeader.prototype.handleSearchButtonClick = function handleSearchButtonClick() {
    var isDialogSearchOpen = this.props.isDialogSearchOpen;

    if (!isDialogSearchOpen) {
      _SearchMessagesActionCreators2.default.open();
    } else {
      _SearchMessagesActionCreators2.default.close();
    }
  };

  DialogHeader.prototype.toggelMoreDropdownOpen = function toggelMoreDropdownOpen() {
    var isMoreDropdownOpen = this.state.isMoreDropdownOpen;

    this.setState({ isMoreDropdownOpen: !isMoreDropdownOpen });
  };

  DialogHeader.prototype.renderMessage = function renderMessage() {
    var _props3 = this.props;
    var call = _props3.call;
    var message = _props3.message;


    if (call.isCalling) {
      return _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.state.' + call.state, values: { time: call.time } });
    }

    return message;
  };

  DialogHeader.prototype.renderInfoButton = function renderInfoButton() {
    var _props4 = this.props;
    var call = _props4.call;
    var isActivityOpen = _props4.isActivityOpen;


    var className = (0, _classnames2.default)('button button--icon', {
      'active': isActivityOpen || call.isCalling && !call.isFloating
    });

    return _react2.default.createElement(
      _rcTooltip2.default,
      {
        placement: 'left',
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0,
        overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.toolbar.info' })
      },
      _react2.default.createElement(
        'button',
        { className: className, onClick: this.handleInfoButtonClick },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'info'
        )
      )
    );
  };

  DialogHeader.prototype.renderVerified = function renderVerified() {
    var info = this.props.info;


    if (!info.isVerified) {
      return null;
    }

    return _react2.default.createElement(
      'span',
      { className: 'dialog__header__peer__verified' },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'verified_user'
      )
    );
  };

  DialogHeader.prototype.renderFavorite = function renderFavorite() {
    var isFavorite = this.props.isFavorite;

    var favoriteClassName = (0, _classnames2.default)('dialog__header__peer__favorite', {
      'dialog__header__peer__favorite--active': isFavorite
    });

    return _react2.default.createElement(
      _rcTooltip2.default,
      {
        placement: 'bottom',
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0,
        overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.toolbar.favorite' })
      },
      _react2.default.createElement(
        'span',
        { className: favoriteClassName },
        _react2.default.createElement(_ToggleFavorite2.default, { value: isFavorite, onToggle: this.onFavoriteToggle })
      )
    );
  };

  DialogHeader.prototype.renderSearchButton = function renderSearchButton() {
    var delegate = this.context.delegate;
    var isDialogSearchOpen = this.props.isDialogSearchOpen;


    if (!delegate.features.search) {
      return null;
    }

    var callButtonClassName = (0, _classnames2.default)('button button--icon', {
      'active': isDialogSearchOpen
    });

    return _react2.default.createElement(
      'button',
      { className: callButtonClassName, onClick: this.handleSearchButtonClick },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'search'
      )
    );
  };

  DialogHeader.prototype.renderCallButton = function renderCallButton() {
    var delegate = this.context.delegate;


    if (!delegate.features.calls) {
      return null;
    }

    var call = this.props.call;


    if (call.isCalling) {
      return _react2.default.createElement(
        'button',
        { className: 'button button--icon', onClick: this.handleEndCallButtonClick },
        _react2.default.createElement(
          'i',
          { className: 'material-icons', style: { fontSize: 22 } },
          'call_end'
        )
      );
    }

    return _react2.default.createElement(
      'button',
      { className: 'button button--icon', onClick: this.handleMakeCallButtonClick },
      _react2.default.createElement(
        'i',
        { className: 'material-icons', style: { fontSize: 22 } },
        'call'
      )
    );
  };

  DialogHeader.prototype.renderMoreDropdown = function renderMoreDropdown() {
    var isMoreDropdownOpen = this.state.isMoreDropdownOpen;


    if (!isMoreDropdownOpen) {
      return null;
    }

    var _props5 = this.props;
    var info = _props5.info;
    var peer = _props5.peer;


    return _react2.default.createElement(_MoreDropdown2.default, {
      onClose: this.toggelMoreDropdownOpen,
      info: info,
      peer: peer
    });
  };

  DialogHeader.prototype.renderMoreButton = function renderMoreButton() {
    var isMoreDropdownOpen = this.state.isMoreDropdownOpen;


    var dropdownButtonClassNames = (0, _classnames2.default)('button button--icon', {
      'active': isMoreDropdownOpen
    });

    return _react2.default.createElement(
      'div',
      { className: 'dropdown dropdown--opened' },
      _react2.default.createElement(
        'button',
        { className: dropdownButtonClassNames, onClick: this.toggelMoreDropdownOpen },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'more_vert'
        )
      ),
      this.renderMoreDropdown()
    );
  };

  DialogHeader.prototype.render = function render() {
    var info = this.props.info;


    if (!info) {
      return _react2.default.createElement('header', { className: 'dialog__header' });
    }

    return _react2.default.createElement(
      'header',
      { className: 'dialog__header row' },
      _react2.default.createElement(_AvatarItem2.default, {
        className: 'dialog__header__avatar',
        size: 'medium',
        image: info.avatar,
        placeholder: info.placeholder,
        title: info.name
      }),
      _react2.default.createElement(
        'div',
        { className: 'dialog__header__peer' },
        _react2.default.createElement(
          'header',
          { className: 'dialog__header__peer__title' },
          _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(info.name) } }),
          this.renderVerified(),
          this.renderFavorite()
        ),
        _react2.default.createElement(
          'div',
          { className: 'dialog__header__peer__message' },
          this.renderMessage()
        )
      ),
      _react2.default.createElement('div', { className: 'col-xs' }),
      _react2.default.createElement(
        'div',
        { className: 'dialog__header__controls' },
        this.renderSearchButton(),
        this.renderCallButton(),
        this.renderInfoButton(),
        this.renderMoreButton()
      )
    );
  };

  return DialogHeader;
}(_react.Component);

DialogHeader.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
DialogHeader.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  info: _react.PropTypes.object.isRequired,
  call: _react.PropTypes.object.isRequired,
  message: _react.PropTypes.string,
  isFavorite: _react.PropTypes.bool.isRequired,
  isActivityOpen: _react.PropTypes.bool.isRequired,
  isDialogSearchOpen: _react.PropTypes.bool.isRequired
};
exports.default = DialogHeader;
//# sourceMappingURL=DialogHeader.react.js.map