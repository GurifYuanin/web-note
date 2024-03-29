import $ from 'jquery';
import _ from 'lodash';
import * as config from './lib/config';
import { formatDate } from './lib/date';
import './lib/init';
import { getChineseName } from './lib/name';
import Notify from './lib/notify';
import path from './lib/path';
import { copy, filterName, filterRepeatArray, getFileName, getViewport, isPhone, scrollTo, wrapByTag } from './lib/util';
import category from './sider/category.json';
import items from './sider/items.json';

// 让页面中的脚本也可以调用 Notify 等方法
Object.assign(window, {
  Notify,
  $
});

$(function() {
  // 弹窗提示
  const notify = new Notify();

  // 添加百度收录统计 tag
  if (window.location.protocol.toLowerCase() !== 'file:') {
    const autopush = document.createElement('script');
    autopush.setAttribute('src', '/static/js/auto-push-to-baidu.js');
    document.head.appendChild(autopush);
  }

  // 添加 viewport 标签
  if (!$('meta[name=viewport]')) {
    const viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1');
    document.head.appendChild(viewport);
  }

  // 添加 icon
  (function() {
    const icon = document.createElement('link');
    icon.setAttribute('rel', 'shortcut icon');
    icon.setAttribute('href', config.IMAGES_DIR + 'web-note.ico');
    icon.setAttribute('type', 'image/vnd.microsoft.icon');
    document.head.appendChild(icon);
  })();

  // 点击 sup 标签打开链接
  (function() {
    const supEls = $('sup').toArray();
    const linkEls = $<HTMLAnchorElement>('.refer>div>a').toArray();
    const links = linkEls.map((a: HTMLAnchorElement) => a.getAttribute('href'));
    for (let i = 0; i < supEls.length; i++) {
      const supEl = supEls[i];
      const supElIndex = Number.parseInt(supEl.innerText.replace(/[\[\]]/g, ''), 10) - 1;
      const link = links[supElIndex];
      if (link) {
        supEl.setAttribute('title', link);
        supEl.addEventListener('click', (event: MouseEvent) => {
          window.open(link);
        });
      }
    }
  })();

  let isBright = false; // 是否在日间模式
  const url = window.location.href;
  const currentTitle = decodeURI(url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.')));
  const $body = $('body');
  const $sidebar = $('#sidebar'); // 导航条
  const $hideCatalog = $('#hideCatalog'); // 隐藏目录图片
  const $showCatalog = $('#showCatalog'); // 显示目录图片
  const $catalog = $('#catalog'); // 隐藏侧栏按钮
  const $title = $('#title'); // 文章标题
  const $container = $('#container'); // 文章内容
  // 插入侧栏
  let sectionEls = '';
  let sectionEl = '';
  for (let i = 0; i < category.length; i++) {
    const isArrowDownCategory = category[i].includes(currentTitle);
    const categoryImageSrc = isArrowDownCategory ?
      (isBright ? config.ARROW_UP_BRIGHT_IMAGE : config.ARROW_UP_DARK_IMAGE) :
      (isBright ? config.ARROW_DOWN_BRIGHT_IMAGE : config.ARROW_DOWN_DARK_IMAGE);
    sectionEls += wrapByTag(
      [
        wrapByTag(
          '',
          'img',
          {
            src: categoryImageSrc,
          },
        ),
        category[i],
      ],
      'h3',
    );
    sectionEl = '';
    for (let j = 0; j < items[i].length; j++) {
      sectionEl += wrapByTag(
        wrapByTag(items[i][j],
          'a',
          {
            href: path.resolve(config.HTML_DIR, category[i], items[i][j] + '.html'),
          }),
        'div',
        {
          id: items[i][j] === currentTitle ? 'currentItem' : null,
        },
      );
    }
    sectionEls += wrapByTag(sectionEl, 'section');
  }
  $sidebar.append(sectionEls);

  // SE
  $catalog.append(`<section id="searchContainer">
    <input id="searchInput" type="text" placeholder="搜索文章"/>
    <div id="searchClear">x</div>
    <section id="searchResult"></section>
    </section>`);

  const $searchInput = $('#searchInput');
  const $searchResult = $('#searchResult');
  const $searchClear = $('#searchClear');
  const selectedBackgroundColor = 'rgb(239, 239, 239)';
  $searchClear.click(function() {
    $searchInput.val('');
    $searchResult.slideUp();
  });

  let selectedSearchItemsIndex = 0; // 高亮选中的搜索条目

  // 根据关键字获得搜索结果列表
  function getSearchResult(keyword: string) {
    const wrappedElements = []; // html 标签包裹后的条目
    const matchRates = []; // 匹配率，非负数数组，越接近 0 表示匹配率越高
    // 查找匹配的条目
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].length; j++) {
        const reg = new RegExp(keyword, 'i');
        const el = items[i][j];
        if (reg.test(el)) {
          const wrappedEl = wrapByTag(
            wrapByTag(
              [
                el.replace(reg,
                  wrapByTag(
                    el.match(reg) || 'div',
                    'span',
                    {
                      class: 'filteredHightLight',
                    },
                  )),
                wrapByTag(
                  '(' + category[i] + ')',
                  'span',
                  {
                    class: 'filteredCategory',
                  },
                ),
              ],
              'a',
              {
                href: path.resolve(config.HTML_DIR, category[i], el + '.html'),
                target: '_blank',
              },
            ),
            'li',
          );
          matchRates.push(Math.abs(el.length - keyword.length));
          wrappedElements.push(wrappedEl);
        }
      }
    }
    // 高匹配度的关键字排前列
    const result = new Array(wrappedElements.length);
    for (let i = wrappedElements.length - 1; i >= 0; i--) {
      let min = Number.MAX_SAFE_INTEGER;
      let index = -1;
      for (let j = 0; j < wrappedElements.length; j++) {
        if (min >= matchRates[j]) {
          min = matchRates[j];
          index = j;
        }
      }
      result.push(wrappedElements[index]);
      wrappedElements.splice(index, 1);
      matchRates.splice(index, 1);
    }
    return result.join('');
  }

  $searchResult.css('display', 'none');
  $searchInput.keyup(function(event) {
    const keyword = ($searchInput.val() || '').toString();
    let searchResult = keyword.trim() === '' ? '' : getSearchResult(keyword);
    if (searchResult.trim() === '') {
      // 没有键入或者搜索结果为空 搜索结果框隐藏
      $searchResult.slideUp();
      if (keyword.trim() === '') { return; } else {
        // 没有搜索到结果 拆分搜索条件重新尝试
        const splitedKeywords = filterRepeatArray(keyword.split(''));
        for (let i = 0; i < splitedKeywords.length; i++) {
          const splitedKeywordSearchResult = getSearchResult(splitedKeywords[i]);
          searchResult = splitedKeywordSearchResult.length > searchResult.length ? splitedKeywordSearchResult : searchResult; // 保留搜索结果最多的
        }
        if (searchResult === '') { return; }
      }
    }
    if ((event.keyCode < 37 || event.keyCode > 40) && event.keyCode !== 13) {
      // 有搜素结果
      $searchResult.html(searchResult);
      $searchResult.stop(true, true).slideDown();
      // $searchResult.css('display', 'block');
    }
    // 根据不同的特殊键，响应不同的样式
    const $searchResults = $('#searchResult li');
    switch (event.keyCode) {
      case 13: // 回车键，打开新窗口
        let index = $searchResults.toArray().findIndex(function(element) {
          return element.style.backgroundColor === selectedBackgroundColor;
        });
        if ($searchResults.length > index) {
          index = index === -1 ? 0 : index;
          window.open($searchResults.eq(index).children().eq(0).attr('href'));
        }
        break;
      case 37: break; // 左箭头，无视
      case 38: // 上箭头
        if (selectedSearchItemsIndex > 0) {
          selectedSearchItemsIndex--;
        }
        if (selectedSearchItemsIndex < $searchResults.length) {
          $searchResults.eq(selectedSearchItemsIndex).css('background-color', '');
        }
        if (selectedSearchItemsIndex > 0) {
          $searchResults.eq(selectedSearchItemsIndex - 1).css('background-color', selectedBackgroundColor);
        }
        break;
      case 39: break; // 右箭头，无视
      case 40:
        if (selectedSearchItemsIndex > 0) {
          $searchResults.eq(selectedSearchItemsIndex - 1).css('background-color', '');
        }
        if (selectedSearchItemsIndex < $searchResults.length) {
          $searchResults.eq(selectedSearchItemsIndex).css('background-color', selectedBackgroundColor);
          selectedSearchItemsIndex++;
        }
        break;
      default: selectedSearchItemsIndex = 0;
    }
  });
  // $container.click(function() {
  //     $searchResult.css('display', 'none');
  // });
  /*
  侧栏结构：
  <aside id="sidebar">
    <section id="catalog">
          <img id="hideCatalog">
        目录
          /////////////////////////////////// 插入 SE
          <section>
              <input id="searchInput">
              <section id="searchResult">
                  <li>搜索出来的条目</li>
              </section>
          </section>
      </section>
      //////////////////////////////////////// 此处开始插入
      //////////////////////////////////////// 第一层循环
  <h3>
          <img src="../images/slide_down.png">
          catalog 类别
      </h3>
      //////////////////////////////////////// 第二层循环
      <section>
          <div>
              <a>
                  items 条目
              </a>
          </div>
      </section>
  </aside>
  */
  // 点击类别开关子项
  const $itemHeads = $('#sidebar h3'); // catalog
  $itemHeads.each(function() {
    const that = $(this),
      img = that.children();
    that.click(function() {
      const imageName = getFileName(img.attr('src'));
      const isArrowDownCategory = imageName === config.ARROW_DOWN_BRIGHT_FILENAME || imageName === config.ARROW_DOWN_DARK_FILENAME;
      img.attr('src', isArrowDownCategory ?
        (isBright ? config.ARROW_UP_BRIGHT_IMAGE : config.ARROW_UP_DARK_IMAGE) :
        (isBright ? config.ARROW_DOWN_BRIGHT_IMAGE : config.ARROW_DOWN_DARK_IMAGE));
      that.next().slideToggle('slow');
    });
  });

  // 将不是目前浏览的条目收起来
  for (let i = 0; i < items.length; i++) {
    if (items[i].includes(currentTitle)) { continue; }
    $itemHeads.eq(i).click();
  }
  // 将当前浏览的条目展开
  if (currentTitle !== 'index' && !/.+\/html\/$/.test(currentTitle)) {
    setTimeout(function() {
      scrollTo('#currentItem', $sidebar);
      const el = $('#currentItem > a');
      el.animate({
        'font-size': '1.25rem',
        'font-weight': 900,
      }, 1000, function() {
        el.animate({
          'font-size': '1rem',
          'font-weight': 'bold',
        }, 1000);
      });
    }, 500);
  }

  $title.after(`<div class="lastModify"><img style="height: 25px;" src="${config.IMAGES_DIR + 'modify.svg'}"></div>
    <div class="lastModify">共  ${$container.text().replace(/[\s\r\n]/g, '').length} 字</div>
    <div class="lastModify">${document.lastModified}</div>
    <div class="switch">
    <input id="toggle" type="checkbox" title="切换主题">
    <label for="toggle"><i></i></label>
    <span></span>
    </div>`);
  $('#toggle').click(toggleTheme);

  // 代码类型提醒
  $('.hljs').each(function(i, el) {
    const codeType = document.createElement('div'); // 显示代码的类型（语言）
    const codeCopy = document.createElement('div'); // 赋值代码按钮
    codeType.setAttribute('class', 'codeType');
    codeCopy.setAttribute('class', 'codeCopy codeDark');
    const elClass = el.getAttribute('class') || '';
    const type = elClass.split(' ')[0]; // 取出是哪种类型的代码
    codeType.innerText = type;
    const container = document.createElement('div');
    container.setAttribute('class', 'codeTypeCopyContainer');
    container.appendChild(codeType);
    container.appendChild(codeCopy);
    container.setAttribute('title', '复制代码');
    container.onclick = function () {
      copy(el.innerText.trim());
      notify.info({ content: '已经复制到剪切板' });
    };
    el.before(container);
  });

  // 文章标题点击后变换样式
  const $theme = $('link').eq(2); // 主题颜色
  const $codeStyle = $('link').eq(1); // 代码颜色
  const $itemBlockImg = $('#sidebar h3 img');
  const $codeCopy = $('.codeCopy');
  function toggleTheme() {
    $theme.attr('href', isBright ? config.DARK_CSS : config.BRIGHT_CSS);
    $codeStyle.attr('href', isBright ? config.BRIGHT_CODE_STYLE : config.DARK_CODE_STYLE);
    // $line.css('stroke', isBright ? '#fff' : '#000');
    $hideCatalog.attr('src', isBright ? config.CATALOG_DARK_IMAGE : config.CATALOG_BRIGHT_IMAGE);
    $itemBlockImg.each(function(i: number, element: HTMLImageElement) {
      const { src } = element;
      element.src = isBright ?
        src.substring(0, src.lastIndexOf('.')) + '_dark.png' :
        src.substring(0, src.lastIndexOf('_')) + '.png';
    } as (this: HTMLElement, index: number, element: HTMLElement) => false | void);
    // $('a').each(function(i, el) {
    //     el.href = isBright ? el.href + '?theme=dark' : el.href.replace('?theme=dark', '');
    // });
    $codeCopy.toggleClass('codeDark');
    isBright = !isBright;
  }
  // if (url.indexOf('?theme=bright') >= 0) {
  //     toggleTheme();
  // }

  function widthAndMargin(start: number, end: number, piece: number, time: number) {
    // width: start% -> end%
    // margin: 0 4% -> 0 5%
    // piece: 动画分段数量（关键帧数量）
    // time：动画时长（s，秒）
    const valInc = (end - start) / piece;
    const timeInc = time * 1000 / piece;
    let widthStart: number, widthInc: number;
    if (start < end) {
      widthStart = 4;
      widthInc = 1 / piece;
    } else {
      widthStart = 5;
      widthInc = -1 / piece;
    }
    for (let i = start, delay = 0; i !== end; i += valInc, widthStart += widthInc, delay += timeInc) {
      (function() {
        const percentage = i + '%';
        const margin = '0 ' + widthStart + '%';
        setTimeout(function() {
          $container.css({
            width: percentage,
            margin,
          });
        }, delay);
      })();
    }
    // 进行最后一次更新
    setTimeout(function() {
      widthStart += widthInc;
      $container.css({
        width: end + '%',
        margin: '0 ' + widthStart + '%',
      });
    }, time * 1000);
  }
  // 折叠目录
  function hideCatalog(cb?: CallableFunction) {
    $sidebar.animate({ // 侧栏隐藏
      width: '0',
      padding: '0',
    }, 'slow', function() {
      $sidebar.css('display', 'none');
      // 如果是电脑则允许重新展开侧栏
      $showCatalog.css('display', isPhone() ? 'none' : 'block');
      if (cb) { cb(); }
    });

    widthAndMargin(65, 90, 25, 1);
  }
  // 展开目录
  function showCatalog() {
    let width = getViewport().width;
    let padding;
    // 如果视窗大小小于 600 px
    if (isPhone()) {
      width = '100%';
      padding = '0';
    } else {
      width = '25%';
      padding = '1%';
    }
    $showCatalog.css('display', 'none');
    $sidebar.css('display', 'inline-block');
    $sidebar.animate({
      width,
      padding,
    }, 'slow');
    if (getViewport().width > 600) { widthAndMargin(90, 65, 20, 0.5); }
  }
  $hideCatalog.attr({
    title: '点击隐藏侧栏',
    src: isBright ? config.CATALOG_BRIGHT_IMAGE : config.CATALOG_DARK_IMAGE,
  });
  $showCatalog.attr('title', '点击显示侧栏');
  $hideCatalog.click((e) => hideCatalog());
  $showCatalog.click(showCatalog);

  // 添加手机顶部导航元素
  $body.append('<div id="phoneMenu">' +
    '<a class="self" href="/" >返回首页</a>' +
    '<a id="phoneShowCatalog" href="javascript:void(0)">返回导航</a>' +
    '</div>');
  const $phoneMenu = $('#phoneMenu');
  const $phoneShowCatalog = $('#phoneShowCatalog');

  function isSidebarFull() {
    return $sidebar.css('width') === '100%';
  }
  window.addEventListener('resize', function() {
    const width = getViewport().width;
    if (width < 1000 && $sidebar.css('display') !== 'none' && !isSidebarFull()) {
      hideCatalog();
    } else if (width >= 1000 && isSidebarFull()) {
      hideCatalog(showCatalog);
    }
    if (isPhone()) {
      $showCatalog.css('display', 'none');
    } else {
      if ($sidebar.css('width') === '0px') { $showCatalog.css('display', 'block'); }
      $phoneMenu.stop().slideUp();
    }
  });

  let scrollTimer: NodeJS.Timeout | null = null;
  let lastBodyTop = document.body.getBoundingClientRect().top;
  window.addEventListener('scroll', function(event) {
    if (isPhone()) {
      if (scrollTimer) { clearTimeout(scrollTimer); }
      scrollTimer = setTimeout(function() {
        const currentBodyTop = document.body.getBoundingClientRect().top;
        if (currentBodyTop > lastBodyTop) {
          $phoneMenu.stop().slideDown();
        } else {
          $phoneMenu.stop().slideUp();
        }
        lastBodyTop = currentBodyTop;
      }, 20);
    }
  });
  $phoneShowCatalog.click(function() {
    if (!isSidebarFull()) { showCatalog(); }
    scrollTo();
  });

  $('a').not('.self').attr('target', '_blank'); // 所有链接默认新标签打开

  const $sectionEls = $('#container>section');
  const $subTitle = $('#container>section>h2'); // 二级子标题
  const SUBTITLE_BLOCK_NUMBER = 4;
  let subTitleNav = ''; // 子标题导航 html 字符串
  let subTitleToggleString = ''; // 子标题导航开关
  for (let i = 1; i <= SUBTITLE_BLOCK_NUMBER; i++) {
    subTitleToggleString += '<div class="block block' + i + '"></div>';
  }
  subTitleToggleString = '<div id="subTitleToggle">' + subTitleToggleString + '</div>';

  // 点击后子标题置顶到窗口
  const currentH2 = decodeURI(url.substring(url.indexOf('#') + 1));
  // currentH2 = currentH2.replace(/\?theme=(dark)|(bright)/, '');
  $subTitle.each(function(i, el) {
    const $h3TitleEls = $sectionEls.eq(i).children('h3');
    const h2Title = el.innerText;
    const filteredH2Title = filterName(h2Title);
    // 子标题包裹为超链接
    $(this).wrap(`<a
      style="height: 50%; margin: 0; padding: 0; text-decoration: none; color: #000;"
      id="${filteredH2Title}"
      href="#${filteredH2Title}"
    ></a>`);
    // 点击后滑动窗口
    el.onclick = function() {
      scrollTo('#' + filteredH2Title);
    };
    if (h2Title === currentH2) { el.click(); }
    subTitleNav += `
      <div class="subTitleItem">
        ${h2Title}
        ${$h3TitleEls.length > 0 ? `<div class="subSubTitleItem">
        ${$h3TitleEls
          .toArray()
          .map((h3TitleEl) => `<div>${h3TitleEl.innerText}</div>`)
          .join('')}
        </div>` : ''}
      </div>
    `;
  });
  subTitleNav = '<div id="subTitleNav">' + subTitleNav + '<div class="subTitleItem">返回顶部</div></div>';
  // 右下角子标题导航
  // 添加 html 元素
  $body.append(subTitleNav + subTitleToggleString);
  // 设置跳转事件
  const $subTitleItem = $('.subTitleItem');
  const $subTitleToggle = $('#subTitleToggle');
  const $subTitleBlock = $('#subTitleToggle>div.block');
  $subTitleItem.each(function(i, el) {
    const filteredH2Title = filterName($subTitle.eq(i).text());
    const targetElId = filteredH2Title ? '#' + filteredH2Title : 'body';
    el.onclick = function() {
      scrollTo(targetElId);
    };
  });
  let isLeave = false; // 判断光标是否已经离开导航面板
  let isShow = false; // 判断导航块是否已经出现
  const itemInterval = 50; // 导航项动画间隔
  const blockInterval = 100; // 块动画间隔
  // 展开子标题导航
  function showBlock(event: any) {
    let time = 0;
    // 块消失
    for (let i = $subTitleBlock.length; i >= 0; i-- , time += blockInterval) {
      setTimeout(function() {
        $subTitleBlock.eq(i).hide('fast');
      }, time);
    }
    // 导航项出现
    for (let i = $subTitleItem.length - 1; i >= 0; i-- , time += itemInterval) {
      setTimeout(function() {
        if (!isLeave) {
          $subTitleItem.eq(i).fadeIn(100);
        }
      }, time);
    }
    isShow = true;
    // 取消事件冒泡
    event.stopPropagation(); // 非IE
    event.cancelBubble = true; // IE
  }
  // 隐藏子标题导航
  document.body.onclick = function(event) {
    if ((event.target as HTMLDivElement).getAttribute('class') !== 'subTitleItem') {
      let time = 0;
      isLeave = true; // 加锁，不让导航项出现
      // 导航项消失
      for (let i = 0; i < $subTitleItem.length; i++ , time += itemInterval) {
        setTimeout(function() {
          $subTitleItem.eq(i).fadeOut(100);
        }, time);
      }
      // 块出现
      for (let i = 0; i < $subTitleBlock.length; i++ , time += blockInterval) {
        setTimeout(function() {
          $subTitleBlock.eq(i).show('fast');
        }, time);
      }
      setTimeout(function() {
        isLeave = false; // 开锁，允许导航项出现
      }, $subTitleItem.length * itemInterval + $subTitleBlock.length * blockInterval);
      isShow = false;
    }

  };
  $subTitleToggle.attr('title', '点击显示子标题导航');
  $subTitleToggle.click(showBlock);

  // 追加上一篇和下一篇操作
  let preTitle = '没有了',
    nextTitle = '没有了',
    preCategory = '',
    nextCategory = '';

  const allItems = _.flattenDeep<string>(items);
  const index = allItems.includes(currentTitle) ? allItems.indexOf(currentTitle) : 0;
  if (index !== 0) {
    preTitle = allItems[index - 1];
    preCategory = category[
      items.findIndex((its) => its.includes(preTitle))
    ];
  }
  if (index !== allItems.length - 1) {
    nextTitle = allItems[index + 1];
    nextCategory = category[
      items.findIndex((its) => its.includes(nextTitle))
    ];
  }

  const preTitleEl = wrapByTag(
    preTitle,
    'a',
    {
      href: preTitle === '没有了' ?
        'javascript:void(0)' :
        path.resolve(config.HTML_DIR, preCategory, preTitle + '.html'),
    },
  );
  const nextTitleEl = wrapByTag(
    nextTitle,
    'a',
    {
      href: nextTitle === '没有了' ?
        'javascript:void(0)' :
        path.resolve(config.HTML_DIR, nextCategory, nextTitle + '.html'),
    },
  );
  const $refer = $('.refer');
  $refer.after('<div id="footer" >' +
    '<div class="prePage">上一篇：' + preTitleEl + '</div>' +
    '<div class="nextPage">下一篇：' + nextTitleEl + '</div>' +
    '</div>');

  // 获得元素的宽度
  function getWidth(el: HTMLElement) {
    const width: string | null = Boolean(window.getComputedStyle) ?
      getComputedStyle(el).width :
      el.currentStyle.width;
    const parsedWidth = Number.parseInt(width || '0', 10);
    return parsedWidth === 0 ?
      el.clientWidth || el.scrollWidth || el.offsetWidth || 500 :
      parsedWidth;
  }
  // 获得每次缩放的增量
  function getIncreatement(img?: HTMLImageElement) {
    return img ?
      img.naturalWidth ? img.naturalWidth * .2 : getWidth(img) * .2 :
      50;
  }

  function bothDisapper() {
    smaller.style.opacity = bigger.style.opacity = '0';
    if (disapearTimer) {
      clearTimeout(disapearTimer);
    }
    disapearTimer = setTimeout(function() {
      smaller.style.display = bigger.style.display = 'none';
    }, 1000);
  }
  // 偏移图像
  function offsetImg(e: MouseEvent, flag: boolean) {
    const img = imgContainer.lastChild;
    if (img instanceof HTMLImageElement && e) {
      const vw = getViewport();
      let h = vw.height / 2 - e.clientY;
      let w = vw.width / 2 - e.clientX;
      h = flag ? h / 2 : Math.sqrt(h);
      w = flag ? w / 2 : Math.sqrt(w);
      let left = Number.parseInt(img.style.paddingLeft || '0', 10),
        right = Number.parseInt(img.style.paddingRight || '0', 10),
        top = Number.parseInt(img.style.paddingTop || '0', 10),
        bottom = Number.parseInt(img.style.paddingBottom || '0', 10);
      flag ? left += w - right : left -= w - right;
      flag ? right -= w : right += w;
      flag ? bottom += h - top : bottom -= h - top;
      flag ? top += h : top -= h;
      img.style.paddingLeft = Math.max(left, 0) + 'px';
      img.style.paddingRight = Math.max(right, 0) + 'px';
      img.style.paddingTop = Math.max(top, 0) + 'px';
      img.style.paddingBottom = Math.max(bottom, 0) + 'px';
    }
  }

  function enSmaller() {
    const child = imgContainer.lastChild as HTMLImageElement;
    const oldWidth = getWidth(child);
    child.style.width = oldWidth - getIncreatement(child) + 'px';
  }

  function changeImg(flag: boolean) {
    if (imgContainer.lastChild instanceof HTMLImageElement) {
      const img = imgContainer.lastChild,
        imgs = $('#container figure>img').toArray() as HTMLImageElement[];
      for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].src === img.src) {
          flag ?
            i - 1 >= 0 ? img.src = imgs[i - 1].src : notify.info({ content: '已经是第一张了' }) : // 上一张
            i + 1 < imgs.length ? img.src = imgs[i + 1].src : notify.info({ content: '已经是最后一张了' }); // 下一张
          break;
        }
      }
    }
  }
  // 正文内容的图片点击后预览
  let disapearTimer: NodeJS.Timer | null = null; // bothDdiv 消失的定时器
  let smallerTimer: NodeJS.Timer | null = null;
  let biggerTimer: NodeJS.Timer | null = null;
  const mask = document.createElement('div');
  const imgContainer = document.createElement('div');
  const closeImg = document.createElement('div');
  const resetImg = document.createElement('div');
  const onlySmaller = document.createElement('div');
  const onlyBigger = document.createElement('div');
  const downloadImg = document.createElement('div');
  let imgOriginWidth: number | null = null;
  // download
  downloadImg.innerText = '↓';
  downloadImg.setAttribute('title', '下载');
  downloadImg.setAttribute('class', 'closeImg');
  downloadImg.style.right = '200px';
  downloadImg.onclick = function() {
    if (imgContainer.lastChild instanceof HTMLImageElement) {
      const { src } = imgContainer.lastChild;
      const a = document.createElement('a');
      a.setAttribute('download', src);
      a.setAttribute('href', src);
      a.setAttribute('target', '_blank');
      a.click();
    }
  };
  // smaller
  onlySmaller.innerText = '-';
  onlySmaller.setAttribute('title', '缩小');
  onlySmaller.setAttribute('class', 'closeImg');
  onlySmaller.style.right = '150px';
  onlySmaller.onmousedown = function() {
    enSmaller();
    if (smallerTimer) {
      clearInterval(smallerTimer);
    }
    smallerTimer = setInterval(enSmaller, 200);
  };
  onlySmaller.onmouseup = function() {
    if (smallerTimer) {
      clearInterval(smallerTimer);
    }
  };
  // bigger
  onlyBigger.innerText = '+';
  onlyBigger.setAttribute('title', '放大');
  onlyBigger.setAttribute('class', 'closeImg');
  onlyBigger.style.right = '100px';
  onlyBigger.onmousedown = function() {
    enBigger();
    if (biggerTimer) {
      clearInterval(biggerTimer);
    }
    biggerTimer = setInterval(enBigger, 200);
  };
  onlyBigger.onmouseup = function() {
    if (biggerTimer) {
      clearInterval(biggerTimer);
    }
  };
  // close
  closeImg.innerText = 'x';
  closeImg.setAttribute('title', '关闭');
  closeImg.setAttribute('class', 'closeImg');
  closeImg.onclick = function() {
    if (imgContainer.lastChild instanceof HTMLImageElement) {
      imgContainer.removeChild(imgContainer.lastChild);
      imgContainer.style.display = 'none';
      mask.style.display = 'none';
      lastImg.style.display = 'none';
      nextImg.style.display = 'none';
      bothDisapper();
    }
  };
  // reset
  resetImg.innerText = 'r';
  resetImg.setAttribute('class', 'closeImg');
  resetImg.style.right = '50px';
  resetImg.setAttribute('title', '复原');
  resetImg.onclick = function() {
    if (imgContainer.lastChild instanceof HTMLImageElement) {
      imgContainer.lastChild.style.padding = '0px';
      if (imgOriginWidth) {
        imgContainer.lastChild.style.width = imgOriginWidth + 'px';
      }
    }
  };
  mask.setAttribute('class', 'mask');
  imgContainer.appendChild(downloadImg);
  imgContainer.appendChild(onlySmaller);
  imgContainer.appendChild(onlyBigger);
  imgContainer.appendChild(resetImg);
  imgContainer.appendChild(closeImg);
  imgContainer.setAttribute('class', 'imgContainer');
  imgContainer.onclick = bothDisapper;
  window.addEventListener('scroll', bothDisapper);
  document.body.appendChild(mask);
  document.body.appendChild(imgContainer);

  const smaller = document.createElement('div');
  const bigger = document.createElement('div');
  const lastImg = document.createElement('div');
  const nextImg = document.createElement('div');
  smaller.innerText = '-';
  bigger.innerText = '+';
  smaller.style.opacity = bigger.style.opacity = '0';
  smaller.style.borderRadius = '5px 0 0 5px';
  bigger.style.borderRadius = '0 5px 5px 0';
  smaller.style.marginLeft = '-1px';
  bigger.style.marginRight = '-1px';
  smaller.setAttribute('class', 'scaleDiv');
  bigger.setAttribute('class', 'scaleDiv');
  smaller.setAttribute('title', '缩小图像');
  bigger.setAttribute('title', '放大图像');
  lastImg.innerText = '←';
  nextImg.innerText = '→';
  lastImg.setAttribute('title', '上一张');
  nextImg.setAttribute('title', '下一张');
  lastImg.setAttribute('class', 'changeImg');
  nextImg.setAttribute('class', 'changeImg');
  nextImg.style.right = '0';
  lastImg.style.display = 'none';
  nextImg.style.display = 'none';
  lastImg.onclick = function() {
    changeImg(true);
  };
  nextImg.onclick = function() {
    changeImg(false);
  };

  function enBigger() {
    const child = imgContainer.lastChild as HTMLImageElement;
    const oldWidth = getWidth(child);
    child.style.width = oldWidth + getIncreatement(child) + 'px';
  }
  smaller.onclick = function(e) {
    enSmaller();
    offsetImg(e, false);
  };
  bigger.onclick = function(e) {
    enBigger();
    offsetImg(e, true);
  };
  document.body.appendChild(smaller);
  document.body.appendChild(bigger);
  document.body.appendChild(lastImg);
  document.body.appendChild(nextImg);
  $('#container figure>img').each(function() {
    const el = $(this);
    el.attr('title', '点击放大');
    el.click(function() {
      const img = document.createElement('img');
      img.setAttribute('class', 'tmpImg');
      img.setAttribute('title', '点击右键打开缩放菜单');
      img.setAttribute('src', el.attr('src') || '');
      imgContainer.style.display = mask.style.display = 'block';
      // 按下右键弹出选项
      img.oncontextmenu = function(e) {
        if (disapearTimer) {
          clearTimeout(disapearTimer);
        }
        smaller.style.display = bigger.style.display = 'block';
        smaller.style.opacity = bigger.style.opacity = '1';
        bigger.style.left = e.pageX + 'px';
        smaller.style.left = e.pageX - 50 + 'px';
        smaller.style.top = bigger.style.top = e.pageY + 'px';
        // 取消默认事件
        e.preventDefault(); // 非IE
        e.returnValue = false; // IE
        return false;
      };
      lastImg.style.display = '';
      nextImg.style.display = '';
      imgContainer.appendChild(img);
      setTimeout(function() {
        imgOriginWidth = getWidth(img);
        img.style.width = imgOriginWidth + 'px';
      }, 0);
      img.style.padding = '0px';
    });
  });
  // $('html').eq(0).css('font-size', getRootFontSize()); // 设置 html（根） 字体大小
  // 侧栏高度自适应
  // $(window).on("load f",function(){
  //     var h = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
  //     $sidebar.css("height", h);
  // });
  //
  // 目录结构部分
  // div#catalogFrame
  //     img
  //     div

  (function() {
    // 点击后 slideUp 和 slideDown
    const $dir = $('#catalogFrame img');
    if ($dir.length) {
      $dir.click(function() {
        const brother = $(this).next().next();
        if (typeof brother !== 'undefined' && brother.prop('tagName').toUpperCase() === 'DIV') {
          brother.toggle(500);
        }
      });
    }
    // 设置表格默认样式
    const $table = $('table');
    if ($table.length) {
      $table.attr({
        border: 1,
        cellpadding: 1,
        cellspacing: 0,
      });
      $table.each(function() {
        $(this).parent().css('overflow', 'auto');
      });
    }
  })();

  (function() {
    // 点击关键字进行百度搜索
    $('.different, .definition').click(function() {
      const that = $(this);
      const hasSearched = that.attr('has-searched');
      const keyword = that.text();
      if (hasSearched) { return; }
      $.ajax({
        method: 'GET',
        url: 'http://47.102.208.48:8082/api/search/',
        data: {
          keyword,
          access_token: '1b3f5b75ffbb73abc4f717d1bb17eaadae9127f8a35466cd721c9ac',
        },
        dataType: 'json',
        success(data: {
          items: Array<{
            is_ad: boolean,
            href: string,
            description: string,
            title: string,
          }>,
          length: number,
          charset: string,
          keyword: string,
        }) {
          if (data.items.length > 0) {
            that.attr('has-searched', 'true');
            const list = data.items.filter(function(item) {
              return !item.is_ad;
            });
            const searchResultEl = document.createElement('div');
            const headerEl = document.createElement('div');
            const closeEl = document.createElement('span');
            closeEl.innerText = '✘';
            closeEl.setAttribute('class', 'searchResultClose');
            closeEl.onclick = function(event) {
              that.empty();
              that.text(keyword);
              that.removeAttr('has-searched');
              event.stopPropagation();
            };
            headerEl.innerText = '相关搜索';
            searchResultEl.appendChild(closeEl);
            headerEl.style.textAlign = 'center';
            searchResultEl.setAttribute('title', '点击关闭');
            searchResultEl.appendChild(headerEl);
            searchResultEl.setAttribute('class', 'differentSearch');
            // searchResultEl.onclick = closeSearchResultEl;
            for (let i = 0; i < list.length; i++) {
              const div = document.createElement('div');
              const a = document.createElement('a');
              div.appendChild(a);
              a.setAttribute('href', list[i].href);
              a.setAttribute('title', list[i].description);
              a.setAttribute('target', '_blank');
              a.onclick = function(event) {
                event.stopPropagation();
              };
              a.innerHTML = list[i].title;
              searchResultEl.appendChild(div);
            }
            that.append(searchResultEl);
            $(searchResultEl).fadeIn();
          } else {
            notify.info({ content: '查无相关内容' });
          }
        },
        error() {
          notify.info({
            type: 'error',
            content: '查询出错',
          });
        },
      });
    });
  })();

  // 添加评论区
  // 添加一条评论
  function addOneComment(el: {
    username?: string,
    create_time: string,
    floor: number,
    comment_content: string,
  }) {
    const oneComment = document.createElement('div');
    oneComment.setAttribute('class', 'oneComment');
    const headSection = document.createElement('div');
    const username = document.createElement('div');
    const time = document.createElement('div');
    const contentSection = document.createElement('div');
    username.innerText = el.username || '匿名';
    username.setAttribute('class', 'commentUsername');
    time.innerText = (el.create_time || formatDate(new Date())) + ' #' + el.floor; // 时间和楼层
    time.setAttribute('class', 'commentTime');
    contentSection.innerText = el.comment_content;
    contentSection.setAttribute('class', 'commentSection');
    headSection.appendChild(username);
    headSection.appendChild(time);
    oneComment.appendChild(headSection);
    oneComment.appendChild(contentSection);
    nowComment.appendChild(oneComment);
  }
  function updateListNumber() { nowCommentNumber.innerText = '共 ' + commentListNumber + ' 条评论'; }
  let commentListNumber = 0;
  const nowCommentNumber = document.createElement('div');
  nowCommentNumber.setAttribute('class', 'commentListLength');
  updateListNumber();
  $container.append(nowCommentNumber);

  const nowComment = document.createElement('div'); // 当前已有评论
  $container.append(nowComment);

  const appendComment = document.createElement('div'); // 追加评论
  appendComment.setAttribute('class', 'oneComment');
  const appendCommentHead = document.createElement('div'); // 评论头
  const appendCommentText = document.createElement('textarea'); // 评论文本域
  const appendCommentButtonGroup = document.createElement('div');
  const appendCommentSubmit = document.createElement('button'); // 评论
  const appendCommentClear = document.createElement('button'); // 清空
  const appendCommentUsername = document.createElement('input'); // 用户姓名
  const appendCommentRandom = document.createElement('button'); // 获得随机名字
  appendCommentUsername.setAttribute('type', 'text');
  appendCommentUsername.setAttribute('placeholder', '若为空，则表示匿名评论');
  appendCommentUsername.setAttribute('class', 'appendCommentUsername');
  appendCommentRandom.innerText = '随机取名';
  appendCommentRandom.setAttribute('class', 'button');
  appendCommentRandom.onclick = function() { appendCommentUsername.value = getChineseName(); };
  appendCommentHead.setAttribute('class', 'commentSection');
  appendCommentHead.innerText = '用户名：';
  appendCommentHead.appendChild(appendCommentUsername);
  appendCommentHead.appendChild(appendCommentRandom);
  appendCommentText.style.width = '100%';
  appendCommentText.style.borderRadius = '5px';
  appendCommentText.setAttribute('rows', '10');
  appendCommentButtonGroup.style.textAlign = 'center';
  appendCommentSubmit.innerText = '评论';
  appendCommentSubmit.setAttribute('class', 'button button-primary');
  appendCommentSubmit.onclick = function() {
    // 追加一条评论
    if (appendCommentText.value.trim() === '') {
      notify.info({ content: '请选择填写内容再评论', type: 'warning' });
    } else {
      $.ajax({
        type: 'POSt',
        url: '/index.php/note/Comment/addComment',
        dataType: 'json',
        data: {
          article: currentTitle,
          username: appendCommentUsername.value,
          content: appendCommentText.value,
        },
        success(data) {
          if (data.status) {
            // 添加评论成功
            addOneComment(data.comment);
            appendCommentText.value = '';
            notify.info({ content: '添加评论成功！' });
            commentListNumber++;
            updateListNumber();
          } else { notify.info({ content: data.message || '添加评论失败', type: 'error' }); }
        },
        error(err) {
          notify.info({ content: '无法进行评论', type: 'error' });
        },
      });
    }

  };
  appendCommentClear.innerText = '清空';
  appendCommentClear.onclick = function() { appendCommentText.value = ''; };
  appendCommentClear.setAttribute('class', 'button');

  appendCommentButtonGroup.appendChild(appendCommentSubmit);
  appendCommentButtonGroup.appendChild(appendCommentClear);
  appendComment.appendChild(appendCommentHead);
  appendComment.appendChild(appendCommentText);
  appendComment.appendChild(appendCommentButtonGroup);
  $container.append(appendComment);
  $.ajax({
    type: 'GET',
    url: '/index.php/note/Comment/getCommentList',
    data: {
      article: currentTitle,
    },
    dataType: 'json',
    success(data) {
      data.forEach(addOneComment);
      commentListNumber = data.length;
      updateListNumber();
    },
  });
});
