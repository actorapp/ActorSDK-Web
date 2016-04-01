'use strict';

exports.__esModule = true;

var _ActorAppConstants = require('../constants/ActorAppConstants');

function getMethod(type) {
  switch (type) {
    case _ActorAppConstants.LoggerTypes.INFO:
      return 'info';
    case _ActorAppConstants.LoggerTypes.ERROR:
      return 'error';
    case _ActorAppConstants.LoggerTypes.WARNING:
      return 'warn';
    case _ActorAppConstants.LoggerTypes.DEBUG:
    // return 'debug';
    default:
      return 'log';
  }
}

function logHandler(tag, type, message) {
  console[getMethod(type)](tag + ': ' + message);
}

exports.default = logHandler;
//# sourceMappingURL=defaultLogHandler.js.map