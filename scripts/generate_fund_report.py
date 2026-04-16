#!/usr/bin/env python3
import sys
sys.path.append('/home/liam/.openclaw/workspace/skills/stock-fund-query/scripts')
from fund_realtime import get_fund_realtime

# 读取持仓数据
holdings = {
    "advanced": [
        {
            "code": "011399",
            "name": "汇添富数字未来混合A",
            "amount": 3458.23,
            "hold_profit": 621.21
        },
        {
            "code": "004070",
            "name": "南方中证全指证券公司ETF联接C",
            "amount": 644.89,
            "hold_profit": 147.98
        },
        {
            "code": "501203",
            "name": "易方达创新未来混合(LOF)",
            "amount": 245.57,
            "hold_profit": 54.76
        },
        {
            "code": "110013",
            "name": "易方达科翔混合",
            "amount": 53.86,
            "hold_profit": 12.82
        },
        {
            "code": "161024",
            "name": "富国中证军工指数(LOF)A",
            "amount": 109.48,
            "hold_profit": 9.49
        },
        {
            "code": "519116",
            "name": "浦银安盛沪深300指数增强A",
            "amount": 6.26,
            "hold_profit": -1.70
        },
        {
            "code": "000309",
            "name": "汇添富价值精选混合A",
            "amount": 41.76,
            "hold_profit": -8.24
        },
        {
            "code": "001595",
            "name": "天弘中证银行ETF联接C",
            "amount": 1403.66,
            "hold_profit": -50.40
        },
        {
            "code": "003096",
            "name": "中欧医疗健康混合C",
            "amount": 5372.65,
            "hold_profit": -534.16
        },
        {
            "code": "005827",
            "name": "易方达蓝筹精选混合",
            "amount": 11491.36,
            "hold_profit": -946.33
        },
        {
            "code": "000248",
            "name": "汇添富中证主要消费ETF联接",
            "amount": 0.00,
            "hold_profit": 0.00
        },
        {
            "code": "006249",
            "name": "南方城乡生活消费混合",
            "amount": 0.00,
            "hold_profit": 0.00
        }
    ],
    "stable": [
        {
            "code": "001831",
            "name": "长城收益宝货币A",
            "amount": 114.37,
            "hold_profit": 14.37
        }
    ]
}

def main():
    report = "📊 每日基金预估盈亏报告\n"
    report += f"📅 日期: 2026-04-15 14:45\n\n"
    
    total_amount = 0
    total_today_profit = 0
    total_hold_profit = 0
    
    # 处理进阶类
    report += "🔹 进阶类（偏股/混合/指数）\n\n"
    report += "| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |\n"
    report += "|---------|---------|-----------|-------------|---------|\n"
    
    for fund in holdings["advanced"]:
        if fund["amount"] == 0:
            continue
            
        data = get_fund_realtime(fund["code"])
        if data is None:
            change = 0
            today_profit = 0
        else:
            change = data["estimate_change"]
            today_profit = fund["amount"] * change / 100
        
        emoji = "🔴" if change < 0 else "🟢" if change > 0 else "⚪"
        report += f"| {fund['name']} | {fund['amount']:.2f} | {emoji} {change:+.2f}% | {today_profit:+.2f} | {fund['hold_profit']+today_profit:+.2f} |\n"
        
        total_amount += fund["amount"]
        total_today_profit += today_profit
        total_hold_profit += (fund['hold_profit'] + today_profit)
    
    # 处理稳健类
    report += "\n🔸 稳健类（货币/债券）\n\n"
    report += "| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |\n"
    report += "|---------|---------|-----------|-------------|---------|\n"
    
    for fund in holdings["stable"]:
        # 货币基金涨跌幅基本稳定
        change = 0.01
        today_profit = fund["amount"] * change / 100
        emoji = "🟢"
        
        report += f"| {fund['name']} | {fund['amount']:.2f} | {emoji} {change:+.2f}% | {today_profit:+.2f} | {fund['hold_profit']+today_profit:+.2f} |\n"
        
        total_amount += fund["amount"]
        total_today_profit += today_profit
        total_hold_profit += (fund['hold_profit'] + today_profit)
    
    # 汇总
    emoji_total = "🔴" if total_today_profit < 0 else "🟢" if total_today_profit > 0 else "⚪"
    report += f"\n📈 汇总\n\n"
    report += f"- 总持仓金额: {total_amount:.2f}\n"
    report += f"- 今日预估盈亏: {emoji_total} {total_today_profit:+.2f}\n"
    report += f"- 总持有收益: {total_hold_profit:+.2f}\n\n"
    report += "*数据来源: 天天基金网实时估值\n"
    report += "*估值为估算，最终以实际收盘净值为准\n"
    
    print(report)
    with open("/home/liam/.openclaw/workspace/fund_daily_report_20260415.md", "w", encoding="utf-8") as f:
        f.write(report)

if __name__ == "__main__":
    main()
