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

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var State = function (_Component) {
  (0, _inherits3.default)(State, _Component);

  function State() {
    (0, _classCallCheck3.default)(this, State);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  State.prototype.renderState = function renderState() {
    var state = this.props.message.state;


    switch (state) {
      case _ActorAppConstants.MessageStates.PENDING:
        return _react2.default.createElement(
          'i',
          { className: 'status status--pending material-icons' },
          'access_time'
        );
      case _ActorAppConstants.MessageStates.SENT:
        return _react2.default.createElement(
          'i',
          { className: 'status status--sent material-icons' },
          'done'
        );
      case _ActorAppConstants.MessageStates.RECEIVED:
        return _react2.default.createElement(
          'i',
          { className: 'status status--received material-icons' },
          'done_all'
        );
      case _ActorAppConstants.MessageStates.READ:
        return _react2.default.createElement(
          'i',
          { className: 'status status--read material-icons' },
          'done_all'
        );
      case _ActorAppConstants.MessageStates.ERROR:
        return _react2.default.createElement(
          'i',
          { className: 'status status--error material-icons' },
          'report_problem'
        );
      case _ActorAppConstants.MessageStates.UNKNOWN:
      default:
        return null;
    }
  };

  State.prototype.render = function render() {
    var message = this.props.message;


    if (message.content.content === _ActorAppConstants.MessageContentTypes.SERVICE) {
      return null;
    }

    var state = this.renderState();
    if (!state) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      { className: 'message__status' },
      state
    );
  };

  return State;
}(_react.Component);

State.propTypes = {
  message: _react.PropTypes.shape({
    state: _react.PropTypes.oneOf([_ActorAppConstants.MessageStates.PENDING, _ActorAppConstants.MessageStates.SENT, _ActorAppConstants.MessageStates.RECEIVED, _ActorAppConstants.MessageStates.READ, _ActorAppConstants.MessageStates.ERROR, _ActorAppConstants.MessageStates.UNKNOWN]).isRequired
  }).isRequired
};
exports.default = State;
//# sourceMappingURL=State.react.js.map