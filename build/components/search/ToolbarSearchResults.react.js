'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _ContactItem = require('../common/ContactItem.react');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

var _SelectListItem = require('../common/SelectListItem.react');

var _SelectListItem2 = _interopRequireDefault(_SelectListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ToolbarSearchResults = function (_Component) {
  _inherits(ToolbarSearchResults, _Component);

  function ToolbarSearchResults() {
    _classCallCheck(this, ToolbarSearchResults);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ToolbarSearchResults.prototype.renderResults = function renderResults() {
    var _props = this.props;
    var query = _props.query;
    var results = _props.results;


    if (!results.length) {
      return _react2.default.createElement(
        'div',
        { className: 'not-found' },
        _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'search.notFound', values: { query: query } })
      );
    }

    return results.map(function (item, index) {
      return _react2.default.createElement(
        _SelectListItem2.default,
        { index: index, key: item.peerInfo.peer.key },
        _react2.default.createElement(_ContactItem2.default, {
          uid: item.peerInfo.peer.id,
          name: item.peerInfo.title,
          avatar: item.peerInfo.avatar,
          placeholder: item.peerInfo.placeholder
        })
      );
    });
  };

  ToolbarSearchResults.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'toolbar__search__results' },
      this.renderResults()
    );
  };

  return ToolbarSearchResults;
}(_react.Component);

ToolbarSearchResults.propTypes = {
  query: _react.PropTypes.string.isRequired,
  results: _react.PropTypes.array.isRequired
};
exports.default = ToolbarSearchResults;
//# sourceMappingURL=ToolbarSearchResults.react.js.map