'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _EventListener = require('fbjs/lib/EventListener');

var _EventListener2 = _interopRequireDefault(_EventListener);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _QuickSearchActionCreators = require('../../actions/QuickSearchActionCreators');

var _QuickSearchActionCreators2 = _interopRequireDefault(_QuickSearchActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var QuickSearchButton = function (_Component) {
  _inherits(QuickSearchButton, _Component);

  function QuickSearchButton(props) {
    _classCallCheck(this, QuickSearchButton);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.openQuickSearch = _this.openQuickSearch.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  QuickSearchButton.prototype.componentDidMount = function componentDidMount() {
    this.setListeners();
  };

  QuickSearchButton.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cleanListeners();
  };

  QuickSearchButton.prototype.setListeners = function setListeners() {
    this.cleanListeners();
    this.listeners = [_EventListener2.default.listen(document, 'keydown', this.handleKeyDown)];
  };

  QuickSearchButton.prototype.cleanListeners = function cleanListeners() {
    if (this.listeners) {
      this.listeners.forEach(function (listener) {
        return listener.remove();
      });
      this.listeners = null;
    }
  };

  QuickSearchButton.prototype.handleKeyDown = function handleKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.K && event.metaKey) {
      event.stopPropagation();
      event.preventDefault();
      this.openQuickSearch();
    }
  };

  QuickSearchButton.prototype.openQuickSearch = function openQuickSearch() {
    _QuickSearchActionCreators2.default.show();
  };

  QuickSearchButton.prototype.render = function render() {
    return _react2.default.createElement(
      'footer',
      { className: 'sidebar__quick-search' },
      _react2.default.createElement(
        _rcTooltip2.default,
        {
          placement: 'top',
          mouseEnterDelay: 0.15,
          mouseLeaveDelay: 0,
          overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.quicksearch' }) },
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
      )
    );
  };

  return QuickSearchButton;
}(_react.Component);

exports.default = QuickSearchButton;
//# sourceMappingURL=QuickSearchButton.react.js.map