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

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _fuzzaldrin = require('fuzzaldrin');

var _fuzzaldrin2 = _interopRequireDefault(_fuzzaldrin);

var _ModalCloseButton = require('./ModalCloseButton.react');

var _ModalCloseButton2 = _interopRequireDefault(_ModalCloseButton);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _GroupListActionCreators = require('../../actions/GroupListActionCreators');

var _GroupListActionCreators2 = _interopRequireDefault(_GroupListActionCreators);

var _GroupListStore = require('../../stores/GroupListStore');

var _GroupListStore2 = _interopRequireDefault(_GroupListStore);

var _Group = require('./groups/Group.react');

var _Group2 = _interopRequireDefault(_Group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GroupList = function (_Component) {
  _inherits(GroupList, _Component);

  GroupList.getStores = function getStores() {
    return [_GroupListStore2.default];
  };

  GroupList.calculateState = function calculateState(prevState) {
    return _extends({}, prevState, {
      selectedIndex: 0,
      list: _GroupListStore2.default.getState()
    });
  };

  function GroupList(props) {
    _classCallCheck(this, GroupList);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      query: null,
      selectedIndex: 0
    };

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleSearchChange = _this.handleSearchChange.bind(_this);
    _this.handleGroupSelect = _this.handleGroupSelect.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  GroupList.prototype.componentDidMount = function componentDidMount() {
    this.setFocus();
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  GroupList.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  GroupList.prototype.setFocus = function setFocus() {
    (0, _reactDom.findDOMNode)(this.refs.search).focus();
  };

  GroupList.prototype.handleClose = function handleClose() {
    _GroupListActionCreators2.default.close();
  };

  GroupList.prototype.handleSearchChange = function handleSearchChange(event) {
    var query = event.target.value;
    this.setState({ query: query });
  };

  GroupList.prototype.handleGroupSelect = function handleGroupSelect(peer) {
    var peerStr = _PeerUtils2.default.peerToString(peer);
    _history2.default.push('/im/' + peerStr);
    this.handleClose();
  };

  GroupList.prototype.handleKeyDown = function handleKeyDown(event) {
    var _this2 = this;

    var selectedIndex = this.state.selectedIndex;

    var results = this.getList();
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
        this.handleGroupSelect(results[selectedIndex].peerInfo.peer);
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

  GroupList.prototype.handleScroll = function handleScroll(top) {
    (0, _reactDom.findDOMNode)(this.refs.results).scrollTop = top;
  };

  GroupList.prototype.getList = function getList() {
    var _state = this.state;
    var query = _state.query;
    var list = _state.list;


    if (!query || query === '') return list;

    return list.filter(function (group) {
      return _fuzzaldrin2.default.score(group.peerInfo.title, query) > 0;
    });
  };

  GroupList.prototype.renderSearchInput = function renderSearchInput() {
    var query = this.state.query;
    var intl = this.context.intl;


    return _react2.default.createElement(
      'section',
      { className: 'large-search' },
      _react2.default.createElement('input', { className: 'input',
        onChange: this.handleSearchChange,
        placeholder: intl.messages['modal.groups.search'],
        type: 'search',
        ref: 'search',
        value: query })
    );
  };

  GroupList.prototype.renderList = function renderList() {
    var _this3 = this;

    var _state2 = this.state;
    var query = _state2.query;
    var selectedIndex = _state2.selectedIndex;
    var list = _state2.list;

    var results = this.getList();

    if (list.length === 0) {
      return _react2.default.createElement(
        'div',
        { className: 'result-list__item result-list__item--empty text-center' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.groups.loading' })
      );
    }

    if (results.length === 0) {
      return _react2.default.createElement(
        'div',
        { className: 'result-list__item result-list__item--empty text-center' },
        _react2.default.createElement(_reactIntl.FormattedHTMLMessage, { id: 'modal.groups.notFound', values: { query: query } })
      );
    }

    return results.map(function (result, index) {
      return _react2.default.createElement(_Group2.default, {
        group: result,
        key: index,
        isSelected: selectedIndex === index,
        ref: selectedIndex === index ? 'selected' : null,
        onClick: _this3.handleGroupSelect,
        onMouseOver: function onMouseOver() {
          return _this3.setState({ selectedIndex: index });
        }
      });
    });
  };

  GroupList.prototype.render = function render() {
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
        { className: 'group-list' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.groups.title', tagName: 'h1' })
          ),
          this.renderSearchInput(),
          _react2.default.createElement(
            'div',
            { className: 'modal__body', ref: 'results' },
            _react2.default.createElement(
              'div',
              { className: 'result-list' },
              this.renderList()
            )
          )
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
//# sourceMappingURL=Groups.react.js.map