---
# 首页配置
page: true
title: Java 知识库
---

<script setup>
import { onMounted } from 'vue'
import { useData } from 'vitepress'

onMounted(() => {
  // 可以在这里添加一些动态效果
})
</script>

# 📚 Java 知识库

<div style="text-align: center; font-size: 1.2em; color: var(--vp-c-text-2); margin-bottom: 2em;">
Java后端开发面试知识整理，系统化梳理，助力你更好地准备面试
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 40px 0;">

<div style="background: var(--vp-c-bg-soft); padding: 20px; border-radius: 12px; border: 1px solid var(--vp-c-divider);">
<h3 style="margin-top: 0;">☕ Java基础</h3>
面向对象、集合框架、IO/NIO、反射、注解、泛型...
<a href="/Java基础/" style="text-decoration: none;">开始阅读 →</a>
</div>

<div style="background: var(--vp-c-bg-soft); padding: 20px; border-radius: 12px; border: 1px solid var(--vp-c-divider);">
<h3 style="margin-top: 0;">⚡ 并发编程</h3>
线程安全、锁、同步器、原子类、线程池、JUC包...
<a href="/并发编程/" style="text-decoration: none;">开始阅读 →</a>
</div>

<div style="background: var(--vp-c-bg-soft); padding: 20px; border-radius: 12px; border: 1px solid var(--vp-c-divider);">
<h3 style="margin-top: 0;">🧠 JVM</h3>
内存模型、垃圾回收、类加载、调优、性能优化...
<a href="/JVM/" style="text-decoration: none;">开始阅读 →</a>
</div>

<div style="background: var(--vp-c-bg-soft); padding: 20px; border-radius: 12px; border: 1px solid var(--vp-c-divider);">
<h3 style="margin-top: 0;">🍃 Spring</h3>
IoC、AOP、Spring Boot、Spring Cloud...
<a href="/Spring/" style="text-decoration: none;">开始阅读 →</a>
</div>

<div style="background: var(--vp-c-bg-soft); padding: 20px; border-radius: 12px; border: 1px solid var(--vp-c-divider);">
<h3 style="margin-top: 0;">💾 数据库</h3>
MySQL索引、事务隔离、锁、优化、Redis...
<a href="/数据库/" style="text-decoration: none;">开始阅读 →</a>
</div>

<div style="background: var(--vp-c-bg-soft); padding: 20px; border-radius: 12px; border: 1px solid var(--vp-c-divider);">
<h3 style="margin-top: 0;">🌐 分布式</h3>
负载均衡、缓存、消息队列、分布式事务...
<a href="/分布式/" style="text-decoration: none;">开始阅读 →</a>
</div>

<div style="background: var(--vp-c-bg-soft); padding: 20px; border-radius: 12px; border: 1px solid var(--vp-c-divider);">
<h3 style="margin-top: 0;">🎨 设计模式</h3>
单例、工厂、观察者、策略、代理...常用设计模式
<a href="/设计模式/" style="text-decoration: none;">开始阅读 →</a>
</div>

<div style="background: var(--vp-c-bg-soft); padding: 20px; border-radius: 12px; border: 1px solid var(--vp-c-divider);">
<h3 style="margin-top: 0;">🧮 算法</h3>
排序、查找、动态规划、树图...常见算法题
<a href="/算法/" style="text-decoration: none;">开始阅读 →</a>
</div>

</div>

---

<div style="text-align: center; color: var(--vp-c-text-3); font-size: 0.9em;">
使用 <a href="https://vitepress.dev" target="_blank" rel="noreferrer">VitePress</a> 构建 • 现代美观 • 搜索便捷 • 响应式设计
</div>
