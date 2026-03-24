#!/bin/bash
# 每日自动更新面试题库
# 每天运行更新知识库

# 设置目录
WIKI_DIR="/home/liam/java-wiki"
SCRIPT_DIR="/root/.openclaw/skills/java-backend-interview/scripts"

echo "=== 开始每日更新 Java 面试题库 ==="
date

cd "$WIKI_DIR"

# 运行更新脚本生成新题目
python3 "$SCRIPT_DIR/interview_gen.py" --daily

# 同步更新到 docs 目录
python3 "$SCRIPT_DIR/interview_gen.py" --sync --output "$WIKI_DIR/docs"

# 添加变更
git add .
git commit -m "Daily update: $(date +%Y-%m-%d)"
git push

echo "=== 更新完成 ==="
date
