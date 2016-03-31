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

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AvatarItem = require('./AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _EmojiUtils = require('../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactItem = function (_Component) {
  (0, _inherits3.default)(ContactItem, _Component);

  function ContactItem(props) {
    (0, _classCallCheck3.default)(this, ContactItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  ContactItem.prototype.render = function render() {
    var _props = this.props;
    var uid = _props.uid;
    var name = _props.name;
    var placeholder = _props.placeholder;
    var avatar = _props.avatar;
    var children = _props.children;


    return _react2.default.createElement(
      'div',
      { className: 'contact row middle-xs' },
      _react2.default.createElement(
        'div',
        { className: 'contact__avatar' },
        _react2.default.createElement(_AvatarItem2.default, {
          image: avatar,
          placeholder: placeholder,
          size: 'small',
          title: name
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'contact__body col-xs' },
        _react2.default.createElement('span', { className: 'title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(name) } })
      ),
      _react2.default.createElement(
        'div',
        { className: 'contact__controls' },
        children
      )
    );
  };

  return ContactItem;
}(_react.Component); /*
                      * Copyright (C) 2016 Actor LLC. <https://actor.im>
                      */

ContactItem.propTypes = {
  uid: _react.PropTypes.number.isRequired,
  name: _react.PropTypes.string.isRequired,
  placeholder: _react.PropTypes.string.isRequired,
  avatar: _react.PropTypes.string,

  children: _react.PropTypes.node
};
exports.default = ContactItem;
//# sourceMappingURL=ContactItem.react.js.map