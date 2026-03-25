#!/usr/bin/env python3
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from get_fund_valuation import get_fund_real_time_valuation

# 用户持仓数据
holdings = [
    {
        "name": "汇添富数字未来混合A",
        "code": "011399",
        "hold_amount": 2557.50,
        "hold_profit": 720.48
    },
    {
        "name": "南方中证全指证券公司ETF联接C",
        "code": "",
        "hold_amount": 690.52,
        "hold_profit": 193.61
    },
    {
        "name": "易方达创新未来混合(LOF)",
        "code": "501208",
        "hold_amount": 263.17,
        "hold_profit": 72.36
    },
    {
        "name": "富国中证军工指数(LOF)A",
        "code": "161026",
        "hold_amount": 121.09,
        "hold_profit": 21.10
    },
    {
        "name": "易方达科翔混合",
        "code": "110013",
        "hold_amount": 57.33,
        "hold_profit": 16.29
    },
    {
        "name": "天弘中证银行ETF联接C",
        "code": "001595",
        "hold_amount": 1455.61,
        "hold_profit": 1.54
    },
    {
        "name": "浦银安盛沪深300指数增强A",
        "code": "519100",
        "hold_amount": 6.61,
        "hold_profit": -1.35
    },
    {
        "name": "汇添富价值精选混合A",
        "code": "519011",
        "hold_amount": 43.88,
        "hold_profit": -6.12
    },
    {
        "name": "中欧医疗健康混合C",
        "code": "003096",
        "hold_amount": 3609.22,
        "hold_profit": -297.59
    },
    {
        "name": "易方达蓝筹精选混合",
        "code": "005827",
        "hold_amount": 9954.39,
        "hold_profit": -483.30
    },
    {
        "name": "长城收益宝货币A",
        "code": "000136",
        "hold_amount": 114.37,
        "hold_profit": 14.37
    }
]

def main():
    print("🚀 开始获取基金实时估值数据...\n")
    
    results = []
    total_hold_amount = 0
    total_today_profit = 0
    total_hold_profit = 0
    
    for fund in holdings:
        code = fund["code"]
        if not code:
            # 南方中证全指证券公司ETF联接C 没有代码，跳过？实际应该有，用户写的是"-"，这里手工处理
            code = "004069"  # 南方中证全指证券公司ETF联接C 确实是004069
        print(f"正在获取 {fund['name']} ({code}) ...")
        
        data = get_fund_real_time_valuation(code)
        if data:
            today_change_pct = data['gszzl']
            today_profit = fund["hold_amount"] * (today_change_pct / 100)
            
            result = {
                **fund,
                "today_change_pct": today_change_pct,
                "today_profit": today_profit,
                "update_time": data['gztime']
            }
            
            results.append(result)
            total_hold_amount += fund["hold_amount"]
            total_today_profit += today_profit
            total_hold_profit += fund["hold_profit"]
            
            print(f"  ✓ 涨跌幅: {today_change_pct:+.2f}% 预估收益: {today_profit:+.2f}")
        else:
            # 获取失败，保留原数据
            result = {
                **fund,
                "today_change_pct": None,
                "today_profit": None,
                "update_time": None
            }
            results.append(result)
            total_hold_amount += fund["hold_amount"]
            total_hold_profit += fund["hold_profit"]
            print(f"  ✗ 获取失败")
    
    # 货币基金收益每日0
    for r in results:
        if r["name"] == "长城收益宝货币A":
            r["today_change_pct"] = 0.00
            r["today_profit"] = 0.00
    
    # 重新计算总计（加上货币基金）
    total_today_profit = sum(r["today_profit"] for r in results if r["today_profit"] is not None)
    
    # 生成报告
    print("\n" + "="*70)
    print(f"📊 基金每日预估盈亏报告 - {results[0]['update_time'] if results[0]['update_time'] else '2026-03-23'}")
    print("="*70)
    
    print(f"\n📋 进阶类持仓:\n")
    print(f"| {'基金名称':<20} | {'持仓金额':>10} | {'今日涨跌幅':>10} | {'今日预估收益':>12} | {'持有收益':>10} |")
    print(f"|{'-'*22}|{'-'*12}|{'-'*12}|{'-'*14}|{'-'*12}|")
    
    for r in results[:-1]:  # 最后一个是货币，稳健类
        name = r["name"][:20]
        hold_amount = f"{r['hold_amount']:.2f}"
        if r["today_change_pct"] is not None:
            change = f"{r['today_change_pct']:+.2f}%"
            today_profit = f"{r['today_profit']:+.2f}"
        else:
            change = "N/A"
            today_profit = "N/A"
        hold_profit = f"{r['hold_profit']:+.2f}"
        print(f"| {name:<20} | {hold_amount:>10} | {change:>10} | {today_profit:>12} | {hold_profit:>10} |")
    
    print(f"\n💰 稳健类持仓:\n")
    r = results[-1]
    name = r["name"][:20]
    hold_amount = f"{r['hold_amount']:.2f}"
    change = f"{r['today_change_pct']:+.2f}%"
    today_profit = f"{r['today_profit']:+.2f}"
    hold_profit = f"{r['hold_profit']:+.2f}"
    print(f"| {'基金名称':<20} | {'持仓金额':>10} | {'今日涨跌幅':>10} | {'今日预估收益':>12} | {'持有收益':>10} |")
    print(f"|{'-'*22}|{'-'*12}|{'-'*12}|{'-'*14}|{'-'*12}|")
    print(f"| {name:<20} | {hold_amount:>10} | {change:>10} | {today_profit:>12} | {hold_profit:>10} |")
    
    print("\n" + "="*70)
    print(f"📈 总计:")
    print(f"  总持仓金额: {total_hold_amount:.2f} 元")
    print(f"  今日预估盈亏: {total_today_profit:+.2f} 元")
    print(f"  累计持有收益: {total_hold_profit:+.2f} 元")
    print("="*70)
    print("\n⚠️  说明：实时估值仅供参考，实际涨跌幅以收盘后净值为准。")
    
    # 保存报告到文件
    report_path = "/home/liam/.openclaw/workspace/memory/2026-03-23-fund-report.md"
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(f"# 基金每日预估盈亏报告\n\n")
        f.write(f"**日期:** {results[0]['update_time'] if results[0]['update_time'] else '2026-03-23'}\n\n")
        
        f.write("## 进阶类持仓\n\n")
        f.write("| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |\n")
        f.write("|----------|----------|------------|--------------|----------|\n")
        for r in results[:-1]:
            name = r["name"]
            hold_amount = f"{r['hold_amount']:.2f}"
            if r["today_change_pct"] is not None:
                change = f"{r['today_change_pct']:+.2f}%"
                today_profit = f"{r['today_profit']:+.2f}"
            else:
                change = "N/A"
                today_profit = "N/A"
            hold_profit = f"{r['hold_profit']:+.2f}"
            f.write(f"| {name} | {hold_amount} | {change} | {today_profit} | {hold_profit} |\n")
        
        f.write("\n## 稳健类持仓\n\n")
        r = results[-1]
        f.write("| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |\n")
        f.write("|----------|----------|------------|--------------|----------|\n")
        f.write(f"| {r['name']} | {r['hold_amount']:.2f} | {r['today_change_pct']:+.2f}% | {r['today_profit']:+.2f} | {r['hold_profit']:+.2f} |\n")
        
        f.write("\n## 总计\n\n")
        f.write(f"- **总持仓金额:** {total_hold_amount:.2f} 元\n")
        f.write(f"- **今日预估盈亏:** {total_today_profit:+.2f} 元\n")
        f.write(f"- **累计持有收益:** {total_hold_profit:+.2f} 元\n\n")
        f.write("⚠️ 说明：实时估值仅供参考，实际涨跌幅以收盘后净值为准。\n")
    
    print(f"\n✅ 报告已保存到: {report_path}")

if __name__ == '__main__':
    main()
