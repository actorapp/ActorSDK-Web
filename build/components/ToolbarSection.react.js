'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _EmojiUtils = require('../utils/EmojiUtils');

var _ActivityActionCreators = require('../actions/ActivityActionCreators');

var _ActivityActionCreators2 = _interopRequireDefault(_ActivityActionCreators);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStateFromStores = function getStateFromStores() {
  return {
    dialogInfo: _DialogStore2.default.getSelectedDialogInfo(),
    isActivityOpen: _ActivityStore2.default.isOpen()
  };
};

var ToolbarSection = (function (_Component) {
  _inherits(ToolbarSection, _Component);

  function ToolbarSection(props) {
    _classCallCheck(this, ToolbarSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToolbarSection).call(this, props));

    _this.onClick = function () {
      if (!_this.state.isActivityOpen) {
        _ActivityActionCreators2.default.show();
      } else {
        _ActivityActionCreators2.default.hide();
      }
    };

    _this.onChange = function () {
      return _this.setState(getStateFromStores());
    };

    _this.state = {
      dialogInfo: null,
      isActivityOpen: false
    };

    _DialogStore2.default.addSelectedChangeListener(_this.onChange);
    _ActivityStore2.default.addChangeListener(_this.onChange);
    return _this;
  }

  _createClass(ToolbarSection, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _DialogStore2.default.removeSelectedChangeListener(this.onChange);
      _ActivityStore2.default.removeChangeListener(this.onChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var dialogInfo = _state.dialogInfo;
      var isActivityOpen = _state.isActivityOpen;

      var infoButtonClassName = (0, _classnames2.default)('button button--icon', {
        'active': isActivityOpen
      });

      if (dialogInfo !== null) {
        return _react2.default.createElement(
          'header',
          { className: 'toolbar row' },
          _react2.default.createElement(
            'div',
            { className: 'toolbar__peer col-xs' },
            _react2.default.createElement('span', { className: 'toolbar__peer__title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(dialogInfo.name) } }),
            _react2.default.createElement(
              'span',
              { className: 'toolbar__peer__presence' },
              dialogInfo.presence
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'toolbar__controls' },
            _react2.default.createElement(
              'div',
              { className: 'toolbar__controls__search pull-left hide' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'search'
              ),
              _react2.default.createElement('input', { className: 'input input--search', placeholder: this.getIntlMessage('search'), type: 'search' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'toolbar__controls__buttons pull-right' },
              _react2.default.createElement(
                'button',
                { className: infoButtonClassName, onClick: this.onClick },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'info'
                )
              ),
              _react2.default.createElement(
                'button',
                { className: 'button button--icon hide' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'more_vert'
                )
              )
            )
          )
        );
      } else {
        return _react2.default.createElement('header', { className: 'toolbar' });
      }
    }
  }]);

  return ToolbarSection;
})(_react.Component);

_reactMixin2.default.onClass(ToolbarSection, _reactIntl.IntlMixin);

exports.default = ToolbarSection;
//# sourceMappingURL=ToolbarSection.react.js.map