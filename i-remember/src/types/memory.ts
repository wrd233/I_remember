// 前端类型定义 (src/types/memory.ts)
export interface Memory {
    id: number;        // 需要前端生成临时ID
    title: string;
    date: string;
    content: string;
    imageUrls: string[]; // 后端字段名为 images
  }