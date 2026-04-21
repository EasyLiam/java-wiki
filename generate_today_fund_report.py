#!/usr/bin/env python3
import sys
import datetime
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
    last_update = None
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
                "today_profit": today_profit,
                "estimate_time": data["estimate_time"]
            })
            total_amount += f["amount"]
            total_today_profit += today_profit
            total_hold_profit += f["hold_profit"]
            if data["estimate_time"]:
                last_update = data["estimate_time"]
    return results, total_amount, total_today_profit, total_hold_profit, last_update

adv_results, adv_total_amount, adv_total_today, adv_total_hold, last_update = process_funds(holdings_adv)
stab_results, stab_total_amount, stab_total_today, stab_total_hold, _ = process_funds(holdings_stab)

total_all_amount = adv_total_amount + stab_total_amount
total_all_today = adv_total_today + stab_total_today
total_all_hold = adv_total_hold + stab_total_hold

# Generate report
now = datetime.datetime.now()
date = now.strftime("%Y-%m-%d")
time = now.strftime("%H:%M")

# 纯文本格式（适配更多通道）
report_text = f"📊 基金每日预估盈亏报告\n"
report_text += f"📅 时间: {date} {time}\n\n"

report_text += "🔹 进阶类持仓\n"
report_text += f"{'基金名称':<30} {'持仓':>10} {'涨跌幅':>8} {'今日预估':>10} {'持有收益':>10}\n"
report_text += "-" * 70 + "\n"
for r in adv_results:
    emoji = "🟢" if r["change_pct"] > 0 else "🔴" if r["change_pct"] < 0 else "⚪"
    report_text += f"{emoji} {r['name']:<24} {r['amount']:>10.2f} {emoji} {r['change_pct']:>+6.2f}% {r['today_profit']:>+10.2f} {r['hold_profit']:>+10.2f}\n"

report_text += "-" * 70 + "\n"
report_text += f"{'小计':<30} {adv_total_amount:>10.2f} {'':>8} {adv_total_today:>+10.2f} {adv_total_hold:>+10.2f}\n\n"

report_text += "🔸 稳健类持仓\n"
report_text += f"{'基金名称':<30} {'持仓':>10} {'涨跌幅':>8} {'今日预估':>10} {'持有收益':>10}\n"
report_text += "-" * 70 + "\n"
for r in stab_results:
    if stab_results:
        report_text += f"⚪ {r['name']:<24} {r['amount']:>10.2f} {'-':>8} {'+0.00':>10} {r['hold_profit']:>+10.2f}\n"
report_text += "-" * 70 + "\n"
report_text += f"{'小计':<30} {stab_total_amount:>10.2f} {'':>8} {stab_total_today:>+10.2f} {stab_total_hold:>+10.2f}\n\n"

daily_emoji = "🟢" if total_all_today > 0 else "🔴" if total_all_today < 0 else "⚪"
report_text += "📈 合计\n"
report_text += f"总持仓金额: {total_all_amount:.2f}\n"
report_text += f"今日预估盈亏: {daily_emoji} {total_all_today:+.2f}\n"
report_text += f"累计持有收益: {total_all_hold:+.2f}\n\n"

if last_update:
    report_text += f"数据源: 天天基金网实时估值 (更新至 {last_update})\n"
else:
    report_text += f"数据源: 天天基金网实时估值\n"
report_text += "注: 估值为收盘前预估，最终以收盘净值为准\n"

print(report_text)

# 保存文件
output_file = f"fund_daily_report_{now.strftime('%Y%m%d')}.md"
with open(output_file, "w", encoding="utf-8") as f:
    f.write(report_text)
print(f"\n报告已保存到: {output_file}")