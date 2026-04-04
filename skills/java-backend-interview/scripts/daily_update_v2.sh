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
log "开始每日高质量面试题更新"
log "========================================"

cd "$SKILL_DIR"

python3 "$SCRIPT_DIR/interview_gen_v2.py" --daily 2>&1 | while IFS= read -r line; do
    log "$line"
done

log "========================================"
log "每日更新完成"
log "========================================"

# 生成前端JavaScript数据
log "开始生成前端网站数据..."
python3 "$SCRIPT_DIR/generate_frontend_js.py" 2>&1 | while IFS= read -r line; do
    log "$line"
done

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
        log "GitHub推送成功"
    else
        log "GitHub推送失败，请检查配置"
    fi
fi

find "$LOG_DIR" -name "daily_update_*.log" -mtime +30 -delete

log "清理30天前的日志文件完成"
