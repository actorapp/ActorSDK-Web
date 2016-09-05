'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                           */

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

  _classCallCheck(this, ActorSDKDelegate);

  if (arguments.length === 3) {
    console.error('Deprecation notice: ActorSDKDelegate constructor accept "options" parameter');
    options = {
      components: arguments[0],
      actions: arguments[1],
      l18n: arguments[2]
    };
  }

  (0, _lodash.defaultsDeep)(this, options, ActorSDKDelegate.defaultOptions);
};

ActorSDKDelegate.defaultOptions = {
  components: {
    login: null,
    install: null,
    deactivated: null,
    join: null,
    archive: null,
    empty: null,
    sidebar: null,
    modals: null,
    about: null
  },
  features: {
    calls: true,
    search: false,
    editing: false,
    blocking: false,
    writeButton: false
  },
  actions: {
    setLoggedIn: null,
    setLoggedOut: null
  },
  l18n: {}
};
exports.default = ActorSDKDelegate;
//# sourceMappingURL=actor-sdk-delegate.js.map