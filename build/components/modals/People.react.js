'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _PeopleStore = require('../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _PeopleItem = require('./peoples/PeopleItem.react');

var _PeopleItem2 = _interopRequireDefault(_PeopleItem);

var _ModalCloseButton = require('./ModalCloseButton.react');

var _ModalCloseButton2 = _interopRequireDefault(_ModalCloseButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PeopleList = function (_Component) {
  _inherits(PeopleList, _Component);

  PeopleList.getStores = function getStores() {
    return [_PeopleStore2.default];
  };

  PeopleList.calculateState = function calculateState(prevState) {
    return _extends({}, prevState, {
      selectedIndex: 0,
      contacts: _PeopleStore2.default.getState()
    });
  };

  function PeopleList(props) {
    _classCallCheck(this, PeopleList);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      query: null,
      selectedIndex: 0
    };

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleSearchChange = _this.handleSearchChange.bind(_this);
    _this.handleContactSelect = _this.handleContactSelect.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  PeopleList.prototype.componentDidMount = function componentDidMount() {
    this.setFocus();
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  PeopleList.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  PeopleList.prototype.setFocus = function setFocus() {
    (0, _reactDom.findDOMNode)(this.refs.search).focus();
  };

  PeopleList.prototype.handleClose = function handleClose() {
    _ContactActionCreators2.default.close();
  };

  PeopleList.prototype.handleSearchChange = function handleSearchChange(event) {
    var query = event.target.value;
    this.setState({ query: query });
  };

  PeopleList.prototype.handleContactSelect = function handleContactSelect(contact) {
    _DialogActionCreators2.default.selectDialogPeerUser(contact.uid);
    this.handleClose();
  };

  PeopleList.prototype.handleKeyDown = function handleKeyDown(event) {
    var _this2 = this;

    var selectedIndex = this.state.selectedIndex;

    var results = this.getPeople();
    var offset = 18;
    var index = selectedIndex;

    var selectNext = function selectNext() {
      if (index < results.length - 1) {
        index += 1;
      } else if (index === results.length - 1) {
        index = 0;
      }

      _this2.setState({ selectedIndex: index });

      var scrollContainerNode = (0, _reactDom.findDOMNode)(_this2.refs.results);
      var selectedNode = (0, _reactDom.findDOMNode)(_this2.refs.selected);
      var scrollContainerNodeRect = scrollContainerNode.getBoundingClientRect();
      var selectedNodeRect = selectedNode.getBoundingClientRect();

      if (scrollContainerNodeRect.top + scrollContainerNodeRect.height < selectedNodeRect.top + selectedNodeRect.height) {
        _this2.handleScroll(scrollContainerNode.scrollTop + (selectedNodeRect.top + selectedNodeRect.height) - (scrollContainerNodeRect.top + scrollContainerNodeRect.height) + offset);
      } else if (scrollContainerNodeRect.top > selectedNodeRect.top) {
        _this2.handleScroll(0);
      }
    };
    var selectPrev = function selectPrev() {
      if (index > 0) {
        index -= 1;
      } else if (index === 0) {
        index = results.length - 1;
      }

      _this2.setState({ selectedIndex: index });

      var scrollContainerNode = (0, _reactDom.findDOMNode)(_this2.refs.results);
      var selectedNode = (0, _reactDom.findDOMNode)(_this2.refs.selected);
      var scrollContainerNodeRect = scrollContainerNode.getBoundingClientRect();
      var selectedNodeRect = selectedNode.getBoundingClientRect();

      if (scrollContainerNodeRect.top > selectedNodeRect.top) {
        _this2.handleScroll(scrollContainerNode.scrollTop + selectedNodeRect.top - scrollContainerNodeRect.top - offset);
      } else if (selectedNodeRect.top > scrollContainerNodeRect.top + scrollContainerNodeRect.height) {
        _this2.handleScroll(scrollContainerNode.scrollHeight);
      }
    };

    switch (event.keyCode) {
      case _ActorAppConstants.KeyCodes.ENTER:
        event.stopPropagation();
        event.preventDefault();
        this.handleContactSelect(results[selectedIndex]);
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

  PeopleList.prototype.handleScroll = function handleScroll(top) {
    var scrollContainerNode = (0, _reactDom.findDOMNode)(this.refs.results);
    scrollContainerNode.scrollTop = top;
  };

  PeopleList.prototype.getPeople = function getPeople() {
    var _state = this.state;
    var query = _state.query;
    var contacts = _state.contacts;

    if (!query || query === '') return contacts;

    return contacts.filter(function (contact) {
      return _fuzzaldrin2.default.score(contact.name, query) > 0;
    });
  };

  PeopleList.prototype.renderPeople = function renderPeople() {
    var _this3 = this;

    var _state2 = this.state;
    var selectedIndex = _state2.selectedIndex;
    var contacts = _state2.contacts;

    var people = this.getPeople();

    if (contacts.length === 0) {
      return _react2.default.createElement(
        'li',
        { className: 'result-list__item result-list__item--empty text-center' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.contacts.loading' })
      );
    }

    if (!people.length) {
      return _react2.default.createElement(
        'li',
        { className: 'result-list__item result-list__item--empty text-center' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.contacts.notFound' })
      );
    }

    return people.map(function (contact, index) {
      return _react2.default.createElement(_PeopleItem2.default, {
        contact: contact,
        key: contact.uid,
        onClick: _this3.handleContactSelect,
        isSelected: selectedIndex === index,
        ref: selectedIndex === index ? 'selected' : null,
        onMouseOver: function onMouseOver() {
          return _this3.setState({ selectedIndex: index });
        }
      });
    });
  };

  PeopleList.prototype.renderSearch = function renderSearch() {
    var query = this.state.query;
    var intl = this.context.intl;


    return _react2.default.createElement(
      'section',
      { className: 'large-search' },
      _react2.default.createElement('input', { className: 'input',
        onChange: this.handleSearchChange,
        placeholder: intl.messages['modal.contacts.search'],
        type: 'search',
        ref: 'search',
        value: query })
    );
  };

  PeopleList.prototype.render = function render() {
    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay modal-overlay--white',
        className: 'modal modal--fullscreen modal--without-scroll',
        onRequestClose: this.handleClose,
        shouldCloseOnOverlayClick: false,
        isOpen: true },
      _react2.default.createElement(_ModalCloseButton2.default, { onClick: this.handleClose }),
      _react2.default.createElement(
        'div',
        { className: 'people-list' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.contacts.title', tagName: 'h1' })
          ),
          this.renderSearch(),
          _react2.default.createElement(
            'div',
            { className: 'modal__body', ref: 'results' },
            _react2.default.createElement(
              'ul',
              { className: 'result-list' },
              this.renderPeople()
            )
          )
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
//# sourceMappingURL=People.react.js.map