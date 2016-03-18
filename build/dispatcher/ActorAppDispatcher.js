'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.register = register;
exports.waitFor = waitFor;
exports.dispatch = dispatch;
exports.dispatchAsync = dispatchAsync;

var _flux = require('flux');

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  flux.dispatch((0, _extends3.default)({ type: type }, action));

  // Return response or error for chaining async actions
  return new _promise2.default(function (resolve, reject) {
    if (action.error) {
      reject(action.error);
    } else {
      resolve(action.response ? action.response : action);
    }
  });
}

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
    return dispatch(success, (0, _extends3.default)({}, action, { response: response }));
  }, function (error) {
    return dispatch(failure, (0, _extends3.default)({}, action, { error: error }));
  }).catch(console.error.bind(console));
}

exports.default = flux;
//# sourceMappingURL=ActorAppDispatcher.js.map