import type { NextApiRequest, NextApiResponse } from 'next';

export interface AITechnology {
  id: string;
  title: string;
  description: string;
  category: 'open-source' | 'closed-source' | 'paper' | 'application' | 'frontier';
  tags: string[];
  url: string;
  stars?: number;
  lastUpdated: string;
  source: string;
  language?: string;
  author?: string;
  license?: string;
  downloads?: number;
  citations?: number;
}

// Mock data - in a real application, this would come from a database
const mockTechnologies: AITechnology[] = [
  {
    id: '1',
    title: 'Cursor IDE',
    description: '基于 AI 的代码编辑器，提供智能代码补全和生成功能，支持多种编程语言',
    category: 'application',
    tags: ['IDE', 'Code Generation', 'AI Assistant', 'TypeScript', 'Python'],
    url: 'https://cursor.sh',
    lastUpdated: '2024-01-15',
    source: 'Cursor',
    author: 'Anysphere'
  },
  {
    id: '2',
    title: 'Next.js AI Chatbot',
    description: '一个基于 Next.js 和 OpenAI 的全栈聊天机器人应用，包含完整的用户界面和后端API',
    category: 'open-source',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Chatbot', 'React'],
    url: 'https://github.com/vercel/ai-chatbot',
    stars: 4200,
    lastUpdated: '2024-01-14',
    source: 'GitHub',
    language: 'TypeScript',
    author: 'Vercel',
    license: 'MIT'
  },
  {
    id: '3',
    title: 'LangChain',
    description: '用于构建基于大语言模型的应用程序的框架，支持链式调用和工具集成',
    category: 'open-source',
    tags: ['LLM', 'Python', 'Framework', 'RAG', 'Agents'],
    url: 'https://github.com/langchain-ai/langchain',
    stars: 75000,
    lastUpdated: '2024-01-15',
    source: 'GitHub',
    language: 'Python',
    author: 'LangChain',
    license: 'MIT'
  },
  {
    id: '4',
    title: 'GPT-4 Turbo',
    description: 'OpenAI 最新的大语言模型，支持更长的上下文和更快的推理速度，具备多模态能力',
    category: 'closed-source',
    tags: ['GPT-4', 'OpenAI', 'LLM', 'API', 'Multimodal'],
    url: 'https://openai.com/gpt-4',
    lastUpdated: '2024-01-10',
    source: 'OpenAI',
    author: 'OpenAI'
  },
  {
    id: '5',
    title: 'Claude 3 Opus',
    description: 'Anthropic 的最先进AI模型，在复杂推理和创意写作方面表现出色',
    category: 'closed-source',
    tags: ['Claude', 'Anthropic', 'LLM', 'API', 'Constitutional AI'],
    url: 'https://www.anthropic.com/claude',
    lastUpdated: '2024-01-12',
    source: 'Anthropic',
    author: 'Anthropic'
  },
  {
    id: '6',
    title: 'Attention Is All You Need',
    description: 'Transformer 架构的开创性论文，奠定了现代 AI 的基础，引入了自注意力机制',
    category: 'paper',
    tags: ['Transformer', 'Attention', 'NLP', 'Google', 'Deep Learning'],
    url: 'https://arxiv.org/abs/1706.03762',
    lastUpdated: '2017-06-12',
    source: 'arXiv',
    author: 'Vaswani et al.',
    citations: 95000
  },
  {
    id: '7',
    title: 'LLaMA 2',
    description: 'Meta 开源的大语言模型，提供多种参数规模版本，支持商业使用',
    category: 'open-source',
    tags: ['LLaMA', 'Meta', 'Open Source', 'LLM', 'PyTorch'],
    url: 'https://github.com/facebookresearch/llama',
    stars: 45000,
    lastUpdated: '2023-07-18',
    source: 'GitHub',
    language: 'Python',
    author: 'Meta',
    license: 'Custom'
  },
  {
    id: '8',
    title: 'Stable Diffusion',
    description: '开源的文本到图像生成模型，支持本地部署和自定义训练',
    category: 'open-source',
    tags: ['Stable Diffusion', 'Image Generation', 'AI Art', 'PyTorch', 'Diffusion Models'],
    url: 'https://github.com/Stability-AI/stablediffusion',
    stars: 35000,
    lastUpdated: '2024-01-13',
    source: 'GitHub',
    language: 'Python',
    author: 'Stability AI',
    license: 'MIT'
  },
  {
    id: '9',
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    description: 'RAG 技术的开创性论文，结合检索和生成提升语言模型的知识密集型任务性能',
    category: 'paper',
    tags: ['RAG', 'Retrieval', 'Generation', 'NLP', 'Facebook AI'],
    url: 'https://arxiv.org/abs/2005.11401',
    lastUpdated: '2020-05-22',
    source: 'arXiv',
    author: 'Lewis et al.',
    citations: 3500
  },
  {
    id: '10',
    title: 'GitHub Copilot',
    description: 'GitHub 和 OpenAI 合作开发的 AI 代码助手，直接集成在编辑器中提供代码建议',
    category: 'application',
    tags: ['GitHub', 'Code Assistant', 'OpenAI', 'VS Code', 'Programming'],
    url: 'https://github.com/features/copilot',
    lastUpdated: '2024-01-14',
    source: 'GitHub',
    author: 'GitHub'
  },
  {
    id: '11',
    title: 'Multimodal Chain-of-Thought Reasoning',
    description: '多模态思维链推理的前沿研究，结合视觉和文本信息进行复杂推理',
    category: 'frontier',
    tags: ['Multimodal', 'Chain-of-Thought', 'Reasoning', 'Vision-Language', 'Few-shot'],
    url: 'https://arxiv.org/abs/2302.00923',
    lastUpdated: '2023-02-02',
    source: 'arXiv',
    author: 'Zhang et al.',
    citations: 850
  },
  {
    id: '12',
    title: 'AutoGPT',
    description: '自主AI代理，能够独立完成复杂任务，具备自我规划和执行能力',
    category: 'open-source',
    tags: ['AutoGPT', 'AI Agent', 'Autonomous', 'Python', 'GPT-4'],
    url: 'https://github.com/Significant-Gravitas/AutoGPT',
    stars: 155000,
    lastUpdated: '2024-01-15',
    source: 'GitHub',
    language: 'Python',
    author: 'Significant Gravitas',
    license: 'MIT'
  },
  {
    id: '13',
    title: 'Constitutional AI: Harmlessness from AI Feedback',
    description: 'Anthropic 的宪法AI研究，通过AI反馈训练更安全的AI系统',
    category: 'paper',
    tags: ['Constitutional AI', 'AI Safety', 'RLHF', 'Anthropic', 'Alignment'],
    url: 'https://arxiv.org/abs/2212.08073',
    lastUpdated: '2022-12-15',
    source: 'arXiv',
    author: 'Bai et al.',
    citations: 1200
  },
  {
    id: '14',
    title: 'Midjourney',
    description: '领先的AI艺术生成平台，通过Discord机器人提供高质量图像生成服务',
    category: 'closed-source',
    tags: ['Midjourney', 'AI Art', 'Image Generation', 'Discord', 'Creative AI'],
    url: 'https://midjourney.com',
    lastUpdated: '2024-01-13',
    source: 'Midjourney',
    author: 'Midjourney Inc.'
  },
  {
    id: '15',
    title: 'Tool Learning with Foundation Models',
    description: '基础模型的工具学习前沿研究，探索AI如何学习和使用各种工具',
    category: 'frontier',
    tags: ['Tool Learning', 'Foundation Models', 'AI Agents', 'Reasoning', 'Planning'],
    url: 'https://arxiv.org/abs/2304.08354',
    lastUpdated: '2023-04-17',
    source: 'arXiv',
    author: 'Qin et al.',
    citations: 420
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { category, search, limit = '50' } = req.query;
    
    let filteredTechnologies = mockTechnologies;
    
    // Filter by category
    if (category && category !== 'all') {
      filteredTechnologies = filteredTechnologies.filter(
        tech => tech.category === category
      );
    }
    
    // Filter by search term
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredTechnologies = filteredTechnologies.filter(tech =>
        tech.title.toLowerCase().includes(searchTerm) ||
        tech.description.toLowerCase().includes(searchTerm) ||
        tech.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        tech.author?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply limit
    const limitNum = parseInt(limit as string, 10);
    if (limitNum > 0) {
      filteredTechnologies = filteredTechnologies.slice(0, limitNum);
    }
    
    // Sort by last updated (most recent first)
    filteredTechnologies.sort((a, b) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
    
    res.status(200).json(filteredTechnologies);
  } else if (req.method === 'POST') {
    // Add new technology (for future implementation)
    const newTech: AITechnology = req.body;
    // In a real app, you would save to database here
    res.status(201).json({ message: 'Technology added successfully', id: newTech.id });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}