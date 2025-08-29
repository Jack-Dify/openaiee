import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface AnalyticsData {
  totalTechnologies: number;
  categoryCounts: Record<string, number>;
  sourceCounts: Record<string, number>;
  languageCounts: Record<string, number>;
  recentTrends: {
    date: string;
    count: number;
  }[];
  topTags: {
    tag: string;
    count: number;
  }[];
}

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      setAnalyticsData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Load mock data for demonstration
      loadMockAnalytics();
      setLoading(false);
    }
  };

  const loadMockAnalytics = () => {
    const mockData: AnalyticsData = {
      totalTechnologies: 15,
      categoryCounts: {
        'open-source': 6,
        'closed-source': 4,
        'paper': 3,
        'application': 3,
        'frontier': 2
      },
      sourceCounts: {
        'GitHub': 6,
        'arXiv': 4,
        'OpenAI': 2,
        'HuggingFace': 2,
        'Anthropic': 1,
        'Google': 1
      },
      languageCounts: {
        'Python': 8,
        'TypeScript': 4,
        'JavaScript': 2,
        'Other': 1
      },
      recentTrends: [
        { date: '2024-01-15', count: 3 },
        { date: '2024-01-14', count: 2 },
        { date: '2024-01-13', count: 4 },
        { date: '2024-01-12', count: 1 },
        { date: '2024-01-11', count: 2 },
        { date: '2024-01-10', count: 3 }
      ],
      topTags: [
        { tag: 'AI', count: 15 },
        { tag: 'Machine Learning', count: 12 },
        { tag: 'LLM', count: 8 },
        { tag: 'Python', count: 8 },
        { tag: 'OpenAI', count: 6 },
        { tag: 'TypeScript', count: 5 },
        { tag: 'Code Generation', count: 4 },
        { tag: 'RAG', count: 3 }
      ]
    };
    setAnalyticsData(mockData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">无法加载分析数据</h2>
          <button
            onClick={fetchAnalytics}
            className="btn-primary"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>数据分析 - AI 技术收集工具</title>
        <meta name="description" content="AI技术收集工具的数据分析和统计" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  ← 返回主页
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">数据分析</h1>
                  <p className="text-gray-600 mt-1">AI技术收集统计和趋势分析</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                最后更新: {new Date().toLocaleString('zh-CN')}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6m-6 5.5V16a2 2 0 00-2-2h-4a2 2 0 00-2 2v1.5m6 0V16m0 5.5h4m-4 0h-4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">总技术数量</p>
                  <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalTechnologies}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">开源项目</p>
                  <p className="text-2xl font-semibold text-gray-900">{analyticsData.categoryCounts['open-source'] || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">学术论文</p>
                  <p className="text-2xl font-semibold text-gray-900">{analyticsData.categoryCounts['paper'] || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">前沿技术</p>
                  <p className="text-2xl font-semibold text-gray-900">{analyticsData.categoryCounts['frontier'] || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">分类分布</h3>
              <div className="space-y-3">
                {Object.entries(analyticsData.categoryCounts).map(([category, count]) => {
                  const percentage = (count / analyticsData.totalTechnologies) * 100;
                  const categoryLabels: Record<string, string> = {
                    'open-source': '开源项目',
                    'closed-source': '闭源产品',
                    'paper': '学术论文',
                    'application': '应用案例',
                    'frontier': '前沿技术'
                  };
                  
                  return (
                    <div key={category} className="flex items-center">
                      <div className="w-24 text-sm text-gray-600 flex-shrink-0">
                        {categoryLabels[category]}
                      </div>
                      <div className="flex-1 mx-3">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-12 text-sm font-medium text-gray-900 text-right">
                        {count}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Source Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">来源分布</h3>
              <div className="space-y-3">
                {Object.entries(analyticsData.sourceCounts)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 6)
                  .map(([source, count]) => {
                    const percentage = (count / analyticsData.totalTechnologies) * 100;
                    
                    return (
                      <div key={source} className="flex items-center">
                        <div className="w-20 text-sm text-gray-600 flex-shrink-0">
                          {source}
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-12 text-sm font-medium text-gray-900 text-right">
                          {count}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Recent Trends and Top Tags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Trends */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">最近趋势</h3>
              <div className="space-y-2">
                {analyticsData.recentTrends.map((trend, index) => (
                  <div key={trend.date} className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">{trend.date}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(trend.count / Math.max(...analyticsData.recentTrends.map(t => t.count))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-6 text-right">
                        {trend.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Tags */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">热门标签</h3>
              <div className="flex flex-wrap gap-2">
                {analyticsData.topTags.map((tag, index) => {
                  const size = Math.max(12, Math.min(20, 12 + (tag.count / analyticsData.topTags[0].count) * 8));
                  return (
                    <span
                      key={tag.tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      style={{ fontSize: `${size}px` }}
                    >
                      {tag.tag}
                      <span className="ml-1 text-blue-600">({tag.count})</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}