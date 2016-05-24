'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DialogSearch = function (_Component) {
  _inherits(DialogSearch, _Component);

  function DialogSearch(props) {
    _classCallCheck(this, DialogSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleQueryChange = _this.handleQueryChange.bind(_this);
    return _this;
  }

  DialogSearch.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.isOpen !== this.props.isOpen || nextProps.query !== this.props.query;
  };

  DialogSearch.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.setCaretToEnd();
    }
  };

  DialogSearch.prototype.handleCancel = function handleCancel() {
    this.props.onCancel();
  };

  DialogSearch.prototype.handleKeyDown = function handleKeyDown(event) {
    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      event.preventDefault();
      this.handleCancel();
    }
  };

  DialogSearch.prototype.handleQueryChange = function handleQueryChange(event) {
    this.props.onChange(event.target.value);
  };

  DialogSearch.prototype.renderContent = function renderContent() {
    var query = this.props.query;


    return _react2.default.createElement(
      'div',
      { className: 'dialog__search row' },
      _react2.default.createElement('input', {
        className: 'dialog__search__input',
        type: 'search',
        ref: 'input',
        placeholder: 'Search messages in this dialog',
        value: query,
        onChange: this.handleQueryChange,
        onKeyDown: this.handleKeyDown
      }),
      _react2.default.createElement(
        'div',
        { className: 'dialog__search__controls' },
        _react2.default.createElement(
          'a',
          { className: 'dialog__search__cancel link link--blue', onClick: this.handleCancel },
          'Cancel'
        )
      )
    );
  };

  DialogSearch.prototype.render = function render() {
    var isOpen = this.props.isOpen;


    return _react2.default.createElement(
      'div',
      { className: 'dialog__search__container' },
      isOpen ? this.renderContent() : null
    );
  };

  DialogSearch.prototype.focus = function focus() {
    var input = this.refs.input;

    if (input) {
      input.focus();
    }
  };

  DialogSearch.prototype.setCaretToEnd = function setCaretToEnd() {
    var input = this.refs.input;

    if (input) {
      input.focus();
      input.selectionStart = input.selectionEnd = input.value.length;
    }
  };

  return DialogSearch;
}(_react.Component);

DialogSearch.propTypes = {
  isOpen: _react.PropTypes.bool.isRequired,
  query: _react.PropTypes.string.isRequired,
  onCancel: _react.PropTypes.func.isRequired,
  onChange: _react.PropTypes.func.isRequired
};
exports.default = DialogSearch;
//# sourceMappingURL=DialogSearch.react.js.map