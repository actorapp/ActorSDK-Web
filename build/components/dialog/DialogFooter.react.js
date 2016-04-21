'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _TypingSection = require('./TypingSection.react');

var _TypingSection2 = _interopRequireDefault(_TypingSection);

var _ComposeSection = require('./ComposeSection.react');

var _ComposeSection2 = _interopRequireDefault(_ComposeSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DialogFooter = function (_Component) {
  _inherits(DialogFooter, _Component);

  function DialogFooter(props, context) {
    _classCallCheck(this, DialogFooter);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    var dialog = context.delegate.components.dialog;

    if (dialog && !(0, _lodash.isFunction)(dialog)) {
      _this.components = {
        TypingSection: dialog.typing || _TypingSection2.default,
        ComposeSection: dialog.compose || _ComposeSection2.default
      };
    } else {
      _this.components = {
        TypingSection: _TypingSection2.default,
        ComposeSection: _ComposeSection2.default
      };
    }
    return _this;
  }

  DialogFooter.prototype.render = function render() {
    var _props = this.props;
    var isMember = _props.isMember;
    var isBlocked = _props.isBlocked;
    var onUnblock = _props.onUnblock;

    if (!isMember) {
      return _react2.default.createElement(
        'footer',
        { className: 'chat__footer chat__footer--disabled' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'compose.notMemger' })
      );
    }

    if (isBlocked) {
      return _react2.default.createElement(
        'footer',
        { className: 'chat__footer chat__footer--disabled chat__footer--clickable', onClick: onUnblock },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'compose.unblock' })
      );
    }

    var _components = this.components;
    var TypingSection = _components.TypingSection;
    var ComposeSection = _components.ComposeSection;


    return _react2.default.createElement(
      'footer',
      { className: 'chat__footer' },
      _react2.default.createElement(TypingSection, null),
      _react2.default.createElement(ComposeSection, null)
    );
  };

  return DialogFooter;
}(_react.Component);

DialogFooter.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
DialogFooter.propTypes = {
  isMember: _react.PropTypes.bool.isRequired,
  isBlocked: _react.PropTypes.bool.isRequired,
  onUnblock: _react.PropTypes.func.isRequired
};
exports.default = DialogFooter;
//# sourceMappingURL=DialogFooter.react.js.map