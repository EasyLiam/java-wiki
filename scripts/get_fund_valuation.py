import requests
import re
import json
import sys

def get_fund_real_time_valuation(fund_code):
    """
    从天天基金网获取基金实时估值和涨跌幅
    """
    url = f"http://fundgz.1234567.com.cn/js/{fund_code}.js"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100101 Firefox/22.0'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            print(f"请求失败 {fund_code}: 状态码 {response.status_code}")
            return None
            
        content = response.text
        pattern = r'^jsonpgz\((.*)\)'
        match = re.findall(pattern, content)
        
        if not match:
            print(f"无法解析数据 {fund_code}")
            return None
            
        data = json.loads(match[0])
        return {
            'fundcode': data.get('fundcode'),
            'name': data.get('name'),
            'jzrq': data.get('jzrq'),  # 净值日期
            'dwjz': float(data.get('dwjz', 0)),  # 单位净值
            'gsz': float(data.get('gsz', 0)),  # 估算净值
            'gszzl': float(data.get('gszzl', 0)),  # 估算涨跌幅
            'gztime': data.get('gztime')  # 估值时间
        }
    except Exception as e:
        print(f"获取基金 {fund_code} 数据出错: {e}")
        return None

def main():
    # 测试
    if len(sys.argv) > 1:
        fund_code = sys.argv[1]
        data = get_fund_real_time_valuation(fund_code)
        if data:
            print(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    main()
