const gifo = new Gifo();

let theme;
function theme_apply() {
  'use strict';
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}
theme_apply();

function theme_switch() {
  'use strict';
  if (theme === 'light') {
    theme = 'dark';
  } else {
    theme = 'light';
  }
  theme_apply();
}

function getStreamAndRecord () { 

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
           height: { max: 480 }
        }
        })
        .then(function(stream) {
            var video = document.querySelector('video');
            video.srcObject = stream;
            video.play()
        })
}
