#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import json
import os
import random
import sys
import urllib.request
import urllib.parse
import ssl
from datetime import datetime

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(SKILL_DIR, 'data', 'questions.json')
OUTPUT_DIR = os.path.join(SKILL_DIR, 'output')

def load_data():
    if not os.path.exists(DATA_FILE):
        return {"knowledge_system": {}, "questions": {}, "search_history": []}
    
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_data(data):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def search_knowledge_points(topic, count=5):
    questions = []
    
    search_queries = {
        'java': 'Java后端知识点 高级 2024',
        'jvm': 'JVM调优知识点 高级',
        'concurrent': 'Java并发编程知识点 高级',
        'spring': 'Spring Boot知识点 高级',
        'database': 'MySQL数据库知识点 高级',
        'cache': 'Redis缓存知识点 高级',
        'distributed': '分布式系统知识点 高级',
        'design': '系统设计知识点 高级',
        'middleware': '后端中间件知识点 高级',
        'gateway': 'API网关服务发现知识点',
        'container': 'Docker Kubernetes知识点 高级'
    }
    
    query = search_queries.get(topic, f'{topic}知识点 高级')
    
    sample_questions = {
        'java': [
            {"q": "Java中的WeakReference、SoftReference、PhantomReference有什么区别？应用场景是什么？", "a": "WeakReference弱引用，GC时会被回收，适用于缓存；SoftReference软引用，内存不足时回收，适用于内存敏感缓存；PhantomReference虚引用，无法通过get()获取对象，用于跟踪对象回收，配合ReferenceQueue使用。"},
            {"q": "Java中的Fork/Join框架原理是什么？如何优化任务窃取？", "a": "Fork/Join基于分治思想，将大任务拆分为小任务并行执行。工作窃取：空闲线程从其他线程队列尾部窃取任务。优化：1.合理设置阈值避免任务过小；2.使用RecursiveTask/RecursiveAction；3.避免在任务中同步；4.合理设置并行度。"},
            {"q": "Java中的MethodHandle与反射的区别？性能如何？", "a": "MethodHandle是JSR-292引入的动态方法调用机制。区别：1.MethodHandle是字节码层面的，反射是API层面；2.MethodHandle支持方法内联优化；3.MethodHandle需要精确类型匹配。性能：MethodHandle比反射快，接近直接调用。"},
            {"q": "Java中的VarHandle是什么？与Atomic类有什么区别？", "a": "VarHandle是Java9引入的变量句柄，提供对变量的原子操作和内存屏障。与Atomic类区别：1.VarHandle更底层，支持更多内存模式；2.VarHandle可以操作任意字段；3.Atomic类封装更好，使用更简单。VarHandle适合需要精细控制的场景。"},
            {"q": "Java中的Foreign Function Interface (FFI)是什么？如何与Native代码交互？", "a": "FFI是Java调用非Java代码的机制。传统方式：JNI，需要编写C代码和头文件。现代方式：Panama项目，提供更简洁的API。JEP 389引入了Foreign Linker API，可以直接调用C库函数，无需JNI代码。"}
        ],
        'jvm': [
            {"q": "JVM中的JIT编译器C1和C2有什么区别？如何选择？", "a": "C1(Client编译器)：快速编译，优化较少，适合启动速度敏感的应用；C2(Server编译器)：编译慢，优化激进，适合长期运行的服务端应用。分层编译(Tiered Compilation)：先C1编译，热点代码再C2编译，兼顾启动速度和峰值性能。"},
            {"q": "JVM中的逃逸分析(Escape Analysis)能做什么优化？", "a": "逃逸分析判断对象是否逃逸出方法或线程。优化：1.栈上分配：不逃逸对象在栈上分配，无需GC；2.标量替换：将对象拆解为标量变量；3.锁消除：不逃逸对象上的锁可以消除。开启参数：-XX:+DoEscapeAnalysis。"},
            {"q": "JVM中的Graal编译器有什么优势？", "a": "Graal是用Java编写的JIT编译器。优势：1.更好的优化能力，支持部分逃逸分析；2.与GraalVM配合支持多语言；3.可插拔架构，易于扩展；4.AOT编译支持，提升启动速度。缺点：编译耗时较长，内存占用高。"},
            {"q": "JVM中的JFR(Java Flight Recorder)如何用于生产环境诊断？", "a": "JFR是低开销的事件记录框架。使用：1.启动时添加-XX:StartFlightRecording参数；2.jcmd命令动态控制；3.JMC(JDK Mission Control)分析数据。可记录：GC、锁竞争、IO、CPU使用等。开销<1%，适合生产环境。"},
            {"q": "如何分析和解决Metaspace内存泄漏问题？", "a": "Metaspace存储类元数据。泄漏原因：1.动态代理生成大量类；2.JSP/热部署加载大量类；3.反射缓存未清理。排查：jmap -clstats查看类加载情况，-XX:+TraceClassLoading跟踪类加载。解决：限制动态代理、清理反射缓存、增大Metaspace。"}
        ],
        'concurrent': [
            {"q": "Java中的StampedLock与ReentrantReadWriteLock有什么区别？", "a": "StampedLock特点：1.支持乐观读，无锁读取；2.不可重入；3.支持锁转换(乐观读->悲观读)；4.性能更好。ReentrantReadWriteLock特点：1.可重入；2.支持公平/非公平；3.支持Condition。选择：读多写少且不需要重入用StampedLock，需要重入用ReadWriteLock。"},
            {"q": "Java中的LongAdder与AtomicLong有什么区别？性能差异原因？", "a": "LongAdder在高并发下性能更好。原理：LongAdder使用分段累加，每个线程更新自己的Cell，最后sum汇总。AtomicLong使用CAS单点更新，高并发时竞争激烈。适用场景：LongAdder适合计数统计，AtomicLong需要精确控制或CAS操作时使用。"},
            {"q": "Java中的ForkJoinPool与ThreadPoolExecutor有什么区别？", "a": "ForkJoinPool特点：1.工作窃取算法，负载均衡；2.适合分治任务；3.支持RecursiveTask/RecursiveAction。ThreadPoolExecutor特点：1.共享任务队列；2.适合独立任务；3.需要手动分片。选择：递归分治任务用ForkJoinPool，独立任务用ThreadPoolExecutor。"},
            {"q": "如何实现一个支持优先级的线程池？", "a": "实现方案：1.使用PriorityBlockingQueue作为任务队列；2.任务实现Comparable接口或提供Comparator；3.注意：PriorityBlockingQueue是无界的，需要自定义有界优先队列或使用Semaphore限流。Spring提供ThreadPoolTaskExecutor支持自定义队列。"},
            {"q": "Java中的VarHandle在并发编程中有什么应用？", "a": "VarHandle提供原子操作和内存屏障。应用：1.实现自定义原子类；2.精确控制内存可见性(release/acquire模式)；3.实现高性能并发数据结构；4.替代Unsafe类。示例：VarHandle.compareAndSet实现CAS，VarHandle.setRelease实现写屏障。"}
        ],
        'spring': [
            {"q": "Spring中的循环依赖是如何解决的？三级缓存的作用？", "a": "Spring通过三级缓存解决循环依赖：1.singletonObjects：完整Bean；2.earlySingletonObjects：早期暴露的Bean；3.singletonFactories：Bean工厂。流程：A创建->注入B->B创建->注入A->从三级缓存获取A工厂->创建A代理->放入二级缓存->B完成->A完成。注意：构造器注入无法解决。"},
            {"q": "Spring中的@Async是如何实现的？线程池如何配置？", "a": "@Async通过AOP实现异步调用。原理：1.AsyncAnnotationBeanPostProcessor处理@Async；2.通过代理提交任务到线程池；3.默认使用SimpleAsyncTaskExecutor。配置：实现AsyncConfigurer接口或配置spring.task.execution线程池参数。注意：同类调用不生效(未走代理)。"},
            {"q": "Spring中的事件机制(ApplicationEvent)是如何实现的？", "a": "Spring事件机制基于观察者模式。组件：1.ApplicationEvent：事件基类；2.ApplicationListener：监听器接口；3.ApplicationEventPublisher：事件发布接口；4.ApplicationEventMulticaster：事件广播器。异步事件：@Async注解或配置SimpleApplicationEventMulticaster线程池。"},
            {"q": "Spring Boot的启动流程是怎样的？", "a": "启动流程：1.创建SpringApplication对象；2.判断应用类型(Servlet/Reactive)；3.加载ApplicationContextInitializer和ApplicationListener；4.执行run方法；5.创建ApplicationContext；6.准备环境、打印Banner；7.刷新上下文(核心)；8.执行Runner；9.发布启动完成事件。"},
            {"q": "Spring Cloud Gateway的过滤器链是如何实现的？", "a": "Gateway基于WebFlux实现。过滤器链：1.GlobalFilter：全局过滤器；2.GatewayFilter：路由级过滤器；3.过滤器排序：Order接口；4.执行：Reactive模式，Mono链式调用。自定义过滤器：实现GlobalFilter和Ordered接口。限流：RequestRateLimiter GatewayFilter，基于Redis+Lua实现令牌桶。"}
        ],
        'database': [
            {"q": "MySQL的MVCC是如何实现的？Read View的作用？", "a": "MVCC通过undo log版本链+Read View实现。Read View包含：m_ids(活跃事务ID)、min_trx_id、max_trx_id、creator_trx_id。可见性判断：1.事务ID<min_trx_id：可见；2.事务ID>=max_trx_id：不可见；3.在m_ids中：不可见；4.不在m_ids中：可见。RC级别每次查询创建Read View，RR级别只在第一次创建。"},
            {"q": "MySQL的Change Buffer是什么？有什么优化作用？", "a": "Change Buffer缓存二级索引的修改操作(DML)，当对应页不在Buffer Pool时暂存。优化：1.减少随机IO；2.合并多次修改；3.提升写入性能。适用场景：写多读少、非唯一二级索引。注意：唯一索引不支持(需要立即检查唯一性)。MySQL8.0后支持部分索引。"},
            {"q": "MySQL的Online DDL是如何实现的？", "a": "Online DDL允许DDL期间并发DML。实现：1.获取MDL写锁(短暂)；2.降级为MDL读锁；3.执行DDL；4.应用增量DML(row_log)；5.升级为MDL写锁；6.应用最后增量；7.完成DDL。Instant DDL(MySQL8.0)：只修改元数据，秒级完成，支持修改列默认值、添加列等。"},
            {"q": "MySQL的Undo Log是如何回收的？Purge线程的作用？", "a": "Undo Log回收：1.事务提交后undo log进入history list；2.Purge线程异步清理；3.清理条件：所有活跃事务ID大于undo log事务ID。Purge线程：后台线程，负责清理undo log和删除标记的记录。参数：innodb_purge_threads控制线程数，innodb_max_purge_lag控制延迟。"},
            {"q": "如何优化MySQL的大表查询？", "a": "优化方案：1.索引优化：覆盖索引、索引下推、避免回表；2.分页优化：延迟关联、子查询；3.分区表：按时间或范围分区；4.分库分表：水平拆分；5.读写分离：主写从读；6.缓存：Redis缓存热点数据；7.异步：MQ处理非实时查询。注意：避免SELECT *，使用LIMIT限制结果集。"}
        ],
        'cache': [
            {"q": "Redis的Stream数据结构有什么特点？如何实现消息队列？", "a": "Stream特点：1.有序消息队列，自动生成ID；2.支持消费者组；3.支持ACK和Pending列表；4.支持消息回溯。实现MQ：1.XADD添加消息；2.XREADGROUP消费；3.XACK确认；4.XPENDING查看未确认消息。优势：比List更强大，比Kafka更轻量，支持持久化和主从复制。"},
            {"q": "Redis的HyperLogLog和Bitmap有什么应用场景？", "a": "HyperLogLog：基数统计，误差0.81%，内存固定12KB。场景：UV统计、独立访客数。命令：PFADD/PFCOUNT。Bitmap：位图操作，支持位运算。场景：签到统计、在线用户、布隆过滤器。命令：SETBIT/GETBIT/BITCOUNT/BITOP。两者都适合大数据量统计场景。"},
            {"q": "Redis的Lua脚本有什么优势？如何保证原子性？", "a": "Lua脚本优势：1.原子执行，无需加锁；2.减少网络往返；3.复用复杂逻辑。原子性：Redis单线程执行，整个脚本执行期间不切换。注意：脚本不宜过长，会阻塞其他命令。优化：使用SCRIPT LOAD缓存脚本，EVALSHA执行。Redis7.0支持Function，比Lua更强大。"},
            {"q": "Redis的Key过期策略是什么？如何避免大量Key同时过期？", "a": "过期策略：1.定时删除：创建定时器，到期删除(CPU不友好)；2.惰性删除：访问时检查删除(内存不友好)；3.定期删除：定期随机检查删除(折中)。Redis采用惰性+定期。避免同时过期：1.过期时间加随机值；2.使用不同缓存策略；3.监控过期Key分布。"},
            {"q": "Redis的内存碎片如何产生？如何优化？", "a": "内存碎片产生：1.频繁更新删除；2.不同大小对象分配释放；3.jemalloc分配策略。查看：INFO memory的mem_fragmentation_ratio。优化：1.数据对齐，使用相同大小结构；2.避免频繁修改；3.使用MEMORY PURGE手动整理；4.重启实例(最后手段)。Redis4.0+支持activedefrag自动整理。"}
        ],
        'distributed': [
            {"q": "Raft协议的Leader选举过程是怎样的？如何避免脑裂？", "a": "选举过程：1.Follower超时转为Candidate；2.增加term，发起投票；3.获得多数票成为Leader；4.发送心跳维持地位。避免脑裂：1.需要多数节点同意；2.每个term只有一个Leader；3.投票时检查term和日志完整性。优化：PreVote机制避免网络分区干扰，Leader Lease机制防止旧Leader继续服务。"},
            {"q": "分布式事务中的Saga模式是什么？与TCC有什么区别？", "a": "Saga模式：将长事务拆分为多个本地事务，每个事务有补偿操作。执行：正向执行所有事务，失败时反向执行补偿。与TCC区别：1.Saga无预留资源阶段；2.Saga补偿是业务补偿，TCC是资源回滚；3.Saga适合长事务，TCC适合短事务；4.Saga实现更简单，但一致性较弱。Seata支持Saga模式。"},
            {"q": "如何实现分布式Session？各方案优缺点？", "a": "方案对比：1.Redis存储：简单可靠，需要Redis高可用；2.JWT：无状态，无法主动失效，payload有限；3.Spring Session：透明集成，依赖存储；4.Sticky Session：简单，单点故障。推荐：Redis+Spring Session，支持集群、过期、事件监听。注意：Session对象需要序列化，敏感信息不要存Session。"},
            {"q": "如何设计一个分布式链路追踪系统？", "a": "设计要点：1.TraceID：全局唯一，贯穿整个链路；2.SpanID：每个操作一个Span；3.ParentSpanID：关联父Span；4.采样策略：全量/百分比/自适应；5.传输协议：HTTP Header或gRPC Metadata；6.存储：ES/Cassandra；7.可视化：Jaeger/Zipkin。Java Agent方式：SkyWalking、Pinpoint无侵入接入。"},
            {"q": "如何实现数据库的异地多活架构？", "a": "异地多活设计：1.数据同步：MySQL主从复制/双向复制；2.冲突解决：时间戳/版本号/业务规则；3.流量路由：DNS/网关就近路由；4.数据分片：按用户ID/地域分片；5.一致性：最终一致性，异步同步；6.故障切换：自动检测，流量切换。挑战：网络延迟、数据冲突、成本控制。参考：阿里单元化架构、美团异地多活方案。"}
        ],
        'design': [
            {"q": "如何设计一个高并发限流系统？", "a": "限流设计：1.算法选择：令牌桶(允许突发)、漏桶(恒定速率)、滑动窗口(精确控制)；2.分布式限流：Redis+Lua原子操作；3.网关层限流：Nginx/Gateway；4.应用层限流：Sentinel/Resilience4j；5.多级限流：本地+分布式。关键参数：QPS阈值、等待队列、拒绝策略。监控：实时QPS、拒绝率、等待时间。"},
            {"q": "如何设计一个分布式ID生成服务？", "a": "设计要点：1.唯一性：雪花算法、号段模式；2.有序性：趋势递增，利于索引；3.高性能：本地缓存+异步预取；4.高可用：多机房部署、故障转移；5.可扩展：支持多业务线。方案：Leaf(美团)：号段+雪花；uid-generator(百度)：雪花变种；TinyID：号段模式。注意：时钟回拨处理、机器ID分配。"},
            {"q": "如何设计一个高可用的配置中心？", "a": "配置中心设计：1.存储：数据库持久化+缓存加速；2.高可用：集群部署+Raft选举；3.推送：长轮询/WebSocket/消息队列；4.灰度：按IP/标签推送；5.版本管理：历史版本+回滚；6.权限：RBAC+审计日志。开源方案：Nacos(配置+注册)、Apollo(携程)、Spring Cloud Config。"},
            {"q": "如何设计一个分布式任务调度系统？", "a": "调度系统设计：1.调度中心：任务管理、触发器、执行器管理；2.执行器：任务执行、心跳上报；3.路由策略：轮询/随机/一致性Hash/分片广播；4.故障转移：执行器故障自动切换；5.任务依赖：DAG编排；6.监控告警：执行日志、失败通知。开源：XXL-Job、PowerJob、Elastic-Job。"},
            {"q": "如何设计一个API网关？", "a": "网关设计：1.核心功能：路由、负载均衡、限流、熔断、鉴权；2.高性能：Netty/WebFlux异步非阻塞；3.过滤器链：前置/后置过滤器；4.服务发现：动态路由更新；5.安全：OAuth2/JWT、签名验证；6.监控：请求日志、指标收集。开源：Spring Cloud Gateway、Zuul、APISIX、Kong。"}
        ]
    }
    
    if topic in sample_questions:
        all_questions = sample_questions[topic]
        questions = random.sample(all_questions, min(count, len(all_questions)))
    
    return questions

def generate_markdown_doc(questions, topic, level, output_file=None):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    if not output_file:
        date_str = datetime.now().strftime('%Y-%m-%d')
        output_file = os.path.join(OUTPUT_DIR, f'{topic}_{level}_{date_str}.md')
    
    topic_names = {
        'java': 'Java基础与高级特性',
        'jvm': 'JVM原理与调优',
        'concurrent': '多线程与并发编程',
        'spring': 'Spring全家桶',
        'database': '数据库技术',
        'cache': '缓存技术',
        'distributed': '分布式系统',
        'design': '系统设计',
        'middleware': '中间件',
        'gateway': '网关与服务发现',
        'container': '容器化与云原生'
    }
    
    level_names = {
        'junior': '初级',
        'middle': '中级',
        'senior': '高级',
        'architect': '架构师'
    }
    
    content = f"""# {topic_names.get(topic, topic)} - {level_names.get(level, level)}知识点

> 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
> 题目数量: {len(questions)}

---

"""
    
    for i, q in enumerate(questions, 1):
        content += f"## 问题 {i}\n\n"
        content += f"**Q: {q['q']}**\n\n"
        content += f"**A:** {q['a']}\n\n"
        content += "---\n\n"
    
    content += """## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端知识点技能 自动生成*
"""
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return output_file

def update_knowledge_base(data, topic, questions):
    if 'questions' not in data:
        data['questions'] = {}
    
    if topic not in data['questions']:
        data['questions'][topic] = {}
    
    if 'senior' not in data['questions'][topic]:
        data['questions'][topic]['senior'] = []
    
    existing_questions = {q['q'] for q in data['questions'][topic].get('senior', [])}
    
    new_count = 0
    for q in questions:
        if q['q'] not in existing_questions:
            data['questions'][topic]['senior'].append(q)
            existing_questions.add(q['q'])
            new_count += 1
    
    if 'search_history' not in data:
        data['search_history'] = []
    
    data['search_history'].append({
        'topic': topic,
        'count': len(questions),
        'new_count': new_count,
        'timestamp': datetime.now().isoformat()
    })
    
    save_data(data)
    return new_count

def show_knowledge_system(data):
    ks = data.get('knowledge_system', {})
    print("\n" + "="*60)
    print("📚 Java后端知识体系")
    print("="*60)
    
    for key, info in ks.items():
        print(f"\n🔹 {info['name']}")
        for topic in info['topics']:
            print(f"   • {topic}")
    
    print("\n" + "="*60)
    print("难度等级: junior(初级) | middle(中级) | senior(高级) | architect(架构师)")
    print("="*60 + "\n")

def generate_questions(data, topic=None, level='senior', count=3):
    questions = data.get('questions', {})
    
    if topic:
        topic_questions = questions.get(topic, {})
        if not topic_questions:
            print(f"未找到主题 '{topic}' 的知识点")
            print(f"可用主题: {', '.join(questions.keys())}")
            return None
        
        level_questions = topic_questions.get(level, [])
        if not level_questions:
            print(f"未找到主题 '{topic}' 难度 '{level}' 的知识点")
            available_levels = list(topic_questions.keys())
            print(f"可用难度: {', '.join(available_levels)}")
            return None
        
        selected = random.sample(level_questions, min(count, len(level_questions)))
        
        ks = data.get('knowledge_system', {})
        topic_name = ks.get(topic, {}).get('name', topic)
        
        print("\n" + "="*60)
        print(f"📝 {topic_name} - {level.upper()} 知识点")
        print("="*60 + "\n")
        
        for i, q in enumerate(selected, 1):
            print(f"【问题 {i}】")
            print(f"Q: {q['q']}")
            print(f"\nA: {q['a']}")
            print("-"*60 + "\n")
        
        return selected
    else:
        all_questions = []
        for t, levels in questions.items():
            if level in levels:
                for q in levels[level]:
                    all_questions.append((t, q))
        
        if not all_questions:
            print(f"未找到难度 '{level}' 的知识点")
            return None
        
        selected = random.sample(all_questions, min(count, len(all_questions)))
        
        ks = data.get('knowledge_system', {})
        
        print("\n" + "="*60)
        print(f"📝 随机知识点 - {level.upper()}")
        print("="*60 + "\n")
        
        for i, (t, q) in enumerate(selected, 1):
            topic_name = ks.get(t, {}).get('name', t)
            print(f"【问题 {i}】[{topic_name}]")
            print(f"Q: {q['q']}")
            print(f"\nA: {q['a']}")
            print("-"*60 + "\n")
        
        return [q for t, q in selected]

def daily_update(topics=None, count_per_topic=3):
    if topics is None:
        topics = ['java', 'jvm', 'concurrent', 'spring', 'database', 'cache', 'distributed', 'design', 'middleware', 'gateway', 'container']
    
    data = load_data()
    
    print("\n" + "="*60)
    print("🔄 每日知识点更新")
    print("="*60 + "\n")
    
    total_new = 0
    generated_docs = []
    
    for topic in topics:
        print(f"正在更新 {topic}...")
        
        new_questions = search_knowledge_points(topic, count_per_topic)
        
        if new_questions:
            new_count = update_knowledge_base(data, topic, new_questions)
            total_new += new_count
            
            doc_file = generate_markdown_doc(new_questions, topic, 'senior')
            generated_docs.append(doc_file)
            
            print(f"  ✅ 新增 {new_count} 个知识点，生成文档: {os.path.basename(doc_file)}")
        else:
            print(f"  ⏭️ 跳过 {topic}")
    
    print("\n" + "="*60)
    print(f"📊 更新完成")
    print(f"  总新增题目: {total_new}")
    print(f"  生成文档数: {len(generated_docs)}")
    print("="*60 + "\n")
    
    if generated_docs:
        print("📄 生成的文档:")
        for doc in generated_docs:
            print(f"  - {doc}")
        print()
    
    return total_new, generated_docs

def main():
    parser = argparse.ArgumentParser(description='Java后端知识点生成器')
    parser.add_argument('--topic', '-t', type=str, 
                        choices=['java', 'jvm', 'concurrent', 'spring', 'database', 'cache', 'distributed', 'design', 'middleware', 'gateway', 'container'],
                        help='知识点主题')
    parser.add_argument('--level', '-l', type=str, default='senior',
                        choices=['junior', 'middle', 'senior', 'architect'],
                        help='难度等级 (默认: senior)')
    parser.add_argument('--count', '-c', type=int, default=3,
                        help='生成题目数量 (默认: 3)')
    parser.add_argument('--random', '-r', action='store_true',
                        help='随机生成知识点')
    parser.add_argument('--knowledge', '-k', action='store_true',
                        help='显示知识体系')
    parser.add_argument('--daily', '-d', action='store_true',
                        help='每日更新知识点')
    parser.add_argument('--output', '-o', type=str,
                        help='输出文档路径')
    parser.add_argument('--update', '-u', action='store_true',
                        help='从网络搜索并更新知识库')
    
    args = parser.parse_args()
    
    data = load_data()
    
    if args.knowledge:
        show_knowledge_system(data)
    elif args.daily:
        daily_update()
    elif args.update and args.topic:
        new_questions = search_interview_questions(args.topic, args.count)
        if new_questions:
            new_count = update_knowledge_base(data, args.topic, new_questions)
            doc_file = generate_markdown_doc(new_questions, args.topic, args.level, args.output)
            print(f"\n✅ 新增 {new_count} 道题目")
            print(f"📄 文档已生成: {doc_file}\n")
    else:
        selected = generate_questions(data, topic=args.topic, level=args.level, count=args.count)
        if selected and args.output:
            doc_file = generate_markdown_doc(selected, args.topic or 'random', args.level, args.output)
            print(f"📄 文档已生成: {doc_file}\n")

if __name__ == '__main__':
    main()
