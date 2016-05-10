'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var State = function (_Component) {
  _inherits(State, _Component);

  function State() {
    _classCallCheck(this, State);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  State.prototype.renderState = function renderState() {
    var state = this.props.state;


    switch (state) {
      case _ActorAppConstants.MessageStates.PENDING:
        return _react2.default.createElement('i', { className: 'status status--pending material-icons icon-access_time' });
      case _ActorAppConstants.MessageStates.SENT:
        return _react2.default.createElement('i', { className: 'status status--sent material-icons icon-done' });
      case _ActorAppConstants.MessageStates.RECEIVED:
        return _react2.default.createElement('i', { className: 'status status--received material-icons icon-done_all' });
      case _ActorAppConstants.MessageStates.READ:
        return _react2.default.createElement('i', { className: 'status status--read material-icons icon-done_all' });
      case _ActorAppConstants.MessageStates.ERROR:
        return _react2.default.createElement('i', { className: 'status status--error material-icons icon-report_problem' });
      case _ActorAppConstants.MessageStates.UNKNOWN:
      default:
        return null;
    }
  };

  State.prototype.render = function render() {
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
  state: _react.PropTypes.oneOf([_ActorAppConstants.MessageStates.PENDING, _ActorAppConstants.MessageStates.SENT, _ActorAppConstants.MessageStates.RECEIVED, _ActorAppConstants.MessageStates.READ, _ActorAppConstants.MessageStates.ERROR, _ActorAppConstants.MessageStates.UNKNOWN]).isRequired
};
exports.default = State;
//# sourceMappingURL=State.react.js.map