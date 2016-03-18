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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoggerRow = function (_Component) {
  (0, _inherits3.default)(LoggerRow, _Component);

  function LoggerRow() {
    (0, _classCallCheck3.default)(this, LoggerRow);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  LoggerRow.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  };

  LoggerRow.prototype.render = function render() {
    var _props$data = this.props.data;
    var tag = _props$data.tag;
    var type = _props$data.type;
    var message = _props$data.message;


    var className = (0, _classnames2.default)('logger__container__row log-entry', {
      'log-entry--info': type === _ActorAppConstants.LoggerTypes.INFO,
      'log-entry--error': type === _ActorAppConstants.LoggerTypes.ERROR,
      'log-entry--warning': type === _ActorAppConstants.LoggerTypes.WARNING,
      'log-entry--debug': type === _ActorAppConstants.LoggerTypes.DEBUG
    });

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'span',
        { className: 'log-entry__tag' },
        tag
      ),
      _react2.default.createElement(
        'span',
        { className: 'log-entry__message' },
        message
      )
    );
  };

  return LoggerRow;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

LoggerRow.propTypes = {
  data: _react.PropTypes.shape({
    tag: _react.PropTypes.string.isRequired,
    type: _react.PropTypes.oneOf([_ActorAppConstants.LoggerTypes.INFO, _ActorAppConstants.LoggerTypes.ERROR, _ActorAppConstants.LoggerTypes.WARNING, _ActorAppConstants.LoggerTypes.DEBUG]).isRequired,
    message: _react.PropTypes.string.isRequired
  }).isRequired
};
exports.default = LoggerRow;
//# sourceMappingURL=LoggerRow.react.js.map