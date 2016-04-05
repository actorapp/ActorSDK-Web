'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactIntl = require('react-intl');

var _SearchResultItem = require('./SearchResultItem.react');

var _SearchResultItem2 = _interopRequireDefault(_SearchResultItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var SearchResults = function (_Component) {
  (0, _inherits3.default)(SearchResults, _Component);

  function SearchResults(props) {
    (0, _classCallCheck3.default)(this, SearchResults);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  SearchResults.prototype.renderResults = function renderResults() {
    var _props = this.props;
    var query = _props.query;
    var results = _props.results;
    var isSearching = _props.isSearching;


    if (!query) {
      return _react2.default.createElement(
        'li',
        { className: 'search__results__item search__results__item--empty' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'search.emptyQuery' })
      );
    }

    if (isSearching) {
      return _react2.default.createElement(
        'li',
        { className: 'search__results__item search__results__item--not-found' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'search.searching', values: { query: query } })
      );
    }

    if (!results.length) {
      return _react2.default.createElement(
        'li',
        { className: 'search__results__item search__results__item--not-found' },
        _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'search.notFound', values: { query: query } })
      );
    }

    return results.map(function (result, index) {
      return _react2.default.createElement(_SearchResultItem2.default, (0, _extends3.default)({}, result, { key: index }));
    });
  };

  SearchResults.prototype.render = function render() {
    var _props2 = this.props;
    var isExpanded = _props2.isExpanded;
    var onToggleExpanded = _props2.onToggleExpanded;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'search__expand', onClick: onToggleExpanded },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          isExpanded ? 'chevron_right' : 'chevron_left'
        ),
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          isExpanded ? 'chevron_right' : 'chevron_left'
        )
      ),
      _react2.default.createElement(
        'header',
        { className: 'search__header' },
        _react2.default.createElement(
          'ul',
          { className: 'search__filter' },
          _react2.default.createElement(
            'li',
            { className: 'search__filter__item search__filter__item--active' },
            'Text'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'search__body' },
        _react2.default.createElement(
          'ul',
          { className: 'search__results' },
          this.renderResults()
        )
      )
    );
  };

  return SearchResults;
}(_react.Component);

SearchResults.propTypes = {
  query: _react.PropTypes.string.isRequired,
  results: _react.PropTypes.array.isRequired,
  isExpanded: _react.PropTypes.bool.isRequired,
  isSearching: _react.PropTypes.bool.isRequired,
  onToggleExpanded: _react.PropTypes.func.isRequired
};
exports.default = SearchResults;
//# sourceMappingURL=SearchResults.react.js.map