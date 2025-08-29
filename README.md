# AI 技术收集工具

<p align="center">
  <img width="160" src="./assets/ee.png" />
  <h2 align="center">AI 技术收集工具</h2>
  <p align="center">专门收集最新的AI独立全栈开发技术，包括开源、闭源、基础论文、应用、前沿等</p>
</p>

## 🚀 功能特性

- **🔍 智能分类**: 自动将AI技术分类为开源项目、闭源产品、学术论文、应用案例、前沿技术
- **📊 数据分析**: 提供详细的统计分析和趋势图表
- **🔄 自动同步**: 定期从GitHub、arXiv、HuggingFace等平台获取最新技术
- **🏷️ 标签系统**: 智能标签分类，便于快速查找相关技术
- **🔎 高级搜索**: 支持按分类、标签、来源等多维度搜索
- **📱 响应式设计**: 完美适配桌面端和移动端

## 🎯 技术分类

### 开源项目 (Open Source)
- AI框架和工具库
- 全栈AI应用
- 代码生成工具
- 机器学习平台

### 闭源产品 (Closed Source)
- 商业AI API服务
- SaaS AI产品
- 企业级AI解决方案

### 学术论文 (Papers)
- 顶级会议论文
- arXiv最新研究
- 技术白皮书
- 综述文章

### 应用案例 (Applications)
- AI工具和产品
- 实际应用场景
- 行业解决方案

### 前沿技术 (Frontier)
- 最新研究方向
- 实验性技术
- 未来趋势

## 🛠️ 技术栈

- **前端**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes
- **样式**: Tailwind CSS + 自定义组件
- **部署**: Vercel / Netlify 支持

## 📦 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/ai-collection-tool.git
cd ai-collection-tool

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 部署选项

#### 通过 Vercel 部署 (推荐)

[![通过 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-collection-tool)

#### 通过 Netlify 部署

[![部署至 Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/ai-collection-tool)

## 📖 API 文档

### 获取技术列表

```http
GET /api/technologies?category=all&search=&limit=50
```

参数:
- `category`: 技术分类 (all, open-source, closed-source, paper, application, frontier)
- `search`: 搜索关键词
- `limit`: 返回结果数量限制

### 数据收集

```http
POST /api/collect
```

触发从外部源收集最新的AI技术信息。

### 分析数据

```http
GET /api/analytics?period=all
```

获取统计分析数据，包括分类分布、来源统计、趋势分析等。

## 🎨 界面预览

### 主界面
- 现代化的卡片式布局
- 实时搜索和筛选
- 响应式网格布局

### 数据分析
- 交互式图表
- 实时统计数据
- 趋势分析

### 特性亮点
- 🌙 深色模式支持
- 📱 移动端优化
- ⚡ 快速加载
- 🔒 类型安全

## 🔧 自定义配置

### 添加新的数据源

在 `/pages/api/collect.ts` 中添加新的收集源:

```typescript
const COLLECTION_SOURCES: CollectionSource[] = [
  {
    name: '新数据源',
    type: 'custom',
    url: 'https://api.example.com/data',
    enabled: true
  }
];
```

### 自定义分类

在主界面组件中修改 `categories` 数组来添加新的分类。

## 🤝 贡献指南

我们欢迎各种形式的贡献！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 贡献类型

- 🐛 Bug修复
- ✨ 新功能
- 📝 文档改进
- 🎨 UI/UX改进
- 🔧 性能优化
- 📊 新增AI技术数据

## 📋 开发计划

- [ ] 数据库集成 (PostgreSQL/MongoDB)
- [ ] 用户系统和个人收藏
- [ ] AI技术评分和推荐系统
- [ ] 导出功能 (JSON, CSV, PDF)
- [ ] 邮件订阅和通知
- [ ] 多语言支持
- [ ] 移动端 App

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Vercel](https://vercel.com/) - 部署平台
- 所有贡献者和开源社区

## 📞 联系我们

- 项目地址: [GitHub Repository](https://github.com/your-username/ai-collection-tool)
- 问题反馈: [Issues](https://github.com/your-username/ai-collection-tool/issues)
- 邮箱: your-email@example.com

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！

🔄 持续更新中，敬请关注最新的AI技术动态！