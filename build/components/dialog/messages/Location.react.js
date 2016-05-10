'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorClient = require('../../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MAP_SIZE = '300x100';

/**
 * Class that represent a component for display location messages content
 */

var Location = function (_Component) {
  _inherits(Location, _Component);

  function Location(props) {
    _classCallCheck(this, Location);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleMapClick = _this.handleMapClick.bind(_this);
    return _this;
  }

  Location.prototype.handleMapClick = function handleMapClick(event) {
    var _props = this.props;
    var latitude = _props.latitude;
    var longitude = _props.longitude;

    var linkToMap = 'https://maps.google.com/maps?q=loc:' + latitude + ',' + longitude;

    if (_ActorClient2.default.isElectron()) {
      _ActorClient2.default.handleLinkClick(event);
    } else {
      window.open(linkToMap);
    }
  };

  Location.prototype.render = function render() {
    var _props2 = this.props;
    var latitude = _props2.latitude;
    var longitude = _props2.longitude;
    var className = _props2.className;


    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'location', onClick: this.handleMapClick },
        _react2.default.createElement('img', {
          src: 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=15&size=' + MAP_SIZE + '&scale=2&maptype=roadmap&markers=color:red%7C' + latitude + ',' + longitude,
          alt: 'Location'
        })
      )
    );
  };

  return Location;
}(_react.Component);

Location.propTypes = {
  latitude: _react.PropTypes.number.isRequired,
  longitude: _react.PropTypes.number.isRequired,
  className: _react.PropTypes.string
};
exports.default = Location;
//# sourceMappingURL=Location.react.js.map