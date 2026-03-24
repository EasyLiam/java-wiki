# 多线程与并发编程

---

## 初级

### 1. synchronized和Lock的区别？

**答案：**

synchronized是JVM层面实现，Lock是API层面实现。区别：1.Lock可中断、可超时、可公平；2.Lock支持Condition条件变量；3.Lock需要手动释放；4.synchronized自动释放锁。推荐：简单场景用synchronized，复杂场景用Lock。

---

### 2. 线程池的核心参数有哪些？

**答案：**

核心参数：1.corePoolSize核心线程数；2.maximumPoolSize最大线程数；3.keepAliveTime空闲线程存活时间；4.workQueue工作队列；5.threadFactory线程工厂；6.handler拒绝策略。

---

## 中级

### 1. AQS的实现原理？

**答案：**

AQS(AbstractQueuedSynchronizer)是JUC核心基础框架。原理：1.state变量表示同步状态；2.CLH双向队列存储等待线程；3.CAS操作state；4.独占/共享两种模式。ReentrantLock、CountDownLatch等都基于AQS实现。

---

### 2. ThreadLocal的原理和内存泄漏问题？

**答案：**

ThreadLocal原理：每个Thread持有ThreadLocalMap，key为ThreadLocal弱引用，value为线程私有数据。内存泄漏原因：key弱引用被回收后value无法访问。解决方案：1.使用后调用remove()；2.ThreadLocal设为static；3.使用InheritableThreadLocal传递给子线程。

---

## 高级

### 1. ConcurrentHashMap在JDK8中的优化？

**答案：**

JDK8优化：1.取消Segment分段锁，改用CAS+synchronized；2.锁粒度从段级别降到桶级别；3.链表转红黑树(&gt;8)；4.扩容时多线程协同；5.size()使用LongAdder思想。性能提升明显，尤其是高并发写场景。

---

### 2. 如何设计一个高性能的异步任务执行框架？

**答案：**

设计要点：1.线程池隔离，不同类型任务用不同线程池；2.任务队列使用有界队列防止OOM；3.拒绝策略自定义(降级/重试)；4.任务超时控制；5.结果异步回调；6.监控统计(执行时间/成功率)；7.优雅停机。参考CompletableFuture、Netty EventLoop。

---

### 3. 如何实现一个支持优先级的线程池？

**答案：**

实现方案：1.使用PriorityBlockingQueue作为任务队列；2.任务实现Comparable接口或提供Comparator；3.注意：PriorityBlockingQueue是无界的，需要自定义有界优先队列或使用Semaphore限流。Spring提供ThreadPoolTaskExecutor支持自定义队列。

---

### 4. Java中的StampedLock与ReentrantReadWriteLock有什么区别？

**答案：**

StampedLock特点：1.支持乐观读，无锁读取；2.不可重入；3.支持锁转换(乐观读-&gt;悲观读)；4.性能更好。ReentrantReadWriteLock特点：1.可重入；2.支持公平/非公平；3.支持Condition。选择：读多写少且不需要重入用StampedLock，需要重入用ReadWriteLock。

---

### 5. Java中的LongAdder与AtomicLong有什么区别？性能差异原因？

**答案：**

LongAdder在高并发下性能更好。原理：LongAdder使用分段累加，每个线程更新自己的Cell，最后sum汇总。AtomicLong使用CAS单点更新，高并发时竞争激烈。适用场景：LongAdder适合计数统计，AtomicLong需要精确控制或CAS操作时使用。

---

### 6. Java中的ForkJoinPool与ThreadPoolExecutor有什么区别？

**答案：**

ForkJoinPool特点：1.工作窃取算法，负载均衡；2.适合分治任务；3.支持RecursiveTask/RecursiveAction。ThreadPoolExecutor特点：1.共享任务队列；2.适合独立任务；3.需要手动分片。选择：递归分治任务用ForkJoinPool，独立任务用ThreadPoolExecutor。

---

### 7. Java中的VarHandle在并发编程中有什么应用？

**答案：**

VarHandle提供原子操作和内存屏障。应用：1.实现自定义原子类；2.精确控制内存可见性(release/acquire模式)；3.实现高性能并发数据结构；4.替代Unsafe类。示例：VarHandle.compareAndSet实现CAS，VarHandle.setRelease实现写屏障。

---

## 架构师

### 1. 高并发场景下如何优化锁竞争？

**答案：**

优化策略：1.减小锁粒度(分段锁、细粒度锁)；2.锁分离(读写锁、StampedLock)；3.无锁设计(CAS、ThreadLocal)；4.乐观锁替代悲观锁；5.锁消除和锁粗化；6.分布式锁本地化缓存；7.异步化处理解耦。案例：LongAdder分段计数、ConcurrentHashMap桶级锁。

---

### 2. 如何实现一个高性能的分布式限流器？

**答案：**

实现方案：1.令牌桶算法：Redis+Lua脚本原子操作；2.滑动窗口：Redis ZSET存储时间戳；3.漏桶算法：消息队列削峰。优化点：1.本地缓存+异步同步减少Redis访问；2.批量预取令牌；3.热点Key分片；4.降级策略。参考Guava RateLimiter、Sentinel、Resilience4j。

---

