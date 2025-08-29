import type { AITechnology } from '../pages/api/technologies';

export interface RawTechnologyData {
  title: string;
  description: string;
  url: string;
  source: string;
  author?: string;
  stars?: number;
  language?: string;
  license?: string;
  lastUpdated: string;
  tags?: string[];
  citations?: number;
  downloads?: number;
}

export class DataProcessor {
  private static categoryKeywords = {
    'open-source': [
      'github', 'open source', 'repository', 'repo', 'fork', 'star', 'mit license', 
      'apache license', 'gpl', 'bsd', 'license', 'contribution', 'pull request'
    ],
    'closed-source': [
      'api', 'service', 'platform', 'commercial', 'enterprise', 'saas', 'paas',
      'subscription', 'pricing', 'openai', 'anthropic', 'google ai', 'microsoft',
      'azure', 'aws', 'gcp'
    ],
    'paper': [
      'arxiv', 'paper', 'research', 'conference', 'journal', 'proceedings',
      'abstract', 'citation', 'doi', 'ieee', 'acm', 'neurips', 'icml', 'iclr',
      'aaai', 'ijcai', 'cvpr', 'iccv', 'eccv', 'acl', 'emnlp'
    ],
    'application': [
      'app', 'application', 'tool', 'platform', 'dashboard', 'interface',
      'ui', 'ux', 'demo', 'playground', 'beta', 'production', 'deployment'
    ],
    'frontier': [
      'breakthrough', 'novel', 'cutting-edge', 'state-of-the-art', 'sota',
      'experimental', 'prototype', 'research', 'innovation', 'advance',
      'emerging', 'future', 'next-generation'
    ]
  };

  private static aiTags = [
    'artificial intelligence', 'machine learning', 'deep learning', 'neural network',
    'transformer', 'attention', 'gpt', 'bert', 'llm', 'large language model',
    'nlp', 'natural language processing', 'computer vision', 'cv', 'generative ai',
    'rag', 'retrieval augmented generation', 'fine-tuning', 'training', 'inference',
    'pytorch', 'tensorflow', 'hugging face', 'langchain', 'openai', 'anthropic'
  ];

  static categorizeContent(data: RawTechnologyData): AITechnology['category'] {
    const text = `${data.title} ${data.description} ${data.source} ${data.tags?.join(' ') || ''}`.toLowerCase();
    
    const scores = Object.entries(this.categoryKeywords).map(([category, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (text.includes(keyword.toLowerCase()) ? 1 : 0);
      }, 0);
      return { category: category as AITechnology['category'], score };
    });

    // Sort by score and return the highest scoring category
    scores.sort((a, b) => b.score - a.score);
    
    // If no keywords match, try to infer from source
    if (scores[0].score === 0) {
      if (data.source.toLowerCase().includes('github')) return 'open-source';
      if (data.source.toLowerCase().includes('arxiv')) return 'paper';
      if (data.source.toLowerCase().includes('openai') || data.source.toLowerCase().includes('anthropic')) return 'closed-source';
      return 'application'; // default
    }
    
    return scores[0].category;
  }

  static extractTags(data: RawTechnologyData): string[] {
    const text = `${data.title} ${data.description}`.toLowerCase();
    const extractedTags: string[] = [];
    
    // Extract AI-related tags
    this.aiTags.forEach(tag => {
      if (text.includes(tag.toLowerCase())) {
        extractedTags.push(this.capitalizeWords(tag));
      }
    });
    
    // Add language tag if available
    if (data.language) {
      extractedTags.push(data.language);
    }
    
    // Add existing tags if available
    if (data.tags) {
      extractedTags.push(...data.tags);
    }
    
    // Remove duplicates and limit to 10 tags
    return Array.from(new Set(extractedTags)).slice(0, 10);
  }

  static processRawData(rawData: RawTechnologyData): AITechnology {
    const category = this.categorizeContent(rawData);
    const tags = this.extractTags(rawData);
    
    return {
      id: this.generateId(rawData),
      title: rawData.title,
      description: this.cleanDescription(rawData.description),
      category,
      tags,
      url: rawData.url,
      stars: rawData.stars,
      lastUpdated: rawData.lastUpdated,
      source: rawData.source,
      language: rawData.language,
      author: rawData.author,
      license: rawData.license,
      citations: rawData.citations,
      downloads: rawData.downloads
    };
  }

  static processBatchData(rawDataArray: RawTechnologyData[]): AITechnology[] {
    return rawDataArray.map(data => this.processRawData(data));
  }

  private static generateId(data: RawTechnologyData): string {
    // Generate a unique ID based on title and source
    const baseString = `${data.title}-${data.source}-${data.url}`;
    return btoa(baseString).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  }

  private static cleanDescription(description: string): string {
    // Clean up description by removing excessive whitespace and limiting length
    return description
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 500) + (description.length > 500 ? '...' : '');
  }

  private static capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, l => l.toUpperCase());
  }

  static validateTechnology(tech: AITechnology): boolean {
    // Basic validation
    if (!tech.title || !tech.description || !tech.url) {
      return false;
    }
    
    // Check if it's AI-related
    const text = `${tech.title} ${tech.description} ${tech.tags.join(' ')}`.toLowerCase();
    const hasAIKeywords = this.aiTags.some(keyword => 
      text.includes(keyword.toLowerCase())
    );
    
    return hasAIKeywords;
  }

  static deduplicateTechnologies(technologies: AITechnology[]): AITechnology[] {
    const seen = new Set<string>();
    const unique: AITechnology[] = [];
    
    for (const tech of technologies) {
      // Create a key for deduplication based on title and URL
      const key = `${tech.title.toLowerCase()}-${tech.url}`;
      
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(tech);
      }
    }
    
    return unique;
  }

  static sortTechnologies(technologies: AITechnology[], sortBy: 'date' | 'stars' | 'citations' = 'date'): AITechnology[] {
    return [...technologies].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'stars':
          return (b.stars || 0) - (a.stars || 0);
        case 'citations':
          return (b.citations || 0) - (a.citations || 0);
        default:
          return 0;
      }
    });
  }
}