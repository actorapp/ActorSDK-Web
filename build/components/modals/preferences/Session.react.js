'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _PreferencesActionCreators = require('../../../actions/PreferencesActionCreators');

var _PreferencesActionCreators2 = _interopRequireDefault(_PreferencesActionCreators);

var _Stateful = require('../../common/Stateful.react');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SessionItem = function (_Component) {
  _inherits(SessionItem, _Component);

  function SessionItem(props) {
    _classCallCheck(this, SessionItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleTerminateSession = _this.handleTerminateSession.bind(_this);
    return _this;
  }

  SessionItem.prototype.handleTerminateSession = function handleTerminateSession() {
    _PreferencesActionCreators2.default.terminateSession(this.props.id);
  };

  SessionItem.prototype.renderTitle = function renderTitle() {
    var appTitle = this.props.appTitle;


    return _react2.default.createElement(
      'div',
      { className: 'title' },
      appTitle,
      this.renderCurrentDeviceMark()
    );
  };

  SessionItem.prototype.renderCurrentDeviceMark = function renderCurrentDeviceMark() {
    var holder = this.props.holder;

    if (holder !== 'THIS_DEVICE') return null;

    return _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.security.sessions.current', tagName: 'small' });
  };

  SessionItem.prototype.renderAuthTime = function renderAuthTime() {
    var authTime = this.props.authTime;


    return _react2.default.createElement(
      'small',
      null,
      _react2.default.createElement(
        'b',
        null,
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.security.sessions.authTime' }),
        ':'
      ),
      ' ',
      authTime.toString()
    );
  };

  SessionItem.prototype.renderState = function renderState() {
    var terminateState = this.props.terminateState;


    return _react2.default.createElement(_Stateful2.default, {
      currentState: terminateState,
      pending: _react2.default.createElement(
        'a',
        { className: 'session-list__session__terminate link--blue', onClick: this.handleTerminateSession },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.security.sessions.terminate' })
      ),
      processing: _react2.default.createElement(
        'i',
        { className: 'session-list__session__terminate material-icons spin' },
        'autorenew'
      ),
      success: _react2.default.createElement(
        'i',
        { className: 'session-list__session__terminate material-icons' },
        'check'
      ),
      failure: _react2.default.createElement(
        'i',
        { className: 'session-list__session__terminate material-icons' },
        'warning'
      )
    });
  };

  SessionItem.prototype.render = function render() {
    return _react2.default.createElement(
      'li',
      { className: 'session-list__session' },
      this.renderTitle(),
      this.renderAuthTime(),
      this.renderState()
    );
  };

  return SessionItem;
}(_react.Component);

SessionItem.propTypes = {
  appTitle: _react.PropTypes.string.isRequired,
  holder: _react.PropTypes.string.isRequired,
  id: _react.PropTypes.number.isRequired,
  authTime: _react.PropTypes.object.isRequired,
  terminateState: _react.PropTypes.oneOf([_ActorAppConstants.AsyncActionStates.PENDING, _ActorAppConstants.AsyncActionStates.PROCESSING, _ActorAppConstants.AsyncActionStates.SUCCESS, _ActorAppConstants.AsyncActionStates.FAILURE]).isRequired
};
exports.default = SessionItem;
//# sourceMappingURL=Session.react.js.map