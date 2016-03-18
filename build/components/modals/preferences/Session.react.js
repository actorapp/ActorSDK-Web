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

var _utils = require('flux/utils');

var _PreferencesActionCreators = require('../../../actions/PreferencesActionCreators');

var _PreferencesActionCreators2 = _interopRequireDefault(_PreferencesActionCreators);

var _PreferencesStore = require('../../../stores/PreferencesStore');

var _PreferencesStore2 = _interopRequireDefault(_PreferencesStore);

var _Stateful = require('../../common/Stateful.react');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SessionItem = function (_Component) {
  (0, _inherits3.default)(SessionItem, _Component);

  function SessionItem(props) {
    (0, _classCallCheck3.default)(this, SessionItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    return _this;
  }

  SessionItem.getStores = function getStores() {
    return [_PreferencesStore2.default];
  };

  SessionItem.prototype.render = function render() {
    var _props = this.props;
    var appTitle = _props.appTitle;
    var holder = _props.holder;
    var authTime = _props.authTime;
    var terminateSessionState = this.state.terminateSessionState;
    var intl = this.context.intl;


    var currentDevice = holder === 'THIS_DEVICE' ? _react2.default.createElement(
      'small',
      null,
      intl.messages['preferencesSessionsCurrentSession']
    ) : null;

    return _react2.default.createElement(
      'li',
      { className: 'session-list__session' },
      _react2.default.createElement(
        'div',
        { className: 'title' },
        appTitle,
        currentDevice
      ),
      _react2.default.createElement(
        'small',
        null,
        _react2.default.createElement(
          'b',
          null,
          intl.messages['preferencesSessionsAuthTime'],
          ':'
        ),
        ' ',
        authTime.toString()
      ),
      _react2.default.createElement(_Stateful2.default, {
        currentState: terminateSessionState,
        pending: _react2.default.createElement(
          'a',
          { className: 'session-list__session__terminate link--blue', onClick: this.onTerminate },
          intl.messages['preferencesSessionsTerminate']
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
      })
    );
  };

  return SessionItem;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

SessionItem.calculateState = function (prevState, props) {
  return {
    terminateSessionState: _PreferencesStore2.default.getTerminateSessionState(props.id)
  };
};

SessionItem.propTypes = {
  appTitle: _react.PropTypes.string.isRequired,
  holder: _react.PropTypes.string.isRequired,
  id: _react.PropTypes.number.isRequired,
  authTime: _react.PropTypes.object.isRequired
};
SessionItem.contextTypes = {
  intl: _react.PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onTerminate = function () {
    return _PreferencesActionCreators2.default.terminateSession(_this2.props.id);
  };
};

exports.default = _utils.Container.create(SessionItem, { pure: false, withProps: true });
//# sourceMappingURL=Session.react.js.map