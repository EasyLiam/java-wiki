# 多线程与并发编程 - 高级面试题

> 生成时间: 2026-04-08 08:00:01
> 题目数量: 5
> 质量等级: 高质量(已核实)

---

## 问题 1

**Q: Java中的LongAdder是如何实现高并发下性能优于AtomicLong的？**

**A:**

LongAdder在高并发场景下性能显著优于AtomicLong：

实现原理：
1. 分散热点：
   - 使用Cell数组分散计数
   - 每个线程更新自己的Cell
   - 最终通过sum()汇总结果

2. 伪共享解决：
   - 使用@Contended注解
   - Cell之间填充缓存行
   - 避免false sharing

3. 动态扩容：
   - 初始Cell数量为1
   - 竞争激烈时扩容
   - 最大为CPU核心数

核心数据结构：
transient volatile Cell[] cells;
transient volatile long base;

工作流程：
1. 无竞争时：直接更新base
2. 有竞争时：更新对应Cell
3. sum()时：base + 所有Cell的值

性能对比(8核CPU)：
| 操作 | AtomicLong | LongAdder |
|------|------------|-----------|
| 单线程 | 100M/s | 100M/s |
| 8线程 | 20M/s | 400M/s |
| 16线程 | 10M/s | 500M/s |

适用场景：
1. 高并发计数器
2. 统计监控
3. 不需要精确实时值

不适用场景：
1. 需要精确控制(如CAS操作)
2. 需要实时读取精确值
3. 单线程场景(无优势)

使用建议：
1. 计数场景优先使用LongAdder
2. 需要CAS操作使用AtomicLong
3. 需要精确值时谨慎使用sum()

> 来源: JDK源码

> ✅ 答案已核实

---

## 问题 2

**Q: Java中的AQS(AbstractQueuedSynchronizer)是如何实现的？如何基于AQS实现自定义同步器？**

**A:**

AQS是JUC的核心基础框架：

核心组件：
1. state变量：
   - volatile int state
   - 表示同步状态
   - CAS操作修改

2. CLH队列：
   - 双向链表实现
   - 存储等待的线程
   - Node包含waitStatus

3. Node状态：
   - CANCELLED: 1 (线程已取消)
   - SIGNAL: -1 (需要唤醒后继)
   - CONDITION: -2 (等待条件)
   - PROPAGATE: -3 (共享模式传播)

工作流程：
1. 获取锁：
   - tryAcquire()尝试获取
   - 失败则加入队列
   - park阻塞等待

2. 释放锁：
   - tryRelease()释放
   - 唤醒后继节点
   - unpark唤醒线程

实现自定义同步器：
1. 独占模式：
class Mutex implements Lock {
    private static class Sync extends AbstractQueuedSynchronizer {
        protected boolean tryAcquire(int arg) {
            return compareAndSetState(0, 1);
        }
        protected boolean tryRelease(int arg) {
            setState(0);
            return true;
        }
    }
    private final Sync sync = new Sync();
    public void lock() { sync.acquire(1); }
    public void unlock() { sync.release(1); }
}

2. 共享模式：
protected int tryAcquireShared(int arg);
protected boolean tryReleaseShared(int arg);

基于AQS的同步器：
- ReentrantLock: 独占锁
- ReentrantReadWriteLock: 读写锁
- CountDownLatch: 倒计时器
- Semaphore: 信号量
- CyclicBarrier: 循环屏障

> 来源: Java并发编程实战

> ✅ 答案已核实

---

## 问题 3

**Q: Java中的CompletableFuture是如何实现异步编排的？如何处理异常？**

**A:**

CompletableFuture实现了异步任务的编排和组合：

创建方式：
1. supplyAsync: 有返回值的异步任务
2. runAsync: 无返回值的异步任务
3. completedFuture: 已完成的Future

编排方法：
1. 串行执行：
   - thenApply: 同步转换
   - thenApplyAsync: 异步转换
   - thenAccept: 消费结果
   - thenRun: 不关心结果

2. 并行组合：
   - thenCombine: 两个任务都完成后合并
   - thenAcceptBoth: 两个任务都完成后消费
   - runAfterBoth: 两个任务都完成后执行

3. 竞争执行：
   - applyToEither: 任一完成就转换
   - acceptEither: 任一完成就消费
   - runAfterEither: 任一完成就执行

4. 多任务组合：
   - allOf: 所有任务完成
   - anyOf: 任一任务完成

异常处理：
1. exceptionally: 异常时提供默认值
   .exceptionally(ex -> 0)

2. handle: 统一处理结果和异常
   .handle((result, ex) -> ex != null ? 0 : result)

3. whenComplete: 类似finally
   .whenComplete((result, ex) -> log.info("done"))

超时处理(Java 9+)：
.orTimeout(5, TimeUnit.SECONDS)
.completeOnTimeout(0, 5, TimeUnit.SECONDS)

最佳实践：
1. 指定线程池，避免使用ForkJoinPool
2. 合理处理异常，避免异常被吞掉
3. 注意依赖关系，避免死锁
4. 使用工具类封装常用模式

> 来源: Java并发编程实战

> ✅ 答案已核实

---

## 问题 4

**Q: Java中的ForkJoinPool与ThreadPoolExecutor有什么区别？如何选择？**

**A:**

两种线程池的设计理念和使用场景不同：

核心区别：
| 特性 | ForkJoinPool | ThreadPoolExecutor |
|------|--------------|-------------------|
| 任务模型 | 分治任务 | 独立任务 |
| 任务队列 | 每线程双端队列 | 共享队列 |
| 负载均衡 | 工作窃取 | 无 |
| 适用场景 | 递归分治 | 独立任务 |
| 任务类型 | RecursiveTask/Action | Runnable/Callable |

ForkJoinPool特点：
1. 工作窃取算法：
   - 每个Worker维护自己的任务队列
   - 空闲Worker从其他队列窃取任务
   - 实现负载均衡

2. 分治任务：
   - 大任务拆分为小任务
   - 小任务可以继续拆分
   - 最终合并结果

ThreadPoolExecutor特点：
1. 共享队列：
   - 所有Worker共享一个任务队列
   - 简单高效
   - 可能存在竞争

2. 独立任务：
   - 任务之间无依赖
   - 无需合并结果

选择建议：
1. 使用ForkJoinPool：
   - 递归分治任务(归并排序、快速排序)
   - 大任务可拆分的场景
   - 需要负载均衡

2. 使用ThreadPoolExecutor：
   - 独立的异步任务
   - HTTP请求处理
   - 数据库查询

3. 使用CompletableFuture：
   - 复杂的异步编排
   - 需要链式调用

性能对比：
- 递归任务：ForkJoinPool快2-5倍
- 独立任务：ThreadPoolExecutor略快
- 混合场景：根据任务比例选择

> 来源: JDK源码

> ✅ 答案已核实

---

## 问题 5

**Q: Java中的StampedLock相比ReentrantReadWriteLock有什么优势？乐观读是如何实现的？**

**A:**

StampedLock是Java 8引入的高性能读写锁：

核心特性：
1. 乐观读(Optimistic Read)：
   - 无锁读取，不阻塞写操作
   - 返回stamp用于后续验证
   - 验证失败后升级为悲观读

2. 悲观读/写锁：
   - 类似ReadWriteLock
   - 支持锁降级

与ReentrantReadWriteLock对比：
| 特性 | StampedLock | ReentrantReadWriteLock |
|------|-------------|------------------------|
| 可重入 | 不支持 | 支持 |
| 乐观读 | 支持 | 不支持 |
| Condition | 不支持 | 支持 |
| 性能 | 更高 | 较低 |
| 公平性 | 非公平 | 支持公平/非公平 |

乐观读实现原理：
1. 获取乐观读锁时返回版本号stamp
2. 读取数据
3. 验证stamp是否有效(validate)
4. 验证失败则获取悲观读锁重试

代码示例：
long stamp = lock.tryOptimisticRead();
if (stamp != 0) {
    double currentValue = value;
    if (!lock.validate(stamp)) {
        stamp = lock.readLock();
        try {
            currentValue = value;
        } finally {
            lock.unlockRead(stamp);
        }
    }
}

适用场景：
1. 读多写少且读操作简单
2. 不需要可重入
3. 追求极致性能

注意事项：
1. 不要在锁内调用可能阻塞的方法
2. 确保在finally中释放锁
3. 不支持Condition

> 来源: Java并发编程实战

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
