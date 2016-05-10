'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var ActionCreators = function () {
  function ActionCreators() {
    _classCallCheck(this, ActionCreators);

    this.bindings = new Map();
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