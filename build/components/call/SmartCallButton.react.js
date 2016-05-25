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

var SmartCallButton = function (_Component) {
  _inherits(SmartCallButton, _Component);

  function SmartCallButton(props) {
    _classCallCheck(this, SmartCallButton);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleButtonClick = _this.handleButtonClick.bind(_this);
    return _this;
  }

  SmartCallButton.prototype.handleButtonClick = function handleButtonClick() {
    var _props = this.props;
    var call = _props.call;
    var onCallStart = _props.onCallStart;
    var onCallEnd = _props.onCallEnd;


    if (!call.isCalling) {
      onCallStart();
    } else {
      onCallEnd();
    }
  };

  SmartCallButton.prototype.renderButtonIcon = function renderButtonIcon() {
    return _react2.default.createElement(
      'i',
      { className: 'material-icons', style: { fontSize: 22 } },
      'call'
    );
  };

  SmartCallButton.prototype.renderButtonText = function renderButtonText() {
    var call = this.props.call;


    if (!call.isCalling) {
      return null;
    }

    return _react2.default.createElement(_reactIntl.FormattedMessage, {
      id: 'call.state.' + call.state,
      values: { time: call.time }
    });
  };

  SmartCallButton.prototype.render = function render() {
    var call = this.props.call;


    var buttonClassName = (0, _classnames2.default)('button button--icon call__smart-button', {
      'call__smart-button--in-call': call.isCalling
    });

    return _react2.default.createElement(
      'button',
      { className: buttonClassName, onClick: this.handleButtonClick },
      this.renderButtonIcon(),
      this.renderButtonText()
    );
  };

  return SmartCallButton;
}(_react.Component);

SmartCallButton.propTypes = {
  call: _react.PropTypes.object.isRequired,

  onCallStart: _react.PropTypes.func.isRequired,
  onCallEnd: _react.PropTypes.func.isRequired
};
exports.default = SmartCallButton;
//# sourceMappingURL=SmartCallButton.react.js.map