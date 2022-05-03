import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const storage = {
  addItem(key, value) {
    const result = JSON.stringify(value);
    localStorage.setItem(key, result);
  },

  getItem(key) {
    try {
      const payload = localStorage.getItem(key);
      return JSON.parse(payload);
    } catch (error) {
      console.error('Error parse');
    }
  },
};

player.on(
  'timeupdate',
  throttle(function (data) {
    storage.addItem('videoplayer-current-time', data.seconds);
  }, 1000),
);
addEventListener('DOMContentLoaded', onPageInit);

function onPageInit() {
  const seconds = localStorage.getItem('videoplayer-current-time');
  player.setCurrentTime(seconds);
}
