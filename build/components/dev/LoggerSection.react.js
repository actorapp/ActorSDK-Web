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

var _utils = require('flux/utils');

var _LoggerStore = require('../../stores/LoggerStore');

var _LoggerStore2 = _interopRequireDefault(_LoggerStore);

var _LoggerActionCreators = require('../../actions/LoggerActionCreators');

var _Scrollbar = require('../common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _LoggerFilter = require('./LoggerFilter.react');

var _LoggerFilter2 = _interopRequireDefault(_LoggerFilter);

var _LoggerRow = require('./LoggerRow.react');

var _LoggerRow2 = _interopRequireDefault(_LoggerRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoggerSection = function (_Component) {
  (0, _inherits3.default)(LoggerSection, _Component);

  function LoggerSection() {
    (0, _classCallCheck3.default)(this, LoggerSection);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  LoggerSection.getStores = function getStores() {
    return [_LoggerStore2.default];
  };

  LoggerSection.calculateState = function calculateState() {
    var isOpen = _LoggerStore2.default.isOpen();
    if (!isOpen) {
      return { isOpen: false };
    }

    var logs = _LoggerStore2.default.getLogs();
    return {
      isOpen: isOpen,
      logs: logs,
      length: logs.length
    };
  };

  LoggerSection.prototype.onClose = function onClose() {
    (0, _LoggerActionCreators.loggerToggle)();
  };

  LoggerSection.prototype.renderLogs = function renderLogs() {
    var result = [];

    var logs = this.state.logs;

    for (var i = logs.length - 1; i >= 0; i--) {
      result.push(_react2.default.createElement(_LoggerRow2.default, { data: logs[i], key: i }));
    }

    return result;
  };

  LoggerSection.prototype.render = function render() {
    if (!this.state.isOpen) {
      return _react2.default.createElement('section', { className: 'activity logger' });
    }

    return _react2.default.createElement(
      'section',
      { className: 'activity logger activity--shown' },
      _react2.default.createElement(
        'div',
        { className: 'activity__body logger__body' },
        _react2.default.createElement(
          'div',
          { className: 'logger__controls' },
          _react2.default.createElement(
            'button',
            { className: 'button button--icon', type: 'button', onClick: this.onClose },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'close'
            )
          )
        ),
        _react2.default.createElement(_LoggerFilter2.default, null),
        _react2.default.createElement(
          _Scrollbar2.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'logger__container' },
            this.renderLogs()
          )
        )
      )
    );
  };

  return LoggerSection;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

exports.default = _utils.Container.create(LoggerSection);
//# sourceMappingURL=LoggerSection.react.js.map