## 如何规范地编写文档
为了保持规范，编写文档时，需要使用预设好的格式进行开发。

### 模板
若希望创建一个新的页面，其步骤为：
1. 若新建了目录层级，则需要在 js/sider/category.json 中增加条目
2. 在 js/sider/items.json 中增加条目
3. 执行编译（若执行了 dev 命令则无需此步骤）
```bash
npm run build
```
4. 在 html 目录下新增对应位置的文档

### 文档结构
编写文档时，请保持以下嵌套格式。
+ section
  + h2
  + p
    + 正文
  + h3
  + p
    + 正文
  + h4
  + 正文
  + h5
  + 正文

### 插入表格
```html
<table>
  <tr>
    <th>表头</th>
  </tr>
  <tr>
    <td>内容</td>
  </tr>
</table>
```

### 插入图片
```html
<figure>
  <img src="picture.jpg">
  <figcaption>图片描述</figcaption>
</figure>
```
### 引用文本
```html
<div class="tip">这是一些引用文本</div>
```

### 预设问答
```html
<div class="preset-question">为什么？</div>
<div class="preset-answer">回答</div>
```