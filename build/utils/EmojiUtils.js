'use strict';

exports.__esModule = true;
exports.escapeWithEmoji = exports.preloadEmojiSheet = exports.emojiRegexp = exports.getEmojiCategories = exports.emoji = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.processEmojiText = processEmojiText;

var _lodash = require('lodash');

var _actorEmoji = require('actor-emoji');

var _actorEmoji2 = _interopRequireDefault(_actorEmoji);

var _emoji_categories = require('actor-emoji/emoji_categories');

var _emoji_categories2 = _interopRequireDefault(_emoji_categories);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

_actorEmoji2.default.include_title = true;
_actorEmoji2.default.include_text = true;
_actorEmoji2.default.use_sheet = true;
_actorEmoji2.default.colons_mode = false;
_actorEmoji2.default.img_set = 'apple';
_actorEmoji2.default.img_sets = {
  'apple': {
    // 'path': Path.toEmoji + '/img-apple-64/',
    'sheet': _ActorAppConstants.Path.toEmoji + '/sheet_apple_64.png',
    'mask': 1
  },
  'google': {
    // 'path': Path.toEmoji + '/img-google-64/',
    'sheet': _ActorAppConstants.Path.toEmoji + '/sheet_google_64.png',
    'mask': 2
  },
  'twitter': {
    // 'path': Path.toEmoji + '/img-twitter-64/',
    'sheet': _ActorAppConstants.Path.toEmoji + '/sheet_twitter_64.png',
    'mask': 4
  },
  'emojione': {
    // 'path': Path.toEmoji + '/img-emojione-64/',
    'sheet': _ActorAppConstants.Path.toEmoji + '/sheet_emojione_64.png',
    'mask': 8
  }
};

exports.emoji = _actorEmoji2.default;
var getEmojiCategories = exports.getEmojiCategories = function getEmojiCategories() {
  var emojiCategories = [];

  for (var _iterator = _emoji_categories2.default.EmojiDataArray, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var category = _ref;

    var title = category.CVDataTitle.replace(/^(.*)-/, '');
    var data = category.CVCategoryData.Data.split(',');
    var icon = '';

    switch (title) {
      case 'People':
        icon = ':grinning:';
        break;
      case 'Nature':
        icon = ':evergreen_tree:';
        break;
      case 'Foods':
        icon = ':hamburger:';
        break;
      case 'Celebration':
        icon = ':gift:';
        break;
      case 'Activity':
        icon = ':football:';
        break;
      case 'Places':
        icon = ':airplane:';
        break;
      case 'Objects':
        icon = ':bulb:';
        break;
      case 'Flags':
        icon = ':flag-ru:';
        break;
      case 'Symbols':
        icon = ':peace_symbol:';
        break;
      default:
    }

    emojiCategories.push({ title: title, icon: icon, data: data });
  }

  return emojiCategories;
};

var emojiRegexp = exports.emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g;

var preloadEmojiSheet = exports.preloadEmojiSheet = function preloadEmojiSheet() {
  return new Image().src = _actorEmoji2.default.img_sets[_actorEmoji2.default.img_set].sheet;
};

var escapeWithEmoji = exports.escapeWithEmoji = function escapeWithEmoji(text) {
  _actorEmoji2.default.include_title = false;
  _actorEmoji2.default.include_text = false;
  return _actorEmoji2.default.replace_unified((0, _lodash.escape)(text));
};

function processEmojiText(text) {
  _actorEmoji2.default.include_title = true;
  _actorEmoji2.default.include_text = true;
  _actorEmoji2.default.change_replace_mode('css');

  var emojifiedText = text;
  emojifiedText = _actorEmoji2.default.replace_colons(text);
  emojifiedText = _actorEmoji2.default.replace_unified(emojifiedText);

  return emojifiedText;
}

exports.default = {
  emoji: _actorEmoji2.default,
  emojiRegexp: emojiRegexp,
  getEmojiCategories: getEmojiCategories,
  preloadEmojiSheet: preloadEmojiSheet,
  escapeWithEmoji: escapeWithEmoji
};
//# sourceMappingURL=EmojiUtils.js.map