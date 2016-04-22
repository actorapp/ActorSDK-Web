"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      isAtStart: props.current === 0,
      isAtEnd: props.current === props.total
    };

    _this.handlePrevClick = _this.handlePrevClick.bind(_this);
    _this.handleNextClick = _this.handleNextClick.bind(_this);
    return _this;
  }

  Pagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({
      isAtStart: nextProps.current === 0,
      isAtEnd: nextProps.current === nextProps.total
    });
  };

  Pagination.prototype.handlePrevClick = function handlePrevClick() {
    var _props = this.props;
    var current = _props.current;
    var onChange = _props.onChange;


    if (current !== 0) {
      onChange(current - 1);
    }
  };

  Pagination.prototype.handleNextClick = function handleNextClick() {
    var _props2 = this.props;
    var current = _props2.current;
    var total = _props2.total;
    var onChange = _props2.onChange;


    if (current !== total) {
      onChange(current + 1);
    }
  };

  Pagination.prototype.renderPrevArrow = function renderPrevArrow() {
    var isAtStart = this.state.isAtStart;


    if (isAtStart) {
      return _react2.default.createElement(
        "div",
        { className: "pagination__control pagination__control--disabled" },
        _react2.default.createElement(
          "i",
          { className: "material-icons" },
          "keyboard_arrow_left"
        )
      );
    }

    return _react2.default.createElement(
      "div",
      { className: "pagination__control", onClick: this.handlePrevClick },
      _react2.default.createElement(
        "i",
        { className: "material-icons" },
        "keyboard_arrow_left"
      )
    );
  };

  Pagination.prototype.renderPager = function renderPager() {
    var _props3 = this.props;
    var current = _props3.current;
    var total = _props3.total;


    return _react2.default.createElement(
      "div",
      { className: "pagination__pager" },
      current + 1,
      " / ",
      total + 1
    );
  };

  Pagination.prototype.renderNextArrow = function renderNextArrow() {
    var isAtEnd = this.state.isAtEnd;


    if (isAtEnd) {
      return _react2.default.createElement(
        "div",
        { className: "pagination__control pagination__control--disabled" },
        _react2.default.createElement(
          "i",
          { className: "material-icons" },
          "keyboard_arrow_right"
        )
      );
    }

    return _react2.default.createElement(
      "div",
      { className: "pagination__control", onClick: this.handleNextClick },
      _react2.default.createElement(
        "i",
        { className: "material-icons" },
        "keyboard_arrow_right"
      )
    );
  };

  Pagination.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { className: "pagination" },
      this.renderPrevArrow(),
      this.renderPager(),
      this.renderNextArrow()
    );
  };

  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  current: _react.PropTypes.number.isRequired,
  total: _react.PropTypes.number.isRequired,
  onChange: _react.PropTypes.func.isRequired
};
exports.default = Pagination;
//# sourceMappingURL=Pagination.react.js.map