'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _EmojiUtils = require('../utils/EmojiUtils');

var _ActivityActionCreators = require('../actions/ActivityActionCreators');

var _ActivityActionCreators2 = _interopRequireDefault(_ActivityActionCreators);

var _FavoriteActionCreators = require('../actions/FavoriteActionCreators');

var _FavoriteActionCreators2 = _interopRequireDefault(_FavoriteActionCreators);

var _AvatarItem = require('../components/common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _DialogInfoStore = require('../stores/DialogInfoStore');

var _DialogInfoStore2 = _interopRequireDefault(_DialogInfoStore);

var _OnlineStore = require('../stores/OnlineStore');

var _OnlineStore2 = _interopRequireDefault(_OnlineStore);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ToolbarSection = (function (_Component) {
  _inherits(ToolbarSection, _Component);

  function ToolbarSection(props) {
    _classCallCheck(this, ToolbarSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToolbarSection).call(this, props));

    _this.handleFavorite = function (event) {
      var thisPeer = _this.state.thisPeer;

      _FavoriteActionCreators2.default.favoriteChat(thisPeer);
    };

    _this.handleUnfavorite = function (event) {
      var thisPeer = _this.state.thisPeer;

      _FavoriteActionCreators2.default.unfavoriteChat(thisPeer);
    };

    _this.onClick = function () {
      if (!_this.state.isActivityOpen) {
        _ActivityActionCreators2.default.show();
      } else {
        _ActivityActionCreators2.default.hide();
      }
    };

    return _this;
  }

  _createClass(ToolbarSection, [{
    key: 'render',
    value: function render() {
      var _state = this.state;
      var dialogInfo = _state.dialogInfo;
      var isActivityOpen = _state.isActivityOpen;
      var message = _state.message;
      var isFavorite = _state.isFavorite;

      var infoButtonClassName = (0, _classnames2.default)('button button--icon', {
        'active': isActivityOpen
      });

      var favoriteClassName = (0, _classnames2.default)('toolbar__peer__favorite', {
        'toolbar__peer__favorite--active': isFavorite
      });

      if (dialogInfo !== null) {
        return _react2.default.createElement(
          'header',
          { className: 'toolbar row' },
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
                isFavorite ? _react2.default.createElement(
                  'i',
                  { className: 'material-icons', onClick: this.handleUnfavorite },
                  'star'
                ) : _react2.default.createElement(
                  'i',
                  { className: 'material-icons', onClick: this.handleFavorite },
                  'star_border'
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
            _react2.default.createElement(
              'div',
              { className: 'toolbar__controls__buttons pull-right' },
              _react2.default.createElement(
                'button',
                { className: infoButtonClassName, onClick: this.onClick },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'info'
                )
              ),
              _react2.default.createElement(
                'button',
                { className: 'button button--icon hide' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'more_vert'
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement('header', { className: 'toolbar' });
      }
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      var thisPeer = _DialogStore2.default.getCurrentPeer();

      return {
        thisPeer: thisPeer,
        dialogInfo: _DialogInfoStore2.default.getInfo(),
        isActivityOpen: _ActivityStore2.default.isOpen(),
        message: _OnlineStore2.default.getMessage(),
        isFavorite: _DialogStore2.default.isFavorite(thisPeer.id)
      };
    }
  }]);

  return ToolbarSection;
})(_react.Component);

ToolbarSection.getStores = function () {
  return [_DialogInfoStore2.default, _ActivityStore2.default, _OnlineStore2.default, _DialogStore2.default];
};

ToolbarSection.contextTypes = {
  isExperimental: _react.PropTypes.bool
};
exports.default = _utils.Container.create(ToolbarSection, { pure: false });
//# sourceMappingURL=Toolbar.react.js.map