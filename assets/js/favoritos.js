const gifo = new Gifo();
gifo.getFavoritos();

const verGif = (gif) => {
  gifo.verGif(gif)
}


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
