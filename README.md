# Unity Developer Portfolio

这是一个面向 Unity 开发工程师的个人作品集网站，使用纯 HTML、CSS 和 JavaScript 构建，适合部署到 GitHub Pages 作为静态站点。页面包含首页作品轮播、项目详情页、个人介绍页、响应式布局和移动端性能优化。

## 在线访问

部署完成后访问：

```text
https://moshengren151.github.io/moshengren.github.io/
```

如果仓库后续改名为 `moshengren151.github.io`，访问地址通常会变为：

```text
https://moshengren151.github.io/
```

## 本地预览

在项目根目录运行：

```bash
python -m http.server 8094 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:8094/
```

## GitHub Pages 部署

1. 推送代码到 GitHub 仓库。
2. 进入仓库页面。
3. 打开 `Settings`。
4. 进入 `Pages`。
5. Source 选择 `Deploy from branch`。
6. Branch 选择 `main`。
7. Folder 选择 `/root`。
8. 保存并等待 GitHub Pages 构建完成。

## 更新方式

修改网站内容后，执行：

```bash
git add .
git commit -m "update portfolio"
git push
```

推送完成后，GitHub Pages 会自动重新部署。
