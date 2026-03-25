#!/usr/bin/env python3
import requests
import re
import json
import sys

def get_fund_realtime(fund_code):
    """
    从天天基金网获取基金实时估值数据
    接口：http://fundgz.1234567.com.cn/js/{fund_code}.js
    返回：基金名称、今日估值、涨跌幅(gszzl)、估值时间
    """
    url = f"http://fundgz.1234567.com.cn/js/{fund_code}.js"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100101 Firefox/22.0',
        'Referer': 'http://fund.eastmoney.com/'
    }
    
    try:
        r = requests.get(url, headers=headers, timeout=10)
        content = r.text
        
        # 正则匹配 jsonpgz({...}) 中的JSON
        pattern = r'^jsonpgz\((.*)\)'
        match = re.findall(pattern, content)
        if not match:
            return None
            
        data = json.loads(match[0])
        return {
            'fundcode': data.get('fundcode'),
            'name': data.get('name'),
            'jzrq': data.get('jzrq'),  # 净值日期
            'dwjz': float(data.get('dwjz')),  # 单位净值
            'gsz': float(data.get('gsz')) if data.get('gsz') else None,  # 估算净值
            'gszzl': float(data.get('gszzl')) if data.get('gszzl') else None,  # 估算涨跌幅%
            'gztime': data.get('gztime')  # 估值时间
        }
    except Exception as e:
        print(f"获取基金 {fund_code} 数据失败: {e}", file=sys.stderr)
        return None

def main():
    # 用户持仓数据（从之前的报告中提取）
    holdings = [
        {
            'name': '中欧医疗健康混合 C',
            'code': '003096',
            'hold_amount': 2067.38,
            'hold_profit': -932.62
        },
        {
            'name': '创金合信中证 500 指数增强 A',
            'code': '002311',  # 实际代码确认
            'hold_amount': 209.48,
            'hold_profit': 49.48
        },
        {
            'name': '天弘弘择短债债券 C',
            'code': '006798',  # 实际代码确认
            'hold_amount': 108.20,
            'hold_profit': 8.20
        }
    ]
    
    print(f"{'='*60}")
    print(f"基金今日预估盈亏报告 - {sys.argv[1] if len(sys.argv) > 1 else '2026-03-24'}")
    print(f"{'='*60}")
    print()
    
    total_hold = 0
    total_today_profit = 0
    total_hold_profit = 0
    
    results = []
    for holding in holdings:
        data = get_fund_realtime(holding['code'])
        if not data:
            print(f"❌ {holding['name']} ({holding['code']}) - 获取数据失败")
            continue
            
        gszzl = data['gszzl']
        if gszzl is None:
            print(f"⚠️ {holding['name']} ({holding['code']}) - 无实时估值数据")
            continue
            
        today_profit = holding['hold_amount'] * gszzl / 100
        
        print(f"📊 {holding['name']}")
        print(f"   代码: {holding['code']}")
        print(f"   持有金额: ¥{holding['hold_amount']:.2f}")
        print(f"   今日涨跌幅: {gszzl:+.2f}% {'🔴' if gszzl < 0 else '🟢'}")
        print(f"   今日预估收益: {today_profit:+.2f} {'🔴' if today_profit < 0 else '🟢'}")
        print(f"   累计持有收益: {holding['hold_profit']:+.2f} {'🔴' if holding['hold_profit'] < 0 else '🟢'}")
        print(f"   估值时间: {data.get('gztime', 'N/A')}")
        print()
        
        total_hold += holding['hold_amount']
        total_today_profit += today_profit
        total_hold_profit += holding['hold_profit']
        results.append({
            **holding,
            'gszzl': gszzl,
            'today_profit': today_profit
        })
    
    print(f"{'='*60}")
    print(f"📈 合计")
    print(f"   总持仓金额: ¥{total_hold:.2f}")
    print(f"   今日预估总收益: {total_today_profit:+.2f} {'🔴' if total_today_profit < 0 else '🟢'}")
    print(f"   累计持有总收益: {total_hold_profit:+.2f} {'🔴' if total_hold_profit < 0 else '🟢'}")
    if total_hold > 0:
        total_return = total_hold_profit / (total_hold - total_hold_profit) * 100 if (total_hold - total_hold_profit) > 0 else 0
        print(f"   累计收益率: {total_return:.2f}%")
    print(f"{'='*60}")
    print()
    print("数据来源: 天天基金网实时估值")
    print("提示: 估值仅供参考，实际盈亏以基金公司晚间公布的净值为准")

if __name__ == '__main__':
    main()
