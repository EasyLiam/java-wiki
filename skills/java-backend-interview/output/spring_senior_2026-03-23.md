# Spring全家桶 - 高级面试题

> 生成时间: 2026-03-23 09:00:01
> 题目数量: 3

---

## 问题 1

**Q: Spring中的@Async是如何实现的？线程池如何配置？**

**A:** @Async通过AOP实现异步调用。原理：1.AsyncAnnotationBeanPostProcessor处理@Async；2.通过代理提交任务到线程池；3.默认使用SimpleAsyncTaskExecutor。配置：实现AsyncConfigurer接口或配置spring.task.execution线程池参数。注意：同类调用不生效(未走代理)。

---

## 问题 2

**Q: Spring中的事件机制(ApplicationEvent)是如何实现的？**

**A:** Spring事件机制基于观察者模式。组件：1.ApplicationEvent：事件基类；2.ApplicationListener：监听器接口；3.ApplicationEventPublisher：事件发布接口；4.ApplicationEventMulticaster：事件广播器。异步事件：@Async注解或配置SimpleApplicationEventMulticaster线程池。

---

## 问题 3

**Q: Spring中的循环依赖是如何解决的？三级缓存的作用？**

**A:** Spring通过三级缓存解决循环依赖：1.singletonObjects：完整Bean；2.earlySingletonObjects：早期暴露的Bean；3.singletonFactories：Bean工厂。流程：A创建->注入B->B创建->注入A->从三级缓存获取A工厂->创建A代理->放入二级缓存->B完成->A完成。注意：构造器注入无法解决。

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端面试题技能 自动生成*
