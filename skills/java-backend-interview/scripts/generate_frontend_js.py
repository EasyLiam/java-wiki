#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从questions.json生成前端script.js数据
自动更新GitHub Pages网站题目数据
"""

import json
import os

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(SKILL_DIR, 'data', 'questions.json')
OUTPUT_JS = '/home/liam/.openclaw/workspace/script.js'
TEMPLATE_JS = '/home/liam/.openclaw/workspace/java-interview-website/script.js'

def load_data():
    """加载题目数据"""
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def escape_js(text):
    """转义JavaScript字符串"""
    text = text.replace('\\', '\\\\')
    text = text.replace("'", "\\'")
    text = text.replace('"', '\\"')
    text = text.replace('\n', ' ')
    return text

def generate_js_data(data):
    """生成JavaScript数据定义"""
    # 主题配置
    topics_config = {
        'java': {
            'name': 'Java基础',
            'icon': 'fab fa-java',
            'description': 'Java语法基础、集合框架、IO、反射等核心基础知识',
            'color': '#007396'
        },
        'jvm': {
            'name': 'JVM原理',
            'icon': 'fas fa-microchip',
            'description': '内存模型、垃圾回收、类加载、性能调优',
            'color': '#F59E0B'
        },
        'concurrent': {
            'name': '并发编程',
            'icon': 'fas fa-tasks',
            'description': '多线程、锁机制、JUC并发包、原子类',
            'color': '#8B5CF6'
        },
        'spring': {
            'name': 'Spring全家桶',
            'icon': 'fas fa-leaf',
            'description': 'Spring IoC/AOP、Boot、Cloud、Security',
            'color': '#6DB33F'
        },
        'database': {
            'name': '数据库',
            'icon': 'fas fa-database',
            'description': 'MySQL索引、事务、优化、锁机制',
            'color': '#4479A1'
        },
        'cache': {
            'name': '缓存技术',
            'icon': 'fas fa-bolt',
            'description': 'Redis缓存架构、数据结构、缓存问题',
            'color': '#DC382D'
        },
        'distributed': {
            'name': '分布式系统',
            'icon': 'fas fa-network-wired',
            'description': '微服务、分布式事务、消息队列、一致性',
            'color': '#1E40AF'
        },
        'design': {
            'name': '系统设计',
            'icon': 'fas fa-sitemap',
            'description': '高并发、高可用、架构设计、面试题',
            'color': '#EC4899'
        }
    }
    
    # 读取原始模板
    with open(TEMPLATE_JS, 'r', encoding='utf-8') as f:
        template = f.read()
    
    # 找到questions定义的位置，从头开始生成新的questions数据
    output_lines = []
    
    # 读取模板并找到 // 题库数据 之后到 // 初始化页面 之前的内容
    in_questions = False
    questions_started = False
    
    for line in template.split('\n'):
        if '// 题库数据' in line:
            in_questions = True
            output_lines.append(line)
            output_lines.append('')
            # 输出topics数组
            output_lines.append('const topics = [')
            for topic_id, config in topics_config.items():
                total_questions = 0
                if topic_id in data and isinstance(data[topic_id], dict):
                    for level in data[topic_id]:
                        if isinstance(data[topic_id][level], list):
                            total_questions += len(data[topic_id][level])
                output_lines.append('    {')
                output_lines.append(f'        id: \'{topic_id}\',')
                output_lines.append(f'        name: \'{config["name"]}\',')
                output_lines.append(f'        icon: \'{config["icon"]}\',')
                output_lines.append(f'        description: \'{config["description"]}\',')
                output_lines.append(f'        count: {total_questions},')
                output_lines.append(f'        color: \'{config["color"]}\'')
                output_lines.append('    },')
            output_lines.append('];')
            output_lines.append('')
            output_lines.append('const questions = {')
            
            # 输出每个主题的题目
            for topic_id, topic_data in data.items():
                if topic_id not in topics_config:
                    continue
                output_lines.append(f'    {topic_id}: [')
                
                # 遍历所有难度
                for level, q_list in topic_data.items():
                    if not isinstance(q_list, list):
                        continue
                    for q in q_list:
                        question = escape_js(q['q'])
                        answer = escape_js(q['a'])
                        output_lines.append('        {')
                        output_lines.append(f'            question: \'{question}\',')
                        output_lines.append(f'            answer: \'{answer}\'')
                        output_lines.append('        },')
                
                output_lines.append('    ],')
            
            output_lines.append('};')
            output_lines.append('')
            questions_started = True
            continue
        
        if '// 初始化页面' in line and questions_started:
            in_questions = False
            output_lines.append('')
            output_lines.append(line)
            continue
        
        if not in_questions:
            output_lines.append(line)
    
    final_content = '\n'.join(output_lines)
    
    return final_content

def main():
    """主函数"""
    print("开始生成前端JavaScript数据...")
    data = load_data()
    
    # 提取questions部分，结构是: data['questions'] 里面按topic分组，topic里面按level分组
    questions_data = data.get('questions', data)
    
    js_content = generate_js_data(questions_data)
    
    # 写入输出
    with open(OUTPUT_JS, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # 统计题目数量
    total = 0
    for topic_id, topic_data in questions_data.items():
        for level, q_list in topic_data.items():
            if isinstance(q_list, list):
                total += len(q_list)
    
    print(f"✓ 生成完成！总共 {total} 道题目")
    print(f"✓ 输出文件: {OUTPUT_JS}")

if __name__ == '__main__':
    main()
