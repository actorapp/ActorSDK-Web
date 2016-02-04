'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var language = navigator.language.toLocaleLowerCase() || navigator.browserLanguage.toLocaleLowerCase(); /*
                                                                                                         * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                         */

if (language === 'zh-cn') language = 'zh';

// Fallback to default language
var defaultLanguage = _enUS2.default;
_ruRU2.default.messages = (0, _assignDeep2.default)({}, defaultLanguage.messages, _ruRU2.default.messages);
_esES2.default.messages = (0, _assignDeep2.default)({}, defaultLanguage.messages, _esES2.default.messages);
_ptBR2.default.messages = (0, _assignDeep2.default)({}, defaultLanguage.messages, _ptBR2.default.messages);
_zhCN2.default.messages = (0, _assignDeep2.default)({}, defaultLanguage.messages, _zhCN2.default.messages);

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

function getIntlData(locale) {
  var lang = locale ? locale : language;
  return languageData[lang] || languageData[lang.split('-')[0]] || languageData['default'];
}
//# sourceMappingURL=index.js.map