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

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Text = require('../dialog/messages/Text.react');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var SearchResultItem = function (_Component) {
  (0, _inherits3.default)(SearchResultItem, _Component);

  function SearchResultItem() {
    (0, _classCallCheck3.default)(this, SearchResultItem);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  SearchResultItem.prototype.render = function render() {
    var _props = this.props;
    var content = _props.content;
    var date = _props.date;
    var sender = _props.sender;


    var resultContent = void 0;
    switch (content.content) {
      case _ActorAppConstants.MessageContentTypes.TEXT:
        resultContent = _react2.default.createElement(_Text2.default, (0, _extends3.default)({}, content, { className: 'text' }));
        break;
      default:
    }

    return _react2.default.createElement(
      'li',
      { className: 'search__results__item search__results__item--message row' },
      _react2.default.createElement(_AvatarItem2.default, { image: sender.avatar,
        placeholder: sender.placeholder,
        size: 'small',
        title: sender.title }),
      _react2.default.createElement(
        'div',
        { className: 'search__results__item__body col-xs' },
        _react2.default.createElement(
          'header',
          null,
          _react2.default.createElement(
            'time',
            { className: 'time pull-right' },
            date
          ),
          _react2.default.createElement(
            'h4',
            { className: 'title' },
            sender.title
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'content' },
          resultContent
        )
      )
    );
  };

  return SearchResultItem;
}(_react.Component);

SearchResultItem.propTypes = {
  content: _react.PropTypes.object.isRequired,
  date: _react.PropTypes.string.isRequired,
  sender: _react.PropTypes.object.isRequired
};
exports.default = SearchResultItem;
//# sourceMappingURL=SearchResultItem.react.js.map