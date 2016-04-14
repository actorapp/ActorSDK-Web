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

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _MessageActionCreators = require('../../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _UserStore = require('../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _MessageStore = require('../../stores/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _MessagesList = require('./MessagesList.react');

var _MessagesList2 = _interopRequireDefault(_MessagesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessagesSection = function (_Component) {
  (0, _inherits3.default)(MessagesSection, _Component);

  MessagesSection.getStores = function getStores() {
    return [_MessageStore2.default];
  };

  MessagesSection.calculateState = function calculateState() {
    return {
      uid: _UserStore2.default.getMyId(),
      messages: _MessageStore2.default.getState()
    };
  };

  function MessagesSection(props) {
    (0, _classCallCheck3.default)(this, MessagesSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    _this.onLoadMore = _this.onLoadMore.bind(_this);
    return _this;
  }

  MessagesSection.prototype.onSelect = function onSelect(rid) {
    _MessageActionCreators2.default.toggleSelected(rid);
  };

  MessagesSection.prototype.onLoadMore = function onLoadMore() {
    _DialogActionCreators2.default.loadMoreMessages(this.props.peer);
  };

  MessagesSection.prototype.render = function render() {
    var _props = this.props;
    var peer = _props.peer;
    var isMember = _props.isMember;
    var _state = this.state;
    var uid = _state.uid;
    var _state$messages = _state.messages;
    var messages = _state$messages.messages;
    var overlay = _state$messages.overlay;
    var receiveDate = _state$messages.receiveDate;
    var readDate = _state$messages.readDate;
    var isLoaded = _state$messages.isLoaded;
    var isLoading = _state$messages.isLoading;
    var count = _state$messages.count;
    var selected = _state$messages.selected;


    return _react2.default.createElement(_MessagesList2.default, {
      uid: uid,
      peer: peer,
      isMember: isMember,
      messages: messages,
      overlay: overlay,
      readDate: readDate,
      receiveDate: receiveDate,
      count: count,
      selected: selected,
      isLoaded: isLoaded,
      isLoading: isLoading,
      onSelect: this.onSelect,
      onLoadMore: this.onLoadMore
    });
  };

  return MessagesSection;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

MessagesSection.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  isMember: _react.PropTypes.bool.isRequired
};
exports.default = _utils.Container.create(MessagesSection, { withProps: true });
//# sourceMappingURL=MessagesSection.react.js.map