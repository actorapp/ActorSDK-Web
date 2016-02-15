'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var QuickSearchButton = (function (_Component) {
  _inherits(QuickSearchButton, _Component);

  function QuickSearchButton(props) {
    _classCallCheck(this, QuickSearchButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(QuickSearchButton).call(this, props));

    _this.openQuickSearch = function () {
      return _QuickSearchActionCreators2.default.show();
    };

    return _this;
  }

  _createClass(QuickSearchButton, [{
    key: 'render',
    value: function render() {
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
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        isQuickSearchOpen: _QuickSearchStore2.default.isOpen()
      };
    }
  }]);

  return QuickSearchButton;
})(_react.Component);

QuickSearchButton.getStores = function () {
  return [_QuickSearchStore2.default];
};

QuickSearchButton.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(QuickSearchButton, { pure: false });
//# sourceMappingURL=QuickSearchButton.react.js.map