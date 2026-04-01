#!/usr/bin/env python3
import json
import sys
import argparse
import urllib.request
import urllib.parse

def get_stock_info(stock_code):
    if not stock_code:
        return {"error": "请提供股票代码"}
    stock_code = stock_code.zfill(6)
    if stock_code.startswith("6"):
        market = "sh"
    else:
        market = "sz"
    secid = f"{'0.' if market == 'sz' else '1.'}{stock_code}"
    url = f"https://push2.eastmoney.com/api/qt/stock/get?secid={secid}&fields=f43,f44,f45,f46,f47,f48,f50,f51,f52,f55,f57,f58,f60,f170,f171"
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": "https://quote.eastmoney.com/"
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
        if data and "data" in data and data["data"]:
            d = data["data"]
            return {
                "code": stock_code,
                "name": d.get("f58", ""),
                "price": d.get("f43", 0) / 100 if d.get("f43") else None,
                "change": d.get("f44", 0) / 100 if d.get("f44") else None,
                "change_percent": d.get("f45", 0) / 100 if d.get("f45") else None,
                "volume": d.get("f47", 0),
                "amount": d.get("f48", 0),
                "high": d.get("f46", 0) / 100 if d.get("f46") else None,
                "low": d.get("f51", 0) / 100 if d.get("f51") else None,
                "open": d.get("f50", 0) / 100 if d.get("f50") else None,
                "prev_close": d.get("f60", 0) / 100 if d.get("f60") else None,
            }
        return {"error": "未找到股票信息"}
    except Exception as e:
        return {"error": str(e)}

def main():
    parser = argparse.ArgumentParser(description="查询A股股票行情")
    parser.add_argument("--stock", "-s", help="股票代码，如 000001")
    args = parser.parse_args()
    result = get_stock_info(args.stock)
    print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
