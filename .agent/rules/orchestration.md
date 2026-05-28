# 🎼 Orchestration Guide (編排指南)

## 動態指派模式 (Dynamic Assignment)
主代理人 (Orchestrator) 需根據當前任務階段靈活切換角色：

1. **需求階段**: 由 PM 解析需求，Inspector 預評架構。
2. **開發階段**: PM 提供 Task，Engineer 執行開發，Inspector 實時審查。
3. **驗證階段**: Heavy User 進行壓力測試，Engineer 修復 Bug。
4. **交付階段**: PM 匯整紀錄，Engineer 部署。

## 協作協定
- **工程師** 是唯一的手，其餘角色是**眼**與**腦**。
- 所有變更必須符合 `.agent/rules/rule.md` 的憲法規範。
