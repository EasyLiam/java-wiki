# 数据库技术

---

## 初级

### 1. MySQL索引的类型有哪些？

**答案：**

索引类型：1.主键索引：唯一且非空；2.唯一索引：唯一可为空；3.普通索引：无约束；4.组合索引：多列组合；5.全文索引：文本搜索。存储结构：B+树索引(默认)、Hash索引(Memory引擎)。

---

### 2. 事务的ACID特性是什么？

**答案：**

ACID特性：1.原子性(Atomicity)：事务不可分割；2.一致性(Consistency)：事务前后数据一致；3.隔离性(Isolation)：并发事务互不干扰；4.持久性(Durability)：事务提交后永久保存。

---

## 中级

### 1. MySQL的隔离级别及实现原理？

**答案：**

隔离级别：1.读未提交：不加锁；2.读已提交：MVCC+快照读；3.可重复读(默认)：MVCC+Next-Key Lock防止幻读；4.串行化：加锁。MVCC通过undo log版本链实现，Read View判断可见性。

---

### 2. MySQL索引优化原则？

**答案：**

优化原则：1.最左前缀原则；2.覆盖索引减少回表；3.索引列不参与计算；4.避免索引失效(函数、类型转换、!=、OR)；5.选择性高的列建索引；6.组合索引顺序(区分度高在前)；7.控制索引数量。

---

## 高级

### 1. MySQL主从复制原理及延迟解决方案？

**答案：**

复制原理：1.Master写binlog；2.Slave的IO线程拉取binlog到relay log；3.SQL线程重放relay log。延迟原因：单线程重放、大事务、网络延迟。解决方案：1.并行复制(MTS)；2.半同步复制；3.分库分表减少单库压力；4.读写分离中间件(ShardingSphere)。

---

### 2. 如何设计分库分表方案？

**答案：**

分片策略：1.垂直分库：按业务拆分；2.水平分库：按分片键路由。分片键选择：高频查询字段、数据分布均匀。路由算法：1.Hash取模；2.范围分片；3.一致性Hash。中间件：ShardingSphere、MyCat。问题解决：分布式事务、跨库Join、全局ID(雪花算法)、数据迁移。

---

### 3. MySQL的MVCC是如何实现的？Read View的作用？

**答案：**

MVCC通过undo log版本链+Read View实现。Read View包含：m_ids(活跃事务ID)、min_trx_id、max_trx_id、creator_trx_id。可见性判断：1.事务ID&lt;min_trx_id：可见；2.事务ID&gt;=max_trx_id：不可见；3.在m_ids中：不可见；4.不在m_ids中：可见。RC级别每次查询创建Read View，RR级别只在第一次创建。

---

### 4. MySQL的Online DDL是如何实现的？

**答案：**

Online DDL允许DDL期间并发DML。实现：1.获取MDL写锁(短暂)；2.降级为MDL读锁；3.执行DDL；4.应用增量DML(row_log)；5.升级为MDL写锁；6.应用最后增量；7.完成DDL。Instant DDL(MySQL8.0)：只修改元数据，秒级完成，支持修改列默认值、添加列等。

---

### 5. 如何优化MySQL的大表查询？

**答案：**

优化方案：1.索引优化：覆盖索引、索引下推、避免回表；2.分页优化：延迟关联、子查询；3.分区表：按时间或范围分区；4.分库分表：水平拆分；5.读写分离：主写从读；6.缓存：Redis缓存热点数据；7.异步：MQ处理非实时查询。注意：避免SELECT *，使用LIMIT限制结果集。

---

### 6. MySQL的Change Buffer是什么？有什么优化作用？

**答案：**

Change Buffer缓存二级索引的修改操作(DML)，当对应页不在Buffer Pool时暂存。优化：1.减少随机IO；2.合并多次修改；3.提升写入性能。适用场景：写多读少、非唯一二级索引。注意：唯一索引不支持(需要立即检查唯一性)。MySQL8.0后支持部分索引。

---

### 7. MySQL的Undo Log是如何回收的？Purge线程的作用？

**答案：**

Undo Log回收：1.事务提交后undo log进入history list；2.Purge线程异步清理；3.清理条件：所有活跃事务ID大于undo log事务ID。Purge线程：后台线程，负责清理undo log和删除标记的记录。参数：innodb_purge_threads控制线程数，innodb_max_purge_lag控制延迟。

---

## 架构师

### 1. 如何设计一个高并发订单系统数据库架构？

**答案：**

架构设计：1.分库分表(按用户ID/订单ID)；2.热点数据分离(活跃订单单独存储)；3.读写分离(主写从读)；4.缓存层(Redis缓存热点订单)；5.异步处理(MQ削峰)；6.归档策略(历史订单迁移)；7.分布式ID(雪花算法)；8.柔性事务(最终一致性)。

---

### 2. MySQL高可用架构方案对比？

**答案：**

方案对比：1.MHA：自动故障转移，需额外部署Manager，适合中小规模；2.MGR(MySQL Group Replication)：官方方案，基于Paxos，支持多主；3.orchestrator：GitHub开源，拓扑管理+自动切换；4.ProxySQL+MySQL Router：中间件层高可用。推荐：MGR+orchestrator+ProxySQL组合方案。

---

