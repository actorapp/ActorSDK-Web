'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactIntl = require('react-intl');

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _RecentItem = require('./RecentItem.react');

var _RecentItem2 = _interopRequireDefault(_RecentItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RecentGroup = function (_Component) {
  _inherits(RecentGroup, _Component);

  function RecentGroup(props) {
    _classCallCheck(this, RecentGroup);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  RecentGroup.prototype.renderPlusButton = function renderPlusButton() {
    var _props = this.props;
    var group = _props.group;
    var onPlusClick = _props.onPlusClick;

    if (!onPlusClick) {
      return null;
    }

    return _react2.default.createElement(
      _rcTooltip2.default,
      {
        placement: 'top',
        mouseEnterDelay: 0.15,
        mouseLeaveDelay: 0,
        overlay: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.recent.' + group + 'Create' }) },
      _react2.default.createElement(
        'i',
        { className: 'recent__group__plus-button material-icons pull-right', onClick: onPlusClick },
        'add_circle_outline'
      )
    );
  };

  RecentGroup.prototype.renderGroupTitle = function renderGroupTitle() {
    var _props2 = this.props;
    var group = _props2.group;
    var onTitleClick = _props2.onTitleClick;


    var titleMessage = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'sidebar.recents.' + group });
    if (!onTitleClick) {
      return _react2.default.createElement(
        'div',
        { className: 'recent__group__header' },
        _react2.default.createElement(
          'div',
          { className: 'recent__group__title' },
          titleMessage
        )
      );
    }

    var tooltipMessage = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'tooltip.recent.' + group + 'List' });

    return _react2.default.createElement(
      'div',
      { className: 'recent__group__header' },
      _react2.default.createElement(
        'div',
        { className: 'recent__group__title recent__group__title--clickable', onClick: onTitleClick },
        _react2.default.createElement(
          _rcTooltip2.default,
          {
            placement: 'right',
            mouseEnterDelay: 0.15,
            mouseLeaveDelay: 0,
            overlay: tooltipMessage
          },
          titleMessage
        )
      ),
      this.renderPlusButton()
    );
  };

  RecentGroup.prototype.renderGroupList = function renderGroupList() {
    var _props3 = this.props;
    var items = _props3.items;
    var archive = _props3.archive;
    var currentPeer = _props3.currentPeer;
    var onItemUpdate = _props3.onItemUpdate;


    return (0, _lodash.map)(items, function (dialog) {
      var peer = dialog.peer.peer;
      var peerKey = _PeerUtils2.default.peerToString(peer);
      var isActive = _PeerUtils2.default.equals(peer, currentPeer);

      return _react2.default.createElement(_RecentItem2.default, {
        dialog: dialog,
        archiveState: archive[peerKey],
        isActive: isActive,
        onUpdate: onItemUpdate,
        key: peerKey
      });
    });
  };

  RecentGroup.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'recent__group' },
      this.renderGroupTitle(),
      this.renderGroupList()
    );
  };

  return RecentGroup;
}(_react.Component);

RecentGroup.propTypes = {
  group: _react.PropTypes.string.isRequired,
  items: _react.PropTypes.array.isRequired,
  archive: _react.PropTypes.object.isRequired,
  currentPeer: _react.PropTypes.object,
  onTitleClick: _react.PropTypes.func,
  onPlusClick: _react.PropTypes.func,
  onItemUpdate: _react.PropTypes.func.isRequired
};
exports.default = RecentGroup;
//# sourceMappingURL=RecentGroup.react.js.map