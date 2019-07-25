import { PHONE_WIDTH } from './config';

const SINGLE_TAG_ELEMENTS = ['img', 'input'];

// 复制到剪切板
export function copy(message) {
  const area = document.createElement('textarea'); // 用于临时暂存复制的代码的文本域
  document.body.appendChild(area);
  if (DataTransfer && window.clipboardData instanceof DataTransfer) {
    // IE
    window.clipboardData.setData('text', message);
  } else {
    // 非 IE
    area.value = message;
    area.select(); // 选中
    document.execCommand('copy'); // 复制
  }
  document.body.removeChild(area);
}

// 返回元素 string
export function wrapByTag(children, tag, attributes) {
  const isSingleChildren = Object.prototype.toString.call(children).toLowerCase() === '[object string]';
  const isSingleTagElement = SINGLE_TAG_ELEMENTS.indexOf(tag) >= 0;
  if (!tag) {
    if (!children) {
      throw new ReferenceError('缺少参数');
    } else if (isSingleChildren) {
      // 当参数只有一个的时候，children 作为标签类型 tag
      tag = children;
    } else {
      throw new TypeError('标签类型应该为 string');
    }
  }
  let stringifiedAttributes = '';
  if (attributes && Object.prototype.toString.call(attributes).toLowerCase() === '[object object]') {
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key) && attributes[key]) {
        stringifiedAttributes += ' ' + key + '="' + attributes[key] + '"';
      }
    }
  }
  return '<' + tag + stringifiedAttributes + '>' +
    (isSingleTagElement ? '' : (
      (isSingleChildren ? children : children.join('')) +
      '</' + tag + '>'
    ));
}

// 数组去重
export function filterRepeatArray(arr) {
  const result = [];
  if (window.Set) {
    result.push(...new Set(arr));
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(el);
      }
    }
  }
  return result;
}

// 数组拍平
function flatArray(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...flatArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// 去除多余的字符
export function filterName(str) {
  return str.replace(/[\s$@#&;()/.'"]/g, '');
}

// 获得文件名后缀（不含 .）
export function getSuffix(filename) {
  return filename.substring(filename.lastIndexOf('.') + 1);
}

// 获得文件名
export function getFileName(filename) {
  const start = filename.lastIndexOf('/') + 1;
  const end = filename.lastIndexOf('.');
  return filename.substring(start, end);
}


// 获得视窗大小
export function getViewport(target?: any) {
  // 使用指定窗口，默认使用当前窗口
  target = target || window;
  // 以此检查 IE9+ -> 标准模式 -> 怪异模式
  return {
    'width': target.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    'height': target.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}

// 滚动到指定元素位置
export function scrollTo(name = 'body', el) {
  (el ? el : $('html, body')).animate({
    scrollTop: $(name).offset().top
  }, 500);
}

export function isPhone() {
  return getViewport().width < PHONE_WIDTH;
}