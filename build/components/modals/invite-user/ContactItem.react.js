'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _InviteUserStore = require('../../../stores/InviteUserStore');

var _InviteUserStore2 = _interopRequireDefault(_InviteUserStore);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Stateful = require('../../common/Stateful');

var _Stateful2 = _interopRequireDefault(_Stateful);

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStateFromStore = function getStateFromStore(props) {
  var contact = props.contact;

  return {
    inviteUserState: _InviteUserStore2.default.getInviteUserState(contact.uid)
  };
};

var ContactItem = (function (_Component) {
  _inherits(ContactItem, _Component);

  function ContactItem(props) {
    _classCallCheck(this, ContactItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactItem).call(this, props));

    _this.onSelect = function () {
      var _this$props = _this.props;
      var contact = _this$props.contact;
      var onSelect = _this$props.onSelect;

      _InviteUserStore2.default.addChangeListener(_this.onChange);
      onSelect(contact);
    };

    _this.onChange = function () {
      _this.setState(getStateFromStore(_this.props));

      setTimeout(function () {
        var inviteUserState = _this.state.inviteUserState;

        if (inviteUserState === _ActorAppConstants.AsyncActionStates.SUCCESS || inviteUserState === _ActorAppConstants.AsyncActionStates.FAILURE) {
          _InviteUserStore2.default.removeChangeListener(_this.onChange);
        }
      }, 0);
    };

    _this.state = getStateFromStore(props);
    return _this;
  }

  _createClass(ContactItem, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var contact = this.props.contact;

      _InviteUserStore2.default.resetInviteUserState(contact.uid);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var contact = _props.contact;
      var isMember = _props.isMember;
      var inviteUserState = this.state.inviteUserState;

      var contactClassName = (0, _classnames2.default)('contacts__list__item row', {
        'contacts__list__item--member': isMember
      });

      var controls = isMember ? _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'check'
      ) : _react2.default.createElement(
        _Stateful2.default.Root,
        { currentState: inviteUserState },
        _react2.default.createElement(
          _Stateful2.default.Pending,
          null,
          _react2.default.createElement(
            'a',
            { className: 'material-icons', onClick: this.onSelect },
            'person_add'
          )
        ),
        _react2.default.createElement(
          _Stateful2.default.Processing,
          null,
          _react2.default.createElement(
            'i',
            { className: 'material-icons spin' },
            'autorenew'
          )
        ),
        _react2.default.createElement(
          _Stateful2.default.Success,
          null,
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'check'
          )
        ),
        _react2.default.createElement(
          _Stateful2.default.Failure,
          null,
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'warning'
          )
        )
      );

      return _react2.default.createElement(
        'li',
        { className: contactClassName },
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
          controls
        )
      );
    }
  }]);

  return ContactItem;
})(_react.Component);

ContactItem.propTypes = {
  contact: _react.PropTypes.object,
  onSelect: _react.PropTypes.func,
  isMember: _react.PropTypes.bool
};

_reactMixin2.default.onClass(ContactItem, _reactAddonsPureRenderMixin2.default);

exports.default = ContactItem;
//# sourceMappingURL=ContactItem.react.js.map