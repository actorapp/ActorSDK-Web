'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _GroupListActionCreators = require('../../../actions/GroupListActionCreators');

var _GroupListActionCreators2 = _interopRequireDefault(_GroupListActionCreators);

var _DialogActionCreators = require('../../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _GroupListStore = require('../../../stores/GroupListStore');

var _GroupListStore2 = _interopRequireDefault(_GroupListStore);

var _Group = require('./Group.react');

var _Group2 = _interopRequireDefault(_Group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GroupList = (function (_Component) {
  _inherits(GroupList, _Component);

  function GroupList(props) {
    _classCallCheck(this, GroupList);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupList).call(this, props));

    _this.setFocus = function () {
      return _react2.default.findDOMNode(_this.refs.search).focus();
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
      _DialogActionCreators2.default.selectDialogPeer(peer);
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

        var scrollContainerNode = _react2.default.findDOMNode(_this.refs.results);
        var selectedNode = _react2.default.findDOMNode(_this.refs.selected);
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

        var scrollContainerNode = _react2.default.findDOMNode(_this.refs.results);
        var selectedNode = _react2.default.findDOMNode(_this.refs.selected);
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
      var resultsNode = _react2.default.findDOMNode(_this.refs.results);
      resultsNode.scrollTop = top;
    };

    return _this;
  }

  _createClass(GroupList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setFocus();
      document.addEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var query = _state.query;
      var results = _state.results;
      var selectedIndex = _state.selectedIndex;
      var list = _state.list;

      var groupList = (0, _lodash.map)(results, function (result, index) {
        return _react2.default.createElement(_Group2.default, { group: result, key: index,
          isSelected: selectedIndex === index,
          ref: selectedIndex === index ? 'selected' : null,
          onClick: _this2.handleGroupSelect,
          onMouseOver: function onMouseOver() {
            return _this2.setState({ selectedIndex: index });
          } });
      });

      return _react2.default.createElement(
        'div',
        { className: 'newmodal newmodal__groups' },
        _react2.default.createElement(
          'header',
          { className: 'newmodal__header' },
          _react2.default.createElement(
            'h2',
            null,
            this.getIntlMessage('modal.groups.title')
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'newmodal__search' },
          _react2.default.createElement('input', { className: 'newmodal__search__input',
            onChange: this.handleSearchChange,
            placeholder: this.getIntlMessage('modal.groups.search'),
            type: 'search',
            ref: 'search',
            value: query })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'newmodal__result group__list', ref: 'results' },
          list.length === 0 ? _react2.default.createElement(
            'div',
            null,
            this.getIntlMessage('modal.groups.loading')
          ) : results.length === 0 ? _react2.default.createElement(
            'li',
            { className: 'group__list__item group__list__item--empty text-center' },
            _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { message: this.getIntlMessage('modal.groups.notFound'),
              query: query })
          ) : groupList
        )
      );
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        list: _GroupListStore2.default.getList(),
        results: _GroupListStore2.default.getResults(),
        selectedIndex: 0
      };
    }
  }]);

  return GroupList;
})(_react.Component);

GroupList.getStores = function () {
  return [_GroupListStore2.default];
};

_reactMixin2.default.onClass(GroupList, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(GroupList, { pure: false });
//# sourceMappingURL=GroupList.react.js.map