'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MAP_SIZE = '300x100';

var Geolocation = (function (_Component) {
  _inherits(Geolocation, _Component);

  function Geolocation(props) {
    _classCallCheck(this, Geolocation);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Geolocation).call(this, props));
  }

  _createClass(Geolocation, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var content = _props.content;
      var className = _props.className;

      var imageSrc = 'https://maps.googleapis.com/maps/api/staticmap?center=' + content.latitude + ',' + content.longitude + '&zoom=15&size=' + MAP_SIZE + '&scale=2&maptype=roadmap&markers=color:red%7C' + content.latitude + ',' + content.longitude;
      var linkToMap = 'https://maps.google.com/maps?q=loc:' + content.latitude + ',' + content.longitude;

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'location' },
          _react2.default.createElement(
            'a',
            { href: linkToMap, target: '_blank' },
            _react2.default.createElement('img', { src: imageSrc, alt: 'Location' })
          )
        )
      );
    }
  }]);

  return Geolocation;
})(_react.Component);

Geolocation.propTypes = {
  content: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string
};
exports.default = Geolocation;