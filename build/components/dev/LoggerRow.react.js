'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LoggerRow = function (_Component) {
  _inherits(LoggerRow, _Component);

  function LoggerRow() {
    _classCallCheck(this, LoggerRow);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  LoggerRow.prototype.render = function render() {
    var _props = this.props;
    var tag = _props.tag;
    var type = _props.type;
    var message = _props.message;


    var className = (0, _classnames2.default)('logger__row', {
      'logger__row--info': type === _ActorAppConstants.LoggerTypes.INFO,
      'logger__row--error': type === _ActorAppConstants.LoggerTypes.ERROR,
      'logger__row--warning': type === _ActorAppConstants.LoggerTypes.WARNING,
      'logger__row--debug': type === _ActorAppConstants.LoggerTypes.DEBUG
    });

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'span',
        { className: 'logger__row__tag' },
        tag
      ),
      _react2.default.createElement(
        'span',
        { className: 'logger__row__message' },
        message
      )
    );
  };

  return LoggerRow;
}(_react.Component);

LoggerRow.propTypes = {
  tag: _react.PropTypes.string.isRequired,
  type: _react.PropTypes.oneOf([_ActorAppConstants.LoggerTypes.INFO, _ActorAppConstants.LoggerTypes.ERROR, _ActorAppConstants.LoggerTypes.WARNING, _ActorAppConstants.LoggerTypes.DEBUG]).isRequired,
  message: _react.PropTypes.string.isRequired
};
exports.default = LoggerRow;
//# sourceMappingURL=LoggerRow.react.js.map