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

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _utils = require('flux/utils');

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _BlockedUsersActionCreators = require('../../actions/BlockedUsersActionCreators');

var _BlockedUsersActionCreators2 = _interopRequireDefault(_BlockedUsersActionCreators);

var _BlockedUsersStore = require('../../stores/BlockedUsersStore');

var _BlockedUsersStore2 = _interopRequireDefault(_BlockedUsersStore);

var _ContactItem = require('../common/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var BlockedUsers = function (_Component) {
  (0, _inherits3.default)(BlockedUsers, _Component);

  BlockedUsers.getStores = function getStores() {
    return [_BlockedUsersStore2.default];
  };

  BlockedUsers.calculateState = function calculateState() {
    return _BlockedUsersStore2.default.getState();
  };

  function BlockedUsers(props, context) {
    (0, _classCallCheck3.default)(this, BlockedUsers);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));

    _this.onClose = _this.onClose.bind(_this);
    _this.onQueryChange = _this.onQueryChange.bind(_this);
    _this.onUnblock = _this.onUnblock.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  }

  BlockedUsers.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextState.isOpen && !this.state.isOpen) {
      document.addEventListener('keydown', this.onKeyDown, false);
    } else if (!nextState.isOpen && this.state.isOpen) {
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  };

  BlockedUsers.prototype.onClose = function onClose() {
    _BlockedUsersActionCreators2.default.hide();
  };

  BlockedUsers.prototype.onQueryChange = function onQueryChange(event) {
    _BlockedUsersActionCreators2.default.setQuery(event.target.value);
  };

  BlockedUsers.prototype.onUnblock = function onUnblock(uid) {
    _BlockedUsersActionCreators2.default.unblockUser(uid, true);
  };

  BlockedUsers.prototype.onReload = function onReload() {
    _BlockedUsersActionCreators2.default.loadUsers();
  };

  BlockedUsers.prototype.onKeyDown = function onKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      event.preventDefault();
      this.onClose();
    }
  };

  BlockedUsers.prototype.getUsers = function getUsers() {
    var _state = this.state;
    var users = _state.users;
    var query = _state.query;


    if (!query) {
      return users;
    }

    return users.filter(function (user) {
      var score = _fuzzaldrin2.default.score(user.name, query);
      return score > 0;
    });
  };

  BlockedUsers.prototype.renderUsers = function renderUsers() {
    var _this2 = this;

    var intl = this.context.intl;
    var users = this.state.users;


    if (!users.length) {
      return _react2.default.createElement(
        'li',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        intl.messages['blockedUsersNotExists']
      );
    }

    var filtredUsers = this.getUsers();

    if (!filtredUsers.length) {
      return _react2.default.createElement(
        'li',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        intl.messages['blockedUsersNotFound']
      );
    }

    return filtredUsers.map(function (user) {
      return _react2.default.createElement(
        _ContactItem2.default,
        {
          uid: user.id,
          name: user.name,
          placeholder: user.placeholder,
          avatar: user.avatar,
          key: user.id
        },
        _react2.default.createElement(
          'button',
          { className: 'button button--lightblue', onClick: function onClick() {
              return _this2.onUnblock(user.id);
            } },
          intl.messages['blockedUsersUnblock']
        )
      );
    });
  };

  BlockedUsers.prototype.getStyles = function getStyles() {
    return {
      content: {
        position: null,
        top: null,
        left: null,
        right: null,
        bottom: null,
        border: null,
        background: null,
        overflow: null,
        outline: null,
        padding: null,
        borderRadius: null,
        width: 440
      }
    };
  };

  BlockedUsers.prototype.render = function render() {
    var _state2 = this.state;
    var isOpen = _state2.isOpen;
    var query = _state2.query;
    var intl = this.context.intl;


    if (!isOpen) {
      return null;
    }

    return _react2.default.createElement(
      _reactModal2.default,
      {
        className: 'modal-new modal-new--invite contacts',
        closeTimeoutMS: 150,
        isOpen: isOpen,
        style: this.getStyles()
      },
      _react2.default.createElement(
        'header',
        { className: 'modal-new__header' },
        _react2.default.createElement(
          'a',
          { className: 'modal-new__header__icon material-icons' },
          'block'
        ),
        _react2.default.createElement(
          'h3',
          { className: 'modal-new__header__title' },
          intl.messages['blockedUsersTitle']
        ),
        _react2.default.createElement(
          'div',
          { className: 'pull-right' },
          _react2.default.createElement(
            'button',
            { className: 'button button--lightblue', onClick: this.onClose },
            intl.messages['button.done']
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'modal-new__body' },
        _react2.default.createElement(
          'div',
          { className: 'modal-new__search' },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'search'
          ),
          _react2.default.createElement('input', {
            className: 'input input--search',
            type: 'search',
            value: query,
            placeholder: intl.messages['blockedUsersSearch'],
            onChange: this.onQueryChange
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'contacts__body' },
        _react2.default.createElement(
          'ul',
          { className: 'contacts__list' },
          this.renderUsers()
        )
      )
    );
  };

  return BlockedUsers;
}(_react.Component);

BlockedUsers.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(BlockedUsers);
//# sourceMappingURL=BlockedUsers.react.js.map