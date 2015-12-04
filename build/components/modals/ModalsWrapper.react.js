'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _GroupListActionCreators = require('../../actions/GroupListActionCreators');

var _GroupListActionCreators2 = _interopRequireDefault(_GroupListActionCreators);

var _ContactStore = require('../../stores/ContactStore');

var _ContactStore2 = _interopRequireDefault(_ContactStore);

var _GroupListStore = require('../../stores/GroupListStore');

var _GroupListStore2 = _interopRequireDefault(_GroupListStore);

var _NewContacts = require('./NewContacts.react');

var _NewContacts2 = _interopRequireDefault(_NewContacts);

var _GroupList = require('./GroupList');

var _GroupList2 = _interopRequireDefault(_GroupList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStates = function getStates() {
  return {
    isContactsOpen: _ContactStore2.default.isContactsOpen(),
    isGroupsOpen: _GroupListStore2.default.isGroupsOpen()
  };
};

var ModalsWrapper = (function (_Component) {
  _inherits(ModalsWrapper, _Component);

  function ModalsWrapper(props) {
    _classCallCheck(this, ModalsWrapper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModalsWrapper).call(this, props));

    _this.handleChange = function () {
      return _this.setState(getStates());
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.handleClose();
      }
    };

    _this.handleClose = function () {
      var _this$state = _this.state;
      var isContactsOpen = _this$state.isContactsOpen;
      var isGroupsOpen = _this$state.isGroupsOpen;

      if (isContactsOpen) {
        _ContactActionCreators2.default.close();
      }
      if (isGroupsOpen) {
        _GroupListActionCreators2.default.close();
      }
    };

    _this.state = getStates();
    return _this;
  }

  _createClass(ModalsWrapper, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('keydown', this.handleKeyDown, false);

      _ContactStore2.default.addChangeListener(this.handleChange);
      _GroupListStore2.default.addListener(this.handleChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown, false);

      _ContactStore2.default.removeChangeListener(this.handleChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isContactsOpen = _state.isContactsOpen;
      var isGroupsOpen = _state.isGroupsOpen;

      var wrapperClassName = (0, _classnames2.default)('modal-wrapper', {
        'modal-wrapper--opened': isContactsOpen || isGroupsOpen
      });

      return _react2.default.createElement(
        'div',
        { className: wrapperClassName },
        _react2.default.createElement(
          'div',
          { className: 'modal-wrapper__close', onClick: this.handleClose },
          _react2.default.createElement(
            'i',
            { className: 'close_icon material-icons' },
            'close'
          ),
          _react2.default.createElement(
            'div',
            { className: 'text' },
            this.getIntlMessage('button.close')
          )
        ),
        isContactsOpen ? _react2.default.createElement(_NewContacts2.default, null) : null,
        isGroupsOpen ? _react2.default.createElement(_GroupList2.default, null) : null
      );
    }
  }]);

  return ModalsWrapper;
})(_react.Component);

_reactMixin2.default.onClass(ModalsWrapper, _reactIntl.IntlMixin);

exports.default = ModalsWrapper;
//# sourceMappingURL=ModalsWrapper.react.js.map