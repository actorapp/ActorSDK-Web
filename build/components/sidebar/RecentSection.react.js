'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _QuickSearchActionCreators = require('../../actions/QuickSearchActionCreators');

var _QuickSearchActionCreators2 = _interopRequireDefault(_QuickSearchActionCreators);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _QuickSearchStore = require('../../stores/QuickSearchStore');

var _QuickSearchStore2 = _interopRequireDefault(_QuickSearchStore);

var _RecentSectionItem = require('./RecentSectionItem.react');

var _RecentSectionItem2 = _interopRequireDefault(_RecentSectionItem);

var _ContactsSectionItem = require('./ContactsSectionItem.react');

var _ContactsSectionItem2 = _interopRequireDefault(_ContactsSectionItem);

var _QuickSearch = require('../modals/QuickSearch.react');

var _QuickSearch2 = _interopRequireDefault(_QuickSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LoadDialogsScrollBottom = 100;

var getStateFromStore = function getStateFromStore() {
  return {
    dialogs: _DialogStore2.default.getAll(),
    isQuickSearchOpen: _QuickSearchStore2.default.isOpen()
  };
};

var RecentSection = (function (_Component) {
  _inherits(RecentSection, _Component);

  function RecentSection(props) {
    _classCallCheck(this, RecentSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecentSection).call(this, props));

    _this.onChange = function () {
      return _this.setState(getStateFromStore());
    };

    _this.onScroll = function (event) {
      var _event$target = event.target;
      var scrollHeight = _event$target.scrollHeight;
      var scrollTop = _event$target.scrollTop;
      var clientHeight = _event$target.clientHeight;

      if (scrollHeight - scrollTop - clientHeight <= LoadDialogsScrollBottom) {
        _DialogActionCreators2.default.onDialogsEnd();
      }
    };

    _this.openQuickSearch = function () {
      return _QuickSearchActionCreators2.default.show();
    };

    _this.state = getStateFromStore();

    _DialogStore2.default.addChangeListener(_this.onChange);
    _QuickSearchStore2.default.addListener(_this.onChange);
    return _this;
  }

  _createClass(RecentSection, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _DialogStore2.default.removeChangeListener(this.onChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var dialogs = _state.dialogs;
      var isQuickSearchOpen = _state.isQuickSearchOpen;

      var dialogList = (0, _lodash.map)(dialogs, function (dialog, index) {
        return _react2.default.createElement(_RecentSectionItem2.default, { dialog: dialog, key: index });
      }, this);

      return _react2.default.createElement(
        'section',
        { className: 'sidebar__recent' },
        _react2.default.createElement(
          'div',
          { className: 'sidebar__recent__scroll-container', onScroll: this.onScroll },
          _react2.default.createElement(
            'ul',
            { className: 'sidebar__list' },
            dialogList
          )
        ),
        _react2.default.createElement(
          'footer',
          null,
          _react2.default.createElement(
            'a',
            { className: 'sidebar__recent__quick-search', onClick: this.openQuickSearch },
            _react2.default.createElement(
              'div',
              { className: 'icon-holder' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'search'
              )
            ),
            'Quick Search'
          )
        ),
        isQuickSearchOpen ? _react2.default.createElement(_QuickSearch2.default, null) : null
      );
    }
  }]);

  return RecentSection;
})(_react.Component);

_reactMixin2.default.onClass(RecentSection, _reactIntl.IntlMixin);

exports.default = RecentSection;
//# sourceMappingURL=RecentSection.react.js.map