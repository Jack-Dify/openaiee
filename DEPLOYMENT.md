# 部署指南

## 快速部署

### 1. Vercel 部署 (推荐)

1. Fork 这个仓库到你的 GitHub 账户
2. 访问 [Vercel](https://vercel.com)
3. 点击 "New Project" 并选择你 fork 的仓库
4. Vercel 会自动检测到这是一个 Next.js 项目
5. 点击 "Deploy" 开始部署

环境变量（可选）:
```
NEXT_PUBLIC_APP_NAME=AI技术收集工具
NEXT_PUBLIC_APP_DESCRIPTION=专门收集最新的AI独立全栈开发技术
```

### 2. Netlify 部署

1. Fork 这个仓库
2. 访问 [Netlify](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的 GitHub 仓库
5. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`
6. 点击 "Deploy site"

### 3. 本地开发

```bash
# 克隆仓库
git clone https://github.com/your-username/ai-collection-tool.git
cd ai-collection-tool

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 高级部署选项

### Docker 部署

创建 `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

构建和运行:

```bash
docker build -t ai-collection-tool .
docker run -p 3000:3000 ai-collection-tool
```

### 使用 PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# 构建项目
npm run build

# 使用 PM2 启动
pm2 start npm --name "ai-collection-tool" -- start

# 保存 PM2 配置
pm2 save
pm2 startup
```

## 环境配置

### 环境变量

在项目根目录创建 `.env.local` 文件:

```env
# 应用配置
NEXT_PUBLIC_APP_NAME=AI技术收集工具
NEXT_PUBLIC_APP_DESCRIPTION=专门收集最新的AI独立全栈开发技术

# API 配置 (可选)
GITHUB_TOKEN=your_github_token_here
HUGGINGFACE_TOKEN=your_hf_token_here
NEWS_API_KEY=your_news_api_key_here

# 数据库配置 (未来功能)
DATABASE_URL=postgresql://username:password@localhost:5432/ai_collection
REDIS_URL=redis://localhost:6379

# 邮件配置 (未来功能)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 数据源配置

修改 `config/sources.ts` 文件来启用或禁用特定的数据源，或添加新的数据源。

## 性能优化

### 1. 缓存策略

在 `next.config.js` 中添加缓存头:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=600',
          },
        ],
      },
    ]
  },
}
```

### 2. 图片优化

使用 Next.js Image 组件优化图片加载。

### 3. 数据库优化

- 为搜索字段添加索引
- 使用连接池
- 实现查询缓存

## 监控和日志

### 1. 错误监控

集成 Sentry:

```bash
npm install @sentry/nextjs
```

### 2. 性能监控

使用 Next.js Analytics 或 Google Analytics。

### 3. 日志记录

使用 Winston 或类似的日志库记录应用日志。

## 安全配置

### 1. CORS 设置

在 API 路由中配置适当的 CORS 头。

### 2. 速率限制

实现 API 速率限制以防止滥用。

### 3. 输入验证

对所有用户输入进行验证和清理。

## 备份和恢复

### 1. 数据备份

定期备份数据库和用户上传的内容。

### 2. 配置备份

备份环境变量和配置文件。

## 故障排除

### 常见问题

1. **构建失败**: 检查 Node.js 版本是否兼容
2. **样式不显示**: 确保 Tailwind CSS 配置正确
3. **API 错误**: 检查环境变量和网络连接
4. **内存不足**: 增加服务器内存或优化代码

### 调试技巧

1. 启用详细日志
2. 使用浏览器开发者工具
3. 检查网络请求
4. 监控服务器资源使用

## 扩展功能

### 即将推出的功能

- [ ] 数据库持久化
- [ ] 用户认证系统
- [ ] 实时通知
- [ ] 移动应用
- [ ] API 文档
- [ ] 多语言支持

### 自定义开发

查看 `docs/DEVELOPMENT.md` 了解如何添加新功能和自定义组件。

## 支持

如果遇到部署问题，请：

1. 查看 [GitHub Issues](https://github.com/your-username/ai-collection-tool/issues)
2. 阅读 [FAQ](https://github.com/your-username/ai-collection-tool/wiki/FAQ)
3. 提交新的 Issue
4. 发送邮件至 support@example.com

---

最后更新: 2024年1月15日