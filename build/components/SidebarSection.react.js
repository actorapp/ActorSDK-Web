'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HeaderSection = require('./sidebar/HeaderSection.react');

var _HeaderSection2 = _interopRequireDefault(_HeaderSection);

var _RecentSection = require('./sidebar/RecentSection.react');

var _RecentSection2 = _interopRequireDefault(_RecentSection);

var _QuickSearchButton = require('./sidebar/QuickSearchButton.react');

var _QuickSearchButton2 = _interopRequireDefault(_QuickSearchButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SidebarSection = (function (_Component) {
  _inherits(SidebarSection, _Component);

  function SidebarSection(props) {
    _classCallCheck(this, SidebarSection);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SidebarSection).call(this, props));
  }

  _createClass(SidebarSection, [{
    key: 'render',
    value: function render() {
      var selectedPeer = this.props.selectedPeer;
      var delegate = this.context.delegate;

      var RecentSection = delegate.components.recent || _RecentSection2.default;

      return _react2.default.createElement(
        'aside',
        { className: 'sidebar' },
        _react2.default.createElement(_HeaderSection2.default, null),
        _react2.default.createElement(RecentSection, { selectedPeer: selectedPeer }),
        _react2.default.createElement(_QuickSearchButton2.default, null)
      );
    }
  }]);

  return SidebarSection;
})(_react.Component);

SidebarSection.contextTypes = {
  delegate: _react.PropTypes.object
};
SidebarSection.propTypes = {
  selectedPeer: _react.PropTypes.object.isRequired
};
exports.default = SidebarSection;
//# sourceMappingURL=SidebarSection.react.js.map