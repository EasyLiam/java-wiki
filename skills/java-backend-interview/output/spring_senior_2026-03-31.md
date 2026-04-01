# Spring全家桶 - 高级面试题

> 生成时间: 2026-03-31 17:00:48
> 题目数量: 3

---

## 问题 1

**Q: Spring中的@Async是如何实现的？线程池如何配置？**

**A:** @Async通过AOP实现异步调用。原理：1.AsyncAnnotationBeanPostProcessor处理@Async；2.通过代理提交任务到线程池；3.默认使用SimpleAsyncTaskExecutor。配置：实现AsyncConfigurer接口或配置spring.task.execution线程池参数。注意：同类调用不生效(未走代理)。

---

## 问题 2

**Q: Spring Boot的启动流程是怎样的？**

**A:** 启动流程：1.创建SpringApplication对象；2.判断应用类型(Servlet/Reactive)；3.加载ApplicationContextInitializer和ApplicationListener；4.执行run方法；5.创建ApplicationContext；6.准备环境、打印Banner；7.刷新上下文(核心)；8.执行Runner；9.发布启动完成事件。

---

## 问题 3

**Q: Spring Cloud Gateway的过滤器链是如何实现的？**

**A:** Gateway基于WebFlux实现。过滤器链：1.GlobalFilter：全局过滤器；2.GatewayFilter：路由级过滤器；3.过滤器排序：Order接口；4.执行：Reactive模式，Mono链式调用。自定义过滤器：实现GlobalFilter和Ordered接口。限流：RequestRateLimiter GatewayFilter，基于Redis+Lua实现令牌桶。

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端面试题技能 自动生成*
