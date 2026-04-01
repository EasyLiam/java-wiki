#!/usr/bin/env python3
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

sys.path.insert(0, '/root/.openclaw/skills/stock-fund-query/scripts')
from fund_realtime import get_fund_realtime

# 持仓数据从文件读取
holdings = {
    "进阶类": [
        {"code": "011399", "name": "汇添富数字未来混合A", "amount": 3458.23, "holding_profit": 621.21},
        {"code": "004070", "name": "南方中证全指证券公司ETF联接C", "amount": 644.89, "holding_profit": 147.98},
        {"code": "501203", "name": "易方达创新未来混合(LOF)", "amount": 245.57, "holding_profit": 54.76},
        {"code": "110013", "name": "易方达科翔混合", "amount": 53.86, "holding_profit": 12.82},
        {"code": "161024", "name": "富国中证军工指数(LOF)A", "amount": 109.48, "holding_profit": 9.49},
        {"code": "519116", "name": "浦银安盛沪深300指数增强A", "amount": 6.26, "holding_profit": -1.70},
        {"code": "000309", "name": "汇添富价值精选混合A", "amount": 41.76, "holding_profit": -8.24},
        {"code": "001595", "name": "天弘中证银行ETF联接C", "amount": 1403.66, "holding_profit": -50.40},
        {"code": "003096", "name": "中欧医疗健康混合C", "amount": 5372.65, "holding_profit": -534.16},
        {"code": "005827", "name": "易方达蓝筹精选混合", "amount": 11491.36, "holding_profit": -946.33},
        {"code": "000248", "name": "汇添富中证主要消费ETF联接", "amount": 0.00, "holding_profit": 0.00},
        {"code": "006249", "name": "南方城乡生活消费混合", "amount": 0.00, "holding_profit": 0.00},
    ],
    "稳健类": [
        {"code": "001831", "name": "长城收益宝货币A", "amount": 114.37, "holding_profit": 14.37},
    ]
}

def format_row(name, amount, change_pct, daily_profit, holding_profit):
    emoji = "🔴" if daily_profit < 0 else "🟢" if daily_profit > 0 else "⚪"
    change_emoji = "🔴" if change_pct < 0 else "🟢" if change_pct > 0 else "⚪"
    return f"{emoji} {name:<20} | {amount:>10.2f} | {change_emoji} {change_pct:>+6.2f}% | {daily_profit:>+8.2f} | {holding_profit:>+8.2f}"

def main():
    print("📊 每日基金持仓预估盈亏报告")
    print(f"📅 日期: 2026-03-27")
    print()
    
    total_amount = 0
    total_daily_profit = 0
    total_holding_profit = 0
    
    for category, funds in holdings.items():
        print(f"=== {category} ===")
        print(f"{'':<2} {'基金名称':<20} | {'持仓金额':>10} | {'涨跌幅':>8} | {'今日预估':>8} | {'持有收益':>8}")
        print("-" * 70)
        
        cat_amount = 0
        cat_daily = 0
        cat_holding = 0
        
        for fund in funds:
            # 跳过空持仓
            if fund['amount'] == 0:
                continue
                
            data = get_fund_realtime(fund['code'])
            if not data:
                print(f"⚠️  获取 {fund['name']} ({fund['code']}) 数据失败")
                continue
                
            change_pct = data['estimate_change']
            daily_profit = fund['amount'] * (change_pct / 100)
            
            print(format_row(
                fund['name'][:20],
                fund['amount'],
                change_pct,
                daily_profit,
                fund['holding_profit']
            ))
            
            cat_amount += fund['amount']
            cat_daily += daily_profit
            cat_holding += fund['holding_profit']
        
        print("-" * 70)
        print(f"📈 {category} 小计: 持仓金额 {cat_amount:>10.2f} | 今日预估 {cat_daily:>+8.2f} | 持有收益 {cat_holding:>+8.2f}")
        print()
        
        total_amount += cat_amount
        total_daily_profit += cat_daily
        total_holding_profit += cat_holding
    
    print("=== 总计 ===")
    print(f"总持仓金额: {total_amount:.2f}")
    print(f"今日预估盈亏: {total_daily_profit:+.2f}")
    print(f"总持有收益: {total_holding_profit:+.2f}")
    
    daily_emoji = "🔴" if total_daily_profit < 0 else "🟢" if total_daily_profit > 0 else "⚪"
    print(f"\n{daily_emoji} 今日整体: {total_daily_profit:+.2f}")

if __name__ == "__main__":
    main()
