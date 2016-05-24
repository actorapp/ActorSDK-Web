'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _EventListener = require('fbjs/lib/EventListener');

var _EventListener2 = _interopRequireDefault(_EventListener);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _confirm = require('../../../utils/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _ContactActionCreators = require('../../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('../../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _BlockedUsersActionCreators = require('../../../actions/BlockedUsersActionCreators');

var _BlockedUsersActionCreators2 = _interopRequireDefault(_BlockedUsersActionCreators);

var _EditGroupActionCreators = require('../../../actions/EditGroupActionCreators');

var _EditGroupActionCreators2 = _interopRequireDefault(_EditGroupActionCreators);

var _InviteUserActions = require('../../../actions/InviteUserActions');

var _InviteUserActions2 = _interopRequireDefault(_InviteUserActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MoreDropdown = function (_Component) {
  _inherits(MoreDropdown, _Component);

  function MoreDropdown(props, context) {
    _classCallCheck(this, MoreDropdown);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    console.debug(_this.props);

    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.handleChatClear = _this.handleChatClear.bind(_this);
    _this.handleChatDelete = _this.handleChatDelete.bind(_this);
    _this.handleChatLeave = _this.handleChatLeave.bind(_this);
    _this.handleRemoveFromContacts = _this.handleRemoveFromContacts.bind(_this);
    _this.handleAddToContacts = _this.handleAddToContacts.bind(_this);
    _this.handleBlockUser = _this.handleBlockUser.bind(_this);
    _this.handleUnlockUser = _this.handleUnlockUser.bind(_this);
    _this.handleEditGroup = _this.handleEditGroup.bind(_this);
    _this.handleAddPeople = _this.handleAddPeople.bind(_this);
    return _this;
  }

  MoreDropdown.prototype.componentDidMount = function componentDidMount() {
    this.setListeners();
  };

  MoreDropdown.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cleanListeners();
  };

  MoreDropdown.prototype.setListeners = function setListeners() {
    this.cleanListeners();
    this.listeners = [_EventListener2.default.listen(document, 'keydown', this.handleKeyDown), _EventListener2.default.listen(document, 'click', this.handleDocumentClick)];
  };

  MoreDropdown.prototype.cleanListeners = function cleanListeners() {
    if (this.listeners) {
      this.listeners.forEach(function (listener) {
        return listener.remove();
      });
      this.listeners = null;
    }
  };

  MoreDropdown.prototype.handleDocumentClick = function handleDocumentClick(event) {
    var onClose = this.props.onClose;

    onClose(event);
  };

  MoreDropdown.prototype.handleKeyDown = function handleKeyDown(event) {
    var onClose = this.props.onClose;


    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      event.stopPropagation();
      event.preventDefault();
      onClose(event);
    }
  };

  MoreDropdown.prototype.handleChatClear = function handleChatClear() {
    console.debug('handleChatClear');
    var _props = this.props;
    var info = _props.info;
    var peer = _props.peer;


    var message = peer.key === _ActorAppConstants.PeerTypes.USER ? _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.confirm.user.clear', values: { name: info.name } }) : _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.confirm.group.clear', values: { name: info.name } });

    (0, _confirm2.default)(message).then(function () {
      return _DialogActionCreators2.default.clearChat(peer);
    }, function () {});
  };

  MoreDropdown.prototype.handleChatDelete = function handleChatDelete() {
    console.debug('handleChatDelete');
    var _props2 = this.props;
    var info = _props2.info;
    var peer = _props2.peer;


    var message = peer.key === _ActorAppConstants.PeerTypes.USER ? _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.confirm.user.delete', values: { name: info.name } }) : _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.confirm.group.delete', values: { name: info.name } });

    (0, _confirm2.default)(message).then(function () {
      return _DialogActionCreators2.default.deleteChat(peer);
    }, function () {});
  };

  MoreDropdown.prototype.handleChatLeave = function handleChatLeave() {
    console.debug('handleChatLeave');
    var _props3 = this.props;
    var peer = _props3.peer;
    var info = _props3.info;


    (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.confirm.group.leave', values: { name: info.name } })).then(function () {
      return _DialogActionCreators2.default.leaveGroup(peer.id);
    }, function () {});
  };

  MoreDropdown.prototype.handleRemoveFromContacts = function handleRemoveFromContacts() {
    console.debug('handleRemoveFromContacts');
    var _props4 = this.props;
    var peer = _props4.peer;
    var info = _props4.info;


    (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.confirm.user.removeContact', values: { name: info.name } })).then(function () {
      return _ContactActionCreators2.default.removeContact(peer.id);
    }, function () {});
  };

  MoreDropdown.prototype.handleAddToContacts = function handleAddToContacts() {
    var peer = this.props.peer;

    _ContactActionCreators2.default.addContact(peer.id);
  };

  MoreDropdown.prototype.handleBlockUser = function handleBlockUser() {
    var _props5 = this.props;
    var peer = _props5.peer;
    var info = _props5.info;


    (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.confirm.user.block', values: { name: info.name } })).then(function () {
      return _BlockedUsersActionCreators2.default.blockUser(peer.id);
    }, function () {});
  };

  MoreDropdown.prototype.handleUnlockUser = function handleUnlockUser() {
    var peer = this.props.peer;

    _BlockedUsersActionCreators2.default.unblockUser(peer.id);
  };

  MoreDropdown.prototype.handleEditGroup = function handleEditGroup() {
    var peer = this.props.peer;

    _EditGroupActionCreators2.default.show(peer.id);
  };

  MoreDropdown.prototype.handleAddPeople = function handleAddPeople() {
    var info = this.props.info;

    _InviteUserActions2.default.show(info);
  };

  MoreDropdown.prototype.renderToggleContact = function renderToggleContact() {
    var isContact = this.props.info.isContact;


    if (isContact) {
      return _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.handleRemoveFromContacts },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'removeFromContacts' })
      );
    }

    return _react2.default.createElement(
      'li',
      { className: 'dropdown__menu__item', onClick: this.handleAddToContacts },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'addToContacts' })
    );
  };

  MoreDropdown.prototype.renderBlockUser = function renderBlockUser() {
    if (!this.context.delegate.features.blocking) {
      return null;
    }

    var isBlocked = this.props.info.isBlocked;


    if (isBlocked) {
      return _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.handleUnlockUser },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'compose.unblock' })
      );
    }

    return _react2.default.createElement(
      'li',
      { className: 'dropdown__menu__item', onClick: this.handleBlockUser },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'blockUser' })
    );
  };

  MoreDropdown.prototype.renderUserMenuItems = function renderUserMenuItems() {
    return _react2.default.createElement(
      'div',
      null,
      this.renderToggleContact(),
      this.renderBlockUser(),
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.handleChatClear },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'clearConversation' })
      ),
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.handleChatDelete },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'deleteConversation' })
      )
    );
  };

  MoreDropdown.prototype.renderGroupMenuItems = function renderGroupMenuItems() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.handleEditGroup },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'mode_edit'
        ),
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'editGroup' })
      ),
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.handleAddPeople },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'person_add'
        ),
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'addPeople' })
      ),
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.handleChatLeave },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'leaveGroup' })
      ),
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.handleChatClear },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'clearGroup' })
      ),
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.handleChatDelete },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'deleteGroup' })
      )
    );
  };

  MoreDropdown.prototype.renderPeerMenuItems = function renderPeerMenuItems() {
    var peer = this.props.peer;


    switch (peer.type) {
      case _ActorAppConstants.PeerTypes.USER:
        return this.renderUserMenuItems();
      case _ActorAppConstants.PeerTypes.GROUP:
        return this.renderGroupMenuItems();
      default:
        return null;
    }
  };

  MoreDropdown.prototype.renderMediaMenuItems = function renderMediaMenuItems() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item' },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'photo'
        ),
        'Find Photos'
      ),
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item' },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'link'
        ),
        'Find Links'
      ),
      _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item' },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'insert_drive_file'
        ),
        'Find Documents'
      )
    );
  };

  MoreDropdown.prototype.render = function render() {
    return _react2.default.createElement(
      'ul',
      { className: 'dropdown__menu dropdown__menu--right', style: { top: 42 } },
      this.renderPeerMenuItems()
    );
  };

  return MoreDropdown;
}(_react.Component);

MoreDropdown.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
MoreDropdown.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  info: _react.PropTypes.object.isRequired,
  onClose: _react.PropTypes.func.isRequired
};
exports.default = MoreDropdown;
//# sourceMappingURL=MoreDropdown.react.js.map