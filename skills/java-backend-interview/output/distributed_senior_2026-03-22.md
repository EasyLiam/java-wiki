# 分布式系统 - 高级面试题

> 生成时间: 2026-03-22 09:00:01
> 题目数量: 3

---

## 问题 1

**Q: 如何设计一个分布式链路追踪系统？**

**A:** 设计要点：1.TraceID：全局唯一，贯穿整个链路；2.SpanID：每个操作一个Span；3.ParentSpanID：关联父Span；4.采样策略：全量/百分比/自适应；5.传输协议：HTTP Header或gRPC Metadata；6.存储：ES/Cassandra；7.可视化：Jaeger/Zipkin。Java Agent方式：SkyWalking、Pinpoint无侵入接入。

---

## 问题 2

**Q: 分布式事务中的Saga模式是什么？与TCC有什么区别？**

**A:** Saga模式：将长事务拆分为多个本地事务，每个事务有补偿操作。执行：正向执行所有事务，失败时反向执行补偿。与TCC区别：1.Saga无预留资源阶段；2.Saga补偿是业务补偿，TCC是资源回滚；3.Saga适合长事务，TCC适合短事务；4.Saga实现更简单，但一致性较弱。Seata支持Saga模式。

---

## 问题 3

**Q: Raft协议的Leader选举过程是怎样的？如何避免脑裂？**

**A:** 选举过程：1.Follower超时转为Candidate；2.增加term，发起投票；3.获得多数票成为Leader；4.发送心跳维持地位。避免脑裂：1.需要多数节点同意；2.每个term只有一个Leader；3.投票时检查term和日志完整性。优化：PreVote机制避免网络分区干扰，Leader Lease机制防止旧Leader继续服务。

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端面试题技能 自动生成*
