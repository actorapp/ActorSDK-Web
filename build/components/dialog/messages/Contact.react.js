'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class that represents a component for display contact message content
 */

var Contact = function (_Component) {
  (0, _inherits3.default)(Contact, _Component);

  function Contact() {
    (0, _classCallCheck3.default)(this, Contact);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Contact.prototype.render = function render() {
    var _props = this.props;
    var name = _props.name;
    var photo64 = _props.photo64;
    var emails = _props.emails;
    var pones = _props.pones;
    var className = _props.className;

    var contactClassName = (0, _classnames2.default)(className, 'row');
    var isContactEmpty = emails.length === 0 && pones.length === 0;

    var contactAvatar = photo64 ? _react2.default.createElement(
      'div',
      { className: 'contact__avatar' },
      _react2.default.createElement('img', { src: 'data:image/jpeg;base64,' + photo64, alt: name })
    ) : null;

    var emaislList = [],
        phonesList = [];
    if (emails.length > 0) {
      emaislList = (0, _lodash.map)(emails, function (email, index) {
        return _react2.default.createElement(
          'li',
          { className: 'contact__emails__item', key: index },
          _react2.default.createElement(
            'a',
            { href: 'mailto:' + email },
            email
          )
        );
      });
    }
    // TODO: `pones` must be renamed to `phones` in library
    if (pones.length > 0) {
      phonesList = (0, _lodash.map)(pones, function (phone, index) {
        return _react2.default.createElement(
          'li',
          { className: 'contact__phones__item', key: index },
          _react2.default.createElement(
            'a',
            { href: 'tel:' + phone },
            phone
          )
        );
      });
    }

    return _react2.default.createElement(
      'div',
      { className: contactClassName },
      isContactEmpty ? _react2.default.createElement(
        'div',
        { className: 'contact contact--empty row' },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'error'
        ),
        'Empty contact'
      ) : _react2.default.createElement(
        'div',
        { className: 'contact row' },
        contactAvatar,
        _react2.default.createElement(
          'div',
          { className: 'contact__body col-xs' },
          _react2.default.createElement(
            'div',
            { className: 'contact__name' },
            name
          ),
          emaislList.length > 0 ? _react2.default.createElement(
            'ul',
            { className: 'contact__emails' },
            emaislList
          ) : null,
          phonesList.length > 0 ? _react2.default.createElement(
            'ul',
            { className: 'contact__phones' },
            phonesList
          ) : null
        )
      ),
      _react2.default.createElement('div', { className: 'col-xs' })
    );
  };

  return Contact;
}(_react.Component); /*
                      * Copyright (C) 2015 Actor LLC. <https://actor.im>
                      */

Contact.propTypes = {
  name: _react.PropTypes.string.isRequired,
  photo64: _react.PropTypes.string.isRequired,
  emails: _react.PropTypes.array.isRequired,
  pones: _react.PropTypes.array.isRequired,
  className: _react.PropTypes.string
};
exports.default = Contact;
//# sourceMappingURL=Contact.react.js.map