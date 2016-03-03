'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _HeaderSection = require('./sidebar/HeaderSection.react');

var _HeaderSection2 = _interopRequireDefault(_HeaderSection);

var _Recent = require('./sidebar/Recent.react');

var _Recent2 = _interopRequireDefault(_Recent);

var _QuickSearchButton = require('./sidebar/QuickSearchButton.react');

var _QuickSearchButton2 = _interopRequireDefault(_QuickSearchButton);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SidebarSection = (function (_Component) {
  _inherits(SidebarSection, _Component);

  function SidebarSection(props) {
    _classCallCheck(this, SidebarSection);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  SidebarSection.calculateState = function calculateState() {
    return {
      dialogs: _DialogStore2.default.getDialogs()
    };
  };

  SidebarSection.prototype.render = function render() {
    var delegate = this.context.delegate;
    var dialogs = this.state.dialogs;

    var HeaderSection = undefined,
        Recent = undefined,
        FooterSection = undefined;
    if (delegate.components.sidebar !== null && typeof delegate.components.sidebar !== 'function') {
      HeaderSection = delegate.components.sidebar.header || _HeaderSection2.default;
      Recent = delegate.components.sidebar.recent || _Recent2.default;
      FooterSection = delegate.components.sidebar.footer || _QuickSearchButton2.default;
    } else {
      HeaderSection = _HeaderSection2.default;
      Recent = _Recent2.default;
      FooterSection = _QuickSearchButton2.default;
    }

    return _react2.default.createElement(
      'aside',
      { className: 'sidebar' },
      _react2.default.createElement(HeaderSection, null),
      _react2.default.createElement(Recent, { dialogs: dialogs }),
      _react2.default.createElement(FooterSection, null)
    );
  };

  return SidebarSection;
})(_react.Component);

SidebarSection.getStores = function () {
  return [_DialogStore2.default];
};

SidebarSection.contextTypes = {
  delegate: _react.PropTypes.object
};
exports.default = _utils.Container.create(SidebarSection, { pure: false });
//# sourceMappingURL=Sidebar.react.js.map