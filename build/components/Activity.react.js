'use strict';

exports.__esModule = true;

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _DialogInfoStore = require('../stores/DialogInfoStore');

var _DialogInfoStore2 = _interopRequireDefault(_DialogInfoStore);

var _UserProfile = require('./activity/UserProfile.react');

var _UserProfile2 = _interopRequireDefault(_UserProfile);

var _GroupProfile = require('./activity/GroupProfile.react');

var _GroupProfile2 = _interopRequireDefault(_GroupProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var ActivitySection = function (_Component) {
  (0, _inherits3.default)(ActivitySection, _Component);

  function ActivitySection(props) {
    (0, _classCallCheck3.default)(this, ActivitySection);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
  }

  ActivitySection.getStores = function getStores() {
    return [_DialogStore2.default, _DialogInfoStore2.default, _ActivityStore2.default];
  };

  ActivitySection.calculateState = function calculateState() {
    return {
      peer: _DialogStore2.default.getCurrentPeer(),
      info: _DialogInfoStore2.default.getInfo(),
      isOpen: _ActivityStore2.default.isOpen()
    };
  };

  ActivitySection.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.isOpen) {
      return false;
    }

    return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
  };

  ActivitySection.prototype.componentDidUpdate = function componentDidUpdate() {
    (0, _setImmediate3.default)(function () {
      window.dispatchEvent(new Event('resize'));
    });
  };

  ActivitySection.prototype.renderBody = function renderBody() {
    var _state = this.state;
    var peer = _state.peer;
    var info = _state.info;


    switch (peer.type) {
      case _ActorAppConstants.PeerTypes.USER:
        return _react2.default.createElement(_UserProfile2.default, { user: info });
      case _ActorAppConstants.PeerTypes.GROUP:
        return _react2.default.createElement(_GroupProfile2.default, { group: info });
      default:
        return null;
    }
  };

  ActivitySection.prototype.render = function render() {
    var _state2 = this.state;
    var peer = _state2.peer;
    var info = _state2.info;
    var isOpen = _state2.isOpen;

    if (!isOpen || !peer) {
      return _react2.default.createElement('section', { className: 'activity' });
    }

    return _react2.default.createElement(
      'section',
      { className: 'activity activity--shown' },
      this.renderBody()
    );
  };

  return ActivitySection;
}(_react.Component);

exports.default = _utils.Container.create(ActivitySection);
//# sourceMappingURL=Activity.react.js.map