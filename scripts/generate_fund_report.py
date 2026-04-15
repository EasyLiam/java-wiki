#!/usr/bin/env python3
import sys
sys.path.append('/home/liam/.openclaw/workspace/skills/stock-fund-query/scripts')
from fund_realtime import get_fund_realtime

# 读取持仓数据
holdings_file = "/home/liam/.openclaw/workspace/memory/2026-03-24-fund-holdings.md"

# 解析持仓
advance_funds = [
    {"code": "011399", "name": "汇添富数字未来混合A", "amount": 3458.23, "hold_profit": 621.21},
    {"code": "004070", "name": "南方中证全指证券公司ETF联接C", "amount": 644.89, "hold_profit": 147.98},
    {"code": "501203", "name": "易方达创新未来混合(LOF)", "amount": 245.57, "hold_profit": 54.76},
    {"code": "110013", "name": "易方达科翔混合", "amount": 53.86, "hold_profit": 12.82},
    {"code": "161024", "name": "富国中证军工指数(LOF)A", "amount": 109.48, "hold_profit": 9.49},
    {"code": "519116", "name": "浦银安盛沪深300指数增强A", "amount": 6.26, "hold_profit": -1.70},
    {"code": "000309", "name": "汇添富价值精选混合A", "amount": 41.76, "hold_profit": -8.24},
    {"code": "001595", "name": "天弘中证银行ETF联接C", "amount": 1403.66, "hold_profit": -50.40},
    {"code": "003096", "name": "中欧医疗健康混合C", "amount": 5372.65, "hold_profit": -534.16},
    {"code": "005827", "name": "易方达蓝筹精选混合", "amount": 11491.36, "hold_profit": -946.33},
    {"code": "000248", "name": "汇添富中证主要消费ETF联接", "amount": 0.00, "hold_profit": 0.00},
    {"code": "006249", "name": "南方城乡生活消费混合", "amount": 0.00, "hold_profit": 0.00},
]

stable_funds = [
    {"code": "001831", "name": "长城收益宝货币A", "amount": 114.37, "hold_profit": 14.37},
]

def format_profit(value):
    emoji = "📈" if value > 0 else "📉" if value < 0 else "➖"
    return f"{emoji} {value:+.2f}"

# 获取实时数据并计算
print("🏃 正在获取基金实时估值...\n")

advance_total = 0
advance_profit_today = 0
advance_total_hold_profit = 0

stable_total = 0
stable_profit_today = 0
stable_total_hold_profit = 0

report = f"📊 **每日基金预估盈亏报告 - 2026-04-14 14:45**\n\n"

# 进阶类
report += "## 🚀 进阶类（偏股/混合/指数）\n\n"
report += "| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |\n"
report += "|---------|---------|-----------|-------------|---------|\n"

for fund in advance_funds:
    data = get_fund_realtime(fund["code"])
    if data is None:
        print(f"⚠️  获取 {fund['name']} ({fund['code']}) 失败")
        continue
    
    change = data["estimate_change"]
    today_profit = fund["amount"] * (change / 100)
    
    advance_total += fund["amount"]
    advance_profit_today += today_profit
    advance_total_hold_profit += fund["hold_profit"]
    
    change_emoji = "🟢" if change > 0 else "🔴" if change < 0 else "⚪"
    report += f"| {fund['name']} | {fund['amount']:.2f} | {change_emoji} {change:+.2f}% | {format_profit(today_profit).split()[1]} | {format_profit(fund['hold_profit']).split()[1]} |\n"

report += f"\n**进阶类小计:**\n"
report += f"- 总持仓: {advance_total:.2f}\n"
report += f"- 今日预估收益: {format_profit(advance_profit_today)}\n"
report += f"- 累计持有收益: {format_profit(advance_total_hold_profit)}\n\n"

# 稳健类
report += "## 🛡️ 稳健类（货币/债券）\n\n"
report += "| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |\n"
report += "|---------|---------|-----------|-------------|---------|\n"

for fund in stable_funds:
    # 货币基金一般每日收益固定，涨跌幅0
    change = 0.0
    today_profit = 0.0
    data = get_fund_realtime(fund["code"])
    if data and data.get("estimate_change") is not None:
        change = data["estimate_change"]
        today_profit = fund["amount"] * (change / 100)
    
    stable_total += fund["amount"]
    stable_profit_today += today_profit
    stable_total_hold_profit += fund["hold_profit"]
    
    change_emoji = "🟢" if change > 0 else "🔴" if change < 0 else "⚪"
    report += f"| {fund['name']} | {fund['amount']:.2f} | {change_emoji} {change:+.2f}% | {format_profit(today_profit).split()[1]} | {format_profit(fund['hold_profit']).split()[1]} |\n"

report += f"\n**稳健类小计:**\n"
report += f"- 总持仓: {stable_total:.2f}\n"
report += f"- 今日预估收益: {format_profit(stable_profit_today)}\n"
report += f"- 累计持有收益: {format_profit(stable_total_hold_profit)}\n\n"

# 合计
total_amount = advance_total + stable_total
total_today = advance_profit_today + stable_profit_today
total_hold = advance_total_hold_profit + stable_total_hold_profit

report += "## 📋 总计\n\n"
report += f"- 总持仓金额: **{total_amount:.2f}**\n"
report += f"- 今日预估盈亏: **{format_profit(total_today)}**\n"
report += f"- 累计持有收益: **{format_profit(total_hold)}**\n\n"

if data and data.get("estimate_time"):
    report += f"*估值数据更新时间: {data['estimate_time']}*\n"

# 保存报告
output_file = "/home/liam/.openclaw/workspace/fund_daily_report_20260414.md"
with open(output_file, "w", encoding="utf-8") as f:
    f.write(report)

print(report)
print(f"\n✅ 报告已保存到 {output_file}")
