'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class representing a delegate for overriding default app behaviour.
 *
 * @param {object} options - Object contains options.
 * @param {object} options.components - Object contains custom react components.
 * @param {object} options.features - Object contains features flags.
 * @param {object} options.actions - Object contains custom actions.
 * @param {object} options.l18n - Object contains custom translations.
 */

var ActorSDKDelegate = function ActorSDKDelegate() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  (0, _classCallCheck3.default)(this, ActorSDKDelegate);

  if (arguments.length === 3) {
    console.error('Deprecation notice: ActorSDKDelegate constructor accept "options" parameter');
    options = {
      components: arguments[0],
      actions: arguments[1],
      l18n: arguments[2]
    };
  }

  (0, _lodash.defaultsDeep)(this, options, ActorSDKDelegate.defaultOptions);
}; /*
    * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
    */

ActorSDKDelegate.defaultOptions = {
  components: {
    login: null,
    install: null,
    deactivated: null,
    join: null,
    archive: null,
    empty: null,
    sidebar: null
  },
  features: {
    calls: true,
    search: false
  },
  actions: {
    setLoggedIn: null,
    setLoggedOut: null
  },
  l18n: {}
};
exports.default = ActorSDKDelegate;
//# sourceMappingURL=actor-sdk-delegate.js.map