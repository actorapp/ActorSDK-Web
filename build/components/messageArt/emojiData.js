'use strict';

exports.__esModule = true;

var _EmojiUtils = require('../../utils/EmojiUtils');

var categories = (0, _EmojiUtils.getEmojiCategories)(); /*
                                                         * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                         */

var data = categories.map(function (category) {
  _EmojiUtils.emoji.change_replace_mode('css');

  return {
    title: category.title,
    icon: _EmojiUtils.emoji.replace_colons(category.icon),
    items: category.data.map(function (char) {
      _EmojiUtils.emoji.change_replace_mode('css');
      var icon = _EmojiUtils.emoji.replace_unified(char);

      _EmojiUtils.emoji.colons_mode = true;
      var title = _EmojiUtils.emoji.replace_unified(char);
      _EmojiUtils.emoji.colons_mode = false;

      return { title: title, icon: icon, char: char };
    })
  };
});

exports.default = data;
//# sourceMappingURL=emojiData.js.map