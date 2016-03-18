'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorClient = require('../../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var MAP_SIZE = '300x100';

/**
 * Class that represent a component for display location messages content
 */

var Location = function (_Component) {
  (0, _inherits3.default)(Location, _Component);

  function Location() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Location);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMapClick = function (event) {
      var content = _this.props.content;

      var linkToMap = 'https://maps.google.com/maps?q=loc:' + content.latitude + ',' + content.longitude;

      if (_ActorClient2.default.isElectron()) {
        _ActorClient2.default.handleLinkClick(event);
      } else {
        window.open(linkToMap);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Location.prototype.render = function render() {
    var _props = this.props;
    var content = _props.content;
    var className = _props.className;

    var imageSrc = 'https://maps.googleapis.com/maps/api/staticmap?center=' + content.latitude + ',' + content.longitude + '&zoom=15&size=' + MAP_SIZE + '&scale=2&maptype=roadmap&markers=color:red%7C' + content.latitude + ',' + content.longitude;

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'location', onClick: this.handleMapClick },
        _react2.default.createElement('img', { src: imageSrc, alt: 'Location' })
      )
    );
  };

  return Location;
}(_react.Component);

Location.propTypes = {
  content: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string
};
exports.default = Location;
//# sourceMappingURL=Location.react.js.map