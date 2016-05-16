'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actorReactScroll = require('actor-react-scroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var EmojiTab = function (_Component) {
  _inherits(EmojiTab, _Component);

  function EmojiTab(props) {
    _classCallCheck(this, EmojiTab);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }

  EmojiTab.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.category !== this.props.category;
  };

  EmojiTab.prototype.onSelect = function onSelect() {
    this.props.onSelect(this.props.category.title);
  };

  EmojiTab.prototype.onMouseEnter = function onMouseEnter(event) {
    event.stopPropagation();
    event.preventDefault();
    event.target.click();
  };

  EmojiTab.prototype.render = function render() {
    var category = this.props.category;


    return _react2.default.createElement(
      _actorReactScroll.Link,
      {
        spy: true,
        offset: 30,
        duration: 300,
        to: category.title,
        onSetActive: this.onSelect,
        onMouseEnter: this.onMouseEnter,
        containerId: 'emojiContainer',
        className: 'emojis__header__tabs__tab',
        activeClass: 'emojis__header__tabs__tab--active'
      },
      _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: category.icon } })
    );
  };

  return EmojiTab;
}(_react.Component);

EmojiTab.propTypes = {
  category: _react.PropTypes.object.isRequired,
  onSelect: _react.PropTypes.func.isRequired
};
exports.default = EmojiTab;
//# sourceMappingURL=EmojiTab.react.js.map