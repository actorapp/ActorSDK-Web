'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _QuickSearchActionCreators = require('../../actions/QuickSearchActionCreators');

var _QuickSearchActionCreators2 = _interopRequireDefault(_QuickSearchActionCreators);

var _QuickSearchStore = require('../../stores/QuickSearchStore');

var _QuickSearchStore2 = _interopRequireDefault(_QuickSearchStore);

var _QuickSearch = require('../modals/QuickSearch.react');

var _QuickSearch2 = _interopRequireDefault(_QuickSearch);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuickSearchButton = function (_Component) {
  (0, _inherits3.default)(QuickSearchButton, _Component);

  function QuickSearchButton() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, QuickSearchButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.openQuickSearch = function () {
      return _QuickSearchActionCreators2.default.show();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  QuickSearchButton.getStores = function getStores() {
    return [_QuickSearchStore2.default];
  };

  QuickSearchButton.calculateState = function calculateState() {
    return {
      isQuickSearchOpen: _QuickSearchStore2.default.isOpen()
    };
  };

  QuickSearchButton.prototype.render = function render() {
    var isQuickSearchOpen = this.state.isQuickSearchOpen;


    return _react2.default.createElement(
      'footer',
      { className: 'sidebar__quick-search' },
      _react2.default.createElement(
        _rcTooltip2.default,
        {
          placement: 'top',
          mouseEnterDelay: 0.15, mouseLeaveDelay: 0,
          overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.quicksearch' })
        },
        _react2.default.createElement(
          'a',
          { onClick: this.openQuickSearch },
          _react2.default.createElement(
            'div',
            { className: 'icon-holder' },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'search'
            )
          ),
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.quickSearch' })
        )
      ),
      isQuickSearchOpen ? _react2.default.createElement(_QuickSearch2.default, null) : null
    );
  };

  return QuickSearchButton;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

exports.default = _utils.Container.create(QuickSearchButton, { pure: false });
//# sourceMappingURL=QuickSearchButton.react.js.map