---
name: "java-backend-interview"
description: "Java后端工程师知识库整理与知识体系构建。当需要后端知识库、知识体系整理、技术栈学习时调用此技能。"
user-invocable: true
metadata: {"openclaw": {"emoji": "☕"}}
---

# Java后端知识库技能

为后端开发工程师提供系统化知识库整理和知识体系构建服务。

## 功能特点

- 📝 **知识点整理** - 按难度和主题整理后端知识点
- 📚 **知识体系构建** - 系统化后端技术知识结构
- 🎯 **专项深入** - 针对特定技术栈深入整理
- 📊 **难度分级** - 初级/中级/高级/架构师级别
- 🔄 **每日更新** - 自动搜索新知识点并更新知识库
- 📄 **文档输出** - 自动生成Markdown文档

## 知识体系覆盖

### 核心技术
- Java基础与高级特性
- JVM原理与调优
- 多线程与并发编程
- 设计模式

### 框架技术
- Spring全家桶（Spring Boot/Cloud/Security）
- MyBatis/MyBatis-Plus
- Netty网络编程
- Dubbo RPC框架

### 数据存储
- MySQL数据库优化
- Redis缓存架构
- MongoDB文档数据库
- Elasticsearch搜索引擎

### 分布式系统
- 微服务架构设计
- 分布式事务解决方案
- 消息队列（Kafka/RocketMQ/RabbitMQ）
- 分布式锁与一致性算法

### 系统设计
- 高并发系统设计
- 高可用架构设计
- 限流熔断降级
- 分布式ID生成

### 中间件与组件
- 网关与服务发现（Spring Cloud Gateway、Nacos、Eureka）
- 配置中心（Nacos、Apollo、Spring Cloud Config）
- 链路追踪（Sleuth、Zipkin、SkyWalking）
- 容器化（Docker、Kubernetes）

## 使用方法

### 命令行使用

```bash
# 生成随机知识点
python3 ~/.openclaw/skills/java-backend-interview/scripts/interview_gen.py --random

# 按主题整理知识点
python3 ~/.openclaw/skills/java-backend-interview/scripts/interview_gen.py --topic jvm

# 按难度整理知识点
python3 ~/.openclaw/skills/java-backend-interview/scripts/interview_gen.py --level senior

# 查看知识体系
python3 ~/.openclaw/skills/java-backend-interview/scripts/interview_gen.py --knowledge

# 专项整理
python3 ~/.openclaw/skills/java-backend-interview/scripts/interview_gen.py --topic spring --count 5

# 每日更新（搜索新知识点并生成文档）
python3 ~/.openclaw/skills/java-backend-interview/scripts/interview_gen.py --daily

# 更新特定主题并生成文档
python3 ~/.openclaw/skills/java-backend-interview/scripts/interview_gen.py --update --topic jvm --output jvm_notes.md

# 整理知识点并输出到文档
python3 ~/.openclaw/skills/java-backend-interview/scripts/interview_gen.py --topic concurrent --count 5 --output concurrent.md
```

### 在对话中使用

直接询问：
- "给我整理一些JVM知识点"
- "Spring Boot高级知识点有哪些"
- "分布式系统设计知识点"
- "帮我整理MySQL优化知识体系"
- "来5个高难度并发编程知识点"
- "每日更新知识库"
- "搜索新的Redis知识点并生成文档"

## 难度等级

| 等级 | 描述 | 适用场景 |
|------|------|----------|
| junior | 初级 | 1-3年经验 |
| middle | 中级 | 3-5年经验 |
| senior | 高级 | 5-8年经验 |
| architect | 架构师 | 8年以上经验 |

## 主题分类

| 主题 | 代码 | 说明 |
|------|------|------|
| Java基础 | java | 语法、集合、IO、反射 |
| JVM | jvm | 内存模型、GC、类加载 |
| 并发编程 | concurrent | 线程、锁、JUC |
| Spring | spring | Spring全家桶 |
| 数据库 | database | MySQL、事务、优化 |
| 缓存 | cache | Redis、缓存策略 |
| 分布式 | distributed | 微服务、一致性 |
| 系统设计 | design | 架构设计、高并发 |

## 每日更新功能

使用 `--daily` 参数可以：
1. 自动搜索各主题的最新知识点
2. 更新知识库（自动去重）
3. 生成每日Markdown文档
4. 记录更新历史

生成的文档保存在 `~/.openclaw/skills/java-backend-interview/output/` 目录。

## 定时任务配置

### 安装定时任务

```bash
# 进入技能目录
cd ~/.openclaw/skills/java-backend-interview/scripts

# 安装定时任务（每天上午9点自动更新）
bash setup_cron.sh
```

### 定时任务说明

- **执行时间**: 每天上午 9:00
- **执行内容**: 自动搜索并更新所有主题的知识点
- **日志位置**: `~/.openclaw/skills/java-backend-interview/logs/`
- **日志保留**: 自动清理30天前的日志

### 管理定时任务

```bash
# 查看当前定时任务
crontab -l

# 编辑定时任务
crontab -e

# 删除定时任务
crontab -r

# 查看今日日志
tail -f ~/.openclaw/skills/java-backend-interview/logs/daily_update_$(date +%Y%m%d).log
```

### 自定义执行时间

编辑 `setup_cron.sh` 中的 `CRON_JOB` 变量：

```bash
# 每天上午9点
CRON_JOB="0 9 * * * /bin/bash $SCRIPT_DIR/daily_update.sh"

# 每天上午8点30分
CRON_JOB="30 8 * * * /bin/bash $SCRIPT_DIR/daily_update.sh"

# 每12小时执行一次
CRON_JOB="0 */12 * * * /bin/bash $SCRIPT_DIR/daily_update.sh"
```

## 输出文档格式

自动生成的Markdown文档包含：
- 标题和生成时间
- 知识题目和详细解析
- 扩展学习建议

## 注意事项

- 知识点基于真实后端开发场景整理
- 知识体系按照企业实际需求组织
- 建议结合实际项目经验理解
- 高级知识点需要深入理解原理
- 每日更新会自动去重，避免重复内容
