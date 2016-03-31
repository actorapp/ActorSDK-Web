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

var _reactDom = require('react-dom');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _isInside = require('../../../utils/isInside');

var _isInside2 = _interopRequireDefault(_isInside);

var _confirm = require('../../../utils/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _DialogStore = require('../../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _ArchiveActionCreators = require('../../../actions/ArchiveActionCreators');

var _ArchiveActionCreators2 = _interopRequireDefault(_ArchiveActionCreators);

var _FavoriteActionCreators = require('../../../actions/FavoriteActionCreators');

var _FavoriteActionCreators2 = _interopRequireDefault(_FavoriteActionCreators);

var _DropdownActionCreators = require('../../../actions/DropdownActionCreators');

var _DropdownActionCreators2 = _interopRequireDefault(_DropdownActionCreators);

var _DialogActionCreators = require('../../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecentContextMenu = function (_Component) {
  (0, _inherits3.default)(RecentContextMenu, _Component);

  function RecentContextMenu(props) {
    (0, _classCallCheck3.default)(this, RecentContextMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.handleDocumentClick = function (event) {
      var menu = (0, _reactDom.findDOMNode)(_this.refs.menu);
      var menuRect = menu.getBoundingClientRect();
      var coords = {
        x: event.pageX || event.clientX,
        y: event.pageY || event.clientY
      };

      if (!(0, _isInside2.default)(coords, menuRect)) {
        // event.preventDefault();
        _this.handleClose();
      }
    };

    _this.handleClose = function () {
      return _DropdownActionCreators2.default.hideRecentContext();
    };

    _this.handleAddToArchive = function () {
      var peer = _this.props.peer;

      _ArchiveActionCreators2.default.archiveChat(peer);
      _this.handleClose();
    };

    _this.handleFavorite = function () {
      var peer = _this.props.peer;

      _FavoriteActionCreators2.default.favoriteChat(peer);
      _this.handleClose();
    };

    _this.handleUnfavorite = function () {
      var peer = _this.props.peer;

      _FavoriteActionCreators2.default.unfavoriteChat(peer);
      _this.handleClose();
    };

    _this.handleDelete = function () {
      var intl = _this.context.intl;
      var peer = _this.props.peer;

      (0, _confirm2.default)(intl.messages['modal.confirm.delete']).then(function () {
        return _DialogActionCreators2.default.deleteChat(peer);
      }, function () {});
    };

    document.addEventListener('click', _this.handleDocumentClick, true);
    document.addEventListener('contextmenu', _this.handleClose, true);

    if (props.hideOnScroll) {
      document.addEventListener('scroll', _this.handleClose, true);
    }
    return _this;
  }

  RecentContextMenu.prototype.componentWillUnmount = function componentWillUnmount() {
    var hideOnScroll = this.props.hideOnScroll;

    document.removeEventListener('click', this.handleDocumentClick, true);
    document.removeEventListener('contextmenu', this.handleClose, true);

    if (hideOnScroll) {
      document.removeEventListener('scroll', this.handleClose, true);
    }
  };

  RecentContextMenu.prototype.render = function render() {
    var _props = this.props;
    var peer = _props.peer;
    var contextPos = _props.contextPos;

    var isFavorite = _DialogStore2.default.isFavorite(peer.id);

    var dropdownStyles = {
      top: contextPos.y,
      left: contextPos.x
    };

    var dropdownMenuStyles = {
      minWidth: 140,
      left: 2,
      top: 2
    };

    return _react2.default.createElement(
      'div',
      { className: 'dropdown dropdown--opened dropdown--small', style: dropdownStyles },
      _react2.default.createElement(
        'ul',
        { className: 'dropdown__menu dropdown__menu--left', ref: 'menu', style: dropdownMenuStyles },
        isFavorite ? _react2.default.createElement(
          'li',
          { className: 'dropdown__menu__item', onClick: this.handleUnfavorite },
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'star_border'
          ),
          ' Unfavorite'
        ) : _react2.default.createElement(
          'li',
          { className: 'dropdown__menu__item', onClick: this.handleFavorite },
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'star'
          ),
          ' Favorite'
        ),
        _react2.default.createElement(
          'li',
          { className: 'dropdown__menu__item', onClick: this.handleAddToArchive },
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'archive'
          ),
          ' Send to archive'
        ),
        _react2.default.createElement(
          'li',
          { className: 'dropdown__menu__item', onClick: this.handleDelete },
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'delete'
          ),
          ' Delete'
        )
      )
    );
  };

  return RecentContextMenu;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

RecentContextMenu.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  contextPos: _react.PropTypes.object.isRequired,
  hideOnScroll: _react.PropTypes.bool.isRequired
};
RecentContextMenu.contextTypes = {
  intl: _react.PropTypes.object
};


_reactMixin2.default.onClass(RecentContextMenu, _reactAddonsPureRenderMixin2.default);

exports.default = RecentContextMenu;
//# sourceMappingURL=RecentContextMenu.react.js.map