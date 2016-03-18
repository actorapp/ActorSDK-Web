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

var _ActorAppConstants = require('../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

var Stateful = function (_Component) {
  (0, _inherits3.default)(Stateful, _Component);

  function Stateful() {
    (0, _classCallCheck3.default)(this, Stateful);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Stateful.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.currentState !== nextProps.currentState;
  };

  Stateful.prototype.renderState = function renderState() {
    var _props = this.props;
    var currentState = _props.currentState;
    var processing = _props.processing;
    var pending = _props.pending;
    var success = _props.success;
    var failure = _props.failure;

    switch (currentState) {
      case _ActorAppConstants.AsyncActionStates.PENDING:
        return pending || _react2.default.createElement('div', null);
      case _ActorAppConstants.AsyncActionStates.PROCESSING:
        return processing || _react2.default.createElement('div', null);
      case _ActorAppConstants.AsyncActionStates.SUCCESS:
        return success || _react2.default.createElement('div', null);
      case _ActorAppConstants.AsyncActionStates.FAILURE:
        return failure || _react2.default.createElement('div', null);
      default:
    }
  };

  Stateful.prototype.render = function render() {
    var className = this.props.className;


    return _react2.default.createElement(
      'div',
      { className: className },
      this.renderState()
    );
  };

  return Stateful;
}(_react.Component);

Stateful.propTypes = {
  className: _react.PropTypes.string,
  currentState: _react.PropTypes.oneOf([_ActorAppConstants.AsyncActionStates.PENDING, _ActorAppConstants.AsyncActionStates.PROCESSING, _ActorAppConstants.AsyncActionStates.SUCCESS, _ActorAppConstants.AsyncActionStates.FAILURE]).isRequired,
  processing: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.node]),
  pending: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.node]),
  success: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.node]),
  failure: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.node])
};
exports.default = Stateful;
//# sourceMappingURL=Stateful.react.js.map