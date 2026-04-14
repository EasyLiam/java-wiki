#!/usr/bin/env python3
import sys
import os
sys.path.insert(0, '/home/liam/.openclaw/workspace/skills/stock-fund-query/scripts')
from fund_realtime import get_fund_realtime

# 读取持仓数据
holding_file = '/home/liam/.openclaw/workspace/memory/2026-03-24-fund-holdings.md'

# 分类持仓
advanced_funds = [
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

def get_all_funds_data(funds):
    results = []
    for f in funds:
        data = get_fund_realtime(f["code"])
        if data:
            change_pct = data["estimate_change"]
            today_profit = f["amount"] * (change_pct / 100)
            results.append({
                **f,
                "change_pct": change_pct,
                "today_profit": today_profit,
                "estimate_time": data["estimate_time"]
            })
        else:
            results.append({
                **f,
                "change_pct": 0,
                "today_profit": 0,
                "estimate_time": "获取失败"
            })
    return results

# 获取所有基金数据
advanced_data = get_all_funds_data(advanced_funds)
stable_data = get_all_funds_data(stable_funds)

# 计算合计
total_amount = sum(f["amount"] for f in advanced_funds + stable_funds)
total_today_profit = sum(f["today_profit"] for f in advanced_data + stable_data)
total_hold_profit = sum(f["hold_profit"] for f in advanced_funds + stable_funds) + total_today_profit

# 生成报告
from datetime import datetime
now = datetime.now().strftime("%Y-%m-%d %H:%M")
estimate_time = advanced_data[0]["estimate_time"] if advanced_data else now

report = f"📊 基金每日预估盈亏报告\n"
report += f"更新时间: {estimate_time}\n\n"

# 进阶类
report += "🔹 进阶类（偏股/混合/指数）\n"
report += f"{'基金名称':<20} {'持仓金额':>10} {'今日涨跌':>8} {'今日预估':>10} {'持有收益':>10}\n"
report += "-" * 70 + "\n"
for f in advanced_data:
    if f["amount"] == 0:
        continue
    emoji = "🟢" if f["change_pct"] > 0 else "🔴" if f["change_pct"] < 0 else "⚪"
    name = f["name"][:18]
    report += f"{emoji} {name:<18} {f['amount']:>10.2f} {f['change_pct']:>+7.2f}% {f['today_profit']:>+10.2f} {f['hold_profit']:>+10.2f}\n"

advanced_total_amount = sum(f["amount"] for f in advanced_data)
advanced_total_today = sum(f["today_profit"] for f in advanced_data)
advanced_total_hold = sum(f["hold_profit"] for f in advanced_data) + advanced_total_today
report += "-" * 70 + "\n"
report += f"{'小计':<20} {advanced_total_amount:>10.2f} {'':^8} {advanced_total_today:>+10.2f} {advanced_total_hold:>+10.2f}\n\n"

# 稳健类
report += "🔸 稳健类（货币/债券）\n"
report += f"{'基金名称':<20} {'持仓金额':>10} {'今日涨跌':>8} {'今日预估':>10} {'持有收益':>10}\n"
report += "-" * 70 + "\n"
for f in stable_data:
    emoji = "🟢" if f["change_pct"] > 0 else "🔴" if f["change_pct"] < 0 else "⚪"
    name = f["name"][:18]
    report += f"{emoji} {name:<18} {f['amount']:>10.2f} {f['change_pct']:>+7.2f}% {f['today_profit']:>+10.2f} {f['hold_profit']:>+10.2f}\n"

stable_total_amount = sum(f["amount"] for f in stable_data)
stable_total_today = sum(f["today_profit"] for f in stable_data)
stable_total_hold = sum(f["hold_profit"] for f in stable_data) + stable_total_today
report += "-" * 70 + "\n"
report += f"{'小计':<20} {stable_total_amount:>10.2f} {'':^8} {stable_total_today:>+10.2f} {stable_total_hold:>+10.2f}\n\n"

# 总计
emoji_total = "🟢" if total_today_profit > 0 else "🔴" if total_today_profit < 0 else "⚪"
report += f"{emoji_total} 合计\n"
report += f"总持仓金额: {total_amount:.2f}\n"
report += f"今日预估盈亏: {total_today_profit:+.2f}\n"
report += f"累计持有收益: {total_hold_profit:+.2f}\n"

print(report)

# 保存报告
with open('/home/liam/.openclaw/workspace/tmp/fund_daily_report.txt', 'w', encoding='utf-8') as f:
    f.write(report)
