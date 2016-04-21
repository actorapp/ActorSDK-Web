'use strict';

exports.__esModule = true;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Root = function (_Component) {
  _inherits(Root, _Component);

  function Root(props) {
    _classCallCheck(this, Root);

    return _possibleConstructorReturn(this, _Component.call(this, props));
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
}(_react.Component);

Root.propTypes = {
  className: _react.PropTypes.string,
  currentState: _react.PropTypes.number.isRequired,
  children: _react.PropTypes.array
};
exports.default = Root;
//# sourceMappingURL=Root.react.js.map