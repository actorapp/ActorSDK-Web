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

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
*/

var MuteButton = function (_Component) {
  (0, _inherits3.default)(MuteButton, _Component);

  function MuteButton() {
    (0, _classCallCheck3.default)(this, MuteButton);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  MuteButton.prototype.renderText = function renderText() {
    return this.props.value ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.unmute' }) : _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.mute' });
  };

  MuteButton.prototype.render = function render() {
    var glyph = this.props.value ? 'mic_off' : 'mic';

    return _react2.default.createElement(
      'button',
      { className: 'button button--square col-xs', onClick: this.props.onToggle },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        glyph
      ),
      this.renderText()
    );
  };

  return MuteButton;
}(_react.Component);

MuteButton.propTypes = {
  value: _react.PropTypes.bool.isRequired,
  onToggle: _react.PropTypes.func.isRequired
};
exports.default = MuteButton;
//# sourceMappingURL=MuteButton.react.js.map