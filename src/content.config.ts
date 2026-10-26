import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文章和学习日志都是 Markdown 文件：新增一篇 = 往对应文件夹里放一个 .md
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    source: z.string().optional(), // 原文链接，例如公众号
    draft: z.boolean().default(false),
  }),
});

const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { writing, log };
