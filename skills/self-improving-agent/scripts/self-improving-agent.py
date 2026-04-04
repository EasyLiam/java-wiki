#!/usr/bin/env python3
"""
Self-Improving + Proactive Agent
自我改进和主动代理技能
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

HISTORY_FILE = Path.home() / ".openclaw" / "self-improving-history.json"


def load_history():
    """加载历史记录"""
    if HISTORY_FILE.exists():
        with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {
        "interactions": [],
        "improvements": [],
        "suggestions": [],
        "learned_patterns": {}
    }


def save_history(history):
    """保存历史记录"""
    HISTORY_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)


def analyze_interaction(query, response, success=True):
    """分析交互并记录"""
    history = load_history()
    
    interaction = {
        "timestamp": datetime.now().isoformat(),
        "query": query,
        "response": response[:200] if response else "",
        "success": success,
        "patterns": extract_patterns(query)
    }
    
    history["interactions"].append(interaction)
    
    # 保留最近 100 条记录
    if len(history["interactions"]) > 100:
        history["interactions"] = history["interactions"][-100:]
    
    save_history(history)
    return interaction


def extract_patterns(text):
    """提取文本模式"""
    patterns = {
        "has_question": "?" in text,
        "has_command": any(word in text.lower() for word in ["帮我", "请", "创建", "删除", "修改"]),
        "topic": guess_topic(text)
    }
    return patterns


def guess_topic(text):
    """猜测主题"""
    text_lower = text.lower()
    topics = {
        "编程": ["代码", "编程", "python", "javascript", "函数", "脚本"],
        "文件": ["文件", "目录", "移动", "复制", "删除"],
        "搜索": ["搜索", "查找", "找到", "查询"],
        "任务": ["任务", "待办", "提醒", "计划"],
        "消息": ["消息", "发送", "邮件", "通知"],
        "文档": ["文档", "笔记", "记录", "编辑"]
    }
    
    for topic, keywords in topics.items():
        if any(keyword in text_lower for keyword in keywords):
            return topic
    return "其他"


def generate_improvement_suggestions():
    """生成改进建议"""
    history = load_history()
    suggestions = []
    
    # 分析最近的交互
    recent = history["interactions"][-10:] if history["interactions"] else []
    
    if recent:
        # 统计主题分布
        topic_counts = {}
        for interaction in recent:
            topic = interaction.get("patterns", {}).get("topic", "其他")
            topic_counts[topic] = topic_counts.get(topic, 0) + 1
        
        # 找出最常用的主题
        if topic_counts:
            top_topic = max(topic_counts.items(), key=lambda x: x[1])
            if top_topic[1] >= 3:
                suggestions.append(f"您最近经常处理 {top_topic[0]} 相关的任务，我可以帮您优化这类操作。")
        
        # 检查失败率
        failures = [i for i in recent if not i.get("success", True)]
        if len(failures) > 2:
            suggestions.append("最近有一些操作失败了，建议检查网络连接或权限设置。")
    
    # 添加主动建议
    proactive_suggestions = [
        "💡 建议：定期清理临时文件可以提高系统性能。",
        "💡 建议：使用快捷键可以更快地完成任务。",
        "💡 建议：设置自动化任务可以节省时间。",
        "💡 建议：定期备份重要数据。",
        "💡 建议：整理文件结构可以提高工作效率。"
    ]
    
    if not suggestions:
        import random
        suggestions.append(random.choice(proactive_suggestions))
    
    return suggestions


def proactive_check():
    """主动检查和建议"""
    suggestions = []
    
    # 检查时间
    hour = datetime.now().hour
    if 9 <= hour < 12:
        suggestions.append("🌅 早上好！今天有什么计划吗？")
    elif 12 <= hour < 14:
        suggestions.append("☀️ 中午了，记得休息一下！")
    elif 18 <= hour < 21:
        suggestions.append("🌆 下班时间到了，今天的工作完成了吗？")
    
    # 检查历史记录
    history = load_history()
    if len(history["interactions"]) > 50:
        suggestions.append("📊 您已经使用了 50+ 次交互，我可以根据您的习惯提供更好的服务。")
    
    return suggestions


def learn_pattern(pattern_name, pattern_data):
    """学习新模式"""
    history = load_history()
    history["learned_patterns"][pattern_name] = {
        "data": pattern_data,
        "learned_at": datetime.now().isoformat(),
        "use_count": 0
    }
    save_history(history)
    return f"✅ 已学习模式：{pattern_name}"


def apply_learned_pattern(pattern_name):
    """应用已学习的模式"""
    history = load_history()
    if pattern_name in history["learned_patterns"]:
        pattern = history["learned_patterns"][pattern_name]
        pattern["use_count"] += 1
        save_history(history)
        return pattern["data"]
    return None


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Self-Improving + Proactive Agent')
    parser.add_argument('command', choices=['analyze', 'suggest', 'proactive', 'learn', 'apply', 'stats'],
                       help='命令类型')
    parser.add_argument('--query', '-q', help='用户查询')
    parser.add_argument('--response', '-r', help='代理响应')
    parser.add_argument('--pattern-name', '-p', help='模式名称')
    parser.add_argument('--pattern-data', '-d', help='模式数据')
    
    args = parser.parse_args()
    
    if args.command == 'analyze':
        if args.query:
            result = analyze_interaction(args.query, args.response or "")
            print(json.dumps(result, indent=2, ensure_ascii=False))
        else:
            print("错误：需要提供 --query 参数")
    
    elif args.command == 'suggest':
        suggestions = generate_improvement_suggestions()
        print("改进建议：")
        for i, suggestion in enumerate(suggestions, 1):
            print(f"{i}. {suggestion}")
    
    elif args.command == 'proactive':
        suggestions = proactive_check()
        if suggestions:
            print("主动建议：")
            for suggestion in suggestions:
                print(suggestion)
        else:
            print("暂无主动建议")
    
    elif args.command == 'learn':
        if args.pattern_name and args.pattern_data:
            result = learn_pattern(args.pattern_name, args.pattern_data)
            print(result)
        else:
            print("错误：需要提供 --pattern-name 和 --pattern-data 参数")
    
    elif args.command == 'apply':
        if args.pattern_name:
            result = apply_learned_pattern(args.pattern_name)
            if result:
                print(f"应用模式：{args.pattern_name}")
                print(json.dumps(result, indent=2, ensure_ascii=False))
            else:
                print(f"未找到模式：{args.pattern_name}")
        else:
            print("错误：需要提供 --pattern-name 参数")
    
    elif args.command == 'stats':
        history = load_history()
        stats = {
            "总交互数": len(history["interactions"]),
            "改进记录数": len(history["improvements"]),
            "建议记录数": len(history["suggestions"]),
            "已学习模式数": len(history["learned_patterns"])
        }
        print("统计信息：")
        for key, value in stats.items():
            print(f"  {key}: {value}")


if __name__ == '__main__':
    main()
