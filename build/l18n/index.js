'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intlData = undefined;

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

var language = navigator.language.toLocaleLowerCase() || navigator.browserLanguage.toLocaleLowerCase(); /*
                                                                                                         * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                         */

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

var intlData = exports.intlData = languageData[language] || languageData[language.split('-')[0]] || languageData['en'];

exports.default = { intlData: intlData };
//# sourceMappingURL=index.js.map