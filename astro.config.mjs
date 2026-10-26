import { defineConfig } from 'astro/config';

// 部署到 GitHub Pages 时，在构建命令里设置 SITE 和 BASE，例如：
//   SITE=https://<用户名>.github.io BASE=/website npm run build
// 绑定自有域名后 BASE 设为 / 即可。
export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE || '/',
});
