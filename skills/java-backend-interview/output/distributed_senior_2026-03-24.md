# 分布式系统 - 高级面试题

> 生成时间: 2026-03-24 21:34:58
> 题目数量: 3

---

## 问题 1

**Q: 如何实现分布式Session？各方案优缺点？**

**A:** 方案对比：1.Redis存储：简单可靠，需要Redis高可用；2.JWT：无状态，无法主动失效，payload有限；3.Spring Session：透明集成，依赖存储；4.Sticky Session：简单，单点故障。推荐：Redis+Spring Session，支持集群、过期、事件监听。注意：Session对象需要序列化，敏感信息不要存Session。

---

## 问题 2

**Q: 分布式事务中的Saga模式是什么？与TCC有什么区别？**

**A:** Saga模式：将长事务拆分为多个本地事务，每个事务有补偿操作。执行：正向执行所有事务，失败时反向执行补偿。与TCC区别：1.Saga无预留资源阶段；2.Saga补偿是业务补偿，TCC是资源回滚；3.Saga适合长事务，TCC适合短事务；4.Saga实现更简单，但一致性较弱。Seata支持Saga模式。

---

## 问题 3

**Q: 如何设计一个分布式链路追踪系统？**

**A:** 设计要点：1.TraceID：全局唯一，贯穿整个链路；2.SpanID：每个操作一个Span；3.ParentSpanID：关联父Span；4.采样策略：全量/百分比/自适应；5.传输协议：HTTP Header或gRPC Metadata；6.存储：ES/Cassandra；7.可视化：Jaeger/Zipkin。Java Agent方式：SkyWalking、Pinpoint无侵入接入。

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端面试题技能 自动生成*
