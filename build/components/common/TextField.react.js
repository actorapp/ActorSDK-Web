'use strict';

exports.__esModule = true;

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextField = function (_Component) {
  (0, _inherits3.default)(TextField, _Component);

  function TextField(props) {
    (0, _classCallCheck3.default)(this, TextField);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.focus = function () {
      var ref = _this.props.ref;

      var input = _this.props.ref || _this.refs.input;
      if (!input) {
        return;
      }

      (0, _setImmediate3.default)(function () {
        (0, _reactDom.findDOMNode)(input).focus();
      });
    };

    _this.handleChange = function (event) {
      var onChange = _this.props.onChange;

      onChange && onChange(event);
    };

    _this.handleFocus = function (event) {
      var onFocus = _this.props.onFocus;

      _this.setState({ isFocused: true });
      onFocus && onFocus(event);
    };

    _this.handleBlur = function (event) {
      var onBlur = _this.props.onBlur;

      _this.setState({ isFocused: false });
      onBlur && onBlur(event);
    };

    _this.state = {
      isFocused: false,
      inputId: 'input-' + Math.random().toString(36).substr(2, 5)
    };
    return _this;
  }

  TextField.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var floatingLabel = _props.floatingLabel;
    var type = _props.type;
    var value = _props.value;
    var ref = _props.ref;
    var disabled = _props.disabled;
    var errorText = _props.errorText;
    var _state = this.state;
    var isFocused = _state.isFocused;
    var inputId = _state.inputId;


    var inputClassName = (0, _classnames2.default)('input input__material', className, {
      'input__material--focus': isFocused,
      'input__material--filled': value && value.length > 0,
      'input__material--disabled': disabled,
      'input__material--with-error': errorText
    });

    var inputProps = {
      type: type || 'text',
      id: inputId,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      value: value,
      disabled: disabled,
      ref: ref ? ref : 'input'
    };

    return _react2.default.createElement(
      'div',
      { className: inputClassName },
      floatingLabel ? _react2.default.createElement(
        'label',
        { htmlFor: inputId, onMouseDown: this.focus },
        floatingLabel
      ) : null,
      _react2.default.createElement('input', inputProps),
      errorText ? _react2.default.createElement(
        'span',
        { className: 'error' },
        errorText
      ) : null
    );
  };

  return TextField;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

TextField.propTypes = {
  className: _react.PropTypes.string,
  floatingLabel: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
  type: _react.PropTypes.string,
  value: _react.PropTypes.string,
  ref: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  errorText: _react.PropTypes.string,

  onChange: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func
};
exports.default = TextField;
//# sourceMappingURL=TextField.react.js.map