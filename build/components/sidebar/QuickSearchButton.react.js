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

var _QuickSearchActionCreators = require('../../actions/QuickSearchActionCreators');

var _QuickSearchActionCreators2 = _interopRequireDefault(_QuickSearchActionCreators);

var _QuickSearchStore = require('../../stores/QuickSearchStore');

var _QuickSearchStore2 = _interopRequireDefault(_QuickSearchStore);

var _QuickSearch = require('../modals/QuickSearch.react');

var _QuickSearch2 = _interopRequireDefault(_QuickSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuickSearchButton = function (_Component) {
  (0, _inherits3.default)(QuickSearchButton, _Component);

  function QuickSearchButton(props) {
    (0, _classCallCheck3.default)(this, QuickSearchButton);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.openQuickSearch = function () {
      return _QuickSearchActionCreators2.default.show();
    };

    return _this;
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
    var intl = this.context.intl;


    return _react2.default.createElement(
      'footer',
      { className: 'sidebar__quick-search' },
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
        intl.messages['button.quickSearch']
      ),
      isQuickSearchOpen ? _react2.default.createElement(_QuickSearch2.default, null) : null
    );
  };

  return QuickSearchButton;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

QuickSearchButton.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(QuickSearchButton, { pure: false });
//# sourceMappingURL=QuickSearchButton.react.js.map