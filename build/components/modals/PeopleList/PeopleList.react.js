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

var _history = require('../../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _PeerUtils = require('../../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _Scrollbar = require('../../common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

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

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var PeopleList = function (_Component) {
  (0, _inherits3.default)(PeopleList, _Component);

  function PeopleList(props) {
    (0, _classCallCheck3.default)(this, PeopleList);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.setFocus = function () {
      return (0, _reactDom.findDOMNode)(_this.refs.search).focus();
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
      return _this.refs.results.scrollTo(top);
    };

    return _this;
  }

  PeopleList.getStores = function getStores() {
    return [_PeopleStore2.default];
  };

  PeopleList.calculateState = function calculateState() {
    return {
      list: _PeopleStore2.default.getList(),
      results: _PeopleStore2.default.getResults(),
      selectedIndex: 0
    };
  };

  PeopleList.prototype.componentDidMount = function componentDidMount() {
    this.setFocus();
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  PeopleList.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  PeopleList.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state;
    var query = _state.query;
    var results = _state.results;
    var selectedIndex = _state.selectedIndex;
    var list = _state.list;
    var intl = this.context.intl;


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
          intl.messages['modal.contacts.title']
        )
      ),
      _react2.default.createElement(
        'section',
        { className: 'newmodal__search' },
        _react2.default.createElement('input', { className: 'newmodal__search__input',
          onChange: this.handleSearchChange,
          placeholder: intl.messages['modal.contacts.search'],
          type: 'search',
          ref: 'search',
          value: query })
      ),
      _react2.default.createElement(
        _Scrollbar2.default,
        { ref: 'results' },
        _react2.default.createElement(
          'ul',
          { className: 'newmodal__result contacts__list' },
          list.length === 0 ? _react2.default.createElement(
            'div',
            null,
            intl.messages['modal.contacts.loading']
          ) : results.length === 0 ? _react2.default.createElement(
            'li',
            { className: 'contacts__list__item contacts__list__item--empty text-center' },
            intl.messages['modal.contacts.notFound']
          ) : peopleList
        )
      )
    );
  };

  return PeopleList;
}(_react.Component);

PeopleList.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(PeopleList, { pure: false });
//# sourceMappingURL=PeopleList.react.js.map