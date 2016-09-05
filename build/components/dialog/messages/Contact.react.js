'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

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
 * Class that represents a component for display contact message content
 */
var Contact = function (_Component) {
  _inherits(Contact, _Component);

  function Contact() {
    _classCallCheck(this, Contact);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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
}(_react.Component);

Contact.propTypes = {
  name: _react.PropTypes.string.isRequired,
  photo64: _react.PropTypes.string.isRequired,
  emails: _react.PropTypes.array.isRequired,
  pones: _react.PropTypes.array.isRequired,
  className: _react.PropTypes.string
};
exports.default = Contact;
//# sourceMappingURL=Contact.react.js.map