#!/usr/bin/env python3
"""
Tavily Search Skill
使用 Tavily API 进行网络搜索
"""

import os
import sys
import json
import urllib.request
import urllib.error
from pathlib import Path

def get_api_key():
    """从多个位置获取 Tavily API Key"""
    api_key = os.environ.get('TAVILY_API_KEY', '')
    if api_key:
        return api_key
    
    env_paths = [
        '/root/.openclaw/.env',
        os.path.expanduser('~/.openclaw/.env'),
    ]
    
    for env_path in env_paths:
        env_file = Path(env_path)
        if env_file.exists():
            try:
                content = env_file.read_text().strip()
                for line in content.split('\n'):
                    if line.startswith('TAVILY_API_KEY='):
                        return line.split('=', 1)[1].strip()
            except:
                pass
    
    secret_paths = [
        '/root/.openclaw/secrets/TAVILY_API_KEY.txt',
        os.path.expanduser('~/.openclaw/secrets/TAVILY_API_KEY.txt'),
    ]
    
    for secret_path in secret_paths:
        secret_file = Path(secret_path)
        if secret_file.exists():
            try:
                return secret_file.read_text().strip()
            except:
                pass
    
    return ''

TAVILY_API_KEY = get_api_key()

def tavily_search(query, max_results=5, include_answer=True):
    """使用 Tavily API 进行搜索"""
    
    if not TAVILY_API_KEY:
        return {
            "error": "TAVILY_API_KEY 环境变量未设置",
            "hint": "请设置 TAVILY_API_KEY 环境变量或在配置文件中设置"
        }
    
    url = "https://api.tavily.com/search"
    
    data = {
        "api_key": TAVILY_API_KEY,
        "query": query,
        "max_results": max_results,
        "include_answer": include_answer,
        "search_depth": "basic"
    }
    
    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result
            
    except urllib.error.HTTPError as e:
        return {
            "error": f"HTTP Error: {e.code}",
            "message": e.read().decode('utf-8')
        }
    except Exception as e:
        return {
            "error": str(e)
        }

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Tavily Search Skill')
    parser.add_argument('query', help='搜索查询')
    parser.add_argument('--max-results', '-m', type=int, default=5, help='最大结果数')
    parser.add_argument('--include-answer', '-a', action='store_true', help='包含答案')
    parser.add_argument('--api-key', '-k', help='Tavily API Key')
    
    args = parser.parse_args()
    
    global TAVILY_API_KEY
    if args.api_key:
        TAVILY_API_KEY = args.api_key
    
    result = tavily_search(args.query, args.max_results, args.include_answer)
    
    print(json.dumps(result, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    main()
