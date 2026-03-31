#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将更新后的题目数据同步到GitHub Pages网站的script.js
"""

import json
import os
import re

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(SKILL_DIR, 'data', 'questions.json')
WEBSITE_JS = '/home/liam/.openclaw/workspace/script.js'

def main():
    # 读取更新后的题目数据
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 读取现有script.js，找到questions对象开始位置
    with open(WEBSITE_JS, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 找到const questions = { 这一行开始
    lines = content.split('\n')
    new_lines = []
    questions_started = False
    questions_ended = False
    brace_count = 0
    
    for line in lines:
        if not questions_started and 'const questions =' in line:
            new_lines.append(line)
            questions_started = True
            brace_count = 1
            continue
        elif questions_started and brace_count == 0:
            questions_ended = True
        elif questions_started:
            # 统计大括号
            brace_count += line.count('{') - line.count('}')
            continue
        
        if not questions_started:
            new_lines.append(line)
        else:
            new_lines.append(line)
    
    # 在 questions_started 位置插入我们的新数据
    # 找到插入位置（在const questions = 之后）
    insert_idx = None
    for i, line in enumerate(new_lines):
        if 'const questions =' in line:
            insert_idx = i + 1
            break
    
    if insert_idx is None:
        print("❌ 找不到 questions 对象定义")
        return
    
    # 插入新数据
    new_lines.insert(insert_idx, '')
    new_lines.insert(insert_idx + 1, json.dumps(data['questions'], ensure_ascii=False, indent=4) + ';')
    new_lines.insert(insert_idx + 2, '')
    
    new_content = '\n'.join(new_lines)
    
    # 重新计算每个topic的题目数量
    topic_counts = {}
    for topic, levels in data['questions'].items():
        topic_counts[topic] = sum(len(q_list) for q_list in levels.values())
    
    # 更新topics数组中的count
    def replace_count(match):
        topic_id = match.group(1)
        cnt = topic_counts.get(topic_id, 21)
        return f'id: \'{topic_id}\',\n        name: \w+,\n        icon: \w+,\n        description: [^,]+,\n        count: {cnt},'
    
    # 使用更保守的替换方式，逐行替换
    lines = new_content.split('\n')
    processed_lines = []
    current_id = None
    for line in lines:
        if "id: '" in line:
            # 提取id
            import re
            m = re.search(r"id: '(\w+)'", line)
            if m:
                current_id = m.group(1)
        if "count: " in line and current_id:
            # 替换这一行的count
            cnt = topic_counts.get(current_id, 21)
            line = re.sub(r'count: \d+', f'count: {cnt}', line)
            current_id = None
        processed_lines.append(line)
    
    new_content = '\n'.join(processed_lines)
    
    with open(WEBSITE_JS, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ 数据同步完成！")
    for topic, cnt in sorted(topic_counts.items()):
        print(f'   {topic:12} {cnt} 题')
    
    total = sum(topic_counts.values())
    print(f'\n📊 总计: {total} 道题')

if __name__ == '__main__':
    main()
