'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _utils = require('flux/utils');

var _FaviconStore = require('../../stores/FaviconStore');

var _FaviconStore2 = _interopRequireDefault(_FaviconStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favicon = function (_Component) {
  (0, _inherits3.default)(Favicon, _Component);

  function Favicon(props) {
    (0, _classCallCheck3.default)(this, Favicon);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
  }

  Favicon.getStores = function getStores() {
    return [_FaviconStore2.default];
  };

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
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

exports.default = _utils.Container.create(Favicon);
//# sourceMappingURL=Favicon.react.js.map