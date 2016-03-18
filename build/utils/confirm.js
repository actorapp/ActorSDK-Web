'use strict';

exports.__esModule = true;

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = confirm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _reactIntl = require('react-intl');

var _l18n = require('../l18n');

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Confirm = function (_Component) {
  (0, _inherits3.default)(Confirm, _Component);

  function Confirm(props) {
    (0, _classCallCheck3.default)(this, Confirm);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.reject();
      }
    };

    _this.promise = new _promise2.default(function (resolve, reject) {
      _this.reject = reject;
      _this.resolve = resolve;
    });

    var SharedActor = _SharedContainer2.default.get();
    _this.intlData = (0, _l18n.getIntlData)(SharedActor.forceLocale);
    return _this;
  }

  Confirm.prototype.componentDidMount = function componentDidMount() {
    _ComposeActionCreators2.default.toggleAutoFocus(false);
    (0, _reactDom.findDOMNode)(this.refs.confirm).focus();
    document.addEventListener('keydown', this.onKeyDown, false);
  };

  Confirm.prototype.componentWillUnmount = function componentWillUnmount() {
    _ComposeActionCreators2.default.toggleAutoFocus(true);
    document.removeEventListener('keydown', this.onKeyDown, false);
  };

  Confirm.prototype.render = function render() {
    var _props = this.props;
    var message = _props.message;
    var description = _props.description;
    var abortLabel = _props.abortLabel;
    var confirmLabel = _props.confirmLabel;


    return _react2.default.createElement(
      _reactIntl.IntlProvider,
      this.intlData,
      _react2.default.createElement(
        'div',
        { className: 'modal modal--confirm' },
        _react2.default.createElement(
          'header',
          { className: 'modal__header' },
          _react2.default.createElement(
            'h4',
            { className: 'modal__header__title' },
            message
          )
        ),
        description ? _react2.default.createElement(
          'div',
          { className: 'modal__body' },
          description
        ) : null,
        _react2.default.createElement(
          'footer',
          { className: 'modal__footer text-right' },
          _react2.default.createElement(
            'button',
            { className: 'button', onClick: this.reject },
            abortLabel || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.cancel' })
          ),
          _react2.default.createElement(
            'button',
            { className: 'button button--lightblue', onClick: this.resolve, ref: 'confirm' },
            confirmLabel || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.ok' })
          )
        )
      )
    );
  };

  return Confirm;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

Confirm.propTypes = {
  message: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]).isRequired,
  description: _react.PropTypes.string,
  abortLabel: _react.PropTypes.string,
  confirmLabel: _react.PropTypes.string
};
function confirm(message) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var element = document.createElement('div');
  element.className = 'modal-backdrop';
  var wrapper = document.body.appendChild(element);

  var component = (0, _reactDom.render)((0, _react.createElement)(Confirm, (0, _extends3.default)({ message: message }, options)), wrapper);

  function cleanup() {
    (0, _reactDom.unmountComponentAtNode)(wrapper);
    (0, _setImmediate3.default)(function () {
      return wrapper.remove();
    });
  }

  // Unmount component and remove it from DOM
  component.promise.then(function () {
    return cleanup();
  }, function () {
    return cleanup();
  });

  return component.promise;
}
//# sourceMappingURL=confirm.js.map