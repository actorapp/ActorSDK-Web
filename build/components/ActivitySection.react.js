'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _UserProfile = require('./activity/UserProfile.react');

var _UserProfile2 = _interopRequireDefault(_UserProfile);

var _GroupProfile = require('./activity/GroupProfile.react');

var _GroupProfile2 = _interopRequireDefault(_GroupProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ActivitySection = (function (_Component) {
  _inherits(ActivitySection, _Component);

  function ActivitySection(props) {
    _classCallCheck(this, ActivitySection);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ActivitySection).call(this, props));
  }

  _createClass(ActivitySection, [{
    key: 'render',
    value: function render() {
      var _state = this.state;
      var peer = _state.peer;
      var info = _state.info;
      var isOpen = _state.isOpen;

      if (peer !== null) {
        var activityClassName = (0, _classnames2.default)('activity', {
          'activity--shown': isOpen
        });
        var activityBody = undefined;

        switch (peer.type) {
          case _ActorAppConstants.PeerTypes.USER:
            activityBody = _react2.default.createElement(_UserProfile2.default, { user: info });
            break;
          case _ActorAppConstants.PeerTypes.GROUP:
            activityBody = _react2.default.createElement(_GroupProfile2.default, { group: info });
            break;
          default:
        }

        return _react2.default.createElement(
          'section',
          { className: activityClassName },
          activityBody
        );
      } else {
        return null;
      }
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        peer: _DialogStore2.default.getCurrentPeer(),
        info: _DialogStore2.default.getInfo(),
        isOpen: _ActivityStore2.default.isOpen()
      };
    }
  }]);

  return ActivitySection;
})(_react.Component);

ActivitySection.getStores = function () {
  return [_DialogStore2.default, _ActivityStore2.default];
};

exports.default = _utils.Container.create(ActivitySection, { pure: false });
//# sourceMappingURL=ActivitySection.react.js.map