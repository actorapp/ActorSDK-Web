'use strict';

exports.__esModule = true;

var _LoginStore = require('../stores/LoginStore');

var _LoginStore2 = _interopRequireDefault(_LoginStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterHooks = {
  requireAuth: function requireAuth(nextState, replaceState) {
    if (!_LoginStore2.default.isLoggedIn()) {
      replaceState({
        pathname: '/auth',
        state: {
          nextPathname: nextState.location.pathname
        }
      });
    }
  }
};

exports.default = RouterHooks;
//# sourceMappingURL=RouterHooks.js.map