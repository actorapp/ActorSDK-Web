'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  show: function show() {
    document.body.classList.add('banner--onscreen');
  },

  hide: function hide() {
    document.body.classList.remove('banner--onscreen');
  },

  jump: function jump(os) {
    window.localStorage.setItem('banner_jump', os);
  }
};
//# sourceMappingURL=BannerActionCreators.js.map