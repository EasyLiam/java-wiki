#!/usr/bin/env python3
import sys
import os
sys.path.insert(0, '/root/.openclaw/skills/stock-fund-query/scripts')
from fund_realtime import get_fund_realtime

# 读取持仓数据
holdings = {
    "aggressive": [
        {
            "code": "011399",
            "name": "汇添富数字未来混合A",
            "amount": 3458.23,
            "yesterday_profit": -121.32,
            "total_profit": 621.21
        },
        {
            "code": "004070",
            "name": "南方中证全指证券公司ETF联接C",
            "amount": 644.89,
            "yesterday_profit": -25.92,
            "total_profit": 147.98
        },
        {
            "code": "501203",
            "name": "易方达创新未来混合(LOF)",
            "amount": 245.57,
            "yesterday_profit": -8.83,
            "total_profit": 54.76
        },
        {
            "code": "110013",
            "name": "易方达科翔混合",
            "amount": 53.86,
            "yesterday_profit": -1.70,
            "total_profit": 12.82
        },
        {
            "code": "161024",
            "name": "富国中证军工指数(LOF)A",
            "amount": 109.48,
            "yesterday_profit": -5.45,
            "total_profit": 9.49
        },
        {
            "code": "519116",
            "name": "浦银安盛沪深300指数增强A",
            "amount": 6.26,
            "yesterday_profit": -0.21,
            "total_profit": -1.70
        },
        {
            "code": "000309",
            "name": "汇添富价值精选混合A",
            "amount": 41.76,
            "yesterday_profit": -1.22,
            "total_profit": -8.24
        },
        {
            "code": "001595",
            "name": "天弘中证银行ETF联接C",
            "amount": 1403.66,
            "yesterday_profit": -45.30,
            "total_profit": -50.40
        },
        {
            "code": "003096",
            "name": "中欧医疗健康混合C",
            "amount": 5372.65,
            "yesterday_profit": -137.12,
            "total_profit": -534.16
        },
        {
            "code": "005827",
            "name": "易方达蓝筹精选混合",
            "amount": 11491.36,
            "yesterday_profit": -230.81,
            "total_profit": -946.33
        },
        {
            "code": "000248",
            "name": "汇添富中证主要消费ETF联接",
            "amount": 0.00,
            "yesterday_profit": 0.00,
            "total_profit": 0.00
        },
        {
            "code": "006249",
            "name": "南方城乡生活消费混合",
            "amount": 0.00,
            "yesterday_profit": 0.00,
            "total_profit": 0.00
        }
    ],
    "conservative": [
        {
            "code": "001831",
            "name": "长城收益宝货币A",
            "amount": 114.37,
            "yesterday_profit": 0.00,
            "total_profit": 14.37
        }
    ]
}

def format_profit(value):
    emoji = "🔴" if value < 0 else "🟢" if value > 0 else "⚪"
    return f"{emoji} {value:+.2f}"

# 获取实时数据并计算
print("📊 每日基金预估盈亏报告\n")
print(f"📅 日期: 2026-03-26\n")

print("## 📈 进阶类（偏股/混合/指数）\n")
print("| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 累计持有收益 |")
print("|---------|---------:|-----------:|-------------:|-------------:|")

total_aggressive_amount = 0
total_aggressive_today = 0
total_aggressive_total = 0

for fund in holdings["aggressive"]:
    data = get_fund_realtime(fund["code"])
    if data:
        change = data["estimate_change"]
        today_profit = fund["amount"] * change / 100
    else:
        change = 0
        today_profit = 0
    
    total_aggressive_amount += fund["amount"]
    total_aggressive_today += today_profit
    total_aggressive_total += fund["total_profit"] + today_profit
    
    change_str = f"{change:+.2f}%" if change != 0 else "0.00%"
    if change < 0:
        change_str = f"🔴 {change_str}"
    elif change > 0:
        change_str = f"🟢 {change_str}"
    else:
        change_str = f"⚪ {change_str}"
    
    today_str = f"{today_profit:+.2f}" if today_profit != 0 else "0.00"
    total_fund = fund["total_profit"] + today_profit
    total_str = f"{total_fund:+.2f}"
    
    print(f"| {fund['name']} | {fund['amount']:.2f} | {change_str} | {today_str} | {total_str} |")

print("\n## 📊 稳健类（货币/债券）\n")
print("| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 累计持有收益 |")
print("|---------|---------:|-----------:|-------------:|-------------:|")

total_conservative_amount = 0
total_conservative_today = 0
total_conservative_total = 0

for fund in holdings["conservative"]:
    data = get_fund_realtime(fund["code"])
    if data:
        change = data["estimate_change"]
        today_profit = fund["amount"] * change / 100
    else:
        change = 0
        today_profit = 0
    
    total_conservative_amount += fund["amount"]
    total_conservative_today += today_profit
    total_conservative_total += fund["total_profit"] + today_profit
    
    change_str = f"{change:+.2f}%" if change != 0 else "0.00%"
    if change < 0:
        change_str = f"🔴 {change_str}"
    elif change > 0:
        change_str = f"🟢 {change_str}"
    else:
        change_str = f"⚪ {change_str}"
    
    today_str = f"{today_profit:+.2f}" if today_profit != 0 else "0.00"
    total_fund = fund["total_profit"] + today_profit
    total_str = f"{total_fund:+.2f}"
    
    print(f"| {fund['name']} | {fund['amount']:.2f} | {change_str} | {today_str} | {total_str} |")

# 合计
print("\n## 🎯 总计\n")
total_amount = total_aggressive_amount + total_conservative_amount
total_today = total_aggressive_today + total_conservative_today
total_all = total_aggressive_total + total_conservative_total

print(f"- **总持仓金额**: {total_amount:.2f}")
today_emoji = "🔴" if total_today < 0 else "🟢" if total_today > 0 else "⚪"
print(f"- **今日预估盈亏**: {today_emoji} {total_today:+.2f}")
all_emoji = "🔴" if total_all < 0 else "🟢" if total_all > 0 else "⚪"
print(f"- **累计持有收益**: {all_emoji} {total_all:+.2f}")

print(f"\n⏱ 估值时间: {data.get('estimate_time', 'N/A') if 'data' in locals() else 'N/A'}")
print("\n注: 数据来自天天基金网实时估值，实际以收盘净值为准")
