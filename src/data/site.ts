// 网站的全部文字内容都在这个文件里。改这里就能改网站，不用碰页面代码。
// 内容来自简历（2026-10-27）。对外身份：法考客观题已过 · 求职 · Agent FDE · 法律 × AI。

export const profile = {
  name: 'Helix',
  title: '法律 × AI · Agent FDE',
  // 一句话定位：招聘方首屏看到的第一句话
  tagline: '懂律所怎么接案，也能把 AI 落地到客户现场。',
  intro:
    '法考客观题已通过。在律所跟执行主任上门拜访过 90+ 家客户，知道案源从哪来、咨询怎么变成签约；也能把业务流程拆成「上下文 → 数据库 → Agent → 自动化」，独立交付给客户。正在找 Agent FDE（驻场部署工程师：到客户现场把 AI 落地）和法律 × AI 方向的工作，base 深圳。',
  location: '深圳',
  email: 'p971523047@gmail.com',
  phones: [] as string[], // 电话不公开，招聘方要时再给
  wechat: '', // 待替换：微信号；有二维码就放 public/wechat.png
  cvPdf: '', // 简历 PDF 还有待补项，补齐后放进 public/ 再填文件名
  links: [
    // { label: 'GitHub', url: 'https://github.com/xxx' },
  ] as { label: string; url: string }[],
};

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  problem: string;
  approach: string;
  result: string; // 待替换：尽量写成数字
  tags: string[];
  art: 'funnel' | 'flow' | 'graph' | 'chart' | 'hub';
  link?: { label: string; path: string }; // 站内链接，例如中控回放
};

// 顺序 = 首页展示顺序：和法律岗最相关的放最前
export const projects: Project[] = [
  {
    slug: 'enterprise-context',
    name: '企业 AI 上下文系统',
    oneLiner: 'FDE 实操：给佛山一家约 8 人的制造外贸企业做 AI 落地，从需求澄清到现场推进。',
    problem: '客户只知道「想用 AI 做内容获客」，不知道从哪一步开始，企业资料也散在各处。',
    approach: '需求表加 5 分钟电话澄清，把诉求收敛成三步：企业上下文 → 单点自动化 → 可复用 Skill；2026 年 9 月赴佛山南海现场面谈，推进知识库 MVP。',
    result: '独立交付，进行中',
    tags: ['FDE', '需求澄清', '知识库'],
    art: 'graph',
  },
  {
    slug: 'tw-stock-script',
    name: '台股群聊剧本生成器',
    oneLiner: '付费客户项目：给投教社群生成群聊剧本，客户自己就能运行。',
    problem: '社群每天要产出大量带行情的群聊内容，人工写慢，AI 直接写又容易编数据。',
    approach: '交付 Skill 包：规则层 + 5 张场景卡 + 31 张角色卡 + 行情抓取与自检脚本 + 自安装说明；用单一事实源驱动，硬性规定「抓取失败不得编造数据」。',
    result: '客户复购，追加韩股版本',
    tags: ['Skill 包', '防幻觉', '付费交付'],
    art: 'chart',
  },
  {
    slug: 'dsh',
    name: 'DSH 多 Agent 调度中枢',
    oneLiner: 'Claude Code 做规划和验收，便宜模型做执行，统一调度多个 AI 桌面工具。',
    problem: '同时用多个 AI 工具，任务和上下文分散，成本也难控制。',
    approach: '用文件契约（任务单 → runs/ → 验收）交接每一步，全程可追溯；决策日志只追加不删改，密钥只走环境变量。',
    result: '已跑通端到端闭环',
    tags: ['多 Agent', '编排', '成本控制'],
    art: 'hub',
    link: { label: '看一轮运行回放', path: 'console/' },
  },
  {
    slug: 'jp-finance-content',
    name: '日本金融内容运营',
    oneLiner: '客户项目：IG / Facebook / X 三平台日更流水线。',
    problem: '三个平台每天都要发金融观点和配图，纯人工难以持续。',
    approach: 'AI 生成观点与配图，人只在关键节点审核后发布。',
    result: '三平台日更运行中',
    tags: ['内容自动化', '多平台', '客户项目'],
    art: 'flow',
  },
  {
    slug: 'personal-db',
    name: '个人数据库与脱敏发布',
    oneLiner: '资料按公开 / 私密分级管理，对外内容自动脱敏后才发布。',
    problem: '资料越积越多，又要对外展示，最怕把不该公开的内容带出去。',
    approach: 'Markdown 为真相源，SQLite 全文索引可随时重建；按 public / private 分级导出，密钥不入库。',
    result: '这个网站的内容就从这里导出',
    tags: ['数据分级', '脱敏', 'SQLite'],
    art: 'funnel',
  },
];

export type Experience = { period: string; org: string; role: string; points: string[] };

export const experience: Experience[] = [
  {
    period: '2026.07 – 至今',
    org: '独立执业',
    role: 'AI 解决方案 · FDE',
    points: [
      '给制造外贸企业做 AI 落地：需求澄清、现场面谈、知识库 MVP',
      '付费客户 Skill 包交付，客户复购并追加新版本',
      '自建多 Agent 调度中枢，强模型规划验收、便宜模型批量执行',
    ],
  },
  {
    period: '约 6 个月',
    org: '华商律师事务所',
    role: '执行主任助理 · 客户拓展与谈案',
    points: [
      '业务拓展部创始成员：部门初创时只有我和执行主任（全所三位主任之一）两人，入职一周独立上岗',
      '随执行主任上门谈案，常规每天 3 家，6 个月累计拜访 90+ 家客户，覆盖深圳、广州、佛山',
      '线索来自律所沉淀客户、外购线索和网红律师合作引流，负责跟进、需求判断与签约转化',
    ],
  },
  {
    period: '2026',
    org: '国家统一法律职业资格考试',
    role: '客观题已通过',
    points: ['主观题已考，待出分'],
  },
];

// 按「法律 + AI」岗位常见要求分三组
export const skills = [
  {
    group: '法律业务',
    items: ['6 个月律所一线谈案，90+ 家客户', '熟悉律师业务推广合规红线', '劳动、婚姻家事、民间借贷、合同、交通事故等常见咨询'],
  },
  {
    group: 'AI 与 Agent 编排',
    items: ['多 Agent 系统设计与长期运行', 'Claude Code / Codex / DeepSeek 重度实操', '把规则拆成 AI 判断逻辑，Skill 包化交付'],
  },
  {
    group: 'FDE 式交付',
    items: ['需求澄清：电话 + 现场面谈', '方案收敛 → 原型 → 交付文档', '客户自安装说明，有付费复购'],
  },
];
