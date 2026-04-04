#!/usr/bin/env python3
"""
Find Skills - 搜索和管理 OpenClaw 技能
用于快速查找、列出和管理已安装的技能
"""

import json
import os
import sys
from pathlib import Path

SKILLS_DIR = Path.home() / ".openclaw" / "skills"


def load_skill_info(skill_path: Path) -> dict:
    """加载单个技能的信息"""
    skill_md = skill_path / "SKILL.md"
    plugin_json = skill_path / f"{skill_path.name.replace('-', '_')}.plugin.json"
    
    info = {
        "name": skill_path.name,
        "path": str(skill_path),
        "description": "",
        "status": "unknown"
    }
    
    # 读取 SKILL.md 获取描述
    if skill_md.exists():
        try:
            with open(skill_md, 'r', encoding='utf-8') as f:
                content = f.read()
                # 提取描述
                if 'description:' in content:
                    desc_line = [line for line in content.split('\n') if 'description:' in line]
                    if desc_line:
                        info["description"] = desc_line[0].split('description:')[1].strip().strip('"\'')
                else:
                    # 尝试从标题提取
                    title_lines = [line for line in content.split('\n') if line.startswith('# ')]
                    if title_lines:
                        info["description"] = title_lines[0].replace('# ', '').strip()
        except Exception:
            pass
    
    # 检查技能是否可用
    scripts_dir = skill_path / "scripts"
    if scripts_dir.exists() and any(scripts_dir.iterdir()):
        info["status"] = "ready"
    elif (skill_path / "SKILL.md").exists():
        info["status"] = "ready"
    else:
        info["status"] = "unknown"
    
    return info


def find_skills(search_term: str = "", status_filter: str = "") -> list:
    """查找技能"""
    skills = []
    
    if not SKILLS_DIR.exists():
        print(f"错误：技能目录不存在：{SKILLS_DIR}", file=sys.stderr)
        return skills
    
    for item in SKILLS_DIR.iterdir():
        if item.is_dir() and not item.name.startswith('.'):
            skill_info = load_skill_info(item)
            
            # 应用搜索过滤
            if search_term:
                if search_term.lower() not in skill_info["name"].lower() and \
                   search_term.lower() not in skill_info["description"].lower():
                    continue
            
            # 应用状态过滤
            if status_filter and skill_info["status"] != status_filter:
                continue
            
            skills.append(skill_info)
    
    # 按名称排序
    skills.sort(key=lambda x: x["name"])
    return skills


def list_skills(search_term: str = "", format_type: str = "table"):
    """列出技能"""
    skills = find_skills(search_term)
    
    if not skills:
        if search_term:
            print(f"未找到匹配 '{search_term}' 的技能")
        else:
            print("未找到任何技能")
        return
    
    if format_type == "json":
        print(json.dumps(skills, indent=2, ensure_ascii=False))
    elif format_type == "simple":
        for skill in skills:
            status_icon = "✓" if skill["status"] == "ready" else "?"
            print(f"[{status_icon}] {skill['name']}")
            if skill["description"]:
                print(f"    {skill['description']}")
    else:  # table format
        # 计算列宽
        max_name = max(len(s["name"]) for s in skills)
        max_name = min(max_name, 40)
        
        print(f"\n{'Status':<8} {'Name':<{max_name}} Description")
        print("-" * (8 + max_name + 60))
        
        for skill in skills:
            status_icon = "✓ ready" if skill["status"] == "ready" else "? unknown"
            name = skill["name"][:max_name]
            desc = skill["description"][:60] if skill["description"] else ""
            print(f"{status_icon:<8} {name:<{max_name}} {desc}")
        
        print(f"\n总计：{len(skills)} 个技能")


def search_skills(query: str):
    """搜索技能"""
    print(f"搜索技能：'{query}'\n")
    list_skills(query, "table")


def show_stats():
    """显示统计信息"""
    skills = find_skills()
    ready_count = sum(1 for s in skills if s["status"] == "ready")
    unknown_count = len(skills) - ready_count
    
    print("\n技能统计:")
    print(f"  总技能数：{len(skills)}")
    print(f"  已就绪：{ready_count}")
    print(f"  未知状态：{unknown_count}")
    print(f"  技能目录：{SKILLS_DIR}")


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Find Skills - 搜索和管理 OpenClaw 技能')
    parser.add_argument('search', nargs='?', default='', help='搜索关键词')
    parser.add_argument('-s', '--search', dest='search_term', default='', help='搜索关键词')
    parser.add_argument('-f', '--format', choices=['table', 'json', 'simple'], default='table',
                       help='输出格式')
    parser.add_argument('--stats', action='store_true', help='显示统计信息')
    parser.add_argument('--status', choices=['ready', 'unknown'], default='',
                       help='按状态过滤')
    
    args = parser.parse_args()
    
    if args.stats:
        show_stats()
    elif args.search_term or args.search:
        search_term = args.search_term or args.search
        list_skills(search_term, args.format)
    else:
        list_skills('', args.format)


if __name__ == '__main__':
    main()
