'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Fold = (function (_Component) {
  _inherits(Fold, _Component);

  function Fold(props) {
    _classCallCheck(this, Fold);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Fold).call(this, props));

    _this.onClick = function () {
      _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass(Fold, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var icon = _props.icon;
      var iconClassName = _props.iconClassName;
      var title = _props.title;
      var iconElement = _props.iconElement;

      var titleIconClassName = (0, _classnames2.default)('material-icons icon', iconClassName);
      var className = (0, _classnames2.default)({
        'fold': true,
        'fold--open': this.state.isOpen
      });

      var foldIcon = undefined;
      if (icon) {
        foldIcon = _react2.default.createElement(
          'i',
          { className: titleIconClassName },
          icon
        );
      }
      if (iconElement) {
        foldIcon = iconElement;
      }

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'fold__title', onClick: this.onClick },
          foldIcon,
          title,
          _react2.default.createElement(
            'i',
            { className: 'fold__indicator material-icons pull-right' },
            'arrow_drop_down'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'fold__content' },
          this.props.children
        )
      );
    }
  }]);

  return Fold;
})(_react.Component);

Fold.propTypes = {
  children: _react.PropTypes.element,
  icon: _react.PropTypes.string,
  iconClassName: _react.PropTypes.string,
  iconElement: _react.PropTypes.element,
  title: _react.PropTypes.string.isRequired
};
exports.default = Fold;
//# sourceMappingURL=Fold.React.js.map