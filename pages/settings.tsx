import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { DATA_SOURCES, type DataSource } from '../config/sources';

export default function Settings() {
  const [sources, setSources] = useState<DataSource[]>(DATA_SOURCES);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleToggleSource = (sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, enabled: !source.enabled }
        : source
    ));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    setMessage(null);
    
    try {
      // In a real application, this would save to a database
      // For now, we'll just simulate the save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: '设置已保存成功！' });
    } catch (error) {
      setMessage({ type: 'error', text: '保存设置时出错，请重试。' });
    } finally {
      setLoading(false);
    }
  };

  const getSourceTypeIcon = (type: DataSource['type']) => {
    switch (type) {
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
        );
      case 'arxiv':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'huggingface':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case 'news':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  const getStatusColor = (enabled: boolean) => {
    return enabled ? 'text-green-600' : 'text-gray-400';
  };

  const enabledCount = sources.filter(s => s.enabled).length;

  return (
    <>
      <Head>
        <title>设置 - AI 技术收集工具</title>
        <meta name="description" content="管理AI技术收集工具的数据源和设置" />
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
                  <h1 className="text-3xl font-bold text-gray-900">设置</h1>
                  <p className="text-gray-600 mt-1">管理数据源和收集设置</p>
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? '保存中...' : '保存设置'}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          {/* Overview */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">数据源概览</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{sources.length}</div>
                <div className="text-sm text-gray-600">总数据源</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{enabledCount}</div>
                <div className="text-sm text-gray-600">已启用</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600">{sources.length - enabledCount}</div>
                <div className="text-sm text-gray-600">已禁用</div>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">数据源管理</h2>
              <p className="text-gray-600 text-sm mt-1">启用或禁用不同的AI技术数据源</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {sources.map((source) => (
                <div key={source.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${source.enabled ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <div className={getStatusColor(source.enabled)}>
                          {getSourceTypeIcon(source.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">{source.name}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            source.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {source.enabled ? '已启用' : '已禁用'}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{source.description}</p>
                        
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>类型: {source.type}</span>
                          <span>分类: {source.category.join(', ')}</span>
                          <span>限制: {source.rateLimit.requests}/{source.rateLimit.period}</span>
                          {source.lastSync && (
                            <span>最后同步: {new Date(source.lastSync).toLocaleString('zh-CN')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <button
                        onClick={() => handleToggleSource(source.id)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          source.enabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            source.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collection Settings */}
          <div className="bg-white rounded-lg shadow mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">收集设置</h2>
              <p className="text-gray-600 text-sm mt-1">配置自动收集和更新频率</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  自动收集频率
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="hourly">每小时</option>
                  <option value="daily" selected>每天</option>
                  <option value="weekly">每周</option>
                  <option value="manual">手动</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  每次收集的最大数量
                </label>
                <input
                  type="number"
                  defaultValue="50"
                  min="10"
                  max="500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto-categorize"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="auto-categorize" className="ml-2 block text-sm text-gray-900">
                  启用自动分类
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="duplicate-detection"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="duplicate-detection" className="ml-2 block text-sm text-gray-900">
                  启用重复检测
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}