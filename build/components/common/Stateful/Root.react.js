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

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _Pending = require('./Pending.react');

var _Pending2 = _interopRequireDefault(_Pending);

var _Processing = require('./Processing.react');

var _Processing2 = _interopRequireDefault(_Processing);

var _Success = require('./Success.react');

var _Success2 = _interopRequireDefault(_Success);

var _Failure = require('./Failure.react');

var _Failure2 = _interopRequireDefault(_Failure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Root = function (_Component) {
  (0, _inherits3.default)(Root, _Component);

  function Root(props) {
    (0, _classCallCheck3.default)(this, Root);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
  }

  Root.prototype.render = function render() {
    var _props = this.props;
    var currentState = _props.currentState;
    var className = _props.className;
    var children = _props.children;


    var equalsState = function equalsState(state, type) {
      return state === _ActorAppConstants.AsyncActionStates.PENDING && type === _Pending2.default || state === _ActorAppConstants.AsyncActionStates.PROCESSING && type === _Processing2.default || state === _ActorAppConstants.AsyncActionStates.SUCCESS && type === _Success2.default || state === _ActorAppConstants.AsyncActionStates.FAILURE && type === _Failure2.default;
    };

    var currentStateChild = (0, _lodash.find)(children, function (child) {
      if (equalsState(currentState, child.type)) return child;
    });

    return _react2.default.createElement(
      'div',
      { className: className },
      currentStateChild
    );
  };

  return Root;
}(_react.Component); /*
                      * Copyright (C) 2015 Actor LLC. <https://actor.im>
                      */

Root.propTypes = {
  className: _react.PropTypes.string,
  currentState: _react.PropTypes.number.isRequired,
  children: _react.PropTypes.array
};
exports.default = Root;
//# sourceMappingURL=Root.react.js.map