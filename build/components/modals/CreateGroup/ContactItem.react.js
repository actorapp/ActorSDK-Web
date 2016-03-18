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

var _EmojiUtils = require('../../../utils/EmojiUtils');

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactItem = function (_Component) {
  (0, _inherits3.default)(ContactItem, _Component);

  function ContactItem(props) {
    (0, _classCallCheck3.default)(this, ContactItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

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

  ContactItem.prototype.render = function render() {
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
  };

  return ContactItem;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

ContactItem.propTypes = {
  contact: _react.PropTypes.object,
  onToggle: _react.PropTypes.func
};
exports.default = ContactItem;
//# sourceMappingURL=ContactItem.react.js.map