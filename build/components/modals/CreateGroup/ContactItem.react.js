'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EmojiUtils = require('../../../utils/EmojiUtils');

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ContactItem = (function (_React$Component) {
  _inherits(ContactItem, _React$Component);

  function ContactItem(props) {
    _classCallCheck(this, ContactItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactItem).call(this, props));

    _this.onToggle = function () {
      var _this$props = _this.props;
      var contact = _this$props.contact;
      var onToggle = _this$props.onToggle;
      var isSelected = _this.state.isSelected;

      _this.setState({ isSelected: !isSelected });

      onToggle(contact, !isSelected);
    };

    _this.state = {
      isSelected: false
    };
    return _this;
  }

  _createClass(ContactItem, [{
    key: 'render',
    value: function render() {
      var contact = this.props.contact;
      var isSelected = this.state.isSelected;

      var icon = isSelected ? 'check_box' : 'check_box_outline_blank';

      return _react2.default.createElement(
        'li',
        { className: 'contacts__list__item row' },
        _react2.default.createElement(_AvatarItem2.default, { image: contact.avatar,
          placeholder: contact.placeholder,
          size: 'small',
          title: contact.name }),
        _react2.default.createElement(
          'div',
          { className: 'col-xs' },
          _react2.default.createElement('span', { className: 'title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(contact.name) } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'controls' },
          _react2.default.createElement(
            'a',
            { className: 'material-icons', onClick: this.onToggle },
            icon
          )
        )
      );
    }
  }]);

  return ContactItem;
})(_react2.default.Component);

ContactItem.propTypes = {
  contact: _react2.default.PropTypes.object,
  onToggle: _react2.default.PropTypes.func
};
exports.default = ContactItem;