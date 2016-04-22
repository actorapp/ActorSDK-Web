'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactIntl = require('react-intl');

var _CreateGroupActionCreators = require('../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _Form = require('./createGroup/Form.react');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CreateGroup = function (_Component) {
  _inherits(CreateGroup, _Component);

  function CreateGroup(props) {
    _classCallCheck(this, CreateGroup);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }

  CreateGroup.prototype.handleClose = function handleClose() {
    _CreateGroupActionCreators2.default.close();
  };

  CreateGroup.prototype.render = function render() {
    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay',
        className: 'modal',
        onRequestClose: this.handleClose,
        isOpen: true },
      _react2.default.createElement(
        'div',
        { className: 'create-group' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.createGroup.title', tagName: 'h1' }),
            _react2.default.createElement(
              'a',
              { className: 'modal__header__close material-icons',
                onClick: this.handleClose },
              'clear'
            )
          ),
          _react2.default.createElement(_Form2.default, null)
        )
      )
    );
  };

  return CreateGroup;
}(_react.Component);

exports.default = CreateGroup;
//# sourceMappingURL=CreateGroup.react.js.map