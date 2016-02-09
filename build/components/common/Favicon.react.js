'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _FaviconStore = require('../../stores/FaviconStore');

var _FaviconStore2 = _interopRequireDefault(_FaviconStore);

var _FaviconActionCreators = require('../../actions/FaviconActionCreators');

var _FaviconActionCreators2 = _interopRequireDefault(_FaviconActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Favicon = (function (_Component) {
  _inherits(Favicon, _Component);

  function Favicon(props) {
    _classCallCheck(this, Favicon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Favicon).call(this, props));
  }

  _createClass(Favicon, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      // Clone created element and create href attribute
      var currentFaviconNode = document.getElementById('favicon');
      var updatedFaviconNode = currentFaviconNode.cloneNode(true);

      // Set new href attribute
      updatedFaviconNode.setAttribute('href', nextState.iconPath);

      // Remove old and add new favicon
      currentFaviconNode.remove();
      document.head.appendChild(updatedFaviconNode);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        iconPath: _FaviconStore2.default.getFaviconPath()
      };
    }
  }]);

  return Favicon;
})(_react.Component);

Favicon.getStores = function () {
  return [_FaviconStore2.default];
};

exports.default = _utils.Container.create(Favicon);
//# sourceMappingURL=Favicon.react.js.map