'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _GroupMember = require('../activity/GroupMember.react');

var _GroupMember2 = _interopRequireDefault(_GroupMember);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupProfileMembers = function (_Component) {
  (0, _inherits3.default)(GroupProfileMembers, _Component);

  function GroupProfileMembers(props) {
    (0, _classCallCheck3.default)(this, GroupProfileMembers);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  GroupProfileMembers.prototype.renderMembers = function renderMembers() {
    var _props = this.props;
    var groupId = _props.groupId;
    var members = _props.members;


    return members.map(function (member) {
      return _react2.default.createElement(_GroupMember2.default, (0, _extends3.default)({}, member, { gid: groupId, key: member.peerInfo.peer.key }));
    });
  };

  GroupProfileMembers.prototype.render = function render() {
    return _react2.default.createElement(
      'ul',
      { className: 'group_profile__members__list' },
      this.renderMembers()
    );
  };

  return GroupProfileMembers;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

GroupProfileMembers.propTypes = {
  groupId: _react.PropTypes.number,
  members: _react.PropTypes.array.isRequired
};
exports.default = GroupProfileMembers;
//# sourceMappingURL=GroupProfileMembers.react.js.map