'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _AnswerButton = require('./AnswerButton.react');

var _AnswerButton2 = _interopRequireDefault(_AnswerButton);

var _EndButton = require('./EndButton.react');

var _EndButton2 = _interopRequireDefault(_EndButton);

var _MuteButton = require('./MuteButton.react');

var _MuteButton2 = _interopRequireDefault(_MuteButton);

var _CloseButton = require('./CloseButton.react');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _FullScreenButton = require('./FullScreenButton.react');

var _FullScreenButton2 = _interopRequireDefault(_FullScreenButton);

var _VideoButton = require('./VideoButton.react');

var _VideoButton2 = _interopRequireDefault(_VideoButton);

var _AddUserButton = require('./AddUserButton.react');

var _AddUserButton2 = _interopRequireDefault(_AddUserButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var CallControls = function (_Component) {
  _inherits(CallControls, _Component);

  function CallControls() {
    _classCallCheck(this, CallControls);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CallControls.prototype.render = function render() {
    var _props = this.props;
    var isOutgoing = _props.isOutgoing;
    var small = _props.small;


    var secondaryControls = [];
    var mainControls = small ? secondaryControls : [];
    switch (this.props.callState) {
      case _ActorAppConstants.CallStates.CALLING:
        if (!isOutgoing) {
          mainControls.push(_react2.default.createElement(_AnswerButton2.default, { small: small, onClick: this.props.onAnswer, key: 'answer' }));
        }

        mainControls.push(_react2.default.createElement(_EndButton2.default, { small: small, onClick: this.props.onEnd, key: 'end' }));
        break;
      case _ActorAppConstants.CallStates.IN_PROGRESS:
      case _ActorAppConstants.CallStates.CONNECTING:
        if (!small) {
          secondaryControls.push(_react2.default.createElement(_FullScreenButton2.default, { onClick: this.props.onFullscreen, key: 'fullscreen' }));
        }

        secondaryControls.push(_react2.default.createElement(_MuteButton2.default, { value: this.props.isMuted, onToggle: this.props.onMuteToggle, key: 'mute' }));

        if (!small) {
          secondaryControls.push(_react2.default.createElement(_VideoButton2.default, { onClick: this.props.onVideo, key: 'video' }), _react2.default.createElement(_AddUserButton2.default, { onClick: this.props.onUserAdd, key: 'add' }));
        }

        mainControls.push(_react2.default.createElement(_EndButton2.default, { small: small, onClick: this.props.onEnd, key: 'end' }));
        break;
      case _ActorAppConstants.CallStates.ENDED:
        mainControls.push(_react2.default.createElement(_CloseButton2.default, { onClick: this.props.onClose, key: 'close' }));
        break;
    }

    if (small) {
      return _react2.default.createElement(
        'div',
        { className: 'call__controls' },
        _react2.default.createElement(
          'div',
          { className: 'call__controls__icons row top-xs' },
          secondaryControls
        )
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'call__controls' },
      _react2.default.createElement(
        'div',
        { className: 'call__controls__icons row top-xs' },
        secondaryControls
      ),
      _react2.default.createElement(
        'div',
        { className: 'call__controls__buttons' },
        mainControls
      )
    );
  };

  return CallControls;
}(_react.Component);

CallControls.propTypes = {
  callState: _react.PropTypes.oneOf([_ActorAppConstants.CallStates.CALLING, _ActorAppConstants.CallStates.IN_PROGRESS, _ActorAppConstants.CallStates.CONNECTING, _ActorAppConstants.CallStates.ENDED]).isRequired,
  small: _react.PropTypes.bool,
  isOutgoing: _react.PropTypes.bool.isRequired,
  isMuted: _react.PropTypes.bool.isRequired,
  onEnd: _react.PropTypes.func.isRequired,
  onAnswer: _react.PropTypes.func.isRequired,
  onMuteToggle: _react.PropTypes.func.isRequired,
  onFullscreen: _react.PropTypes.func.isRequired,
  onUserAdd: _react.PropTypes.func.isRequired,
  onVideo: _react.PropTypes.func.isRequired,
  onClose: _react.PropTypes.func.isRequired
};
exports.default = CallControls;
//# sourceMappingURL=CallControls.react.js.map