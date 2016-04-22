'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _utils = require('flux/utils');

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

var _reactIntl = require('react-intl');

var _BlockedUsersActionCreators = require('../../actions/BlockedUsersActionCreators');

var _BlockedUsersActionCreators2 = _interopRequireDefault(_BlockedUsersActionCreators);

var _BlockedUsersStore = require('../../stores/BlockedUsersStore');

var _BlockedUsersStore2 = _interopRequireDefault(_BlockedUsersStore);

var _ContactItem = require('../common/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BlockedUsers = function (_Component) {
  _inherits(BlockedUsers, _Component);

  BlockedUsers.getStores = function getStores() {
    return [_BlockedUsersStore2.default];
  };

  BlockedUsers.calculateState = function calculateState() {
    return _BlockedUsersStore2.default.getState();
  };

  function BlockedUsers(props, context) {
    _classCallCheck(this, BlockedUsers);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.handleClose = _this.handleClose.bind(_this);
    _this.onQueryChange = _this.onQueryChange.bind(_this);
    _this.onUnblock = _this.onUnblock.bind(_this);
    return _this;
  }

  BlockedUsers.prototype.handleClose = function handleClose() {
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

  BlockedUsers.prototype.getUsers = function getUsers() {
    var _state = this.state;
    var users = _state.users;
    var query = _state.query;


    if (!query || query === '') return users;

    return users.filter(function (user) {
      var score = _fuzzaldrin2.default.score(user.name, query);
      return score > 0;
    });
  };

  BlockedUsers.prototype.renderUsers = function renderUsers() {
    var _this2 = this;

    var users = this.state.users;


    if (!users.length) {
      return _react2.default.createElement(
        'div',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.blockedUsers.notExists' })
      );
    }

    var filtredUsers = this.getUsers();

    if (!filtredUsers.length) {
      return _react2.default.createElement(
        'div',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.blockedUsers.notFound' })
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
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.blockedUsers.unblock' })
        )
      );
    });
  };

  BlockedUsers.prototype.renderSearch = function renderSearch() {
    var intl = this.context.intl;
    var query = this.state.query;


    return _react2.default.createElement(
      'div',
      { className: 'small-search' },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'search'
      ),
      _react2.default.createElement('input', {
        className: 'input',
        type: 'search',
        value: query,
        placeholder: intl.messages['modal.blockedUsers.search'],
        onChange: this.onQueryChange
      })
    );
  };

  BlockedUsers.prototype.render = function render() {
    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay',
        className: 'modal',
        onRequestClose: this.handleClose,
        isOpen: true },
      _react2.default.createElement(
        'div',
        { className: 'blocked-users' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(
              'a',
              { className: 'modal__header__icon material-icons' },
              'block'
            ),
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.blockedUsers.title', tagName: 'h1' }),
            _react2.default.createElement(
              'button',
              { className: 'button button--lightblue', onClick: this.handleClose },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.done' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__body' },
            this.renderSearch()
          ),
          _react2.default.createElement(
            'div',
            { className: 'contacts__list' },
            this.renderUsers()
          )
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