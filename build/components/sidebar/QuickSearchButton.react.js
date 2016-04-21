'use strict';

exports.__esModule = true;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var QuickSearchButton = function (_Component) {
  _inherits(QuickSearchButton, _Component);

  function QuickSearchButton() {
    var _temp, _this, _ret;

    _classCallCheck(this, QuickSearchButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.openQuickSearch = function () {
      return _QuickSearchActionCreators2.default.show();
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
}(_react.Component);

exports.default = _utils.Container.create(QuickSearchButton, { pure: false });
//# sourceMappingURL=QuickSearchButton.react.js.map