#!/usr/bin/env python3
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, '/home/liam/.openclaw/workspace/skills/stock-fund-query/scripts')
from fund_realtime import get_fund_realtime

# 读取持仓数据
holdings = {
    "advance": [
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
    ],
    "stable": [
        {"code": "001831", "name": "长城收益宝货币A", "amount": 114.37, "hold_profit": 14.37},
    ]
}

def calculate_fund(fund):
    if fund["amount"] == 0:
        return {
            **fund,
            "change": 0.0,
            "today_profit": 0.0,
            "estimate_time": None
        }
    data = get_fund_realtime(fund["code"])
    if not data:
        return {
            **fund,
            "change": 0.0,
            "today_profit": 0.0,
            "estimate_time": None
        }
    change = data["estimate_change"]
    today_profit = fund["amount"] * (change / 100)
    return {
        **fund,
        "change": change,
        "today_profit": today_profit,
        "estimate_time": data["estimate_time"]
    }

def generate_report():
    from datetime import datetime
    today = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    advance_results = [calculate_fund(f) for f in holdings["advance"] if f["amount"] > 0]
    stable_results = [calculate_fund(f) for f in holdings["stable"]]
    
    # 过滤掉0持仓
    advance_empty = [f for f in holdings["advance"] if f["amount"] == 0]
    
    # 计算合计
    total_amount = sum(f["amount"] for f in advance_results) + sum(f["amount"] for f in stable_results)
    total_today_profit = sum(f["today_profit"] for f in advance_results) + sum(f["today_profit"] for f in stable_results)
    total_hold_profit = sum(f["hold_profit"] for f in advance_results) + sum(f["hold_profit"] for f in stable_results)
    
    advance_total_amount = sum(f["amount"] for f in advance_results)
    advance_total_today = sum(f["today_profit"] for f in advance_results)
    advance_total_hold = sum(f["hold_profit"] for f in advance_results)
    
    stable_total_amount = sum(f["amount"] for f in stable_results)
    stable_total_today = sum(f["today_profit"] for f in stable_results)
    stable_total_hold = sum(f["hold_profit"] for f in stable_results)
    
    # 生成报告
    report = f"📊 基金每日预估盈亏报告\n"
    report += f"📅 时间: {today}\n\n"
    
    report += f"🔹 进阶类持仓\n"
    report += f"{'基金名称':<20} {'持仓':>10} {'涨跌幅':>8} {'今日预估':>10} {'持有收益':>10}\n"
    report += "-" * 70 + "\n"
    for f in advance_results:
        emoji = "🟢" if f["change"] > 0 else "🔴" if f["change"] < 0 else "⚪"
        change_str = f"{f['change']:+.2f}%"
        today_str = f"{f['today_profit']:+.2f}"
        hold_str = f"{f['hold_profit']:+.2f}"
        name_short = f["name"][:18] if len(f["name"]) > 18 else f["name"]
        report += f"{emoji} {name_short:<18} {f['amount']:>10.2f} {change_str:>8} {today_str:>10} {hold_str:>10}\n"
    report += "-" * 70 + "\n"
    report += f"{'小计':<20} {advance_total_amount:>10.2f} {'':>8} {advance_total_today:>+10.2f} {advance_total_hold:>+10.2f}\n\n"
    
    report += f"🔸 稳健类持仓\n"
    if stable_results:
        report += f"{'基金名称':<20} {'持仓':>10} {'涨跌幅':>8} {'今日预估':>10} {'持有收益':>10}\n"
        report += "-" * 70 + "\n"
        for f in stable_results:
            emoji = "🟢" if f["change"] > 0 else "🔴" if f["change"] < 0 else "⚪"
            change_str = f"{f['change']:+.2f}%" if f["amount"] > 0 else "-"
            today_str = f"{f['today_profit']:+.2f}" if f["amount"] > 0 else "-"
            hold_str = f"{f['hold_profit']:+.2f}"
            name_short = f["name"][:18] if len(f["name"]) > 18 else f["name"]
            report += f"{emoji} {name_short:<18} {f['amount']:>10.2f} {change_str:>8} {today_str:>10} {hold_str:>10}\n"
        report += "-" * 70 + "\n"
        report += f"{'小计':<20} {stable_total_amount:>10.2f} {'':>8} {stable_total_today:>+10.2f} {stable_total_hold:>+10.2f}\n\n"
    
    report += f"📈 合计\n"
    report += f"总持仓金额: {total_amount:.2f}\n"
    report += f"今日预估盈亏: {total_today_profit:+.2f}\n"
    report += f"累计持有收益: {total_hold_profit:+.2f}\n\n"
    
    estimate_time = None
    for f in advance_results + stable_results:
        if f.get("estimate_time"):
            estimate_time = f["estimate_time"]
            break
    if estimate_time:
        report += f"数据源: 天天基金网实时估值 (更新至 {estimate_time})\n"
    else:
        report += f"数据源: 天天基金网实时估值\n"
    report += "注: 估值为收盘前预估，最终以收盘净值为准\n"
    
    return report

if __name__ == "__main__":
    report = generate_report()
    print(report)
