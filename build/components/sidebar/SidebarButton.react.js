'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SidebarButton = function (_Component) {
  _inherits(SidebarButton, _Component);

  function SidebarButton(props) {
    _classCallCheck(this, SidebarButton);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  SidebarButton.prototype.render = function render() {
    var _props = this.props;
    var title = _props.title;
    var glyph = _props.glyph;
    var onClick = _props.onClick;


    return _react2.default.createElement(
      'div',
      { className: 'recent__history', onClick: onClick },
      _react2.default.createElement(
        'div',
        { className: 'recent__history__icon' },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          glyph
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'recent__history__title' },
        title
      )
    );
  };

  return SidebarButton;
}(_react.Component);

SidebarButton.propTypes = {
  title: _react.PropTypes.node.isRequired,
  glyph: _react.PropTypes.string.isRequired,
  onClick: _react.PropTypes.func.isRequired
};
exports.default = SidebarButton;
//# sourceMappingURL=SidebarButton.react.js.map