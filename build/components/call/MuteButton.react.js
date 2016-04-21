'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var MuteButton = function (_Component) {
  _inherits(MuteButton, _Component);

  function MuteButton() {
    _classCallCheck(this, MuteButton);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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