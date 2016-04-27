'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SidebarLink = function (_Component) {
  _inherits(SidebarLink, _Component);

  function SidebarLink(props) {
    _classCallCheck(this, SidebarLink);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  SidebarLink.prototype.render = function render() {
    var _props = this.props;
    var to = _props.to;
    var title = _props.title;
    var glyph = _props.glyph;
    var className = _props.className;

    var buttonClassName = (0, _classnames2.default)('sidebar__button', className);

    return _react2.default.createElement(
      _reactRouter.Link,
      { to: to, className: buttonClassName, activeClassName: 'sidebar__button--active' },
      _react2.default.createElement(
        'div',
        { className: 'sidebar__button__icon' },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          glyph
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'sidebar__button__title' },
        title
      )
    );
  };

  return SidebarLink;
}(_react.Component);

SidebarLink.propTypes = {
  to: _react.PropTypes.string.isRequired,
  title: _react.PropTypes.node.isRequired,
  glyph: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string
};
exports.default = SidebarLink;
//# sourceMappingURL=SidebarLink.react.js.map