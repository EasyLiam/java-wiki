#!/usr/bin/env python3
import sys
sys.path.append('/home/liam/.openclaw/workspace/skills/stock-fund-query/scripts')
from fund_realtime import get_fund_realtime

# 读取持仓信息
holdings_adv = [
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

holdings_stab = [
    {"code": "001831", "name": "长城收益宝货币A", "amount": 114.37, "hold_profit": 14.37},
]

def process_funds(funds):
    results = []
    total_amount = 0.0
    total_today_profit = 0.0
    total_hold_profit = 0.0
    for f in funds:
        if f["amount"] == 0:
            continue
        data = get_fund_realtime(f["code"])
        if data:
            change_pct = data["estimate_change"]
            today_profit = f["amount"] * (change_pct / 100)
            results.append({
                **f,
                "change_pct": change_pct,
                "today_profit": today_profit
            })
            total_amount += f["amount"]
            total_today_profit += today_profit
            total_hold_profit += f["hold_profit"]
    return results, total_amount, total_today_profit, total_hold_profit

adv_results, adv_total_amount, adv_total_today, adv_total_hold = process_funds(holdings_adv)
stab_results, stab_total_amount, stab_total_today, stab_total_hold = process_funds(holdings_stab)

total_all_amount = adv_total_amount + stab_total_amount
total_all_today = adv_total_today + stab_total_today
total_all_hold = adv_total_hold + stab_total_hold

# Generate report
date = "2026-04-02"
time = "14:45"

report = f"📊 每日基金预估盈亏报告 ({date} {time})\n\n"

report += "## 进阶类\n"
report += "| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |\n"
report += "|---------|---------:|----------:|-----------:|-------:|\n"
for r in adv_results:
    emoji = "🔴" if r["change_pct"] < 0 else "🟢" if r["change_pct"] > 0 else "⚪"
    pct_emoji = f"{emoji} {r['change_pct']:+.2f}%"
    report += f"| {r['name']} | {r['amount']:,.2f} | {pct_emoji} | {r['today_profit']:+.2f} | {r['hold_profit']:+.2f} |\n"

report += f"\n**进阶类合计**: 持仓 {adv_total_amount:,.2f}  | 今日预估 {adv_total_today:+.2f}  | 累计持有 {adv_total_hold:+.2f}\n\n"

report += "## 稳健类\n"
if stab_results:
    report += "| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |\n"
    report += "|---------|---------:|----------:|-----------:|-------:|\n"
    for r in stab_results:
        if r["change_pct"] == 0:
            pct_emoji = "⚪ 0.00%"
        else:
            emoji = "🔴" if r["change_pct"] < 0 else "🟢"
            pct_emoji = f"{emoji} {r['change_pct']:+.2f}%"
        report += f"| {r['name']} | {r['amount']:,.2f} | {pct_emoji} | {r['today_profit']:+.2f} | {r['hold_profit']:+.2f} |\n"
else:
    report += "无持仓\n"

report += f"\n**稳健类合计**: 持仓 {stab_total_amount:,.2f}  | 今日预估 {stab_total_today:+.2f}  | 累计持有 {stab_total_hold:+.2f}\n\n"

emoji_total = "🔴" if total_all_today < 0 else "🟢" if total_all_today > 0 else "⚪"
report += f"## 总计\n"
report += f"总持仓金额: **{total_all_amount:,.2f}**\n"
report += f"今日预估盈亏: **{emoji_total} {total_all_today:+.2f}\n"
report += f"累计持有收益: **{total_all_hold:+.2f}**\n"

print(report)

with open("/tmp/fund_daily_report.txt", "w", encoding="utf-8") as f:
    f.write(report)
