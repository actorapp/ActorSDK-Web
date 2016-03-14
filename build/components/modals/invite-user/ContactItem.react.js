'use strict';

exports.__esModule = true;

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

var _Stateful = require('../../common/Stateful.react');

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

var ContactItem = function (_Component) {
  _inherits(ContactItem, _Component);

  function ContactItem(props) {
    _classCallCheck(this, ContactItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onSelect = function () {
      var _this$props = _this.props;
      var contact = _this$props.contact;
      var onSelect = _this$props.onSelect;


      _InviteUserStore2.default.addChangeListener(_this.onChange);
      onSelect(contact);
    };

    _this.onChange = function () {
      _this.setState(getStateFromStore(_this.props));

      setImmediate(function () {
        var inviteUserState = _this.state.inviteUserState;

        if (inviteUserState === _ActorAppConstants.AsyncActionStates.SUCCESS || inviteUserState === _ActorAppConstants.AsyncActionStates.FAILURE) {
          _InviteUserStore2.default.removeChangeListener(_this.onChange);
        }
      });
    };

    _this.state = getStateFromStore(props);
    return _this;
  }

  ContactItem.prototype.componentWillUnmount = function componentWillUnmount() {
    var contact = this.props.contact;

    _InviteUserStore2.default.resetInviteUserState(contact.uid);
  };

  ContactItem.prototype.getControls = function getControls() {
    var isMember = this.props.isMember;

    if (isMember) return _react2.default.createElement(
      'i',
      { className: 'material-icons' },
      'check'
    );

    var inviteUserState = this.state.inviteUserState;

    return _react2.default.createElement(_Stateful2.default, {
      currentState: inviteUserState,
      pending: _react2.default.createElement(
        'a',
        { className: 'material-icons', onClick: this.onSelect },
        'person_add'
      ),
      processing: _react2.default.createElement(
        'i',
        { className: 'material-icons spin' },
        'autorenew'
      ),
      success: _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'check'
      ),
      failure: _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'warning'
      )
    });
  };

  ContactItem.prototype.render = function render() {
    var _props = this.props;
    var contact = _props.contact;
    var isMember = _props.isMember;


    var contactClassName = (0, _classnames2.default)('contacts__list__item row', {
      'contacts__list__item--member': isMember
    });

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
        this.getControls()
      )
    );
  };

  return ContactItem;
}(_react.Component);

ContactItem.propTypes = {
  contact: _react.PropTypes.object,
  onSelect: _react.PropTypes.func,
  isMember: _react.PropTypes.bool
};


_reactMixin2.default.onClass(ContactItem, _reactAddonsPureRenderMixin2.default);

exports.default = ContactItem;
//# sourceMappingURL=ContactItem.react.js.map