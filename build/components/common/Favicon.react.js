'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _FaviconStore = require('../../stores/FaviconStore');

var _FaviconStore2 = _interopRequireDefault(_FaviconStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Favicon = function (_Component) {
  _inherits(Favicon, _Component);

  function Favicon(props) {
    _classCallCheck(this, Favicon);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  Favicon.calculateState = function calculateState() {
    return {
      iconPath: _FaviconStore2.default.getFaviconPath()
    };
  };

  Favicon.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    // Clone created element and create href attribute
    var currentFaviconNode = document.getElementById('favicon');
    var updatedFaviconNode = currentFaviconNode.cloneNode(true);

    // Set new href attribute
    updatedFaviconNode.setAttribute('href', nextState.iconPath);

    // Remove old and add new favicon
    currentFaviconNode.remove();
    document.head.appendChild(updatedFaviconNode);
  };

  Favicon.prototype.render = function render() {
    return null;
  };

  return Favicon;
}(_react.Component);

Favicon.getStores = function () {
  return [_FaviconStore2.default];
};

exports.default = _utils.Container.create(Favicon);
//# sourceMappingURL=Favicon.react.js.map