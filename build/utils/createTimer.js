'use strict';

exports.__esModule = true;
var padTime = function padTime(num) {
  return num < 10 ? '0' + num : num;
};

function createTimer(onUpdate) {
  var min = 0;
  var sec = 0;
  var id = setInterval(function () {
    if (sec === 59) {
      sec = 0;
      min++;
    } else {
      sec++;
    }

    onUpdate(padTime(min) + ':' + padTime(sec));
  }, 1000);

  return {
    stop: function stop() {
      clearInterval(id);
    }
  };
}

exports.default = createTimer;
//# sourceMappingURL=createTimer.js.map