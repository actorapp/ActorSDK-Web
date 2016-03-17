'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LoggerSection = function (_Component) {
  _inherits(LoggerSection, _Component);

  function LoggerSection() {
    _classCallCheck(this, LoggerSection);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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
}(_react.Component);

exports.default = _utils.Container.create(LoggerSection);
//# sourceMappingURL=LoggerSection.react.js.map