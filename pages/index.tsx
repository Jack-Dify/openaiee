import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface AITechnology {
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
}

const categories = [
  { key: 'all', label: '全部', color: 'bg-gray-100 text-gray-800' },
  { key: 'open-source', label: '开源项目', color: 'bg-green-100 text-green-800' },
  { key: 'closed-source', label: '闭源产品', color: 'bg-blue-100 text-blue-800' },
  { key: 'paper', label: '学术论文', color: 'bg-purple-100 text-purple-800' },
  { key: 'application', label: '应用案例', color: 'bg-yellow-100 text-yellow-800' },
  { key: 'frontier', label: '前沿技术', color: 'bg-red-100 text-red-800' }
];

export default function Home() {
  const [technologies, setTechnologies] = useState<AITechnology[]>([]);
  const [filteredTechnologies, setFilteredTechnologies] = useState<AITechnology[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  useEffect(() => {
    filterTechnologies();
  }, [technologies, selectedCategory, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showExportMenu && !target.closest('.export-dropdown')) {
        setShowExportMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showExportMenu]);

  const fetchTechnologies = async () => {
    try {
      const response = await fetch('/api/technologies');
      const data = await response.json();
      setTechnologies(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching technologies:', error);
      setLoading(false);
      // Load sample data for demonstration
      loadSampleData();
    }
  };

  const loadSampleData = () => {
    const sampleData: AITechnology[] = [
      {
        id: '1',
        title: 'Next.js AI Chatbot',
        description: '一个基于 Next.js 和 OpenAI 的全栈聊天机器人应用',
        category: 'open-source',
        tags: ['Next.js', 'OpenAI', 'TypeScript', 'Chatbot'],
        url: 'https://github.com/vercel/ai-chatbot',
        stars: 4200,
        lastUpdated: '2024-01-15',
        source: 'GitHub',
        language: 'TypeScript'
      },
      {
        id: '2',
        title: 'GPT-4 Turbo',
        description: 'OpenAI 最新的大语言模型，支持更长的上下文和更快的推理速度',
        category: 'closed-source',
        tags: ['GPT-4', 'OpenAI', 'LLM', 'API'],
        url: 'https://openai.com/gpt-4',
        lastUpdated: '2024-01-10',
        source: 'OpenAI'
      },
      {
        id: '3',
        title: 'Attention Is All You Need',
        description: 'Transformer 架构的开创性论文，奠定了现代 AI 的基础',
        category: 'paper',
        tags: ['Transformer', 'Attention', 'NLP', 'Google'],
        url: 'https://arxiv.org/abs/1706.03762',
        lastUpdated: '2017-06-12',
        source: 'arXiv'
      },
      {
        id: '4',
        title: 'Cursor IDE',
        description: '基于 AI 的代码编辑器，提供智能代码补全和生成功能',
        category: 'application',
        tags: ['IDE', 'Code Generation', 'AI Assistant'],
        url: 'https://cursor.sh',
        lastUpdated: '2024-01-12',
        source: 'Cursor'
      },
      {
        id: '5',
        title: 'Multimodal RAG',
        description: '多模态检索增强生成技术的最新研究进展',
        category: 'frontier',
        tags: ['RAG', 'Multimodal', 'Vision', 'Language'],
        url: 'https://example.com/multimodal-rag',
        lastUpdated: '2024-01-14',
        source: 'Research'
      }
    ];
    setTechnologies(sampleData);
  };

  const filterTechnologies = () => {
    let filtered = technologies;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tech => tech.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(tech => 
        tech.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredTechnologies(filtered);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.key === category);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  const handleSyncUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sources: ['all'] }),
      });
      
      const result = await response.json();
      
      if (result.success && result.technologies.length > 0) {
        // In a real app, you would merge the new technologies with existing ones
        // For demo purposes, we'll just show a success message
        alert(`成功同步 ${result.collected} 项新技术！`);
        // Refresh the technologies list
        await fetchTechnologies();
      } else {
        alert('同步完成，但没有发现新技术。');
      }
    } catch (error) {
      console.error('Sync error:', error);
      alert('同步失败，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTechnology = () => {
    // For now, just show an alert. In a real app, this would open a form modal
    alert('添加技术功能即将推出！您可以通过GitHub提交Pull Request来贡献新的AI技术。');
  };

  const handleExport = (format: 'json' | 'csv' | 'markdown') => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.append('category', selectedCategory);
    if (searchTerm) params.append('search', searchTerm);
    params.append('format', format);
    
    const url = `/api/export?${params.toString()}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Head>
        <title>AI 技术收集工具</title>
        <meta name="description" content="专门收集最新的AI独立全栈开发技术" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI 技术收集工具</h1>
                <p className="text-gray-600 mt-1">发现最新的AI独立全栈开发技术</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/analytics" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  数据分析
                </Link>
                <Link href="/settings" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  设置
                </Link>
                
                {/* Export Dropdown */}
                <div className="relative export-dropdown">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                  >
                    <span>导出</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                      <div className="py-1">
                        <button
                          onClick={() => { handleExport('json'); setShowExportMenu(false); }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          导出为 JSON
                        </button>
                        <button
                          onClick={() => { handleExport('csv'); setShowExportMenu(false); }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          导出为 CSV
                        </button>
                        <button
                          onClick={() => { handleExport('markdown'); setShowExportMenu(false); }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          导出为 Markdown
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleAddTechnology}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  添加技术
                </button>
                <button 
                  onClick={handleSyncUpdate}
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? '同步中...' : '同步更新'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="搜索技术、标签或描述..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {categories.slice(1).map(category => {
              const count = technologies.filter(tech => tech.category === category.key).length;
              return (
                <div key={category.key} className="bg-white rounded-lg shadow p-4">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.color} mb-2`}>
                    {category.label}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                </div>
              );
            })}
          </div>

          {/* Technologies Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">加载中...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTechnologies.map(tech => (
                <div key={tech.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">{tech.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(tech.category)}`}>
                      {categories.find(c => c.key === tech.category)?.label}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{tech.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tech.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>{tech.source}</span>
                      {tech.stars && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {tech.stars}
                        </span>
                      )}
                    </div>
                    <span>{tech.lastUpdated}</span>
                  </div>
                  
                  <div className="mt-4">
                    <a
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                    >
                      查看详情
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredTechnologies.length === 0 && !loading && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M6.343 6.343A8 8 0 1017.657 17.657 8 8 0 006.343 6.343z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到相关技术</h3>
              <p className="mt-1 text-sm text-gray-500">尝试调整搜索条件或选择不同的分类</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}