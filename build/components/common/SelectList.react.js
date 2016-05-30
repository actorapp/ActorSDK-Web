'use strict';

exports.__esModule = true;
exports.SelectContextType = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SelectContextType = exports.SelectContextType = _react.PropTypes.shape({
  current: _react.PropTypes.number.isRequired,
  setCurrent: _react.PropTypes.func.isRequired
});

var SelectList = function (_Component) {
  _inherits(SelectList, _Component);

  function SelectList(props) {
    _classCallCheck(this, SelectList);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      current: 0
    };

    _this.setCurrent = _this.setCurrent.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  SelectList.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextState.current !== this.state.current || nextProps.children !== this.props.children || nextProps.max !== this.props.max || nextProps.className !== this.props.className;
  };

  SelectList.prototype.getChildContext = function getChildContext() {
    return {
      select: {
        current: this.state.current,
        setCurrent: this.setCurrent
      }
    };
  };

  SelectList.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  SelectList.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  SelectList.prototype.handleSelect = function handleSelect() {
    this.props.onSelect(this.state.current);
  };

  SelectList.prototype.handleNext = function handleNext() {
    var next = this.state.current + 1;
    this.setCurrent(next > this.props.max ? 0 : next);
  };

  SelectList.prototype.handlePrevious = function handlePrevious() {
    var next = this.state.current - 1;
    this.setCurrent(next < 0 ? this.props.max : next);
  };

  SelectList.prototype.handleKeyDown = function handleKeyDown(event) {
    switch (event.keyCode) {
      case _ActorAppConstants.KeyCodes.ENTER:
        this.handleSelect();
        break;

      case _ActorAppConstants.KeyCodes.ARROW_UP:
        this.handlePrevious();
        break;

      case _ActorAppConstants.KeyCodes.TAB:
      case _ActorAppConstants.KeyCodes.ARROW_DOWN:
        this.handleNext();
        break;

      default:
        return;
    }

    event.stopPropagation();
    event.preventDefault();
  };

  SelectList.prototype.render = function render() {
    console.debug(this.state);
    return _react2.default.createElement(
      'div',
      { className: this.props.className },
      this.props.children
    );
  };

  SelectList.prototype.setCurrent = function setCurrent(current) {
    this.setState({ current: current });
  };

  return SelectList;
}(_react.Component);

SelectList.childContextTypes = {
  select: SelectContextType
};
SelectList.propTypes = {
  className: _react.PropTypes.string,
  max: _react.PropTypes.number.isRequired,
  children: _react.PropTypes.node.isRequired,
  onSelect: _react.PropTypes.func.isRequired
};
exports.default = SelectList;
//# sourceMappingURL=SelectList.react.js.map