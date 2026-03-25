// 题库数据
const topics = [
    {
        id: 'java',
        name: 'Java基础',
        icon: 'fab fa-java',
        description: 'Java语法基础、集合框架、IO、反射等核心基础知识',
        count: 35,
        color: '#007396'
    },
    {
        id: 'jvm',
        name: 'JVM原理',
        icon: 'fas fa-microchip',
        description: '内存模型、垃圾回收、类加载、性能调优',
        count: 28,
        color: '#F59E0B'
    },
    {
        id: 'concurrent',
        name: '并发编程',
        icon: 'fas fa-tasks',
        description: '多线程、锁机制、JUC并发包、原子类',
        count: 42,
        color: '#8B5CF6'
    },
    {
        id: 'spring',
        name: 'Spring全家桶',
        icon: 'fas fa-leaf',
        description: 'Spring IoC/AOP、Boot、Cloud、Security',
        count: 56,
        color: '#6DB33F'
    },
    {
        id: 'database',
        name: '数据库',
        icon: 'fas fa-database',
        description: 'MySQL索引、事务、优化、锁机制',
        count: 38,
        color: '#4479A1'
    },
    {
        id: 'cache',
        name: '缓存技术',
        icon: 'fas fa-bolt',
        description: 'Redis缓存架构、数据结构、缓存问题',
        count: 25,
        color: '#DC382D'
    },
    {
        id: 'distributed',
        name: '分布式系统',
        icon: 'fas fa-network-wired',
        description: '微服务、分布式事务、消息队列、一致性',
        count: 48,
        color: '#06B6D4'
    },
    {
        id: 'design',
        name: '系统设计',
        icon: 'fas fa-sitemap',
        description: '高并发、高可用、限流降级、架构设计',
        count: 32,
        color: '#EC4899'
    }
];

// 模拟题目数据 - 实际项目中应该从后端API获取
const questions = {
    java: [
        {
            question: 'ArrayList和LinkedList的区别是什么？',
            answer: 'ArrayList基于动态数组实现，随机访问O(1)，插入删除需要移动元素O(n)，内存连续，缓存友好。LinkedList基于双向链表实现，插入删除O(1)，随机访问O(n)，内存不连续，缓存不友好。LinkedList还多占用了指针空间。'
        },
        {
            question: 'HashMap的底层实现原理是什么？JDK8做了什么优化？',
            answer: 'JDK8之前HashMap是数组+链表，使用拉链法解决哈希冲突。JDK8之后当链表长度超过8且数组容量大于64时，链表会转为红黑树，将查询复杂度从O(n)优化到O(logn)。使用数组+链表+红黑树结构。哈希运算使用扰动减少碰撞，扩容时使用高位迁移优化了rehash的效率。'
        },
        {
            question: '什么是Java虚拟机？为什么Java被称为跨平台语言？',
            answer: 'JVM是Java Virtual Machine，是一个虚拟计算机，负责运行Java字节码文件。它提供了字节码和具体操作系统之间的层，使得Java程序可以在不同平台上运行。因为JVM屏蔽了不同操作系统的差异，同一个字节码文件能在不同操作系统上执行，所以Java是跨平台的。'
        }
    ],
    jvm: [
        {
            question: 'Java内存区域分为哪些部分？',
            answer: 'JVM内存分为：程序计数器、虚拟机栈、本地方法栈、堆、方法区。其中程序计数器、虚拟机栈、本地方法栈是线程私有，随线程创建销毁而创建销毁。堆和方法区是线程共享，垃圾回收主要作用在堆和方法区。'
        },
        {
            question: '垃圾回收的三种标记算法分别是什么？',
            answer: '1.引用计数法：给对象添加引用计数器，引用+1，引用失效-1，很难解决循环引用问题。2.可达性分析算法：从GC Roots开始向下搜索，搜索走过的路径称为引用链，不可达的对象就是可回收的，主流虚拟机使用这种方法。3.三色标记法：是并发标记的优化算法，分为黑色、灰色、白色。'
        },
        {
            question: '说一下你对垃圾收集器的理解？CMS和G1的区别？',
            answer: 'CMS是并发标记清除收集器，优点是并发收集低停顿，缺点是会产生内存碎片，对CPU敏感，无法处理浮动垃圾。G1是面向服务器的垃圾收集器，区域化分，可预测停顿，整体是标记整理，局部是复制，不会产生太多内存碎片。'
        }
    ],
    concurrent: [
        {
            question: 'synchronized和ReentrantLock的区别？',
            answer: 'synchronized是Java关键字，JVM层面实现，自动加锁释放锁。ReentrantLock是API层面，需要手动lock/unlock。ReentrantLock支持公平锁、中断等待、条件变量、可重入、尝试获取锁，synchronized不可中断，不支持公平锁，只有一个条件队列。'
        },
        {
            question: '什么是可见性、有序性、原子性？',
            answer: '原子性：一个操作不可分割，要么全部成功要么全部失败。可见性：一个线程修改了共享变量的值，其他线程能立即看到。有序性：程序执行的顺序按照代码先后顺序执行，处理器可能会进行指令重排。synchronized和volatile都可以保证可见性，synchronized还可以保证原子性和有序性。'
        },
        {
            question: 'AQS是什么？它的原理是什么？',
            answer: 'AQS是AbstractQueuedSynchronizer，抽象队列同步器，是构建锁和同步器的基础框架。它使用一个int成员变量表示同步状态，使用一个FIFO队列来管理获取锁失败的线程排队。内部通过CLH队列变体实现，乐观自旋+CAS修改状态。ReentrantLock、CountDownLatch、Semaphore都是基于AQS实现的。'
        }
    ],
    spring: [
        {
            question: 'Spring IoC和DI的理解？',
            answer: 'IoC是控制反转，将对象创建和依赖关系的管理交给Spring容器，而不是在代码中手动new对象。DI是依赖注入，是IoC的一种实现，通过构造方法、setter方法、注解注入依赖对象。IoC降低了代码耦合度，方便测试和维护。'
        },
        {
            question: 'Spring Boot的自动配置原理是什么？',
            answer: 'Spring Boot自动配置基于@EnableAutoConfiguration注解，实际上是@Import导入AutoConfigurationImportSelector，这个类会读取META-INF/spring.factories文件中所有的自动配置类，然后根据条件注解@Conditional来决定哪些自动配置类需要生效。这样可以根据项目中引入的依赖自动配置对应的Bean。'
        },
        {
            question: 'Spring AOP的实现原理是什么？',
            answer: 'Spring AOP基于动态代理，有两种实现：JDK动态代理和CGLIB动态代理。JDK动态代理基于接口，使用反射实现，代理实现了相同接口。CGLIB基于继承，动态生成子类，覆盖方法，不需要接口。Spring Boot 2.x之后默认使用CGLIB代理。'
        }
    ]
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
