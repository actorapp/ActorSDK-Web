'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PeopleItem = function (_Component) {
  _inherits(PeopleItem, _Component);

  function PeopleItem(props) {
    _classCallCheck(this, PeopleItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = function () {
      var _this$props = _this.props;
      var contact = _this$props.contact;
      var onClick = _this$props.onClick;

      onClick(contact);
    };

    _this.handleMouseOver = function () {
      var onMouseOver = _this.props.onMouseOver;

      onMouseOver();
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  PeopleItem.prototype.render = function render() {
    var _props = this.props;
    var contact = _props.contact;
    var isSelected = _props.isSelected;

    var resultClassName = (0, _classnames2.default)('contacts__list__item row', {
      'contacts__list__item--active': isSelected
    });

    return _react2.default.createElement(
      'li',
      { className: resultClassName,
        onClick: this.handleClick,
        onMouseOver: this.handleMouseOver },
      _react2.default.createElement(_AvatarItem2.default, { image: contact.avatar,
        placeholder: contact.placeholder,
        size: 'medium',
        title: contact.name }),
      _react2.default.createElement(
        'div',
        { className: 'col-xs' },
        _react2.default.createElement('span', { className: 'title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(contact.name) } })
      )
    );
  };

  return PeopleItem;
}(_react.Component);

PeopleItem.propTypes = {
  contact: _react.PropTypes.object.isRequired,
  isSelected: _react.PropTypes.bool.isRequired,
  onClick: _react.PropTypes.func.isRequired,
  onMouseOver: _react.PropTypes.func.isRequired
};
exports.default = PeopleItem;
//# sourceMappingURL=PeopleItem.react.js.map