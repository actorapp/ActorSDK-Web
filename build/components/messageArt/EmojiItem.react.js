"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var EmojiItem = function (_Component) {
  _inherits(EmojiItem, _Component);

  function EmojiItem(props) {
    _classCallCheck(this, EmojiItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }

  EmojiItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.emoji !== this.props.emoji;
  };

  EmojiItem.prototype.onSelect = function onSelect() {
    this.props.onSelect(this.props.emoji.title);
  };

  EmojiItem.prototype.render = function render() {
    var emoji = this.props.emoji;


    return _react2.default.createElement("span", {
      className: "emoji__item",
      onClick: this.onSelect,
      dangerouslySetInnerHTML: { __html: emoji.icon }
    });
  };

  return EmojiItem;
}(_react.Component);

EmojiItem.propTypes = {
  emoji: _react.PropTypes.object.isRequired,
  onSelect: _react.PropTypes.func.isRequired
};
exports.default = EmojiItem;
//# sourceMappingURL=EmojiItem.react.js.map