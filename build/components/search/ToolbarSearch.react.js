'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

var _SearchStore = require('../../stores/SearchStore');

var _SearchStore2 = _interopRequireDefault(_SearchStore);

var _SearchActionCreators = require('../../actions/SearchActionCreators');

var _SearchActionCreators2 = _interopRequireDefault(_SearchActionCreators);

var _SearchInput = require('./SearchInput.react');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _SelectList = require('../common/SelectList.react');

var _SelectList2 = _interopRequireDefault(_SelectList);

var _SelectListItem = require('../common/SelectListItem.react');

var _SelectListItem2 = _interopRequireDefault(_SelectListItem);

var _SearchResultGroup = require('./SearchResultGroup.react');

var _SearchResultGroup2 = _interopRequireDefault(_SearchResultGroup);

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

  ToolbarSearch.calculateState = function calculateState() {
    return _SearchStore2.default.getState();
  };

  function ToolbarSearch(props) {
    _classCallCheck(this, ToolbarSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleSearchChange = _this.handleSearchChange.bind(_this);
    _this.handlerSearchClear = _this.handlerSearchClear.bind(_this);
    _this.handleSearchFocus = _this.handleSearchFocus.bind(_this);
    _this.handleSearchBlur = _this.handleSearchBlur.bind(_this);
    _this.onResultSelect = _this.onResultSelect.bind(_this);
    return _this;
  }

  ToolbarSearch.prototype.handlerSearchClear = function handlerSearchClear() {
    _SearchActionCreators2.default.clear();
  };

  ToolbarSearch.prototype.handleSearchFocus = function handleSearchFocus() {
    _SearchActionCreators2.default.focus();
  };

  ToolbarSearch.prototype.handleSearchBlur = function handleSearchBlur(event) {
    console.debug(event);
    // tricky workaround for click on search result
    setTimeout(function () {
      return _SearchActionCreators2.default.blur();
    }, 50);
  };

  ToolbarSearch.prototype.handleSearchChange = function handleSearchChange(query) {
    _SearchActionCreators2.default.handleSearch(query);
  };

  ToolbarSearch.prototype.onResultSelect = function onResultSelect(index) {
    var _state$results = this.state.results;
    var contacts = _state$results.contacts;
    var groups = _state$results.groups;

    if (index === contacts.length + groups.length) {
      _SearchActionCreators2.default.goToMessagesSearch(this.state.query);
    } else {
      var contact = [].concat(contacts, groups)[index];
      _SearchActionCreators2.default.goToContact(contact);
    }
  };

  ToolbarSearch.prototype.renderSearchResultsDropdown = function renderSearchResultsDropdown() {
    var _state = this.state;
    var isFocused = _state.isFocused;
    var query = _state.query;
    var _state$results2 = _state.results;
    var contacts = _state$results2.contacts;
    var groups = _state$results2.groups;


    if (!isFocused) {
      return null;
    }

    if (!query.length) {
      return _react2.default.createElement(
        'div',
        { className: 'toolbar__search__dropdown' },
        _react2.default.createElement(
          'div',
          { className: 'hint' },
          _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'search.hint' })
        )
      );
    }

    var max = contacts.length + groups.length;

    return _react2.default.createElement(
      _SelectList2.default,
      { className: 'toolbar__search__dropdown', max: max, onSelect: this.onResultSelect },
      _react2.default.createElement(
        'div',
        { className: 'toolbar__search__results' },
        _react2.default.createElement(_SearchResultGroup2.default, { id: 'contacts', offset: 0, items: contacts }),
        _react2.default.createElement(_SearchResultGroup2.default, { id: 'groups', offset: contacts.length, items: groups })
      ),
      _react2.default.createElement(
        _SelectListItem2.default,
        { index: max },
        _react2.default.createElement(
          'footer',
          { className: 'toolbar__search__footer' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'search.inChat' }),
          ' ',
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
    var _state2 = this.state;
    var query = _state2.query;
    var isFocused = _state2.isFocused;

    var toolbarSearchClassName = (0, _classnames2.default)('toolbar__search row', {
      'toolbar__search--focused': isFocused
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
        _react2.default.createElement(_SearchInput2.default, {
          value: query,
          onFocus: this.handleSearchFocus,
          onBlur: this.handleSearchBlur,
          onClear: this.handlerSearchClear,
          onChange: this.handleSearchChange
        })
      ),
      this.renderSearchResultsDropdown()
    );
  };

  return ToolbarSearch;
}(_react.Component);

exports.default = _utils.Container.create(ToolbarSearch);
//# sourceMappingURL=ToolbarSearch.react.js.map