'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isInside = require('../../utils/isInside');

var _isInside2 = _interopRequireDefault(_isInside);

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _Scrollbar = require('../common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _QuickSearchActionCreators = require('../../actions/QuickSearchActionCreators');

var _QuickSearchActionCreators2 = _interopRequireDefault(_QuickSearchActionCreators);

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

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

  function QuickSearch(props) {
    _classCallCheck(this, QuickSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.setFocus = function () {
      setImmediate(function () {
        (0, _reactDom.findDOMNode)(_this.refs.query).focus();
      });
    };

    _this.handleClose = function () {
      return _QuickSearchActionCreators2.default.hide();
    };

    _this.handleSearch = function (event) {
      var query = event.target.value;
      _this.setState({ query: query });
      _QuickSearchActionCreators2.default.search(query);
    };

    _this.handleDialogSelect = function (peer) {
      var peerStr = _PeerUtils2.default.peerToString(peer);
      _history2.default.push('/im/' + peerStr);
      _this.handleClose();
    };

    _this.handleKeyDown = function (event) {
      var _this$state = _this.state;
      var results = _this$state.results;
      var selectedIndex = _this$state.selectedIndex;

      var visibleItems = 8;
      var index = selectedIndex;

      switch (event.keyCode) {
        case _ActorAppConstants.KeyCodes.ENTER:
          event.stopPropagation();
          event.preventDefault();
          _this.handleDialogSelect(results[selectedIndex].peerInfo.peer);
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

          _this.handleScroll(scrollIndex * RESULT_ITEM_HEIGHT);
          _this.setState({ selectedIndex: index });
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

          _this.handleScroll(scrollIndex * RESULT_ITEM_HEIGHT);
          _this.setState({ selectedIndex: index });
          break;

        case _ActorAppConstants.KeyCodes.ESC:
          event.preventDefault();
          _this.handleClose();
          break;

        default:
      }
    };

    _this.handleScroll = function (top) {
      return _this.refs.results.scrollTo(top);
    };

    _this.handleDocumentClick = function (event) {
      var modal = (0, _reactDom.findDOMNode)(_this.refs.modal);
      var modalRect = modal.getBoundingClientRect();
      var coords = {
        x: event.pageX || event.clientX,
        y: event.pageY || event.clientY
      };

      if (!(0, _isInside2.default)(coords, modalRect)) {
        _this.handleClose();
      }
    };

    return _this;
  }

  QuickSearch.calculateState = function calculateState() {
    return {
      isOpen: _QuickSearchStore2.default.isOpen(),
      results: _QuickSearchStore2.default.getResults(),
      selectedIndex: 0
    };
  };

  QuickSearch.prototype.componentDidMount = function componentDidMount() {
    this.setFocus();
    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('click', this.handleDocumentClick, false);
  };

  QuickSearch.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('click', this.handleDocumentClick, false);
  };

  QuickSearch.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state;
    var isOpen = _state.isOpen;
    var results = _state.results;
    var selectedIndex = _state.selectedIndex;
    var query = _state.query;
    var intl = this.context.intl;


    var resultsList = (0, _lodash.map)(results, function (result, index) {
      var resultClassName = (0, _classnames2.default)('results__item row', {
        'results__item--active': selectedIndex === index
      });

      return _react2.default.createElement(
        'li',
        { className: resultClassName,
          key: index,
          onClick: function onClick() {
            return _this2.handleDialogSelect(result.peerInfo.peer);
          },
          onMouseOver: function onMouseOver() {
            return _this2.setState({ selectedIndex: index });
          } },
        _react2.default.createElement(_AvatarItem2.default, { image: result.peerInfo.avatar,
          placeholder: result.peerInfo.placeholder,
          size: 'small',
          title: result.peerInfo.title }),
        _react2.default.createElement(
          'div',
          { className: 'title col-xs' },
          _react2.default.createElement(
            'div',
            { className: 'hint pull-right' },
            intl.messages['modal.quickSearch.openDialog']
          ),
          result.peerInfo.title
        )
      );
    });

    var modalStyle = {
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
        width: 460
      }
    };

    return _react2.default.createElement(
      _reactModal2.default,
      { className: 'modal modal--quick-search',
        closeTimeoutMS: 150,
        isOpen: isOpen,
        style: modalStyle },
      _react2.default.createElement(
        'div',
        { ref: 'modal' },
        _react2.default.createElement(
          'header',
          { className: 'header' },
          _react2.default.createElement(
            'div',
            { className: 'pull-left' },
            intl.messages['modal.quickSearch.title']
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
            intl.messages['modal.quickSearch.toClose']
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
            intl.messages['modal.quickSearch.toSelect']
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
            intl.messages['modal.quickSearch.toNavigate']
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'input' },
          _react2.default.createElement('input', { type: 'text',
            placeholder: intl.messages['modal.quickSearch.placeholder'],
            onChange: this.handleSearch,
            value: query,
            ref: 'query' })
        ),
        _react2.default.createElement(
          _Scrollbar2.default,
          { style: { height: RESULT_ITEM_HEIGHT * 8 }, ref: 'results' },
          _react2.default.createElement(
            'ul',
            { className: 'results' },
            resultsList.length > 0 ? resultsList : _react2.default.createElement(
              'li',
              { className: 'results__item results__item--suggestion row' },
              _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.quickSearch.notFound',
                values: { query: query } }),
              _react2.default.createElement(
                'button',
                { className: 'button button--rised hide' },
                'Create new dialog ',
                query
              )
            )
          )
        )
      )
    );
  };

  return QuickSearch;
}(_react.Component);

QuickSearch.getStores = function () {
  return [_QuickSearchStore2.default];
};

QuickSearch.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(QuickSearch, { pure: false });
//# sourceMappingURL=QuickSearch.react.js.map