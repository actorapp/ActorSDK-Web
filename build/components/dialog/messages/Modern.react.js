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

/**
 * Class that represents component for display modern text messages content
 * @param {object} paragraphStyle Contains message styles
 * @param {string} text Message text
 * @param {string} className Component class name
 */

var TextModern = (function (_Component) {
  _inherits(TextModern, _Component);

  function TextModern(props) {
    _classCallCheck(this, TextModern);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TextModern).call(this, props));
  }

  _createClass(TextModern, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var paragraphStyle = _props.paragraphStyle;
      var attaches = _props.attaches;
      var text = _props.text;
      var className = _props.className;

      var modernClassName = (0, _classnames2.default)('modern', {
        'modern--paragraph': paragraphStyle.showParagraph
      });

      var modernStyles = {
        borderColor: paragraphStyle.color ? paragraphStyle.color.name : 'transparent',
        backgroundColor: paragraphStyle.bgColor ? paragraphStyle.bgColor.name : 'transparent',
        color: paragraphStyle.color ? paragraphStyle.color.name : 'inherit'
      };

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: modernClassName, style: modernStyles },
          paragraphStyle.showParagraph ? _react2.default.createElement(
            'p',
            null,
            text
          ) : { text: text }
        )
      );
    }
  }]);

  return TextModern;
})(_react.Component);

TextModern.propTypes = {
  attaches: _react.PropTypes.object.isRequired,
  paragraphStyle: _react.PropTypes.object.isRequired,
  text: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string
};
exports.default = TextModern;
//# sourceMappingURL=Modern.react.js.map