enum Color {
  error = '#ed4014',
  success = '#19be6b',
  warning = '#ff9900',
}
export default class Notify {
  private divEl: HTMLDivElement;
  private timeout: NodeJS.Timeout | null;
  constructor() {
    this.divEl = document.createElement('div');
    this.divEl.setAttribute('class', 'notify');
    this.divEl.style.opacity = '0';
    this.divEl.style.zIndex = '3';
    document.body.appendChild(this.divEl);
    this.timeout = null;
  }

  info(options: {
    duration?: number,
    content?: string,
    type?: 'error' | 'success' | 'warning'
  } = {}) {
    options.duration = options.duration || 2000;
    const { divEl } = this;
    let color = '#2db7f5';
    divEl.innerText = options.content || '';
    divEl.style.opacity = '1';
    divEl.style.transition = 'all 1s';
    switch (options.type) {
      case 'error': color = Color.error; break;
      case 'success': color = Color.success; break;
      case 'warning': color = Color.warning; break;
      default: color = Color.success;
    }
    divEl.style.backgroundColor = color;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(function () {
      divEl.style.opacity = '0';
    }, options.duration);
  }
}