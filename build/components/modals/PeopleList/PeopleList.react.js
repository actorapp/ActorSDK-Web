'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _ContactActionCreators = require('../../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('../../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _PeopleStore = require('../../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _PeopleItem = require('./PeopleItem.react');

var _PeopleItem2 = _interopRequireDefault(_PeopleItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PeopleList = (function (_Component) {
  _inherits(PeopleList, _Component);

  function PeopleList(props) {
    _classCallCheck(this, PeopleList);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PeopleList).call(this, props));

    _this.setFocus = function () {
      return _react2.default.findDOMNode(_this.refs.search).focus();
    };

    _this.handleClose = function () {
      return _ContactActionCreators2.default.close();
    };

    _this.handleSearchChange = function (event) {
      var query = event.target.value;
      _this.setState({ query: query });
      _this.searchPeople(query);
    };

    _this.searchPeople = (0, _lodash.debounce)(function (query) {
      return _ContactActionCreators2.default.search(query);
    }, 300, { trailing: true });

    _this.handleContactSelect = function (contact) {
      _DialogActionCreators2.default.selectDialogPeerUser(contact.uid);
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
          _this.handleContactSelect(results[selectedIndex]);
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

  _createClass(PeopleList, [{
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

      var peopleList = (0, _lodash.map)(results, function (result, index) {
        return _react2.default.createElement(_PeopleItem2.default, { contact: result, key: index,
          onClick: _this2.handleContactSelect,
          isSelected: selectedIndex === index,
          ref: selectedIndex === index ? 'selected' : null,
          onMouseOver: function onMouseOver() {
            return _this2.setState({ selectedIndex: index });
          } });
      });

      return _react2.default.createElement(
        'div',
        { className: 'newmodal newmodal__contacts' },
        _react2.default.createElement(
          'header',
          { className: 'newmodal__header' },
          _react2.default.createElement(
            'h2',
            null,
            this.getIntlMessage('modal.contacts.title')
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'newmodal__search' },
          _react2.default.createElement('input', { className: 'newmodal__search__input',
            onChange: this.handleSearchChange,
            placeholder: this.getIntlMessage('modal.contacts.search'),
            type: 'search',
            ref: 'search',
            value: query })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'newmodal__result contacts__list', ref: 'results' },
          list.length === 0 ? _react2.default.createElement(
            'div',
            null,
            this.getIntlMessage('modal.contacts.loading')
          ) : results.length === 0 ? _react2.default.createElement(
            'li',
            { className: 'contacts__list__item contacts__list__item--empty text-center' },
            this.getIntlMessage('modal.contacts.notFound')
          ) : peopleList
        )
      );
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        list: _PeopleStore2.default.getList(),
        results: _PeopleStore2.default.getResults(),
        selectedIndex: 0
      };
    }
  }]);

  return PeopleList;
})(_react.Component);

PeopleList.getStores = function () {
  return [_PeopleStore2.default];
};

_reactMixin2.default.onClass(PeopleList, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(PeopleList, { pure: false });
//# sourceMappingURL=PeopleList.react.js.map