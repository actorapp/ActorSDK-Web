"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pagination = function (_Component) {
  (0, _inherits3.default)(Pagination, _Component);

  function Pagination(props) {
    (0, _classCallCheck3.default)(this, Pagination);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.handlePrevClick = function () {
      var _this$props = _this.props;
      var current = _this$props.current;
      var onChange = _this$props.onChange;


      if (current !== 0) {
        onChange(current - 1);
      }
    };

    _this.handleNextClick = function () {
      var _this$props2 = _this.props;
      var current = _this$props2.current;
      var total = _this$props2.total;
      var onChange = _this$props2.onChange;


      if (current !== total) {
        onChange(current + 1);
      }
    };

    _this.state = {
      isAtStart: props.current === 0,
      isAtEnd: props.current === props.total
    };
    return _this;
  }

  Pagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({
      isAtStart: nextProps.current === 0,
      isAtEnd: nextProps.current === nextProps.total
    });
  };

  Pagination.prototype.render = function render() {
    var _state = this.state;
    var isAtStart = _state.isAtStart;
    var isAtEnd = _state.isAtEnd;
    var _props = this.props;
    var current = _props.current;
    var total = _props.total;


    return _react2.default.createElement(
      "div",
      { className: "pagination" },
      isAtStart ? _react2.default.createElement(
        "div",
        { className: "pagination__control pagination__control--disabled" },
        _react2.default.createElement(
          "i",
          { className: "material-icons" },
          "keyboard_arrow_left"
        )
      ) : _react2.default.createElement(
        "div",
        { className: "pagination__control", onClick: this.handlePrevClick },
        _react2.default.createElement(
          "i",
          { className: "material-icons" },
          "keyboard_arrow_left"
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "pagination__pager" },
        current + 1,
        " / ",
        total + 1
      ),
      isAtEnd ? _react2.default.createElement(
        "div",
        { className: "pagination__control pagination__control--disabled" },
        _react2.default.createElement(
          "i",
          { className: "material-icons" },
          "keyboard_arrow_right"
        )
      ) : _react2.default.createElement(
        "div",
        { className: "pagination__control", onClick: this.handleNextClick },
        _react2.default.createElement(
          "i",
          { className: "material-icons" },
          "keyboard_arrow_right"
        )
      )
    );
  };

  return Pagination;
}(_react.Component); /*
                      * Copyright (C) 2015 Actor LLC. <https://actor.im>
                      */

Pagination.propTypes = {
  current: _react.PropTypes.number.isRequired,
  total: _react.PropTypes.number.isRequire,
  onChange: _react.PropTypes.func.isRequired
};
exports.default = Pagination;
//# sourceMappingURL=Pagination.react.js.map