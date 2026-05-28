# ⚖️ Team Constitution (團隊最高憲法)

## 核心工作週期 (Work Cycle)
1. **工作前先讀憲法** (`.agent/rules/rule.md`)：確保原則一致。
2. **讀取歷史記錄** (`.agent/logs/`)：獲取上下文資訊。
3. **團隊分工協作** (Orchestrator)：動態指派 PM/Engineer/Inspector/Heavy User。
4. **寫回執行記錄** (`.agent/logs/`)：確保知識傳承。

## 前端核心技術棧
- **架構**: Raw HTML + Vanilla CSS + Vanilla JS.
- **資產**: 內聯高畫質 SVG (Inline SVG) 優先。
- **原則**: 零建置 (No Build Step)、秒級部署。

## 必須遵守項目
- **unref 定時器**: 確保背景任務不阻塞退出。
- **EventEmitter 解耦**: 模組間通訊應使用事件驅動。
- **DIP 存儲抽象**: 依賴反轉原則處理數據持久化。
- **敏捷守則**: DRY (Don't Repeat Yourself), SOLID (Design Principles).
