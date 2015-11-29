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

    _this.handleClose = function () {
      return _GroupListActionCreators2.default.close();
    };

    _this.handleSearchChange = function (event) {
      return _GroupListActionCreators2.default.search(event.target.value);
    };

    _this.handleGroupSelect = function (peer) {
      _DialogActionCreators2.default.selectDialogPeer(peer);
      _this.handleClose();
    };

    return _this;
  }

  _createClass(GroupList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _react2.default.findDOMNode(this.refs.search).focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var groups = _state.groups;
      var searchQuery = _state.searchQuery;

      var groupList = [];

      (0, _lodash.forEach)(groups, function (group, i) {
        var title = group.peerInfo.title.toLowerCase();
        if (title.includes(searchQuery.toLowerCase())) {
          groupList.push(_react2.default.createElement(_Group2.default, { group: group, key: i, onClick: _this2.handleGroupSelect }));
        }
      }, this);

      if (groupList.length === 0) {
        groupList.push(_react2.default.createElement(
          'li',
          { className: 'group__list__item group__list__item--empty text-center' },
          _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
            message: this.getIntlMessage('modal.groups.notFound'),
            query: searchQuery })
        ));
      }

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
            value: searchQuery })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'newmodal__result group__list' },
          groups.length === 0 ? _react2.default.createElement(
            'div',
            null,
            this.getIntlMessage('modal.groups.loading')
          ) : groupList
        )
      );
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        groups: _GroupListStore2.default.getList(),
        searchQuery: _GroupListStore2.default.getSearchQuery()
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