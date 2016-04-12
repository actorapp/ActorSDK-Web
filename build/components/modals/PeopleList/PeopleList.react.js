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

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _Scrollbar = require('../../common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _ContactActionCreators = require('../../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('../../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _PeopleStore = require('../../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _ContactsStore = require('../../../stores/ContactsStore');

var _ContactsStore2 = _interopRequireDefault(_ContactsStore);

var _PeopleItem = require('./PeopleItem.react');

var _PeopleItem2 = _interopRequireDefault(_PeopleItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    };

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

    _this.state = {
      query: null,
      selectedIndex: 0
    };
    return _this;
  }

  PeopleList.getStores = function getStores() {
    return [_PeopleStore2.default, _ContactsStore2.default];
  };

  PeopleList.calculateState = function calculateState(prevState) {
    var _PeopleStore$getState = _PeopleStore2.default.getState();

    var isOpen = _PeopleStore$getState.isOpen;

    var contacts = _ContactsStore2.default.getState();

    return (0, _extends3.default)({}, prevState, {
      isOpen: isOpen,
      contacts: contacts
    });
  };

  PeopleList.prototype.componentDidMount = function componentDidMount() {
    this.setFocus();
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  PeopleList.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  PeopleList.prototype.getPeople = function getPeople() {
    var _state = this.state;
    var query = _state.query;
    var contacts = _state.contacts;

    if (!query) {
      return contacts;
    }

    return contacts.filter(function (contact) {
      var score = _fuzzaldrin2.default.score(contact.name, query);
      return score > 0;
    });
  };

  PeopleList.prototype.renderPeople = function renderPeople() {
    var _this2 = this;

    var intl = this.context.intl;
    var _state2 = this.state;
    var contacts = _state2.contacts;
    var selectedIndex = _state2.selectedIndex;


    if (!contacts.length) {
      return _react2.default.createElement(
        'div',
        null,
        intl.messages['modal.contacts.loading']
      );
    }

    var people = this.getPeople();
    if (!people.length) {
      return _react2.default.createElement(
        'li',
        { className: 'contacts__list__item contacts__list__item--empty text-center' },
        intl.messages['modal.contacts.notFound']
      );
    }

    return people.map(function (contact, index) {
      return _react2.default.createElement(_PeopleItem2.default, {
        contact: contact,
        key: contact.uid,
        onClick: _this2.handleContactSelect,
        isSelected: selectedIndex === index,
        ref: selectedIndex === index ? 'selected' : null,
        onMouseOver: function onMouseOver() {
          return _this2.setState({ selectedIndex: index });
        }
      });
    });
  };

  PeopleList.prototype.render = function render() {
    var query = this.state.query;
    var intl = this.context.intl;


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
          this.renderPeople()
        )
      )
    );
  };

  return PeopleList;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

PeopleList.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(PeopleList, { pure: false });
//# sourceMappingURL=PeopleList.react.js.map