#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$SKILL_DIR/logs"
LOG_FILE="$LOG_DIR/daily_update_$(date +%Y%m%d).log"

mkdir -p "$LOG_DIR"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "========================================"
log "开始每日知识库更新"
log "========================================"

cd "$SKILL_DIR"

python3 "$SCRIPT_DIR/interview_gen.py" --daily 2>&1 | while IFS= read -r line; do
    log "$line"
done

# 同步题目数据到GitHub Pages网站
log "同步数据到GitHub Pages..."
python3 "$SCRIPT_DIR/sync_to_website.py" 2>&1 | while IFS= read -r line; do
    log "$line"
done

log "========================================"
log "每日更新完成"
log "========================================"

# 推送到GitHub
log "开始推送到GitHub..."
cd /home/liam/.openclaw/workspace
git add . >> "$LOG_FILE" 2>&1
git status >> "$LOG_FILE" 2>&1

# 检查是否有变更
if git diff --cached --quiet; then
    log "没有文件变更，跳过提交"
else
    git commit -m "docs: daily update $(date +%Y-%m-%d)" >> "$LOG_FILE" 2>&1
    git push origin master >> "$LOG_FILE" 2>&1
    if [ $? -eq 0 ]; then
        log "✅ Master分支推送成功"
    else
        log "❌ Master分支推送失败，请检查配置"
    fi
fi

# 部署静态文件到gh-pages分支
log "🚀 开始部署到GitHub Pages (gh-pages分支)..."
cd /home/liam/.openclaw/workspace

# 保存当前工作区修改（如果有）
git stash push -m "tmp before deploy" >> "$LOG_FILE" 2>&1

# 切换到gh-pages分支
git checkout gh-pages >> "$LOG_FILE" 2>&1

# 复制根目录的静态文件（index.html, script.js, style.css）
cp -f index.html script.js style.css ./ >> "$LOG_FILE" 2>&1

# 添加这些文件到git
git add index.html script.js style.css >> "$LOG_FILE" 2>&1

# 检查是否有变更
if git diff --cached --quiet; then
    log "📝 GitHub Pages没有文件变更，跳过部署"
else
    git commit -m "deploy: update website $(date +%Y-%m-%d)" >> "$LOG_FILE" 2>&1
    git push origin gh-pages >> "$LOG_FILE" 2>&1
    if [ $? -eq 0 ]; then
        log "✅ GitHub Pages部署成功"
    else
        log "❌ GitHub Pages部署失败"
    fi
fi

# 切回master分支
git checkout master >> "$LOG_FILE" 2>&1

# 恢复之前储藏的修改
git stash pop >> "$LOG_FILE" 2>&1

log "完成GitHub Pages部署流程"

find "$LOG_DIR" -name "daily_update_*.log" -mtime +30 -delete

log "清理30天前的日志文件完成"
