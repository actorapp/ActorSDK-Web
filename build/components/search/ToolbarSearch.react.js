'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _SearchStore = require('../../stores/SearchStore');

var _SearchStore2 = _interopRequireDefault(_SearchStore);

var _SearchActionCreators = require('../../actions/SearchActionCreators');

var _SearchActionCreators2 = _interopRequireDefault(_SearchActionCreators);

var _ComposeActionCreators = require('../../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _SearchMessagesActionCreators = require('../../actions/SearchMessagesActionCreators');

var _SearchMessagesActionCreators2 = _interopRequireDefault(_SearchMessagesActionCreators);

var _SearchInput = require('./SearchInput.react');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _ContactItem = require('../common/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ToolbarSearch = function (_Component) {
  _inherits(ToolbarSearch, _Component);

  ToolbarSearch.getStores = function getStores() {
    return [_SearchStore2.default];
  };

  ToolbarSearch.calculateState = function calculateState(prevState) {
    var searchState = _SearchStore2.default.getState();

    return _extends({}, prevState, searchState, {
      isSearchExpanded: prevState ? prevState.isSearchExpanded : true,
      isSearchFocused: prevState ? prevState.isSearchFocused : false,
      isResultsDropdownOpen: prevState ? prevState.isResultsDropdownOpen : false
    });
  };

  function ToolbarSearch(props) {
    _classCallCheck(this, ToolbarSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleSearchChange = _this.handleSearchChange.bind(_this);
    _this.handlerSearchClear = _this.handlerSearchClear.bind(_this);
    _this.handleToolbarSearchClick = _this.handleToolbarSearchClick.bind(_this);
    _this.handleSearchToggleFocus = _this.handleSearchToggleFocus.bind(_this);
    _this.handleMessagesSearch = _this.handleMessagesSearch.bind(_this);
    _this.handleResultClick = _this.handleResultClick.bind(_this);
    return _this;
  }

  ToolbarSearch.prototype.handleSearchChange = function handleSearchChange(query) {
    _SearchActionCreators2.default.handleSearch(query);
  };

  ToolbarSearch.prototype.handlerSearchClear = function handlerSearchClear() {
    _SearchActionCreators2.default.clearSearch();
  };

  ToolbarSearch.prototype.handleSearchToggleFocus = function handleSearchToggleFocus(isFocused) {
    _ComposeActionCreators2.default.toggleAutoFocus(!isFocused);
    this.setState({ isSearchFocused: isFocused });

    if (isFocused) {
      this.setState({ isResultsDropdownOpen: true });
    }
  };

  ToolbarSearch.prototype.handleToolbarSearchClick = function handleToolbarSearchClick() {
    this.setState({ isSearchExpanded: true });
  };

  ToolbarSearch.prototype.handleMessagesSearch = function handleMessagesSearch() {
    var query = this.state.query;

    _SearchMessagesActionCreators2.default.open();
    _SearchMessagesActionCreators2.default.setQuery(query);
    this.handlerSearchClear();
    this.setState({ isResultsDropdownOpen: false });
  };

  ToolbarSearch.prototype.handleResultClick = function handleResultClick(peer) {
    this.setState({ isResultsDropdownOpen: false });
    this.handlerSearchClear();
    _history2.default.push('/im/' + peer.key);
  };

  ToolbarSearch.prototype.renderSearchInput = function renderSearchInput() {
    var _state = this.state;
    var query = _state.query;
    var isSearchExpanded = _state.isSearchExpanded;


    if (!isSearchExpanded) {
      return null;
    }

    return _react2.default.createElement(_SearchInput2.default, {
      className: 'toolbar__search__input col-xs',
      value: query,
      onClear: this.handlerSearchClear,
      onChange: this.handleSearchChange,
      onToggleFocus: this.handleSearchToggleFocus
    });
  };

  ToolbarSearch.prototype.renderSearchGroupResults = function renderSearchGroupResults() {
    var _this2 = this;

    var groups = this.state.results.groups;


    if (!groups.length) {
      return null;
    }

    var groupResults = groups.map(function (group, index) {
      return _react2.default.createElement(_ContactItem2.default, {
        key: 'g.' + index,
        onClick: function onClick() {
          return _this2.handleResultClick(group.peerInfo.peer);
        },
        uid: group.peerInfo.peer.id,
        name: group.peerInfo.title,
        placeholder: group.peerInfo.placeholder,
        avatar: group.peerInfo.avatar
      });
    });

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'header',
        null,
        'Groups'
      ),
      groupResults
    );
  };

  ToolbarSearch.prototype.renderSearchContactResults = function renderSearchContactResults() {
    var _this3 = this;

    var contacts = this.state.results.contacts;


    if (!contacts.length) {
      return null;
    }

    var contactsResults = contacts.map(function (contact, index) {
      return _react2.default.createElement(_ContactItem2.default, {
        key: 'c.' + index,
        onClick: function onClick() {
          return _this3.handleResultClick(contact.peerInfo.peer);
        },
        uid: contact.peerInfo.peer.id,
        name: contact.peerInfo.title,
        placeholder: contact.peerInfo.placeholder,
        avatar: contact.peerInfo.avatar
      });
    });

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'header',
        null,
        'Contacts'
      ),
      contactsResults
    );
  };

  ToolbarSearch.prototype.renderSearchResultsDropdown = function renderSearchResultsDropdown() {
    var _state2 = this.state;
    var query = _state2.query;
    var isResultsDropdownOpen = _state2.isResultsDropdownOpen;


    if (!query || !isResultsDropdownOpen) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      { className: 'toolbar__search__dropdown' },
      _react2.default.createElement(
        'div',
        { className: 'toolbar__search__results' },
        this.renderSearchContactResults(),
        this.renderSearchGroupResults()
      ),
      _react2.default.createElement(
        'footer',
        null,
        _react2.default.createElement(
          'a',
          { onClick: this.handleMessagesSearch },
          'Search messages in current dialog ',
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'arrow_forward'
          )
        )
      )
    );
  };

  ToolbarSearch.prototype.render = function render() {
    var className = this.props.className;
    var _state3 = this.state;
    var isSearchExpanded = _state3.isSearchExpanded;
    var isSearchFocused = _state3.isSearchFocused;


    var toolbarSearchClassName = (0, _classnames2.default)('toolbar__search row', className, {
      'toolbar__search--expanded': isSearchExpanded,
      'toolbar__search--focused': isSearchFocused
    });

    return _react2.default.createElement(
      'div',
      { className: toolbarSearchClassName, onClick: this.handleToolbarSearchClick },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'i',
          { className: 'search-icon material-icons' },
          'search'
        ),
        this.renderSearchInput()
      ),
      this.renderSearchResultsDropdown()
    );
  };

  return ToolbarSearch;
}(_react.Component);

ToolbarSearch.propTypes = {
  className: _react.PropTypes.string
};
exports.default = _utils.Container.create(ToolbarSearch);
//# sourceMappingURL=ToolbarSearch.react.js.map