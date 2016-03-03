'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ColorTypes = {
  HEX: 'hex',
  NAMED: 'named'
};

/**
 * @param color
 * @returns {string | null} Color value
 */
function getColor(color) {
  if (color) {
    switch (color.type) {
      case ColorTypes.HEX:
        return color.hex;
      case ColorTypes.NAMED:
        return color.name;
      default:
        return null;
    }
  } else {
    return null;
  }
}

/**
 * Class that represents component for display modern text message attachment field
 * @param {String} title Field title
 * @param {String} value Field value
 * @param {Boolean} isShort Display short version of field
 */

var Field = (function (_Component) {
  _inherits(Field, _Component);

  function Field(props) {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  Field.prototype.render = function render() {
    var _props = this.props;
    var title = _props.title;
    var value = _props.value;
    var isShort = _props.isShort;

    var fieldClassName = (0, _classnames2.default)('field', {
      'field--short': isShort,
      'col-xs-6': isShort,
      'col-xs-12': !isShort
    });

    return _react2.default.createElement(
      'div',
      { className: fieldClassName },
      title ? _react2.default.createElement(
        'div',
        { className: 'field__title' },
        title
      ) : null,
      value ? _react2.default.createElement(
        'div',
        { className: 'field__value' },
        value
      ) : null
    );
  };

  return Field;
})(_react.Component);

/**
 * Class that represents component for display modern text message attachments
 * @param {Array} fields Array of objects contains attachment fields
 * @param {Object} paragraphStyle Contains attachment styles
 * @param {String} text Attachment text
 * @param {String} title Attachment title
 * @param {String} titleUrl Attachment title url
 */

Field.propTypes = {
  title: _react.PropTypes.string,
  value: _react.PropTypes.string,
  isShort: _react.PropTypes.bool
};

var Attach = (function (_Component2) {
  _inherits(Attach, _Component2);

  function Attach(props) {
    _classCallCheck(this, Attach);

    return _possibleConstructorReturn(this, _Component2.call(this, props));
  }

  Attach.prototype.render = function render() {
    var _props2 = this.props;
    var paragraphStyle = _props2.paragraphStyle;
    var titleUrl = _props2.titleUrl;
    var title = _props2.title;
    var text = _props2.text;
    var fields = _props2.fields;

    var attachmentClassName = (0, _classnames2.default)('attachment', {
      'attachment--paragraph': paragraphStyle.showParagraph
    });

    var attachmentStyles = {
      borderColor: getColor(paragraphStyle.color) || 'transparent',
      backgroundColor: getColor(paragraphStyle.bgColor) || 'transparent'
    };

    var attachmentFields = (0, _lodash.map)(fields, function (field, index) {
      return _react2.default.createElement(Field, _extends({ key: index }, field));
    });

    return _react2.default.createElement(
      'div',
      { className: attachmentClassName, style: attachmentStyles },
      _react2.default.createElement(
        'div',
        { className: 'attachment__title' },
        titleUrl ? _react2.default.createElement(
          'a',
          { href: titleUrl },
          title
        ) : title
      ),
      text ? text : null,
      attachmentFields ? _react2.default.createElement(
        'div',
        { className: 'attachment_fields row' },
        attachmentFields
      ) : null
    );
  };

  return Attach;
})(_react.Component);

/**
 * Class that represents component for display modern text messages content
 * @param {Array} attaches Array of objects contains modern message attached paragraphs
 * @param {Object} paragraphStyle Contains message styles
 * @param {String} text Message text
 * @param {String} className Component class name
 */

Attach.propTypes = {
  paragraphStyle: _react.PropTypes.object,
  text: _react.PropTypes.string,
  title: _react.PropTypes.string,
  titleUrl: _react.PropTypes.string,
  fields: _react.PropTypes.array
};

var TextModern = (function (_Component3) {
  _inherits(TextModern, _Component3);

  function TextModern(props) {
    _classCallCheck(this, TextModern);

    return _possibleConstructorReturn(this, _Component3.call(this, props));
  }

  TextModern.prototype.render = function render() {
    var _props3 = this.props;
    var paragraphStyle = _props3.paragraphStyle;
    var attaches = _props3.attaches;
    var text = _props3.text;
    var className = _props3.className;

    var modernClassName = (0, _classnames2.default)('modern', {
      'modern--paragraph': paragraphStyle.showParagraph
    });

    var modernStyles = {
      borderColor: getColor(paragraphStyle.color) || 'transparent',
      backgroundColor: getColor(paragraphStyle.bgColor) || 'transparent'
    };

    var modernAttachments = (0, _lodash.map)(attaches, function (attachment, index) {
      return _react2.default.createElement(Attach, _extends({ key: index }, attachment));
    });

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: modernClassName, style: modernStyles },
        text ? _react2.default.createElement(
          'p',
          null,
          text
        ) : null,
        modernAttachments
      )
    );
  };

  return TextModern;
})(_react.Component);

TextModern.propTypes = {
  attaches: _react.PropTypes.array,
  paragraphStyle: _react.PropTypes.object,
  text: _react.PropTypes.string,
  className: _react.PropTypes.string
};
exports.default = TextModern;
//# sourceMappingURL=Modern.react.js.map