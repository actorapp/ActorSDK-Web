'use strict';

exports.__esModule = true;
exports.default = initPollyfils;
/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

function initPollyfils(callback) {
  if (!global.Intl) {
    require.ensure(['intl'], function (require) {
      console.debug('Load Intl polyfill');
      require('intl');
      callback && callback();
    }, 'intl-polyfill');
  } else {
    console.debug('Intl polyfill is not required');
    callback && callback();
  }
}
//# sourceMappingURL=polyfills.js.map