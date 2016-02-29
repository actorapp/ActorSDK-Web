'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RecentContextMenu = (function (_Component) {
  _inherits(RecentContextMenu, _Component);

  function RecentContextMenu(props) {
    _classCallCheck(this, RecentContextMenu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecentContextMenu).call(this, props));

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

    _this.handleAddToArchive = function (event) {
      var peer = _this.props.peer;

      _ArchiveActionCreators2.default.archiveChat(peer);
      _this.handleClose();
    };

    _this.handleFavorite = function (event) {
      var peer = _this.props.peer;

      _FavoriteActionCreators2.default.favoriteChat(peer);
      _this.handleClose();
    };

    _this.handleUnfavorite = function (event) {
      var peer = _this.props.peer;

      _FavoriteActionCreators2.default.unfavoriteChat(peer);
      _this.handleClose();
    };

    _this.handleDelete = function (event) {
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

  _createClass(RecentContextMenu, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var hideOnScroll = this.props.hideOnScroll;

      document.removeEventListener('click', this.handleDocumentClick, true);
      document.removeEventListener('contextmenu', this.handleClose, true);

      if (hideOnScroll) {
        document.removeEventListener('scroll', this.handleClose, true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
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
    }
  }]);

  return RecentContextMenu;
})(_react.Component);

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