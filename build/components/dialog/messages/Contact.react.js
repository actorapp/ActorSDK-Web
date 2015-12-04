'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Contact = (function (_Component) {
  _inherits(Contact, _Component);

  function Contact(props) {
    _classCallCheck(this, Contact);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Contact).call(this, props));
  }

  _createClass(Contact, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var content = _props.content;
      var className = _props.className;

      var contactClassName = (0, _classnames2.default)(className, 'row');

      var contactAvatar = 'data:image/jpeg;base64,' + content.photo64;

      var emails = undefined,
          phones = undefined;
      if (content.emails.length > 0) {
        emails = (0, _lodash.map)(content.emails, function (email) {
          return _react2.default.createElement(
            'li',
            { className: 'contact__emails__item' },
            _react2.default.createElement(
              'a',
              { href: 'mailto:' + email },
              email
            )
          );
        });
      }
      if (content.pones.length > 0) {
        phones = (0, _lodash.map)(content.pones, function (phone) {
          return _react2.default.createElement(
            'li',
            { className: 'contact__phones__item' },
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
        _react2.default.createElement(
          'div',
          { className: 'contact row' },
          _react2.default.createElement(
            'div',
            { className: 'contact__avatar' },
            _react2.default.createElement('img', { src: contactAvatar,
              alt: content.name })
          ),
          _react2.default.createElement(
            'div',
            { className: 'contact__body col-xs' },
            _react2.default.createElement(
              'div',
              { className: 'contact__name' },
              content.name
            ),
            content.emails.length > 0 ? _react2.default.createElement(
              'ul',
              { className: 'contact__emails' },
              emails
            ) : null,
            content.pones.length > 0 ? _react2.default.createElement(
              'ul',
              { className: 'contact__phones' },
              phones
            ) : null
          )
        ),
        _react2.default.createElement('div', { className: 'col-xs' })
      );
    }
  }]);

  return Contact;
})(_react.Component);

Contact.propTypes = {
  content: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string
};
exports.default = Contact;
//# sourceMappingURL=Contact.react.js.map