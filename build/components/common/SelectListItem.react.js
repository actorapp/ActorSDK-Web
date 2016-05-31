'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectList = require('./SelectList.react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SelectListItem = function (_Component) {
  _inherits(SelectListItem, _Component);

  function SelectListItem(props, context) {
    _classCallCheck(this, SelectListItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleMouseOver = _this.handleMouseOver.bind(_this);
    return _this;
  }

  SelectListItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextContext.select.current !== this.context.select.current || nextProps.index !== this.props.index || nextProps.children !== this.props.children;
  };

  SelectListItem.prototype.handleClick = function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.context.select.pick();
  };

  SelectListItem.prototype.handleMouseOver = function handleMouseOver() {
    this.context.select.setCurrent(this.props.index);
  };

  SelectListItem.prototype.render = function render() {
    var _props = this.props;
    var index = _props.index;
    var children = _props.children;

    var isSelected = index === this.context.select.current;
    var className = isSelected && 'selected';

    return _react2.default.createElement(
      'div',
      { className: className, onClick: this.handleClick, onMouseOver: this.handleMouseOver },
      children
    );
  };

  return SelectListItem;
}(_react.Component);

SelectListItem.contextTypes = {
  select: _SelectList.SelectContextType.isRequired
};
SelectListItem.propTypes = {
  index: _react.PropTypes.number.isRequired,
  children: _react.PropTypes.node.isRequired
};
exports.default = SelectListItem;
//# sourceMappingURL=SelectListItem.react.js.map