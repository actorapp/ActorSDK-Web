'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scrollbar = require('../common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _utils = require('flux/utils');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _CreateGroupActionCreators = require('../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _AddContactActionCreators = require('../../actions/AddContactActionCreators');

var _AddContactActionCreators2 = _interopRequireDefault(_AddContactActionCreators);

var _AllDialogsStore = require('../../stores/AllDialogsStore');

var _AllDialogsStore2 = _interopRequireDefault(_AllDialogsStore);

var _RecentSectionItem = require('./RecentSectionItem.react');

var _RecentSectionItem2 = _interopRequireDefault(_RecentSectionItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LoadDialogsScrollBottom = 100;

var RecentSection = (function (_Component) {
  _inherits(RecentSection, _Component);

  function RecentSection(props) {
    _classCallCheck(this, RecentSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecentSection).call(this, props));

    _this.onScroll = function (event) {
      var _event$target = event.target;
      var scrollHeight = _event$target.scrollHeight;
      var scrollTop = _event$target.scrollTop;
      var clientHeight = _event$target.clientHeight;

      if (scrollHeight - scrollTop - clientHeight <= LoadDialogsScrollBottom) {
        _DialogActionCreators2.default.onDialogsEnd();
      }
    };

    _this.handleCreateGroupClick = function () {
      return _CreateGroupActionCreators2.default.open();
    };

    _this.handleAddPeopleClick = function () {
      return _AddContactActionCreators2.default.open();
    };

    return _this;
  }

  _createClass(RecentSection, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var dialogs = this.state.dialogs;

      if (dialogs.length !== 0) {
        var listRect = _react2.default.findDOMNode(this.refs.list).getBoundingClientRect();
        var recentRect = _react2.default.findDOMNode(this.refs.recent).getBoundingClientRect();

        if (listRect.height < recentRect.height) {
          _DialogActionCreators2.default.onDialogsEnd();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var dialogs = this.state.dialogs;

      var dialogList = (0, _lodash.map)(dialogs, function (dialog, index) {
        return _react2.default.createElement(_RecentSectionItem2.default, { dialog: dialog, key: index });
      });
      return _react2.default.createElement(
        'section',
        { className: 'sidebar__recent', ref: 'recent' },
        dialogList.length !== 0 ? _react2.default.createElement(
          _Scrollbar2.default,
          { onScroll: this.onScroll },
          _react2.default.createElement(
            'ul',
            { className: 'sidebar__list', ref: 'list' },
            dialogList
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'sidebar__recent__empty row center-xs middle-xs' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'p',
              null,
              this.getIntlMessage('sidebar.recents.empty.first')
            ),
            _react2.default.createElement(
              'p',
              null,
              this.getIntlMessage('sidebar.recents.empty.second.start'),
              _react2.default.createElement(
                'a',
                { onClick: this.handleCreateGroupClick },
                this.getIntlMessage('sidebar.recents.newDialog')
              ),
              this.getIntlMessage('sidebar.recents.empty.second.or'),
              _react2.default.createElement(
                'a',
                { onClick: this.handleAddPeopleClick },
                this.getIntlMessage('sidebar.recents.addPeople')
              ),
              this.getIntlMessage('sidebar.recents.empty.second.end')
            )
          )
        )
      );
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        dialogs: _AllDialogsStore2.default.getAllDialogs()
      };
    }
  }]);

  return RecentSection;
})(_react.Component);

RecentSection.getStores = function () {
  return [_AllDialogsStore2.default];
};

_reactMixin2.default.onClass(RecentSection, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(RecentSection, { pure: false });
//# sourceMappingURL=RecentSection.react.js.map