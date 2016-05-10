'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SearchMessagesActionCreators = require('../../actions/SearchMessagesActionCreators');

var _SearchMessagesActionCreators2 = _interopRequireDefault(_SearchMessagesActionCreators);

var _SearchMessagesStore = require('../../stores/SearchMessagesStore');

var _SearchMessagesStore2 = _interopRequireDefault(_SearchMessagesStore);

var _SearchResultsReact = require('./SearchResults.react.js');

var _SearchResultsReact2 = _interopRequireDefault(_SearchResultsReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SearchSection = function (_Component) {
  _inherits(SearchSection, _Component);

  SearchSection.calculateState = function calculateState() {
    return _SearchMessagesStore2.default.getState();
  };

  function SearchSection(props) {
    _classCallCheck(this, SearchSection);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onToggleExpanded = _this.onToggleExpanded.bind(_this);
    return _this;
  }

  SearchSection.prototype.onToggleExpanded = function onToggleExpanded() {
    _SearchMessagesActionCreators2.default.toggleExpand();
  };

  SearchSection.prototype.render = function render() {
    var _state = this.state;
    var query = _state.query;
    var results = _state.results;
    var isOpen = _state.isOpen;
    var isExpanded = _state.isExpanded;
    var isSearching = _state.isSearching;

    var searchClassName = (0, _classnames2.default)('search', {
      'search--opened': isOpen,
      'search--expanded': isExpanded
    });

    return _react2.default.createElement(
      'section',
      { className: searchClassName },
      _react2.default.createElement(_SearchResultsReact2.default, {
        query: query,
        results: results,
        isExpanded: isExpanded,
        isSearching: isSearching,
        onToggleExpanded: this.onToggleExpanded
      })
    );
  };

  return SearchSection;
}(_react.Component);

SearchSection.getStores = function () {
  return [_SearchMessagesStore2.default];
};

exports.default = _utils.Container.create(SearchSection);
//# sourceMappingURL=SearchSection.react.js.map