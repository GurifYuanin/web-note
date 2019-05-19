// 复制到剪切板
function copy(message) {
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
function wrapByTag(children, tag, attributes) {
  var isSingleChildren = Object.prototype.toString.call(children).toLowerCase() === '[object string]';
  var isSingleTagElement = SINGLE_TAG_ELEMENTS.indexOf(tag) >= 0;
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
  var stringifiedAttributes = '';
  if (attributes && Object.prototype.toString.call(attributes).toLowerCase() === '[object object]') {
    for (var key in attributes) {
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
function filterRepeat(arr) {
  var result = [];
  if (window.Set) {
    result = [...new Set(arr)];
  } else {
    for (var i = 0; i < arr.length; i++) {
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