'use strict';

exports.__esModule = true;

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Failure = function (_Component) {
  _inherits(Failure, _Component);

  function Failure(props) {
    _classCallCheck(this, Failure);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  Failure.prototype.render = function render() {
    return this.props.children;
  };

  return Failure;
}(_react.Component);

Failure.propTypes = {
  children: _react.PropTypes.node
};
exports.default = Failure;
//# sourceMappingURL=Failure.react.js.map