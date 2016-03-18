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

var _JoinGroupActions = require('../actions/JoinGroupActions');

var _JoinGroupActions2 = _interopRequireDefault(_JoinGroupActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Join = function (_Component) {
  (0, _inherits3.default)(Join, _Component);

  function Join(props) {
    (0, _classCallCheck3.default)(this, Join);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _JoinGroupActions2.default.joinGroupViaLink(props.params.token);
    return _this;
  }

  Join.prototype.render = function render() {
    return null;
  };

  return Join;
}(_react.Component);

Join.propTypes = {
  params: _react.PropTypes.object
};
exports.default = Join;
//# sourceMappingURL=Join.react.js.map