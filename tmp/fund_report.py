#!/usr/bin/env python3
import sys
sys.path.insert(0, '/home/liam/.openclaw/workspace/skills/stock-fund-query/scripts')
from fund_realtime import get_fund_realtime

# 读取持仓数据
holdings = {
    "advanced": [
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

# 获取实时数据并计算
results = {
    "advanced": [],
    "stable": [],
}

total_amount = 0
total_today_profit = 0
total_hold_profit = 0

# 处理进阶类
for fund in holdings["advanced"]:
    if fund["amount"] == 0:
        results["advanced"].append({
            **fund,
            "change": 0,
            "today_profit": 0,
        })
        continue
    data = get_fund_realtime(fund["code"])
    if data:
        change = data["estimate_change"]
        today_profit = fund["amount"] * (change / 100)
        results["advanced"].append({
            **fund,
            "change": change,
            "today_profit": today_profit,
        })
        total_amount += fund["amount"]
        total_today_profit += today_profit
        total_hold_profit += fund["hold_profit"]
    else:
        print(f"Failed to get {fund['code']} {fund['name']}")

# 处理稳健类
for fund in holdings["stable"]:
    # 货币基金每天收益固定约万分之一，不实时获取
    results["stable"].append({
        **fund,
        "change": 0,
        "today_profit": 0.01,  # 忽略不计
    })
    total_amount += fund["amount"]
    total_today_profit += 0.01
    total_hold_profit += fund["hold_profit"]

# 生成报告
print("📊 每日基金预估盈亏报告\n")
print(f"📅 日期: 2026-04-10\n")

print("🔹 进阶类（偏股/混合/指数）\n")
print(f"{'基金名称':<24} {'持仓金额':>10} {'今日涨跌幅':>10} {'今日预估收益':>12} {'持有收益':>10}")
print("-" * 76)
advanced_total_amount = 0
advanced_total_today = 0
advanced_total_hold = 0
for r in results["advanced"]:
    if r["amount"] == 0:
        continue
    emoji = "🟢" if r["change"] > 0 else "🔴" if r["change"] < 0 else "⚪"
    print(f"{emoji} {r['name']:<20} {r['amount']:>10.2f} {r['change']:>+9.2f}% {r['today_profit']:>+12.2f} {r['hold_profit']:>+10.2f}")
    advanced_total_amount += r["amount"]
    advanced_total_today += r["today_profit"]
    advanced_total_hold += r["hold_profit"]

print("-" * 76)
print(f"{'小计':<24} {advanced_total_amount:>10.2f} {'':>10} {advanced_total_today:>+12.2f} {advanced_total_hold:>+10.2f}\n")

print("🔸 稳健类（货币/债券）\n")
print(f"{'基金名称':<24} {'持仓金额':>10} {'今日涨跌幅':>10} {'今日预估收益':>12} {'持有收益':>10}")
print("-" * 76)
for r in results["stable"]:
    emoji = "🟢" if r["change"] > 0 else "🔴" if r["change"] < 0 else "⚪"
    print(f"{emoji} {r['name']:<20} {r['amount']:>10.2f} {r['change']:>+9.2f}% {r['today_profit']:>+12.2f} {r['hold_profit']:>+10.2f}")
print("-" * 76)
print(f"{'小计':<24} {114.37:>10.2f} {'':>10} {0.01:+12.2f} {14.37:+10.2f}\n")

print("📈 总计\n")
print(f"总持仓金额: {total_amount:.2f}")
print(f"今日预估总收益: {total_today_profit:+.2f}")
print(f"总持有收益: {total_hold_profit:+.2f}")

# 添加涨跌情绪总结
if total_today_profit > 0:
    print(f"\n🎉 今日预计盈利 {total_today_profit:.2f}")
elif total_today_profit < 0:
    print(f"\n📉 今日预计亏损 {abs(total_today_profit):.2f}")
else:
    print(f"\n➖ 今日预计盈亏持平")
