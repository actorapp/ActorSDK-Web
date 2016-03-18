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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _GroupListActionCreators = require('../../actions/GroupListActionCreators');

var _GroupListActionCreators2 = _interopRequireDefault(_GroupListActionCreators);

var _PeopleStore = require('../../stores/PeopleStore');

var _PeopleStore2 = _interopRequireDefault(_PeopleStore);

var _GroupListStore = require('../../stores/GroupListStore');

var _GroupListStore2 = _interopRequireDefault(_GroupListStore);

var _PeopleList = require('./PeopleList');

var _PeopleList2 = _interopRequireDefault(_PeopleList);

var _GroupList = require('./GroupList');

var _GroupList2 = _interopRequireDefault(_GroupList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var ModalsWrapper = function (_Component) {
  (0, _inherits3.default)(ModalsWrapper, _Component);

  function ModalsWrapper(props) {
    (0, _classCallCheck3.default)(this, ModalsWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.handleKeyDown = function (event) {
      switch (event.keyCode) {
        case _ActorAppConstants.KeyCodes.ESC:
          event.preventDefault();
          _this.handleClose();
          break;
        case _ActorAppConstants.KeyCodes.G:
          if (event.ctrlKey) {
            event.preventDefault();
            _this.handleClose();
            _GroupListActionCreators2.default.open();
          }
          break;
        case _ActorAppConstants.KeyCodes.P:
          if (event.ctrlKey) {
            event.preventDefault();
            _this.handleClose();
            _ContactActionCreators2.default.open();
          }
          break;
        default:
      }
    };

    _this.handleClose = function () {
      var _this$state = _this.state;
      var isPeoplesOpen = _this$state.isPeoplesOpen;
      var isGroupsOpen = _this$state.isGroupsOpen;


      if (isPeoplesOpen) {
        _ContactActionCreators2.default.close();
      }
      if (isGroupsOpen) {
        _GroupListActionCreators2.default.close();
      }
    };

    return _this;
  }

  ModalsWrapper.getStores = function getStores() {
    return [_PeopleStore2.default, _GroupListStore2.default];
  };

  ModalsWrapper.calculateState = function calculateState() {
    return {
      isPeoplesOpen: _PeopleStore2.default.isOpen(),
      isGroupsOpen: _GroupListStore2.default.isOpen()
    };
  };

  ModalsWrapper.prototype.componentWillMount = function componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  };

  ModalsWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  ModalsWrapper.prototype.render = function render() {
    var _state = this.state;
    var isPeoplesOpen = _state.isPeoplesOpen;
    var isGroupsOpen = _state.isGroupsOpen;
    var intl = this.context.intl;


    var wrapperClassName = (0, _classnames2.default)('modal-wrapper', {
      'modal-wrapper--opened': isPeoplesOpen || isGroupsOpen
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
          intl.messages['button.close']
        )
      ),
      isPeoplesOpen ? _react2.default.createElement(_PeopleList2.default, null) : null,
      isGroupsOpen ? _react2.default.createElement(_GroupList2.default, null) : null
    );
  };

  return ModalsWrapper;
}(_react.Component);

ModalsWrapper.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(ModalsWrapper, { pure: false });
//# sourceMappingURL=ModalsWrapper.react.js.map