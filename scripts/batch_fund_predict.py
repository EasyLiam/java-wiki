#!/usr/bin/env python3
"""
基金涨跌批量预测脚本
读取用户持仓文件，对每只基金进行涨跌预测
输入文件: /home/liam/.openclaw/workspace/memory/2026-03-19-fund-holdings.md
输出: 生成预测报告
"""

import re
import sys
import subprocess
import os

# 基金持仓文件路径
HOLDINGS_FILE = "/home/liam/.openclaw/workspace/memory/2026-03-19-fund-holdings.md"
FUND_PREDICT_SCRIPT = "/root/.openclaw/skills/stock-fund-query/scripts/fund_predict.py"

def extract_fund_codes(file_path):
    """从持仓文件中提取基金代码和名称"""
    funds = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 匹配表格中的基金代码行
    # 格式: | 基金名称 | 代码 | ...
    pattern = r'\|\s+([^|]+)\s+\|\s+([^\s-][^\s|]*)\s+\|'
    matches = re.findall(pattern, content)
    
    for name, code in matches:
        name = name.strip()
        code = code.strip()
        if code != '-' and code:
            funds.append((name, code))
    
    return funds

def predict_fund(code):
    """调用预测脚本预测单只基金涨跌"""
    try:
        result = subprocess.run(
            [sys.executable, FUND_PREDICT_SCRIPT, code],
            capture_output=True,
            text=True,
            timeout=30
        )
        return result.stdout
    except Exception as e:
        return f"预测失败: {str(e)}"

def main():
    if not os.path.exists(HOLDINGS_FILE):
        print(f"错误: 持仓文件不存在 {HOLDINGS_FILE}")
        return 1
    
    if not os.path.exists(FUND_PREDICT_SCRIPT):
        print(f"错误: 预测脚本不存在 {FUND_PREDICT_SCRIPT}")
        return 1
    
    funds = extract_fund_codes(HOLDINGS_FILE)
    print(f"提取到 {len(funds)} 只基金:")
    for name, code in funds:
        print(f"  {name} ({code})")
    print()
    
    # 生成预测报告
    report = []
    report.append("# 2026年3月20日 基金涨跌预测报告")
    report.append(f"生成时间: {os.popen('date +"%Y-%m-%d %H:%M:%S"').read().strip()} (北京时间)")
    report.append("")
    report.append("> 预测仅供参考，不构成投资建议")
    report.append("")
    
    for name, code in funds:
        print(f"正在预测 {name} ({code})...")
        result = predict_fund(code)
        report.append(f"## {name} ({code})")
        report.append(result.strip())
        report.append("---")
        report.append("")
    
    # 保存报告
    output_file = "/home/liam/.openclaw/workspace/memory/2026-03-20-fund-prediction.md"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report))
    
    print(f"\n预测报告已保存到: {output_file}")
    return 0

if __name__ == "__main__":
    sys.exit(main())