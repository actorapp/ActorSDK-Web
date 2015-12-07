'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendL18n = extendL18n;
exports.getIntlData = getIntlData;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var language = navigator.language.toLocaleLowerCase() || navigator.browserLanguage.toLocaleLowerCase();

if (language === 'zh-cn') {
  language = 'zh';
}

// Intl polyfill
if (!global.Intl) {
  var addLocaleData = function addLocaleData() {
    var localeData = JSON.parse(this.response);
    IntlPolyfill.__addLocaleData(localeData);
  };

  require('intl');

  var request = new XMLHttpRequest();
  var url = window.location.href;
  var arr = url.split('/');
  var query = language.split('-')[0] + '-' + language.split('-')[1].toUpperCase();
  var localeDataPath = arr[0] + '//' + arr[2] + '/assets/locale-data/' + query + '.json';

  request.addEventListener('load', addLocaleData);
  request.open('GET', localeDataPath);
  request.send();
}

// Set language data
var languageData = {
  'ru': _ruRU2.default,
  'en': _enUS2.default,
  'es': _esES2.default,
  'pt': _ptBR2.default,
  'zh': _zhCN2.default
};

// Extend language data from delegate
function extendL18n() {
  var delegate = _DelegateContainer2.default.get();

  _enUS2.default.messages = delegate.l18n.english ? Object.assign(_enUS2.default.messages, delegate.l18n.english.messages) : _enUS2.default.messages;
  _ruRU2.default.messages = delegate.l18n.russian ? Object.assign(_ruRU2.default.messages, delegate.l18n.russian.messages) : _ruRU2.default.messages;
  _esES2.default.messages = delegate.l18n.spanish ? Object.assign(_esES2.default.messages, delegate.l18n.spanish.messages) : _esES2.default.messages;
  _ptBR2.default.messages = delegate.l18n.portuguese ? Object.assign(_ptBR2.default.messages, delegate.l18n.portuguese.messages) : _ptBR2.default.messages;
  _zhCN2.default.messages = delegate.l18n.chinese ? Object.assign(_zhCN2.default.messages, delegate.l18n.chinese.messages) : _zhCN2.default.messages;
}

function getIntlData() {
  return languageData[language] || languageData[language.split('-')[0]] || languageData['en'];
}
//# sourceMappingURL=index.js.map