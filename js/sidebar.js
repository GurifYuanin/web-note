// 初始化语法高亮
hljs && hljs.initHighlightingOnLoad ?
    hljs.initHighlightingOnLoad() :
    $(function() {
        hljs && hljs.initHighlightingOnLoad();
    });
// 格式化日期为 yyyy-mm-dd hh:mm:ss
function formatDate (date) {
    date = date || new Date();
    if (date instanceof Date) {
      // 如果是 Date 对象
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let day = date.getDate();
      day = day < 10 ? '0' + day : day;
      let hour = date.getHours();
      hour = hour < 10 ? '0' + hour : hour;
      let minute = date.getMinutes();
      minute = minute < 10 ? '0' + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? '0' + second : second;
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } else if (/^\d+$/.test(date)) {
      // 如果是时间戳
      return formatDate(new Date(Number.parseInt(date)));
    } else {
      // 否则，还给你！
      return date;
    }
};
// 复制到剪切板
function copy (message) {
    var area = document.createElement('textarea'); // 用于临时暂存复制的代码的文本域
    document.body.appendChild(area);
    if (DataTransfer && window.clipboardData instanceof DataTransfer) {
        // IE
        window.clipboardData.setData('text', el.innerText.replace(type, ''));
    } else {
        // 非 IE
        area.value = message;
        area.select(); // 选中
        document.execCommand('copy'); // 复制
    }
    document.body.removeChild(area);
}
function wrapByA(href, text, target) {
    return '<a ' +
            (target ? 'target=' + target + ' ' : '') +
            'href="' + (href === '没有了' ? 'javascript:void(0)' : ('./' + href + '.html')) +
            '">' +
            (text || href) +
            '</a>';
}

function wrapByTag(source, tag) {
    return tag.toLowerCase() === 'a' ?
           wrapByA(source) :
           '<' + tag + '>' + source + '</' + tag + '>';
}
// 去除多余的字符
function filterName(str) {
    return str.replace(/[\s$@#&;()/.'"]/g, '');
}
// 获得视窗大小
function getViewport(target) {
    // 使用指定窗口，默认使用当前窗口
    target = target || window;
    // 以此检查 IE9+ -> 标准模式 -> 怪异模式
    return {
        'width': target.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        'height': target.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
}
// 滚动到指定 id 的位置
function scrollTo(name, el) {
    if (name === '返回顶部' || !name) {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    } else if (el) {
        el.animate({
            scrollTop: $('#' + name).offset().top - 100
        }, 500);
    } else {
        $('html, body').animate({
            scrollTop: $('#' + name).offset().top
        }, 500);
    }
}
// 获得文件名后缀（不含 .）
function getSuffix(filename) {
    return filename.substring(filename.lastIndexOf('.') + 1);
}
// 数组去重
function filterRepeat (arr) {
    var result = [];
    if (window.Set) {
        result = [...new Set(arr)];
    } else {
        arr.map(function(el) {
            return result.indexOf(el) === -1
        });
    }
    return result;
}

function getChineseName () {
    var lastName = '赵 钱 孙 李 周 吴 郑 王 冯 陈 褚 卫 蒋 沈 韩 杨 朱 秦 尤 许 何 吕 施 张 孔 曹 严 华 金 魏 陶 姜 戚 谢 邹 喻 柏 水 窦 章 云 苏 潘 葛 奚 范 彭 郎 鲁 韦 昌 马 苗 凤 花 方 俞 任 袁 柳 酆 鲍 史 唐 费 廉 岑 薛 雷 贺 倪 汤 滕 殷 罗 毕 郝 邬 安 常 乐 于 时 傅 皮 卞 齐 康 伍 余 元 卜 顾 孟 平 黄 和 穆 萧 尹 姚 邵 湛 汪 祁 毛 禹 狄 米 贝 明 臧 计 伏 成 戴 谈 宋 茅 庞 熊 纪 舒 屈 项 祝 董 梁 杜 阮 蓝 闵 席 季 麻 强 贾 路 娄 危 江 童 颜 郭 梅 盛 林 刁 锺 徐 邱 骆 高 夏 蔡 田 樊 胡 凌 霍 虞 万 支 柯 昝 管 卢 莫 经 房 裘 缪 干 解 应 宗 丁 宣 贲 邓  郁 单 杭 洪 包 诸 左 石 崔 吉 钮 龚 程 嵇 邢 滑 裴 陆 荣 翁 荀 羊 於 惠 甄 麴 家 封 芮 羿 储 靳 汲 邴 糜 松 井 段 富 巫 乌 焦 巴 弓 牧 隗 山 谷 车 侯 宓 蓬 全 郗 班 仰 秋 仲 伊 宫 宁 仇 栾 暴 甘 钭 历 戎 祖 武 符 刘 景 詹 束 龙 叶 幸 司 韶 郜 黎 蓟 溥 印 宿 白 怀 蒲 邰 从 鄂 索 咸 籍 赖 卓 蔺 屠 蒙 池 乔 阳 郁 胥 能 苍 双 闻 莘 党 翟 谭 贡 劳 逄 姬 申 扶 堵 冉 宰 郦 雍 却 璩 桑 桂 濮 牛 寿 通 边 扈 燕 冀 僪 浦 尚 农 温 别 庄 晏 柴 瞿 阎 充 慕 连 茹 习 宦 艾 鱼 容 向 古 易 慎 戈 廖 庾 终 暨 居 衡 步 都 耿 满 弘 匡 国 文 寇 广 禄 阙 东  欧 殳 沃 利 蔚 越 夔 隆 师 巩 厍 聂 晁 勾 敖 融 冷 訾 辛 阚 那 简 饶 空 曾 毋 沙 乜 养 鞠 须 丰 巢 关 蒯 相 查 后 荆 红 游 竺 权 逮 盍 益 桓 公 万俟 司马 上官 欧阳 夏侯 诸葛 闻人 东方 赫连 皇甫 尉迟 公羊 澹台 公冶 宗政 濮阳 淳于 单于 太叔 申屠 公孙 仲孙 轩辕 令狐 钟离 宇文 长孙 慕容 司徒 司空 召 有 舜 叶赫那拉 丛 岳 寸 贰 皇 侨 彤 竭 端 赫 实 甫 集 象 翠 狂 辟 典 良 函 芒 苦 其 京 中 夕 之 章佳 那拉 冠 宾 香 果 依尔根觉罗 依尔觉罗 萨嘛喇 赫舍里 额尔德特 萨克达 钮祜禄 他塔喇 喜塔腊 讷殷富察 叶赫那兰 库雅喇 瓜尔佳 舒穆禄 爱新觉罗 索绰络 纳喇 乌雅 范姜 碧鲁 张廖 张简 图门 太史 公叔 乌孙 完颜 马佳 佟佳 富察 费莫 蹇 称 诺 来 多 繁 戊 朴 回 毓 税 荤 靖 绪 愈 硕 牢 买 但 巧 枚 撒 泰 秘 亥 绍 以 壬 森 斋 释 奕 姒 朋  求 羽 用 占 真 穰 翦 闾 漆 贵 代 贯 旁 崇 栋 告 休 褒 谏 锐 皋 闳 在 歧 禾 示 是 委 钊 频 嬴 呼 大 威 昂 律 冒 保 系 抄 定 化 莱 校 么 抗 祢 綦 悟 宏 功 庚 务 敏 捷 拱 兆 丑 丙 畅 苟 随 类 卯 俟 友 答 乙 允 甲 留 尾 佼 玄 乘 裔 延 植 环 矫 赛 昔 侍 度 旷 遇 偶 前 由 咎 塞 敛 受 泷 袭 衅 叔 圣 御 夫 仆 镇 藩 邸 府 掌 首 员 焉 戏 可 智 尔 凭 悉 进 笃 厚 仁 业 肇 资 合 仍 九 衷 哀 刑 俎 仵 圭 夷 徭 蛮 汗 孛 乾 帖 罕 洛 淦 洋 邶 郸 郯 邗 邛 剑 虢 隋 蒿 茆 菅 苌 树 桐 锁 钟 机 盘 铎 斛 玉 线 针 箕 庹 绳 磨 蒉 瓮 弭 刀 疏 牵 浑 恽 势 世 仝  同 蚁 止 戢 睢 冼 种 涂 肖 己 泣 潜 卷 脱 谬 蹉 赧 浮 顿 说 次 错 念 夙 斯 完 丹 表 聊 源 姓 吾 寻 展 出 不 户 闭 才 无 书 学 愚 本 性 雪 霜 烟 寒 少 字 桥 板 斐 独 千 诗 嘉 扬 善 揭 祈 析 赤 紫 青 柔 刚 奇 拜 佛 陀 弥 阿 素 长 僧 隐 仙 隽 宇 祭 酒 淡 塔 琦 闪 始 星 南 天 接 波 碧 速 禚 腾 潮 镜 似 澄 潭 謇 纵 渠 奈 风 春 濯 沐 茂 英 兰 檀 藤 枝 检 生 折 登 驹 骑 貊 虎 肥 鹿 雀 野 禽 飞 节 宜 鲜 粟 栗 豆 帛 官 布 衣 藏 宝 钞 银 门 盈 庆 喜 及 普 建 营 巨 望 希 道 载 声 漫 犁 力 贸 勤 革 改 兴 亓 睦 修 信 闽 北 守 坚 勇 汉 练 尉 士 旅  五 令 将 旗 军 行 奉 敬 恭 仪 母 堂 丘 义 礼 慈 孝 理 伦 卿 问 永 辉 位 让 尧 依 犹 介 承 市 所 苑 杞 剧 第 零 谌 招 续 达 忻 六 鄞 战 迟 候 宛 励 粘 萨 邝 覃 辜 初 楼 城 区 局 台 原 考 妫 纳 泉 老 清 德 卑 过 麦 曲 竹 百 福 言 第五 佟 爱 年 笪 谯 哈 墨 南宫 赏 伯 佴 佘 牟 商 西门 东门 左丘 梁丘 琴 后 况 亢 缑 帅 微生 羊舌 海 归 呼延 南门 东郭 百里 钦 鄢 汝 法 闫 楚 晋 谷梁 宰父 夹谷 拓跋 壤驷 乐正 漆雕 公西 巫马 端木 颛孙 子车 督 仉 司寇 亓官 鲜于 锺离 盖 逯 库 郏 逢 阴 薄 厉 稽 闾丘 公良 段干 开 光 操 瑞 眭 泥 运 摩 伟 铁'.split(' ');
    var firstName =  "克父伤母 性刚果断 少年艰难 中年劳雷 晚年吉祥 孤独 幼年多灾 中年成功 离祖大吉 出外贵人现 环境良好 多刑 克妻伤子 怀才不遇 忌车怕水 多灾厄 英俊佳人 环境良好 温和贤淑 荣贵成功 病弱短寿 多灾厄 多刑克 中年多灾 晚年吉祥 英俊才人 温和伶俐 中年成功隆昌 贵人明现 欠子之字 忧心劳神 身弱多病 中年劳苦 晚年吉祥 忌车怕水 多灾厄 或身弱多病 中年奔波 晚年幸福 孤独 刑克父母 少年艰难 中年成功隆昌 智勇双全 家破人亡 困苦一生 有子亦不孝 了然一生 性刚 奔走他乡吉利 中年有灾厄 晚年享福 多才巧智 清雅荣贵 成功隆昌 环境良好 克偶伤子 双妻之格 中年隆昌 晚年劳神 品性温良 晚婚大吉 环境良好 中年多灾 晚年隆昌 精明公正 义利分明 官运旺盛 成功隆昌 环境良好 忧心劳神 事劳无功 病弱短寿 或牢狱之字 孤独 幼年辛苦 出外逢贵得财 中年多劳 晚年成功隆昌 一生清雅荣贵 但不善仁和 子孙兴旺 二子吉祥 身弱短寿 幼年辛苦 中年隆昌 晚年劳神 少乐之字 少年艰难 出外大吉 性刚多灾 刑偶伤子 晚年享福 清秀伶俐 多才巧智 早婚不宜 一生清闲幸福 性刚果断 常有祸端 有牢狱之灾 上下敦睦 一生平凡 保守之格 子孙兴旺 吉祥幸福 抱负大 志气强 有精神失常之灾 杀人被杀之字 事劳无功 奔波劳苦 多灾难 出国大吉 晚年享福 刑克父母 刑妻伤子 晚婚大吉 中年隆昌 晚年多灾 出国之格 一生清雅荣贵 中年成功隆昌 福寿之字 食禄齐美 口才伶俐 重情失败 中年劳神 晚年吉祥 过房之字 少年艰难 中年成功隆昌 双妻之格 晚年劳神 刑偶欠子 一生清贵 出外逢贵得财 子孙兴旺 不祥之字 忌车怕水 恶死凶亡 一生难得幸福 刑偶伤子 有才能 奔波劳苦 有晚福 智勇双全 清雅荣贵 中年劳 晚年隆昌 女人温和贤淑 清雅荣贵 多才精明 中年成功隆昌 富贵荣华 但常人难受 不祥之字 暗淡无光 多劳困苦 事劳无功 孤独 刑偶欠子 环境良好 秀气伶俐 晚年劳神 天生聪明 清雅荣贵 环境良好 一生享福 欠子之字 一生清雅多才 刑偶伤子 中年多灾 晚年吉庆 出外逢贵 重义信用 中年多灾 晚年隆昌 出国之字 名利双收 学识渊博 官运旺盛 荣贵之字 孤独长寿 中年吉庆 晚年忧心劳神或潦倒 孤独 父母无缘 少年艰难 中年隆昌 技术大吉 欠子之字 技术方面大吉 贵人明现 成功隆昌 环境良好 出外大吉 欠子之字 中年成功隆昌 环境良好 奔波劳苦 一生多灾 难得幸福 晚年享福 一生清荣 温和贤淑 中年劳神 晚年隆昌 女人薄幸多灾 口快心直 刑偶伤子 中年多灾 晚年享福 杀人被杀 病弱短寿 刑偶伤子 女人多灾 守寡之字 理智充足 重情失败 中年劳 晚年吉祥 智勇双全 一生清雅荣贵 幼年多灾 中年成功隆昌 事劳无功 忧心劳神 中年多灾 晚年劳神 忍耐勤俭 应付自如 清雅伶俐 中年劳 晚年吉祥 性格复杂 多愁少乐 中年多灾 忌车怕水 晚年吉祥 幼年辛苦 义利分明 中年奔波隆昌 小心灾厄 忌车怕水 孤独 克父 一生安稳享福 有爱情厄 子孙兴旺 忧心劳神 一生多灾 有爱情烦恼 晚年吉祥 忌车怕水 有才能但无好运 潦倒一生 声名显赫 富贵增荣 一生享福 但常人难受 刑克父母 兄弟无缘 中年劳 晚年成功隆昌 二子吉祥 一生清雅荣贵 中年成功隆昌 多才巧智 晚年劳神 清秀巧智 一生清雅荣贵 女人助夫 环境良好 奔波劳苦 忧心劳神 一生困苦 病弱短寿 忧心劳神 怀才不遇 中年劳苦 晚年吉庆 清雅荣贵 一生平凡 子孙兴旺 中年成功隆昌 精诚之字 潦倒困苦 刑偶之字 中年劳 晚年享福 任性或怪性 性刚消极 中年劳 晚年隆昌 秀气巧妙 多才巧智 中年成功隆昌 晚年劳神 平凡之字 环境良好 克己助人 福寿兴家 妻贤子贵 荣华之字 刑偶欠子 身弱多灾 晚婚大吉 中年劳神 晚年隆昌 平凡之字 聪明伶俐 清雅荣贵 中年成功隆昌 晚年昌盛 二子吉祥 幼年多灾 中年劳苦 晚年隆昌 欠子之字 一生平凡 英俊才人 多才巧智 中年虽困苦 成功隆昌 晚年子孙兴旺 清雅伶俐 出外逢贵 中年多灾 二子吉祥 女人刑偶伤子 薄幸之字 不祥之字 多灾难 难得幸福 一生困苦 晚年有福 奔波劳苦 浮沉不定 常有祸端 短寿之字 杀人或被杀".split(' ');
    return lastName[Math.floor(Math.random() * lastName.length)] +
           firstName[Math.floor(Math.random() * firstName.length)].substr(Math.floor(Math.random() * 3), Math.ceil(Math.random() * 2));
}
function $Notify() {
    this.win = document.createElement('div');
    this.win.setAttribute('class', 'notify');
    this.win.style.opacity = '0';
    this.win.style.zIndex = '3';
    document.body.appendChild(this.win);
    this.timeout = null;
}
$Notify.prototype.info = function(options) {
    options.duration = options.duration || 2000;
    var win = this.win;
    win.innerText = options.content;
    win.style.opacity = '1';
    win.style.transition = 'all 1s';
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(function() {
        win.style.opacity = '0';
    }, options.duration);
};


// sidebar
$(function() {
    var viewport = document.createElement('meta');
    var icon = document.createElement('link');
    var autopush = document.createElement('script');
    autopush.setAttribute('src', '/static/js/auto-push-to-baidu.js');
    icon.setAttribute('rel', 'shortcut icon');
    icon.setAttribute('href', '../images/web-note.ico');
    icon.setAttribute('type', 'image/vnd.microsoft.icon');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1');
    document.head.appendChild(viewport);
    document.head.appendChild(icon);
    document.head.appendChild(autopush);

    var url = window.location.href;
    var currentTitle = decodeURI(url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.')));
    var $sidebar = $('#sidebar'); // 导航条
    var $hideCatalog = $('#hideCatalog'); // 隐藏目录图片
    var $showCatalog = $('#showCatalog'); // 显示目录图片
    var $catalog = $('#catalog'); // 隐藏侧栏按钮
    var $title = $('#title'); // 文章标题
    var $container = $('#container'); // 文章内容
    var category = ['HTML', 'CSS', 'Javascript', 'NodeJS', 'VueJS', '移动Web', '工具', '协议', '安全', '测试', '后端', '其他']; // 目录分类
    var items = [
        ['DOM', 'meta标签', 'href和src', 'link', 'script', 'HTML语义化', 'HTML5', 'canvas', 'svg'],
        ['选择器', '盒式模型', '元素种类', '元素定位', '元素居中', '伪类伪元素', '格式化上下文', 'CSS Hack', 'CSS3', 'CSS怪异现象', '颜色和长度', '百分比'],
        ['数据类型', '数组字符串与对象', '循环', '作用域链', '原型链', '闭包', '事件', '复制粘贴', 'RegExp', 'XMLHttpRequest', 'Class', 'JSONP', 'this', 'jquery', 'promise', 'Generator', 'async', 'Typescript'],
        ['commonJS', 'package.json', 'path', 'file system', 'process', 'webpack', 'plugins', 'loader'],
        ['安装', '实例', '模版', '组件', 'mixins', 'router', 'vuex'],
        ['响应式布局', 'bootstrap', 'viewport'],
        ['抓包工具', 'chrome devtools', 'git', 'sublime 插件'],
        ['HTTP'],
        ['CSRF', 'XSS', '同源策略'],
        ['karma', 'Vue Test Utils'],
        ['Thinkphp5.1', 'htaccess'],
        ['路径匹配', '浏览器渲染', '设计策略', 'cookie', '头疼的兼容', '命名规范', '字符编码', '算法规范', 'bat']
    ];
    // 插入侧栏
    var str = '';
    for (var i = 0; i < category.length; i++) {
        str += wrapByTag('<img src="../images/slide_down.png">' + category[i], 'h3');
        for (var j = 0, tmp = '', insertedId = ''; j < items[i].length; j++) {
            insertedId = items[i][j] === currentTitle ? ' id="currentItem" ' : '';
            tmp += '<div' + insertedId + '>' + wrapByA(items[i][j]) + '</div>';
        }
        str += wrapByTag(tmp, 'section');
    }
    $sidebar.append(str);

    // SE
    $catalog.append('<section id="searchContainer"><input id="searchInput" type="text" placeholder="搜索文章"/><section id="searchResult"></section></section>');
    var $searchInput = $('#searchInput');
    var $searchResult = $('#searchResult');
    var selectedBackgroundColor = 'rgb(239, 239, 239)';
    var liIndex = 0;
    // 根据关键字获得搜索结果列表
    function getSearchResult (keyword) {
        var res = '';
        items.forEach(function(item, groupIndex) {
            item.forEach(function(el) {
                try {
                    var reg = new RegExp(keyword, 'i');
                    if (reg.test(el)) {
                        res += wrapByTag(
                                   wrapByA(
                                        el,
                                        el.replace(reg, '<span class="filteredHightLight">' + el.match(reg) + '</span>') + ' <span class="filteredCategory">(' + category[groupIndex] + ')</span>',
                                        '_blank'),
                                    'li'
                                );
                    }
                } catch (e) {}
            });
        });
        return res;
    }

    $searchResult.css('display', 'none');
    $searchInput.keyup(function(event) {
        var keyword = $searchInput.val() || '';
        var str = keyword.trim() === '' ? '' : getSearchResult(keyword);
        if (str.trim() === '') {
            // 没有键入或者搜索结果为空 搜索结果框隐藏
            $searchResult.slideUp();
            if (keyword.trim() === '') { return; } else {
                // 没有搜索到结果 拆分搜索条件重新尝试
                var arr = keyword.split('');
                arr = filterRepeat(arr);
                var tmp = [];
                for (var i = 0; i < arr.length; i++) {
                    tmp = getSearchResult(arr[i]);
                    str = tmp.length > str.length ? tmp : str; // 保留搜索结果最多的
                }
                if (str === '') { return; }
            }
        }
        if ((event.keyCode < 37 || event.keyCode > 40) && event.keyCode !== 13) {
            // 有搜素结果
            $searchResult.html(str);
            $searchResult.stop(true, true).slideDown();
            // $searchResult.css('display', 'block');
        }
        // 根据不同的特殊键，响应不同的样式
        var list = $('#searchResult li');
        switch (event.keyCode) {
            case 13: // 回车键，打开新窗口
                var index = list.toArray().findIndex(function(element) {
                    return element.style.backgroundColor === selectedBackgroundColor;
                });
                index = index === -1 ? 0 : index;
                window.open('./' + list.eq(index)[0].innerText.replace(/\s\(.+\)$/, '') + '.html');
                // index === -1 ? list.eq(0).click() : list.eq(index).click();
                break;
            case 37: break; // 左箭头，无视
            case 38: // 上箭头
                if (liIndex > 0) {
                    liIndex--;
                }
                if (liIndex < list.length) {
                    list.eq(liIndex).css('background-color', '');
                }
                if (liIndex > 0) {
                    list.eq(liIndex - 1).css('background-color', selectedBackgroundColor);
                }
                break;
            case 39: break; // 右箭头，无视
            case 40:
                if (liIndex > 0) {
                    list.eq(liIndex - 1).css('background-color', '');
                }
                if (liIndex < list.length) {
                    list.eq(liIndex).css('background-color', selectedBackgroundColor);
                    liIndex++;
                }
                break;
            default: liIndex = 0;
        }
    });
    $container.click(function() {
        $searchResult.css('display', 'none');
    });
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
    var isBright = true; // 是否处于白天模式
    var arrBrightDown = '../images/slide_down.png'; // 白天模式下的下箭头
    var arrBrightUp = '../images/slide_up.png'; // 白天模式下的右箭头
    var arrDarkDown = '../images/slide_down_dark.png'; // 夜间模式下的下箭头
    var arrDarkUp = '../images/slide_up_dark.png'; // 夜间模式下的右箭头
    var $itemHead = $('#sidebar h3'); // catalog
    $itemHead.each(function() {
        var that = $(this),
            img = that.children();
        that.click(function() {
            if (img.attr('src') === arrBrightDown || img.attr('src') === arrDarkDown) {
                img.attr('src', isBright ? arrBrightUp : arrDarkUp);
            } else {
                img.attr('src', isBright ? arrBrightDown : arrDarkDown);
            }
            that.next().slideToggle('slow');
        });
    });
    // 绘制直线
    var lineLength = getViewport().width / 3;
    $title.after('<svg title="点击切换样式" style="display: block; margin: auto; width:' +
                lineLength + 'px" xmlns="http://www.w3.org/2000/svg" version="1.1" height="1px"><path id="line" d="M 0 0 L ' +
                lineLength + ' 0" style="stroke: #000; stroke-dasharray: ' +
                lineLength + '; stroke-dashoffset: ' +
                lineLength + '; fill: none;"/></svg>');
    var $line = $('#line');
    // 文章标题事件
    $title.mouseover(function() {
        $title.animate({
            'padding-top': '1%',
            'padding-bottom': '1%'
        }, 'fast');
        $line.animate({
            'stroke-dashoffset': 0
        }, 'fast');
    });
    $title.mouseout(function() {
        $title.animate({
            'padding-top': '0',
            'padding-bottom': '0'
        }, 'fast');
        $line.animate({
            'stroke-dashoffset': lineLength
        }, 'fast');
    });
    // 弹窗提示

    var notify = new $Notify();
    // 代码类型提醒
    $('.hljs').each(function(index, el) {
        var codeType = document.createElement('div'); // 显示代码的类型（语言）
        var codeCopy = document.createElement('div'); // 赋值代码按钮
        codeType.setAttribute('class', 'codeType');
        codeCopy.setAttribute('class', 'codeCopy');
        codeCopy.setAttribute('title', '点击复制代码');
        var type = el.getAttribute('class').split(' ')[0]; // 取出是哪种类型的代码
        codeType.innerText = type;
        codeCopy.style.right = codeType.innerText.length * 8 + (10 - codeType.innerText.length) + 'px'; // 动态设置距离
        codeCopy.onclick = function() {
            copy(el.innerText.substring(1, el.innerText.lastIndexOf('\n')));
            notify.info({content: '已经复制到剪切板'});
        };
        el.appendChild(codeType);
        el.appendChild(codeCopy);
    });

    // 文章标题点击后变换样式
    var $theme = $('link').eq(2); // 主题颜色
    var $codeStyle = $('link').eq(1); // 代码颜色
    var $itemBlockImg = $('#sidebar h3 img');
    var $hideSidebarImg = $('#hideCatalog');
    $title.click(function() {
        $theme.attr('href', isBright ? '../css/dark.css' : '../css/bright.css');
        $codeStyle.attr('href', isBright ? '../css/styles/agate.css' : '../css/styles/default.css');
        $line.css('stroke', isBright ? '#fff' : '#000');
        $hideSidebarImg.attr('src', isBright ? '../images/catalog_dark.png' : '../images/catalog.png');
        $itemBlockImg.each(function(i, el) {
            var src = el.src;
            el.src = isBright ?
                src.substring(0, src.lastIndexOf('.')) + '_dark.png' :
                src.substring(0, src.lastIndexOf('_')) + '.png';
        });
        $('a').each(function(i, el) {
            el.href = isBright ? el.href + '?theme=dark' : el.href.replace('?theme=dark', '');
        });
        $('.codeCopy').toggleClass('codeDark');
        isBright = !isBright;
    });
    if (url.indexOf('?theme=dark') >= 0) {
        $title.click();
    }

    function widthAndMargin(start, end, piece, time) {
        // width: start% -> end%
        // margin: 0 4% -> 0 5%
        // piece: 动画分段数量（关键帧数量）
        // time：动画时长（s，秒）
        var valInc = (end - start) / piece;
        var timeInc = time * 1000 / piece;
        var widthStart, widthInc;
        if (start < end) {
            widthStart = 4;
            widthInc = 1 / piece;
        } else {
            widthStart = 5;
            widthInc = -1 / piece;
        }
        for (var i = start, delay = 0; i !== end; i += valInc, widthStart += widthInc, delay += timeInc) {
            (function() {
                var percentage = i + '%';
                var margin = '0 ' + widthStart + '%';
                setTimeout(function() {
                    $container.css({
                        'width': percentage,
                        'margin': margin
                    });
                }, delay);
            })();
        }
        // 进行最后一次更新
        setTimeout(function() {
            widthStart += widthInc;
            $container.css({
                'width': end + '%',
                'margin': '0 ' + widthStart + '%'
            });
        }, time * 1000);
    }
    // 折叠目录
    $hideCatalog.attr('title', '点击隐藏侧栏');
    $hideCatalog.click(function(event) {
        $sidebar.animate({ // 侧栏隐藏
            'width': '0',
            'padding': '0'
        }, 'slow', function() {
            $sidebar.css('display', 'none');
            // 允许重新展开侧栏
            $showCatalog.css('display', 'block');
        });
        widthAndMargin(65, 90, 25, 1);
        // 阻止事件冒泡：
        event.stopPropagation(); // 非IE
        window.event.cancelBubble = true; // IE
    });

    // 展开目录
    $showCatalog.attr('title', '点击显示侧栏');
    $showCatalog.click(function() {
        var width = getViewport().width;
        var padding;
        // 如果视窗大小小于 400 px
        if (width < 400) {
            width = '100%';
            padding = '0';
        } else {
            width = '25%';
            padding = '1%';
        }
        $sidebar.css('display', 'inline-block');
        $showCatalog.css('display', 'none');
        $sidebar.animate({
            'width': width,
            'padding': padding
        }, 'slow');
        widthAndMargin(90, 65, 20, 0.5);
    });
    $('a').not('.self').attr('target', '_blank'); // 所有链接默认新标签打开

    var $subTitle = $('#container>section>h2'); // 一级子标题
    var subTitleNav = ''; // 子标题导航 html 字符串
    var subTitleToggleString = ''; // 子标题导航开关
    var subTitleBlockNumber = 4;
    for (var i = 1; i <= subTitleBlockNumber; i++) {
        subTitleToggleString += '<div class="block' + i + '"></div>';
    }
    subTitleToggleString = '<div id="subTitleToggle">' + subTitleToggleString + '</div>';

    // 点击后子标题置顶到窗口
    var currentH2 = decodeURI(url.substring(url.indexOf('#') + 1));
    currentH2 = currentH2.replace(/\?theme=(dark)|(bright)/, '');
    $subTitle.each(function() {
        var name = filterName(this.innerHTML);
        // $(this).html('<a height="50%" id="' + name + '" href="#' + name + '">' + name + '</a>');
        // 子标题包裹为超链接
        $(this).wrap('<a style="height: 50%; margin: 0; padding: 0; text-decoration: none; color: #000;" id="' + name + '" href="#' + name + '"></a>');
        // 点击后滑动窗口
        $(this).click(function() {
            scrollTo(name);
        });
        if (this.innerHTML === currentH2) $(this).click();
        subTitleNav += '<div class="subTitleItem">' + this.innerHTML + '</div>';
        // if ()
    });
    subTitleNav = '<div id="subTitleNav">' + subTitleNav + '<div class="subTitleItem">返回顶部</div></div>';
    // 右下角子标题导航
    // 添加 html 元素
    $('body').append(subTitleNav + subTitleToggleString);
    // 设置跳转事件
    var $subTitleItem = $('.subTitleItem');
    var $subTitleToggle = $('#subTitleToggle');
    var $subTitleBlock = $('#subTitleToggle div');
    $subTitleItem.each(function() {
        var name = filterName(this.innerHTML);
        var that = $(this);
        that.click(function(event) {
            scrollTo(name);
        });
        // that.mousedown(function() {
        //     that.css({
        //         'backgroundColor': '#888',
        //         'color': '#fff'
        //     });
        // });
        // that.mouseup(function() {
        //     that.css({
        //         'backgroundColor': '#fff',
        //         'color': '#000'
        //     });
        // });
    });
    var isLeave = false; // 判断光标是否已经离开导航面板
    var isShow = false; // 判断导航块是否已经出现
    var itemInterval = 50; // 导航项动画间隔
    var blockInterval = 100; // 块动画间隔
    // 展开子标题导航
    function showBlock(event) {
        var time = 0;
        // 块消失
        for (i = $subTitleBlock.length; i >= 0; i--, time += blockInterval) {
            (function() {
                var delay = time;
                var j = i;
                setTimeout(function() {
                    $subTitleBlock.eq(j).hide('fast');
                }, delay);
            })();
        }
        // 导航项出现
        for (i = $subTitleItem.length - 1; i >= 0; i--, time += itemInterval) {
            (function() {
                var delay = time;
                var j = i;
                setTimeout(function() {
                    if (!isLeave) {
                        $subTitleItem.eq(j).fadeIn(100);
                    }
                }, delay);
            })();
        }
        isShow = true;
        // 取消事件冒泡
        event.stopPropagation(); // 非IE
        window.event.cancelBubble = true; // IE
    }
    // 隐藏子标题导航
    function hideBlock() {
        isLeave = true; // 加锁，不让导航项出现
        // 导航项消失
        for (var time = 0, i = 0; i < $subTitleItem.length; i++, time += itemInterval) {
            (function() {
                var delay = time;
                var j = i;
                setTimeout(function() {
                    $subTitleItem.eq(j).fadeOut(100);
                }, delay);
            })();
        }
        // 块出现
        for (i = 0; i < $subTitleBlock.length; i++, time += blockInterval) {
            (function() {
                var delay = time;
                var j = i;
                setTimeout(function() {
                    $subTitleBlock.eq(j).show('fast');
                }, delay);
            })();
        }
        setTimeout(function() {
            isLeave = false; // 开锁，允许导航项出现
        }, $subTitleItem.length * itemInterval + $subTitleBlock.length * blockInterval);
        isShow = false;
    }
    $subTitleToggle.attr('title', '点击显示子标题导航');
    $subTitleToggle.click(showBlock);
    document.body.onclick = hideBlock;
    // $subTitleNav.mouseleave(hideBlock);
    // 滚动条到底时隐藏导航开关、隐藏子标题导航
    var showable = true; // 标志是否可以隐藏导航开关
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight === scrollHeight) {
            $subTitleToggle.stop().hide('slow');
            showable = true;
        } else {
            if (showable) {
                $subTitleToggle.stop().show('slow');
                showable = false;
            }
        }
        if (isShow) {
            hideBlock();
        }
    });

    // 追加上一篇和下一篇操作
    var preTitle = '没有了',
        nextTitle = '没有了',
        index = 0;
    if (currentTitle === 'index') {
        nextTitle = items[0][0];
    } else {
        var allItems = [];
        items.forEach(function(el) {
            el.forEach(function(ele) {
                allItems.push(ele);
            });
        });
        index = allItems.indexOf(currentTitle);
        if (index !== 0) preTitle = allItems[index - 1];
        if (index !== allItems.length - 1) nextTitle = allItems[index + 1];
    }
    preTitle = wrapByA(preTitle);
    nextTitle = wrapByA(nextTitle);
    $('.refer').after('<div id="footer" ><div class="prePage">上一篇：' + preTitle + '</div><div class="nextPage">下一篇：' + nextTitle + '</div></div>');

    // 将不是目前浏览的条目收起来
    items.forEach(function(item, index) {
        if (item.indexOf(currentTitle) === -1) {
            $itemHead.eq(index).click();
        }
    });
    // 将当前浏览的条目展开
    if (currentTitle !== 'index' && !/.+\/html\/$/.test(currentTitle)) {
        setTimeout(function() {
            scrollTo('currentItem', $sidebar);
            var el = $('#currentItem > a');
            el.animate({
                'font-size': '1.25rem',
                'font-weight': 900
            }, 1000, function() {
                el.animate({
                    'font-size': '1rem',
                    'font-weight': 'bold'
                }, 1000);
            });
        }, 500);
    }

    // 获得元素的宽度
    function getWidth(el) {
        var ret = window.getComputedStyle ?
            getComputedStyle(el).width :
            el.currentStyle.width;
        ret = Number.parseInt(ret);
        return ret === 0 ?
            el.clientWidth || el.scrollWidth || el.offsetWidth || 500 :
            ret;
    }
    // 获得每次缩放的增量
    function getIncreatement(img) {
        return img ?
            img.naturaWidth ? img.naturaWidth * .2 : getWidth(img) * .2 :
            50;
    }

    function bothDisapper() {
        smaller.style.opacity = bigger.style.opacity = 0;
        if (disapearTimer) {
            clearTimeout(disapearTimer);
        }
        disapearTimer = setTimeout(function() {
            smaller.style.display = bigger.style.display = 'none';
        }, 1000);
    }
    // 偏移图像
    function offsetImg(e, flag) {
        var img = imgContainer.lastChild;
        if (img instanceof HTMLImageElement && e) {
            var vw = getViewport();
            var h = vw.height / 2 - e.clientY;
            var w = vw.width / 2 - e.clientX;
            h = flag ? h / 2 : Math.sqrt(h);
            w = flag ? w / 2 : Math.sqrt(w);
            var left = Number.parseInt(img.style.paddingLeft),
                right = Number.parseInt(img.style.paddingRight),
                top = Number.parseInt(img.style.paddingTop),
                bottom = Number.parseInt(img.style.paddingBottom);
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
        var child = imgContainer.lastChild;
        var oldWidth = getWidth(child);
        child.style.width = oldWidth - getIncreatement(child) + 'px';
    }

    function changeImg(flag) {
        if (imgContainer.lastChild instanceof HTMLImageElement) {
            var img = imgContainer.lastChild,
                imgs = $('#container figure>img').toArray();
            for (var i = 0; i < imgs.length; i++) {
                if (imgs[i].src === img.src) {
                    flag ?
                    i - 1 >= 0 ? img.src = imgs[i - 1].src : notify.info({content: '已经是第一张了'}) : // 上一张
                    i + 1 < imgs.length ? img.src = imgs[i + 1].src : notify.info({content: '已经是最后一张了'}); // 下一张
                    break;
                }
            }
        }
    }
    // 正文内容的图片点击后预览
    var disapearTimer = null; // bothDdiv 消失的定时器
    var smallerTimer = null;
    var biggerTimer = null;
    var mask = document.createElement('div');
    var imgContainer = document.createElement('div');
    var closeImg = document.createElement('div');
    var resetImg = document.createElement('div');
    var onlySmaller = document.createElement('div');
    var onlyBigger = document.createElement('div');
    var downloadImg = document.createElement('div');
    var imgOriginWidth = null;
    // download
    downloadImg.innerText = '↓';
    downloadImg.setAttribute('title', '下载');
    downloadImg.setAttribute('class', 'closeImg');
    downloadImg.style.right = '200px';
    downloadImg.onclick = function() {
        if (imgContainer.lastChild instanceof HTMLImageElement) {
            var src = imgContainer.lastChild.src;
            var a = document.createElement('a');
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

    var smaller = document.createElement('div');
    var bigger = document.createElement('div');
    var lastImg = document.createElement('div');
    var nextImg = document.createElement('div');
    smaller.innerText = '-';
    bigger.innerText = '+';
    smaller.style.opacity = bigger.style.opacity = 0;
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
        var child = imgContainer.lastChild;
        var oldWidth = getWidth(child);
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
        var el = $(this);
        el.attr('title', '点击放大');
        el.click(function() {
            var img = document.createElement('img');
            img.setAttribute('class', 'tmpImg');
            img.setAttribute('title', '点击右键打开缩放菜单');
            img.setAttribute('src', el.attr('src'));
            imgContainer.style.display = mask.style.display = 'block';
            // 按下右键弹出选项
            img.oncontextmenu = function(e) {
                if (disapearTimer) {
                    clearTimeout(disapearTimer);
                }
                smaller.style.display = bigger.style.display = 'block';
                smaller.style.opacity = bigger.style.opacity = 1;
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
    // $(window).on("load resize",function(){
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
        var $dir = $('#catalogFrame img');
        if ($dir.length) {
            $dir.click(function() {
                var brother = $(this).next().next();
                if (typeof brother !== 'undefined' && brother.prop('tagName').toUpperCase() === 'DIV') {
                    brother.toggle(500);
                }
            });
        }
        // 设置表格默认样式
        var $table = $('table');
        if ($table.length) {
            $table.attr({
                'border': 1,
                'cellpadding': 1,
                'cellspacing': 0
            });
            $table.each(function() {
                $(this).parent().css('overflow', 'auto');
            });
        }
    })();



    // 添加评论区
    // 添加一条评论
    function addOneComment (el) {
        var oneComment = document.createElement('div');
        oneComment.setAttribute('class', 'oneComment');
        var headSection = document.createElement('div');
        var username = document.createElement('div');
        var time = document.createElement('div');
        var contentSection = document.createElement('div');
        username.innerText = el.username || '匿名';
        username.setAttribute('class', 'commentUsername');
        time.innerText = el.create_time + ' #' + el.floor;
        time.setAttribute('class', 'commentTime');
        contentSection.innerText = el.comment_content;
        contentSection.setAttribute('class', 'commentSection');
        headSection.appendChild(username);
        headSection.appendChild(time) || formatDate(new Date());
        oneComment.appendChild(headSection);
        oneComment.appendChild(contentSection);
        nowComment.appendChild(oneComment);
    }
    function updateListNumber () { nowCommentNumber.innerText = '共 ' + commentListNumber + ' 条评论'; }
    var commentListNumber = 0;
    var nowCommentNumber = document.createElement('div');
    nowCommentNumber.style.margin = '10px 0';
    nowCommentNumber.style.fontWeight = 'bold';
    nowCommentNumber.style.textAlign = 'center';
    updateListNumber(commentListNumber);
    $container.append(nowCommentNumber);

    var nowComment = document.createElement('div'); // 当前已有评论
    $container.append(nowComment);

    var appendComment = document.createElement('div'); // 追加评论
    appendComment.setAttribute('class', 'oneComment');
    var appendCommentHead = document.createElement('div'); // 评论头
    var appendCommentText = document.createElement('textarea'); // 评论文本域
    var appendCommentButtonGroup = document.createElement('div');
    var appendCommentSubmit = document.createElement('button'); // 评论
    var appendCommentClear = document.createElement('button'); // 清空
    var appendCommentUsername = document.createElement('input'); // 用户姓名
    var appendCommentRandom = document.createElement('button'); // 获得随机名字
    appendCommentUsername.setAttribute('type', 'text');
    appendCommentUsername.setAttribute('placeholder', '若为空，则表示匿名评论');
    appendCommentUsername.setAttribute('class', 'appendCommentUsername');
    appendCommentRandom.innerText = '随机取名';
    appendCommentRandom.setAttribute('class', 'button');
    appendCommentRandom.onclick = function () { appendCommentUsername.value = getChineseName() };
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
    appendCommentSubmit.onclick = function () {
        // 追加一条评论
        if (appendCommentText.value.trim() === '') {
            notify.info({content: '请选择填写内容再评论'});
        } else {
            $.ajax({
                type: 'POSt',
                url: '/index.php/note/Comment/addComment',
                dataType: 'json',
                data: {
                    article: currentTitle,
                    username: appendCommentUsername.value,
                    content: appendCommentText.value
                },
                success: function (data) {
                    if (data.status) {
                        // 添加评论成功
                        addOneComment(data.comment);
                        appendCommentText.value =  '';
                        notify.info({content: '添加评论成功！'});
                        commentListNumber++;
                        updateListNumber();
                    } else { notify.info({content: data.message || '添加评论失败'}); }
                },
                error (err) {
                    notify.info({content: '无法进行评论'});
                }
            });
        }

    }
    appendCommentClear.innerText = '清空';
    appendCommentClear.onclick = function () { appendCommentText.value = ''; }
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
            article: currentTitle
        },
        dataType: 'json',
        success: function (data) {
            data.forEach(addOneComment);
            commentListNumber = data.length;
            updateListNumber();
        }
    });

});