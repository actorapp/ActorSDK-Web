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

var CreateGroup = function (_Component) {
  (0, _inherits3.default)(CreateGroup, _Component);

  function CreateGroup(props) {
    (0, _classCallCheck3.default)(this, CreateGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

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

  CreateGroup.getStores = function getStores() {
    return [_CreateGroupStore2.default];
  };

  CreateGroup.calculateState = function calculateState() {
    return {
      isOpen: _CreateGroupStore2.default.isModalOpen()
    };
  };

  CreateGroup.prototype.componentWillMount = function componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  CreateGroup.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  CreateGroup.prototype.render = function render() {
    var isOpen = this.state.isOpen;
    var intl = this.context.intl;


    var modalStyle = {
      content: {
        position: null,
        top: null,
        left: null,
        right: null,
        bottom: null,
        border: null,
        background: null,
        overflow: null,
        outline: null,
        padding: null,
        borderRadius: null,
        width: 350
      }
    };

    return _react2.default.createElement(
      _reactModal2.default,
      { className: 'modal-new modal-new--create-group',
        closeTimeoutMS: 150,
        isOpen: isOpen,
        style: modalStyle },
      _react2.default.createElement(
        'header',
        { className: 'modal-new__header' },
        _react2.default.createElement(
          'h3',
          { className: 'modal-new__header__title' },
          intl.messages['modal.createGroup.title']
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
  };

  return CreateGroup;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

CreateGroup.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(CreateGroup);
//# sourceMappingURL=CreateGroup.react.js.map