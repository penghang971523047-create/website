// 总中控的统一数据格式。展示版（示例数据）和以后的本机操作台（真实 runs/）都用这一套。
// 对齐 dsh-hub 的 runs/ 回传格式：STATUS / FILE / SUMMARY / CONFIDENCE。

export type NodeId = 'intake' | 'brain' | 'dsh' | 'codex' | 'runs' | 'review' | 'status';

export type Executor = 'claude' | 'dsh' | 'codex';

export type TaskStatus = 'todo' | 'running' | 'review' | 'done';

export interface RunTask {
  id: string;
  title: string;
  executor: Executor;
  model: string;            // 例如 DeepSeek Flash
  brief: string;            // 任务单要点
  result?: {
    status: 'OK' | 'PARTIAL' | 'FAIL';
    file: string;           // runs/ 里的产出文件（展示版为虚构路径）
    summary: string;
    confidence: number;     // 0–1
  };
  costCny: number;          // 实际花费（示例）
  costIfStrongCny: number;  // 全用强模型的估算花费（示例）
}

export type EventType = 'create' | 'plan' | 'dispatch' | 'write' | 'review' | 'reject' | 'accept' | 'status';

export interface RunEvent {
  t: number;                // 回放时间（秒）
  task: string;
  type: EventType;
  from: NodeId;
  to: NodeId;
  msg: string;
}

export interface RunSnapshot {
  name: string;
  date: string;
  isDemo: boolean;          // true = 示例数据
  tasks: RunTask[];
  events: RunEvent[];
}

// 数据源接口：展示版读打包进来的示例文件；P2 操作台换成读本机 runs/ 的实现。
export interface RunSource {
  load(): Promise<RunSnapshot>;
}
