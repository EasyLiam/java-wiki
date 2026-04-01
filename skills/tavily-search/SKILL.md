---
name: tavily-search
description: "使用 Tavily API 进行网络搜索。当用户要求搜索时，使用 tavily_search 工具。不要使用 web_search - 它已被禁用。"
user-invocable: true
metadata: {"openclaw": {"emoji": "🔍", "requires": {"env": ["TAVILY_API_KEY"]}, "primaryEnv": "TAVILY_API_KEY"}}
---

# Tavily Search Skill

**重要**: 本系统已禁用内置的 `web_search` 工具。请使用 `tavily_search` 工具进行所有网络搜索。

## 如何使用

当用户要求搜索时，使用 `tavily_search` 工具：

```json
{
  "query": "搜索内容",
  "count": 5
}
```

## 可用参数

- `query` (必需): 搜索查询内容
- `count`: 结果数量 (1-20，默认5)
- `topic`: "general", "news", 或 "finance"
- `time_range`: "day", "week", "month", 或 "year"
- `search_depth`: "basic" 或 "advanced"

## 示例

搜索今天的新闻：
```json
{
  "query": "今天的新闻",
  "topic": "news",
  "time_range": "day"
}
```

## 配置

API Key 已配置: `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`

---

**版本**: 1.0.0
