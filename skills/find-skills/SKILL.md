---
name: find-skills
description: "搜索、查找和管理已安装的 OpenClaw 技能。提供快速搜索、过滤和统计功能。"
---

# Find Skills

快速搜索、查找和管理已安装的 OpenClaw 技能。

## 功能特点

- 🔍 **快速搜索** - 按名称或描述搜索技能
- 📊 **统计信息** - 显示技能总数和状态统计
- 📋 **多种格式** - 支持表格、JSON、简单列表输出
- 🎯 **状态过滤** - 按就绪状态过滤技能
- ⚡ **即时响应** - 本地搜索，无需网络

## 使用方法

### 命令行使用

```bash
# 列出所有技能
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py

# 搜索技能
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py desktop

# 使用搜索参数
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py -s coding

# JSON 格式输出
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py -f json

# 简单列表格式
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py -f simple

# 显示统计信息
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py --stats

# 按状态过滤
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py --status ready
```

### 在 OpenClaw 对话中使用

```
帮我查找桌面控制相关的技能
搜索所有编程相关的技能
查看我安装了哪些技能
显示技能统计信息
找一个可以搜索技能的技能
```

## 输出格式

### 表格格式（默认）
```
Status   Name                 Description
------------------------------------------------------------
✓ ready  desktop-control      桌面自动化控制（鼠标键盘操作）
✓ ready  coding-skills        编程辅助工具集
✓ ready  file-manager         文件管理工具

总计：112 个技能
```

### 简单格式
```
[✓] desktop-control
    桌面自动化控制（鼠标键盘操作）
[✓] coding-skills
    编程辅助工具集
```

### JSON 格式
```json
[
  {
    "name": "desktop-control",
    "path": "/home/user/.openclaw/skills/desktop-control",
    "description": "桌面自动化控制（鼠标键盘操作）",
    "status": "ready"
  }
]
```

## 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `search` | 搜索关键词 | `desktop`, `coding`, `file` |
| `-s, --search` | 搜索关键词 | `-s coding` |
| `-f, --format` | 输出格式 | `-f json`, `-f simple`, `-f table` |
| `--stats` | 显示统计信息 | `--stats` |
| `--status` | 按状态过滤 | `--status ready` |

## 使用场景

1. **查找技能** - 当您需要找到特定功能的技能时
2. **技能审计** - 查看已安装的所有技能
3. **技能统计** - 了解技能安装情况
4. **技能管理** - 识别未就绪的技能
5. **快速搜索** - 根据关键词快速定位技能

## 示例

### 搜索桌面控制相关
```bash
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py desktop
```

### 搜索编程相关
```bash
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py coding
```

### 搜索文件管理
```bash
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py file
```

### 查看所有就绪技能
```bash
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py --status ready
```

### 获取技能列表用于脚本处理
```bash
python3 ~/.openclaw/skills/find-skills/scripts/find-skills.py -f json
```

## 与其他技能的配合

- **clawhub** - 搜索 ClawHub 上的新技能并安装
- **skill-creator** - 创建新的自定义技能
- **session-logs** - 搜索和分析技能使用日志

## 技术细节

- **技能目录**: `~/.openclaw/skills/`
- **扫描方式**: 遍历技能目录，读取 SKILL.md 文件
- **状态判断**: 检查 scripts 目录或 SKILL.md 是否存在
- **搜索算法**: 简单的字符串匹配（不区分大小写）

## 故障排除

### 问题：找不到技能
**解决方案**: 确保技能已正确安装到 `~/.openclaw/skills/` 目录

### 问题：搜索结果为空
**解决方案**: 
- 检查搜索关键词是否正确
- 尝试更短的关键词
- 使用 `--stats` 查看总技能数

### 问题：技能状态显示 unknown
**解决方案**: 确保技能目录包含 SKILL.md 文件或 scripts 目录

## 相关文件

- 脚本：`~/.openclaw/skills/find-skills/scripts/find-skills.py`
- 文档：`~/.openclaw/skills/find-skills/SKILL.md`
- 配置：`~/.openclaw/skills/find-skills/find_skills.plugin.json`

---

**版本**: 1.0.0  
**创建日期**: 2026-03-17  
**作者**: Custom Skill for OpenClaw
