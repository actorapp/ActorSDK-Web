'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.extendL18n = extendL18n;
exports.getIntlData = getIntlData;

var _assignDeep = require('assign-deep');

var _assignDeep2 = _interopRequireDefault(_assignDeep);

var _DelegateContainer = require('../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

var _ruRU = require('./ru-RU');

var _ruRU2 = _interopRequireDefault(_ruRU);

var _enUS = require('./en-US');

var _enUS2 = _interopRequireDefault(_enUS);

var _esES = require('./es-ES');

var _esES2 = _interopRequireDefault(_esES);

var _ptBR = require('./pt-BR');

var _ptBR2 = _interopRequireDefault(_ptBR);

var _zhCN = require('./zh-CN');

var _zhCN2 = _interopRequireDefault(_zhCN);

var _reactIntl = require('react-intl');

var _en = require('react-intl/locale-data/en');

var _en2 = _interopRequireDefault(_en);

var _ru = require('react-intl/locale-data/ru');

var _ru2 = _interopRequireDefault(_ru);

var _es = require('react-intl/locale-data/es');

var _es2 = _interopRequireDefault(_es);

var _pt = require('react-intl/locale-data/pt');

var _pt2 = _interopRequireDefault(_pt);

var _zh = require('react-intl/locale-data/zh');

var _zh2 = _interopRequireDefault(_zh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactIntl.addLocaleData)(_en2.default); /*
                                              * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                              */

(0, _reactIntl.addLocaleData)(_ru2.default);
(0, _reactIntl.addLocaleData)(_es2.default);
(0, _reactIntl.addLocaleData)(_pt2.default);
(0, _reactIntl.addLocaleData)(_zh2.default);

var language = navigator.language.toLocaleLowerCase() || navigator.browserLanguage.toLocaleLowerCase();
if (language === 'zh-cn') language = 'zh';

function buildMessages(defaultLanguage, language) {
  if (process.env.NODE_ENV === 'development') {
    (function () {
      var flattenDefault = flattenMessages(defaultLanguage.messages);
      var flattenLanguage = flattenMessages(language.messages);
      var missingKeys = (0, _keys2.default)(flattenDefault).filter(function (key) {
        return !flattenLanguage[key];
      });
      if (missingKeys.length) {
        var groupMessage = 'There are missing transations for "' + language.locale + '" locale.';
        console.groupCollapsed(groupMessage);
        missingKeys.forEach(function (key) {
          console.warn(key + ': ' + flattenDefault[key]);
        });
        console.groupEnd(groupMessage);
      }
    })();
  }

  language.messages = (0, _assignDeep2.default)({}, defaultLanguage.messages, language.messages);
}

// Fallback to default language
var defaultLanguage = _enUS2.default;
buildMessages(defaultLanguage, _ruRU2.default);
buildMessages(defaultLanguage, _esES2.default);
buildMessages(defaultLanguage, _ptBR2.default);
buildMessages(defaultLanguage, _zhCN2.default);

// Set language data
var languageData = {
  'default': defaultLanguage,
  'ru': _ruRU2.default,
  'en': _enUS2.default,
  'es': _esES2.default,
  'pt': _ptBR2.default,
  'zh': _zhCN2.default
};

// Extend language data from delegate
function extendL18n() {
  var delegate = _DelegateContainer2.default.get();

  _enUS2.default.messages = delegate.l18n.english ? (0, _assignDeep2.default)({}, _enUS2.default.messages, delegate.l18n.default.messages, delegate.l18n.english.messages) : _enUS2.default.messages;
  _ruRU2.default.messages = delegate.l18n.russian ? (0, _assignDeep2.default)({}, _ruRU2.default.messages, delegate.l18n.default.messages, delegate.l18n.russian.messages) : _ruRU2.default.messages;
  _esES2.default.messages = delegate.l18n.spanish ? (0, _assignDeep2.default)({}, _esES2.default.messages, delegate.l18n.default.messages, delegate.l18n.spanish.messages) : _esES2.default.messages;
  _ptBR2.default.messages = delegate.l18n.portuguese ? (0, _assignDeep2.default)({}, _ptBR2.default.messages, delegate.l18n.default.messages, delegate.l18n.portuguese.messages) : _ptBR2.default.messages;
  _zhCN2.default.messages = delegate.l18n.chinese ? (0, _assignDeep2.default)({}, _zhCN2.default.messages, delegate.l18n.default.messages, delegate.l18n.chinese.messages) : _zhCN2.default.messages;
}

function flattenMessages(nestedMessages) {
  var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  return (0, _keys2.default)(nestedMessages).reduce(function (messages, key) {
    var value = nestedMessages[key];
    var prefixedKey = prefix ? prefix + '.' + key : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      (0, _assign2.default)(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

function getIntlData(locale) {
  var lang = locale ? locale : language;
  var currentLanguage = languageData[lang] || languageData[lang.split('-')[0]] || languageData['default'];

  return {
    locale: currentLanguage.locale,
    messages: flattenMessages(currentLanguage.messages)
  };
}
//# sourceMappingURL=index.js.map