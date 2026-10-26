# 个人网站

Astro 静态网站。PRD：https://claude.ai/artifact/C6iTvuRMjMZkwdarbkWTUA

- 改文字：`src/data/site.ts`
- 加文章：往 `src/content/writing/` 放一个 `.md`
- 加日志：往 `src/content/log/` 放一个 `.md`
- 本地预览：`npm install` 后 `npm run dev`，打开 http://localhost:4321
- 发布：运行 `powershell -File scripts\deploy.ps1`，会构建并推送到 gh-pages 分支（GitHub Pages）

## 总中控（/console）

- 现在是 P1 展示版：回放 `src/console/demo-run.json` 里的示例数据，只读。
- 数据格式见 `src/console/types.ts`，以后真实 runs/ 导出成同样格式就能替换。
- 操作模式（读真实数据、派活）不放进这个公开网站。
