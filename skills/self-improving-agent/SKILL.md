---
name: self-improving-agent
description: "自我改进和主动代理技能。通过分析交互历史、学习模式和提供主动建议来持续改进代理能力。"
---

# Self-Improving + Proactive Agent

自我改进和主动代理技能，通过学习和分析持续提升服务质量。

## 功能特点

- 🧠 **自我学习** - 从交互中学习模式和最佳实践
- 📊 **交互分析** - 分析用户行为和偏好
- 💡 **主动建议** - 根据上下文主动提供建议
- 🔄 **持续改进** - 不断优化服务质量
- 📈 **模式识别** - 识别用户习惯和工作模式
- 🎯 **智能预测** - 预测用户需求并提前准备

## 使用方法

### 命令行使用

```bash
# 分析交互
python3 ~/.openclaw/skills/self-improving-agent/scripts/self-improving-agent.py analyze \
  --query "帮我创建一个Python脚本" \
  --response "已创建脚本文件"

# 获取改进建议
python3 ~/.openclaw/skills/self-improving-agent/scripts/self-improving-agent.py suggest

# 获取主动建议
python3 ~/.openclaw/skills/self-improving-agent/scripts/self-improving-agent.py proactive

# 学习新模式
python3 ~/.openclaw/skills/self-improving-agent/scripts/self-improving-agent.py learn \
  --pattern-name "daily-report" \
  --pattern-data '{"template": "日报模板", "fields": ["完成事项", "遇到问题", "明日计划"]}'

# 应用已学习的模式
python3 ~/.openclaw/skills/self-improving-agent/scripts/self-improving-agent.py apply \
  --pattern-name "daily-report"

# 查看统计信息
python3 ~/.openclaw/skills/self-improving-agent/scripts/self-improving-agent.py stats
```

### 在 OpenClaw 对话中使用

```
分析我的使用习惯
给我一些改进建议
学习这个工作流程
应用之前学习的模式
查看我的使用统计
```

## 核心功能

### 1. 交互分析

自动记录和分析每次交互：
- 查询类型和主题
- 响应质量和成功率
- 用户偏好和习惯
- 时间模式和频率

### 2. 自我改进

基于分析结果持续改进：
- 识别常见问题和解决方案
- 优化响应策略
- 学习用户偏好
- 改进服务质量

### 3. 主动建议

根据上下文主动提供帮助：
- 时间相关的建议（早晨计划、下班提醒等）
- 基于历史的建议（常用操作优化）
- 性能改进建议
- 工作效率提升建议

### 4. 模式学习

学习和应用工作模式：
- 保存常用工作流程
- 一键应用已学习的模式
- 自动优化重复任务
- 智能预测下一步操作

## 使用场景

### 场景 1：日常任务优化
```
用户：我每天都要写日报
代理：我可以学习您的日报模式，以后自动帮您生成
用户：好的，学习这个模式
代理：✅ 已学习模式：daily-report
```

### 场景 2：主动提醒
```
代理：🌅 早上好！根据您的习惯，今天可能需要：
  1. 检查邮件
  2. 更新项目进度
  3. 参加上午的会议
```

### 场景 3：持续改进
```
代理：💡 我注意到您经常处理文件整理任务
     建议创建一个自动化脚本来提高效率
```

## 数据存储

所有学习数据存储在：
- `~/.openclaw/self-improving-history.json`

数据包括：
- 交互历史（最近 100 条）
- 改进记录
- 建议记录
- 已学习的模式

## 隐私和安全

- ✅ 所有数据本地存储
- ✅ 不上传任何个人信息
- ✅ 可随时清除历史记录
- ✅ 完全透明的学习过程

## 命令详解

### analyze - 分析交互
记录和分析用户交互，提取模式和洞察。

### suggest - 改进建议
基于历史数据生成个性化的改进建议。

### proactive - 主动建议
根据当前时间和上下文提供主动帮助。

### learn - 学习模式
保存常用工作流程和模式供后续使用。

### apply - 应用模式
应用之前学习的模式来快速完成任务。

### stats - 统计信息
查看使用统计和学习进度。

## 配置选项

可在 `~/.openclaw/openclaw.json` 中配置：

```json
{
  "skills": {
    "self-improving-agent": {
      "enabled": true,
      "max_history": 100,
      "auto_suggest": true,
      "proactive_interval": 3600
    }
  }
}
```

## 示例输出

### suggest 命令
```
改进建议：
1. 您最近经常处理编程相关的任务，我可以帮您优化代码生成流程。
2. 建议创建常用代码片段库以提高效率。
```

### proactive 命令
```
主动建议：
🌅 早上好！今天有什么计划吗？
📊 您已经使用了 50+ 次交互，我可以根据您的习惯提供更好的服务。
```

### stats 命令
```
统计信息：
  总交互数: 75
  改进记录数: 12
  建议记录数: 28
  已学习模式数: 5
```

## 故障排除

### 问题：历史记录丢失
**解决方案**：检查 `~/.openclaw/self-improving-history.json` 文件权限

### 问题：建议不准确
**解决方案**：增加交互次数，系统会随着使用变得更准确

### 问题：模式应用失败
**解决方案**：确认模式名称正确，使用 `stats` 命令查看已学习的模式

## 相关文件

- 脚本：`~/.openclaw/skills/self-improving-agent/scripts/self-improving-agent.py`
- 文档：`~/.openclaw/skills/self-improving-agent/SKILL.md`
- 配置：`~/.openclaw/skills/self-improving-agent/self_improving_agent.plugin.json`
- 数据：`~/.openclaw/self-improving-history.json`

---

**版本**: 1.0.0  
**创建日期**: 2026-03-17  
**作者**: Custom Skill for OpenClaw
