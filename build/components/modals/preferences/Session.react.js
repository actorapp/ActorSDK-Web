'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _PreferencesActionCreators = require('../../../actions/PreferencesActionCreators');

var _PreferencesActionCreators2 = _interopRequireDefault(_PreferencesActionCreators);

var _PreferencesStore = require('../../../stores/PreferencesStore');

var _PreferencesStore2 = _interopRequireDefault(_PreferencesStore);

var _Stateful = require('../../common/Stateful');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SessionItem = (function (_Component) {
  _inherits(SessionItem, _Component);

  function SessionItem(props) {
    _classCallCheck(this, SessionItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SessionItem).call(this, props));

    _initialiseProps.call(_this);

    return _this;
  }

  _createClass(SessionItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var appTitle = _props.appTitle;
      var holder = _props.holder;
      var authTime = _props.authTime;
      var terminateSessionState = this.state.terminateSessionState;

      var currentDevice = holder === 'THIS_DEVICE' ? _react2.default.createElement(
        'small',
        null,
        this.getIntlMessage('preferencesSessionsCurrentSession')
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
            this.getIntlMessage('preferencesSessionsAuthTime'),
            ':'
          ),
          ' ',
          authTime.toString()
        ),
        _react2.default.createElement(
          _Stateful2.default.Root,
          { currentState: terminateSessionState },
          _react2.default.createElement(
            _Stateful2.default.Pending,
            null,
            _react2.default.createElement(
              'a',
              { className: 'session-list__session__terminate link--blue', onClick: this.onTerminate },
              this.getIntlMessage('preferencesSessionsTerminate')
            )
          ),
          _react2.default.createElement(
            _Stateful2.default.Processing,
            null,
            _react2.default.createElement(
              'i',
              { className: 'session-list__session__terminate material-icons spin' },
              'autorenew'
            )
          ),
          _react2.default.createElement(
            _Stateful2.default.Success,
            null,
            _react2.default.createElement(
              'i',
              { className: 'session-list__session__terminate material-icons' },
              'check'
            )
          ),
          _react2.default.createElement(
            _Stateful2.default.Failure,
            null,
            _react2.default.createElement(
              'i',
              { className: 'session-list__session__terminate material-icons' },
              'warning'
            )
          )
        )
      );
    }
  }]);

  return SessionItem;
})(_react.Component);

SessionItem.getStores = function () {
  return [_PreferencesStore2.default];
};

SessionItem.calculateState = function (prevState, props) {
  return {
    terminateSessionState: _PreferencesStore2.default.getTerminateSessionState(props.id)
  };
};

SessionItem.propTypes = {
  appTitle: _react2.default.PropTypes.string.isRequired,
  holder: _react2.default.PropTypes.string.isRequired,
  id: _react2.default.PropTypes.number.isRequired,
  authTime: _react2.default.PropTypes.object.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onTerminate = function () {
    return _PreferencesActionCreators2.default.terminateSession(_this2.props.id);
  };
};

_reactMixin2.default.onClass(SessionItem, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(SessionItem, { pure: false, withProps: true });
//# sourceMappingURL=Session.react.js.map