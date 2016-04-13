'use strict';

exports.__esModule = true;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var ActionCreators = function () {
  function ActionCreators() {
    (0, _classCallCheck3.default)(this, ActionCreators);

    this.bindings = new _map2.default();
  }

  ActionCreators.prototype.setBindings = function setBindings(namespace, bindings) {
    if (this.bindings.has(namespace)) {
      console.error('You are trying to set bindings "%s#%s" before it was removed', this.constructor.name, namespace);
    } else {
      this.bindings.set(namespace, bindings);
    }
  };

  ActionCreators.prototype.removeBindings = function removeBindings(namespace) {
    var bindings = this.bindings.get(namespace);
    if (bindings) {
      for (var i = 0; i < bindings.length; i++) {
        bindings[i].unbind();
        bindings[i] = null;
      }

      this.bindings.delete(namespace);
    } else {
      console.warn('You are trying to remove bindings "%s#%s" before it was set', this.constructor.name, namespace);
    }
  };

  return ActionCreators;
}();

exports.default = ActionCreators;
//# sourceMappingURL=ActionCreators.js.map