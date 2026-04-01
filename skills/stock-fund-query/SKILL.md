---
name: stock-fund-query
description: "查询A股股票实时行情、基金持仓和涨跌预测。当用户询问股票价格、基金持仓、基金涨跌预测时调用此技能。"
user-invocable: true
metadata: {"openclaw": {"emoji": "📈"}}
---

# 股票基金查询技能

查询A股股票实时行情、基金持仓信息和涨跌预测。

## 功能

- 股票行情查询 - 获取A股实时价格、涨跌幅
- 基金持仓查询 - 查询基金持有的股票明细
- 基金涨跌预测 - 根据持仓股票表现预测基金涨跌

## 使用方法

### 命令行使用

```bash
# 查询股票行情
python3 ~/.openclaw/skills/stock-fund-query/scripts/stock_query.py --stock 000001

# 预测基金涨跌
python3 ~/.openclaw/skills/stock-fund-query/scripts/fund_predict.py 011399
```

### 在对话中使用

- 查询贵州茅台的股票行情
- 查看易方达蓝筹精选的持仓
- 基金161725的净值是多少
- 预测基金011399今日涨跌

## 触发词

- 股票、股价、行情
- 基金、持仓、净值
- 查询股票、查询基金
- 基金涨跌预测

## 数据来源

- 东方财富网 API
- 天天基金网 API

## 注意事项

- 仅支持A股市场
- 数据可能有延迟
- 预测仅供参考，不构成投资建议
