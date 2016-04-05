'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchInput = function (_Component) {
  (0, _inherits3.default)(SearchInput, _Component);

  function SearchInput(props) {
    (0, _classCallCheck3.default)(this, SearchInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onClear = _this.onClear.bind(_this);
    return _this;
  }

  SearchInput.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  };

  SearchInput.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  };

  SearchInput.prototype.onChange = function onChange(event) {
    this.props.onChange(event.target.value);
  };

  SearchInput.prototype.onFocus = function onFocus() {
    if (this.props.value.length) {
      this.props.onToggleOpen(true);
    }

    this.props.onToggleFocus(true);
  };

  SearchInput.prototype.onBlur = function onBlur() {
    if (!this.props.value.length) {
      this.props.onToggleOpen(false);
    }

    this.props.onToggleFocus(false);
  };

  SearchInput.prototype.onClear = function onClear() {
    this.props.onChange('');
    this.props.onToggleOpen(false);
    this.props.onToggleFocus(false);
  };

  SearchInput.prototype.onKeyDown = function onKeyDown(event) {
    if (this.props.isOpen && event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      event.preventDefault();
      this.onClear();
    }
  };

  SearchInput.prototype.renderClose = function renderClose() {
    if (!this.props.value.length) {
      return null;
    }

    return _react2.default.createElement(
      'i',
      { className: 'close-icon material-icons', onClick: this.onClear },
      'close'
    );
  };

  SearchInput.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var value = _props.value;
    var isFocused = _props.isFocused;
    var intl = this.context.intl;


    var searchClassName = (0, _classnames2.default)('toolbar__search', className, {
      'toolbar__search--focused': isFocused || value.length
    });

    return _react2.default.createElement(
      'div',
      { className: searchClassName },
      _react2.default.createElement('input', {
        className: 'input input--search',
        type: 'search',
        tabIndex: '1',
        value: value,
        placeholder: intl.messages['search.placeholder'],
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onChange: this.onChange
      }),
      _react2.default.createElement(
        'i',
        { className: 'search-icon material-icons' },
        'search'
      ),
      this.renderClose()
    );
  };

  return SearchInput;
}(_react.Component); /*
                      * Copyright (C) 2015 Actor LLC. <https://actor.im>
                      */

SearchInput.contextTypes = {
  intl: _react.PropTypes.object.isRequired
};
SearchInput.propTypes = {
  className: _react.PropTypes.string,
  value: _react.PropTypes.string.isRequired,
  isOpen: _react.PropTypes.bool.isRequired,
  isFocused: _react.PropTypes.bool.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  onToggleOpen: _react.PropTypes.func.isRequired,
  onToggleFocus: _react.PropTypes.func.isRequired
};
exports.default = SearchInput;
//# sourceMappingURL=SearchInput.react.js.map