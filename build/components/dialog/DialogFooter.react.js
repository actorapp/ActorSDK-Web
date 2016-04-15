'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TypingSection = require('./TypingSection.react');

var _TypingSection2 = _interopRequireDefault(_TypingSection);

var _ComposeSection = require('./ComposeSection.react');

var _ComposeSection2 = _interopRequireDefault(_ComposeSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var DialogFooter = function (_Component) {
  (0, _inherits3.default)(DialogFooter, _Component);

  function DialogFooter(props, context) {
    (0, _classCallCheck3.default)(this, DialogFooter);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));

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
    if (!this.props.isMember) {
      return _react2.default.createElement(
        'footer',
        { className: 'chat__footer chat__footer--disabled row center-xs middle-xs' },
        _react2.default.createElement(
          'h3',
          null,
          'You are not a member'
        )
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
  isMember: _react.PropTypes.bool.isRequired
};
exports.default = DialogFooter;
//# sourceMappingURL=DialogFooter.react.js.map