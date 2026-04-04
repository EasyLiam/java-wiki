#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
CRON_JOB="0 8 * * * /bin/bash $SCRIPT_DIR/daily_update_v2.sh"

echo "========================================"
echo "Java后端面试题 - 高质量定时任务安装"
echo "========================================"
echo ""

(crontab -l 2>/dev/null | grep -v "daily_update_v2.sh"; echo "$CRON_JOB") | crontab -

if [ $? -eq 0 ]; then
    echo "✅ 定时任务安装成功！"
    echo ""
    echo "定时任务详情："
    echo "  - 执行时间: 每天上午 8:00"
    echo "  - 执行脚本: $SCRIPT_DIR/daily_update_v2.sh"
    echo "  - 日志目录: $SKILL_DIR/logs/"
    echo "  - 质量等级: 高质量(已核实答案)"
    echo ""
    echo "当前定时任务列表："
    crontab -l | grep -v "^#" | grep -v "^$"
    echo ""
    echo "========================================"
    echo "使用以下命令管理定时任务："
    echo "  查看任务: crontab -l"
    echo "  编辑任务: crontab -e"
    echo "  删除任务: crontab -r"
    echo "  查看日志: tail -f $SKILL_DIR/logs/daily_update_*.log"
    echo "========================================"
else
    echo "❌ 定时任务安装失败"
    echo "请检查cron服务是否运行: service cron status"
fi
