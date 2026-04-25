# 系统设计 - 高级知识点

> 生成时间: 2026-04-25 08:00:02
> 题目数量: 5
> 质量等级: 高质量(已核实)

---

## 问题 1

**Q: 如何设计一个延迟任务调度系统？时间轮算法原理是什么？**

**A:**

延迟任务场景：
1. 订单超时取消
2. 消息延迟投递
3. 定时提醒

实现方案：
1. 数据库轮询：
优点：简单
缺点：性能差，延迟高

2. Redis ZSet：
优点：实现简单
缺点：大数据量性能下降

// 添加任务
ZADD delay_queue <执行时间戳> <任务ID>

// 消费任务
ZRANGEBYSCORE delay_queue 0 <当前时间戳> LIMIT 0 100

3. 时间轮：
优点：高性能，低延迟
缺点：单机，重启丢失

时间轮原理：
1. 环形数组：
   - 固定大小槽位
   - 每个槽位存放任务链表
   - 指针按固定间隔移动

2. 任务添加：
   ticks = 延迟时间 / 时间轮间隔
   index = (currentTick + ticks) % wheelSize
   wheel[index].add(task)

3. 任务执行：
   指针移动时执行当前槽位的到期任务

Netty时间轮：
HashedWheelTimer timer = new HashedWheelTimer(
    100, TimeUnit.MILLISECONDS,  // tick间隔
    512                          // 槽位数
);

timer.newTimeout(timeout -> {
    // 执行任务
}, 5, TimeUnit.SECONDS);

层级时间轮：
1. 秒级时间轮：处理秒级延迟
2. 分钟级时间轮：处理分钟级延迟
3. 小时级时间轮：处理小时级延迟

任务升级：
- 秒级时间轮任务到期后升级到分钟级
- 分钟级任务到期后升级到小时级

分布式时间轮：
1. Redis + 时间轮：
   - Redis存储任务
   - 本地时间轮调度

2. MQ延迟消息：
   - RocketMQ延迟级别
   - Kafka延迟主题

最佳实践：
1. 合理设置时间轮参数
2. 任务持久化防止丢失
3. 监控任务执行情况
4. 做好任务重试机制

> 来源: 系统设计案例

> ✅ 答案已核实

---

## 问题 2

**Q: 如何设计一个高并发秒杀系统？核心设计要点是什么？**

**A:**

秒杀系统核心设计：

1. 前端优化：
- 静态资源CDN
- 按钮防重复点击
- 答题/验证码防机器人
- 请求随机延迟

2. 网关层：
- 限流：令牌桶/漏桶
- 黑名单：IP/用户
- 请求过滤：无效请求直接拒绝

3. 服务层：
- 库存预热到Redis
- 预扣库存：DECR原子操作
- 异步下单：MQ削峰
- 令牌机制：先抢令牌再抢库存

4. 数据层：
- 分库分表
- 乐观锁扣库存
- 读写分离

核心代码：
// Redis预扣库存
long stock = redis.decr("stock:" + itemId);
if (stock < 0) {
    redis.incr("stock:" + itemId);
    throw new BusinessException("库存不足");
}

// 发送MQ异步下单
mqSender.send(new OrderMessage(userId, itemId));

// 数据库乐观锁
UPDATE item SET stock = stock - 1 
WHERE id = ? AND stock > 0;

防超卖方案：
1. Redis原子操作
2. 数据库乐观锁
3. 分布式锁兜底

热点数据处理：
1. 本地缓存 + Redis
2. 热点探测自动识别
3. 动态调整限流阈值

容灾方案：
1. 降级：直接返回失败
2. 熔断：保护下游服务
3. 兜底：静态页面

监控指标：
1. QPS/TPS
2. 成功率
3. 响应时间
4. 库存余量

> 来源: 电商架构设计

> ✅ 答案已核实

---

## 问题 3

**Q: 如何设计一个分布式任务调度系统？XXL-Job的架构是怎样的？**

**A:**

分布式任务调度核心功能：

1. 任务管理：
- 任务配置
- 任务依赖
- 任务分组

2. 调度策略：
- Cron表达式
- 固定频率
- 固定延迟

3. 执行策略：
- 单机执行
- 广播执行
- 分片执行

4. 容错机制：
- 故障转移
- 重试策略
- 超时控制

XXL-Job架构：
1. 调度中心：
- 任务管理
- 触发器管理
- 执行器管理
- 日志管理

2. 执行器：
- 任务执行
- 心跳上报
- 结果回调

3. 通信协议：
- HTTP
- Netty

分片广播：
// 任务参数
ShardingUtil.ShardingVO sharding = ShardingUtil.getShardingVo();
int index = sharding.getIndex();
int total = sharding.getTotal();

// 分片处理
List<Task> tasks = getTasks();
for (int i = 0; i < tasks.size(); i++) {
    if (i % total == index) {
        process(tasks.get(i));
    }
}

任务依赖：
1. 串行执行：
   A -> B -> C

2. 并行执行：
   A, B 同时执行

3. 混合执行：
   A -> (B, C) -> D

高可用设计：
1. 调度中心集群：
   - 基于数据库锁选举
   - 只有一个节点执行调度

2. 执行器集群：
   - 多实例部署
   - 故障自动转移

最佳实践：
1. 任务幂等设计
2. 合理设置超时
3. 做好任务监控
4. 日志记录完善

其他方案：
- ElasticJob：基于Zookeeper
- PowerJob：支持MapReduce
- Quartz：单机调度

> 来源: XXL-Job官方文档

> ✅ 答案已核实

---

## 问题 4

**Q: 如何设计一个短链接服务？如何处理高并发和防止恶意访问？**

**A:**

短链接服务设计：

核心流程：
1. 长链接 -> 短链接
2. 短链接 -> 长链接(302跳转)

短码生成方案：
1. 自增ID转62进制：
   - 简单高效
   - 可预测
   - 需要分布式ID

2. Hash算法：
   - MurmurHash
   - 冲突处理
   - 不可预测

3. 雪花算法：
   - 趋势递增
   - 分布式友好

存储设计：
1. 分库分表：
   - 按短码Hash分片
   - 支持水平扩展

2. 缓存策略：
   - Redis缓存热点链接
   - 本地缓存高频链接

高并发处理：
1. 多级缓存：
   - 本地缓存(Caffeine)
   - Redis缓存
   - 数据库

2. 预热：
   - 活动前预热缓存
   - 定时刷新热点

3. 异步处理：
   - 访问统计异步写入
   - MQ削峰

防恶意访问：
1. 限流：
   - IP限流
   - 用户限流
   - 短链接限流

2. 黑名单：
   - IP黑名单
   - 用户黑名单

3. 验证码：
   - 异常访问触发
   - 人机验证

4. 链接过期：
   - 设置有效期
   - 定期清理

数据统计：
1. 访问量统计
2. 地域分布
3. 来源分析
4. 设备分析

架构示例：
用户 -> CDN -> 网关 -> 服务 -> Redis -> DB
                    ↓
                  MQ -> 统计服务

最佳实践：
1. 短码长度6-8位
2. 使用302而非301
3. 监控服务可用性
4. 做好数据备份

> 来源: 系统设计案例

> ✅ 答案已核实

---

## 问题 5

**Q: 如何设计一个高可用的API网关？核心功能有哪些？**

**A:**

API网关核心功能：

1. 路由转发：
- 动态路由
- 负载均衡
- 灰度发布

2. 安全认证：
- 身份认证
- 权限校验
- 黑白名单

3. 流量控制：
- 限流
- 熔断
- 降级

4. 协议转换：
- HTTP转RPC
- 协议适配

5. 监控统计：
- 请求日志
- 性能监控
- 调用链追踪

高可用设计：
1. 多级缓存：
   - 本地缓存路由规则
   - Redis缓存热点数据

2. 熔断降级：
   - 服务不可用时快速失败
   - 返回降级响应

3. 限流保护：
   - 令牌桶算法
   - 滑动窗口

4. 健康检查：
   - 主动探测
   - 被动检测

Spring Cloud Gateway实现：
1. 路由配置：
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/user/**
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10

2. 自定义过滤器：
@Component
public class AuthFilter implements GlobalFilter {
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (token == null) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    }
}

性能优化：
1. 使用Netty
2. 开启连接池
3. 异步非阻塞
4. 合理设置超时

其他方案：
- Kong：基于Nginx
- APISIX：云原生
- Zuul：Spring Cloud

> 来源: 微服务架构设计

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
