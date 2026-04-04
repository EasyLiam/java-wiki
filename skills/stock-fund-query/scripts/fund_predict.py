#!/usr/bin/env python3
import urllib.request
import re
import json

def get_fund_realtime_estimate(fund_code):
    fund_code = fund_code.zfill(6)
    url = f"https://fundgz.1234567.com.cn/js/{fund_code}.js"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            text = resp.read().decode("utf-8")
            match = re.search(r'jsonpgz\((\{.*?\})\)', text)
            if match:
                data = json.loads(match.group(1))
                return {
                    "fundcode": data.get("fundcode", ""),
                    "name": data.get("name", ""),
                    "dwjz": float(data.get("dwjz", 0)),
                    "gsz": float(data.get("gsz", 0)),
                    "gszzl": float(data.get("gszzl", 0)),
                    "gztime": data.get("gztime", "")
                }
    except Exception as e:
        return {"error": str(e)}
    return {"error": "无法获取数据"}

if __name__ == "__main__":
    import sys
    fund_code = sys.argv[1] if len(sys.argv) > 1 else "011399"
    
    result = get_fund_realtime_estimate(fund_code)
    
    if "error" in result:
        print(f"错误: {result['error']}")
        sys.exit(1)
    
    print(f"\n{'='*50}")
    print(f"基金 {result['fundcode']} {result['name']}")
    print(f"{'='*50}")
    print(f"昨日净值: {result['dwjz']:.4f}")
    print(f"实时估值: {result['gsz']:.4f}")
    print(f"预测涨跌: {result['gszzl']:+.2f}%")
    print(f"更新时间: {result['gztime']}")
    print(f"{'='*50}")
