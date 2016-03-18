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

var VideoButton = function (_Component) {
  (0, _inherits3.default)(VideoButton, _Component);

  function VideoButton() {
    (0, _classCallCheck3.default)(this, VideoButton);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  VideoButton.prototype.render = function render() {
    return _react2.default.createElement(
      'button',
      { className: 'button button--square col-xs', disabled: true, onClick: this.props.onClick },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'videocam'
      ),
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.video' })
    );
  };

  return VideoButton;
}(_react.Component);

VideoButton.propTypes = {
  onClick: _react.PropTypes.func.isRequired
};
exports.default = VideoButton;
//# sourceMappingURL=VideoButton.react.js.map