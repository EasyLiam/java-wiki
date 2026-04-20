# 数据库技术 - 高级知识点

> 生成时间: 2026-04-20 08:00:02
> 题目数量: 5
> 质量等级: 高质量(已核实)

---

## 问题 1

**Q: MySQL的索引下推(ICP)和覆盖索引是如何优化查询的？**

**A:**

索引下推(Index Condition Pushdown)：

原理：
- 将WHERE条件的过滤下推到存储引擎层
- 减少回表次数
- 减少返回给Server层的数据量

示例：
索引: (name, age)
查询: SELECT * FROM user WHERE name LIKE '张%' AND age = 20

无ICP：
1. 存储引擎返回所有name以'张'开头的记录
2. Server层过滤age = 20

有ICP：
1. 存储引擎直接过滤name和age
2. 只返回满足条件的记录

查看是否使用ICP：
EXPLAIN SELECT ... Extra: Using index condition

覆盖索引(Covering Index)：

原理：
- 查询所需字段都在索引中
- 无需回表查询数据行
- 大幅提升查询性能

示例：
索引: (name, age)
查询: SELECT name, age FROM user WHERE name = '张三'

优势：
1. 减少IO操作
2. 索引比数据行小，更多数据可缓存在内存
3. MyISAM索引缓存更高效

查看是否使用覆盖索引：
EXPLAIN SELECT ... Extra: Using index

最佳实践：
1. 高频查询字段建立联合索引
2. 使用覆盖索引避免回表
3. 注意索引顺序(最左前缀)
4. 不要SELECT *，只查需要的字段

性能对比：
- 回表查询: 10ms
- 覆盖索引: 1ms
- 提升: 10倍

> 来源: MySQL官方文档

> ✅ 答案已核实

---

## 问题 2

**Q: MySQL的Online DDL是如何实现的？如何避免锁表？**

**A:**

Online DDL允许DDL操作期间并发DML：

实现原理：
1. 初始化阶段：
   - 获取MDL写锁(短暂)
   - 创建临时frm文件
   - 释放MDL写锁

2. 执行阶段：
   - 获取MDL读锁
   - 扫描原表数据
   - 构建新表结构
   - 记录DML变更到row log

3. 应用阶段：
   - 获取MDL写锁(短暂)
   - 应用row log中的增量
   - 切换表名
   - 删除旧表

Instant DDL (MySQL 8.0+)：
- 只修改元数据
- 秒级完成
- 支持操作：修改列默认值、添加列(非中间位置)

支持的Online DDL：
1. 添加索引
2. 删除索引
3. 修改列类型(部分)
4. 添加列(非中间位置)
5. 删除列
6. 修改列默认值

避免锁表的方法：
1. 使用ALGORITHM=INPLACE：
   ALTER TABLE t ADD INDEX idx(c), ALGORITHM=INPLACE;

2. 使用pt-online-schema-change：
   pt-online-schema-change --alter "ADD INDEX idx(c)" D=db,t=table

3. 使用gh-ost：
   gh-ost --alter="ADD INDEX idx(c)" --database=db --table=table

监控DDL进度：
SELECT * FROM performance_schema.setup_actors;
SHOW PROCESSLIST;

最佳实践：
1. 低峰期执行DDL
2. 使用ALGORITHM和LOCK子句
3. 监控DDL进度
4. 预估DDL时间
5. 准备回滚方案

> 来源: MySQL官方文档

> ✅ 答案已核实

---

## 问题 3

**Q: 如何设计MySQL的分库分表方案？有哪些分片策略？**

**A:**

分库分表是处理大数据量的核心方案：

分片策略：
1. 垂直分库：
   - 按业务拆分
   - 用户库、订单库、商品库
   - 降低单库压力

2. 水平分库：
   - 按分片键路由
   - user_id % 分库数
   - 数据均匀分布

分片键选择：
1. 高频查询字段
2. 数据分布均匀
3. 避免跨库查询

路由算法：
1. Hash取模：
   - 简单均匀
   - 扩容困难
   shard = hash(key) % N

2. 范围分片：
   - 扩容方便
   - 可能不均匀
   - 适合时间序列

3. 一致性Hash：
   - 扩容影响小
   - 实现复杂
   - 适合缓存场景

4. 基因法：
   - 将分片基因嵌入关联字段
   - 避免跨库JOIN
   - user_id基因嵌入order_id

全局ID生成：
1. 雪花算法：
   - 时间戳 + 机器ID + 序列号
   - 趋势递增
   - 分布式友好

2. 号段模式：
   - 预分配ID段
   - 减少数据库访问
   - Leaf框架

中间件选择：
1. ShardingSphere：
   - 功能全面
   - 支持多种分片策略
   - 生态完善

2. MyCat：
   - 配置简单
   - 社区活跃
   - 适合中小规模

注意事项：
1. 避免跨库JOIN
2. 使用全局表
3. 处理分布式事务
4. 数据迁移方案
5. 监控告警

> 来源: 数据库架构设计

> ✅ 答案已核实

---

## 问题 4

**Q: MySQL的MVCC是如何实现的？Read View如何判断可见性？**

**A:**

MVCC(Multi-Version Concurrency Control)是MySQL实现事务隔离的核心：

实现组件：
1. Undo Log：
   - 存储数据的历史版本
   - 形成版本链
   - 支持回滚和快照读

2. Read View：
   - m_ids: 活跃事务ID列表
   - min_trx_id: 最小活跃事务ID
   - max_trx_id: 下一个将分配的事务ID
   - creator_trx_id: 创建者事务ID

版本链结构：
每条记录包含：
- trx_id: 最后修改的事务ID
- roll_pointer: 指向undo log的指针

可见性判断规则：
1. trx_id == creator_trx_id: 可见(自己修改的)
2. trx_id < min_trx_id: 可见(事务已提交)
3. trx_id >= max_trx_id: 不可见(事务在Read View之后开启)
4. trx_id in m_ids: 不可见(事务未提交)
5. trx_id not in m_ids: 可见(事务已提交)

RC与RR的区别：
1. Read Committed：
   - 每次SELECT创建新的Read View
   - 可以看到其他事务已提交的修改

2. Repeatable Read：
   - 第一次SELECT创建Read View
   - 后续SELECT复用同一个Read View
   - 保证可重复读

解决幻读：
1. 快照读：MVCC解决
2. 当前读：Next-Key Lock解决

性能优化：
1. 避免长事务(Read View维护成本高)
2. 合理设置事务隔离级别
3. 减少不必要的字段更新

> 来源: MySQL官方文档

> ✅ 答案已核实

---

## 问题 5

**Q: MySQL主从复制的原理是什么？如何解决复制延迟？**

**A:**

MySQL主从复制原理：

复制流程：
1. Master写操作记录到binlog
2. Slave的IO线程连接Master
3. Master发送binlog到Slave
4. Slave写入relay log
5. Slave的SQL线程重放relay log

复制格式：
1. STATEMENT：SQL语句
2. ROW：行变更(推荐)
3. MIXED：混合模式

复制模式：
1. 异步复制：
   - Master不等待Slave
   - 可能丢数据

2. 半同步复制：
   - Master等待至少一个Slave确认
   - 兼顾性能和数据安全

3. 全同步复制：
   - Master等待所有Slave确认
   - 数据最安全，性能最差

延迟原因：
1. 单线程重放(MySQL 5.6之前)
2. 大事务
3. 网络延迟
4. Slave性能不足

解决方案：
1. 并行复制(MTS)：
   - MySQL 5.6+支持
   - 按库并行
   - MySQL 5.7+按组提交并行

   slave_parallel_type = LOGICAL_CLOCK
   slave_parallel_workers = 8

2. 半同步复制：
   rpl_semi_sync_master_enabled = 1
   rpl_semi_sync_master_wait_no_slave = 1

3. 分库分表：
   - 减少单库压力
   - 降低复制延迟

4. 读写分离中间件：
   - ShardingSphere
   - 自动路由
   - 延迟检测

监控复制状态：
SHOW SLAVE STATUS\G
关注：Seconds_Behind_Master

> 来源: MySQL官方文档

> ✅ 答案已核实

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端知识点技能 自动生成*
