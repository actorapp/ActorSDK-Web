'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RecentSectionItem = (function (_Component) {
  _inherits(RecentSectionItem, _Component);

  function RecentSectionItem(props) {
    _classCallCheck(this, RecentSectionItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecentSectionItem).call(this, props));

    _this.onClick = function () {
      return _DialogActionCreators2.default.selectDialogPeer(_this.props.dialog.peer.peer);
    };

    return _this;
  }

  _createClass(RecentSectionItem, [{
    key: 'render',
    value: function render() {
      var dialog = this.props.dialog;

      var selectedPeer = _DialogStore2.default.getCurrentPeer();

      var isActive = selectedPeer && _PeerUtils2.default.equals(dialog.peer.peer, selectedPeer);

      var recentClassName = (0, _classnames2.default)('sidebar__list__item', 'row', {
        'sidebar__list__item--active': isActive,
        'sidebar__list__item--unread': dialog.counter > 0
      });
      var counter = dialog.counter > 0 ? _react2.default.createElement(
        'span',
        { className: 'counter' },
        dialog.counter
      ) : null;

      return _react2.default.createElement(
        'li',
        { className: recentClassName, onClick: this.onClick },
        _react2.default.createElement(_AvatarItem2.default, { image: dialog.peer.avatar,
          placeholder: dialog.peer.placeholder,
          size: 'tiny',
          title: dialog.peer.title }),
        _react2.default.createElement('div', { className: 'title col-xs', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(dialog.peer.title) } }),
        counter
      );
    }
  }]);

  return RecentSectionItem;
})(_react.Component);

RecentSectionItem.propTypes = {
  dialog: _react.PropTypes.object.isRequired
};
exports.default = RecentSectionItem;
//# sourceMappingURL=RecentSectionItem.react.js.map