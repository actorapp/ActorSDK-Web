'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

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

var getStateFromStores = function getStateFromStores() {
  return {
    activity: _ActivityStore2.default.getActivity(),
    isOpen: _ActivityStore2.default.isOpen()
  };
};

var ActivitySection = (function (_Component) {
  _inherits(ActivitySection, _Component);

  function ActivitySection(props) {
    _classCallCheck(this, ActivitySection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ActivitySection).call(this, props));

    _this.onChange = function () {
      return _this.setState(getStateFromStores());
    };

    _this.state = getStateFromStores();

    _ActivityStore2.default.addChangeListener(_this.onChange);
    return _this;
  }

  _createClass(ActivitySection, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ActivityStore2.default.removeChangeListener(this.onChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var activity = _state.activity;
      var isOpen = _state.isOpen;

      if (activity !== null) {
        var activityClassName = (0, _classnames2.default)('activity', {
          'activity--shown': isOpen
        });
        var activityBody = undefined;

        switch (activity.type) {
          case _ActorAppConstants.ActivityTypes.USER_PROFILE:
            activityBody = _react2.default.createElement(_UserProfile2.default, { user: activity.user });
            break;
          case _ActorAppConstants.ActivityTypes.GROUP_PROFILE:
            activityBody = _react2.default.createElement(_GroupProfile2.default, { group: activity.group });
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
  }]);

  return ActivitySection;
})(_react.Component);

exports.default = ActivitySection;
//# sourceMappingURL=ActivitySection.react.js.map