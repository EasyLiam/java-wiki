# 缓存技术 - 高级面试题

> 生成时间: 2026-04-06 08:00:01
> 题目数量: 5
> 质量等级: 高质量(已核实)

---

## 问题 1

**Q: Redis的Stream数据结构有什么特点？如何实现可靠的消息队列？**

**A:**

Redis Stream是5.0引入的数据结构：

核心概念：
1. 消息：
   - ID: 时间戳-序列号
   - Field-Value对

2. 消费者组：
   - 多消费者并行消费
   - 每个消息只被一个消费者处理
   - 支持消息确认

3. Pending列表：
   - 已发送但未确认的消息
   - 支持消息重试

基本命令：
XADD stream * field value    # 添加消息
XREAD COUNT 2 STREAMS stream $  # 读取消息
XGROUP CREATE stream group $  # 创建消费者组
XREADGROUP GROUP group consumer STREAMS stream >  # 消费
XACK stream group id         # 确认消息
XPENDING stream group        # 查看pending

实现可靠消息队列：
1. 生产者：
XADD orders * order_id 123 user_id 456

2. 消费者：
while True:
    msgs = XREADGROUP GROUP order_group consumer1 \
           COUNT 10 BLOCK 5000 \
           STREAMS orders >
    for msg in msgs:
        process(msg)
        XACK orders order_group msg.id

3. 消息重试：
pending = XPENDING orders order_group - + 10
for msg in pending:
    if msg.idle_time > 60000:  # 超时1分钟
        XCLAIM orders order_group consumer2 \
               min_idle_time msg.id

与Kafka对比：
| 特性 | Redis Stream | Kafka |
|------|--------------|-------|
| 持久化 | 支持 | 原生支持 |
| 消息回溯 | 支持 | 支持 |
| 吞吐量 | 10万/秒 | 百万/秒 |
| 延迟 | 毫秒级 | 毫秒级 |
| 运维复杂度 | 低 | 高 |

适用场景：
1. 轻量级消息队列
2. 实时数据流
3. 消息通知
4. 日志收集

最佳实践：
1. 合理设置消息过期
2. 监控pending列表
3. 实现死信队列
4. 控制消费者数量

> 来源: Redis官方文档

> ✅ 答案已核实

---

## 问题 2

**Q: Redis的持久化机制有哪些？如何选择RDB和AOF？**

**A:**

Redis提供两种持久化机制：

RDB(快照)：
优点：
1. 文件紧凑，适合备份
2. 恢复速度快
3. 对性能影响小

缺点：
1. 可能丢失最后一次快照后的数据
2. 大数据量时fork耗时

配置：
save 900 1      # 900秒内1次修改
save 300 10     # 300秒内10次修改
save 60 10000   # 60秒内10000次修改

AOF(追加日志)：
优点：
1. 数据更安全，最多丢1秒
2. 可读性好
3. 支持重写

缺点：
1. 文件更大
2. 恢复速度慢
3. 对性能影响稍大

配置：
appendonly yes
appendfsync everysec  # 每秒同步

AOF重写：
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb

混合持久化(推荐)：
aof-use-rdb-preamble yes

重写时先写RDB格式，再追加AOF

选择建议：
1. 只用RDB：
   - 允许分钟级数据丢失
   - 追求恢复速度

2. 只用AOF：
   - 数据安全要求高
   - 数据量不大

3. 混合持久化(推荐)：
   - 兼顾安全和性能
   - 生产环境首选

最佳实践：
1. 开启混合持久化
2. 合理设置重写阈值
3. 监控持久化性能
4. 定期备份持久化文件

> 来源: Redis官方文档

> ✅ 答案已核实

---

## 问题 3

**Q: Redis的分布式锁如何实现？Redisson的看门狗机制是什么？**

**A:**

Redis分布式锁实现：

基础实现：
SET lock_key unique_value NX PX 30000

参数说明：
- NX: 不存在才设置
- PX: 过期时间(毫秒)
- unique_value: 客户端唯一标识

释放锁：
if redis.call('get', KEYS[1]) == ARGV[1] then
    return redis.call('del', KEYS[1])
else
    return 0
end

问题：
1. 锁过期时间不好设置
2. 业务执行时间超过过期时间
3. 误删其他客户端的锁

Redisson实现：
1. 可重入锁：
RLock lock = redisson.getLock("myLock");
lock.lock();
try {
    // 业务代码
} finally {
    lock.unlock();
}

2. 看门狗机制：
- 默认过期时间30秒
- 后台线程每10秒续期
- 业务执行完成自动释放
- 防止业务未完成锁过期

3. 公平锁：
RLock fairLock = redisson.getFairLock("myLock");

4. 读写锁：
RReadWriteLock rwLock = redisson.getReadWriteLock("myLock");
rwLock.readLock().lock();
rwLock.writeLock().lock();

Redlock算法：
1. 获取当前时间戳
2. 依次向N个Redis节点请求锁
3. 计算获取锁消耗的时间
4. 大多数节点获取成功且消耗时间小于锁过期时间才算成功

最佳实践：
1. 使用Redisson而非自己实现
2. 合理设置等待时间
3. 确保在finally中释放锁
4. 集群环境考虑Redlock
5. 监控锁竞争情况

> 来源: Redis官方文档

> ✅ 答案已核实

---

## 问题 4

**Q: Redis的缓存穿透、击穿、雪崩如何解决？布隆过滤器原理是什么？**

**A:**

缓存问题及解决方案：

1. 缓存穿透：
问题：查询不存在的数据，绕过缓存直接查DB

解决：
- 布隆过滤器：
  - 位图 + 多个Hash函数
  - 判断元素可能存在或一定不存在
  - 空间效率高，有误判率

- 缓存空值：
  SET key "" EX 300

2. 缓存击穿：
问题：热点key过期，大量请求打到DB

解决：
- 热点数据永不过期
- 互斥锁：
  if (cache.get(key) == null) {
      if (redis.setnx(lock_key, 1)) {
          // 查DB并缓存
          redis.set(key, value, ttl);
          redis.del(lock_key);
      }
  }

3. 缓存雪崩：
问题：大量key同时过期

解决：
- 过期时间加随机值
- 多级缓存
- 熔断降级

布隆过滤器原理：
1. 初始化：
   - 创建m位位数组，全置0
   - 选择k个Hash函数

2. 添加元素：
   - 计算k个Hash值
   - 将对应位置为1

3. 查询元素：
   - 计算k个Hash值
   - 所有位都为1则可能存在
   - 有0则一定不存在

Redis实现：
BF.ADD key item      # 添加
BF.EXISTS key item   # 查询

参数选择：
- n: 预期元素数量
- p: 误判率
- m = -n*ln(p)/(ln2)^2
- k = m/n*ln2

最佳实践：
1. 合理设置过期时间
2. 使用布隆过滤器
3. 监控缓存命中率
4. 做好熔断降级

> 来源: Redis设计与实现

> ✅ 答案已核实

---

## 问题 5

**Q: Redis的集群方案有哪些？Redis Cluster是如何工作的？**

**A:**

Redis集群方案对比：

1. 主从复制：
优点：简单，读写分离
缺点：故障需手动切换，单机内存限制

2. Sentinel哨兵：
优点：自动故障转移
缺点：单机内存限制，不支持分片

3. Redis Cluster：
优点：数据分片 + 高可用
缺点：跨槽操作受限

Redis Cluster原理：
1. 槽位分配：
   - 16384个槽位
   - 每个节点负责部分槽位
   - key -> CRC16(key) % 16384

2. 数据分片：
   - 每个key属于一个槽位
   - 槽位分布在多个节点
   - 自动负载均衡

3. 高可用：
   - 每个主节点有从节点
   - 主节点故障自动切换
   - 半数以上主节点存活即可用

集群搭建：
redis-cli --cluster create \
  192.168.1.1:6379 192.168.1.2:6379 ... \
  --cluster-replicas 1

客户端路由：
1. Moved重定向：
   - 槽位已迁移
   - 客户端更新槽位映射

2. Ask重定向：
   - 槽位正在迁移
   - 临时重定向

注意事项：
1. 批量操作需使用hash tag
   {user}:1, {user}:2 在同一槽位

2. 事务需在同一槽位

3. 监控集群状态
   redis-cli -c cluster info

最佳实践：
1. 至少6个节点(3主3从)
2. 使用配置文件管理节点
3. 监控槽位分布
4. 预分配槽位避免迁移

> 来源: Redis官方文档

> ✅ 答案已核实

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端面试题技能 自动生成*
