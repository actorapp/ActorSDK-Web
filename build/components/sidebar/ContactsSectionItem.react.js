'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _addons = require('react/addons');

var _addons2 = _interopRequireDefault(_addons);

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PureRenderMixin = _addons2.default.addons.PureRenderMixin;

var ContactsSectionItem = (function (_React$Component) {
  _inherits(ContactsSectionItem, _React$Component);

  function ContactsSectionItem(props) {
    _classCallCheck(this, ContactsSectionItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactsSectionItem).call(this, props));

    _this.openNewPrivateCoversation = function () {
      _DialogActionCreators2.default.selectDialogPeerUser(_this.props.contact.uid);
    };

    return _this;
  }

  _createClass(ContactsSectionItem, [{
    key: 'render',
    value: function render() {
      var contact = this.props.contact;

      return _react2.default.createElement(
        'li',
        { className: 'sidebar__list__item row', onClick: this.openNewPrivateCoversation },
        _react2.default.createElement(_AvatarItem2.default, { image: contact.avatar,
          placeholder: contact.placeholder,
          size: 'small',
          title: contact.name }),
        _react2.default.createElement(
          'div',
          { className: 'col-xs' },
          _react2.default.createElement(
            'span',
            { className: 'title' },
            contact.name
          )
        )
      );
    }
  }]);

  return ContactsSectionItem;
})(_react2.default.Component);

ContactsSectionItem.propTypes = {
  contact: _react2.default.PropTypes.object
};

_reactMixin2.default.onClass(ContactsSectionItem, PureRenderMixin);

exports.default = ContactsSectionItem;
//# sourceMappingURL=ContactsSectionItem.react.js.map