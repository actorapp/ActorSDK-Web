'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EventListener = require('fbjs/lib/EventListener');

var _EventListener2 = _interopRequireDefault(_EventListener);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SearchInput = function (_Component) {
  _inherits(SearchInput, _Component);

  function SearchInput(props) {
    _classCallCheck(this, SearchInput);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleClear = _this.handleClear.bind(_this);
    return _this;
  }

  SearchInput.prototype.componentDidMount = function componentDidMount() {
    this.listeners = [_EventListener2.default.listen(document, 'keydown', this.handleKeyDown)];
  };

  SearchInput.prototype.componentWillUnmount = function componentWillUnmount() {
    this.listeners.forEach(function (listener) {
      return listener.remove();
    });
    this.listeners = null;
  };

  SearchInput.prototype.handleBlur = function handleBlur() {
    this.props.onToggleFocus(false);
  };

  SearchInput.prototype.handleFocus = function handleFocus() {
    this.props.onToggleFocus(true);
  };

  SearchInput.prototype.handleChange = function handleChange(event) {
    this.props.onChange(event.target.value);
  };

  SearchInput.prototype.handleClear = function handleClear() {
    this.props.onClear();
    this.props.onChange('');
    this.props.onToggleFocus(false);
  };

  SearchInput.prototype.handleKeyDown = function handleKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.K && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      this.focus();
    }

    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC && this.isFocused()) {
      event.preventDefault();
      this.handleClear();
    }
  };

  SearchInput.prototype.renderInput = function renderInput() {
    var value = this.props.value;
    var intl = this.context.intl;


    return _react2.default.createElement('input', {
      className: 'input input--search col-xs',
      type: 'search',
      ref: 'search',
      tabIndex: '1',
      value: value,
      placeholder: intl.messages['search.placeholder'],
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onChange: this.handleChange
    });
  };

  SearchInput.prototype.renderClear = function renderClear() {
    var value = this.props.value;


    if (!value || !value.length) {
      return null;
    }

    return _react2.default.createElement(
      'i',
      { className: 'close-icon material-icons', onClick: this.handleClear },
      'close'
    );
  };

  SearchInput.prototype.render = function render() {
    var className = this.props.className;

    var searchClassName = (0, _classnames2.default)('row', className);

    return _react2.default.createElement(
      'div',
      { className: searchClassName },
      this.renderInput(),
      this.renderClear()
    );
  };

  SearchInput.prototype.focus = function focus() {
    if (this.refs.search) {
      this.refs.search.focus();
    }
  };

  SearchInput.prototype.isFocused = function isFocused() {
    return document.activeElement === this.refs.search;
  };

  return SearchInput;
}(_react.Component);

SearchInput.contextTypes = {
  intl: _react.PropTypes.object.isRequired
};
SearchInput.propTypes = {
  className: _react.PropTypes.string,
  value: _react.PropTypes.string.isRequired,
  onClear: _react.PropTypes.func.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  onToggleFocus: _react.PropTypes.func.isRequired
};
exports.default = SearchInput;
//# sourceMappingURL=SearchInput.react.js.map