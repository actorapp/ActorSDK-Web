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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Fold = function (_Component) {
  (0, _inherits3.default)(Fold, _Component);

  function Fold(props) {
    (0, _classCallCheck3.default)(this, Fold);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onClick = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  Fold.prototype.render = function render() {
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

    var foldIcon = void 0;
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
  };

  return Fold;
}(_react.Component);

Fold.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  icon: _react.PropTypes.string,
  iconClassName: _react.PropTypes.string,
  iconElement: _react.PropTypes.element,
  title: _react.PropTypes.string.isRequired
};
exports.default = Fold;
//# sourceMappingURL=Fold.react.js.map