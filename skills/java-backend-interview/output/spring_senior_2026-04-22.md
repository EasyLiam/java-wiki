# Spring全家桶 - 高级知识点

> 生成时间: 2026-04-22 08:00:02
> 题目数量: 5
> 质量等级: 高质量(已核实)

---

## 问题 1

**Q: Spring Cloud Gateway是如何实现动态路由和限流的？**

**A:**

Spring Cloud Gateway是基于WebFlux的API网关：

核心组件：
1. Route(路由)：
   - id: 路由标识
   - uri: 目标地址
   - predicates: 断言条件
   - filters: 过滤器

2. Predicate(断言)：
   - Path: 路径匹配
   - Method: 方法匹配
   - Header: 请求头匹配
   - Query: 参数匹配

3. Filter(过滤器)：
   - GatewayFilter: 路由级
   - GlobalFilter: 全局级

动态路由实现：
1. 基于配置中心：
   @RefreshScope
   @Bean
   public RouteDefinitionLocator routeDefinitionLocator() {
       return new RedisRouteDefinitionLocator(redisTemplate);
   }

2. 动态添加路由：
   @Autowired
   private RouteDefinitionWriter routeDefinitionWriter;
   
   public void addRoute(RouteDefinition definition) {
       routeDefinitionWriter.save(Mono.just(definition)).subscribe();
   }

限流实现：
1. 内置RequestRateLimiter：
   spring:
     cloud:
       gateway:
         routes:
           - id: rate-limit
             uri: lb://service
             filters:
               - name: RequestRateLimiter
                 args:
                   redis-rate-limiter.replenishRate: 10
                   redis-rate-limiter.burstCapacity: 20

2. 自定义限流器：
   @Bean
   public KeyResolver userKeyResolver() {
       return exchange -> Mono.just(
           exchange.getRequest().getHeaders().getFirst("X-User-Id")
       );
   }

3. 基于Lua脚本实现令牌桶：
   - Redis存储令牌数
   - 原子操作保证正确性
   - 支持突发流量

性能优化：
1. 使用Netty而非Tomcat
2. 开启连接池
3. 合理设置超时时间
4. 监控路由性能

> 来源: Spring Cloud官方文档

> ✅ 答案已核实

---

## 问题 2

**Q: Spring是如何解决循环依赖的？三级缓存各自的作用是什么？**

**A:**

Spring通过三级缓存解决循环依赖：

三级缓存结构：
1. singletonObjects (一级缓存)：
   - Map<String, Object>
   - 存储完整的Bean实例
   - Bean已完全初始化

2. earlySingletonObjects (二级缓存)：
   - Map<String, Object>
   - 存储早期暴露的Bean
   - Bean已实例化但未填充属性

3. singletonFactories (三级缓存)：
   - Map<String, ObjectFactory>
   - 存储Bean工厂
   - 用于生成早期Bean引用

解决流程(以A依赖B，B依赖A为例)：
1. 创建A，标记为正在创建
2. 实例化A，将A的工厂放入三级缓存
3. 填充A的属性，发现需要B
4. 创建B，实例化B
5. 填充B的属性，发现需要A
6. 从三级缓存获取A的工厂，创建A的早期引用
7. 将A的早期引用放入二级缓存，删除三级缓存
8. B完成初始化，放入一级缓存
9. A继续初始化，完成

为什么需要三级缓存：
1. 一级缓存：存储最终结果
2. 二级缓存：存储早期引用，避免重复创建
3. 三级缓存：支持AOP代理，延迟创建代理对象

无法解决的场景：
1. 构造器注入的循环依赖
2. @Async导致的循环依赖
3. Prototype作用域的循环依赖

解决方案：
1. 改用setter注入
2. 使用@Lazy延迟加载
3. 重构代码消除循环依赖

> 来源: Spring源码

> ✅ 答案已核实

---

## 问题 3

**Q: Spring Security的认证和授权流程是怎样的？JWT是如何集成的？**

**A:**

Spring Security是强大的安全框架：

认证流程：
1. 用户提交认证信息
2. UsernamePasswordAuthenticationFilter拦截
3. 创建Authentication对象
4. AuthenticationManager认证
5. Provider调用UserDetailsService
6. 验证成功返回Authentication
7. SecurityContextHolder存储认证信息

授权流程：
1. FilterSecurityInterceptor拦截请求
2. 获取Authentication
3. 根据配置检查权限
4. AccessDecisionManager投票决定
5. 有权限则放行，否则抛异常

JWT集成：
1. 登录认证：
   @PostMapping("/login")
   public String login(@RequestBody LoginRequest request) {
       Authentication auth = authenticationManager.authenticate(
           new UsernamePasswordAuthenticationToken(
               request.getUsername(), request.getPassword()
           )
       );
       return jwtTokenProvider.generateToken(auth);
   }

2. JWT过滤器：
   public class JwtFilter extends OncePerRequestFilter {
       protected void doFilterInternal(...) {
           String token = getToken(request);
           if (token != null && jwtTokenProvider.validateToken(token)) {
               Authentication auth = jwtTokenProvider.getAuthentication(token);
               SecurityContextHolder.getContext().setAuthentication(auth);
           }
           filterChain.doFilter(request, response);
       }
   }

3. JWT工具类：
   public String generateToken(Authentication auth) {
       return Jwts.builder()
           .setSubject(auth.getName())
           .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
           .signWith(SignatureAlgorithm.HS512, SECRET)
           .compact();
   }

安全最佳实践：
1. 使用强密钥(256位以上)
2. 设置合理的过期时间
3. 支持Token刷新
4. 敏感操作二次验证
5. 记录安全日志

> 来源: Spring Security官方文档

> ✅ 答案已核实

---

## 问题 4

**Q: Spring事务的传播机制是如何实现的？各传播行为有什么区别？**

**A:**

Spring事务传播机制决定事务方法如何相互调用：

传播行为详解：
1. REQUIRED (默认)：
   - 有事务则加入，无则新建
   - 大多数场景的默认选择

2. REQUIRES_NEW：
   - 总是新建事务，挂起当前事务
   - 独立提交/回滚
   - 适用于日志记录等独立操作

3. SUPPORTS：
   - 有事务则加入，无则非事务执行
   - 查询方法常用

4. NOT_SUPPORTED：
   - 非事务执行，挂起当前事务
   - 避免长事务

5. NEVER：
   - 非事务执行，有事务则抛异常
   - 严格非事务场景

6. MANDATORY：
   - 必须在事务中执行，否则抛异常
   - 强制要求事务

7. NESTED：
   - 嵌套事务，独立回滚点
   - 外部事务回滚则内部也回滚
   - 内部回滚不影响外部

实现原理：
1. ThreadLocal存储当前事务
2. 事务管理器维护事务栈
3. 根据传播行为决定创建/加入/挂起

代码示例：
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void saveLog() { ... }

注意事项：
1. 同类方法调用不生效(未走代理)
2. 异常必须是RuntimeException
3. 数据库引擎要支持事务
4. 避免大事务，拆分操作

> 来源: Spring官方文档

> ✅ 答案已核实

---

## 问题 5

**Q: Spring Boot自动配置原理是什么？@EnableAutoConfiguration是如何工作的？**

**A:**

Spring Boot自动配置是核心特性：

工作原理：
1. @EnableAutoConfiguration注解：
   - 导入AutoConfigurationImportSelector
   - 扫描META-INF/spring.factories
   - 加载所有自动配置类

2. 条件注解判断：
   - @ConditionalOnClass: 类路径存在指定类
   - @ConditionalOnBean: 容器中存在指定Bean
   - @ConditionalOnProperty: 配置属性满足条件
   - @ConditionalOnMissingBean: 容器中不存在指定Bean

3. 配置类加载：
   - 每个starter提供自动配置类
   - 根据条件决定是否生效
   - 用户配置优先于自动配置

自动配置示例：
@Configuration
@ConditionalOnClass(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {
    @Bean
    @ConditionalOnMissingBean
    public DataSource dataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }
}

自定义Starter：
1. 创建自动配置类
2. 添加条件注解
3. 创建META-INF/spring.factories
4. 指定自动配置类

排除自动配置：
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})

调试自动配置：
1. --debug启动
2. 查看CONDITIONS EVALUATION REPORT
3. 使用actuator /conditions端点

核心源码：
AutoConfigurationImportSelector.selectImports()
-> SpringFactoriesLoader.loadFactoryNames()
-> 读取spring.factories

> 来源: Spring Boot源码

> ✅ 答案已核实

---

## 扩展学习

建议结合以下资源深入学习：

- 官方文档
- 技术博客
- 开源项目源码
- 实际项目经验

---

*本文档由 Java后端知识点技能 自动生成*
