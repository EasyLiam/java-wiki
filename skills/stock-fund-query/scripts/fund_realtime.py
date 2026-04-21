#!/usr/bin/env python33
import json
import urllib.request
import re
import sys

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

if __name__ == "__main__":
    fund_code = sys.argv[1] if len(sys.argv) > 1 else "011399"
    data = get_fund_realtime(fund_code)
    if data:
        print(f"\n{data['name']} ({data['code']})")
        print(f"昨日净值: {data['nav']} ({data['nav_date']})")
        print(f"实时估值: {data['estimate_nav']}")
        emoji = "🔴" if data["estimate_change"] < 0 else "🟢" if data["estimate_change"] > 0 else "⚪"
        print(f"实时涨跌幅: {emoji} {data['estimate_change']:+.2f}%")
        print(f"估值时间: {data['estimate_time']}")
