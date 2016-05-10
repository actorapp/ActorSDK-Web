"use strict";

exports.__esModule = true;
exports.default = isInside;
/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

function isInside(coords, rect) {
  return coords.x > rect.left && coords.y > rect.top && coords.x < rect.left + rect.width && coords.y < rect.top + rect.height;
}
//# sourceMappingURL=isInside.js.map