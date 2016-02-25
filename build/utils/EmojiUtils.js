'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeWithEmoji = exports.preloadEmojiSheet = exports.emojiRegexp = exports.getEmojiCategories = exports.emoji = undefined;

var _lodash = require('lodash');

var _jsEmoji = require('js-emoji');

var _jsEmoji2 = _interopRequireDefault(_jsEmoji);

var _emoji_categories = require('emoji-data/emoji_categories.json');

var _emoji_categories2 = _interopRequireDefault(_emoji_categories);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

_jsEmoji2.default.include_title = true;
_jsEmoji2.default.include_text = true;
_jsEmoji2.default.use_sheet = true;
_jsEmoji2.default.colons_mode = false;
_jsEmoji2.default.img_set = 'apple';
_jsEmoji2.default.img_sets = {
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

exports.emoji = _jsEmoji2.default;
var getEmojiCategories = exports.getEmojiCategories = function getEmojiCategories() {
  var emojiCategories = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _emoji_categories2.default.EmojiDataArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var category = _step.value;

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
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return emojiCategories;
};

var emojiRegexp = exports.emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g;

var preloadEmojiSheet = exports.preloadEmojiSheet = function preloadEmojiSheet() {
  return new Image().src = _jsEmoji2.default.img_sets[_jsEmoji2.default.img_set].sheet;
};

var escapeWithEmoji = exports.escapeWithEmoji = function escapeWithEmoji(text) {
  _jsEmoji2.default.include_title = false;
  _jsEmoji2.default.include_text = false;
  return _jsEmoji2.default.replace_unified((0, _lodash.escape)(text));
};

exports.default = {
  emoji: _jsEmoji2.default,
  emojiRegexp: emojiRegexp,
  getEmojiCategories: getEmojiCategories,
  preloadEmojiSheet: preloadEmojiSheet,
  escapeWithEmoji: escapeWithEmoji
};
//# sourceMappingURL=EmojiUtils.js.map