import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Java 知识库',
  description: 'Java后端开发面试知识整理，每日更新',
  lang: 'zh-CN',
  
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '首页', link: '/' }
        ]
      },
      {
        text: '基础知识',
        items: [
          { text: 'Java基础', link: '/Java基础/' },
          { text: 'JVM', link: '/JVM/' },
          { text: '并发编程', link: '/并发编程/' }
        ]
      },
      {
        text: '框架技术',
        items: [
          { text: 'Spring全家桶', link: '/Spring/' }
        ]
      },
      {
        text: '数据存储',
        items: [
          { text: '数据库', link: '/数据库/' },
          { text: '缓存技术', link: '/缓存技术/' }
        ]
      },
      {
        text: '分布式架构',
        items: [
          { text: '分布式系统', link: '/分布式/' },
          { text: '系统设计', link: '/系统设计/' }
        ]
      }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    outline: {
      level: [2, 3]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: '每日更新 • Java面试知识库',
      copyright: 'Copyright © 2026'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  },

  lastUpdated: true
})
