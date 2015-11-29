'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _GroupListActionCreators = require('../../../actions/GroupListActionCreators');

var _GroupListActionCreators2 = _interopRequireDefault(_GroupListActionCreators);

var _GroupListStore = require('../../../stores/GroupListStore');

var _GroupListStore2 = _interopRequireDefault(_GroupListStore);

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Group = (function (_Component) {
  _inherits(Group, _Component);

  function Group(props) {
    _classCallCheck(this, Group);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Group).call(this, props));

    _this.handleClick = function () {
      var _this$props = _this.props;
      var group = _this$props.group;
      var onClick = _this$props.onClick;

      onClick(group.peerInfo.peer);
    };

    return _this;
  }

  _createClass(Group, [{
    key: 'render',
    value: function render() {
      var group = this.props.group;

      return _react2.default.createElement(
        'li',
        { className: 'group__list__item row', onClick: this.handleClick },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_AvatarItem2.default, { image: group.peerInfo.avatar,
            placeholder: group.peerInfo.placeholder,
            size: 'medium',
            title: group.peerInfo.title }),
          group.isPublic ? _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'public'
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs' },
          _react2.default.createElement(
            'div',
            { className: 'meta' },
            _react2.default.createElement('span', { className: 'title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(group.peerInfo.title) } }),
            group.isJoined ? _react2.default.createElement(
              'span',
              { className: 'join-status' },
              'Joined'
            ) : null,
            group.description ? _react2.default.createElement('span', { className: 'description', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(group.description) } }) : null
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'additional' },
          _react2.default.createElement(
            'div',
            { className: 'members' },
            _react2.default.createElement('svg', { className: 'icon',
              dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#members"/>' } }),
            group.membersCount
          )
        )
      );
    }
  }]);

  return Group;
})(_react.Component);

Group.propTypes = {
  group: _react.PropTypes.object.isRequired,
  onClick: _react.PropTypes.func.isRequired
};

_reactMixin2.default.onClass(Group, _reactIntl.IntlMixin);

exports.default = Group;