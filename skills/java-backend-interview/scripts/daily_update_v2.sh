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

find "$LOG_DIR" -name "daily_update_*.log" -mtime +30 -delete

log "清理30天前的日志文件完成"
