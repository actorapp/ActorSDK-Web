'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var EndButton = function (_Component) {
  _inherits(EndButton, _Component);

  function EndButton() {
    _classCallCheck(this, EndButton);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  EndButton.prototype.render = function render() {
    var className = (0, _classnames2.default)('button', {
      'button--rised button--pink button--wide': !this.props.small,
      'button--square col-xs': this.props.small
    });

    return _react2.default.createElement(
      'button',
      { className: className, onClick: this.props.onClick },
      _react2.default.createElement(
        'i',
        { className: 'material-icons', key: 'icon' },
        'call_end'
      ),
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.end', key: 'message' })
    );
  };

  return EndButton;
}(_react.Component);

EndButton.propTypes = {
  onClick: _react.PropTypes.func.isRequired,
  small: _react.PropTypes.bool
};
exports.default = EndButton;
//# sourceMappingURL=EndButton.react.js.map