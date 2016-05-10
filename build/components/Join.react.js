'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _JoinGroupStore = require('../stores/JoinGroupStore');

var _JoinGroupStore2 = _interopRequireDefault(_JoinGroupStore);

var _JoinGroupActions = require('../actions/JoinGroupActions');

var _JoinGroupActions2 = _interopRequireDefault(_JoinGroupActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Join = function (_Component) {
  _inherits(Join, _Component);

  Join.getStores = function getStores() {
    return [_JoinGroupStore2.default];
  };

  Join.calculateState = function calculateState() {
    return _JoinGroupStore2.default.getState();
  };

  function Join(props) {
    _classCallCheck(this, Join);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _JoinGroupActions2.default.joinGroupViaLink(props.params.token);
    return _this;
  }

  Join.prototype.renderStatus = function renderStatus() {
    var _state = this.state;
    var status = _state.status;
    var token = _state.token;
    var error = _state.error;

    switch (status) {
      case _ActorAppConstants.AsyncActionStates.PROCESSING:
      case _ActorAppConstants.AsyncActionStates.PENDING:
        return _react2.default.createElement(
          'div',
          { className: 'join__message' },
          'Joining to ',
          token,
          '...'
        );

      case _ActorAppConstants.AsyncActionStates.SUCCESS:
        return _react2.default.createElement(
          'div',
          { className: 'join__message join__message--success' },
          'Successfully joined to group!'
        );

      case _ActorAppConstants.AsyncActionStates.FAILURE:
        return _react2.default.createElement(
          'div',
          { className: 'join__message join__message--error' },
          error
        );
    }
  };

  Join.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'join__container' },
      this.renderStatus()
    );
  };

  return Join;
}(_react.Component);

Join.propTypes = {
  params: _react.PropTypes.shape({
    token: _react.PropTypes.string.isRequired
  }).isRequired
};
exports.default = _utils.Container.create(Join);
//# sourceMappingURL=Join.react.js.map