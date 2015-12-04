'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _materialUi = require('material-ui');

var _AppCacheStore = require('../../stores/AppCacheStore');

var _AppCacheStore2 = _interopRequireDefault(_AppCacheStore);

var _AppCacheActionCreators = require('../../actions/AppCacheActionCreators');

var _AppCacheActionCreators2 = _interopRequireDefault(_AppCacheActionCreators);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _ActorTheme = require('../../constants/ActorTheme');

var _ActorTheme2 = _interopRequireDefault(_ActorTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThemeManager = new _materialUi.Styles.ThemeManager();

var appElement = document.getElementById('actor-web-app');
_reactModal2.default.setAppElement(appElement);

var getStateFromStores = function getStateFromStores() {
  return {
    isShown: _AppCacheStore2.default.isModalOpen()
  };
};

var AddContact = (function (_React$Component) {
  _inherits(AddContact, _React$Component);

  _createClass(AddContact, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }
  }]);

  function AddContact(props) {
    _classCallCheck(this, AddContact);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddContact).call(this, props));

    _this.onClose = function () {
      _AppCacheActionCreators2.default.closeModal();
    };

    _this.onConfirm = function () {
      _AppCacheActionCreators2.default.confirmUpdate();
    };

    _this.onChange = function () {
      _this.setState(getStateFromStores());
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.onClose();
      }
    };

    _this.state = getStateFromStores();

    _AppCacheStore2.default.addChangeListener(_this.onChange);
    document.addEventListener('keydown', _this.onKeyDown, false);

    ThemeManager.setTheme(_ActorTheme2.default);
    return _this;
  }

  _createClass(AddContact, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _AppCacheStore2.default.removeChangeListener(this.onChange);
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactModal2.default,
        { className: 'modal-new modal-new--update',
          closeTimeoutMS: 150,
          isOpen: this.state.isShown,
          style: { width: 400 } },
        _react2.default.createElement(
          'div',
          { className: 'modal-new__body' },
          _react2.default.createElement(
            'h1',
            null,
            'Update available'
          ),
          _react2.default.createElement(
            'h3',
            null,
            'New version of Actor Web App available.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'It\'s already downloaded to your browser, you just need to reload tab.'
          )
        ),
        _react2.default.createElement(
          'footer',
          { className: 'modal-new__footer text-right' },
          _react2.default.createElement(_materialUi.FlatButton, { hoverColor: 'rgba(74,144,226,.12)',
            label: 'Cancel',
            onClick: this.onClose,
            secondary: true }),
          _react2.default.createElement(_materialUi.FlatButton, { hoverColor: 'rgba(74,144,226,.12)',
            label: 'Reload',
            onClick: this.onConfirm,
            secondary: true })
        )
      );
    }
  }]);

  return AddContact;
})(_react2.default.Component);

AddContact.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object
};
exports.default = AddContact;
//# sourceMappingURL=AppCacheUpdate.react.js.map