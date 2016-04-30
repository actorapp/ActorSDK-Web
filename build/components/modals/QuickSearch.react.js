'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _EventListener = require('fbjs/lib/EventListener');

var _EventListener2 = _interopRequireDefault(_EventListener);

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _QuickSearchActionCreators = require('../../actions/QuickSearchActionCreators');

var _QuickSearchActionCreators2 = _interopRequireDefault(_QuickSearchActionCreators);

var _QuickSearchStore = require('../../stores/QuickSearchStore');

var _QuickSearchStore2 = _interopRequireDefault(_QuickSearchStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RESULT_ITEM_HEIGHT = 44;
var scrollIndex = 0;

var QuickSearch = function (_Component) {
  _inherits(QuickSearch, _Component);

  QuickSearch.getStores = function getStores() {
    return [_QuickSearchStore2.default];
  };

  QuickSearch.calculateState = function calculateState() {
    return {
      list: _QuickSearchStore2.default.getList(),
      selectedIndex: 0
    };
  };

  function QuickSearch(props, context) {
    _classCallCheck(this, QuickSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.setFocus = _this.setFocus.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleSearch = _this.handleSearch.bind(_this);
    _this.handleDialogSelect = _this.handleDialogSelect.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  QuickSearch.prototype.componentDidMount = function componentDidMount() {
    this.setFocus();
    this.setListeners();
  };

  QuickSearch.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cleanListeners();
  };

  QuickSearch.prototype.setListeners = function setListeners() {
    this.cleanListeners();
    this.listeners = [_EventListener2.default.listen(document, 'keydown', this.handleKeyDown)];
  };

  QuickSearch.prototype.cleanListeners = function cleanListeners() {
    if (this.listeners) {
      this.listeners.forEach(function (listener) {
        return listener.remove();
      });
      this.listeners = null;
    }
  };

  QuickSearch.prototype.setFocus = function setFocus() {
    var _this2 = this;

    setImmediate(function () {
      return (0, _reactDom.findDOMNode)(_this2.refs.query).focus();
    });
  };

  QuickSearch.prototype.handleClose = function handleClose() {
    _QuickSearchActionCreators2.default.hide();
  };

  QuickSearch.prototype.handleSearch = function handleSearch(event) {
    this.setState({ query: event.target.value });
  };

  QuickSearch.prototype.handleDialogSelect = function handleDialogSelect(peer) {
    var peerStr = _PeerUtils2.default.peerToString(peer);
    _history2.default.push('/im/' + peerStr);
    this.handleClose();
  };

  QuickSearch.prototype.handleKeyDown = function handleKeyDown(event) {
    var selectedIndex = this.state.selectedIndex;

    var results = this.getResults();
    var visibleItems = 8;
    var index = selectedIndex;

    switch (event.keyCode) {
      case _ActorAppConstants.KeyCodes.ENTER:
        event.stopPropagation();
        event.preventDefault();
        this.handleDialogSelect(results[selectedIndex].peerInfo.peer);
        break;

      case _ActorAppConstants.KeyCodes.ARROW_UP:
        event.stopPropagation();
        event.preventDefault();

        if (index > 0) {
          index -= 1;
        } else if (index === 0) {
          index = results.length - 1;
        }

        if (scrollIndex > index) {
          scrollIndex = index;
        } else if (index === results.length - 1) {
          scrollIndex = results.length - visibleItems;
        }

        this.handleScroll(scrollIndex * RESULT_ITEM_HEIGHT);
        this.setState({ selectedIndex: index });
        break;
      case _ActorAppConstants.KeyCodes.ARROW_DOWN:
      case _ActorAppConstants.KeyCodes.TAB:
        event.stopPropagation();
        event.preventDefault();

        if (index < results.length - 1) {
          index += 1;
        } else if (index === results.length - 1) {
          index = 0;
        }

        if (index + 1 > scrollIndex + visibleItems) {
          scrollIndex = index + 1 - visibleItems;
        } else if (index === 0) {
          scrollIndex = 0;
        }

        this.handleScroll(scrollIndex * RESULT_ITEM_HEIGHT);
        this.setState({ selectedIndex: index });
        break;

      default:
    }
  };

  QuickSearch.prototype.handleScroll = function handleScroll(top) {
    (0, _reactDom.findDOMNode)(this.refs.results).scrollTop = top;
  };

  QuickSearch.prototype.getResults = function getResults() {
    var _state = this.state;
    var list = _state.list;
    var query = _state.query;

    if (!query || query === '') return list;

    return list.filter(function (result) {
      return _fuzzaldrin2.default.score(result.peerInfo.title, query) > 0 || _fuzzaldrin2.default.score(result.peerInfo.userName, query) > 0;
    });
  };

  QuickSearch.prototype.renderResults = function renderResults() {
    var _this3 = this;

    var _state2 = this.state;
    var selectedIndex = _state2.selectedIndex;
    var query = _state2.query;

    var results = this.getResults();

    if (!results.length) {
      return _react2.default.createElement(
        'li',
        { className: 'results__item results__item--suggestion row' },
        _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.quickSearch.notFound', values: { query: query } }),
        _react2.default.createElement(
          'button',
          { className: 'button button--rised hide' },
          'Create new dialog ',
          query
        )
      );
    }

    return results.map(function (result, index) {
      var resultClassName = (0, _classnames2.default)('results__item row', {
        'results__item--active': selectedIndex === index
      });

      return _react2.default.createElement(
        'li',
        {
          className: resultClassName, key: 'r' + index,
          onClick: function onClick() {
            return _this3.handleDialogSelect(result.peerInfo.peer);
          },
          onMouseOver: function onMouseOver() {
            return _this3.setState({ selectedIndex: index });
          } },
        _react2.default.createElement(_AvatarItem2.default, {
          className: 'quick-search__avatar',
          size: 'small',
          image: result.peerInfo.avatar,
          placeholder: result.peerInfo.placeholder,
          title: result.peerInfo.title
        }),
        _react2.default.createElement(
          'div',
          { className: 'title col-xs' },
          _react2.default.createElement(
            'div',
            { className: 'hint pull-right' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.quickSearch.openDialog' })
          ),
          result.peerInfo.title
        )
      );
    });
  };

  QuickSearch.prototype.renderHeader = function renderHeader() {
    return _react2.default.createElement(
      'header',
      { className: 'header' },
      _react2.default.createElement(
        'div',
        { className: 'pull-left' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.quickSearch.title' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'pull-right' },
        _react2.default.createElement(
          'strong',
          null,
          'esc'
        ),
        '  ',
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.quickSearch.toClose' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'pull-right' },
        _react2.default.createElement(
          'strong',
          null,
          '↵'
        ),
        '  ',
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.quickSearch.toSelect' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'pull-right' },
        _react2.default.createElement(
          'strong',
          null,
          'tab'
        ),
        '  or  ',
        _react2.default.createElement(
          'strong',
          null,
          '↑'
        ),
        _react2.default.createElement(
          'strong',
          null,
          '↓'
        ),
        '  ',
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.quickSearch.toNavigate' })
      )
    );
  };

  QuickSearch.prototype.renderSearchInput = function renderSearchInput() {
    var query = this.state.query;
    var intl = this.context.intl;


    return _react2.default.createElement(
      'div',
      { className: 'large-search' },
      _react2.default.createElement('input', {
        className: 'input',
        type: 'text',
        placeholder: intl.messages['modal.quickSearch.placeholder'],
        onChange: this.handleSearch,
        value: query,
        ref: 'query' })
    );
  };

  QuickSearch.prototype.render = function render() {
    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay',
        className: 'modal',
        onRequestClose: this.handleClose,
        isOpen: true },
      _react2.default.createElement(
        'div',
        { className: 'quick-search' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          this.renderHeader(),
          this.renderSearchInput(),
          _react2.default.createElement(
            'ul',
            { className: 'results', ref: 'results' },
            this.renderResults()
          )
        )
      )
    );
  };

  return QuickSearch;
}(_react.Component);

QuickSearch.contextTypes = {
  intl: _react.PropTypes.object.isRequired
};
exports.default = _utils.Container.create(QuickSearch, { pure: false });
//# sourceMappingURL=QuickSearch.react.js.map