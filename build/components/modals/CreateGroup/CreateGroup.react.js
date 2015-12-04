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

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _CreateGroupActionCreators = require('../../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _CreateGroupStore = require('../../../stores/CreateGroupStore');

var _CreateGroupStore2 = _interopRequireDefault(_CreateGroupStore);

var _Form = require('./Form.react');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CreateGroup = (function (_Component) {
  _inherits(CreateGroup, _Component);

  function CreateGroup(props) {
    _classCallCheck(this, CreateGroup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CreateGroup).call(this, props));

    _this.handleClose = function () {
      return _CreateGroupActionCreators2.default.close();
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.handleClose();
      }
    };

    return _this;
  }

  _createClass(CreateGroup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var isOpen = this.state.isOpen;

      return _react2.default.createElement(
        _reactModal2.default,
        { className: 'modal-new modal-new--create-group',
          closeTimeoutMS: 150,
          isOpen: isOpen,
          style: { width: 350 } },
        _react2.default.createElement(
          'header',
          { className: 'modal-new__header' },
          _react2.default.createElement(
            'h3',
            { className: 'modal-new__header__title' },
            this.getIntlMessage('modal.createGroup.title')
          ),
          _react2.default.createElement(
            'a',
            { className: 'modal-new__header__close modal-new__header__icon material-icons pull-right',
              onClick: this.handleClose },
            'clear'
          )
        ),
        _react2.default.createElement(_Form2.default, null)
      );
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        isOpen: _CreateGroupStore2.default.isModalOpen()
      };
    }
  }]);

  return CreateGroup;
})(_react.Component);

CreateGroup.getStores = function () {
  return [_CreateGroupStore2.default];
};

_reactMixin2.default.onClass(CreateGroup, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(CreateGroup);
//# sourceMappingURL=CreateGroup.react.js.map