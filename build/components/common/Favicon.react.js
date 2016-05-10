'use strict';

exports.__esModule = true;

var _react = require('react');

var _utils = require('flux/utils');

var _favico = require('favico.js');

var _favico2 = _interopRequireDefault(_favico);

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

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.favico = new _favico2.default({
      position: 'up',
      animation: 'none'
    });
    return _this;
  }

  Favicon.getStores = function getStores() {
    return [_FaviconStore2.default];
  };

  Favicon.calculateState = function calculateState() {
    return {
      counter: _FaviconStore2.default.getState()
    };
  };

  Favicon.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    var counter = nextState.counter;


    if (counter) {
      this.favico.badge(counter);
    } else {
      this.favico.reset();
    }
  };

  Favicon.prototype.render = function render() {
    return null;
  };

  return Favicon;
}(_react.Component);

exports.default = _utils.Container.create(Favicon);
//# sourceMappingURL=Favicon.react.js.map