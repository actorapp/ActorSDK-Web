'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Stateful = function (_Component) {
  _inherits(Stateful, _Component);

  function Stateful() {
    _classCallCheck(this, Stateful);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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