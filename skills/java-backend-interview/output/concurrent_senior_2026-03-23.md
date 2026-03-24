# 多线程与并发编程 - 高级面试题

> 生成时间: 2026-03-23 09:00:01
> 题目数量: 3

---

## 问题 1

**Q: Java中的LongAdder与AtomicLong有什么区别？性能差异原因？**

**A:** LongAdder在高并发下性能更好。原理：LongAdder使用分段累加，每个线程更新自己的Cell，最后sum汇总。AtomicLong使用CAS单点更新，高并发时竞争激烈。适用场景：LongAdder适合计数统计，AtomicLong需要精确控制或CAS操作时使用。

---

## 问题 2

**Q: 如何实现一个支持优先级的线程池？**

**A:** 实现方案：1.使用PriorityBlockingQueue作为任务队列；2.任务实现Comparable接口或提供Comparator；3.注意：PriorityBlockingQueue是无界的，需要自定义有界优先队列或使用Semaphore限流。Spring提供ThreadPoolTaskExecutor支持自定义队列。

---

## 问题 3

**Q: Java中的ForkJoinPool与ThreadPoolExecutor有什么区别？**

**A:** ForkJoinPool特点：1.工作窃取算法，负载均衡；2.适合分治任务；3.支持RecursiveTask/RecursiveAction。ThreadPoolExecutor特点：1.共享任务队列；2.适合独立任务；3.需要手动分片。选择：递归分治任务用ForkJoinPool，独立任务用ThreadPoolExecutor。

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端面试题技能 自动生成*
