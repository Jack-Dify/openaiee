export interface DataSource {
  id: string;
  name: string;
  type: 'github' | 'arxiv' | 'huggingface' | 'papers' | 'news' | 'custom';
  url: string;
  apiKey?: string;
  enabled: boolean;
  lastSync?: string;
  description: string;
  category: string[];
  rateLimit: {
    requests: number;
    period: 'minute' | 'hour' | 'day';
  };
}

export const DATA_SOURCES: DataSource[] = [
  {
    id: 'github-trending-ai',
    name: 'GitHub Trending AI',
    type: 'github',
    url: 'https://api.github.com/search/repositories',
    enabled: true,
    description: '收集GitHub上最受欢迎的AI相关仓库',
    category: ['open-source'],
    rateLimit: {
      requests: 60,
      period: 'hour'
    }
  },
  {
    id: 'arxiv-ai-papers',
    name: 'arXiv AI Papers',
    type: 'arxiv',
    url: 'http://export.arxiv.org/api/query',
    enabled: true,
    description: '收集arXiv上最新的AI相关论文',
    category: ['paper'],
    rateLimit: {
      requests: 1000,
      period: 'day'
    }
  },
  {
    id: 'huggingface-models',
    name: 'HuggingFace Models',
    type: 'huggingface',
    url: 'https://huggingface.co/api/models',
    enabled: true,
    description: '收集HuggingFace上最新的AI模型',
    category: ['open-source', 'application'],
    rateLimit: {
      requests: 1000,
      period: 'hour'
    }
  },
  {
    id: 'papers-with-code',
    name: 'Papers With Code',
    type: 'papers',
    url: 'https://paperswithcode.com/api/v1/papers',
    enabled: false, // 需要API密钥
    description: '收集带有代码实现的AI论文',
    category: ['paper', 'open-source'],
    rateLimit: {
      requests: 100,
      period: 'hour'
    }
  },
  {
    id: 'ai-news-aggregator',
    name: 'AI News Aggregator',
    type: 'news',
    url: 'https://newsapi.org/v2/everything',
    enabled: false, // 需要API密钥
    description: '收集最新的AI新闻和产品发布',
    category: ['application', 'closed-source'],
    rateLimit: {
      requests: 1000,
      period: 'day'
    }
  },
  {
    id: 'openai-updates',
    name: 'OpenAI Updates',
    type: 'custom',
    url: 'https://openai.com/blog/rss.xml',
    enabled: true,
    description: '收集OpenAI官方博客更新',
    category: ['closed-source', 'frontier'],
    rateLimit: {
      requests: 10,
      period: 'hour'
    }
  },
  {
    id: 'anthropic-updates',
    name: 'Anthropic Updates',
    type: 'custom',
    url: 'https://www.anthropic.com/news',
    enabled: true,
    description: '收集Anthropic公司的最新动态',
    category: ['closed-source', 'frontier'],
    rateLimit: {
      requests: 10,
      period: 'hour'
    }
  },
  {
    id: 'google-ai-blog',
    name: 'Google AI Blog',
    type: 'custom',
    url: 'https://ai.googleblog.com/feeds/posts/default',
    enabled: true,
    description: '收集Google AI官方博客文章',
    category: ['paper', 'frontier', 'closed-source'],
    rateLimit: {
      requests: 10,
      period: 'hour'
    }
  }
];

export const getEnabledSources = (): DataSource[] => {
  return DATA_SOURCES.filter(source => source.enabled);
};

export const getSourcesByType = (type: DataSource['type']): DataSource[] => {
  return DATA_SOURCES.filter(source => source.type === type);
};

export const getSourcesByCategory = (category: string): DataSource[] => {
  return DATA_SOURCES.filter(source => source.category.includes(category));
};

export const updateSourceStatus = (sourceId: string, enabled: boolean): void => {
  const source = DATA_SOURCES.find(s => s.id === sourceId);
  if (source) {
    source.enabled = enabled;
  }
};

export const updateLastSync = (sourceId: string, timestamp: string): void => {
  const source = DATA_SOURCES.find(s => s.id === sourceId);
  if (source) {
    source.lastSync = timestamp;
  }
};