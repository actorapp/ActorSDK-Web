'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _alert = require('../utils/alert');

var _alert2 = _interopRequireDefault(_alert);

var _UserMenu = require('./common/UserMenu.react');

var _UserMenu2 = _interopRequireDefault(_UserMenu);

var _ToolbarSearch = require('./search/ToolbarSearch.react');

var _ToolbarSearch2 = _interopRequireDefault(_ToolbarSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AppHeader = function (_Component) {
  _inherits(AppHeader, _Component);

  function AppHeader(props) {
    _classCallCheck(this, AppHeader);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var _SharedContainer$get = _SharedContainer2.default.get();

    var appName = _SharedContainer$get.appName;

    _this.appName = appName;
    return _this;
  }

  AppHeader.prototype.handleWriteButtonClick = function handleWriteButtonClick() {
    (0, _alert2.default)('writeButtonClick').then(function () {
      return console.debug('Alert closed');
    });
  };

  AppHeader.prototype.renderWriteButton = function renderWriteButton() {
    var delegate = this.context.delegate;


    if (!delegate.features.writeButton) {
      return null;
    }

    return _react2.default.createElement(
      'button',
      { className: 'toolbar__button', onClick: this.handleWriteButtonClick },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'edit'
      )
    );
  };

  AppHeader.prototype.render = function render() {
    return _react2.default.createElement(
      'header',
      { className: 'toolbar row' },
      _react2.default.createElement(
        'div',
        { className: 'toolbar__aside' },
        _react2.default.createElement(
          'span',
          null,
          this.appName
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'toolbar__controls col-xs' },
        this.renderWriteButton(),
        _react2.default.createElement(_ToolbarSearch2.default, { className: 'toolbar__button' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'toolbar__profile' },
        _react2.default.createElement(_UserMenu2.default, { className: 'toolbar__button' })
      )
    );
  };

  return AppHeader;
}(_react.Component);

AppHeader.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
exports.default = AppHeader;
//# sourceMappingURL=Toolbar.react.js.map