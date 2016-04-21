'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.register = register;
exports.waitFor = waitFor;
exports.dispatch = dispatch;
exports.dispatchAsync = dispatchAsync;

var _flux = require('flux');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var flux = new _flux.Dispatcher();

function register(callback) {
  return flux.register(callback);
}

function waitFor(ids) {
  return flux.waitFor(ids);
}

// Some Flux examples have methods like `handleViewAction`
// or `handleServerAction` here. They are only useful if you
// want to have extra pre-processing or logging for such actions,
// but I found no need for them.

/**
 * Dispatches a single action.
 */
function dispatch(type) {
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (!type) {
    throw new Error('You forgot to specify type.');
  }

  // In production, thanks to DefinePlugin in webpack.config.production.js,
  // this comparison will turn `false`, and UglifyJS will cut logging out
  // as part of dead code elimination.
  if (process.env.NODE_ENV !== 'production') {
    // Logging all actions is useful for figuring out mistakes in code.
    // All data that flows into our application comes in form of actions.
    // Actions are just plain JavaScript objects describing “what happened”.
    // Think of them as newspapers.
    if (type !== _ActorAppConstants.ActionTypes.LOGGER_APPEND) {
      if (action.error) {
        console.error(type, action);
      } else {
        console.info(type, action);
      }
    }
  }

  flux.dispatch(_extends({ type: type }, action));

  if (action.error) {
    return Promise.reject(action.error);
  }

  return Promise.resolve(action.response ? action.response : action);
}

var logError = console.error.bind(console);

/**
 * Dispatches three actions for an async operation represented by promise.
 */
function dispatchAsync(promise, types) {
  var action = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var request = types.request;
  var success = types.success;
  var failure = types.failure;


  dispatch(request, action);
  return promise.then(function (response) {
    return dispatch(success, _extends({}, action, { response: response }));
  }, function (error) {
    return dispatch(failure, _extends({}, action, { error: error }));
  }).catch(logError);
}

exports.default = flux;
//# sourceMappingURL=ActorAppDispatcher.js.map