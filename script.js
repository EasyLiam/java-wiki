// 题库数据

const topics = [
    {
        id: 'java',
        name: 'Java基础',
        icon: 'fab fa-java',
        description: 'Java语法基础、集合框架、IO、反射等核心基础知识',
        count: 21,
        color: '#007396'
    },
    {
        id: 'jvm',
        name: 'JVM原理',
        icon: 'fas fa-microchip',
        description: '内存模型、垃圾回收、类加载、性能调优',
        count: 18,
        color: '#F59E0B'
    },
    {
        id: 'concurrent',
        name: '并发编程',
        icon: 'fas fa-tasks',
        description: '多线程、锁机制、JUC并发包、原子类',
        count: 21,
        color: '#8B5CF6'
    },
    {
        id: 'spring',
        name: 'Spring全家桶',
        icon: 'fas fa-leaf',
        description: 'Spring IoC/AOP、Boot、Cloud、Security',
        count: 22,
        color: '#6DB33F'
    },
    {
        id: 'database',
        name: '数据库',
        icon: 'fas fa-database',
        description: 'MySQL索引、事务、优化、锁机制',
        count: 20,
        color: '#4479A1'
    },
    {
        id: 'cache',
        name: '缓存技术',
        icon: 'fas fa-bolt',
        description: 'Redis缓存架构、数据结构、缓存问题',
        count: 21,
        color: '#DC382D'
    },
    {
        id: 'distributed',
        name: '分布式系统',
        icon: 'fas fa-network-wired',
        description: '微服务、分布式事务、消息队列、一致性',
        count: 21,
        color: '#1E40AF'
    },
    {
        id: 'design',
        name: '系统设计',
        icon: 'fas fa-sitemap',
        description: '高并发、高可用、架构设计、面试题',
        count: 21,
        color: '#EC4899'
    },
];

const questions = {
    java: [
        {
            question: 'ArrayList和LinkedList的区别是什么？',
            answer: 'ArrayList基于动态数组实现，查询快O(1)，增删慢O(n)；LinkedList基于双向链表实现，查询慢O(n)，增删快O(1)。ArrayList更适合随机访问场景，LinkedList更适合频繁插入删除场景。'
        },
        {
            question: 'HashMap的底层实现原理？',
            answer: 'JDK8中HashMap采用数组+链表+红黑树实现。当链表长度超过8且数组长度超过64时，链表转换为红黑树。通过key的hashCode计算桶位置，解决冲突使用链地址法。'
        },
        {
            question: 'String为什么是不可变的？',
            answer: 'String类被final修饰，内部char数组也被final修饰且未提供修改方法。不可变性保证了线程安全、字符串常量池优化、hashCode缓存等优点。'
        },
        {
            question: 'ConcurrentHashMap的实现原理？',
            answer: 'JDK8采用CAS+synchronized保证并发安全，摒弃了JDK7的Segment分段锁。使用Node数组+链表+红黑树结构，锁粒度更细，只锁链表头节点，并发性能更高。'
        },
        {
            question: 'Java IO模型有哪些？BIO/NIO/AIO的区别？',
            answer: 'BIO：同步阻塞IO，一个连接一个线程；NIO：同步非阻塞IO，多路复用，一个线程处理多个连接；AIO：异步非阻塞IO，操作系统完成后再回调。Netty基于NIO实现。'
        },
        {
            question: 'Java反射的性能问题及优化方案？',
            answer: '反射性能问题：动态解析类信息、方法调用需要额外检查。优化方案：1.缓存Method/Field对象；2.使用MethodHandle；3.使用字节码生成技术如CGLIB；4.合理使用反射，非必要不用。'
        },
        {
            question: 'Java内存模型(JMM)如何保证可见性和有序性？',
            answer: 'JMM通过happens-before规则保证有序性，通过volatile、synchronized、final关键字保证可见性。volatile通过内存屏障禁止指令重排序，synchronized通过锁释放强制刷新工作内存到主内存。'
        },
        {
            question: 'CompletableFuture的原理及应用场景？',
            answer: 'CompletableFuture实现了Future和CompletionStage接口，支持链式调用和异步编排。应用场景：1.多个异步任务并行执行后合并结果；2.异步任务链式处理；3.异常处理和回滚。底层依赖ForkJoinPool。'
        },
        {
            question: 'Java泛型擦除机制及其影响？',
            answer: '泛型在编译时进行类型检查，运行时擦除为原始类型。影响：1.不能实例化泛型类型；2.不能创建泛型数组；3.不能使用基本类型作为泛型参数；4.方法重载需注意签名冲突。可通过反射获取部分泛型信息。'
        },
        {
            question: 'Java中的Fork/Join框架原理是什么？如何优化任务窃取？',
            answer: 'Fork/Join基于分治思想，将大任务拆分为小任务并行执行。工作窃取：空闲线程从其他线程队列尾部窃取任务。优化：1.合理设置阈值避免任务过小；2.使用RecursiveTask/RecursiveAction；3.避免在任务中同步；4.合理设置并行度。'
        },
        {
            question: 'Java中的Foreign Function Interface (FFI)是什么？如何与Native代码交互？',
            answer: 'FFI是Java调用非Java代码的机制。传统方式：JNI，需要编写C代码和头文件。现代方式：Panama项目，提供更简洁的API。JEP 389引入了Foreign Linker API，可以直接调用C库函数，无需JNI代码。'
        },
        {
            question: 'Java中的MethodHandle与反射的区别？性能如何？',
            answer: 'MethodHandle是JSR-292引入的动态方法调用机制。区别：1.MethodHandle是字节码层面的，反射是API层面；2.MethodHandle支持方法内联优化；3.MethodHandle需要精确类型匹配。性能：MethodHandle比反射快，接近直接调用。'
        },
        {
            question: 'Java中的VarHandle是什么？与Atomic类有什么区别？',
            answer: 'VarHandle是Java9引入的变量句柄，提供对变量的原子操作和内存屏障。与Atomic类区别：1.VarHandle更底层，支持更多内存模式；2.VarHandle可以操作任意字段；3.Atomic类封装更好，使用更简单。VarHandle适合需要精细控制的场景。'
        },
        {
            question: 'Java中的WeakReference、SoftReference、PhantomReference有什么区别？应用场景是什么？',
            answer: 'WeakReference弱引用，GC时会被回收，适用于缓存；SoftReference软引用，内存不足时回收，适用于内存敏感缓存；PhantomReference虚引用，无法通过get()获取对象，用于跟踪对象回收，配合ReferenceQueue使用。'
        },
        {
            question: 'Java中的MethodHandle与反射相比有什么优势？底层实现有何不同？',
            answer: 'MethodHandle是JSR-292引入的动态方法调用机制，相比反射有以下优势：  底层实现差异： 1. 反射是Java API层面实现，MethodHandle是字节码层面实现 2. MethodHandle在JIT编译后可以进行方法内联优化 3. 反射每次调用都需要安全检查，MethodHandle在创建时完成检查  性能对比： - 反射调用：~100ns/op - MethodHandle调用：~10ns/op - 直接调用：~1ns/op  使用场景： 1. MethodHandle适合高性能动态调用场景 2. 反射适合框架开发、依赖注入等场景 3. VarHandle是MethodHandle的扩展，支持字段操作  代码示例： MethodHandles.Lookup lookup = MethodHandles.lookup(); MethodHandle mh = lookup.findVirtual(String.class, \"length\", MethodType.methodType(int.class)); int len = (int) mh.invokeExact(\"hello\");'
        },
        {
            question: 'Java中的VarHandle是什么？它如何替代Unsafe？有什么性能优势？',
            answer: 'VarHandle是Java 9引入的变量句柄，用于替代Unsafe类：  核心功能： 1. 原子操作：compareAndSet, weakCompareAndSet, getAndSet 2. 内存屏障：setRelease, setVolatile, getAcquire, getVolatile 3. 位操作：getAndBitwiseOr, getAndBitwiseAnd 4. 数值操作：getAndAdd, getAndIncrement  与Unsafe对比： 1. 安全性：VarHandle是官方API，Unsafe是内部API 2. 功能：VarHandle支持更多内存模式(acquire/release/opaque) 3. 性能：VarHandle经过JIT优化，性能接近Unsafe  内存访问模式： 1. Plain：普通读写，无内存语义 2. Opaque：保证可见性，不保证顺序 3. Acquire/Release：保证happens-before关系 4. Volatile：完全的volatile语义  使用示例： VarHandle ARRAY_HANDLE = MethodHandles.arrayElementVarHandle(int[].class); int[] array = new int[10]; ARRAY_HANDLE.setVolatile(array, 0, 42); int value = (int) ARRAY_HANDLE.getVolatile(array, 0);  应用场景： 1. 实现高性能并发数据结构 2. 替代Unsafe进行内存操作 3. 精细控制内存可见性'
        },
        {
            question: 'Java中的Project Loom虚拟线程是如何实现的？与传统线程有什么区别？',
            answer: 'Virtual Thread是Project Loom引入的轻量级线程：  实现原理： 1. 基于用户态线程实现，由JVM调度而非OS 2. 使用Continuation作为基础，支持挂起和恢复 3. 遇到阻塞操作时自动挂起，释放载体线程 4. 阻塞结束后自动恢复执行  与传统线程对比： | 特性 | Virtual Thread | Platform Thread | |------|----------------|-----------------| | 创建成本 | 极低(~1KB) | 高(~1MB栈空间) | | 调度方式 | JVM调度 | OS调度 | | 数量限制 | 百万级 | 千级 | | 阻塞行为 | 挂起释放载体线程 | 阻塞OS线程 |  使用方式： // 创建虚拟线程 Thread.startVirtualThread(() -> { ... });  // 使用ExecutorService try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {     executor.submit(() -> { ... }); }  适用场景： 1. 大量阻塞IO操作（HTTP请求、数据库查询） 2. 高并发但CPU密集度不高的场景 3. 需要简化异步代码的场景  注意事项： 1. 不要池化虚拟线程 2. 避免synchronized阻塞（使用ReentrantLock） 3. ThreadLocal可能占用大量内存 4. CPU密集型任务不适合使用虚拟线程'
        },
        {
            question: 'Java中的ForkJoinPool工作窃取算法是如何实现的？如何优化任务分配？',
            answer: '工作窃取(Work-Stealing)算法实现原理：  核心数据结构： 1. 每个Worker线程维护一个双端队列(Deque) 2. 新任务从队列头部入队(LIFO) 3. 本线程从头部取任务执行 4. 空闲线程从其他线程队列尾部窃取任务(FIFO)  实现细节： 1. 使用数组实现的双端队列，支持高效push/pop 2. 使用CAS保证窃取操作的线程安全 3. 窃取失败时进行随机退避  优化策略： 1. 任务粒度控制：避免任务过小导致窃取开销过大 2. 任务提交策略：大任务提交到公共队列，小任务提交到当前线程队列 3. 并行度设置：parallelism = CPU核心数 * (1 + 等待时间/计算时间) 4. 使用RecursiveTask/RecursiveAction而非直接继承ForkJoinTask  注意事项： 1. 避免在任务中使用同步阻塞操作 2. 不要在任务中抛出未捕获异常 3. 合理设置任务阈值，避免任务过小  性能对比： - 传统线程池：高竞争时吞吐量下降明显 - ForkJoinPool：负载均衡，吞吐量稳定'
        },
        {
            question: 'Java中的Reference类型有哪些？它们在GC中的行为如何？',
            answer: 'Java有四种引用类型： 1. StrongReference（强引用）：默认引用类型，GC不会回收，即使内存不足抛出OOM。 2. SoftReference（软引用）：内存不足时会被回收，适合实现内存敏感缓存。使用场景：图片缓存、网页缓存。 3. WeakReference（弱引用）：GC时无论内存是否充足都会回收，适合实现规范化映射。使用场景：WeakHashMap、ThreadLocal的key。 4. PhantomReference（虚引用）：无法通过get()获取对象，必须配合ReferenceQueue使用，用于跟踪对象回收。使用场景：堆外内存回收监控。  引用队列(ReferenceQueue)：软引用和弱引用在被回收前会加入队列，虚引用在回收后加入队列。'
        },
        {
            question: '如何设计一个高性能的Java对象池？',
            answer: '核心设计要点：1.使用ConcurrentLinkedQueue存储对象；2.对象创建使用工厂模式；3.借用使用CAS无锁操作；4.归还检测对象有效性；5.设置最大容量和最小空闲数；6.支持对象驱逐策略；7.统计监控能力。参考Netty Recycler、Apache Commons Pool。'
        },
        {
            question: 'Java Agent技术原理及应用场景？',
            answer: 'Java Agent通过Instrumentation API在类加载时修改字节码。原理：premain/agentmain入口，ClassFileTransformer接口转换字节码。应用场景：1.APM监控如SkyWalking；2.全链路追踪；3.热部署；4.性能分析；5.代码覆盖率统计。'
        },
    ],
    jvm: [
        {
            question: 'JVM内存结构包含哪些部分？',
            answer: 'JVM内存结构：1.堆(Heap)：存放对象实例；2.方法区(Metaspace)：存放类信息、常量、静态变量；3.程序计数器：记录执行位置；4.虚拟机栈：方法调用栈帧；5.本地方法栈：Native方法栈帧。'
        },
        {
            question: '什么是GC？为什么需要垃圾回收？',
            answer: 'GC(Garbage Collection)是自动内存管理机制。需要GC的原因：1.避免内存泄漏；2.释放无用对象内存；3.减轻程序员负担。GC主要回收堆内存，判断对象存活使用可达性分析算法。'
        },
        {
            question: 'CMS垃圾收集器的工作原理？',
            answer: 'CMS(Concurrent Mark Sweep)采用标记-清除算法，分为4个阶段：1.初始标记(STW)；2.并发标记；3.重新标记(STW)；4.并发清除。优点：低停顿；缺点：CPU敏感、内存碎片、浮动垃圾。'
        },
        {
            question: 'JVM类加载过程是怎样的？',
            answer: '类加载过程：1.加载：读取class文件到内存；2.验证：校验字节码正确性；3.准备：为静态变量分配内存并赋默认值；4.解析：符号引用转直接引用；5.初始化：执行<clinit>方法。双亲委派模型保证类唯一性。'
        },
        {
            question: 'G1垃圾收集器的设计理念和实现原理？',
            answer: 'G1(Garbage First)将堆划分为多个Region，可预测停顿时间。核心机制：1.Region分区设计；2.优先回收垃圾最多的Region；3.标记-整理+复制算法；4.SATB并发标记；5.可预测停顿模型。适合大内存、多核CPU场景。'
        },
        {
            question: 'JVM调优的思路和常用参数？',
            answer: '调优思路：1.监控分析GC日志；2.确定目标(低延迟/高吞吐)；3.调整堆大小和比例；4.选择合适收集器。常用参数：-Xms/-Xmx堆大小、-XX:NewRatio新生代比例、-XX:+UseG1GC、-XX:MaxGCPauseMillis最大停顿时间。'
        },
        {
            question: '如何分析和解决Metaspace内存泄漏问题？',
            answer: 'Metaspace存储类元数据。泄漏原因：1.动态代理生成大量类；2.JSP/热部署加载大量类；3.反射缓存未清理。排查：jmap -clstats查看类加载情况，-XX:+TraceClassLoading跟踪类加载。解决：限制动态代理、清理反射缓存、增大Metaspace。'
        },
        {
            question: 'JVM中的逃逸分析(Escape Analysis)能做什么优化？',
            answer: '逃逸分析判断对象是否逃逸出方法或线程。优化：1.栈上分配：不逃逸对象在栈上分配，无需GC；2.标量替换：将对象拆解为标量变量；3.锁消除：不逃逸对象上的锁可以消除。开启参数：-XX:+DoEscapeAnalysis。'
        },
        {
            question: 'JVM中的JFR(Java Flight Recorder)如何用于生产环境诊断？',
            answer: 'JFR是低开销的事件记录框架。使用：1.启动时添加-XX:StartFlightRecording参数；2.jcmd命令动态控制；3.JMC(JDK Mission Control)分析数据。可记录：GC、锁竞争、IO、CPU使用等。开销<1%，适合生产环境。'
        },
        {
            question: 'JVM中的Graal编译器有什么优势？',
            answer: 'Graal是用Java编写的JIT编译器。优势：1.更好的优化能力，支持部分逃逸分析；2.与GraalVM配合支持多语言；3.可插拔架构，易于扩展；4.AOT编译支持，提升启动速度。缺点：编译耗时较长，内存占用高。'
        },
        {
            question: 'JVM中的JIT编译器C1和C2有什么区别？如何选择？',
            answer: 'C1(Client编译器)：快速编译，优化较少，适合启动速度敏感的应用；C2(Server编译器)：编译慢，优化激进，适合长期运行的服务端应用。分层编译(Tiered Compilation)：先C1编译，热点代码再C2编译，兼顾启动速度和峰值性能。'
        },
        {
            question: 'JVM的逃逸分析(Escape Analysis)能做哪些优化？什么情况下会失效？',
            answer: '逃逸分析判断对象是否逃逸出方法或线程：  优化类型： 1. 栈上分配(Stack Allocation)：    - 对象不逃逸时直接在栈上分配    - 无需GC，方法结束自动回收    - 减少堆内存压力  2. 标量替换(Scalar Replacement)：    - 将对象拆解为标量变量    - 进一步优化为寄存器分配    - 完全消除对象分配  3. 锁消除(Lock Elision)：    - 对象不逃逸时消除同步锁    - 减少锁竞争开销  失效场景： 1. 对象被返回或赋值给静态变量 2. 对象作为参数传递给其他方法 3. 对象被线程共享 4. 对象在循环中创建且循环外使用 5. 编译器无法确定逃逸状态  查看优化效果： -XX:+PrintEscapeAnalysis (JDK8) -XX:+PrintEliminateAllocations  参数设置： -XX:+DoEscapeAnalysis (默认开启) -XX:+EliminateAllocations (默认开启) -XX:+EliminateLocks (默认开启)  性能提升： - 栈上分配：减少50-90%的GC时间 - 标量替换：提升10-30%的计算性能 - 锁消除：减少20-50%的同步开销'
        },
        {
            question: 'JVM的ZGC垃圾收集器是如何实现亚毫秒级停顿的？',
            answer: 'ZGC(Zero Garbage Collection)的设计目标：<10ms停顿，支持TB级堆：  核心技术： 1. 着色指针(Colored Pointers)：    - 在指针中存储标记信息    - 使用64位指针的高位存储颜色位    - 颜色位：Finalizable, Remapped, Marked1, Marked0  2. 读屏障(Load Barrier)：    - 加载引用时检查指针颜色    - 如果指针颜色不正确，执行修复    - 修复过程中对象可能被重定位  3. 并发重定位：    - 重定位阶段与应用线程并发执行    - 使用转发表(Forwarding Table)记录新位置    - 读屏障自动更新引用  工作阶段： 1. 初始标记(STW)：标记GC Roots 2. 并发标记：遍历对象图 3. 再标记(STW)：处理少量变更 4. 并发转移准备：分析需要转移的区域 5. 初始转移(STW)：转移根对象 6. 并发转移：转移剩余对象  关键参数： -XX:+UseZGC (启用ZGC) -XX:ZCollectionInterval=5 (GC间隔秒数) -XX:ZAllocationSpikeTolerance=2 (分配峰值容忍度)  适用场景： 1. 大内存应用(>16GB) 2. 低延迟要求(<10ms) 3. 实时交易系统  限制： 1. JDK 15+才生产可用 2. 不支持压缩指针(需要更多内存) 3. 吞吐量略低于G1'
        },
        {
            question: 'JVM的Graal编译器相比C2有什么优势？GraalVM有什么特点？',
            answer: 'Graal是用Java编写的JIT编译器：  相比C2的优势： 1. 更好的优化能力：    - 部分逃逸分析(Partial Escape Analysis)    - 更激进的内联策略    - 更好的循环优化  2. 可维护性：    - Java编写，易于调试和扩展    - 模块化架构    - 活跃的社区支持  3. 多语言支持：    - Truffle框架支持多语言    - 语言间互操作  GraalVM特点： 1. 多语言运行时：    - 支持Java, JavaScript, Python, Ruby, R    - 语言间零开销调用    - 多语言调试  2. Native Image：    - AOT编译为本地可执行文件    - 启动时间<50ms    - 内存占用<50MB    - 适合云原生和Serverless  3. Polyglot API：    Context context = Context.create();    context.eval(\"js\", \"console.log(\'Hello\')\");  使用场景： 1. 高性能Java应用：使用Graal编译器 2. 多语言应用：使用GraalVM 3. 云原生应用：使用Native Image 4. 微服务：快速启动和低内存  限制： 1. 编译时间比C2长 2. Native Image不支持所有Java特性 3. 动态类加载需要特殊配置'
        },
        {
            question: '如何使用JFR(Java Flight Recorder)进行生产环境性能诊断？',
            answer: 'JFR是低开销(<1%)的生产环境诊断工具：  启用方式： 1. 启动时启用：    -XX:StartFlightRecording=duration=60s,filename=recording.jfr  2. 运行时启用：    jcmd <pid> JFR.start duration=60s filename=recording.jfr  3. 动态控制：    jcmd <pid> JFR.dump filename=dump.jfr    jcmd <pid> JFR.stop  关键事件类型： 1. CPU相关：    - CPULoad: CPU使用率    - MethodProfiling: 方法采样    - ExecutionSample: 执行采样  2. 内存相关：    - GCHeapSummary: 堆内存摘要    - GarbageCollection: GC事件    - OldObjectSample: 老对象采样  3. 锁相关：    - JavaMonitorWait: 监视器等待    - ThreadAllocationStatistics: 线程分配统计  4. IO相关：    - FileRead/FileWrite: 文件IO    - SocketRead/SocketWrite: 网络IO  自定义配置： jcmd <pid> JFR.start settings=profile duration=60s filename=custom.jfr  分析工具： 1. JDK Mission Control (JMC) 2. Java VisualVM 3. IntelliJ IDEA JFR插件  最佳实践： 1. 持续录制：-XX:StartFlightRecording=settings=default,disk=true,maxage=1h 2. 问题发生时dump：jcmd <pid> JFR.dump 3. 结合GC日志分析 4. 关注热点方法和锁竞争'
        },
        {
            question: 'JVM的分层编译(Tiered Compilation)是如何工作的？C1和C2编译器各有什么特点？',
            answer: '分层编译是JVM的核心优化机制：  编译器特点： 1. C1(Client编译器)：    - 快速编译，优化较少    - 适合启动速度敏感的应用    - 优化级别：0-3级  2. C2(Server编译器)：    - 编译慢，优化激进    - 适合长期运行的服务端应用    - 优化级别：4级  分层编译流程： Level 0: 解释执行 Level 1: C1简单编译(无profiling) Level 2: C1有限优化编译 Level 3: C1完全优化编译(带profiling) Level 4: C2完全优化编译  工作流程： 1. 方法首次调用：解释执行 2. 调用次数达到阈值：C1编译(Level 3) 3. 热点方法：C2编译(Level 4) 4. C2编译失败：回退到C1 Level 3  关键参数： -XX:+TieredCompilation (默认开启) -XX:CompileThreshold=10000 (解释执行阈值) -XX:Tier3CompileThreshold=2000 (C1编译阈值) -XX:Tier4CompileThreshold=15000 (C2编译阈值)  性能影响： - 启动时间：分层编译比纯C2快30-50% - 峰值性能：分层编译接近纯C2 - 内存占用：分层编译需要更多CodeCache'
        },
        {
            question: '如何分析和解决线上JVM内存溢出问题？',
            answer: '解决流程：1.配置-XX:+HeapDumpOnOutOfMemoryError自动dump；2.使用MAT分析dump文件；3.定位大对象和引用链；4.分析GC日志判断是内存泄漏还是内存不足。常见原因：1.静态集合持有大对象；2.数据库连接未关闭；3.线程池配置不当；4.缓存无淘汰策略。'
        },
        {
            question: 'ZGC和Shenandoah垃圾收集器的原理对比？',
            answer: 'ZGC：1.着色指针技术；2.读屏障实现并发转移；3.支持TB级堆；4.停顿<10ms。Shenandoah：1.Brooks指针转发；2.读写屏障；3.并发压缩整理。两者都实现了几乎无停顿的GC，适合大内存低延迟场景，ZGC在JDK15后生产可用。'
        },
    ],
    concurrent: [
        {
            question: 'synchronized和Lock的区别？',
            answer: 'synchronized是JVM层面实现，Lock是API层面实现。区别：1.Lock可中断、可超时、可公平；2.Lock支持Condition条件变量；3.Lock需要手动释放；4.synchronized自动释放锁。推荐：简单场景用synchronized，复杂场景用Lock。'
        },
        {
            question: '线程池的核心参数有哪些？',
            answer: '核心参数：1.corePoolSize核心线程数；2.maximumPoolSize最大线程数；3.keepAliveTime空闲线程存活时间；4.workQueue工作队列；5.threadFactory线程工厂；6.handler拒绝策略。'
        },
        {
            question: 'AQS的实现原理？',
            answer: 'AQS(AbstractQueuedSynchronizer)是JUC核心基础框架。原理：1.state变量表示同步状态；2.CLH双向队列存储等待线程；3.CAS操作state；4.独占/共享两种模式。ReentrantLock、CountDownLatch等都基于AQS实现。'
        },
        {
            question: 'ThreadLocal的原理和内存泄漏问题？',
            answer: 'ThreadLocal原理：每个Thread持有ThreadLocalMap，key为ThreadLocal弱引用，value为线程私有数据。内存泄漏原因：key弱引用被回收后value无法访问。解决方案：1.使用后调用remove()；2.ThreadLocal设为static；3.使用InheritableThreadLocal传递给子线程。'
        },
        {
            question: 'ConcurrentHashMap在JDK8中的优化？',
            answer: 'JDK8优化：1.取消Segment分段锁，改用CAS+synchronized；2.锁粒度从段级别降到桶级别；3.链表转红黑树(>8)；4.扩容时多线程协同；5.size()使用LongAdder思想。性能提升明显，尤其是高并发写场景。'
        },
        {
            question: '如何设计一个高性能的异步任务执行框架？',
            answer: '设计要点：1.线程池隔离，不同类型任务用不同线程池；2.任务队列使用有界队列防止OOM；3.拒绝策略自定义(降级/重试)；4.任务超时控制；5.结果异步回调；6.监控统计(执行时间/成功率)；7.优雅停机。参考CompletableFuture、Netty EventLoop。'
        },
        {
            question: '如何实现一个支持优先级的线程池？',
            answer: '实现方案：1.使用PriorityBlockingQueue作为任务队列；2.任务实现Comparable接口或提供Comparator；3.注意：PriorityBlockingQueue是无界的，需要自定义有界优先队列或使用Semaphore限流。Spring提供ThreadPoolTaskExecutor支持自定义队列。'
        },
        {
            question: 'Java中的StampedLock与ReentrantReadWriteLock有什么区别？',
            answer: 'StampedLock特点：1.支持乐观读，无锁读取；2.不可重入；3.支持锁转换(乐观读->悲观读)；4.性能更好。ReentrantReadWriteLock特点：1.可重入；2.支持公平/非公平；3.支持Condition。选择：读多写少且不需要重入用StampedLock，需要重入用ReadWriteLock。'
        },
        {
            question: 'Java中的LongAdder与AtomicLong有什么区别？性能差异原因？',
            answer: 'LongAdder在高并发下性能更好。原理：LongAdder使用分段累加，每个线程更新自己的Cell，最后sum汇总。AtomicLong使用CAS单点更新，高并发时竞争激烈。适用场景：LongAdder适合计数统计，AtomicLong需要精确控制或CAS操作时使用。'
        },
        {
            question: 'Java中的ForkJoinPool与ThreadPoolExecutor有什么区别？',
            answer: 'ForkJoinPool特点：1.工作窃取算法，负载均衡；2.适合分治任务；3.支持RecursiveTask/RecursiveAction。ThreadPoolExecutor特点：1.共享任务队列；2.适合独立任务；3.需要手动分片。选择：递归分治任务用ForkJoinPool，独立任务用ThreadPoolExecutor。'
        },
        {
            question: 'Java中的VarHandle在并发编程中有什么应用？',
            answer: 'VarHandle提供原子操作和内存屏障。应用：1.实现自定义原子类；2.精确控制内存可见性(release/acquire模式)；3.实现高性能并发数据结构；4.替代Unsafe类。示例：VarHandle.compareAndSet实现CAS，VarHandle.setRelease实现写屏障。'
        },
        {
            question: 'Java中的ForkJoinPool与ThreadPoolExecutor有什么区别？如何选择？',
            answer: '两种线程池的设计理念和使用场景不同：  核心区别： | 特性 | ForkJoinPool | ThreadPoolExecutor | |------|--------------|-------------------| | 任务模型 | 分治任务 | 独立任务 | | 任务队列 | 每线程双端队列 | 共享队列 | | 负载均衡 | 工作窃取 | 无 | | 适用场景 | 递归分治 | 独立任务 | | 任务类型 | RecursiveTask/Action | Runnable/Callable |  ForkJoinPool特点： 1. 工作窃取算法：    - 每个Worker维护自己的任务队列    - 空闲Worker从其他队列窃取任务    - 实现负载均衡  2. 分治任务：    - 大任务拆分为小任务    - 小任务可以继续拆分    - 最终合并结果  ThreadPoolExecutor特点： 1. 共享队列：    - 所有Worker共享一个任务队列    - 简单高效    - 可能存在竞争  2. 独立任务：    - 任务之间无依赖    - 无需合并结果  选择建议： 1. 使用ForkJoinPool：    - 递归分治任务(归并排序、快速排序)    - 大任务可拆分的场景    - 需要负载均衡  2. 使用ThreadPoolExecutor：    - 独立的异步任务    - HTTP请求处理    - 数据库查询  3. 使用CompletableFuture：    - 复杂的异步编排    - 需要链式调用  性能对比： - 递归任务：ForkJoinPool快2-5倍 - 独立任务：ThreadPoolExecutor略快 - 混合场景：根据任务比例选择'
        },
        {
            question: 'Java中的AQS(AbstractQueuedSynchronizer)是如何实现的？如何基于AQS实现自定义同步器？',
            answer: 'AQS是JUC的核心基础框架：  核心组件： 1. state变量：    - volatile int state    - 表示同步状态    - CAS操作修改  2. CLH队列：    - 双向链表实现    - 存储等待的线程    - Node包含waitStatus  3. Node状态：    - CANCELLED: 1 (线程已取消)    - SIGNAL: -1 (需要唤醒后继)    - CONDITION: -2 (等待条件)    - PROPAGATE: -3 (共享模式传播)  工作流程： 1. 获取锁：    - tryAcquire()尝试获取    - 失败则加入队列    - park阻塞等待  2. 释放锁：    - tryRelease()释放    - 唤醒后继节点    - unpark唤醒线程  实现自定义同步器： 1. 独占模式： class Mutex implements Lock {     private static class Sync extends AbstractQueuedSynchronizer {         protected boolean tryAcquire(int arg) {             return compareAndSetState(0, 1);         }         protected boolean tryRelease(int arg) {             setState(0);             return true;         }     }     private final Sync sync = new Sync();     public void lock() { sync.acquire(1); }     public void unlock() { sync.release(1); } }  2. 共享模式： protected int tryAcquireShared(int arg); protected boolean tryReleaseShared(int arg);  基于AQS的同步器： - ReentrantLock: 独占锁 - ReentrantReadWriteLock: 读写锁 - CountDownLatch: 倒计时器 - Semaphore: 信号量 - CyclicBarrier: 循环屏障'
        },
        {
            question: 'Java中的StampedLock相比ReentrantReadWriteLock有什么优势？乐观读是如何实现的？',
            answer: 'StampedLock是Java 8引入的高性能读写锁：  核心特性： 1. 乐观读(Optimistic Read)：    - 无锁读取，不阻塞写操作    - 返回stamp用于后续验证    - 验证失败后升级为悲观读  2. 悲观读/写锁：    - 类似ReadWriteLock    - 支持锁降级  与ReentrantReadWriteLock对比： | 特性 | StampedLock | ReentrantReadWriteLock | |------|-------------|------------------------| | 可重入 | 不支持 | 支持 | | 乐观读 | 支持 | 不支持 | | Condition | 不支持 | 支持 | | 性能 | 更高 | 较低 | | 公平性 | 非公平 | 支持公平/非公平 |  乐观读实现原理： 1. 获取乐观读锁时返回版本号stamp 2. 读取数据 3. 验证stamp是否有效(validate) 4. 验证失败则获取悲观读锁重试  代码示例： long stamp = lock.tryOptimisticRead(); if (stamp != 0) {     double currentValue = value;     if (!lock.validate(stamp)) {         stamp = lock.readLock();         try {             currentValue = value;         } finally {             lock.unlockRead(stamp);         }     } }  适用场景： 1. 读多写少且读操作简单 2. 不需要可重入 3. 追求极致性能  注意事项： 1. 不要在锁内调用可能阻塞的方法 2. 确保在finally中释放锁 3. 不支持Condition'
        },
        {
            question: 'Java中的LongAdder是如何实现高并发下性能优于AtomicLong的？',
            answer: 'LongAdder在高并发场景下性能显著优于AtomicLong：  实现原理： 1. 分散热点：    - 使用Cell数组分散计数    - 每个线程更新自己的Cell    - 最终通过sum()汇总结果  2. 伪共享解决：    - 使用@Contended注解    - Cell之间填充缓存行    - 避免false sharing  3. 动态扩容：    - 初始Cell数量为1    - 竞争激烈时扩容    - 最大为CPU核心数  核心数据结构： transient volatile Cell[] cells; transient volatile long base;  工作流程： 1. 无竞争时：直接更新base 2. 有竞争时：更新对应Cell 3. sum()时：base + 所有Cell的值  性能对比(8核CPU)： | 操作 | AtomicLong | LongAdder | |------|------------|-----------| | 单线程 | 100M/s | 100M/s | | 8线程 | 20M/s | 400M/s | | 16线程 | 10M/s | 500M/s |  适用场景： 1. 高并发计数器 2. 统计监控 3. 不需要精确实时值  不适用场景： 1. 需要精确控制(如CAS操作) 2. 需要实时读取精确值 3. 单线程场景(无优势)  使用建议： 1. 计数场景优先使用LongAdder 2. 需要CAS操作使用AtomicLong 3. 需要精确值时谨慎使用sum()'
        },
        {
            question: 'Java中的CompletableFuture是如何实现异步编排的？如何处理异常？',
            answer: 'CompletableFuture实现了异步任务的编排和组合：  创建方式： 1. supplyAsync: 有返回值的异步任务 2. runAsync: 无返回值的异步任务 3. completedFuture: 已完成的Future  编排方法： 1. 串行执行：    - thenApply: 同步转换    - thenApplyAsync: 异步转换    - thenAccept: 消费结果    - thenRun: 不关心结果  2. 并行组合：    - thenCombine: 两个任务都完成后合并    - thenAcceptBoth: 两个任务都完成后消费    - runAfterBoth: 两个任务都完成后执行  3. 竞争执行：    - applyToEither: 任一完成就转换    - acceptEither: 任一完成就消费    - runAfterEither: 任一完成就执行  4. 多任务组合：    - allOf: 所有任务完成    - anyOf: 任一任务完成  异常处理： 1. exceptionally: 异常时提供默认值    .exceptionally(ex -> 0)  2. handle: 统一处理结果和异常    .handle((result, ex) -> ex != null ? 0 : result)  3. whenComplete: 类似finally    .whenComplete((result, ex) -> log.info(\"done\"))  超时处理(Java 9+)： .orTimeout(5, TimeUnit.SECONDS) .completeOnTimeout(0, 5, TimeUnit.SECONDS)  最佳实践： 1. 指定线程池，避免使用ForkJoinPool 2. 合理处理异常，避免异常被吞掉 3. 注意依赖关系，避免死锁 4. 使用工具类封装常用模式'
        },
        {
            question: '高并发场景下如何优化锁竞争？',
            answer: '优化策略：1.减小锁粒度(分段锁、细粒度锁)；2.锁分离(读写锁、StampedLock)；3.无锁设计(CAS、ThreadLocal)；4.乐观锁替代悲观锁；5.锁消除和锁粗化；6.分布式锁本地化缓存；7.异步化处理解耦。案例：LongAdder分段计数、ConcurrentHashMap桶级锁。'
        },
        {
            question: '如何实现一个高性能的分布式限流器？',
            answer: '实现方案：1.令牌桶算法：Redis+Lua脚本原子操作；2.滑动窗口：Redis ZSET存储时间戳；3.漏桶算法：消息队列削峰。优化点：1.本地缓存+异步同步减少Redis访问；2.批量预取令牌；3.热点Key分片；4.降级策略。参考Guava RateLimiter、Sentinel、Resilience4j。'
        },
        {
            question: '线上遇到死锁了，怎么排查？',
            answer: '死锁排查步骤：  1. **发现死锁**：    - 接口响应超时，线程卡住不处理    - jps拿到进程id  2. **使用jstack**：    - jstack -l pid    - 搜索 \"Found one Java-level deadlock\"    - jstack会直接标出哪两个线程死锁，锁的是什么对象  3. **使用jconsole/jvisualvm**：    - 图形界面连接进程    - 检测死锁按钮一键检测  4. **使用Arthas**：    - thread --blocked 列出阻塞线程    - thread 看所有线程状态  5. **解决死锁**：    - 打破循环等待：按顺序获取锁    - 超时退出：获取锁超时就放弃    - 使用TryLock：避免一直等待  6. **预防死锁**：    - 避免锁嵌套    - 统一获取锁顺序    - 使用定时锁    - 减少锁持有时间'
        },
        {
            question: '线程池设置多大合适？怎么估算？',
            answer: '线程池大小估算公式：  **CPU密集型**： - 核心线程数 = CPU核心数 + 1 - 原因：计算密集，每个CPU核心跑一个，+1应对偶尔的阻塞  **IO密集型**： - 公式：线程数 = CPU核心数 × (1 + 等待时间/计算时间) - 经验：大部分Web服务IO等待时间长，一般是 CPU核心数 × 2 - 如果等待时间/计算时间 = 5，那就是 CPU × (1+5) = 6 × CPU  **实际经验**： - 根据压测结果调整，不要只靠公式 - 考虑依赖服务的承载力：数据库连接数限制 - 监控线程池：队列长度、活跃线程数、拒绝次数 - 关键参数：corePoolSize, maximumPoolSize, workQueue  **注意**： - 队列用有界队列，防止OOM - 拒绝策略自定义，降级处理 - 不同类型任务用不同线程池隔离'
        },
        {
            question: 'ThreadLocal会发生内存泄漏，实际项目中怎么避免？',
            answer: '**为什么内存泄漏**： - ThreadLocalMap的key是弱引用，value是强引用 - key被GC回收后，value永远访问不到，但还留在map里 - 在线程池场景下，线程经常复用，泄漏会累积  **避免方法**： 1. **最后一定要remove()**：    ```java    try {        threadLocal.set(value);        // do something    } finally {        threadLocal.remove();    }    ```  2. **static修饰ThreadLocal**：    不要定义成非静态，否则每个实例都会创建一个  3. **使用框架提供的容器**：    Spring RequestContextHolder 已经处理好了remove  4. **在线程池中使用特别注意**：    线程复用，不remove泄漏更严重  **排查泄漏**： - jmap dump内存 - MAT分析找ThreadLocalMap实例 - 看哪个value占用大'
        },
    ],
    spring: [
        {
            question: 'Spring IOC容器的理解？',
            answer: 'IOC(Inversion of Control)控制反转，将对象创建和依赖管理交给Spring容器。实现方式：1.XML配置；2.注解(@Component/@Autowired)；3.Java配置(@Configuration/@Bean)。核心容器：BeanFactory、ApplicationContext。'
        },
        {
            question: 'Spring Bean的生命周期？',
            answer: 'Bean生命周期：1.实例化；2.属性赋值；3.初始化前处理(BeanPostProcessor)；4.初始化(InitializingBean/init-method)；5.初始化后处理；6.使用；7.销毁前处理；8.销毁(DestroyableBean/destroy-method)。'
        },
        {
            question: 'Spring AOP的实现原理？',
            answer: 'Spring AOP通过动态代理实现：1.JDK动态代理：基于接口，使用反射；2.CGLIB代理：基于类继承，生成子类。核心概念：切面、连接点、通知、切点。事务、日志、权限等都基于AOP实现。'
        },
        {
            question: 'Spring事务传播机制有哪些？',
            answer: '传播机制：1.REQUIRED(默认)：有事务则加入，无则新建；2.REQUIRES_NEW：新建事务，挂起当前；3.SUPPORTS：有则加入；4.NOT_SUPPORTED：非事务执行；5.NEVER：非事务执行，有事务则异常；6.MANDATORY：必须有事务；7.NESTED：嵌套事务。'
        },
        {
            question: 'Spring Boot自动配置原理？',
            answer: '自动配置原理：1.@EnableAutoConfiguration启用自动配置；2.AutoConfigurationImportSelector扫描META-INF/spring.factories；3.条件注解@Conditional判断是否生效；4.根据classpath下类自动装配Bean。可通过exclude排除特定配置，或自定义starter扩展。'
        },
        {
            question: 'Spring Cloud核心组件及其作用？',
            answer: '核心组件：1.Nacos/Eureka：服务注册发现；2.Ribbon/LoadBalancer：客户端负载均衡；3.Feign/OpenFeign：声明式HTTP客户端；4.Sentinel/Hystrix：熔断降级；5.Gateway：API网关；6.Config：配置中心；7.Sleuth：链路追踪。Spring Cloud Alibaba生态更完善。'
        },
        {
            question: 'Spring Boot的启动流程是怎样的？',
            answer: '启动流程：1.创建SpringApplication对象；2.判断应用类型(Servlet/Reactive)；3.加载ApplicationContextInitializer和ApplicationListener；4.执行run方法；5.创建ApplicationContext；6.准备环境、打印Banner；7.刷新上下文(核心)；8.执行Runner；9.发布启动完成事件。'
        },
        {
            question: 'Spring中的事件机制(ApplicationEvent)是如何实现的？',
            answer: 'Spring事件机制基于观察者模式。组件：1.ApplicationEvent：事件基类；2.ApplicationListener：监听器接口；3.ApplicationEventPublisher：事件发布接口；4.ApplicationEventMulticaster：事件广播器。异步事件：@Async注解或配置SimpleApplicationEventMulticaster线程池。'
        },
        {
            question: 'Spring Cloud Gateway的过滤器链是如何实现的？',
            answer: 'Gateway基于WebFlux实现。过滤器链：1.GlobalFilter：全局过滤器；2.GatewayFilter：路由级过滤器；3.过滤器排序：Order接口；4.执行：Reactive模式，Mono链式调用。自定义过滤器：实现GlobalFilter和Ordered接口。限流：RequestRateLimiter GatewayFilter，基于Redis+Lua实现令牌桶。'
        },
        {
            question: 'Spring中的@Async是如何实现的？线程池如何配置？',
            answer: '@Async通过AOP实现异步调用。原理：1.AsyncAnnotationBeanPostProcessor处理@Async；2.通过代理提交任务到线程池；3.默认使用SimpleAsyncTaskExecutor。配置：实现AsyncConfigurer接口或配置spring.task.execution线程池参数。注意：同类调用不生效(未走代理)。'
        },
        {
            question: 'Spring中的循环依赖是如何解决的？三级缓存的作用？',
            answer: 'Spring通过三级缓存解决循环依赖：1.singletonObjects：完整Bean；2.earlySingletonObjects：早期暴露的Bean；3.singletonFactories：Bean工厂。流程：A创建->注入B->B创建->注入A->从三级缓存获取A工厂->创建A代理->放入二级缓存->B完成->A完成。注意：构造器注入无法解决。'
        },
        {
            question: 'Spring事务的传播机制是如何实现的？各传播行为有什么区别？',
            answer: 'Spring事务传播机制决定事务方法如何相互调用：  传播行为详解： 1. REQUIRED (默认)：    - 有事务则加入，无则新建    - 大多数场景的默认选择  2. REQUIRES_NEW：    - 总是新建事务，挂起当前事务    - 独立提交/回滚    - 适用于日志记录等独立操作  3. SUPPORTS：    - 有事务则加入，无则非事务执行    - 查询方法常用  4. NOT_SUPPORTED：    - 非事务执行，挂起当前事务    - 避免长事务  5. NEVER：    - 非事务执行，有事务则抛异常    - 严格非事务场景  6. MANDATORY：    - 必须在事务中执行，否则抛异常    - 强制要求事务  7. NESTED：    - 嵌套事务，独立回滚点    - 外部事务回滚则内部也回滚    - 内部回滚不影响外部  实现原理： 1. ThreadLocal存储当前事务 2. 事务管理器维护事务栈 3. 根据传播行为决定创建/加入/挂起  代码示例： @Transactional(propagation = Propagation.REQUIRES_NEW) public void saveLog() { ... }  注意事项： 1. 同类方法调用不生效(未走代理) 2. 异常必须是RuntimeException 3. 数据库引擎要支持事务 4. 避免大事务，拆分操作'
        },
        {
            question: 'Spring Cloud Gateway是如何实现动态路由和限流的？',
            answer: 'Spring Cloud Gateway是基于WebFlux的API网关：  核心组件： 1. Route(路由)：    - id: 路由标识    - uri: 目标地址    - predicates: 断言条件    - filters: 过滤器  2. Predicate(断言)：    - Path: 路径匹配    - Method: 方法匹配    - Header: 请求头匹配    - Query: 参数匹配  3. Filter(过滤器)：    - GatewayFilter: 路由级    - GlobalFilter: 全局级  动态路由实现： 1. 基于配置中心：    @RefreshScope    @Bean    public RouteDefinitionLocator routeDefinitionLocator() {        return new RedisRouteDefinitionLocator(redisTemplate);    }  2. 动态添加路由：    @Autowired    private RouteDefinitionWriter routeDefinitionWriter;        public void addRoute(RouteDefinition definition) {        routeDefinitionWriter.save(Mono.just(definition)).subscribe();    }  限流实现： 1. 内置RequestRateLimiter：    spring:      cloud:        gateway:          routes:            - id: rate-limit              uri: lb://service              filters:                - name: RequestRateLimiter                  args:                    redis-rate-limiter.replenishRate: 10                    redis-rate-limiter.burstCapacity: 20  2. 自定义限流器：    @Bean    public KeyResolver userKeyResolver() {        return exchange -> Mono.just(            exchange.getRequest().getHeaders().getFirst(\"X-User-Id\")        );    }  3. 基于Lua脚本实现令牌桶：    - Redis存储令牌数    - 原子操作保证正确性    - 支持突发流量  性能优化： 1. 使用Netty而非Tomcat 2. 开启连接池 3. 合理设置超时时间 4. 监控路由性能'
        },
        {
            question: 'Spring是如何解决循环依赖的？三级缓存各自的作用是什么？',
            answer: 'Spring通过三级缓存解决循环依赖：  三级缓存结构： 1. singletonObjects (一级缓存)：    - Map<String, Object>    - 存储完整的Bean实例    - Bean已完全初始化  2. earlySingletonObjects (二级缓存)：    - Map<String, Object>    - 存储早期暴露的Bean    - Bean已实例化但未填充属性  3. singletonFactories (三级缓存)：    - Map<String, ObjectFactory>    - 存储Bean工厂    - 用于生成早期Bean引用  解决流程(以A依赖B，B依赖A为例)： 1. 创建A，标记为正在创建 2. 实例化A，将A的工厂放入三级缓存 3. 填充A的属性，发现需要B 4. 创建B，实例化B 5. 填充B的属性，发现需要A 6. 从三级缓存获取A的工厂，创建A的早期引用 7. 将A的早期引用放入二级缓存，删除三级缓存 8. B完成初始化，放入一级缓存 9. A继续初始化，完成  为什么需要三级缓存： 1. 一级缓存：存储最终结果 2. 二级缓存：存储早期引用，避免重复创建 3. 三级缓存：支持AOP代理，延迟创建代理对象  无法解决的场景： 1. 构造器注入的循环依赖 2. @Async导致的循环依赖 3. Prototype作用域的循环依赖  解决方案： 1. 改用setter注入 2. 使用@Lazy延迟加载 3. 重构代码消除循环依赖'
        },
        {
            question: 'Spring Boot自动配置原理是什么？@EnableAutoConfiguration是如何工作的？',
            answer: 'Spring Boot自动配置是核心特性：  工作原理： 1. @EnableAutoConfiguration注解：    - 导入AutoConfigurationImportSelector    - 扫描META-INF/spring.factories    - 加载所有自动配置类  2. 条件注解判断：    - @ConditionalOnClass: 类路径存在指定类    - @ConditionalOnBean: 容器中存在指定Bean    - @ConditionalOnProperty: 配置属性满足条件    - @ConditionalOnMissingBean: 容器中不存在指定Bean  3. 配置类加载：    - 每个starter提供自动配置类    - 根据条件决定是否生效    - 用户配置优先于自动配置  自动配置示例： @Configuration @ConditionalOnClass(DataSource.class) @EnableConfigurationProperties(DataSourceProperties.class) public class DataSourceAutoConfiguration {     @Bean     @ConditionalOnMissingBean     public DataSource dataSource(DataSourceProperties properties) {         return properties.initializeDataSourceBuilder().build();     } }  自定义Starter： 1. 创建自动配置类 2. 添加条件注解 3. 创建META-INF/spring.factories 4. 指定自动配置类  排除自动配置： @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})  调试自动配置： 1. --debug启动 2. 查看CONDITIONS EVALUATION REPORT 3. 使用actuator /conditions端点  核心源码： AutoConfigurationImportSelector.selectImports() -> SpringFactoriesLoader.loadFactoryNames() -> 读取spring.factories'
        },
        {
            question: 'Spring Security的认证和授权流程是怎样的？JWT是如何集成的？',
            answer: 'Spring Security是强大的安全框架：  认证流程： 1. 用户提交认证信息 2. UsernamePasswordAuthenticationFilter拦截 3. 创建Authentication对象 4. AuthenticationManager认证 5. Provider调用UserDetailsService 6. 验证成功返回Authentication 7. SecurityContextHolder存储认证信息  授权流程： 1. FilterSecurityInterceptor拦截请求 2. 获取Authentication 3. 根据配置检查权限 4. AccessDecisionManager投票决定 5. 有权限则放行，否则抛异常  JWT集成： 1. 登录认证：    @PostMapping(\"/login\")    public String login(@RequestBody LoginRequest request) {        Authentication auth = authenticationManager.authenticate(            new UsernamePasswordAuthenticationToken(                request.getUsername(), request.getPassword()            )        );        return jwtTokenProvider.generateToken(auth);    }  2. JWT过滤器：    public class JwtFilter extends OncePerRequestFilter {        protected void doFilterInternal(...) {            String token = getToken(request);            if (token != null && jwtTokenProvider.validateToken(token)) {                Authentication auth = jwtTokenProvider.getAuthentication(token);                SecurityContextHolder.getContext().setAuthentication(auth);            }            filterChain.doFilter(request, response);        }    }  3. JWT工具类：    public String generateToken(Authentication auth) {        return Jwts.builder()            .setSubject(auth.getName())            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))            .signWith(SignatureAlgorithm.HS512, SECRET)            .compact();    }  安全最佳实践： 1. 使用强密钥(256位以上) 2. 设置合理的过期时间 3. 支持Token刷新 4. 敏感操作二次验证 5. 记录安全日志'
        },
        {
            question: '如何设计一个高可用的Spring Cloud微服务架构？',
            answer: '设计要点：1.服务注册中心集群(Nacos集群)；2.网关集群+限流熔断；3.服务多副本+无状态设计；4.数据库主从+读写分离；5.缓存集群(Redis Cluster)；6.消息队列集群；7.配置中心高可用；8.全链路监控(Prometheus+Grafana)；9.日志收集(ELK)；10.灰度发布能力。'
        },
        {
            question: 'Spring事务失效的场景及解决方案？',
            answer: '失效场景：1.方法非public；2.同类方法调用(未走代理)；3.异常被catch捕获；4.抛出非RuntimeException；5.数据库不支持事务；6.传播机制设置错误。解决方案：1.AopContext.currentProxy()获取代理；2.注入自身调用；3.正确配置rollbackFor；4.检查数据库引擎。'
        },
        {
            question: '线上接口CPU使用率突然飙升到100%，如何排查和解决？',
            answer: '排查步骤：  1. **监控确认**：    - top/htop查看哪个进程CPU高    - ps -mp pid -o THREAD tid查看哪个线程高    - jstack pid导出线程栈    - convert thread id to hex查找对应线程  2. **常见原因**：    - 死循环：线程栈卡在某个方法一直执行    - 频繁GC：内存泄漏导致FGC频繁    - 正则表达式回溯：灾难性回溯导致CPU卡死    - 锁竞争：大量线程阻塞等待锁    - 热点代码：循环次数过多没有优化  3. **解决思路**：    - 紧急：重启服务先恢复业务    - 保留现场：dump线程栈和堆内存    - 定位代码：找到热点方法优化    - 压测验证：优化后验证性能  工具： - async-profiler：低开销采样分析 - Arthas：在线诊断，watch/monitor/trace命令 - JProfiler/VisualVM：图形化分析'
        },
        {
            question: 'OOM问题如何排查？给你一张heap dump，如何分析？',
            answer: 'OOM排查步骤：  1. **确认OOM类型**：    - java.lang.OutOfMemoryError: Java heap space：堆空间不足    - java.lang.OutOfMemoryError: Metaspace：元空间不足    - java.lang.OutOfMemoryError: Direct buffer memory：直接内存不足    - java.lang.OutOfMemoryError: unable to create new native thread：无法创建线程  2. **分析heap dump**：    - MAT工具：Leak Suspects报告找内存泄漏怀疑    - Histogram：按类统计实例数和大小，找大对象    - Outgoing references：查看引用链，找到谁持有大对象不释放    - Dominator Tree：支配树，找出占用内存最大的对象  3. **常见内存泄漏原因**：    - 静态集合类不断添加不清理    - 缓存没有设置过期策略    - 监听器/回调没有移除    - 内部类持有外部类引用    - IO流/Connection没有关闭  4. **解决**：    - 内存泄漏：找到泄漏点修复代码    - 内存不足：调整JVM参数(-Xmx)    - 大对象：拆分处理或者用磁盘存储'
        },
        {
            question: '服务启动后无法注册到Nacos，如何排查？',
            answer: '排查流程：  1. **网络层面**：    - ping nacos地址看是否连通    - telnet nacos端口看是否能连接    - 检查防火墙/安全组是否开放    - 检查服务端是否能访问客户端  2. **配置层面**：    - 检查spring.cloud.nacos.discovery.server-address配置是否正确    - 检查namespace是否正确（默认public）    - 检查group-name是否匹配    - 检查服务名是否正确    - 检查username/password是否配置正确  3. **启动日志**：    - 搜索error关键字看注册失败原因    - 看是否有超时：网络超时还是注册被拒绝    - 检查是否是鉴权失败：token错误  4. **客户端层面**：    - 检查Spring Boot版本和Nacos版本兼容性    - 检查是否开启服务发现：@EnableDiscoveryClient    - 检查服务启动完成了吗：延迟注册    - 查看本地缓存：~/.nacos目录是否有缓存  5. **服务端层面**：    - 查看Nacos控制台日志    - 检查Nacos集群节点是否健康    - 检查Nacos磁盘空间是否满了    - 检查数据库是否正常'
        },
        {
            question: '接口响应很慢，如何定位瓶颈在哪里？',
            answer: '定位接口性能瓶颈步骤：  1. **添加监控**：    - 接口层面：记录整体响应时间    - 分层统计：Dao层/Service层/第三方调用    - SQL层面：记录慢SQL    - 日志打印每个阶段耗时  2. **工具分析**：    - Arthas：trace命令查看每个方法耗时    - async-profiler：采样看CPU热点    - 数据库：show processlist看是否有慢查询    - Redis：info stats查看命中次数，检查缓存命中率  3. **常见瓶颈**：    - **数据库**：没有索引、SQL写得差、锁等待    - **缓存**：缓存没命中、穿透到数据库    - **IO**：第三方接口调用慢、网络延迟    - **CPU**：计算密集型、序列化/反序列化耗时长    - **锁竞争**：大量线程等待锁  4. **优化方向**：    - SQL慢：加索引、优化SQL、拆分大查询    - 缓存没命中：调整缓存策略、预热缓存    - 第三方调用慢：异步化、缓存结果、降级    - CPU高：优化算法、用更高效的数据结构  5. **验证优化效果**：    - 压测对比QPS和响应时间    - 监控看指标变化'
        },
    ],
    database: [
        {
            question: 'MySQL索引的类型有哪些？',
            answer: '索引类型：1.主键索引：唯一且非空；2.唯一索引：唯一可为空；3.普通索引：无约束；4.组合索引：多列组合；5.全文索引：文本搜索。存储结构：B+树索引(默认)、Hash索引(Memory引擎)。'
        },
        {
            question: '事务的ACID特性是什么？',
            answer: 'ACID特性：1.原子性(Atomicity)：事务不可分割；2.一致性(Consistency)：事务前后数据一致；3.隔离性(Isolation)：并发事务互不干扰；4.持久性(Durability)：事务提交后永久保存。'
        },
        {
            question: 'MySQL的隔离级别及实现原理？',
            answer: '隔离级别：1.读未提交：不加锁；2.读已提交：MVCC+快照读；3.可重复读(默认)：MVCC+Next-Key Lock防止幻读；4.串行化：加锁。MVCC通过undo log版本链实现，Read View判断可见性。'
        },
        {
            question: 'MySQL索引优化原则？',
            answer: '优化原则：1.最左前缀原则；2.覆盖索引减少回表；3.索引列不参与计算；4.避免索引失效(函数、类型转换、!=、OR)；5.选择性高的列建索引；6.组合索引顺序(区分度高在前)；7.控制索引数量。'
        },
        {
            question: 'MySQL主从复制原理及延迟解决方案？',
            answer: '复制原理：1.Master写binlog；2.Slave的IO线程拉取binlog到relay log；3.SQL线程重放relay log。延迟原因：单线程重放、大事务、网络延迟。解决方案：1.并行复制(MTS)；2.半同步复制；3.分库分表减少单库压力；4.读写分离中间件(ShardingSphere)。'
        },
        {
            question: '如何设计分库分表方案？',
            answer: '分片策略：1.垂直分库：按业务拆分；2.水平分库：按分片键路由。分片键选择：高频查询字段、数据分布均匀。路由算法：1.Hash取模；2.范围分片；3.一致性Hash。中间件：ShardingSphere、MyCat。问题解决：分布式事务、跨库Join、全局ID(雪花算法)、数据迁移。'
        },
        {
            question: 'MySQL的MVCC是如何实现的？Read View的作用？',
            answer: 'MVCC通过undo log版本链+Read View实现。Read View包含：m_ids(活跃事务ID)、min_trx_id、max_trx_id、creator_trx_id。可见性判断：1.事务ID<min_trx_id：可见；2.事务ID>=max_trx_id：不可见；3.在m_ids中：不可见；4.不在m_ids中：可见。RC级别每次查询创建Read View，RR级别只在第一次创建。'
        },
        {
            question: 'MySQL的Online DDL是如何实现的？',
            answer: 'Online DDL允许DDL期间并发DML。实现：1.获取MDL写锁(短暂)；2.降级为MDL读锁；3.执行DDL；4.应用增量DML(row_log)；5.升级为MDL写锁；6.应用最后增量；7.完成DDL。Instant DDL(MySQL8.0)：只修改元数据，秒级完成，支持修改列默认值、添加列等。'
        },
        {
            question: '如何优化MySQL的大表查询？',
            answer: '优化方案：1.索引优化：覆盖索引、索引下推、避免回表；2.分页优化：延迟关联、子查询；3.分区表：按时间或范围分区；4.分库分表：水平拆分；5.读写分离：主写从读；6.缓存：Redis缓存热点数据；7.异步：MQ处理非实时查询。注意：避免SELECT *，使用LIMIT限制结果集。'
        },
        {
            question: 'MySQL的Change Buffer是什么？有什么优化作用？',
            answer: 'Change Buffer缓存二级索引的修改操作(DML)，当对应页不在Buffer Pool时暂存。优化：1.减少随机IO；2.合并多次修改；3.提升写入性能。适用场景：写多读少、非唯一二级索引。注意：唯一索引不支持(需要立即检查唯一性)。MySQL8.0后支持部分索引。'
        },
        {
            question: 'MySQL的Undo Log是如何回收的？Purge线程的作用？',
            answer: 'Undo Log回收：1.事务提交后undo log进入history list；2.Purge线程异步清理；3.清理条件：所有活跃事务ID大于undo log事务ID。Purge线程：后台线程，负责清理undo log和删除标记的记录。参数：innodb_purge_threads控制线程数，innodb_max_purge_lag控制延迟。'
        },
        {
            question: 'MySQL主从复制的原理是什么？如何解决复制延迟？',
            answer: 'MySQL主从复制原理：  复制流程： 1. Master写操作记录到binlog 2. Slave的IO线程连接Master 3. Master发送binlog到Slave 4. Slave写入relay log 5. Slave的SQL线程重放relay log  复制格式： 1. STATEMENT：SQL语句 2. ROW：行变更(推荐) 3. MIXED：混合模式  复制模式： 1. 异步复制：    - Master不等待Slave    - 可能丢数据  2. 半同步复制：    - Master等待至少一个Slave确认    - 兼顾性能和数据安全  3. 全同步复制：    - Master等待所有Slave确认    - 数据最安全，性能最差  延迟原因： 1. 单线程重放(MySQL 5.6之前) 2. 大事务 3. 网络延迟 4. Slave性能不足  解决方案： 1. 并行复制(MTS)：    - MySQL 5.6+支持    - 按库并行    - MySQL 5.7+按组提交并行     slave_parallel_type = LOGICAL_CLOCK    slave_parallel_workers = 8  2. 半同步复制：    rpl_semi_sync_master_enabled = 1    rpl_semi_sync_master_wait_no_slave = 1  3. 分库分表：    - 减少单库压力    - 降低复制延迟  4. 读写分离中间件：    - ShardingSphere    - 自动路由    - 延迟检测  监控复制状态： SHOW SLAVE STATUS\\G 关注：Seconds_Behind_Master'
        },
        {
            question: 'MySQL的Online DDL是如何实现的？如何避免锁表？',
            answer: 'Online DDL允许DDL操作期间并发DML：  实现原理： 1. 初始化阶段：    - 获取MDL写锁(短暂)    - 创建临时frm文件    - 释放MDL写锁  2. 执行阶段：    - 获取MDL读锁    - 扫描原表数据    - 构建新表结构    - 记录DML变更到row log  3. 应用阶段：    - 获取MDL写锁(短暂)    - 应用row log中的增量    - 切换表名    - 删除旧表  Instant DDL (MySQL 8.0+)： - 只修改元数据 - 秒级完成 - 支持操作：修改列默认值、添加列(非中间位置)  支持的Online DDL： 1. 添加索引 2. 删除索引 3. 修改列类型(部分) 4. 添加列(非中间位置) 5. 删除列 6. 修改列默认值  避免锁表的方法： 1. 使用ALGORITHM=INPLACE：    ALTER TABLE t ADD INDEX idx(c), ALGORITHM=INPLACE;  2. 使用pt-online-schema-change：    pt-online-schema-change --alter \"ADD INDEX idx(c)\" D=db,t=table  3. 使用gh-ost：    gh-ost --alter=\"ADD INDEX idx(c)\" --database=db --table=table  监控DDL进度： SELECT * FROM performance_schema.setup_actors; SHOW PROCESSLIST;  最佳实践： 1. 低峰期执行DDL 2. 使用ALGORITHM和LOCK子句 3. 监控DDL进度 4. 预估DDL时间 5. 准备回滚方案'
        },
        {
            question: 'MySQL的索引下推(ICP)和覆盖索引是如何优化查询的？',
            answer: '索引下推(Index Condition Pushdown)：  原理： - 将WHERE条件的过滤下推到存储引擎层 - 减少回表次数 - 减少返回给Server层的数据量  示例： 索引: (name, age) 查询: SELECT * FROM user WHERE name LIKE \'张%\' AND age = 20  无ICP： 1. 存储引擎返回所有name以\'张\'开头的记录 2. Server层过滤age = 20  有ICP： 1. 存储引擎直接过滤name和age 2. 只返回满足条件的记录  查看是否使用ICP： EXPLAIN SELECT ... Extra: Using index condition  覆盖索引(Covering Index)：  原理： - 查询所需字段都在索引中 - 无需回表查询数据行 - 大幅提升查询性能  示例： 索引: (name, age) 查询: SELECT name, age FROM user WHERE name = \'张三\'  优势： 1. 减少IO操作 2. 索引比数据行小，更多数据可缓存在内存 3. MyISAM索引缓存更高效  查看是否使用覆盖索引： EXPLAIN SELECT ... Extra: Using index  最佳实践： 1. 高频查询字段建立联合索引 2. 使用覆盖索引避免回表 3. 注意索引顺序(最左前缀) 4. 不要SELECT *，只查需要的字段  性能对比： - 回表查询: 10ms - 覆盖索引: 1ms - 提升: 10倍'
        },
        {
            question: '如何设计MySQL的分库分表方案？有哪些分片策略？',
            answer: '分库分表是处理大数据量的核心方案：  分片策略： 1. 垂直分库：    - 按业务拆分    - 用户库、订单库、商品库    - 降低单库压力  2. 水平分库：    - 按分片键路由    - user_id % 分库数    - 数据均匀分布  分片键选择： 1. 高频查询字段 2. 数据分布均匀 3. 避免跨库查询  路由算法： 1. Hash取模：    - 简单均匀    - 扩容困难    shard = hash(key) % N  2. 范围分片：    - 扩容方便    - 可能不均匀    - 适合时间序列  3. 一致性Hash：    - 扩容影响小    - 实现复杂    - 适合缓存场景  4. 基因法：    - 将分片基因嵌入关联字段    - 避免跨库JOIN    - user_id基因嵌入order_id  全局ID生成： 1. 雪花算法：    - 时间戳 + 机器ID + 序列号    - 趋势递增    - 分布式友好  2. 号段模式：    - 预分配ID段    - 减少数据库访问    - Leaf框架  中间件选择： 1. ShardingSphere：    - 功能全面    - 支持多种分片策略    - 生态完善  2. MyCat：    - 配置简单    - 社区活跃    - 适合中小规模  注意事项： 1. 避免跨库JOIN 2. 使用全局表 3. 处理分布式事务 4. 数据迁移方案 5. 监控告警'
        },
        {
            question: 'MySQL的MVCC是如何实现的？Read View如何判断可见性？',
            answer: 'MVCC(Multi-Version Concurrency Control)是MySQL实现事务隔离的核心：  实现组件： 1. Undo Log：    - 存储数据的历史版本    - 形成版本链    - 支持回滚和快照读  2. Read View：    - m_ids: 活跃事务ID列表    - min_trx_id: 最小活跃事务ID    - max_trx_id: 下一个将分配的事务ID    - creator_trx_id: 创建者事务ID  版本链结构： 每条记录包含： - trx_id: 最后修改的事务ID - roll_pointer: 指向undo log的指针  可见性判断规则： 1. trx_id == creator_trx_id: 可见(自己修改的) 2. trx_id < min_trx_id: 可见(事务已提交) 3. trx_id >= max_trx_id: 不可见(事务在Read View之后开启) 4. trx_id in m_ids: 不可见(事务未提交) 5. trx_id not in m_ids: 可见(事务已提交)  RC与RR的区别： 1. Read Committed：    - 每次SELECT创建新的Read View    - 可以看到其他事务已提交的修改  2. Repeatable Read：    - 第一次SELECT创建Read View    - 后续SELECT复用同一个Read View    - 保证可重复读  解决幻读： 1. 快照读：MVCC解决 2. 当前读：Next-Key Lock解决  性能优化： 1. 避免长事务(Read View维护成本高) 2. 合理设置事务隔离级别 3. 减少不必要的字段更新'
        },
        {
            question: '如何设计一个高并发订单系统数据库架构？',
            answer: '架构设计：1.分库分表(按用户ID/订单ID)；2.热点数据分离(活跃订单单独存储)；3.读写分离(主写从读)；4.缓存层(Redis缓存热点订单)；5.异步处理(MQ削峰)；6.归档策略(历史订单迁移)；7.分布式ID(雪花算法)；8.柔性事务(最终一致性)。'
        },
        {
            question: 'MySQL高可用架构方案对比？',
            answer: '方案对比：1.MHA：自动故障转移，需额外部署Manager，适合中小规模；2.MGR(MySQL Group Replication)：官方方案，基于Paxos，支持多主；3.orchestrator：GitHub开源，拓扑管理+自动切换；4.ProxySQL+MySQL Router：中间件层高可用。推荐：MGR+orchestrator+ProxySQL组合方案。'
        },
        {
            question: '慢SQL有哪些优化方法？给你一条慢SQL，如何一步步优化？',
            answer: '慢SQL优化步骤：  1. **分析执行计划**：    - EXPLAIN看看走没走索引    - 看type列：range > ref > ALL    - 看key列：实际使用的索引    - 看rows列：估算扫描行数    - 看Extra：有没有Using filesort, Using temporary  2. **常见问题和优化**：     - **没走索引**：      * 索引列参与计算：where year(create_time) > 2024 → 改为 create_time > \'2024-01-01\'      * 隐式类型转换：where phone = 138xxxx → phone是varchar应该用字符串      * like %开头：where name like \'%张%\'无法用索引 → 考虑全文检索     - **索引不最优**：      * 不符合最左前缀：索引(a,b)查询where b=? → 无法使用索引      * 区分度太低：性别字段索引选择性差，不建索引     - **排序问题**：      * Using filesort不一定慢，但数据量大就慢      * 让排序按索引顺序走，避免filesort     - **分页问题**：      * LIMIT 1000000, 10 扫描很多行才跳过      * 优化：延迟关联 → SELECT * FROM table t JOIN (SELECT id FROM table LIMIT 1000000, 10) tmp ON t.id = tmp.id     - **大IN问题**：      * IN太长MySQL优化器可能选错索引      * 拆分多个查询，或者用JOIN  3. **结构优化**：    - 分库分表：数据太大就拆分    - 归档：历史数据归档到冷库    - 读写分离：读请求走从库  4. **验证**：    - 再执行一次看时间    - 看EXPLAIN是否符合预期'
        },
        {
            question: '网站打开越来越慢，数据库连接超时，怎么排查？',
            answer: '排查步骤：  1. **确认现象**：    - 是所有请求都慢还是部分？    - 数据库连接超时还是获取不到连接？    - 什么时间开始慢的？有发布变更吗？  2. **检查连接数**：    - show processlist; 看当前活跃连接数    - show status like \'Threads%\'; 看连接状态    - 检查最大连接数：show variables like \'max_connections\';    - 是否有太多Sleep连接？应用连接池配置是否正确？  3. **找慢SQL**：    - 开启慢查询日志：slow_query_log = ON    - 找出执行时间超过long_query_time的SQL    - 分析top慢SQL，看哪些占用时间最长  4. **检查锁等待**：    - show engine innodb status\\G 看锁信息    - information_schema.innodb_locks 查看当前锁    - 是否有长事务未提交导致锁不释放？    - 是否有死锁？  5. **检查服务器资源**：    - CPU使用率：是否飙升？    - IO使用率：iostat看是否有IO瓶颈    - 内存：是否换页频繁    - 网络：是否有丢包延迟  6. **紧急恢复**：    -  kill掉大查询/长事务    - 增加连接数临时解决    - 切从库分流流量    - 必要时重启  7. **根因解决**：    - 慢SQL优化加索引    - 调整连接池参数    - 分库分表拆分数据'
        },
    ],
    cache: [
        {
            question: 'Redis支持哪些数据类型？',
            answer: 'Redis数据类型：1.String：字符串、数值；2.Hash：哈希表；3.List：列表；4.Set：无序集合；5.ZSet：有序集合；6.Bitmap：位图；7.HyperLogLog：基数统计；8.Geo：地理位置；9.Stream：流。'
        },
        {
            question: 'Redis持久化机制有哪些？',
            answer: '持久化方式：1.RDB：快照，定时保存，文件小恢复快，可能丢数据；2.AOF：追加日志，数据安全，文件大恢复慢；3.混合持久化：RDB+AOF，兼顾两者优点。生产推荐AOF+RDB混合模式。'
        },
        {
            question: '缓存穿透、击穿、雪崩的区别及解决方案？',
            answer: '穿透：查询不存在的数据，绕过缓存直接查DB。解决：布隆过滤器、缓存空值。击穿：热点key过期，大量请求打到DB。解决：热点数据永不过期、互斥锁。雪崩：大量key同时过期。解决：过期时间加随机值、多级缓存、熔断降级。'
        },
        {
            question: 'Redis分布式锁的实现方案？',
            answer: '实现方案：1.SETNX+过期时间(非原子)；2.SET key value NX EX seconds(原子)；3.Redisson框架：看门狗自动续期、可重入锁。注意事项：1.设置合理过期时间；2.释放锁时验证value；3.集群环境使用Redlock算法。推荐使用Redisson。'
        },
        {
            question: 'Redis集群架构方案对比？',
            answer: '方案对比：1.主从复制：读写分离，故障需手动切换；2.Sentinel哨兵：自动故障转移，单机内存受限；3.Redis Cluster：官方集群方案，16384槽位分片，支持动态扩缩容。生产推荐Redis Cluster，支持数据分片+高可用。'
        },
        {
            question: 'Redis如何实现消息队列？',
            answer: '实现方式：1.List：LPUSH/BRPOP简单队列；2.Pub/Sub：发布订阅，不支持持久化；3.Stream：类似Kafka，支持消费者组、持久化、ACK。Stream特点：消息ID递增、支持阻塞读取、支持消息回溯。适合轻量级消息场景，复杂场景推荐Kafka/RocketMQ。'
        },
        {
            question: 'Redis的内存碎片如何产生？如何优化？',
            answer: '内存碎片产生：1.频繁更新删除；2.不同大小对象分配释放；3.jemalloc分配策略。查看：INFO memory的mem_fragmentation_ratio。优化：1.数据对齐，使用相同大小结构；2.避免频繁修改；3.使用MEMORY PURGE手动整理；4.重启实例(最后手段)。Redis4.0+支持activedefrag自动整理。'
        },
        {
            question: 'Redis的HyperLogLog和Bitmap有什么应用场景？',
            answer: 'HyperLogLog：基数统计，误差0.81%，内存固定12KB。场景：UV统计、独立访客数。命令：PFADD/PFCOUNT。Bitmap：位图操作，支持位运算。场景：签到统计、在线用户、布隆过滤器。命令：SETBIT/GETBIT/BITCOUNT/BITOP。两者都适合大数据量统计场景。'
        },
        {
            question: 'Redis的Key过期策略是什么？如何避免大量Key同时过期？',
            answer: '过期策略：1.定时删除：创建定时器，到期删除(CPU不友好)；2.惰性删除：访问时检查删除(内存不友好)；3.定期删除：定期随机检查删除(折中)。Redis采用惰性+定期。避免同时过期：1.过期时间加随机值；2.使用不同缓存策略；3.监控过期Key分布。'
        },
        {
            question: 'Redis的Stream数据结构有什么特点？如何实现消息队列？',
            answer: 'Stream特点：1.有序消息队列，自动生成ID；2.支持消费者组；3.支持ACK和Pending列表；4.支持消息回溯。实现MQ：1.XADD添加消息；2.XREADGROUP消费；3.XACK确认；4.XPENDING查看未确认消息。优势：比List更强大，比Kafka更轻量，支持持久化和主从复制。'
        },
        {
            question: 'Redis的Lua脚本有什么优势？如何保证原子性？',
            answer: 'Lua脚本优势：1.原子执行，无需加锁；2.减少网络往返；3.复用复杂逻辑。原子性：Redis单线程执行，整个脚本执行期间不切换。注意：脚本不宜过长，会阻塞其他命令。优化：使用SCRIPT LOAD缓存脚本，EVALSHA执行。Redis7.0支持Function，比Lua更强大。'
        },
        {
            question: 'Redis的Stream数据结构有什么特点？如何实现可靠的消息队列？',
            answer: 'Redis Stream是5.0引入的数据结构：  核心概念： 1. 消息：    - ID: 时间戳-序列号    - Field-Value对  2. 消费者组：    - 多消费者并行消费    - 每个消息只被一个消费者处理    - 支持消息确认  3. Pending列表：    - 已发送但未确认的消息    - 支持消息重试  基本命令： XADD stream * field value    # 添加消息 XREAD COUNT 2 STREAMS stream $  # 读取消息 XGROUP CREATE stream group $  # 创建消费者组 XREADGROUP GROUP group consumer STREAMS stream >  # 消费 XACK stream group id         # 确认消息 XPENDING stream group        # 查看pending  实现可靠消息队列： 1. 生产者： XADD orders * order_id 123 user_id 456  2. 消费者： while True:     msgs = XREADGROUP GROUP order_group consumer1 \\            COUNT 10 BLOCK 5000 \\            STREAMS orders >     for msg in msgs:         process(msg)         XACK orders order_group msg.id  3. 消息重试： pending = XPENDING orders order_group - + 10 for msg in pending:     if msg.idle_time > 60000:  # 超时1分钟         XCLAIM orders order_group consumer2 \\                min_idle_time msg.id  与Kafka对比： | 特性 | Redis Stream | Kafka | |------|--------------|-------| | 持久化 | 支持 | 原生支持 | | 消息回溯 | 支持 | 支持 | | 吞吐量 | 10万/秒 | 百万/秒 | | 延迟 | 毫秒级 | 毫秒级 | | 运维复杂度 | 低 | 高 |  适用场景： 1. 轻量级消息队列 2. 实时数据流 3. 消息通知 4. 日志收集  最佳实践： 1. 合理设置消息过期 2. 监控pending列表 3. 实现死信队列 4. 控制消费者数量'
        },
        {
            question: 'Redis的分布式锁如何实现？Redisson的看门狗机制是什么？',
            answer: 'Redis分布式锁实现：  基础实现： SET lock_key unique_value NX PX 30000  参数说明： - NX: 不存在才设置 - PX: 过期时间(毫秒) - unique_value: 客户端唯一标识  释放锁： if redis.call(\'get\', KEYS[1]) == ARGV[1] then     return redis.call(\'del\', KEYS[1]) else     return 0 end  问题： 1. 锁过期时间不好设置 2. 业务执行时间超过过期时间 3. 误删其他客户端的锁  Redisson实现： 1. 可重入锁： RLock lock = redisson.getLock(\"myLock\"); lock.lock(); try {     // 业务代码 } finally {     lock.unlock(); }  2. 看门狗机制： - 默认过期时间30秒 - 后台线程每10秒续期 - 业务执行完成自动释放 - 防止业务未完成锁过期  3. 公平锁： RLock fairLock = redisson.getFairLock(\"myLock\");  4. 读写锁： RReadWriteLock rwLock = redisson.getReadWriteLock(\"myLock\"); rwLock.readLock().lock(); rwLock.writeLock().lock();  Redlock算法： 1. 获取当前时间戳 2. 依次向N个Redis节点请求锁 3. 计算获取锁消耗的时间 4. 大多数节点获取成功且消耗时间小于锁过期时间才算成功  最佳实践： 1. 使用Redisson而非自己实现 2. 合理设置等待时间 3. 确保在finally中释放锁 4. 集群环境考虑Redlock 5. 监控锁竞争情况'
        },
        {
            question: 'Redis的持久化机制有哪些？如何选择RDB和AOF？',
            answer: 'Redis提供两种持久化机制：  RDB(快照)： 优点： 1. 文件紧凑，适合备份 2. 恢复速度快 3. 对性能影响小  缺点： 1. 可能丢失最后一次快照后的数据 2. 大数据量时fork耗时  配置： save 900 1      # 900秒内1次修改 save 300 10     # 300秒内10次修改 save 60 10000   # 60秒内10000次修改  AOF(追加日志)： 优点： 1. 数据更安全，最多丢1秒 2. 可读性好 3. 支持重写  缺点： 1. 文件更大 2. 恢复速度慢 3. 对性能影响稍大  配置： appendonly yes appendfsync everysec  # 每秒同步  AOF重写： auto-aof-rewrite-percentage 100 auto-aof-rewrite-min-size 64mb  混合持久化(推荐)： aof-use-rdb-preamble yes  重写时先写RDB格式，再追加AOF  选择建议： 1. 只用RDB：    - 允许分钟级数据丢失    - 追求恢复速度  2. 只用AOF：    - 数据安全要求高    - 数据量不大  3. 混合持久化(推荐)：    - 兼顾安全和性能    - 生产环境首选  最佳实践： 1. 开启混合持久化 2. 合理设置重写阈值 3. 监控持久化性能 4. 定期备份持久化文件'
        },
        {
            question: 'Redis的集群方案有哪些？Redis Cluster是如何工作的？',
            answer: 'Redis集群方案对比：  1. 主从复制： 优点：简单，读写分离 缺点：故障需手动切换，单机内存限制  2. Sentinel哨兵： 优点：自动故障转移 缺点：单机内存限制，不支持分片  3. Redis Cluster： 优点：数据分片 + 高可用 缺点：跨槽操作受限  Redis Cluster原理： 1. 槽位分配：    - 16384个槽位    - 每个节点负责部分槽位    - key -> CRC16(key) % 16384  2. 数据分片：    - 每个key属于一个槽位    - 槽位分布在多个节点    - 自动负载均衡  3. 高可用：    - 每个主节点有从节点    - 主节点故障自动切换    - 半数以上主节点存活即可用  集群搭建： redis-cli --cluster create \\   192.168.1.1:6379 192.168.1.2:6379 ... \\   --cluster-replicas 1  客户端路由： 1. Moved重定向：    - 槽位已迁移    - 客户端更新槽位映射  2. Ask重定向：    - 槽位正在迁移    - 临时重定向  注意事项： 1. 批量操作需使用hash tag    {user}:1, {user}:2 在同一槽位  2. 事务需在同一槽位  3. 监控集群状态    redis-cli -c cluster info  最佳实践： 1. 至少6个节点(3主3从) 2. 使用配置文件管理节点 3. 监控槽位分布 4. 预分配槽位避免迁移'
        },
        {
            question: 'Redis的缓存穿透、击穿、雪崩如何解决？布隆过滤器原理是什么？',
            answer: '缓存问题及解决方案：  1. 缓存穿透： 问题：查询不存在的数据，绕过缓存直接查DB  解决： - 布隆过滤器：   - 位图 + 多个Hash函数   - 判断元素可能存在或一定不存在   - 空间效率高，有误判率  - 缓存空值：   SET key \"\" EX 300  2. 缓存击穿： 问题：热点key过期，大量请求打到DB  解决： - 热点数据永不过期 - 互斥锁：   if (cache.get(key) == null) {       if (redis.setnx(lock_key, 1)) {           // 查DB并缓存           redis.set(key, value, ttl);           redis.del(lock_key);       }   }  3. 缓存雪崩： 问题：大量key同时过期  解决： - 过期时间加随机值 - 多级缓存 - 熔断降级  布隆过滤器原理： 1. 初始化：    - 创建m位位数组，全置0    - 选择k个Hash函数  2. 添加元素：    - 计算k个Hash值    - 将对应位置为1  3. 查询元素：    - 计算k个Hash值    - 所有位都为1则可能存在    - 有0则一定不存在  Redis实现： BF.ADD key item      # 添加 BF.EXISTS key item   # 查询  参数选择： - n: 预期元素数量 - p: 误判率 - m = -n*ln(p)/(ln2)^2 - k = m/n*ln2  最佳实践： 1. 合理设置过期时间 2. 使用布隆过滤器 3. 监控缓存命中率 4. 做好熔断降级'
        },
        {
            question: '如何设计一个高并发缓存架构？',
            answer: '架构设计：1.多级缓存(本地缓存+分布式缓存)；2.缓存预热(启动加载热点数据)；3.缓存更新策略(主动更新+被动过期)；4.热点探测(自动识别热点)；5.限流降级(缓存失败时保护DB)；6.监控告警(命中率、延迟)。工具：Caffeine本地缓存、Redis分布式缓存、HotKey探测框架。'
        },
        {
            question: 'Redis大Key问题的排查与解决？',
            answer: '排查方法：1.redis-cli --bigkeys扫描；2 MEMORY USAGE分析；3.RDB分析工具。解决方案：1.String类型拆分；2.Hash/ List/ Set分片；3.压缩大Value；4.避免存储大对象；5.异步删除(UNLINK)。影响：内存不均衡、阻塞线程、网络拥塞、主从同步延迟。'
        },
        {
            question: 'Redis缓存命中率低怎么解决？',
            answer: '排查和优化步骤：  1. **查看命中率**：    - INFO stats    - keyspace_hits / (keyspace_hits + keyspace_misses) = 命中率    - 低于90%就需要优化  2. **命中率低原因**：    - 业务访问不均匀：大量key只访问一次    - 过期时间设置不合理：key集中过期    - 缓存容量不够：满了频繁驱逐    - 缓存预热没做好：新启动服务缓存为空    - Key设计不合理：相同数据不同key无法复用  3. **优化方案**：    - **调整容量**：增加maxmemory，给缓存更多内存    - **优化过期策略**：过期时间加随机扰动，避免集中过期    - **缓存预热**：启动时加载热点数据到缓存    - **热点key发现**：识别热点key做专门优化    - **多级缓存**：本地Caffeine缓存 + Redis    - **调整淘汰策略**：allkeys-lru适合大多数场景    - **避免缓存击穿**：热点key永不过期  4. **监控**：持续监控命中率变化'
        },
        {
            question: 'Redis主从同步延迟大怎么处理？',
            answer: '排查和解决：  1. **查看延迟**：info replication查看master_replica_offset  2. **常见原因**：    - 主库有大key修改：bigkey生成RDB同步慢    - 网络带宽不足：主从跨机房部署    - 从库硬件比主库差：CPU/IO跟不上    - 短时间大量写入：主库QPS太高  3. **解决方法**：    - 避免大key：拆分大key，删除用UNLINK异步    - 同机房部署：降低网络延迟    - 升级从库硬件：提高IO和CPU    - 减少从库数量：读请求多用集群分片    - 开启部分重新同步：psync 2.0支持增量    - 调整缓冲区大小：client-output-buffer-limit  4. **架构优化**：    - Redis Cluster分片，分散压力    - 读写分离，读请求分摊到多个从库    - 避免从库做持久化，节省IO'
        },
        {
            question: 'Redis连接超时怎么排查？',
            answer: '排查步骤：  1. **网络检查**：    - telnet redis-host port看是否能连通    - ping看是否丢包    - 检查防火墙/安全组是否开放端口  2. **连接数检查**：    - INFO clients看connected_clients    - 检查maxclients配置是否达到上限    - 检查应用连接池配置：最大连接数是否合理  3. **Redis本身负载**：    - 检查CPU使用率：是否达到100%    - 检查内存：是否达到maxmemory    - 查看慢查询日志：有没有慢命令阻塞    - 检查持久化：bgsave是否导致IO阻塞  4. **客户端配置**：    - 连接超时时间设置是否合理    - 连接池是否正确回收连接    - 有没有连接泄漏：连接用完没释放    - 心跳检测是否正常  5. **集群模式特殊问题**：    - 节点下线客户端没发现    - 重定向失败    - 拓扑刷新间隔太长'
        },
    ],
    distributed: [
        {
            question: '什么是微服务架构？',
            answer: '微服务架构是将单体应用拆分为多个小型独立服务的架构风格。特点：1.服务独立部署；2.服务间通过HTTP/RPC通信；3.每个服务可独立扩展；4.技术栈灵活；5.团队自治。挑战：分布式事务、服务治理、运维复杂度。'
        },
        {
            question: 'RPC框架的核心组件有哪些？',
            answer: 'RPC核心组件：1.服务注册发现；2.负载均衡；3.序列化协议；4.网络传输(Netty)；5.动态代理；6.服务路由；7.容错机制。主流框架：Dubbo、gRPC、Spring Cloud OpenFeign。'
        },
        {
            question: '分布式事务解决方案有哪些？',
            answer: '解决方案：1.2PC/3PC：强一致性，性能差；2.TCC：最终一致性，业务侵入大；3.本地消息表：最终一致性，简单可靠；4.事务消息：RocketMQ事务消息；5.Seata：阿里开源，支持AT/TCC/SAGA模式。推荐：Seata AT模式(无侵入)或事务消息。'
        },
        {
            question: '消息队列如何保证消息不丢失？',
            answer: '保证机制：1.发送端：确认机制(confirm)、事务消息；2.存储端：同步刷盘、多副本同步复制；3.消费端：手动提交offset。RocketMQ：同步发送+同步刷盘+从节点同步复制+消费确认。Kafka：acks=all+min.insync.replicas>1。'
        },
        {
            question: 'CAP理论和BASE理论的理解？',
            answer: 'CAP理论：分布式系统最多同时满足三项中的两项：一致性(C)、可用性(A)、分区容错性(P)。P是必须的，所以只能在CP和AP中选择。BASE理论：基本可用(Basically Available)、软状态(Soft State)、最终一致性(Eventually Consistent)，是CAP的补充。'
        },
        {
            question: '如何实现分布式ID生成？',
            answer: '方案对比：1.UUID：无序、太长；2.数据库自增：单点问题；3.号段模式：Leaf框架；4.雪花算法：时间戳+机器ID+序列号，趋势递增；5.Redis自增：INCR命令。推荐：雪花算法(Leaf/uid-generator)，支持高并发、趋势递增、分布式部署。'
        },
        {
            question: '如何实现分布式Session？各方案优缺点？',
            answer: '方案对比：1.Redis存储：简单可靠，需要Redis高可用；2.JWT：无状态，无法主动失效，payload有限；3.Spring Session：透明集成，依赖存储；4.Sticky Session：简单，单点故障。推荐：Redis+Spring Session，支持集群、过期、事件监听。注意：Session对象需要序列化，敏感信息不要存Session。'
        },
        {
            question: 'Raft协议的Leader选举过程是怎样的？如何避免脑裂？',
            answer: '选举过程：1.Follower超时转为Candidate；2.增加term，发起投票；3.获得多数票成为Leader；4.发送心跳维持地位。避免脑裂：1.需要多数节点同意；2.每个term只有一个Leader；3.投票时检查term和日志完整性。优化：PreVote机制避免网络分区干扰，Leader Lease机制防止旧Leader继续服务。'
        },
        {
            question: '分布式事务中的Saga模式是什么？与TCC有什么区别？',
            answer: 'Saga模式：将长事务拆分为多个本地事务，每个事务有补偿操作。执行：正向执行所有事务，失败时反向执行补偿。与TCC区别：1.Saga无预留资源阶段；2.Saga补偿是业务补偿，TCC是资源回滚；3.Saga适合长事务，TCC适合短事务；4.Saga实现更简单，但一致性较弱。Seata支持Saga模式。'
        },
        {
            question: '如何设计一个分布式链路追踪系统？',
            answer: '设计要点：1.TraceID：全局唯一，贯穿整个链路；2.SpanID：每个操作一个Span；3.ParentSpanID：关联父Span；4.采样策略：全量/百分比/自适应；5.传输协议：HTTP Header或gRPC Metadata；6.存储：ES/Cassandra；7.可视化：Jaeger/Zipkin。Java Agent方式：SkyWalking、Pinpoint无侵入接入。'
        },
        {
            question: '如何实现数据库的异地多活架构？',
            answer: '异地多活设计：1.数据同步：MySQL主从复制/双向复制；2.冲突解决：时间戳/版本号/业务规则；3.流量路由：DNS/网关就近路由；4.数据分片：按用户ID/地域分片；5.一致性：最终一致性，异步同步；6.故障切换：自动检测，流量切换。挑战：网络延迟、数据冲突、成本控制。参考：阿里单元化架构、美团异地多活方案。'
        },
        {
            question: '如何实现分布式链路追踪？OpenTelemetry的架构是怎样的？',
            answer: '分布式链路追踪核心概念：  1. Trace：    - 完整的请求链路    - 由多个Span组成  2. Span：    - 基本工作单元    - 包含：名称、时间、标签、日志  3. TraceContext：    - TraceID: 全局唯一    - SpanID: 当前Span    - ParentSpanID: 父Span  实现方式： 1. 埋点方式：    - 手动埋点：侵入大，灵活    - 自动埋点：无侵入，不够灵活    - 半自动：注解 + AOP  2. 上下文传播：    - HTTP Header    - gRPC Metadata    - 消息队列Header  OpenTelemetry架构： 1. API层：    - Tracing API    - Metrics API    - Logs API  2. SDK层：    - 采样策略    - 批量处理    - 资源管理  3. Exporter：    - OTLP协议    - Jaeger格式    - Prometheus格式  4. Collector：    - 接收数据    - 处理数据    - 导出数据  采样策略： 1. 概率采样：    - 采样率固定    - 简单高效  2. 自适应采样：    - 根据错误率调整    - 异常请求必采  3. 尾部采样：    - 等待完整链路    - 根据结果决定  部署方案： 1. Agent方式：    - 每个服务部署Agent    - 本地收集数据  2. Collector方式：    - 独立Collector集群    - 集中处理  最佳实践： 1. 合理设置采样率 2. 添加业务标签 3. 监控追踪系统本身 4. 做好数据存储策略'
        },
        {
            question: '如何设计一个分布式ID生成系统？雪花算法的原理和优化方案？',
            answer: '分布式ID要求： 1. 全局唯一 2. 趋势递增(利于索引) 3. 高性能 4. 高可用  方案对比： 1. UUID： 优点：简单，无依赖 缺点：无序，太长，不利于索引  2. 数据库自增： 优点：简单，递增 缺点：单点问题，性能瓶颈  3. 号段模式： 优点：高性能，趋势递增 缺点：需要数据库支持  4. 雪花算法： 优点：高性能，趋势递增，分布式 缺点：依赖时钟  雪花算法结构(64位)： | 1位符号 | 41位时间戳 | 10位机器ID | 12位序列号 |  时间戳：毫秒级，可用69年 机器ID：支持1024个节点 序列号：每毫秒4096个ID  优化方案： 1. Leaf(美团)： - 号段模式 + 雪花算法 - 双buffer预加载 - 解决时钟回拨  2. uid-generator(百度)： - 秒级时间戳 - 更长的序列号 - 支持更大吞吐  3. TinyID： - 纯号段模式 - HTTP接口 - 简单高效  时钟回拨处理： 1. 小幅回拨：等待 2. 中度回拨：使用备用workerId 3. 大幅回拨：报错  实现示例： public synchronized long nextId() {     long timestamp = System.currentTimeMillis();     if (timestamp < lastTimestamp) {         throw new RuntimeException(\"时钟回拨\");     }     if (timestamp == lastTimestamp) {         sequence = (sequence + 1) & 0xFFF;         if (sequence == 0) {             timestamp = waitNextMillis();         }     } else {         sequence = 0;     }     lastTimestamp = timestamp;     return (timestamp - epoch) << 22 | workerId << 12 | sequence; }  最佳实践： 1. 使用成熟的框架 2. 监控时钟同步 3. 预留机器ID 4. 做好降级方案'
        },
        {
            question: 'Raft协议是如何实现分布式一致性的？Leader选举和日志复制流程是怎样的？',
            answer: 'Raft是实现分布式一致性的协议：  核心概念： 1. 节点角色：    - Leader: 处理所有请求    - Follower: 接收Leader消息    - Candidate: 选举中的候选人  2. Term(任期)：    - 逻辑时钟    - 每个Term最多一个Leader    - Term单调递增  Leader选举： 1. Follower超时(150-300ms随机) 2. 转为Candidate，增加Term 3. 投票给自己，向其他节点请求投票 4. 收到多数票成为Leader 5. 立即发送心跳确立地位  投票规则： 1. 一个Term只能投一票 2. 候选人日志至少和自己一样新 3. 先到先得  日志复制： 1. 客户端请求发送到Leader 2. Leader追加日志到本地 3. 并行发送AppendEntries到Follower 4. 多数确认后提交 5. 通知Follower提交  日志匹配： 1. 相同index和term的日志相同 2. 如果两个日志相同，之前的日志也相同  安全性： 1. Leader完整性：    - 已提交的日志不会丢失    - 新Leader必须包含所有已提交日志  2. 状态机安全：    - 所有节点按相同顺序应用日志  优化： 1. PreVote：避免网络分区干扰 2. Leader Lease：防止脑裂 3. ReadIndex：线性一致性读  应用： - etcd - Consul - TiKV - Redis Cluster'
        },
        {
            question: '如何实现数据库的异地多活？数据同步和冲突解决策略？',
            answer: '异地多活架构设计：  核心目标： 1. 灾备能力 2. 就近访问 3. 容量扩展  架构模式： 1. 同城双活：    - 两个机房同时服务    - 数据强同步    - 延迟低  2. 异地多活：    - 多个城市部署    - 数据异步同步    - 延迟较高  数据同步方案： 1. MySQL主从复制：    - 异步复制    - 延迟可控  2. 双向复制：    - 两地都可写    - 冲突需处理  3. 多源复制：    - 多个主节点    - 汇总到中心  冲突解决策略： 1. 时间戳优先：    - 最新修改生效    - 简单但可能丢失数据  2. 版本号：    - 每次修改版本+1    - 高版本覆盖低版本  3. 业务规则：    - 根据业务场景定制    - 如：账户余额取较小值  4. 最后写入者获胜(LWW)：    - 简单实现    - 可能丢失更新  流量路由： 1. DNS解析：    - 就近返回IP    - 简单但不够精确  2. 网关路由：    - 根据用户ID路由    - 精确控制  3. 单元化：    - 用户数据绑定单元    - 单元内闭环  一致性保证： 1. 最终一致性：    - 接受短暂不一致    - 异步同步  2. 强一致性：    - 同步复制    - 性能影响大  最佳实践： 1. 合理划分单元 2. 监控同步延迟 3. 做好流量切换演练 4. 设计补偿机制  参考案例： - 阿里单元化架构 - 美团异地多活 - 微信支付多地部署'
        },
        {
            question: '分布式事务的解决方案有哪些？Seata的AT模式是如何实现的？',
            answer: '分布式事务解决方案：  1. 2PC(两阶段提交)： 优点：强一致性 缺点：同步阻塞、单点故障、数据不一致风险  2. 3PC(三阶段提交)： 改进：增加预提交阶段，超时机制 缺点：网络分区时仍可能不一致  3. TCC(Try-Confirm-Cancel)： 优点：最终一致性，性能好 缺点：业务侵入大，开发成本高  4. 本地消息表： 优点：简单可靠 缺点：需要定时任务轮询  5. 事务消息： 优点：解耦，可靠 缺点：依赖消息队列  6. Seata： 支持AT、TCC、SAGA、XA模式  Seata AT模式原理： 1. 一阶段：    - 解析SQL，记录前后镜像    - 生成undo log    - 提交本地事务    - 释放本地锁  2. 二阶段提交：    - 异步删除undo log  3. 二阶段回滚：    - 根据undo log反向生成SQL    - 恢复数据  全局锁： - 记录正在修改的记录 - 防止脏写 - 本地事务提交前获取  使用示例： @GlobalTransactional public void purchase(String userId, String commodityCode, int orderCount) {     storageService.deduct(commodityCode, orderCount);     orderService.create(userId, commodityCode, orderCount); }  配置： seata:   tx-service-group: my_test_tx_group   service:     vgroup-mapping:       my_test_tx_group: default  最佳实践： 1. 合理设置全局事务超时 2. 避免大事务 3. 做好幂等处理 4. 监控事务成功率'
        },
        {
            question: '如何设计一个高可用的分布式系统？',
            answer: '设计原则：1.无单点：每个组件都集群化；2.故障隔离：熔断、降级、限流；3.快速失败：超时控制、重试策略；4.数据冗余：多副本、多机房；5.监控告警：全链路监控；6.容灾演练：混沌工程。关键组件：注册中心集群、配置中心集群、网关集群、数据库主从、缓存集群、消息队列集群。'
        },
        {
            question: '分布式一致性算法Raft和Paxos的对比？',
            answer: 'Paxos：理论基础，难以理解和实现，适用于分布式一致性协议底层。Raft：简化版Paxos，分为Leader选举、日志复制、安全性三个子问题，易于理解和实现。Raft流程：1.选举Leader；2.Leader接收写请求；3.日志复制到Follower；4.多数确认后提交。应用：etcd、Consul、Redis Cluster都基于Raft。'
        },
        {
            question: '服务调用失败怎么处理？重试策略怎么设计？',
            answer: '**处理失败流程**：  1. **失败分类**：    - 临时失败：网络波动、超时    - 永久失败：参数错误、服务不存在  2. **重试策略设计**：    - 重试次数：一般 2-3 次足够    - 退避策略：      * 固定间隔：每次等 1s      * 指数退避：1s -> 2s -> 4s -> 8s      * 随机退避：加上随机抖动避免雪崩  3. **幂等性保证**：    - 重试必须保证幂等    - 网关生成唯一requestId，服务去重    - 数据库唯一约束防重复  4. **熔断降级**：    - 失败次数达到阈值，打开熔断    - 直接返回降级结果，不调用下游    - 半打开状态探测是否恢复  5. **最佳实践**：    - 只重试临时失败，不重试永久失败    - 重试间隔不要太短    - 避免重试风暴：层级重试控制总次数    - 使用成熟框架：Sentinel、Resilience4j'
        },
        {
            question: '服务发现找不到实例，怎么排查？',
            answer: '**排查步骤**：  1. **检查服务本身**：    - 服务是否启动成功？看日志    - 服务健康检查是否通过？    - 端口是否监听？netstat -lnp 看  2. **检查注册中心**：    - 服务是否成功注册？去Nacos/Eureka控制台看    - 注册信息是否正确？IP和端口对不对    - 是不是租约过期了？心跳有没有正常上报  3. **检查网络**：    - 消费者能不能ping通注册中心    - 消费者能不能ping通服务实例IP    - 防火墙/安全组有没有开放端口  4. **检查配置**：    - 消费者namespace对不对？    - 服务分组对不对？    - 是不是配置了错误的服务名  5. **集群特殊问题**：    - 注册中心集群数据同步了吗？    - 是不是某个注册中心节点挂了  6. **解决方法**：    - 先重启服务重新注册    - 检查健康检查配置    - 网络连通性测试'
        },
        {
            question: 'Kafka消费消息重复怎么处理？如何保证Exactly-Once？',
            answer: '**重复消费原因**： - 消费成功没提交offset，重启后重新消费 - 消费失败重试 - 分区重平衡，重新分配消费  **解决重复消费**： 1. **幂等处理**：    - 使用消息唯一ID + 业务表去重    - 处理前先insert去重表，成功再处理业务    - 数据库唯一键约束，重复插入会报错  2. **业务幂等设计**：    - 相同消息多次处理结果一样    - 比如：支付消息，已经支付过就直接返回成功  **保证Exactly-Once**： 1. **Kafka幂等生产者**：enable.idempotence = true    - PID + SequenceNumber 去重  2. **事务**：    - 生产者发送多个消息，要么全部成功要么全部失败    - producer.beginTransaction() ... commitTransaction()  3. **消费端处理**：    - 业务处理 + 提交offset 放在同一个事务    - 数据库本地事务：业务写入 + offset写入同一张表  **最佳实践**： - 大部分场景保证至少一次+业务幂等就够了 - 不需要严格Exactly-Once，性能更好 - 幂等比事务更简单易用'
        },
    ],
    design: [
        {
            question: '常见的设计模式有哪些？',
            answer: '设计模式分类：1.创建型：单例、工厂、建造者、原型；2.结构型：代理、适配器、装饰器、组合；3.行为型：策略、模板、观察者、责任链。Spring中常用：单例(Bean)、代理(AOP)、模板(JdbcTemplate)、策略(Resource)。'
        },
        {
            question: '单例模式的几种实现方式？',
            answer: '实现方式：1.饿汉式：类加载时创建，线程安全；2.懒汉式：延迟加载，需同步；3.双重检查锁：volatile+双重检查；4.静态内部类：利用类加载机制；5.枚举：天然单例，防止反射攻击。推荐：静态内部类或枚举方式。'
        },
        {
            question: '如何设计一个秒杀系统？',
            answer: '设计要点：1.前端：静态化、CDN、按钮防重复点击；2.网关层：限流、黑名单；3.服务层：库存预热到Redis、预扣库存、异步下单；4.数据库：分库分表、乐观锁扣库存；5.兜底：熔断降级、兜底页面。核心：将请求拦截在数据库之前，Redis原子扣库存。'
        },
        {
            question: '负载均衡算法有哪些？',
            answer: '负载均衡算法：1.轮询：依次分配；2.加权轮询：按权重分配；3.随机：随机选择；4.加权随机：按权重随机；5.最少连接：选连接数最少的；6.一致性Hash：相同请求路由到同一服务器。Nginx支持轮询、权重、IP Hash；Dubbo支持多种策略。'
        },
        {
            question: '如何设计一个短链接服务？',
            answer: '设计方案：1.发号器：分布式ID生成短码；2.存储：Redis缓存热点+MySQL持久化；3.跳转：302重定向；4.高可用：多级缓存、分库分表。短码生成：1.自增ID转62进制；2.Hash(MurmurHash)+冲突处理；3.雪花算法。扩展：自定义短码、过期时间、访问统计。'
        },
        {
            question: '如何设计一个延迟任务调度系统？',
            answer: '设计方案：1.Redis ZSet：score为执行时间，定时扫描；2.时间轮：Netty HashedWheelTimer，单机；3.消息队列延迟消息：RocketMQ延迟级别/Kafka延迟主题；4.时间轮+Redis：分布式时间轮。推荐：RocketMQ延迟消息(简单)或自研时间轮调度器(灵活)。'
        },
        {
            question: '如何设计一个API网关？',
            answer: '网关设计：1.核心功能：路由、负载均衡、限流、熔断、鉴权；2.高性能：Netty/WebFlux异步非阻塞；3.过滤器链：前置/后置过滤器；4.服务发现：动态路由更新；5.安全：OAuth2/JWT、签名验证；6.监控：请求日志、指标收集。开源：Spring Cloud Gateway、Zuul、APISIX、Kong。'
        },
        {
            question: '如何设计一个高并发限流系统？',
            answer: '限流设计：1.算法选择：令牌桶(允许突发)、漏桶(恒定速率)、滑动窗口(精确控制)；2.分布式限流：Redis+Lua原子操作；3.网关层限流：Nginx/Gateway；4.应用层限流：Sentinel/Resilience4j；5.多级限流：本地+分布式。关键参数：QPS阈值、等待队列、拒绝策略。监控：实时QPS、拒绝率、等待时间。'
        },
        {
            question: '如何设计一个分布式ID生成服务？',
            answer: '设计要点：1.唯一性：雪花算法、号段模式；2.有序性：趋势递增，利于索引；3.高性能：本地缓存+异步预取；4.高可用：多机房部署、故障转移；5.可扩展：支持多业务线。方案：Leaf(美团)：号段+雪花；uid-generator(百度)：雪花变种；TinyID：号段模式。注意：时钟回拨处理、机器ID分配。'
        },
        {
            question: '如何设计一个分布式任务调度系统？',
            answer: '调度系统设计：1.调度中心：任务管理、触发器、执行器管理；2.执行器：任务执行、心跳上报；3.路由策略：轮询/随机/一致性Hash/分片广播；4.故障转移：执行器故障自动切换；5.任务依赖：DAG编排；6.监控告警：执行日志、失败通知。开源：XXL-Job、PowerJob、Elastic-Job。'
        },
        {
            question: '如何设计一个高可用的配置中心？',
            answer: '配置中心设计：1.存储：数据库持久化+缓存加速；2.高可用：集群部署+Raft选举；3.推送：长轮询/WebSocket/消息队列；4.灰度：按IP/标签推送；5.版本管理：历史版本+回滚；6.权限：RBAC+审计日志。开源方案：Nacos(配置+注册)、Apollo(携程)、Spring Cloud Config。'
        },
        {
            question: '如何设计一个短链接服务？如何处理高并发和防止恶意访问？',
            answer: '短链接服务设计：  核心流程： 1. 长链接 -> 短链接 2. 短链接 -> 长链接(302跳转)  短码生成方案： 1. 自增ID转62进制：    - 简单高效    - 可预测    - 需要分布式ID  2. Hash算法：    - MurmurHash    - 冲突处理    - 不可预测  3. 雪花算法：    - 趋势递增    - 分布式友好  存储设计： 1. 分库分表：    - 按短码Hash分片    - 支持水平扩展  2. 缓存策略：    - Redis缓存热点链接    - 本地缓存高频链接  高并发处理： 1. 多级缓存：    - 本地缓存(Caffeine)    - Redis缓存    - 数据库  2. 预热：    - 活动前预热缓存    - 定时刷新热点  3. 异步处理：    - 访问统计异步写入    - MQ削峰  防恶意访问： 1. 限流：    - IP限流    - 用户限流    - 短链接限流  2. 黑名单：    - IP黑名单    - 用户黑名单  3. 验证码：    - 异常访问触发    - 人机验证  4. 链接过期：    - 设置有效期    - 定期清理  数据统计： 1. 访问量统计 2. 地域分布 3. 来源分析 4. 设备分析  架构示例： 用户 -> CDN -> 网关 -> 服务 -> Redis -> DB                     ↓                   MQ -> 统计服务  最佳实践： 1. 短码长度6-8位 2. 使用302而非301 3. 监控服务可用性 4. 做好数据备份'
        },
        {
            question: '如何设计一个高可用的API网关？核心功能有哪些？',
            answer: 'API网关核心功能：  1. 路由转发： - 动态路由 - 负载均衡 - 灰度发布  2. 安全认证： - 身份认证 - 权限校验 - 黑白名单  3. 流量控制： - 限流 - 熔断 - 降级  4. 协议转换： - HTTP转RPC - 协议适配  5. 监控统计： - 请求日志 - 性能监控 - 调用链追踪  高可用设计： 1. 多级缓存：    - 本地缓存路由规则    - Redis缓存热点数据  2. 熔断降级：    - 服务不可用时快速失败    - 返回降级响应  3. 限流保护：    - 令牌桶算法    - 滑动窗口  4. 健康检查：    - 主动探测    - 被动检测  Spring Cloud Gateway实现： 1. 路由配置： spring:   cloud:     gateway:       routes:         - id: user-service           uri: lb://user-service           predicates:             - Path=/api/user/**           filters:             - name: RequestRateLimiter               args:                 redis-rate-limiter.replenishRate: 10  2. 自定义过滤器： @Component public class AuthFilter implements GlobalFilter {     public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {         String token = exchange.getRequest().getHeaders().getFirst(\"Authorization\");         if (token == null) {             exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);             return exchange.getResponse().setComplete();         }         return chain.filter(exchange);     } }  性能优化： 1. 使用Netty 2. 开启连接池 3. 异步非阻塞 4. 合理设置超时  其他方案： - Kong：基于Nginx - APISIX：云原生 - Zuul：Spring Cloud'
        },
        {
            question: '如何设计一个高并发秒杀系统？核心设计要点是什么？',
            answer: '秒杀系统核心设计：  1. 前端优化： - 静态资源CDN - 按钮防重复点击 - 答题/验证码防机器人 - 请求随机延迟  2. 网关层： - 限流：令牌桶/漏桶 - 黑名单：IP/用户 - 请求过滤：无效请求直接拒绝  3. 服务层： - 库存预热到Redis - 预扣库存：DECR原子操作 - 异步下单：MQ削峰 - 令牌机制：先抢令牌再抢库存  4. 数据层： - 分库分表 - 乐观锁扣库存 - 读写分离  核心代码： // Redis预扣库存 long stock = redis.decr(\"stock:\" + itemId); if (stock < 0) {     redis.incr(\"stock:\" + itemId);     throw new BusinessException(\"库存不足\"); }  // 发送MQ异步下单 mqSender.send(new OrderMessage(userId, itemId));  // 数据库乐观锁 UPDATE item SET stock = stock - 1  WHERE id = ? AND stock > 0;  防超卖方案： 1. Redis原子操作 2. 数据库乐观锁 3. 分布式锁兜底  热点数据处理： 1. 本地缓存 + Redis 2. 热点探测自动识别 3. 动态调整限流阈值  容灾方案： 1. 降级：直接返回失败 2. 熔断：保护下游服务 3. 兜底：静态页面  监控指标： 1. QPS/TPS 2. 成功率 3. 响应时间 4. 库存余量'
        },
        {
            question: '如何设计一个分布式任务调度系统？XXL-Job的架构是怎样的？',
            answer: '分布式任务调度核心功能：  1. 任务管理： - 任务配置 - 任务依赖 - 任务分组  2. 调度策略： - Cron表达式 - 固定频率 - 固定延迟  3. 执行策略： - 单机执行 - 广播执行 - 分片执行  4. 容错机制： - 故障转移 - 重试策略 - 超时控制  XXL-Job架构： 1. 调度中心： - 任务管理 - 触发器管理 - 执行器管理 - 日志管理  2. 执行器： - 任务执行 - 心跳上报 - 结果回调  3. 通信协议： - HTTP - Netty  分片广播： // 任务参数 ShardingUtil.ShardingVO sharding = ShardingUtil.getShardingVo(); int index = sharding.getIndex(); int total = sharding.getTotal();  // 分片处理 List<Task> tasks = getTasks(); for (int i = 0; i < tasks.size(); i++) {     if (i % total == index) {         process(tasks.get(i));     } }  任务依赖： 1. 串行执行：    A -> B -> C  2. 并行执行：    A, B 同时执行  3. 混合执行：    A -> (B, C) -> D  高可用设计： 1. 调度中心集群：    - 基于数据库锁选举    - 只有一个节点执行调度  2. 执行器集群：    - 多实例部署    - 故障自动转移  最佳实践： 1. 任务幂等设计 2. 合理设置超时 3. 做好任务监控 4. 日志记录完善  其他方案： - ElasticJob：基于Zookeeper - PowerJob：支持MapReduce - Quartz：单机调度'
        },
        {
            question: '如何设计一个延迟任务调度系统？时间轮算法原理是什么？',
            answer: '延迟任务场景： 1. 订单超时取消 2. 消息延迟投递 3. 定时提醒  实现方案： 1. 数据库轮询： 优点：简单 缺点：性能差，延迟高  2. Redis ZSet： 优点：实现简单 缺点：大数据量性能下降  // 添加任务 ZADD delay_queue <执行时间戳> <任务ID>  // 消费任务 ZRANGEBYSCORE delay_queue 0 <当前时间戳> LIMIT 0 100  3. 时间轮： 优点：高性能，低延迟 缺点：单机，重启丢失  时间轮原理： 1. 环形数组：    - 固定大小槽位    - 每个槽位存放任务链表    - 指针按固定间隔移动  2. 任务添加：    ticks = 延迟时间 / 时间轮间隔    index = (currentTick + ticks) % wheelSize    wheel[index].add(task)  3. 任务执行：    指针移动时执行当前槽位的到期任务  Netty时间轮： HashedWheelTimer timer = new HashedWheelTimer(     100, TimeUnit.MILLISECONDS,  // tick间隔     512                          // 槽位数 );  timer.newTimeout(timeout -> {     // 执行任务 }, 5, TimeUnit.SECONDS);  层级时间轮： 1. 秒级时间轮：处理秒级延迟 2. 分钟级时间轮：处理分钟级延迟 3. 小时级时间轮：处理小时级延迟  任务升级： - 秒级时间轮任务到期后升级到分钟级 - 分钟级任务到期后升级到小时级  分布式时间轮： 1. Redis + 时间轮：    - Redis存储任务    - 本地时间轮调度  2. MQ延迟消息：    - RocketMQ延迟级别    - Kafka延迟主题  最佳实践： 1. 合理设置时间轮参数 2. 任务持久化防止丢失 3. 监控任务执行情况 4. 做好任务重试机制'
        },
        {
            question: '如何设计一个高并发抢红包系统？',
            answer: '架构设计：1.发红包：生成红包ID，金额拆分存Redis List，设置过期时间；2.抢红包：Redis原子pop，CAS防并发；3.入账：MQ异步写DB，保证最终一致性；4.防刷：用户限频、设备指纹；5.监控：实时监控红包状态。关键技术：Redis原子操作、MQ异步处理、分布式锁、幂等设计。'
        },
        {
            question: '如何设计一个分布式任务调度平台？',
            answer: '设计要点：1.调度中心：任务配置、触发器管理、执行日志；2.执行器：任务执行、心跳上报；3.调度算法：轮询、分片广播；4.高可用：调度中心集群、执行器集群、故障转移；5.特性：任务依赖、失败重试、超时控制、告警通知。参考：XXL-Job、Elastic-Job、PowerJob。'
        },
        {
            question: '线上服务CPU 100%如何排查？说说你的排查步骤',
            answer: '排查步骤：  1. **top 命令**：    - 看哪个进程 CPU 使用率高    - 记下 PID  2. **找出高CPU线程**：    - top -H -p PID 看哪个线程高    - 记下 TID    - 转十六进制：printf \"%x\\n\" TID  3. **jstack 导出栈**：    - jstack PID | grep 十六进制TID -A 20    - 看线程卡在哪个方法  4. **常见原因**：    - 死循环：代码bug    - 频繁GC：内存泄漏，FGC频繁    - 正则表达式灾难性回溯    - 大量线程上下文切换    - 热点代码没有优化  5. **工具快捷方式**：    - Arthas：thread -n 3 显示前3个忙的线程    - async-profiler：低开销采样分析    - JFR：记录CPU事件事后分析  6. **紧急处理**：    - 先重启服务恢复    - 保留现场dump文件    - 上线后修复代码重新发布'
        },
        {
            question: '服务内存溢出OOM，怎么排查？',
            answer: '排查步骤：  1. **确认OOM类型**：    - Heap space：堆内存不够    - Metaspace：元空间不够    - Direct buffer：直接内存满了    - Unable to create new thread：无法创建线程  2. **事前配置**：    - 加上参数：-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/path    - OOM时自动生成dump文件  3. **分析dump**：    - MAT工具打开：Leak Suspects找泄漏怀疑    - Histogram：按类看实例数和大小    - Dominator Tree：找出最大对象    - 找引用链：看谁持有大对象不释放  4. **常见泄漏原因**：    - static List不断加对象不清理    - 缓存没设置过期    - IO流/Connection没关闭    - 内部类持有外部类    - 监听器没remove  5. **解决**：    - 代码修复：清理不需要的对象    - 增大-Xmx    - 检查资源关闭finally块'
        },
        {
            question: '服务接口超时，如何定位问题？',
            answer: '定位步骤：  1. **确定范围**：    - 是所有接口慢还是单个？    - 从前端到后端一步步测    - ping/curl/telnet 看网络  2. **分层排查**：    - CDN -> 网关 -> 应用 -> 缓存 -> 数据库  3. **工具辅助**：    - Arthas trace：看哪个方法耗时    - showtable：看sql执行时间    - 监控系统看指标：CPU/内存/GC/QPS  4. **常见原因**：    - SQL慢：没索引，锁等待    - 缓存没命中：击穿到DB    - 第三方接口调用慢    - 锁竞争激烈    - 线程池满了，排队    - GC停顿时间长  5. **优化方向**：    - SQL加索引    - 缓存优化    - 异步化    - 超时降级    - 扩容'
        },
    ],
};


// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initTopicsGrid();
    initEventListeners();
    initTheme();
    animateCounter();
});

// 渲染主题卡片
function initTopicsGrid() {
    const grid = document.getElementById('topicsGrid');
    grid.innerHTML = topics.map(topic => `
        <div class="topic-card" data-topic="${topic.id}" style="border-top: 4px solid ${topic.color}">
            <div class="topic-icon" style="background: ${topic.color}">
                <i class="${topic.icon}"></i>
            </div>
            <h3>${topic.name}</h3>
            <p>${topic.description}</p>
            <div class="topic-footer">
                <span class="topic-count">${topic.count}+ 题目</span>
                <span class="btn-view">查看题目 <i class="fas fa-arrow-right"></i></span>
            </div>
        </div>
    `).join('');

    // 添加点击事件
    grid.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', function() {
            const topicId = this.dataset.topic;
            openTopicModal(topicId);
        });
    });
}

// 打开题目模态框
function openTopicModal(topicId) {
    const topic = topics.find(t => t.id === topicId);
    const modal = document.getElementById('questionModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = `${topic.name} - 面试题`;
    
    const topicQuestions = questions[topicId] || [];
    if (topicQuestions.length === 0) {
        body.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">该分类题目正在整理中，敬请期待...</p>';
    } else {
        body.innerHTML = topicQuestions.map((q, index) => `
            <div class="question-item">
                <div class="question-title">${index + 1}. ${q.question}</div>
                <div class="question-answer">${formatAnswer(q.answer)}</div>
            </div>
        `).join('');
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 格式化答案文本
function formatAnswer(answer) {
    return `<p>${answer}</p>`;
}

// 初始化事件监听
function initEventListeners() {
    // 关闭题目模态框
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('questionModal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    function closeModal() {
        document.getElementById('questionModal').classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 搜索框事件
    document.getElementById('btnSearch').addEventListener('click', openSearch);
    document.getElementById('closeSearch').addEventListener('click', closeSearch);
    document.getElementById('searchModal').addEventListener('click', function(e) {
        if (e.target === this) closeSearch();
    });
    
    document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 300));
    
    // 主题切换
    document.getElementById('btnTheme').addEventListener('click', toggleTheme);
    
    // 回到顶部
    window.addEventListener('scroll', toggleBackToTop);
    document.getElementById('backToTop').addEventListener('click', scrollToTop);
    
    // 知识分类折叠
    document.querySelectorAll('.knowledge-category .category-header').forEach(header => {
        header.addEventListener('click', function() {
            const category = this.parentElement;
            category.classList.toggle('collapsed');
        });
    });
    
    // 导航栏链接点击
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动监听导航高亮
    window.addEventListener('scroll', debounce(highlightNav, 100));
}

// 打开搜索
function openSearch() {
    const modal = document.getElementById('searchModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('searchInput').focus();
}

// 关闭搜索
function closeSearch() {
    const modal = document.getElementById('searchModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 搜索处理
function handleSearch(e) {
    const query = e.target.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!query) {
        resultsContainer.innerHTML = '<p class="no-results">请输入关键词搜索题目</p>';
        return;
    }
    
    let results = [];
    Object.keys(questions).forEach(topicId => {
        const topic = topics.find(t => t.id === topicId);
        questions[topicId].forEach((q, index) => {
            if (q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query)) {
                results.push({
                    ...q,
                    topicId,
                    topicName: topic.name
                });
            }
        });
    });
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">没有找到相关题目</p>';
    } else {
        resultsContainer.innerHTML = results.map(r => `
            <div class="search-result-item" onclick="openTopicQuestion('${r.topicId}', '${r.question.replace(/'/g, '&#39;')}', '${r.answer.replace(/'/g, '&#39;')}')">
                <h4>${r.question}</h4>
                <span class="topic-tag">${r.topicName}</span>
            </div>
        `).join('');
    }
}

// 打开搜索结果中的题目
function openTopicQuestion(topicId, question, answer) {
    closeSearch();
    const topic = topics.find(t => t.id === topicId);
    const modal = document.getElementById('questionModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = `${topic.name} - 题目`;
    body.innerHTML = `
        <div class="question-item">
            <div class="question-title">${question}</div>
            <div class="question-answer"><p>${answer}</p></div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 主题切换
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('btnTheme');
    const icon = btn.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// 回到顶部
function toggleBackToTop() {
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 导航高亮
function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// 数字计数动画
function animateCounter() {
    const total = Object.values(questions).reduce((sum, arr) => sum + arr.length, 0);
    const target = 256; // 总题目数预估
    const element = document.getElementById('totalQuestions');
    let current = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    
    function step() {
        current += increment;
        if (current >= target) {
            element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// 防抖
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 暴露给全局
window.openTopicQuestion = openTopicQuestion;
