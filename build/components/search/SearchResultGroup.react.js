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

var SearchResultGroup = function (_Component) {
  _inherits(SearchResultGroup, _Component);

  function SearchResultGroup() {
    _classCallCheck(this, SearchResultGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  SearchResultGroup.prototype.renderResults = function renderResults() {
    var _props = this.props;
    var id = _props.id;
    var items = _props.items;
    var offset = _props.offset;


    if (!items.length) {
      return _react2.default.createElement(
        'div',
        { className: 'not-found' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'toolbar.search.' + id + '.notFound' })
      );
    }

    return items.map(function (item, index) {
      return _react2.default.createElement(
        _SelectListItem2.default,
        { index: index + offset, key: item.peerInfo.peer.key },
        _react2.default.createElement(_ContactItem2.default, {
          uid: item.peerInfo.peer.id,
          name: item.peerInfo.title,
          avatar: item.peerInfo.avatar,
          placeholder: item.peerInfo.placeholder
        })
      );
    });
  };

  SearchResultGroup.prototype.render = function render() {
    var id = this.props.id;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'toolbar.search.' + id + '.title' })
      ),
      this.renderResults()
    );
  };

  return SearchResultGroup;
}(_react.Component);

SearchResultGroup.propTypes = {
  id: _react.PropTypes.string.isRequired,
  items: _react.PropTypes.array.isRequired,
  offset: _react.PropTypes.number.isRequired
};
exports.default = SearchResultGroup;
//# sourceMappingURL=SearchResultGroup.react.js.map