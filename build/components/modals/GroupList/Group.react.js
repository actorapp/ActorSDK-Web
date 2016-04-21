'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SvgIcon = require('../../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Group = function (_Component) {
  _inherits(Group, _Component);

  function Group(props) {
    _classCallCheck(this, Group);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = function () {
      var _this$props = _this.props;
      var group = _this$props.group;
      var onClick = _this$props.onClick;

      onClick(group.peerInfo.peer);
    };

    _this.handleMouseOver = function () {
      var onMouseOver = _this.props.onMouseOver;

      onMouseOver();
    };

    return _this;
  }

  Group.prototype.render = function render() {
    var _props = this.props;
    var group = _props.group;
    var isSelected = _props.isSelected;

    var resultClassName = (0, _classnames2.default)('group__list__item row', {
      'group__list__item--active': isSelected
    });

    return _react2.default.createElement(
      'div',
      { className: resultClassName,
        onClick: this.handleClick,
        onMouseOver: this.handleMouseOver },
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
          _react2.default.createElement(_SvgIcon2.default, { glyph: 'members', className: 'icon' }),
          group.membersCount
        )
      )
    );
  };

  return Group;
}(_react.Component);

Group.propTypes = {
  group: _react.PropTypes.object.isRequired,
  isSelected: _react.PropTypes.bool.isRequired,
  onClick: _react.PropTypes.func.isRequired,
  onMouseOver: _react.PropTypes.func.isRequired
};
exports.default = Group;
//# sourceMappingURL=Group.react.js.map