# Spring全家桶

---

## 初级

### 1. Spring IOC容器的理解？

**答案：**

IOC(Inversion of Control)控制反转，将对象创建和依赖管理交给Spring容器。实现方式：1.XML配置；2.注解(@Component/@Autowired)；3.Java配置(@Configuration/@Bean)。核心容器：BeanFactory、ApplicationContext。

---

### 2. Spring Bean的生命周期？

**答案：**

Bean生命周期：1.实例化；2.属性赋值；3.初始化前处理(BeanPostProcessor)；4.初始化(InitializingBean/init-method)；5.初始化后处理；6.使用；7.销毁前处理；8.销毁(DestroyableBean/destroy-method)。

---

## 中级

### 1. Spring AOP的实现原理？

**答案：**

Spring AOP通过动态代理实现：1.JDK动态代理：基于接口，使用反射；2.CGLIB代理：基于类继承，生成子类。核心概念：切面、连接点、通知、切点。事务、日志、权限等都基于AOP实现。

---

### 2. Spring事务传播机制有哪些？

**答案：**

传播机制：1.REQUIRED(默认)：有事务则加入，无则新建；2.REQUIRES_NEW：新建事务，挂起当前；3.SUPPORTS：有则加入；4.NOT_SUPPORTED：非事务执行；5.NEVER：非事务执行，有事务则异常；6.MANDATORY：必须有事务；7.NESTED：嵌套事务。

---

## 高级

### 1. Spring Boot自动配置原理？

**答案：**

自动配置原理：1.@EnableAutoConfiguration启用自动配置；2.AutoConfigurationImportSelector扫描META-INF/spring.factories；3.条件注解@Conditional判断是否生效；4.根据classpath下类自动装配Bean。可通过exclude排除特定配置，或自定义starter扩展。

---

### 2. Spring Cloud核心组件及其作用？

**答案：**

核心组件：1.Nacos/Eureka：服务注册发现；2.Ribbon/LoadBalancer：客户端负载均衡；3.Feign/OpenFeign：声明式HTTP客户端；4.Sentinel/Hystrix：熔断降级；5.Gateway：API网关；6.Config：配置中心；7.Sleuth：链路追踪。Spring Cloud Alibaba生态更完善。

---

### 3. Spring Boot的启动流程是怎样的？

**答案：**

启动流程：1.创建SpringApplication对象；2.判断应用类型(Servlet/Reactive)；3.加载ApplicationContextInitializer和ApplicationListener；4.执行run方法；5.创建ApplicationContext；6.准备环境、打印Banner；7.刷新上下文(核心)；8.执行Runner；9.发布启动完成事件。

---

### 4. Spring中的事件机制(ApplicationEvent)是如何实现的？

**答案：**

Spring事件机制基于观察者模式。组件：1.ApplicationEvent：事件基类；2.ApplicationListener：监听器接口；3.ApplicationEventPublisher：事件发布接口；4.ApplicationEventMulticaster：事件广播器。异步事件：@Async注解或配置SimpleApplicationEventMulticaster线程池。

---

### 5. Spring Cloud Gateway的过滤器链是如何实现的？

**答案：**

Gateway基于WebFlux实现。过滤器链：1.GlobalFilter：全局过滤器；2.GatewayFilter：路由级过滤器；3.过滤器排序：Order接口；4.执行：Reactive模式，Mono链式调用。自定义过滤器：实现GlobalFilter和Ordered接口。限流：RequestRateLimiter GatewayFilter，基于Redis+Lua实现令牌桶。

---

### 6. Spring中的@Async是如何实现的？线程池如何配置？

**答案：**

@Async通过AOP实现异步调用。原理：1.AsyncAnnotationBeanPostProcessor处理@Async；2.通过代理提交任务到线程池；3.默认使用SimpleAsyncTaskExecutor。配置：实现AsyncConfigurer接口或配置spring.task.execution线程池参数。注意：同类调用不生效(未走代理)。

---

### 7. Spring中的循环依赖是如何解决的？三级缓存的作用？

**答案：**

Spring通过三级缓存解决循环依赖：1.singletonObjects：完整Bean；2.earlySingletonObjects：早期暴露的Bean；3.singletonFactories：Bean工厂。流程：A创建-&gt;注入B-&gt;B创建-&gt;注入A-&gt;从三级缓存获取A工厂-&gt;创建A代理-&gt;放入二级缓存-&gt;B完成-&gt;A完成。注意：构造器注入无法解决。

---

## 架构师

### 1. 如何设计一个高可用的Spring Cloud微服务架构？

**答案：**

设计要点：1.服务注册中心集群(Nacos集群)；2.网关集群+限流熔断；3.服务多副本+无状态设计；4.数据库主从+读写分离；5.缓存集群(Redis Cluster)；6.消息队列集群；7.配置中心高可用；8.全链路监控(Prometheus+Grafana)；9.日志收集(ELK)；10.灰度发布能力。

---

### 2. Spring事务失效的场景及解决方案？

**答案：**

失效场景：1.方法非public；2.同类方法调用(未走代理)；3.异常被catch捕获；4.抛出非RuntimeException；5.数据库不支持事务；6.传播机制设置错误。解决方案：1.AopContext.currentProxy()获取代理；2.注入自身调用；3.正确配置rollbackFor；4.检查数据库引擎。

---

