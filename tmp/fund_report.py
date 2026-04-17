#!/usr/bin/env python3
import sys
import os
import json
import urllib.request
import re

def get_fund_realtime(fund_code):
    fund_code = fund_code.zfill(6)
    # 天天基金网实时估值接口
    url = f"http://fundgz.1234567.com.cn/js/{fund_code}.js"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "http://fund.eastmoney.com/"
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            js = resp.read().decode("utf-8")
            # 解析 json 数据: jsonpgz({...})
            match = re.search(r'jsonpgz\((.*)\);', js)
            if match:
                data = json.loads(match.group(1))
                return {
                    "code": data.get("fundcode"),
                    "name": data.get("name"),
                    "nav": data.get("dwjz"),  # 昨日净值
                    "nav_date": data.get("gztime").split()[0] if data.get("gztime") else None,
                    "estimate_nav": data.get("gsz"),  # 实时估值
                    "estimate_change": float(data.get("gszzl", 0)),  # 涨跌幅
                    "estimate_time": data.get("gztime")  # 估值时间
                }
    except Exception as e:
        print(f"Error {fund_code}: {e}")
    return None

# 读取用户持仓数据
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

def format_num(num):
    return f"{num:+.2f}" if num != 0 else "0.00"

def generate_report():
    report = []
    report.append("📊 每日基金预估盈亏报告")
    report.append(f"⏰ 估值时间: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M')} (Asia/Shanghai)")
    report.append("")
    
    total_amount = 0
    total_daily_profit = 0
    total_hold_profit = 0
    
    # 进阶类
    advance_daily = 0
    advance_amount = 0
    advance_hold = 0
    report.append("🔹 进阶类（偏股/混合/指数）")
    report.append("| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |")
    report.append("|---------|---------:|-----------:|-------------:|---------:|")
    
    for fund in holdings["advance"]:
        if fund["amount"] == 0:
            continue
            
        data = get_fund_realtime(fund["code"])
        if not data:
            print(f"Failed to get {fund['code']}")
            change = 0
            daily_profit = 0
        else:
            change = data["estimate_change"]
            daily_profit = fund["amount"] * change / 100
        
        advance_amount += fund["amount"]
        advance_daily += daily_profit
        advance_hold += fund["hold_profit"]
        
        emoji = "🔴" if change < 0 else "🟢" if change > 0 else "⚪"
        name = fund["name"].split(" ")[0]
        report.append(f"| {name} | {fund['amount']:.2f} | {emoji} {change:+.2f}% | {format_num(daily_profit)} | {format_num(fund['hold_profit'] + daily_profit)} |")
    
    report.append("")
    report.append(f"**进阶类合计**: 持仓 {advance_amount:.2f} | 今日收益 {format_num(advance_daily)} | 累计持有 {format_num(advance_hold + advance_daily)}")
    report.append("")
    
    # 稳健类
    stable_daily = 0
    stable_amount = 0
    stable_hold = 0
    report.append("🔸 稳健类（货币/债券）")
    report.append("| 基金名称 | 持仓金额 | 今日涨跌幅 | 今日预估收益 | 持有收益 |")
    report.append("|---------|---------:|-----------:|-------------:|---------:|")
    
    for fund in holdings["stable"]:
        data = get_fund_realtime(fund["code"])
        if not data:
            change = 0
            daily_profit = 0
        else:
            change = data["estimate_change"]
            daily_profit = fund["amount"] * change / 100
        
        stable_amount += fund["amount"]
        stable_daily += daily_profit
        stable_hold += fund["hold_profit"]
        
        emoji = "🔴" if change < 0 else "🟢" if change > 0 else "⚪"
        name = fund["name"].split(" ")[0]
        report.append(f"| {name} | {fund['amount']:.2f} | {emoji} {change:+.2f}% | {format_num(daily_profit)} | {format_num(fund['hold_profit'] + daily_profit)} |")
    
    report.append("")
    report.append(f"**稳健类合计**: 持仓 {stable_amount:.2f} | 今日收益 {format_num(stable_daily)} | 累计持有 {format_num(stable_hold + stable_daily)}")
    report.append("")
    
    # 总计
    total_amount = advance_amount + stable_amount
    total_daily_profit = advance_daily + stable_daily
    total_hold_profit = advance_hold + stable_hold + total_daily_profit
    
    report.append("📈 总计")
    report.append(f"- 总持仓金额: {total_amount:.2f}")
    report.append(f"- 今日预估盈亏: **{format_num(total_daily_profit)}**")
    report.append(f"- 累计持有收益: {format_num(total_hold_profit)}")
    
    emoji_total = "🔴 亏损" if total_daily_profit < 0 else "🟢 盈利" if total_daily_profit > 0 else "⚪ 持平"
    report.append(f"- 今日整体: {emoji_total}")
    
    return "\n".join(report)

if __name__ == "__main__":
    report = generate_report()
    print(report)
    
    # 保存到文件
    with open("/home/liam/.openclaw/workspace/tmp/daily_fund_report.txt", "w", encoding="utf-8") as f:
        f.write(report)
