# 多线程与并发编程 - 高级面试题

> 生成时间: 2026-03-20 09:06:01
> 题目数量: 3

---

## 问题 1

**Q: 如何实现一个支持优先级的线程池？**

**A:** 实现方案：1.使用PriorityBlockingQueue作为任务队列；2.任务实现Comparable接口或提供Comparator；3.注意：PriorityBlockingQueue是无界的，需要自定义有界优先队列或使用Semaphore限流。Spring提供ThreadPoolTaskExecutor支持自定义队列。

---

## 问题 2

**Q: Java中的StampedLock与ReentrantReadWriteLock有什么区别？**

**A:** StampedLock特点：1.支持乐观读，无锁读取；2.不可重入；3.支持锁转换(乐观读->悲观读)；4.性能更好。ReentrantReadWriteLock特点：1.可重入；2.支持公平/非公平；3.支持Condition。选择：读多写少且不需要重入用StampedLock，需要重入用ReadWriteLock。

---

## 问题 3

**Q: Java中的LongAdder与AtomicLong有什么区别？性能差异原因？**

**A:** LongAdder在高并发下性能更好。原理：LongAdder使用分段累加，每个线程更新自己的Cell，最后sum汇总。AtomicLong使用CAS单点更新，高并发时竞争激烈。适用场景：LongAdder适合计数统计，AtomicLong需要精确控制或CAS操作时使用。

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端面试题技能 自动生成*
