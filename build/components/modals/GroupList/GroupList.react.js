'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _history = require('../../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _PeerUtils = require('../../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _Scrollbar = require('../../common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _GroupListActionCreators = require('../../../actions/GroupListActionCreators');

var _GroupListActionCreators2 = _interopRequireDefault(_GroupListActionCreators);

var _GroupListStore = require('../../../stores/GroupListStore');

var _GroupListStore2 = _interopRequireDefault(_GroupListStore);

var _Group = require('./Group.react');

var _Group2 = _interopRequireDefault(_Group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var GroupList = function (_Component) {
  (0, _inherits3.default)(GroupList, _Component);

  function GroupList(props) {
    (0, _classCallCheck3.default)(this, GroupList);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.setFocus = function () {
      return (0, _reactDom.findDOMNode)(_this.refs.search).focus();
    };

    _this.handleClose = function () {
      return _GroupListActionCreators2.default.close();
    };

    _this.handleSearchChange = function (event) {
      var query = event.target.value;
      _this.setState({ query: query });
      _this.searchGroups(query);
    };

    _this.searchGroups = (0, _lodash.debounce)(function (query) {
      return _GroupListActionCreators2.default.search(query);
    }, 300, { trailing: true });

    _this.handleGroupSelect = function (peer) {
      var peerStr = _PeerUtils2.default.peerToString(peer);
      _history2.default.push('/im/' + peerStr);
      _this.handleClose();
    };

    _this.handleKeyDown = function (event) {
      var _this$state = _this.state;
      var results = _this$state.results;
      var selectedIndex = _this$state.selectedIndex;

      var index = selectedIndex;

      var selectNext = function selectNext() {
        if (index < results.length - 1) {
          index += 1;
        } else if (index === results.length - 1) {
          index = 0;
        }

        _this.setState({ selectedIndex: index });

        var scrollContainerNode = (0, _reactDom.findDOMNode)(_this.refs.results).getElementsByClassName('ss-scrollarea')[0];
        var selectedNode = (0, _reactDom.findDOMNode)(_this.refs.selected);
        var scrollContainerNodeRect = scrollContainerNode.getBoundingClientRect();
        var selectedNodeRect = selectedNode.getBoundingClientRect();

        if (scrollContainerNodeRect.top + scrollContainerNodeRect.height < selectedNodeRect.top + selectedNodeRect.height) {
          _this.handleScroll(scrollContainerNode.scrollTop + (selectedNodeRect.top + selectedNodeRect.height) - (scrollContainerNodeRect.top + scrollContainerNodeRect.height));
        } else if (scrollContainerNodeRect.top > selectedNodeRect.top) {
          _this.handleScroll(0);
        }
      };
      var selectPrev = function selectPrev() {
        if (index > 0) {
          index -= 1;
        } else if (index === 0) {
          index = results.length - 1;
        }

        _this.setState({ selectedIndex: index });

        var scrollContainerNode = (0, _reactDom.findDOMNode)(_this.refs.results).getElementsByClassName('ss-scrollarea')[0];
        var selectedNode = (0, _reactDom.findDOMNode)(_this.refs.selected);
        var scrollContainerNodeRect = scrollContainerNode.getBoundingClientRect();
        var selectedNodeRect = selectedNode.getBoundingClientRect();

        if (scrollContainerNodeRect.top > selectedNodeRect.top) {
          _this.handleScroll(scrollContainerNode.scrollTop + selectedNodeRect.top - scrollContainerNodeRect.top);
        } else if (selectedNodeRect.top > scrollContainerNodeRect.top + scrollContainerNodeRect.height) {
          _this.handleScroll(scrollContainerNode.scrollHeight);
        }
      };

      switch (event.keyCode) {
        case _ActorAppConstants.KeyCodes.ENTER:
          event.stopPropagation();
          event.preventDefault();
          _this.handleGroupSelect(results[selectedIndex].peerInfo.peer);
          break;

        case _ActorAppConstants.KeyCodes.ARROW_UP:
          event.stopPropagation();
          event.preventDefault();
          selectPrev();
          break;
        case _ActorAppConstants.KeyCodes.ARROW_DOWN:
          event.stopPropagation();
          event.preventDefault();
          selectNext();
          break;
        case _ActorAppConstants.KeyCodes.TAB:
          event.stopPropagation();
          event.preventDefault();
          if (event.shiftKey) {
            selectPrev();
          } else {
            selectNext();
          }
          break;
        default:
      }
    };

    _this.handleScroll = function (top) {
      return _this.refs.results.scrollTo(top);
    };

    return _this;
  }

  GroupList.getStores = function getStores() {
    return [_GroupListStore2.default];
  };

  GroupList.calculateState = function calculateState() {
    return {
      list: _GroupListStore2.default.getList(),
      results: _GroupListStore2.default.getResults(),
      selectedIndex: 0
    };
  };

  GroupList.prototype.componentDidMount = function componentDidMount() {
    this.setFocus();
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  GroupList.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  GroupList.prototype.renderSearchInput = function renderSearchInput() {
    var query = this.state.query;
    var intl = this.context.intl;


    return _react2.default.createElement('input', { className: 'newmodal__search__input',
      onChange: this.handleSearchChange,
      placeholder: intl.messages['modal.groups.search'],
      type: 'search',
      ref: 'search',
      value: query });
  };

  GroupList.prototype.renderLoading = function renderLoading() {
    var list = this.state.list;


    if (list.length !== 0) return null;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.groups.loading' })
    );
  };

  GroupList.prototype.renderList = function renderList() {
    var _this2 = this;

    var _state = this.state;
    var query = _state.query;
    var results = _state.results;
    var selectedIndex = _state.selectedIndex;


    if (results.length === 0) {
      return _react2.default.createElement(
        'li',
        { className: 'group__list__item group__list__item--empty text-center' },
        _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.groups.notFound', values: { query: query } })
      );
    }

    return results.map(function (result, index) {
      return _react2.default.createElement(_Group2.default, {
        group: result,
        key: index,
        isSelected: selectedIndex === index,
        ref: selectedIndex === index ? 'selected' : null,
        onClick: _this2.handleGroupSelect,
        onMouseOver: function onMouseOver() {
          return _this2.setState({ selectedIndex: index });
        }
      });
    });
  };

  GroupList.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'newmodal newmodal__groups' },
      _react2.default.createElement(
        'header',
        { className: 'newmodal__header' },
        _react2.default.createElement(
          'h2',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.groups.title' })
        )
      ),
      _react2.default.createElement(
        'section',
        { className: 'newmodal__search' },
        this.renderSearchInput()
      ),
      _react2.default.createElement(
        _Scrollbar2.default,
        { ref: 'results' },
        _react2.default.createElement(
          'div',
          { className: 'newmodal__result group__list' },
          this.renderLoading(),
          this.renderList()
        )
      )
    );
  };

  return GroupList;
}(_react.Component);

GroupList.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(GroupList, { pure: false });
//# sourceMappingURL=GroupList.react.js.map