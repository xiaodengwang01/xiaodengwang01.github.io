# Xiaodengwang's Blog

这是一个不需要 Hexo 编译的纯静态网站。GitHub Pages 直接发布 `main` 分支根目录。

## 日常修改

- 首页：修改 `index.html`
- 文章列表：修改 `archives/index.html`
- 网页合集文章：修改 `posts/web-pages/index.html`
- 浏览器收藏夹文章：修改 `posts/browser-bookmarks/index.html`
- 小网页：放在 `html/` 下，并在网页合集文章中添加链接

本地预览：

```bash
python3 -m http.server 8000
```

浏览器打开 `http://localhost:8000/`。确认后正常提交并推送到 GitHub，无需运行 Hexo。

旧 Hexo 工程保存在本地 `hexo-backup/`，该目录已被 Git 忽略，不会上传或公开。

## 样式来源

页面样式基于 [Chic](https://github.com/Siricee/hexo-theme-Chic) 修改，并按照 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可使用。
