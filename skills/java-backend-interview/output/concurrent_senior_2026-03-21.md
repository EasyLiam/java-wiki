# 多线程与并发编程 - 高级面试题

> 生成时间: 2026-03-21 09:00:01
> 题目数量: 3

---

## 问题 1

**Q: Java中的StampedLock与ReentrantReadWriteLock有什么区别？**

**A:** StampedLock特点：1.支持乐观读，无锁读取；2.不可重入；3.支持锁转换(乐观读->悲观读)；4.性能更好。ReentrantReadWriteLock特点：1.可重入；2.支持公平/非公平；3.支持Condition。选择：读多写少且不需要重入用StampedLock，需要重入用ReadWriteLock。

---

## 问题 2

**Q: Java中的ForkJoinPool与ThreadPoolExecutor有什么区别？**

**A:** ForkJoinPool特点：1.工作窃取算法，负载均衡；2.适合分治任务；3.支持RecursiveTask/RecursiveAction。ThreadPoolExecutor特点：1.共享任务队列；2.适合独立任务；3.需要手动分片。选择：递归分治任务用ForkJoinPool，独立任务用ThreadPoolExecutor。

---

## 问题 3

**Q: Java中的VarHandle在并发编程中有什么应用？**

**A:** VarHandle提供原子操作和内存屏障。应用：1.实现自定义原子类；2.精确控制内存可见性(release/acquire模式)；3.实现高性能并发数据结构；4.替代Unsafe类。示例：VarHandle.compareAndSet实现CAS，VarHandle.setRelease实现写屏障。

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端面试题技能 自动生成*
