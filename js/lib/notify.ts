export default class Notify {
  win: HTMLDivElement;
  timeout: NodeJS.Timeout | null;
  constructor() {
    this.win = document.createElement('div');
    this.win.setAttribute('class', 'notify');
    this.win.style.opacity = '0';
    this.win.style.zIndex = '3';
    document.body.appendChild(this.win);
    this.timeout = null;
  }

  info(options: {
    duration?: number,
    content?: string,
    type?: string
  } = {}) {
    options.duration = options.duration || 2000;
    const win = this.win;
    let color = '#2db7f5';
    win.innerText = options.content;
    win.style.opacity = '1';
    win.style.transition = 'all 1s';
    switch (options.type) {
      case 'error': color = '#ed4014'; break;
      case 'success': color = '#19be6b'; break;
      case 'warning': color = '#ff9900'; break;
    }
    win.style.backgroundColor = color;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(function () {
      win.style.opacity = '0';
    }, options.duration);
  }
}