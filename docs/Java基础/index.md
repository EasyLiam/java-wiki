# Java基础与高级特性

---

## 初级

### 1. ArrayList和LinkedList的区别是什么？

**答案：**

ArrayList基于动态数组实现，查询快O(1)，增删慢O(n)；LinkedList基于双向链表实现，查询慢O(n)，增删快O(1)。ArrayList更适合随机访问场景，LinkedList更适合频繁插入删除场景。

---

### 2. HashMap的底层实现原理？

**答案：**

JDK8中HashMap采用数组+链表+红黑树实现。当链表长度超过8且数组长度超过64时，链表转换为红黑树。通过key的hashCode计算桶位置，解决冲突使用链地址法。

---

### 3. String为什么是不可变的？

**答案：**

String类被final修饰，内部char数组也被final修饰且未提供修改方法。不可变性保证了线程安全、字符串常量池优化、hashCode缓存等优点。

---

## 中级

### 1. ConcurrentHashMap的实现原理？

**答案：**

JDK8采用CAS+synchronized保证并发安全，摒弃了JDK7的Segment分段锁。使用Node数组+链表+红黑树结构，锁粒度更细，只锁链表头节点，并发性能更高。

---

### 2. Java IO模型有哪些？BIO/NIO/AIO的区别？

**答案：**

BIO：同步阻塞IO，一个连接一个线程；NIO：同步非阻塞IO，多路复用，一个线程处理多个连接；AIO：异步非阻塞IO，操作系统完成后再回调。Netty基于NIO实现。

---

### 3. Java反射的性能问题及优化方案？

**答案：**

反射性能问题：动态解析类信息、方法调用需要额外检查。优化方案：1.缓存Method/Field对象；2.使用MethodHandle；3.使用字节码生成技术如CGLIB；4.合理使用反射，非必要不用。

---

## 高级

### 1. Java内存模型(JMM)如何保证可见性和有序性？

**答案：**

JMM通过happens-before规则保证有序性，通过volatile、synchronized、final关键字保证可见性。volatile通过内存屏障禁止指令重排序，synchronized通过锁释放强制刷新工作内存到主内存。

---

### 2. CompletableFuture的原理及应用场景？

**答案：**

CompletableFuture实现了Future和CompletionStage接口，支持链式调用和异步编排。应用场景：1.多个异步任务并行执行后合并结果；2.异步任务链式处理；3.异常处理和回滚。底层依赖ForkJoinPool。

---

### 3. Java泛型擦除机制及其影响？

**答案：**

泛型在编译时进行类型检查，运行时擦除为原始类型。影响：1.不能实例化泛型类型；2.不能创建泛型数组；3.不能使用基本类型作为泛型参数；4.方法重载需注意签名冲突。可通过反射获取部分泛型信息。

---

### 4. Java中的Fork/Join框架原理是什么？如何优化任务窃取？

**答案：**

Fork/Join基于分治思想，将大任务拆分为小任务并行执行。工作窃取：空闲线程从其他线程队列尾部窃取任务。优化：1.合理设置阈值避免任务过小；2.使用RecursiveTask/RecursiveAction；3.避免在任务中同步；4.合理设置并行度。

---

### 5. Java中的Foreign Function Interface (FFI)是什么？如何与Native代码交互？

**答案：**

FFI是Java调用非Java代码的机制。传统方式：JNI，需要编写C代码和头文件。现代方式：Panama项目，提供更简洁的API。JEP 389引入了Foreign Linker API，可以直接调用C库函数，无需JNI代码。

---

### 6. Java中的MethodHandle与反射的区别？性能如何？

**答案：**

MethodHandle是JSR-292引入的动态方法调用机制。区别：1.MethodHandle是字节码层面的，反射是API层面；2.MethodHandle支持方法内联优化；3.MethodHandle需要精确类型匹配。性能：MethodHandle比反射快，接近直接调用。

---

### 7. Java中的VarHandle是什么？与Atomic类有什么区别？

**答案：**

VarHandle是Java9引入的变量句柄，提供对变量的原子操作和内存屏障。与Atomic类区别：1.VarHandle更底层，支持更多内存模式；2.VarHandle可以操作任意字段；3.Atomic类封装更好，使用更简单。VarHandle适合需要精细控制的场景。

---

### 8. Java中的WeakReference、SoftReference、PhantomReference有什么区别？应用场景是什么？

**答案：**

WeakReference弱引用，GC时会被回收，适用于缓存；SoftReference软引用，内存不足时回收，适用于内存敏感缓存；PhantomReference虚引用，无法通过get()获取对象，用于跟踪对象回收，配合ReferenceQueue使用。

---

## 架构师

### 1. 如何设计一个高性能的Java对象池？

**答案：**

核心设计要点：1.使用ConcurrentLinkedQueue存储对象；2.对象创建使用工厂模式；3.借用使用CAS无锁操作；4.归还检测对象有效性；5.设置最大容量和最小空闲数；6.支持对象驱逐策略；7.统计监控能力。参考Netty Recycler、Apache Commons Pool。

---

### 2. Java Agent技术原理及应用场景？

**答案：**

Java Agent通过Instrumentation API在类加载时修改字节码。原理：premain/agentmain入口，ClassFileTransformer接口转换字节码。应用场景：1.APM监控如SkyWalking；2.全链路追踪；3.热部署；4.性能分析；5.代码覆盖率统计。

---

