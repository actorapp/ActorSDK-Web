'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _addons = require('react/addons');

var _addons2 = _interopRequireDefault(_addons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PureRenderMixin = _addons2.default.addons.PureRenderMixin;

var ActivityHeader = (function (_React$Component) {
  _inherits(ActivityHeader, _React$Component);

  function ActivityHeader(props) {
    _classCallCheck(this, ActivityHeader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ActivityHeader).call(this, props));
  }

  _createClass(ActivityHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var title = _props.title;
      var close = _props.close;

      var headerTitle = undefined;
      if (typeof title !== 'undefined') {
        headerTitle = _react2.default.createElement(
          'span',
          { className: 'activity__header__title' },
          title
        );
      }

      return _react2.default.createElement(
        'header',
        { className: 'activity__header toolbar' },
        _react2.default.createElement(
          'a',
          { className: 'activity__header__close material-icons', onClick: close },
          'clear'
        ),
        headerTitle
      );
    }
  }]);

  return ActivityHeader;
})(_react2.default.Component);

ActivityHeader.propTypes = {
  close: _react2.default.PropTypes.func,
  title: _react2.default.PropTypes.string
};

_reactMixin2.default.onClass(ActivityHeader, PureRenderMixin);

exports.default = ActivityHeader;
//# sourceMappingURL=ActivityHeader.react.js.map